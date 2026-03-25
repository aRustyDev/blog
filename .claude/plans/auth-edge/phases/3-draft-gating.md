# Phase 3: Draft Page Gating

## Goal

Gate draft post URLs behind auth while serving all other pages normally.

## Implementation Steps

1. Build time: scan content collection for `draft: true` posts, generate `_drafts-manifest.json` with their URLs
2. Worker: on each request, check if URL matches a draft manifest entry
3. If match + no valid auth cookie: redirect to `/auth/login?redirect={url}`
4. If match + valid auth cookie: serve the static page via `env.ASSETS.fetch(request)`
5. If no match: serve normally (zero overhead — just a Set lookup)

## Files to Modify

- `src/worker/index.ts` — add draft checking logic
- Build script — generate `_drafts-manifest.json` from content collection

## Acceptance Criteria

- [ ] Draft URLs require authentication
- [ ] Non-draft URLs served without auth check
- [ ] Auth redirect preserves original URL for post-login redirect
- [ ] Manifest regenerated on each build
