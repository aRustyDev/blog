# ADR-0001: Blog Post Gating Mechanisms

## Status

Accepted

## Date

2026-03-13

## Context

We need a clear strategy for managing blog post visibility across different stages of the content lifecycle. Posts may be ideas, in-progress drafts, scheduled for future publication, or fully published. The AstroPaper theme provides built-in support for content filtering, and Astro's content collection loader uses glob patterns to determine which files are part of the collection.

## Decision

We adopt three complementary gating mechanisms:

### 1. Draft Flag (frontmatter: `draft: true`)

Posts in `src/data/blog/` with `draft: true` are excluded from production builds but visible during local development (`astro dev`). This is the primary mechanism for gating posts that are written but not yet ready.

**Use when:** A post is substantially written and in `src/data/blog/`, but needs review, editing, or polish before publishing.

### 2. Scheduled Publishing (frontmatter: `pubDatetime: <future date>`)

Posts with a `pubDatetime` in the future are hidden in production until that datetime passes (with a 15-minute margin configured via `SITE.scheduledPostMargin`). In development mode, these posts are visible regardless of date.

**Use when:** A post is finalized and should automatically go live at a specific date/time without manual intervention.

### 3. Location-Based Exclusion (outside `src/data/blog/`)

The content collection loader (`glob({ pattern: "**/[^_]*.md", base: "./src/data/blog" })`) only includes `.md` files from `src/data/blog/`. Files in other directories are completely invisible to the collection. Additionally, files prefixed with `_` are excluded by the glob pattern.

Current out-of-collection locations:
- `content/.todo/<category>/` - Idea backlog organized by topic
- `posts/_research/` - Research notes for blog post development
- `posts/_outlines/` - Structured outlines (blog-workflow output)
- `posts/_drafts/` - Draft posts (blog-workflow output)

**Use when:** Content is in early stages (ideation, research, outlining) and is not yet a complete blog post.

## Filtering Implementation

The filter logic in `src/utils/postFilter.ts`:

```typescript
const postFilter = ({ data }: CollectionEntry<"blog">) => {
  const isPublishTimePassed =
    Date.now() > new Date(data.pubDatetime).getTime() - SITE.scheduledPostMargin;
  return !data.draft && (import.meta.env.DEV || isPublishTimePassed);
};
```

## Content Lifecycle Flow

```
content/.todo/ (idea) → posts/_research/ (research) → posts/_outlines/ (outline)
  → posts/_drafts/ (draft) → src/data/blog/ (draft: true) → src/data/blog/ (draft: false)
```

## Consequences

- Authors can work on posts at any stage without affecting the live site
- The `draft` flag allows preview of near-final posts in dev mode
- Scheduled publishing enables pre-writing and time-zone-aware releases
- Location-based exclusion keeps early-stage content completely separate from the collection
- All three mechanisms compose naturally for a multi-stage content workflow
