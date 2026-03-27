# Phase 4: Series Navigation

## Goal

Prev/next navigation at the bottom of series posts, plus a series index page.

## Files to Create/Modify

- Modify `src/layouts/PostDetails.astro` — add series prev/next bar
- Create `src/pages/series/[id].astro` — series index page listing all posts with status

## Implementation Steps

1. In PostDetails, detect if current post belongs to a series (check all series for matching slug)
2. If in series: render prev/next bar with post titles and status indicators
3. Series index page: list all posts, show published/draft/coming-soon status, link to available ones

## Acceptance Criteria

- [ ] Prev/next navigation visible on series posts
- [ ] Links respect post status (published=link, coming-soon=muted)
- [ ] Series index page shows all posts with status
