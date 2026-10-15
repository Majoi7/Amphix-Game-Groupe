import express, { Request, Response, NextFunction, CookieOptions } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Extend Express Request interface to include admin property
interface AuthRequest extends Request {
  admin?: { id: string };
  player?: {
    id: string;
    sessionId: string;
    name: string;
    groupName: string | null;
  };
}
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import { SERVER_QUESTIONS, getSanitizedQuestions, validateAnswer } from './questions.js';

// Load environment variables
dotenv.config({ path: './server/.env' });

const app = express();
const PORT = process.env.PORT || 3001;

// Environment variable validation
const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
const jwtSecret = process.env.JWT_SECRET;
const sessionName = process.env.SESSION_NAME || 'amphix_admin_session';
const secureCookies = process.env.SECURE_COOKIES === 'true'; // Set to true in production with HTTPS
const rateLimitWindowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10); // 15 minutes default
const rateLimitMaxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '5', 10); // 5 requests per window

// Player authentication variables
const playerSessionName = process.env.PLAYER_SESSION_NAME || 'amphix_player_session';
const isProduction = process.env.NODE_ENV === 'production';

if (!adminPasswordHash) {
  throw new Error('Missing ADMIN_PASSWORD_HASH environment variable. Please set it with a bcrypt hash of the admin password.');
}

if (!jwtSecret) {
  throw new Error('Missing JWT_SECRET environment variable. Please set it to a secure random string.');
}

// Player JWT secret: must be explicit in production.
// In development we derive a distinct value from JWT_SECRET so a missing
// PLAYER_JWT_SECRET never blocks local startup, while still keeping the two
// token families cryptographically separated (a player token can never be
// accepted as an admin token and vice versa).
let playerJwtSecret = process.env.PLAYER_JWT_SECRET;
if (!playerJwtSecret) {
  if (isProduction) {
    throw new Error('Missing PLAYER_JWT_SECRET environment variable. Please set it to a secure random string.');
  }
  playerJwtSecret = `${jwtSecret}:player-dev`;
  console.warn('[Config] PLAYER_JWT_SECRET absent - valeur derivee de JWT_SECRET (developpement uniquement).');
}

// --- Rate limiting -------------------------------------------------------
// Three limiters with different jobs. Everything is keyed by IP, which matters:
// a whole class usually shares one school NAT, so a "reasonable" per-user limit
// silently locks out most of the room.
//  * authLimiter protects the single admin password from brute force.
//  * playerLoginLimiter is deliberately generous because every player of a
//    session logs in once, from the same IP.
//  * apiLimiter is a coarse safety net for the rest, sized for live polling.
const authLimiter = rateLimit({
  windowMs: rateLimitWindowMs,
  max: 20, // 20 admin login attempts per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Trop de tentatives. Merci de patienter quelques minutes.' },
});

const playerLoginLimiter = rateLimit({
  windowMs: rateLimitWindowMs,
  max: 1000, // enough for a large class behind one NAT
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Trop de connexions depuis ce reseau. Merci de patienter.' },
});

const apiLimiter = rateLimit({
  windowMs: rateLimitWindowMs,
  max: Math.max(rateLimitMaxRequests, 2000), // polling-safe for a live quiz
  standardHeaders: true,
  legacyHeaders: false,
});

// --- CORS ----------------------------------------------------------------
// CORS_ORIGINS accepts a comma-separated list so a single deployment can serve
// localhost, a LAN address (phones on the same Wi-Fi) and the production URL.
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Requests without an Origin header (curl, health checks, same-origin) are allowed.
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    // In development, also accept any localhost / private-LAN origin so the
    // host can play from a phone without editing .env for every IP change.
    if (!isProduction && /^https?:\/\/(localhost|127\.0\.0\.1|192\.168\.\d{1,3}\.\d{1,3}|10\.\d{1,3}\.\d{1,3}\.\d{1,3}|172\.(1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3})(:\d+)?$/.test(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`Origine non autorisee par CORS: ${origin}`));
  },
  credentials: true, // Allow cookies to be sent with requests
}));
app.use('/api/', apiLimiter);

// Middleware
app.use(cookieParser()); // Parse cookies from requests
app.use(express.json());

// Supabase client (service role for backend)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('Supabase URL:', supabaseUrl ? 'present' : 'missing');
console.log('Supabase Service Role Key:', supabaseServiceRoleKey ? 'present' : 'missing');

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Missing Supabase backend environment variables. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseServiceRoleKey);

// JWT authentication middleware
const authenticateAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies?.[sessionName];

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    // Attach admin info to request for use in route handlers
    req.admin = { id: decoded.id };
    next();
  } catch (err) {
    console.warn('[Auth] Jeton admin rejete:', (err as Error).message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// Player JWT authentication middleware
const authenticatePlayer = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies?.[playerSessionName];

  if (!token) {
    return res.status(401).json({ error: 'Player authentication required' });
  }

  try {
    const decoded = jwt.verify(token, playerJwtSecret);
    // Attach player info to request for use in route handlers
    req.player = {
      id: decoded.playerId,
      sessionId: decoded.sessionId,
      name: decoded.name,
      groupName: decoded.groupName || null
    };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired player token' });
  }
};

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Config verification endpoint (for debugging)
app.get('/api/config', (_req: Request, res: Response) => {
  res.json({
    supabaseUrl: supabaseUrl ? 'configured' : 'missing',
    supabaseServiceRoleKey: supabaseServiceRoleKey ? 'configured' : 'missing',
    port: PORT,
    nodeEnv: process.env.NODE_ENV || 'development'
  });
});

// ADMIN AUTHENTICATION ENDPOINTS

// Login endpoint
app.post('/api/admin/login', authLimiter, async (req: AuthRequest, res: Response) => {
  try {
    const { password } = req.body;

    if (!password || typeof password !== 'string') {
      return res.status(400).json({ error: 'Password is required' });
    }

    // Compare provided password with stored hash
    const isValid = await bcrypt.compare(password, adminPasswordHash);

    if (!isValid) {
      // Log failed attempt (in production, use proper logging)
      console.warn(`Failed admin login attempt from ${req.ip}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: 'admin', timestamp: Date.now() },
      jwtSecret,
      { expiresIn: '24h' } // Token expires in 24 hours
    );

    // Set httpOnly cookie for admin session.
    // SameSite=None is only honoured by browsers when the cookie is also
    // Secure, so pairing it with secure:false made the browser silently drop
    // it - the admin was logged in server-side but every later request 401'd.
    // Over local HTTP we use Lax (same-site, ports do not count), and only
    // switch to None+Secure once HTTPS is actually in use.
    res.cookie(sessionName, token, {
      httpOnly: true,
      secure: secureCookies,
      sameSite: secureCookies ? 'none' : 'lax',
      path: '/',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours in milliseconds
    });

    res.json({
      message: 'Login successful',
      expiresIn: 24 * 60 * 60 // 24 hours in seconds
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout endpoint
app.post('/api/admin/logout', authenticateAdmin, (_req: Request, res: Response) => {
  res.clearCookie(sessionName, {
    httpOnly: true,
    secure: secureCookies, // Must match the login cookie settings
    sameSite: secureCookies ? 'none' : 'lax',
    path: '/'
  });

  res.json({ message: 'Logged out successfully' });
});

// Session verification endpoint
app.get('/api/admin/me', authenticateAdmin, (_req: AuthRequest, res: Response) => {
  res.json({
    authenticated: true,
    admin: _req.admin,
    timestamp: new Date().toISOString()
  });
});

// SESSION MANAGEMENT ENDPOINTS

// Update validation code for a session
app.post('/api/admin/sessions/update-validation-code', authenticateAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { sessionId, validationCode } = req.body;

    if (!sessionId || typeof sessionId !== 'string') {
      return res.status(400).json({ error: 'Session ID is required' });
    }

    if (validationCode === undefined || typeof validationCode !== 'string') {
      return res.status(400).json({ error: 'Validation code is required' });
    }

    // Verify session exists
    const { data: session, error: sessionError } = await supabase
      .from('sessions')
      .select('id')
      .eq('id', sessionId)
      .single();

    if (sessionError || !session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Update validation code
    const { error } = await supabase
      .from('sessions')
      .update({ validation_code: validationCode })
      .eq('id', sessionId);

    if (error) {
      console.error('Error updating validation code:', error);
      return res.status(500).json({ error: 'Failed to update validation code' });
    }

    res.json({ message: 'Validation code updated successfully' });
  } catch (error) {
    console.error('Admin update validation code error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update unlimited codes for a session
app.post('/api/admin/sessions/update-unlimited-codes', authenticateAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { sessionId, unlimitedCodes } = req.body;

    if (!sessionId || typeof sessionId !== 'string') {
      return res.status(400).json({ error: 'Session ID is required' });
    }

    if (unlimitedCodes === undefined || typeof unlimitedCodes !== 'string') {
      return res.status(400).json({ error: 'Unlimited codes are required' });
    }

    // Verify session exists
    const { data: session, error: sessionError } = await supabase
      .from('sessions')
      .select('id')
      .eq('id', sessionId)
      .single();

    if (sessionError || !session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Update unlimited codes
    const { error } = await supabase
      .from('sessions')
      .update({ unlimited_codes: unlimitedCodes })
      .eq('id', sessionId);

    if (error) {
      console.error('Error updating unlimited codes:', error);
      return res.status(500).json({ error: 'Failed to update unlimited codes' });
    }

    res.json({ message: 'Unlimited codes updated successfully' });
  } catch (error) {
    console.error('Admin update unlimited codes error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update groups for a session
app.post('/api/admin/sessions/update-groups', authenticateAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { sessionId, groups } = req.body;

    if (!sessionId || typeof sessionId !== 'string') {
      return res.status(400).json({ error: 'Session ID is required' });
    }

    if (!Array.isArray(groups)) {
      return res.status(400).json({ error: 'Groups must be an array' });
    }

    // Verify session exists
    const { data: session, error: sessionError } = await supabase
      .from('sessions')
      .select('id')
      .eq('id', sessionId)
      .single();

    if (sessionError || !session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Update groups
    const groupsStr = groups.join(', ');
    const { error } = await supabase
      .from('sessions')
      .update({ groups: groupsStr })
      .eq('id', sessionId);

    if (error) {
      console.error('Error updating groups:', error);
      return res.status(500).json({ error: 'Failed to update groups' });
    }

    res.json({ message: 'Groups updated successfully' });
  } catch (error) {
    console.error('Admin update groups error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start a new session
app.post('/api/admin/sessions/start', authenticateAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const {
      duration,
      categories,
      validationCode,
      unlimitedCodes,
      groups,
      initialPoints
    } = req.body;

    // Validate required fields
    // duration 0 means "no time limit" (Libre mode), so only negative values
    // and non-numbers are rejected.
    if (typeof duration !== 'number' || !Number.isFinite(duration) || duration < 0) {
      return res.status(400).json({ error: 'Valid duration is required (0 = no limit)' });
    }

    if (!Array.isArray(categories) || categories.length === 0) {
      return res.status(400).json({ error: 'At least one category is required' });
    }

    // A Libre session is opened by unlimited codes and has no validation code,
    // so an empty string is legitimate here.
    if (typeof validationCode !== 'string') {
      return res.status(400).json({ error: 'Validation code must be a string (may be empty)' });
    }

    if (typeof unlimitedCodes !== 'string') {
      return res.status(400).json({ error: 'Unlimited codes must be a string (may be empty)' });
    }

    if (validationCode.trim() === '' && unlimitedCodes.trim() === '') {
      return res.status(400).json({ error: 'At least one validation code or unlimited code is required' });
    }

    if (!Array.isArray(groups) || groups.length === 0) {
      return res.status(400).json({ error: 'At least one group is required' });
    }

    if (typeof initialPoints !== 'number' || initialPoints <= 0) {
      return res.status(400).json({ error: 'Valid initial points is required' });
    }

    const categoryStr = categories.join(',');
    const groupsStr = groups.join(', ');

    // Insert new session
    const { data, error } = await supabase
      .from('sessions')
      .insert({
        start_time: new Date().toISOString(),
        duration_seconds: duration * 60, // Convert minutes to seconds (0 = no limit)
        status: 'active',
        categories: categoryStr,
        validation_code: validationCode,
        unlimited_codes: unlimitedCodes,
        groups: groupsStr,
        initial_points: initialPoints
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating session:', error);
      return res.status(500).json({ error: 'Failed to create session' });
    }

    res.json({
      message: 'Session started successfully',
      session: data
    });
  } catch (error) {
    console.error('Admin start session error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Stop a session
app.post('/api/admin/sessions/stop', authenticateAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId || typeof sessionId !== 'string') {
      return res.status(400).json({ error: 'Session ID is required' });
    }

    // Verify session exists and is active
    const { data: session, error: sessionError } = await supabase
      .from('sessions')
      .select('id, status')
      .eq('id', sessionId)
      .single();

    if (sessionError || !session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    if (session.status !== 'active') {
      return res.status(400).json({ error: 'Session is not active' });
    }

    // Stop session
    const { error } = await supabase
      .from('sessions')
      .update({ status: 'finished' })
      .eq('id', sessionId);

    if (error) {
      console.error('Error stopping session:', error);
      return res.status(500).json({ error: 'Failed to stop session' });
    }

    res.json({ message: 'Session stopped successfully' });
  } catch (error) {
    console.error('Admin stop session error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get current active sessions
app.get('/api/admin/sessions', authenticateAdmin, async (_req: AuthRequest, res: Response) => {
  try {
    // Get active non-libre session
    const { data: activeSession, error: activeError } = await supabase
      .from('sessions')
      .select('*')
      .eq('status', 'active')
      .neq('groups', 'Libre')
      .order('start_time', { ascending: false })
      .limit(1)
      .maybeSingle();

    // Get active libre session
    const { data: libreSession, error: libreError } = await supabase
      .from('sessions')
      .select('*')
      .eq('status', 'active')
      .eq('groups', 'Libre')
      .maybeSingle();

    if (activeError) {
      console.error('Error fetching active session:', activeError);
      return res.status(500).json({ error: 'Failed to fetch active session' });
    }

    if (libreError) {
      console.error('Error fetching libre session:', libreError);
      return res.status(500).json({ error: 'Failed to fetch libre session' });
    }

    res.json({
      activeSession: activeSession || null,
      libreSession: libreSession || null
    });
  } catch (error) {
    console.error('Admin get sessions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get current active sessions (public version - no sensitive data)
app.get('/api/session/active', async (_req: Request, res: Response) => {
  try {
    // Get active non-libre session
    const { data: activeSession, error: activeError } = await supabase
      .from('sessions')
      .select('id, start_time, duration_seconds, status, categories, groups, initial_points')
      .eq('status', 'active')
      .neq('groups', 'Libre')
      .order('start_time', { ascending: false })
      .limit(1)
      .maybeSingle();

    // Get active libre session
    const { data: libreSession, error: libreError } = await supabase
      .from('sessions')
      .select('id, start_time, duration_seconds, status, categories, groups, initial_points')
      .eq('status', 'active')
      .eq('groups', 'Libre')
      .maybeSingle();

    if (activeError) {
      console.error('Error fetching active session:', activeError);
      return res.status(500).json({ error: 'Failed to fetch active session' });
    }

    if (libreError) {
      console.error('Error fetching libre session:', libreError);
      return res.status(500).json({ error: 'Failed to fetch libre session' });
    }

    res.json({
      activeSession: activeSession || null,
      libreSession: libreSession || null
    });
  } catch (error) {
    console.error('Public get sessions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- Session expiry -------------------------------------------------------
// A session is never closed automatically when its countdown runs out: `status`
// only becomes 'finished' when an admin presses "ARRÊTER MATCH". An expired
// session therefore stays 'active' in the database and keeps being returned by
// /api/session/active, sometimes alongside a newer one.
//
// The server and the browser both used to decide "is this session over?" on
// their own, from the same timestamp, with two different parsers - and they
// disagreed. The verdict is now computed here, once, and shipped to the client
// as the explicit `is_expired` boolean; the browser never re-derives it.

// Normalise the timestamp formats PostgREST can return ('2026-10-15 09:00:00.123456+00',
// '...T...Z', ...) into a form every JavaScript engine parses identically.
// Node accepts a short '+00' offset and a 6-digit fraction through its lenient
// legacy parser, but a browser switches to strict ISO parsing as soon as the
// string contains a 'T' - and then rejects both, yielding an Invalid Date.
// That divergence is exactly what produced "La session est terminée" from the
// server while the page still displayed "Session active !".
const parseDbDate = (value: unknown): Date | null => {
  if (!value) return null;
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;

  let s = String(value).trim();
  if (!s) return null;

  s = s.replace(' ', 'T');
  // Microseconds -> milliseconds.
  s = s.replace(/(\.\d{3})\d+/, '$1');
  // '+00' / '-05' -> '+00:00' / '-05:00'.
  s = s.replace(/([+-]\d{2})$/, '$1:00');
  // No timezone information at all: timestamps are stored in UTC.
  if (!/[Zz]$/.test(s) && !/[+-]\d{2}:\d{2}$/.test(s)) s += 'Z';

  const parsed = new Date(s);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

// A duration of 0 means "no time limit" (Libre mode), never "expired".
// An unreadable start_time is never treated as expired either: declaring a
// session over on the strength of a parse failure is the bug being fixed, so
// an unknown state is reported as unknown rather than guessed at.
const isSessionExpired = (session: any): boolean => {
  const durationSeconds = Number(session?.duration_seconds) || 0;
  if (durationSeconds <= 0) return false;
  const startedAt = parseDbDate(session?.start_time);
  if (!startedAt) return false;
  return Date.now() - startedAt.getTime() > durationSeconds * 1000;
};

// --- Access code helpers -------------------------------------------------
// Codes are stored as comma-separated strings in sessions.validation_code and
// sessions.unlimited_codes. Validating them server-side is what lets the public
// endpoints stay code-free: the browser never receives a list of valid codes,
// it only submits one and gets a verdict.

const parseCodeList = (value: unknown): string[] =>
  typeof value === 'string'
    ? value.split(',').map((c) => c.trim()).filter(Boolean)
    : [];

type AccessMode = 'normal' | 'unlimited';

// Find which active session an access code belongs to.
// Unlimited codes open the Libre session and grant infinite lives;
// validation codes open a standard session with a limited number of lives.
const findSessionByCode = async (
  rawCode: string
): Promise<{ session: any; mode: AccessMode } | null> => {
  const normalized = String(rawCode ?? '').trim().toUpperCase();
  if (!normalized) return null;

  const { data: sessions, error } = await supabase
    .from('sessions')
    .select('*')
    .eq('status', 'active');

  if (error) {
    console.error('Error looking up session by code:', error);
    return null;
  }
  if (!sessions) return null;

  // Every session a code matches is collected first, so that the caller can be
  // told about an expired one instead of being handed an arbitrary winner.
  const matches: { session: any; mode: AccessMode }[] = [];

  // Unlimited codes take precedence: they are the only way into a Libre session.
  for (const session of sessions) {
    if (parseCodeList(session.unlimited_codes).some((c) => c.toUpperCase() === normalized)) {
      matches.push({ session, mode: 'unlimited' });
    }
  }
  for (const session of sessions) {
    if (parseCodeList(session.validation_code).some((c) => c.toUpperCase() === normalized)) {
      matches.push({ session, mode: 'normal' });
    }
  }

  if (matches.length === 0) return null;

  // A code can outlive the session it was printed for. Prefer a match that is
  // still running, so a live code is never answered by a stale session that is
  // still sitting in the database with status 'active'.
  return matches.find((m) => !isSessionExpired(m.session)) ?? matches[0];
};

// NOTE: codes are intentionally NOT single-use. The schema has nowhere to
// record a spent code, and consuming one would lock a player out of their own
// session as soon as they reloaded the page (the client re-submits its code).
// The gate that matters is that validation happens here, server-side, instead
// of in the browser - which is what stops a code list from leaking.

// Validate an access code without revealing any other code.
// Used by the player entry screen to know which session a code opens.
app.post('/api/session/validate-code', async (req: Request, res: Response) => {
  try {
    const { code } = req.body;

    if (!code || typeof code !== 'string') {
      return res.status(400).json({ valid: false, error: 'Code is required' });
    }

    const match = await findSessionByCode(code);

    if (!match) {
      return res.status(200).json({ valid: false, error: 'Code invalide' });
    }

    // The code exists but its session has run out of time. This is the only
    // place allowed to claim a session is over, and `expired: true` lets the
    // client say so without re-deriving it from dates.
    if (isSessionExpired(match.session)) {
      return res.status(200).json({ valid: false, expired: true, error: 'La session est terminée' });
    }

    const durationSeconds = Number(match.session.duration_seconds) || 0;

    // Deliberately returns no codes - only what the client needs to proceed.
    res.json({
      valid: true,
      expired: false,
      sessionId: match.session.id,
      mode: match.mode,
      unlimitedLives: match.mode === 'unlimited',
      categories: match.session.categories || '',
      groups: match.session.groups || '',
      initialPoints: match.session.initial_points || 3,
      durationSeconds,
      startTime: match.session.start_time
    });
  } catch (error) {
    console.error('Validate code error:', error);
    res.status(500).json({ valid: false, error: 'Internal server error' });
  }
});

// PLAYER MANAGEMENT ENDPOINTS

// Delete a specific player
app.post('/api/admin/players/delete', authenticateAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { playerId } = req.body;

    if (!playerId || typeof playerId !== 'string') {
      return res.status(400).json({ error: 'Player ID is required' });
    }

    // Verify player exists
    const { data: player, error: playerError } = await supabase
      .from('players')
      .select('id, session_id')
      .eq('id', playerId)
      .single();

    if (playerError || !player) {
      return res.status(404).json({ error: 'Player not found' });
    }

    // Delete associated answers first
    const { error: answersError } = await supabase
      .from('answers')
      .delete()
      .eq('player_id', playerId);

    if (answersError) {
      console.error('Error deleting player answers:', answersError);
      // Continue anyway - we want to delete the player even if answers cleanup fails
    }

    // Delete player
    const { error } = await supabase
      .from('players')
      .delete()
      .eq('id', playerId);

    if (error) {
      console.error('Error deleting player:', error);
      return res.status(500).json({ error: 'Failed to delete player' });
    }

    res.json({ message: 'Player deleted successfully' });
  } catch (error) {
    console.error('Admin delete player error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete all players for a session
app.post('/api/admin/players/delete-all', authenticateAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId || typeof sessionId !== 'string') {
      return res.status(400).json({ error: 'Session ID is required' });
    }

    // Verify session exists
    const { data: session, error: sessionError } = await supabase
      .from('sessions')
      .select('id')
      .eq('id', sessionId)
      .single();

    if (sessionError || !session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Get all player IDs for this session
    const { data: players, error: playersError } = await supabase
      .from('players')
      .select('id')
      .eq('session_id', sessionId);

    if (playersError) {
      console.error('Error fetching players for session:', playersError);
      return res.status(500).json({ error: 'Failed to fetch players' });
    }

    if (!players || players.length === 0) {
      return res.json({ message: 'No players to delete' });
    }

    const playerIds = players.map((p: any) => p.id);

    // Delete associated answers in batches to avoid query limits
    for (let i = 0; i < playerIds.length; i += 100) {
      const batch = playerIds.slice(i, i + 100);
      const { error: answersError } = await supabase
        .from('answers')
        .delete()
        .in('player_id', batch);

    if (answersError) {
      console.error('Error deleting player answers batch:', answersError);
      // Continue with next batch
    }
  }

  // Delete all players for the session
  const { error } = await supabase
    .from('players')
    .delete()
    .eq('session_id', sessionId);

  if (error) {
    console.error('Error deleting players:', error);
    return res.status(500).json({ error: 'Failed to delete players' });
  }

  res.json({ message: 'All players deleted successfully' });
} catch (error) {
  console.error('Admin delete all players error:', error);
  res.status(500).json({ error: 'Internal server error' });
}
});

// PLAYER AUTHENTICATION ENDPOINTS

// Player login/validation endpoint
app.post('/api/player/login', playerLoginLimiter, async (req: AuthRequest, res: Response) => {
  try {
    const { sessionId, playerName, groupName, code } = req.body;

    if (!playerName || typeof playerName !== 'string' || playerName.trim().length < 2) {
      return res.status(400).json({ error: 'Valid player name is required (minimum 2 characters)' });
    }

    if (!code || typeof code !== 'string') {
      return res.status(400).json({ error: 'Access code is required' });
    }

    const trimmedName = playerName.trim();
    const validatedGroupName = groupName || null; // Ensure groupName is null if not provided

    // The access code is the authority on which session the player joins -
    // the sessionId sent by the browser is only a hint and is never trusted.
    const match = await findSessionByCode(code);

    if (!match) {
      return res.status(403).json({ error: 'Code invalide ou session terminée' });
    }

    const session = match.session;
    const unlimitedLives = match.mode === 'unlimited';

    if (sessionId && sessionId !== session.id) {
      return res.status(409).json({ error: 'Ce code appartient à une autre session' });
    }

    // Check if player already exists for this session and name
    const { data: existingPlayer, error: playerError } = await supabase
      .from('players')
      .select('*')
      .eq('session_id', session.id)
      .eq('name', trimmedName)
      .maybeSingle();

    if (playerError) {
      console.error('Error looking up player:', playerError);
      return res.status(500).json({ error: 'Failed to look up player' });
    }

    let playerData;
    let isNewPlayer = false;

    if (existingPlayer) {
      // Player exists - update their group if provided.
      // NOTE: `players` has no `last_seen` column in the project schema, and
      // writing one made this whole request fail with a 500.
      const { data: updatedPlayer, error: updateError } = await supabase
        .from('players')
        .update({
          group_name: validatedGroupName !== null ? validatedGroupName : existingPlayer.group_name
        })
        .eq('id', existingPlayer.id)
        .select()
        .single();

      if (updateError) {
        console.error('Error updating player:', updateError);
        return res.status(500).json({ error: 'Failed to update player' });
      }

      playerData = updatedPlayer;
    } else {
      // New player - create record.
      // Unlimited (Libre) codes start the player with -1 lives, which every
      // display treats as the infinite-lives sentinel.
      const { data: newPlayer, error: createError } = await supabase
        .from('players')
        .insert({
          session_id: session.id,
          name: trimmedName,
          group_name: validatedGroupName,
          individual_points: unlimitedLives ? -1 : (session.initial_points || 3),
          group_score: 0,
          started_at: new Date().toISOString()
        })
        .select()
        .single();

      if (createError) {
        console.error('Error creating player:', createError);
        return res.status(500).json({ error: 'Failed to create player' });
      }

      playerData = newPlayer;
      isNewPlayer = true;
    }

    // Create JWT token for player
    const playerToken = jwt.sign(
      {
        playerId: playerData.id,
        sessionId: playerData.session_id,
        name: playerData.name,
        groupName: playerData.group_name || null,
        issuedAt: Date.now()
      },
      playerJwtSecret,
      { expiresIn: '24h' } // Token expires in 24 hours
    );

    // Set httpOnly cookie for player token
    res.cookie(playerSessionName, playerToken, {
      httpOnly: true,
      secure: secureCookies, // Only send over HTTPS in production
      sameSite: secureCookies ? 'none' : 'lax',
      path: '/',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours in milliseconds
    });

    res.json({
      message: isNewPlayer ? 'Player registered successfully' : 'Player welcomed back',
      player: {
        id: playerData.id,
        name: playerData.name,
        sessionId: playerData.session_id,
        groupName: playerData.group_name || null,
        individualPoints: playerData.individual_points,
        groupScore: playerData.group_score
      },
      unlimitedLives,
      categories: session.categories || '',
      expiresIn: 24 * 60 * 60 // 24 hours in seconds
    });
  } catch (error) {
    console.error('Player login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Player logout endpoint
app.post('/api/player/logout', authenticatePlayer, (_req: Request, res: Response) => {
  res.clearCookie(playerSessionName, {
    httpOnly: true,
    secure: secureCookies,
    sameSite: secureCookies ? 'none' : 'lax',
    path: '/'
  });

  res.json({ message: 'Logged out successfully' });
});

// Player verification endpoint
app.get('/api/player/me', authenticatePlayer, (_req: AuthRequest, res: Response) => {
  res.json({
    authenticated: true,
    player: _req.player,
    timestamp: new Date().toISOString()
  });
});

// PLAYER GAME ENDPOINTS (Protected by player authentication)

// Submit an answer
app.post('/api/player/answer', authenticatePlayer, async (req: AuthRequest, res: Response) => {
  try {
    const { questionIndex, selectedOption } = req.body;
    const playerId = req.player.id;
    const sessionId = req.player.sessionId;

    // Validate required fields
    if (questionIndex === undefined || typeof questionIndex !== 'number') {
      return res.status(400).json({ error: 'Question index is required' });
    }

    if (selectedOption === undefined || typeof selectedOption !== 'number') {
      return res.status(400).json({ error: 'Selected option is required' });
    }

    // Verify the player belongs to this session
    const { data: player, error: playerError } = await supabase
      .from('players')
      .select('*')
      .eq('id', playerId)
      .eq('session_id', sessionId)
      .single();

    if (playerError || !player) {
      return res.status(403).json({ error: 'Player not found or session mismatch' });
    }

    const { data: existingAnswer, error: answerCheckError } = await supabase
      .from('answers')
      .select('*')
      .eq('player_id', playerId)
      .eq('question_index', questionIndex)
      .maybeSingle();

    if (!answerCheckError && existingAnswer) {
      return res.status(409).json({ error: 'Answer already submitted for this question' });
    }

    // Validate answer using server-side source of truth
    const validation = validateAnswer(questionIndex, selectedOption);
    const isCorrect = validation.isCorrect;

    // Insert the answer.
    // The schema names this timestamp `created_at`; the previous code wrote
    // `answered_at`, which does not exist, so every submission failed with a
    // 500 and no answer was ever recorded.
    const { data: answerData, error: answerError } = await supabase
      .from('answers')
      .insert({
        player_id: playerId,
        question_index: questionIndex,
        selected_option: selectedOption,
        is_correct: isCorrect
      })
      .select()
      .single();

    if (answerError) {
      console.error('Error inserting answer:', answerError);
      return res.status(500).json({ error: 'Failed to submit answer' });
    }

    // Count the consecutive-correct streak *before* this answer.
    // The streak query used to include the answer we had just inserted and
    // then added 1 on top, so the life bonus fired one answer too early.
    let consecutiveCorrectCount = 0;
    if (isCorrect) {
      const { data: previousAnswers, error: previousAnswersError } = await supabase
        .from('answers')
        .select('is_correct')
        .eq('player_id', playerId)
        .neq('id', answerData.id) // exclude the answer just recorded
        .order('created_at', { ascending: false })
        .limit(10);

      if (previousAnswersError) {
        console.error('Error reading answer streak:', previousAnswersError);
      } else if (previousAnswers) {
        for (const answer of previousAnswers) {
          if (answer.is_correct) {
            consecutiveCorrectCount++;
          } else {
            break; // stop at the first incorrect answer
          }
        }
      }
    }

    // Scoring rules:
    //   correct answer        -> +10 points
    //   incorrect answer      -> -1 life
    //   3 correct in a row    -> +1 life (bonus)
    //   lives reaching 0      -> eliminated
    // `individual_points` holds the LIVES (it starts at initial_points, and
    // every display renders it as a life counter), while `group_score` holds
    // the SCORE. The previous code added the +10 to the life counter and never
    // touched group_score, which is why every leaderboard showed 0.
    const unlimitedLives = player.individual_points === -1;
    let newLives = player.individual_points;
    let newGroupScore = player.group_score || 0;

    if (isCorrect) {
      newGroupScore += 10; // POINTS_PER_QUESTION

      const totalConsecutiveCorrect = consecutiveCorrectCount + 1;
      if (totalConsecutiveCorrect % 3 === 0 && !unlimitedLives) {
        newLives += 1; // life bonus for three correct answers in a row
      }
    } else if (!unlimitedLives) {
      newLives = Math.max(0, newLives - 1);
    }

    // Update player record
    const { data: updatedPlayer, error: updateError } = await supabase
      .from('players')
      .update({
        individual_points: newLives,
        group_score: newGroupScore
      })
      .eq('id', playerId)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating player:', updateError);
      return res.status(500).json({ error: 'Failed to update player score' });
    }

    res.json({
      message: 'Answer submitted successfully',
      answer: {
        id: answerData.id,
        questionIndex: answerData.question_index,
        selectedOption: answerData.selected_option,
        isCorrect: answerData.is_correct,
        correctIndex: validation.correctIndex, // revealed only after answering
        answeredAt: answerData.created_at
      },
      player: {
        id: updatedPlayer.id,
        individualPoints: updatedPlayer.individual_points,
        groupScore: updatedPlayer.group_score,
        eliminated: updatedPlayer.individual_points === 0
      }
    });
  } catch (error) {
    console.error('Player answer error:', error);
    if (error.message.includes('not found')) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// Get player current state
app.get('/api/player/state', authenticatePlayer, async (_req: AuthRequest, res: Response) => {
  try {
    const playerId = _req.player.id;
    const sessionId = _req.player.sessionId;

    // Get player data
    const { data: player, error: playerError } = await supabase
      .from('players')
      .select('*')
      .eq('id', playerId)
      .eq('session_id', sessionId)
      .single();

    if (playerError || !player) {
      return res.status(404).json({ error: 'Player not found' });
    }

    // Get answered questions
    const { data: answers, error: answersError } = await supabase
      .from('answers')
      .select('question_index')
      .eq('player_id', playerId);

    const answeredQuestionIndices = answersError || !answers ? [] : answers.map((answer: any) => answer.question_index);
    const answeredCount = answeredQuestionIndices.length;

    res.json({
      player: {
        id: player.id,
        name: player.name,
        sessionId: player.session_id,
        groupName: player.group_name || null,
        individualPoints: player.individual_points,
        groupScore: player.group_score,
        unlimitedLives: player.individual_points === -1,
        eliminated: player.individual_points === 0,
        startedAt: player.started_at
      },
      stats: {
        answeredQuestions: answeredCount,
        answeredQuestionIndices: answeredQuestionIndices
      }
    });
  } catch (error) {
    console.error('Player state error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get questions for player (sanitized - no correct answers)
app.get('/api/player/questions', authenticatePlayer, async (_req: AuthRequest, res: Response) => {
  try {
    const sessionId = _req.player.sessionId;

    // Verify session exists and is active
    const { data: session, error: sessionError } = await supabase
      .from('sessions')
      .select('*')
      .eq('id', sessionId)
      .single();

    if (sessionError || !session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    if (session.status !== 'active') {
      return res.status(400).json({ error: 'Session is not active' });
    }

    // Get all questions
    let questions = getSanitizedQuestions();

    // Filter by session categories if specified
    if (session.categories && session.categories.length > 0) {
      const categories = session.categories.split(',').map((c: string) => c.trim());
      questions = questions.filter((q) => categories.includes(q.category));
    }

    // Shuffle questions
    const shuffled = [...questions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    res.json({
      questions: shuffled,
      count: shuffled.length
    });
  } catch (error) {
    console.error('Player questions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Finish game endpoint
app.post('/api/player/finish', authenticatePlayer, async (_req: AuthRequest, res: Response) => {
  try {
    const playerId = _req.player.id;
    const sessionId = _req.player.sessionId;

    // Verify the player belongs to this session
    const { data: player, error: playerError } = await supabase
      .from('players')
      .select('*')
      .eq('id', playerId)
      .eq('session_id', sessionId)
      .single();

    if (playerError || !player) {
      return res.status(403).json({ error: 'Player not found or session mismatch' });
    }

    // Update finished_at timestamp
    const { data: updatedPlayer, error: updateError } = await supabase
      .from('players')
      .update({ finished_at: new Date().toISOString() })
      .eq('id', playerId)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating player finished_at:', updateError);
      return res.status(500).json({ error: 'Failed to finish game' });
    }

    res.json({
      message: 'Game finished successfully',
      player: {
        id: updatedPlayer.id,
        finishedAt: updatedPlayer.finished_at
      }
    });
  } catch (error) {
    console.error('Player finish error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  // CORS rejections surface here; answer with 403 rather than a blanket 500.
  if (err.message && err.message.startsWith('Origine non autorisee par CORS')) {
    return res.status(403).json({ error: err.message });
  }
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler - MUST stay last, otherwise it swallows every route registered
// after it (which is how /api/player/finish became unreachable).
app.use('*', (_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Smartnet backend running on port ${PORT}`);
});

export default app;