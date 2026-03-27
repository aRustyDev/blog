# Phase 2: GitHub OAuth Flow

## Goal

Implement GitHub OAuth login/logout endpoints in the Worker.

## Implementation Steps

1. Register GitHub OAuth App (Client ID + Secret stored in Workers Secrets)
2. `/auth/login` — redirect to GitHub OAuth authorize URL with state parameter
3. `/auth/callback` — exchange code for access token, fetch user info, check allowlist, set signed JWT cookie
4. `/auth/logout` — clear cookie, redirect to home
5. JWT cookie: signed with Workers Secret, contains GitHub user ID, expires in 7 days
6. Allowlist: GitHub user IDs stored in Workers environment variable or KV

## Files to Create

- `src/worker/auth.ts` — OAuth handlers (login, callback, logout)
- `src/worker/jwt.ts` — JWT sign/verify using Web Crypto API (no external deps)

## Acceptance Criteria

- [ ] `/auth/login` redirects to GitHub
- [ ] `/auth/callback` exchanges code, validates user, sets cookie
- [ ] `/auth/logout` clears cookie
- [ ] Only allowlisted GitHub user IDs pass auth
- [ ] JWT signed with Workers Secret (not hardcoded)
