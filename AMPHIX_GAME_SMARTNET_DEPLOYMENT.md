# Amphix Game Smartnet Backend Deployment Guide

## Overview
This document describes how to deploy the Smartnet backend for Amphix Game. The backend provides a secure intermediary between the frontend and Supabase, protecting service keys and enabling future enhancements.

## Prerequisites
- Node.js >= 18
- npm >= 9
- Supabase project with service role key

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd Amphix-Game-Groupe
```

### 2. Install dependencies
```bash
npm install
```

## Environment Configuration

### Frontend (.env)
Copy the example file and fill in your Supabase credentials:
```bash
cp .env.example .env
```
Then edit `.env` to add your actual Supabase URL and anon key:
```
VITE_SUPABASE_URL=your_actual_supabase_url
VITE_SUPABASE_ANON_KEY=your_actual_supabase_anon_key
VITE_API_BASE_URL=http://localhost:3001
```

### Backend (server/.env)
Copy the example file and fill in your Supabase credentials:
```bash
cp server/.env.example server/.env
```
Then edit `server/.env` to add your actual Supabase URL and service role key:
```
NODE_ENV=development
HOST=0.0.0.0
PORT=3001
SUPABASE_URL=your_actual_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_actual_supabase_service_role_key
CORS_ORIGINS=http://localhost:3000
ADMIN_PASSWORD_HASH=your_complete_bcrypt_hash
JWT_SECRET=your_stable_random_admin_jwt_secret
PLAYER_JWT_SECRET=your_separate_random_player_jwt_secret
SECURE_COOKIES=false
```
`SESSION_SECRET` does not replace `JWT_SECRET`: administrator authentication
uses a signed JWT in an HttpOnly cookie, not an Express session store.

## Development Setup

### Start the backend server
```bash
npm run server:dev
```
This will start the backend on `http://localhost:3001` with hot reloading.

### Start the frontend
In a separate terminal:
```bash
npm run dev
```
This will start the frontend on `http://localhost:3000`.

### Start both concurrently
```bash
npm run dev:full
```
This uses concurrently to run both frontend and backend development servers.

## Production Build

### Build the backend
```bash
npm run server:build
```
This compiles the TypeScript backend into `dist/`. The compiled entry point is
`dist/server/src/index.js`, and because the backend imports the question data
from the frontend source tree, that file is emitted alongside it at
`dist/src/data/questions.js`. Both must be present at runtime.

### Start the backend in production
```bash
npm run server:start
```
This runs the compiled backend from `dist/server/src/index.js` (not
`dist/server/index.js`).

### Long-running server environment variables
The backend normally listens on `HOST=0.0.0.0` and `PORT=3001`. Most hosts
inject their own `PORT`, and the server already honours it.
For a public deployment, `CORS_ORIGINS` must contain the real frontend origin
(comma-separated list allowed) and `PLAYER_JWT_SECRET` **must** be set
explicitly — the development fallback that derives it from `JWT_SECRET` is
disabled when `NODE_ENV=production`, so the server refuses to start without it.

### SmarterASP and Vercel: administrator authentication

The frontend `https://game.amphix.site` and backend
`https://amphix7-002-site1.itempurl.com` are **cross-site**. Cookies must use
`HttpOnly; Secure; SameSite=None; Path=/`. Keep them host-only: do not set
`Domain=game.amphix.site` on a response from the backend's unrelated domain.

Set these values in the SmarterASP Node application's environment panel:

| Variable | Production value or requirement |
| --- | --- |
| `NODE_ENV` | `production` (lowercase recommended; casing/whitespace is normalized by the auth configuration) |
| `SECURE_COOKIES` | `true`; omitted defaults to true in production; explicit false or invalid values stop startup |
| `CORS_ORIGINS` | `https://game.amphix.site`, without a trailing slash; add only approved exact origins |
| `ADMIN_PASSWORD_HASH` | Complete bcrypt hash of the administrator password, not the plain password; no extra quotes/whitespace in the panel |
| `JWT_SECRET` | Strong random signing secret, stable across restarts and identical on every backend instance |
| `PLAYER_JWT_SECRET` | Strong independent random secret, explicitly required in production |
| `SESSION_NAME` | `amphix_admin_session`, or the same custom name on every instance |
| `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` | Existing backend-only Supabase settings; never expose the service-role key to Vercel's frontend |
| `PORT` | Keep the port injected by the host; do not overwrite it with the local development port |

`dotenv` loads `server/.env` relative to the application working directory with
`override: false`: injected environment variables take priority. Check the
existing presence-only startup diagnostics, never log secret values. A missing
or malformed bcrypt hash or missing `JWT_SECRET` now produces a configuration
error at startup, instead of an apparently incorrect password during login.
`SESSION_SECRET` is not used in this administrator login flow.

In Vercel, the Production environment must contain:

```text
VITE_API_BASE_URL=https://amphix7-002-site1.itempurl.com
```

Retain the existing `VITE_SUPABASE_URL` and public `VITE_SUPABASE_ANON_KEY`.
Never put `ADMIN_PASSWORD_HASH`, `JWT_SECRET`, `PLAYER_JWT_SECRET` or the
Supabase service-role key in a `VITE_*` variable. Vite embeds `VITE_*` values
at build time, so changing a Vercel variable requires a new frontend deployment.
The published frontend already uses the correct backend URL and
`credentials: 'include'`; a redeployment is still needed to ship the updated
login/session verification and refresh behavior. A local `.env` pointing at
`http://localhost:3001` must not be used for the production frontend build.

#### Build and deployment order

1. Run `npm test`, `npm run lint`, and `npm run build` with the intended frontend
   build environment. Then run `npm run server:build` **after** the Vite build:
   Vite empties `dist/`, while both builds emit into that directory.
2. Deploy the compiled backend and question data, configure the environment
   above, and restart the SmarterASP Node application using `npm start`.
3. Redeploy Vercel with the production API URL. No Git commit, push, or remote
   deployment is implied by local validation; each must be authorized separately.
4. Log in privately in the browser and check the cookie roundtrip as described
   below. Never paste a password, JWT, cookie value, or unredacted HAR into a report.

#### Browser verification after deployment

- `POST /api/admin/login` with a valid password returns 200 and sets the admin
  cookie. In DevTools, check the cookie's **attributes and rejection reason**,
  not its value. A 200 alone does not prove the cookie was stored.
- The frontend then verifies the session on a protected endpoint before opening
  the dashboard. That request and `GET /api/admin/sessions` must carry the admin
  cookie and return 200. A database failure is a 500, not a 401.
- A valid `POST /api/admin/sessions/start` should return 200; without a cookie,
  or with an invalid/expired cookie, both protected session routes must return 401.
  Do not start a real game merely to test without approval.
- The response must contain the exact
  `Access-Control-Allow-Origin: https://game.amphix.site` and
  `Access-Control-Allow-Credentials: true`. The POST preflight must succeed.
- On an expired session, the dashboard closes and requests reauthentication
  once; polling and realtime refresh must not repeat unauthorized requests.
- The logout button calls the protected `POST /api/admin/logout` route, which
  deletes the HttpOnly cookie with matching security attributes. If that request
  fails, the frontend reports the failure rather than claiming the cookie was
  deleted. Logout removes the browser cookie; an already copied JWT remains
  valid until its 24-hour expiry (there is no server-side JWT revocation store).

`Authentication required` means the expected cookie was absent/empty;
`Invalid or expired token` means JWT validation failed. If the cookie is sent
but validation fails immediately after login, check that the deployed instances
share the same stable `JWT_SECRET` and `SESSION_NAME`.

Browsers can block third-party cookies even with `SameSite=None; Secure` and
correct CORS. If DevTools confirms such a block, the durable solution is an
approved same-site API domain (for example `api.amphix.site`, with DNS/TLS/backend
routing configured) or a suitable same-origin proxy. That infrastructure change
is not implemented here. Do not make admin routes public or move the JWT into
`localStorage` to bypass browser policy.

## API Endpoints

### Health Check
```
GET /api/health
```
Returns: `{ status: 'ok', timestamp: 'ISO timestamp' }`

### Configuration Verification
```
GET /api/config
```
Returns non-sensitive configuration status:
```json
{
  "supabaseUrl": "configured|missing",
  "supabaseServiceRoleKey": "configured|missing",
  "port": 3001,
  "nodeEnv": "development|production"
}
```

## Security Features

### Environment Variable Protection
- All environment variables are loaded via `dotenv`
- `.env` files are protected by `.gitignore`
- Only `.env.example` is committed to the repository

### Supabase Service Role
- Backend uses Supabase service role key (never exposed to frontend)
- Service role key provides full database access for backend operations
- Frontend continues to use anon key for client-side operations

### CORS Protection
- Configured via `CORS_ORIGINS` environment variable
- Defaults to localhost:3000 for development

## Verification

### Check that backend is running
```bash
curl http://localhost:3001/api/health
```
Should return: `{"status":"ok","timestamp":"..."}`

### Check configuration
```bash
curl http://localhost:3001/api/config
```
Should return configuration status without exposing secrets.

## Troubleshooting

### "Missing Supabase environment variables" error
- Ensure `server/.env` contains `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`
- Verify file is in the correct location (`server/` directory)
- Check for typos in variable names

### Port already in use
- Change `PORT` in `server/.env`
- Or free up the port being used

### CORS errors in browser
- Verify `CORS_ORIGINS` in `server/.env` matches your frontend URL
- For production, set to your actual domain

### Backend not connecting to Supabase
- Verify `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are correct
- Check that your Supabase project is active
- Ensure the service role key has not been rotated

## File Structure
```
server/
├── src/
│   └── index.ts          # Backend entry point
├── .env.example          # Backend environment template
├── tsconfig.json         # TypeScript configuration
└── package.json          # Scripts and dependencies (shared with frontend)

.env.example              # Frontend environment template
.gitignore                # Protects .env files
```

## Next Steps (Future Phases)
1. **Authentication Admin**: Migrate admin password validation to backend
2. **Question Management**: Move questions data to Supabase with secure backend access
3. **Game Logic Migration**: Move game scoring, lives, and state updates to backend
4. **Admin Dashboard**: Migrate admin session management to backend
5. **Advanced Features**: Add rate limiting, logging, and monitoring

## Maintenance
- Regularly rotate Supabase service role key
- Monitor backend logs for errors
- Keep dependencies updated with `npm update`
- Backup Supabase project regularly