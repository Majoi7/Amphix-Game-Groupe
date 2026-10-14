# Player Authentication Implementation - Phase 3C.3A

## Overview
This implementation provides a secure player identity and authentication mechanism as required for Phase 3C.3A of the Amphix Game security enhancements. It separates player authentication from admin authentication and ensures that all player-related operations go through verified backend endpoints.

## Backend Changes

### 1. Player Authentication Middleware (`src/server/index.ts`)
- `authenticatePlayer`: Verifies player JWT tokens from HTTP-only cookies
- Attaches player information to request object: `{ id, sessionId, name, groupName }`

### 2. Player Authentication Endpoints
- `POST /api/player/login`: 
  - Validates session exists and is active
  - Checks for existing player or creates new record
  - Issues player JWT token (24h expiration)
  - Sets HTTP-only cookie: `amphix_player_session`
  
- `POST /api/player/logout`:
  - Clears player session cookie
  - Requires player authentication

- `GET /api/player/me`:
  - Returns current player data
  - Requires player authentication

### 3. Player Game Endpoints (Protected)
- `POST /api/player/answer`:
  - Submit answers with question index, selected option, correctness
  - Prevents duplicate answer submission
  - Updates player score and individual points
  - Returns updated player state
  
- `GET /api/player/state`:
  - Retrieves current player statistics and state
  - Includes answered questions count

### 4. Environment Variables
Added to `server/.env.example`:
- `PLAYER_JWT_SECRET`: Secret key for signing player JWT tokens
- `PLAYER_SESSION_NAME`: Cookie name for player session (default: amphix_player_session)

## Frontend Changes

### 1. Modified `startQuiz()` function (`src/App.tsx`)
- Replaced direct Supabase player writes with call to `/api/player/login` endpoint
- Sends sessionId, playerName, and groupName
- Handles response to extract player data and invoke onStart callback

### 2. Modified `handleCheck()` function in QuizScreen (`src/App.tsx`)
- Replaced direct Supabase writes with call to `/api/player/answer` endpoint
- Sends questionIndex, selectedOption, and isCorrect
- Includes error handling that doesn't disrupt gameplay

### 3. Preserved Existing Functionality
- All game logic remains in QuizScreen (answer validation, scoring, lives, etc.)
- Admin authentication and endpoints remain unchanged and separate
- UI components and interactions are preserved
- Real-time updates and subscriptions remain functional

## Security Features

### Player Token Security
- JWT tokens signed with secure secret
- HTTP-only cookies prevent XSS access
- Secure flag for HTTPS production
- SameSite strict protection against CSRF
- 24-hour expiration limits token lifetime

### Authentication Separation
- Player tokens completely separate from admin tokens
- Different cookie names and secrets
- Independent middleware and validation
- No shared validation between systems

### Anti-Cheating Measures
- Server-side validation of all player actions
- Prevention of duplicate answer submission
- Session binding in player tokens prevents token reuse
- Player identity verified for all game operations
- Score updates validated server-side

## Implementation Notes

### Backward Compatibility
- Existing admin functionality unchanged
- Game logic preserved in frontend (for now)
- API endpoints designed to be extensible

### Future Enhancements (Phase 3C.3 and Beyond)
- Move game logic validation to backend
- Add more sophisticated anti-tampering measures
- Implement refresh tokens for extended play
- Add detailed audit logging
- Enhance rate limiting for player endpoints

### Deployment Requirements
1. Set `PLAYER_JWT_SECRET` in backend environment (32+ byte random string)
2. Ensure frontend points to correct `VITE_API_BASE_URL`
3. Enable `SECURE_COOKIES=true` in production with HTTPS
4. Verify CORS settings allow frontend to backend communication with credentials

## Files Modified
- `server/src/index.ts`: Added player auth middleware and endpoints
- `server/.env.example`: Added player auth environment variables
- `src/App.tsx`: 
  - Modified `startQuiz()` to use player login endpoint
  - Modified `QuizScreen.handleCheck()` to use player answer endpoint
- Created `PLAYER_AUTH_SUMMARY.md`: This document

## Testing
To test the implementation:
1. Start backend server
2. Visit the game frontend
3. Enter a valid session code and player name
4. Verify player is authenticated and can submit answers
5. Check that player state is maintained correctly
6. Verify admin authentication remains separate and functional