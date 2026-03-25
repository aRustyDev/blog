# Phase 2: 2D Visualization Component

## Goal

Interactive 2D scatter plot showing posts positioned by topic similarity.

## Files to Create

- `src/components/umap/UMAPView.tsx` — React component with `client:only="react"`
- `src/components/umap/useUMAPData.ts` — fetch and parse `umap-data.json`
- `src/pages/topics.astro` — page hosting the visualization

## Implementation Steps

1. Canvas-based 2D scatter plot (or SVG for smaller datasets)
2. Each dot = a post, positioned by UMAP coordinates
3. Color by category (reuse `CATEGORY_COLORS` from `graph.shared.ts`)
4. Size by word count or recency
5. Hover tooltip: post title + tags
6. Click navigates to post
7. Zoom/pan controls (wheel + drag)
8. Theme-reactive via CSS variables (ADR-0008 compliant)
9. Legend showing category colors

## Dependencies

Phase 1 (Embedding Pipeline) — needs `umap-data.json`.

## Acceptance Criteria

- [ ] Posts rendered as colored dots in 2D space
- [ ] Hover shows post title and tags
- [ ] Click navigates to post URL
- [ ] Zoom/pan works on desktop and mobile
- [ ] Colors match graph category colors
- [ ] Theme toggle updates colors
