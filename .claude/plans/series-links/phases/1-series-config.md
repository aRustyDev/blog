# Phase 1: Series Configuration

## Goal

Define blog series with post metadata in a single source of truth.

## Files to Create

### `src/data/series.json`

```json
{
  "context-engineering": {
    "title": "Context Engineering Series",
    "description": "A 6-part deep dive into context engineering.",
    "posts": [
      { "number": 1, "title": "What is Context Engineering?", "slug": "what-is-context-engineering", "status": "draft" },
      { "number": 2, "title": "The Context Pipeline", "slug": "the-context-pipeline", "status": "coming-soon" },
      { "number": 3, "title": "A Taxonomy of Context Components", "slug": "taxonomy-of-context-components", "status": "coming-soon" }
    ]
  }
}
```

### `src/utils/series.ts`

```typescript
export function getSeries(id: string): Series | undefined;
export function getSeriesPost(seriesId: string, postNumber: number): SeriesPost | undefined;
export function getPostUrl(post: SeriesPost): string;  // /posts/ or /drafts/ or /coming-soon/
export function isPublished(post: SeriesPost): boolean;
export function getAllSeries(): Series[];
```

## Acceptance Criteria

- [ ] `series.json` validates with CE series (6 posts)
- [ ] `getSeriesPost("context-engineering", 2)` returns correct post
- [ ] `getPostUrl` returns correct path based on status
