import express, { Request, Response, NextFunction, CookieOptions } from 'express';

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
import { SERVER_QUESTIONS, getSanitizedQuestions, validateAnswer } from './questions';

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
const playerJwtSecret = process.env.PLAYER_JWT_SECRET;

if (!adminPasswordHash) {
  throw new Error('Missing ADMIN_PASSWORD_HASH environment variable. Please set it with a bcrypt hash of the admin password.');
}

if (!jwtSecret) {
  throw new Error('Missing JWT_SECRET environment variable. Please set it to a secure random string.');
}

// Rate limiting middleware
const apiLimiter = rateLimit({
  windowMs: rateLimitWindowMs,
  max: rateLimitMaxRequests,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply rate limiting to all API routes
app.use('/api/', apiLimiter);

// Middleware
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
app.post('/api/admin/login', async (req: AuthRequest, res: Response) => {
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

    // Set httpOnly cookie
    res.cookie(sessionName, token, {
      httpOnly: true,
      secure: secureCookies, // Only send over HTTPS in production
      sameSite: 'strict',
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
    secure: secureCookies,
    sameSite: 'strict'
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
    if (!duration || typeof duration !== 'number' || duration <= 0) {
      return res.status(400).json({ error: 'Valid duration is required' });
    }

    if (!Array.isArray(categories) || categories.length === 0) {
      return res.status(400).json({ error: 'At least one category is required' });
    }

    if (!validationCode || typeof validationCode !== 'string') {
      return res.status(400).json({ error: 'Validation code is required' });
    }

    if (unlimitedCodes === undefined || typeof unlimitedCodes !== 'string') {
      return res.status(400).json({ error: 'Unlimited codes are required' });
    }

    if (!Array.isArray(groups) || groups.length === 0) {
      return res.status(400).json({ error: 'At least one group is required' });
    }

    if (!initialPoints || typeof initialPoints !== 'number' || initialPoints <= 0) {
      return res.status(400).json({ error: 'Valid initial points is required' });
    }

    const categoryStr = categories.join(',');
    const groupsStr = groups.join(', ');

    // Insert new session
    const { data, error } = await supabase
      .from('sessions')
      .insert({
        start_time: new Date().toISOString(),
        duration_seconds: duration * 60, // Convert minutes to seconds
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
app.post('/api/player/login', async (req: AuthRequest, res: Response) => {
  try {
    const { sessionId, playerName } = req.body;

    // Validate required fields
    if (!sessionId || typeof sessionId !== 'string') {
      return res.status(400).json({ error: 'Session ID is required' });
    }

    if (!playerName || typeof playerName !== 'string' || playerName.trim().length < 2) {
      return res.status(400).json({ error: 'Valid player name is required (minimum 2 characters)' });
    }

    const trimmedName = playerName.trim();

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

    // Check if player already exists for this session and name
    const { data: existingPlayer, error: playerError } = await supabase
      .from('players')
      .select('*')
      .eq('session_id', sessionId)
      .eq('name', trimmedName)
      .maybeSingle();

    let playerData;
    let isNewPlayer = false;

    if (existingPlayer) {
      // Player exists - update their last_seen time and return existing data
      const { data: updatedPlayer, error: updateError } = await supabase
        .from('players')
        .update({
          last_seen: new Date().toISOString(),
          // Preserve existing points and group unless they were explicitly changing groups
          // For now, we'll keep existing group but could be enhanced to allow group changes
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
      // New player - create record
      const { data: newPlayer, error: createError } = await supabase
        .from('players')
        .insert({
          session_id: sessionId,
          name: trimmedName,
          group_name: null, // Will be set when they select a group in the frontend
          individual_points: session.initial_points || 3,
          group_score: 0,
          started_at: new Date().toISOString(),
          last_seen: new Date().toISOString()
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
      sameSite: 'strict',
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
    sameSite: 'strict'
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

    // Insert the answer
    const { data: answerData, error: answerError } = await supabase
      .from('answers')
      .insert({
        player_id: playerId,
        question_index: questionIndex,
        selected_option: selectedOption,
        is_correct: isCorrect,
        answered_at: new Date().toISOString()
      })
      .select()
      .single();

    if (answerError) {
      console.error('Error inserting answer:', answerError);
      return res.status(500).json({ error: 'Failed to submit answer' });
    }

    // Calculate consecutive correct answers for life bonus
    let consecutiveCorrectCount = 0;
    if (isCorrect) {
      // Get recent answers to calculate consecutive correct streak
      const { data: recentAnswers, error: recentAnswersError } = await supabase
        .from('answers')
        .select('is_correct, answered_at')
        .eq('player_id', playerId)
        .order('answered_at', { ascending: false })
        .limit(10); // Look at last 10 answers to be safe

      if (!recentAnswersError && recentAnswers) {
        // Count consecutive correct answers from most recent
        for (const answer of recentAnswers) {
          if (answer.is_correct) {
            consecutiveCorrectCount++;
          } else {
            break; // Stop at first incorrect answer
          }
        }
      }
    }

    // Update player score if correct
    let newIndividualPoints = player.individual_points;
    let newGroupScore = player.group_score;

    if (isCorrect) {
      // Add points for correct answer
      newIndividualPoints += 10; // POINTS_PER_QUESTION

      // Add life bonus for every 3 consecutive correct answers
      // consecutiveCorrectCount is the count of previous consecutive correct answers
      // So we add 1 for the current answer to get the total streak including this answer
      const totalConsecutiveCorrect = consecutiveCorrectCount + 1;
      if (totalConsecutiveCorrect % 3 === 0) {
        newIndividualPoints += 1; // Life bonus
      }
    } else {
      // Subtract a life for incorrect answer
      newIndividualPoints = Math.max(0, newIndividualPoints - 1);
    }

    // Update player record
    const { data: updatedPlayer, error: updateError } = await supabase
      .from('players')
      .update({
        individual_points: newIndividualPoints,
        group_score: newGroupScore,
        last_seen: new Date().toISOString()
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
        answeredAt: answerData.answered_at
      },
      player: {
        id: updatedPlayer.id,
        individualPoints: updatedPlayer.individual_points,
        groupScore: updatedPlayer.group_score
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

    // Get answered questions count
    const { data: answers, error: answersError } = await supabase
      .from('answers')
      .select('question_index')
      .eq('player_id', playerId);

    let answeredCount = 0;
    if (!answersError && answers) {
      answeredCount = answers.length;
    }

    res.json({
      player: {
        id: player.id,
        name: player.name,
        sessionId: player.session_id,
        groupName: player.group_name || null,
        individualPoints: player.individual_points,
        groupScore: player.group_score,
        startedAt: player.started_at,
        lastSeen: player.last_seen
      },
      stats: {
        answeredQuestions: answeredCount
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

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use('*', (_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
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

app.listen(PORT, () => {
  console.log(`Smartnet backend running on port ${PORT}`);
});

export default app;