import { useEffect, useRef } from 'react';

type Subscribe = (refresh: () => void) => () => void;

export const startAdminRefresh = (isValidated: boolean, refresh: () => Promise<void>, subscribe: Subscribe) => {
  if (!isValidated) return () => {};
  let active = true;
  const runRefresh = () => {
    if (active) void refresh();
  };
  runRefresh();
  const unsubscribe = subscribe(runRefresh);
  const interval = setInterval(runRefresh, 30000);
  return () => {
    active = false;
    clearInterval(interval);
    unsubscribe();
  };
};

/** Polling and realtime callbacks share the latest handler and stop on logout. */
export const useAdminRefresh = (isValidated: boolean, refresh: () => Promise<void>, subscribe: Subscribe) => {
  const refreshCallback = useRef(refresh);
  refreshCallback.current = refresh;

  useEffect(() => startAdminRefresh(isValidated, () => refreshCallback.current(), subscribe),
    [isValidated, subscribe]);
};
