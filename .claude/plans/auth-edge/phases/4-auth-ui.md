# Phase 4: Auth UI

## Goal

Visual indicators for auth state and draft status.

## Implementation Steps

1. Login button in site header (shown when on draft page and not authenticated)
2. "Draft" badge on draft post pages (visible when authenticated and viewing a draft)
3. User avatar/name in header when logged in (from GitHub profile)
4. Graceful 401 page with login button (instead of raw error)

## Files to Modify

- `src/components/Header.astro` — conditional login/avatar display
- `src/layouts/PostDetails.astro` — draft badge
- Create `src/pages/401.astro` — custom unauthorized page

## Acceptance Criteria

- [ ] Login button visible on draft pages when not authenticated
- [ ] "Draft" badge visible on draft posts
- [ ] Custom 401 page with login link
- [ ] Header shows GitHub avatar when logged in
