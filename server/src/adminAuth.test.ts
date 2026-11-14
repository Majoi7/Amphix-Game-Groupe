import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { createServer, type Server } from 'node:http';
import test from 'node:test';
import express, { type Application } from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { readAdminAuthConfig } from './adminAuth.js';

// All credentials and database records below are isolated test fixtures.
const password = 'local-admin-test-password';
const passwordHash = bcrypt.hashSync(password, 4);
const jwtSecret = randomBytes(32).toString('hex');
const frontendOrigin = 'https://game.amphix.site';
const configured = { ADMIN_PASSWORD_HASH: passwordHash, JWT_SECRET: jwtSecret };
const initialSession = {
  id: 'local-test-session', status: 'active', groups: 'A',
  validation_code: '1234', unlimited_codes: '', duration_seconds: 600,
};

test('production mode accepts the casing actually observed on the host', () => {
  for (const NODE_ENV of ['production', 'Production', ' PRODUCTION ']) {
    const config = readAdminAuthConfig({ ...configured, NODE_ENV });
    assert.equal(config.isProduction, true);
    assert.equal(config.secureCookies, true);
    assert.deepEqual(config.adminCookieOptions, {
      httpOnly: true, secure: true, sameSite: 'none', path: '/',
    });
    assert.equal(config.sessionName, 'amphix_admin_session');
  }
});

test('production defaults to secure cross-site cookies; local HTTP remains supported', () => {
  for (const SECURE_COOKIES of [undefined, '', '  ', 'true', ' TRUE ']) {
    assert.equal(readAdminAuthConfig({ ...configured, NODE_ENV: 'Production', SECURE_COOKIES }).secureCookies, true);
  }
  const local = readAdminAuthConfig({ ...configured, NODE_ENV: 'development', SECURE_COOKIES: 'false' });
  assert.equal(local.isProduction, false);
  assert.deepEqual(local.adminCookieOptions, {
    httpOnly: true, secure: false, sameSite: 'lax', path: '/',
  });
  assert.equal(readAdminAuthConfig(configured).secureCookies, false);
});

test('insecure or misspelled production cookie flags fail before any login', () => {
  for (const SECURE_COOKIES of ['false', ' FALSE ', 'yes', '1']) {
    assert.throws(() => readAdminAuthConfig({ ...configured, NODE_ENV: 'Production', SECURE_COOKIES }), /SECURE_COOKIES/);
  }
});

test('malformed bcrypt configuration is not disguised as an incorrect password', () => {
  for (const ADMIN_PASSWORD_HASH of ['plain-password', 'fixture-placeholder-hash', passwordHash.slice(0, -1), `"${passwordHash}"`]) {
    assert.throws(() => readAdminAuthConfig({ ...configured, ADMIN_PASSWORD_HASH }), (error: Error) => {
      assert.match(error.message, /Invalid ADMIN_PASSWORD_HASH/);
      assert.ok(!error.message.includes(ADMIN_PASSWORD_HASH));
      assert.ok(!error.message.includes(jwtSecret));
      return true;
    });
  }
});

test('required signing settings are validated; SESSION_SECRET does not replace JWT_SECRET', () => {
  assert.throws(() => readAdminAuthConfig({ JWT_SECRET: jwtSecret }), /Missing ADMIN_PASSWORD_HASH/);
  assert.throws(() => readAdminAuthConfig({ ADMIN_PASSWORD_HASH: passwordHash }), /Missing JWT_SECRET/);
  assert.throws(() => readAdminAuthConfig({ ...configured, JWT_SECRET: '   ' }), /Missing JWT_SECRET/);
  assert.throws(() => readAdminAuthConfig({ ADMIN_PASSWORD_HASH: passwordHash, SESSION_SECRET: 'test-only' }), /Missing JWT_SECRET/);
  assert.equal(readAdminAuthConfig({ ...configured, SESSION_NAME: 'test_admin_cookie' }).sessionName, 'test_admin_cookie');
});

const listenLocally = (server: Server) => new Promise<string>((resolve, reject) => {
  server.once('error', reject);
  server.listen(0, '127.0.0.1', () => {
    server.removeListener('error', reject);
    const address = server.address();
    if (!address || typeof address === 'string') return reject(new Error('Expected a local TCP test server'));
    resolve(`http://127.0.0.1:${address.port}`);
  });
});

const closeServer = (server: Server) => new Promise<void>((resolve, reject) => {
  server.close(error => error ? reject(error) : resolve());
  server.closeAllConnections();
});

test('real Express admin routes use a local database fixture, never production Supabase', async (t) => {
  let databaseRequests = 0;
  let databaseUnavailable = false;
  let activeSession: Record<string, unknown> = { ...initialSession };
  const database = createServer((req, res) => {
    void (async () => {
      databaseRequests++;
      res.setHeader('Content-Type', 'application/json');
      const url = new URL(req.url || '/', 'http://127.0.0.1');
      if (url.pathname !== '/rest/v1/sessions') {
        res.writeHead(404).end(JSON.stringify({ message: 'Unexpected test database route' }));
        return;
      }
      if (databaseUnavailable) {
        res.writeHead(503).end(JSON.stringify({ message: 'Local test database unavailable' }));
        return;
      }
      if (req.method === 'POST') {
        let body = '';
        for await (const chunk of req) body += chunk;
        activeSession = { id: 'local-created-session', ...JSON.parse(body) };
        res.writeHead(201).end(JSON.stringify(activeSession));
        return;
      }
      // Supabase maybeSingle() requests JSON arrays, converting [] to null.
      const rows = url.searchParams.get('groups') === 'eq.Libre' ? [] : [activeSession];
      res.end(JSON.stringify(rows));
    })().catch(() => res.writeHead(500).end(JSON.stringify({ message: 'Test fixture failed' })));
  });
  const databaseUrl = await listenLocally(database);
  t.after(() => closeServer(database));

  const previousEnvironment = { ...process.env };
  t.after(() => {
    for (const key of Object.keys(process.env)) {
      if (!(key in previousEnvironment)) delete process.env[key];
    }
    Object.assign(process.env, previousEnvironment);
  });
  Object.assign(process.env, {
    ...configured,
    NODE_ENV: 'Production',
    SECURE_COOKIES: '', // exercise the safe production default
    CORS_ORIGINS: frontendOrigin,
    SESSION_NAME: 'amphix_admin_session',
    PLAYER_JWT_SECRET: randomBytes(32).toString('hex'),
    SUPABASE_URL: databaseUrl,
    SUPABASE_SERVICE_ROLE_KEY: 'local-test-service-role-key',
    RATE_LIMIT_WINDOW_MS: '900000',
    RATE_LIMIT_MAX_REQUESTS: '2000',
  });

  // Test the actual app without changing its production entry point or reading
  // a private .env file. Capture app.listen(), then choose a loopback-only port.
  let server: Server | undefined;
  let application: Application | undefined;
  const listening = t.mock.method(express.application, 'listen', function (this: Application) {
    application = this;
    server = createServer(this);
    return server;
  });
  const environmentLoading = t.mock.method(dotenv, 'config', () => ({ parsed: {} }));
  const startupLogging = t.mock.method(console, 'log', () => {});
  try {
    await import('./index.js');
  } finally {
    listening.mock.restore();
    environmentLoading.mock.restore();
    startupLogging.mock.restore();
  }
  assert.ok(server);
  assert.ok(application);
  const backendUrl = await listenLocally(server);
  t.after(() => closeServer(server!));

  const request = (path: string, init: RequestInit = {}) => {
    const headers = new Headers(init.headers);
    headers.set('Origin', frontendOrigin);
    return fetch(`${backendUrl}${path}`, { ...init, headers });
  };
  const post = (path: string, body: unknown, cookie?: string) => request(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(cookie ? { Cookie: cookie } : {}) },
    body: JSON.stringify(body),
  });
  const cookieFor = (token: string) => `amphix_admin_session=${token}`;
  let adminCookie = '';

  await t.test('one trusted proxy separates visitor rate limits and ignores earlier forwarded hops', async (t) => {
    assert.equal(application.get('trust proxy'), 1);
    const validationErrors: unknown[][] = [];
    const logging = t.mock.method(console, 'error', (...args: unknown[]) => {
      validationErrors.push(args);
    });
    try {
      const visitors = [
        { forwardedFor: '203.0.113.10, 198.51.100.10', apiRemaining: '1999', loginRemaining: '19' },
        { forwardedFor: '203.0.113.10, 198.51.100.11', apiRemaining: '1999', loginRemaining: '19' },
        // Changing an earlier, untrusted address must not reset this visitor's limit.
        { forwardedFor: '203.0.113.11, 198.51.100.10', apiRemaining: '1998', loginRemaining: '18' },
      ];
      for (const visitor of visitors) {
        const response = await request('/api/health', {
          headers: { 'X-Forwarded-For': visitor.forwardedFor },
        });
        assert.equal(response.status, 200);
        assert.equal(response.headers.get('ratelimit-limit'), '2000');
        assert.equal(response.headers.get('ratelimit-remaining'), visitor.apiRemaining);
      }
      for (const visitor of visitors) {
        const response = await request('/api/admin/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Forwarded-For': visitor.forwardedFor,
          },
          body: JSON.stringify({ password: 'wrong-proxy-test-password' }),
        });
        assert.equal(response.status, 401);
        assert.equal(response.headers.get('set-cookie'), null);
        assert.equal(response.headers.get('ratelimit-limit'), '20');
        assert.equal(response.headers.get('ratelimit-remaining'), visitor.loginRemaining);
      }
    } finally {
      logging.mock.restore();
    }
    assert.deepEqual(validationErrors, [], 'Forwarded requests must not trigger rate-limiter validation errors');
  });

  await t.test('valid login creates a 24-hour host-only HttpOnly Secure SameSite=None cookie', async () => {
    const response = await post('/api/admin/login', { password });
    assert.equal(response.status, 200);
    assert.equal((await response.json()).expiresIn, 86400);
    const cookie = response.headers.get('set-cookie');
    assert.ok(cookie);
    for (const attribute of ['HttpOnly', 'Secure', 'SameSite=None', 'Path=/', 'Max-Age=86400']) {
      assert.ok(cookie.includes(attribute), `Missing cookie attribute ${attribute}`);
    }
    assert.ok(!cookie.includes('Domain='));
    adminCookie = cookie.split(';')[0];
    const token = decodeURIComponent(adminCookie.slice(adminCookie.indexOf('=') + 1));
    const decoded = jwt.verify(token, jwtSecret);
    assert.equal(typeof decoded, 'object');
    if (typeof decoded !== 'string') {
      assert.equal(decoded.id, 'admin');
      assert.equal(decoded.exp! - decoded.iat!, 86400);
    }
  });

  await t.test('wrong credentials return 401 and never issue an authentication cookie', async () => {
    const response = await post('/api/admin/login', { password: 'wrong-test-password' });
    assert.equal(response.status, 401);
    assert.deepEqual(await response.json(), { error: 'Invalid credentials' });
    assert.equal(response.headers.get('set-cookie'), null);
  });

  await t.test('a missing or non-string password is a bad request, not an authentication bypass', async () => {
    for (const body of [{}, { password: 123 }]) {
      const response = await post('/api/admin/login', body);
      assert.equal(response.status, 400);
      assert.equal(response.headers.get('set-cookie'), null);
    }
  });

  await t.test('valid sessions can verify identity and refresh protected sessions repeatedly', async () => {
    const me = await request('/api/admin/me', { headers: { Cookie: adminCookie } });
    assert.equal(me.status, 200);
    assert.equal((await me.json()).admin.id, 'admin');
    for (let i = 0; i < 2; i++) {
      const response = await request('/api/admin/sessions', { headers: { Cookie: adminCookie } });
      assert.equal(response.status, 200);
      assert.deepEqual(await response.json(), { activeSession: initialSession, libreSession: null });
    }
  });

  await t.test('missing, malformed, expired and wrong-secret cookies return 401 before database access', async () => {
    const expired = jwt.sign({ id: 'admin' }, jwtSecret, { expiresIn: -1 });
    const wrongSecret = jwt.sign({ id: 'admin' }, randomBytes(32).toString('hex'));
    const playerToken = jwt.sign({ playerId: 'test-player', sessionId: 'test-session' }, process.env.PLAYER_JWT_SECRET!);
    const cookies = [undefined, cookieFor('invalid-token'), cookieFor(expired), cookieFor(wrongSecret), cookieFor(playerToken)];
    const before = databaseRequests;
    for (const cookie of cookies) {
      const response = await request('/api/admin/sessions', { headers: cookie ? { Cookie: cookie } : {} });
      assert.equal(response.status, 401);
      const start = await post('/api/admin/sessions/start', {
        duration: 10, categories: ['Culture'], validationCode: '1234', unlimitedCodes: '', groups: ['A'], initialPoints: 3,
      }, cookie);
      assert.equal(start.status, 401);
    }
    assert.equal(databaseRequests, before);
  });

  await t.test('a JWT without administrator identity is not an admin session even with a valid signature', async () => {
    for (const payload of [{ id: 'not-admin' }, { playerId: 'test-player', sessionId: 'test-session' }]) {
      const response = await request('/api/admin/sessions', { headers: { Cookie: cookieFor(jwt.sign(payload, jwtSecret)) } });
      assert.equal(response.status, 401);
    }
  });

  await t.test('an authenticated start request reaches the real route and creates only a local fixture', async () => {
    const response = await post('/api/admin/sessions/start', {
      duration: 10, categories: ['Culture'], validationCode: '1234', unlimitedCodes: '', groups: ['A'], initialPoints: 3,
    }, adminCookie);
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.session.id, 'local-created-session');
    assert.equal(body.session.duration_seconds, 600);
    assert.equal(body.session.validation_code, '1234');
    assert.equal(body.session.initial_points, 3);
  });

  await t.test('database failures remain 500 rather than masquerading as authentication failures', async () => {
    databaseUnavailable = true;
    try {
      const response = await request('/api/admin/sessions', { headers: { Cookie: adminCookie } });
      assert.equal(response.status, 500);
    } finally {
      databaseUnavailable = false;
    }
  });

  await t.test('the real frontend origin receives credentialed CORS and a successful POST preflight', async () => {
    const unauthenticated = await request('/api/admin/me');
    assert.equal(unauthenticated.status, 401);
    assert.equal(unauthenticated.headers.get('access-control-allow-origin'), frontendOrigin);
    assert.equal(unauthenticated.headers.get('access-control-allow-credentials'), 'true');
    const preflight = await request('/api/admin/sessions/start', {
      method: 'OPTIONS', headers: {
        'Access-Control-Request-Method': 'POST', 'Access-Control-Request-Headers': 'content-type',
      },
    });
    assert.equal(preflight.status, 204);
    assert.equal(preflight.headers.get('access-control-allow-origin'), frontendOrigin);
    assert.equal(preflight.headers.get('access-control-allow-credentials'), 'true');
    assert.match(preflight.headers.get('access-control-allow-methods')!, /POST/);
    assert.equal(preflight.headers.get('access-control-allow-headers'), 'content-type');
  });

  await t.test('Production casing no longer enables development LAN CORS exceptions', async () => {
    for (const origin of ['http://192.168.1.12:3000', 'https://unapproved.example']) {
      const response = await fetch(`${backendUrl}/api/admin/me`, { headers: { Origin: origin } });
      assert.equal(response.status, 403);
      assert.equal(response.headers.get('access-control-allow-origin'), null);
    }
  });

  await t.test('logout stays protected and deletes the cookie with matching security attributes', async () => {
    assert.equal((await post('/api/admin/logout', {})).status, 401);
    const response = await post('/api/admin/logout', {}, adminCookie);
    assert.equal(response.status, 200);
    const cookie = response.headers.get('set-cookie');
    assert.ok(cookie);
    for (const attribute of ['HttpOnly', 'Secure', 'SameSite=None', 'Path=/', 'Expires=Thu, 01 Jan 1970']) {
      assert.ok(cookie.includes(attribute), `Missing clear-cookie attribute ${attribute}`);
    }
    const cleared = await request('/api/admin/sessions', { headers: { Cookie: cookie.split(';')[0] } });
    assert.equal(cleared.status, 401);
  });
});
