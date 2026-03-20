# Draft Mode

There are three mechanisms for controlling blog post visibility. For full rationale, see [ADR-0001: Blog Post Gating Mechanisms](../adrs/0001-blog-post-gating-mechanisms.md).

## 1. Draft Flag

Set `draft: true` in a post's frontmatter to hide it from production builds. The post remains visible during local development (`astro dev`).

```yaml
---
title: Work in Progress
pubDatetime: 2026-03-19T12:00:00Z
description: This post is not ready yet.
draft: true
---
```

Use this when a post is written but needs review or editing before publishing.

## 2. Scheduled Publishing

Set `pubDatetime` to a future date. The post will be hidden in production until that datetime passes (with a 15-minute margin defined by `SITE.scheduledPostMargin` in `src/config.ts`). In development mode, future-dated posts are visible regardless.

```yaml
---
title: Launching Next Week
pubDatetime: 2026-04-01T09:00:00Z
description: This post goes live on April 1st.
---
```

Use this when a post is finalized and should go live automatically at a specific time.

## 3. Underscore Prefix Exclusion

Files prefixed with `_` in `src/data/blog/` are excluded by the content loader's glob pattern (`**/[^_]*.md`). These files are completely invisible to the content collection.

```
src/data/blog/_scratch-notes.md   # excluded
src/data/blog/published-post.md   # included
```

Additionally, content in directories outside `src/data/blog/` (such as `content/.todo/` or `posts/_drafts/`) is not part of the collection at all.

## How They Compose

All three mechanisms work together across the content lifecycle:

```
content/.todo/ (idea)
  -> posts/_research/ (research)
  -> posts/_outlines/ (outline)
  -> posts/_drafts/ (draft)
  -> src/data/blog/ with draft: true (review)
  -> src/data/blog/ with draft: false (published)
```
