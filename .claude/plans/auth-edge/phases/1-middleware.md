# Phase 1: Cloudflare Workers Middleware

## Goal

Add a Worker entry point that intercepts requests before serving static assets, enabling auth checks on specific paths.

## Files to Create/Modify

- `src/worker/index.ts` — Worker entry point with `fetch` handler
- `wrangler.jsonc` — add `main` entry point, keep `assets` config

## Implementation Steps

1. Create `src/worker/index.ts` with a `fetch` handler that:
   - Checks request URL against draft manifest
   - If not a draft URL: pass through to static assets (`env.ASSETS.fetch(request)`)
   - If draft URL: check for auth cookie, validate, serve or redirect to login
2. Update `wrangler.jsonc` to add `main: "./src/worker/index.ts"` alongside existing `assets` config
3. Build script: generate `_drafts-manifest.json` listing all draft post URLs at build time

## Acceptance Criteria

- [ ] Worker intercepts requests before static assets
- [ ] Non-draft pages served with zero latency overhead
- [ ] Draft manifest generated at build time
- [ ] `wrangler.jsonc` valid with both `main` and `assets`
