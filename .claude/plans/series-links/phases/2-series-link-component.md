# Phase 2: SeriesLink Component

## Goal

Replace hardcoded "Post 2: Title" references with a component that auto-links and updates from series config.

## File to Create

### `src/components/SeriesLink.astro`

Props: `{ series: string; post: number; class?: string }`

Build-time rendering:
- **Published**: `<a href="/posts/slug/">Post 2: The Context Pipeline</a>`
- **Draft**: `<a href="/drafts/slug/" class="series-link-draft">Post 2: The Context Pipeline</a>` (with draft badge)
- **Coming-soon**: `<span class="series-link-coming-soon">Post 2: The Context Pipeline (coming soon)</span>` (no link, muted)

## MDX Usage

```mdx
import SeriesLink from "@/components/SeriesLink.astro";

See <SeriesLink series="context-engineering" post={2} /> for pipeline details.
```

## Acceptance Criteria

- [ ] Published posts render as links
- [ ] Draft posts render as links with draft badge
- [ ] Coming-soon posts render as muted plain text
- [ ] Title auto-populated from series.json
