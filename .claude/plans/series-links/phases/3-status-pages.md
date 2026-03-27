# Phase 3: In-Progress and Coming-Soon Pages

## Goal

Auto-generate pages for unpublished series posts.

## Files to Create

- `src/pages/coming-soon/[...slug].astro` — coming-soon pages via `getStaticPaths()`
- `src/pages/in-progress/[...slug].astro` — draft-exists pages (optional, if distinct from drafts)

## Implementation Steps

1. `getStaticPaths()` reads `series.json`, generates paths for `status: "coming-soon"` posts
2. Coming-soon page shows: title, series context, "Coming soon" badge, links to published posts in series
3. In-progress page shows: title, "In progress" banner, draft content (if auth-gated, requires auth-edge plan)

## Acceptance Criteria

- [ ] Coming-soon pages generated at build time
- [ ] Show series context and links to published posts
- [ ] "Coming soon" badge visible
- [ ] SeriesLink points to correct coming-soon URL
