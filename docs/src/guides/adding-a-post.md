# Adding a Blog Post

## File Location

Blog posts live in `src/data/blog/`. Only Markdown files (`.md`) in this directory are included in the content collection.

## Creating a Post

1. Create a new `.md` file in `src/data/blog/`.
2. The filename becomes the URL slug. For example, `my-first-post.md` produces the URL `/posts/my-first-post/`.
3. Add the required [frontmatter](./frontmatter.md) at the top of the file.
4. Write your content in Markdown below the frontmatter block.

## Example

A file at `src/data/blog/securing-kubernetes.md`:

```markdown
---
title: Securing Kubernetes
pubDatetime: 2026-03-19T12:00:00Z
description: A practical guide to hardening your Kubernetes clusters.
tags:
  - kubernetes
  - security
---

Your post content here...
```

This would be available at `/posts/securing-kubernetes/`.

## Notes

- Files prefixed with `_` (e.g., `_scratch-notes.md`) are excluded by the content loader's glob pattern.
- See [Draft Mode](./draft-mode.md) for controlling post visibility.
- See [Frontmatter Reference](./frontmatter.md) for all available fields.
