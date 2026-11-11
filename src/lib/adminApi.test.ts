import assert from 'node:assert/strict';
import test from 'node:test';
import { AdminApiError, createAdminApi } from './adminApi.ts';

const backendUrl = 'https://amphix7-002-site1.itempurl.com';
const sessions = { activeSession: { id: 'test-session' }, libreSession: null };
const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { 'Content-Type': 'application/json' },
});

const createFixture = (responses: Response[]) => {
  const calls: { url: string; init: RequestInit }[] = [];
  let unauthorizedCount = 0;
  const api = createAdminApi({
    baseUrl: `${backendUrl}/`,
    onUnauthorized: () => { unauthorizedCount++; },
    fetchImpl: async (url, init) => {
      calls.push({ url, init });
      const response = responses.shift();
      assert.ok(response, 'Unexpected extra request');
      return response;
    },
  });
  return { api, calls, unauthorizedCount: () => unauthorizedCount };
};

test('login verifies the HttpOnly cookie through a protected request before succeeding', async () => {
  const fixture = createFixture([json({ success: true }), json(sessions)]);
  await fixture.api.login('test-password');
  assert.deepEqual(fixture.calls.map(call => call.url), [
    `${backendUrl}/api/admin/login`, `${backendUrl}/api/admin/sessions`,
  ]);
  assert.equal(fixture.calls[0].init.method, 'POST');
  assert.equal(fixture.calls[0].init.body, JSON.stringify({ password: 'test-password' }));
  assert.deepEqual(fixture.calls[0].init.headers, { 'Content-Type': 'application/json' });
  assert.ok(fixture.calls.every(call => call.init.credentials === 'include'));
  assert.equal(fixture.unauthorizedCount(), 0);
});

test('wrong credentials return 401 without opening a dashboard or starting refresh', async () => {
  const fixture = createFixture([json({ error: 'Invalid password' }, 401)]);
  await assert.rejects(fixture.api.login('wrong'), (error: AdminApiError) => error.status === 401);
  assert.equal(fixture.calls.length, 1);
  assert.equal(fixture.unauthorizedCount(), 0);
});

test('a login 200 with a missing or rejected cookie does not validate the administrator', async () => {
  const fixture = createFixture([json({ success: true }), json({ error: 'Not authenticated' }, 401)]);
  await assert.rejects(fixture.api.login('test-password'), (error: AdminApiError) =>
    error.status === 401 && error.message.includes('cookies'));
  assert.equal(fixture.calls.length, 2);
  assert.equal(fixture.unauthorizedCount(), 0);
});

test('refresh returns the protected sessions when the session remains valid', async () => {
  const fixture = createFixture([json(sessions), json(sessions)]);
  assert.deepEqual(await fixture.api.getSessions(), sessions);
  assert.deepEqual(await fixture.api.getSessions(), sessions);
  assert.ok(fixture.calls.every(call => call.init.credentials === 'include'));
  assert.equal(fixture.unauthorizedCount(), 0);
});

test('expired session requests re-authentication once and prevents a refresh loop', async () => {
  const fixture = createFixture([json({ error: 'Invalid token' }, 401)]);
  await assert.rejects(fixture.api.getSessions(), (error: AdminApiError) => error.status === 401);
  await assert.rejects(fixture.api.getSessions(), (error: AdminApiError) => error.status === 401);
  await assert.rejects(fixture.api.startSession(10, ['Culture'], '', '', [], 3),
    (error: AdminApiError) => error.status === 401);
  assert.equal(fixture.calls.length, 1);
  assert.equal(fixture.unauthorizedCount(), 1);
});

test('successful re-authentication re-enables refresh after an expired session', async () => {
  const fixture = createFixture([
    json({ error: 'Invalid token' }, 401), json({ success: true }), json(sessions), json(sessions),
  ]);
  await assert.rejects(fixture.api.getSessions());
  await fixture.api.login('test-password');
  assert.deepEqual(await fixture.api.getSessions(), sessions);
  assert.equal(fixture.calls.length, 4);
  assert.equal(fixture.unauthorizedCount(), 1);
});

test('every admin mutation sends JSON and cookies to the same production backend', async () => {
  const fixture = createFixture(Array.from({ length: 7 }, () => json({ success: true })));
  await fixture.api.updateValidationCode('test-session', '1234');
  await fixture.api.updateUnlimitedCodes('test-session', 'TEST-1234');
  await fixture.api.updateSessionGroups('test-session', ['A']);
  await fixture.api.startSession(10, ['Culture'], '1234', '', ['A'], 3);
  await fixture.api.stopSession('test-session');
  await fixture.api.deletePlayer('test-player');
  await fixture.api.deleteAllPlayers('test-session');
  assert.deepEqual(fixture.calls.map(call => call.url), [
    '/sessions/update-validation-code', '/sessions/update-unlimited-codes', '/sessions/update-groups',
    '/sessions/start', '/sessions/stop', '/players/delete', '/players/delete-all',
  ].map(path => `${backendUrl}/api/admin${path}`));
  for (const { init } of fixture.calls) {
    assert.equal(init.method, 'POST');
    assert.equal(init.credentials, 'include');
    assert.deepEqual(init.headers, { 'Content-Type': 'application/json' });
    assert.equal(typeof init.body, 'string');
  }
  assert.deepEqual(JSON.parse(fixture.calls[3].init.body as string), {
    duration: 10, categories: ['Culture'], validationCode: '1234', unlimitedCodes: '', groups: ['A'], initialPoints: 3,
  });
});

test('a 401 on startSession requests re-authentication instead of ignoring authentication failure', async () => {
  const fixture = createFixture([json({ error: 'Not authenticated' }, 401)]);
  assert.equal((await fixture.api.startSession(10, ['Culture'], '', '', [], 3)).status, 401);
  assert.equal(fixture.unauthorizedCount(), 1);
});

test('non-authentication errors do not expire a valid session', async () => {
  const fixture = createFixture([json({ error: 'Database unavailable' }, 500), json(sessions)]);
  await assert.rejects(fixture.api.getSessions(), (error: AdminApiError) => error.status === 500);
  assert.deepEqual(await fixture.api.getSessions(), sessions);
  assert.equal(fixture.unauthorizedCount(), 0);
});

test('logout sends the HttpOnly cookie and prevents refresh until a new successful login', async () => {
  const fixture = createFixture([json({ message: 'Logged out successfully' }), json({ success: true }), json(sessions), json(sessions)]);
  await fixture.api.logout();
  assert.equal(fixture.calls[0].url, `${backendUrl}/api/admin/logout`);
  assert.equal(fixture.calls[0].init.method, 'POST');
  assert.equal(fixture.calls[0].init.credentials, 'include');
  await assert.rejects(fixture.api.getSessions(), (error: AdminApiError) => error.status === 401);
  assert.equal(fixture.calls.length, 1);
  assert.equal(fixture.unauthorizedCount(), 0);
  await fixture.api.login('test-password');
  assert.deepEqual(await fixture.api.getSessions(), sessions);
});

test('a failed logout reports the server error without pretending the cookie was deleted', async () => {
  const fixture = createFixture([json({ error: 'Server unavailable' }, 500)]);
  await assert.rejects(fixture.api.logout(), (error: AdminApiError) => error.status === 500);
  assert.equal(fixture.unauthorizedCount(), 0);
});

test('same-origin API URLs work without inventing an undefined production hostname', async () => {
  let requestedUrl = '';
  const api = createAdminApi({
    onUnauthorized: () => assert.fail('Unexpected 401'),
    fetchImpl: async (url, init) => {
      requestedUrl = url;
      assert.equal(init.credentials, 'include');
      return json(sessions);
    },
  });
  await api.getSessions();
  assert.equal(requestedUrl, '/api/admin/sessions');
});
