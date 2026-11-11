export class AdminApiError extends Error {
  constructor(public readonly status: number, message: string) {
    super(message);
    this.name = 'AdminApiError';
  }
}

export const isAdminUnauthorizedError = (error: unknown): error is AdminApiError =>
  error instanceof AdminApiError && error.status === 401;

type AdminApiOptions = {
  baseUrl?: string;
  onUnauthorized: () => void;
  fetchImpl?: (url: string, init: RequestInit) => Promise<Response>;
};

export const createAdminApi = ({ baseUrl = '', onUnauthorized, fetchImpl = fetch }: AdminApiOptions) => {
  const apiUrl = `${baseUrl.replace(/\/+$/, '')}/api/admin`;
  let authenticationLost = false;

  const request = async (path: string, init: RequestInit = {}, notifyUnauthorized = true) => {
    if (notifyUnauthorized && authenticationLost) {
      throw new AdminApiError(401, 'Session administrateur expirée ou invalide. Reconnectez-vous.');
    }
    const response = await fetchImpl(`${apiUrl}${path}`, {
      ...init,
      // The JWT stays in the backend's HttpOnly cookie, never in browser storage.
      credentials: 'include',
    });
    if (response.status === 401 && notifyUnauthorized && !authenticationLost) {
      authenticationLost = true;
      onUnauthorized();
    }
    return response;
  };

  const requireSuccess = async (response: Response) => {
    if (response.ok) return;
    const data = await response.json().catch(() => ({}));
    throw new AdminApiError(response.status, data?.error || `Erreur HTTP ${response.status}`);
  };

  const post = (path: string, body: unknown, notifyUnauthorized = true) => request(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }, notifyUnauthorized);

  return {
    login: async (password: string) => {
      const response = await post('/login', { password }, false);
      await requireSuccess(response);

      // A 200 from login alone does not prove that the browser accepted the cookie.
      // In particular, cross-site cookie blocking can otherwise open a broken dashboard.
      const sessionResponse = await request('/sessions', {}, false);
      if (sessionResponse.status === 401) {
        throw new AdminApiError(401,
          'Connexion acceptée, mais la session administrateur n’est pas reconnue. Vérifiez les cookies et la configuration du domaine.');
      }
      await requireSuccess(sessionResponse);
      authenticationLost = false;
    },
    logout: async () => {
      const response = await post('/logout', {});
      await requireSuccess(response);
      authenticationLost = true;
    },
    getSessions: async (): Promise<{ activeSession: any; libreSession: any }> => {
      const response = await request('/sessions');
      await requireSuccess(response);
      return response.json();
    },
    updateValidationCode: (sessionId: string, validationCode: string) =>
      post('/sessions/update-validation-code', { sessionId, validationCode }),
    updateUnlimitedCodes: (sessionId: string, unlimitedCodes: string) =>
      post('/sessions/update-unlimited-codes', { sessionId, unlimitedCodes }),
    updateSessionGroups: (sessionId: string, groups: string[]) =>
      post('/sessions/update-groups', { sessionId, groups }),
    startSession: (duration: number, categories: string[], validationCode: string, unlimitedCodes: string, groups: string[], initialPoints: number) =>
      post('/sessions/start', { duration, categories, validationCode, unlimitedCodes, groups, initialPoints }),
    stopSession: (sessionId: string) => post('/sessions/stop', { sessionId }),
    deletePlayer: (playerId: string) => post('/players/delete', { playerId }),
    deleteAllPlayers: (sessionId: string) => post('/players/delete-all', { sessionId }),
  };
};
