# Auth Edge Middleware

## Overview

Edge middleware on Cloudflare Workers that gates draft posts behind GitHub OAuth while keeping the blog fully static. Auth is handled at the CDN edge before static assets are served.

## Architecture

- **Static stays static**: Blog remains SSG. No Astro SSR mode needed.
- **Edge middleware**: Cloudflare Workers `main` entry point runs before static asset serving
- **GitHub OAuth**: Identity provider (user already has GitHub account)
- **Allowlist**: Only specific GitHub user IDs can access drafts
- **Cookie-based sessions**: Signed JWT cookie with expiry

## Phase Table

| Phase | Title | Depends On | Complexity |
|-------|-------|------------|------------|
| 1 | [Cloudflare Workers Middleware](./phases/1-middleware.md) | — | Medium |
| 2 | [GitHub OAuth Flow](./phases/2-github-oauth.md) | Phase 1 | Medium |
| 3 | [Draft Page Gating](./phases/3-draft-gating.md) | Phases 1, 2 | Medium |
| 4 | [Auth UI](./phases/4-auth-ui.md) | Phase 3 | Low |

## Key Decisions

- Edge middleware approach (not SSR) — keeps deployment model unchanged
- Draft manifest generated at build time — middleware reads it to know which URLs require auth
- `wrangler.jsonc` gets a `main` entry point for the middleware worker
- KV or D1 for session storage (KV is simpler for this use case)
