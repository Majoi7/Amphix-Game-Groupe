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
SESSION_SECRET=your_session_secret_here_change_in_production
```

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