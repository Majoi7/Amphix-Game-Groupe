import type { CookieOptions } from 'express';

type Environment = Record<string, string | undefined>;

/** Validate configuration before accepting logins; never include secret values in errors. */
export const readAdminAuthConfig = (environment: Environment = process.env) => {
  const isProduction = environment.NODE_ENV?.trim().toLowerCase() === 'production';
  const adminPasswordHash = environment.ADMIN_PASSWORD_HASH;
  const jwtSecret = environment.JWT_SECRET;

  if (!adminPasswordHash) {
    throw new Error('Missing ADMIN_PASSWORD_HASH environment variable. Please set it with a bcrypt hash of the admin password.');
  }
  // bcrypt.compare can return false for a malformed hash, disguising a deployment
  // configuration error as an incorrect administrator password (HTTP 401).
  if (!/^\$2[aby]\$(0[4-9]|[12]\d|3[01])\$[./A-Za-z0-9]{53}$/.test(adminPasswordHash)) {
    throw new Error('Invalid ADMIN_PASSWORD_HASH configuration. Expected a complete bcrypt hash, not a plain password or a placeholder.');
  }
  if (!jwtSecret?.trim()) {
    throw new Error('Missing JWT_SECRET environment variable. Please set it to a secure random string.');
  }

  const secureSetting = environment.SECURE_COOKIES?.trim().toLowerCase();
  if (secureSetting && secureSetting !== 'true' && secureSetting !== 'false') {
    throw new Error('Invalid SECURE_COOKIES configuration. Expected true or false.');
  }
  const secureCookies = secureSetting ? secureSetting === 'true' : isProduction;
  if (isProduction && !secureCookies) {
    throw new Error('SECURE_COOKIES must be true in production. HTTPS is required for cross-site authentication.');
  }

  const adminCookieOptions: CookieOptions = {
    httpOnly: true,
    secure: secureCookies,
    sameSite: secureCookies ? 'none' : 'lax',
    path: '/',
    // No Domain: only the backend host receives the HttpOnly authentication cookie.
  };

  return {
    adminPasswordHash,
    jwtSecret,
    sessionName: environment.SESSION_NAME || 'amphix_admin_session',
    isProduction,
    secureCookies,
    adminCookieOptions,
  };
};
