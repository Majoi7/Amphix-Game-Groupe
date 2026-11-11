import assert from 'node:assert/strict';
import test from 'node:test';
import { startAdminRefresh } from './useAdminRefresh.ts';
import { createAdminApi } from './adminApi.ts';

const flush = () => new Promise<void>(resolve => setImmediate(resolve));

test('no refresh, interval or realtime subscription starts before authentication', async (t) => {
  t.mock.timers.enable({ apis: ['setInterval'] });
  let refreshCount = 0;
  let subscriptions = 0;
  const stop = startAdminRefresh(false, async () => { refreshCount++; }, () => {
    subscriptions++;
    return () => {};
  });
  t.mock.timers.tick(90000);
  await flush();
  stop();
  assert.equal(refreshCount, 0);
  assert.equal(subscriptions, 0);
});

test('a valid session refreshes immediately, every 30 seconds and on realtime events', async (t) => {
  t.mock.timers.enable({ apis: ['setInterval'] });
  let refreshCount = 0;
  let unsubscribeCount = 0;
  let realtime = () => {};
  const stop = startAdminRefresh(true, async () => { refreshCount++; }, refresh => {
    realtime = refresh;
    return () => { unsubscribeCount++; };
  });
  assert.equal(refreshCount, 1);
  t.mock.timers.tick(30000);
  assert.equal(refreshCount, 2);
  realtime();
  assert.equal(refreshCount, 3);
  stop();
  t.mock.timers.tick(90000);
  realtime();
  await flush();
  assert.equal(refreshCount, 3);
  assert.equal(unsubscribeCount, 1);
});

test('setup after cleanup restarts refresh without leaving the previous interval active', async (t) => {
  t.mock.timers.enable({ apis: ['setInterval'] });
  let refreshCount = 0;
  let subscriptions = 0;
  let unsubscribeCount = 0;
  const refresh = async () => { refreshCount++; };
  const subscribe = () => {
    subscriptions++;
    return () => { unsubscribeCount++; };
  };
  const firstStop = startAdminRefresh(true, refresh, subscribe);
  firstStop();
  const secondStop = startAdminRefresh(true, refresh, subscribe);
  assert.equal(refreshCount, 2);
  assert.equal(subscriptions, 2);
  assert.equal(unsubscribeCount, 1);
  t.mock.timers.tick(30000);
  assert.equal(refreshCount, 3);
  secondStop();
  t.mock.timers.tick(60000);
  await flush();
  assert.equal(refreshCount, 3);
  assert.equal(unsubscribeCount, 2);
});

test('an expired session ends polling and realtime refresh instead of repeating 401 requests', async (t) => {
  t.mock.timers.enable({ apis: ['setInterval'] });
  let requestCount = 0;
  let unauthorizedCount = 0;
  let unsubscribeCount = 0;
  let stop = () => {};
  let realtime = () => {};
  const api = createAdminApi({
    onUnauthorized: () => { unauthorizedCount++; stop(); },
    fetchImpl: async () => {
      requestCount++;
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401, headers: { 'Content-Type': 'application/json' },
      });
    },
  });
  stop = startAdminRefresh(true, async () => {
    await api.getSessions().catch(() => {});
  }, refresh => {
    realtime = refresh;
    return () => { unsubscribeCount++; };
  });
  await flush();
  t.mock.timers.tick(120000);
  realtime();
  await flush();
  assert.equal(requestCount, 1);
  assert.equal(unauthorizedCount, 1);
  assert.equal(unsubscribeCount, 1);
});
