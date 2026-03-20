# Frontmatter Reference

Blog post frontmatter is validated by a Zod schema defined in `src/content.config.ts`. Invalid or missing required fields will cause a build error.

## Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `title` | `string` | Post title. |
| `pubDatetime` | `date` | Publication date and time (ISO 8601). Controls scheduled publishing. |
| `description` | `string` | Short summary used in post listings and meta tags. |

## Optional Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `author` | `string` | `SITE.author` | Post author name. Falls back to the site-wide author from `src/config.ts`. |
| `modDatetime` | `date \| null` | — | Last modified date. Displayed if set. |
| `featured` | `boolean` | — | When `true`, the post appears in the featured section on the index page. |
| `draft` | `boolean` | — | When `true`, the post is hidden in production. See [Draft Mode](./draft-mode.md). |
| `tags` | `string[]` | `["others"]` | List of tags for categorization and filtering. |
| `ogImage` | `image \| string` | — | Custom Open Graph image. Can be an imported image or a URL string. |
| `canonicalURL` | `string` | — | Canonical URL if the post is cross-posted from another site. |
| `hideEditPost` | `boolean` | — | When `true`, hides the "Edit on GitHub" link for this post. |
| `timezone` | `string` | — | IANA timezone (e.g., `America/New_York`) for date display. |

## Example

```markdown
---
title: Threat Modeling for APIs
author: aRustyDev
pubDatetime: 2026-03-19T10:00:00Z
modDatetime: 2026-03-19T14:30:00Z
featured: true
draft: false
tags:
  - security
  - apis
ogImage: ./images/threat-model-cover.png
description: A walkthrough of threat modeling techniques applied to REST and GraphQL APIs.
canonicalURL: https://example.com/original-post
hideEditPost: false
timezone: America/New_York
---
```

## Schema Source

The schema is defined in `src/content.config.ts`. To customize validation (e.g., add a max length to titles), modify the Zod schema there. See the [Zod documentation](https://zod.dev/) for available validators.
