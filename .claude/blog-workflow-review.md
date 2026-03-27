# Blog Workflow Plugin Review

**Reviewed**: 2026-03-13
**Plugin**: blog-workflow v1.0.6
**Repo**: blog.arusty.dev (AstroPaper on Cloudflare Pages)

## Skills Overview

### Workflow Order

```
research-topic → refine-research-plan → gather-resources → outline-post → draft-post → seo-pass → publish-prep
                                                                                          ↑
                                                                              series-plan (for multi-part)
```

### Skill Details

| # | Skill | Purpose | Input | Output |
|---|-------|---------|-------|--------|
| 1 | `/research-topic` | Gather sources, synthesize background material into structured research notes | Topic string, `--type` (tutorial/deep-dive/research-summary/dev-journal), `--audience` (beginner/intermediate/advanced) | `posts/_research/<slug>.md` |
| 2 | `/refine-research-plan` | Review existing research and fill gaps (thin sections, missing examples, open questions) | Research file path, optional `--focus` (background/concepts/examples/pitfalls/sources) | Updates research file in place |
| 3 | `/gather-resources` | Collect additional links: docs, repos, articles, videos | Topic string or research file, `--type` (docs/repos/articles/all) | `posts/_resources/<slug>.md` |
| 4 | `/outline-post` | Transform research into section-by-section outline with word estimates per section | Research file, optional `--type` override | `posts/_outlines/<slug>.md` |
| 5 | `/draft-post` | Expand outline into full prose with code examples, transitions, and frontmatter | Outline file, optional `--style` | `posts/_drafts/<slug>.md` |
| 6 | `/seo-pass` | Optimize title (<60 chars), description (150-160 chars), headings, keywords, alt text | Draft file, optional `--keywords` | Updates draft in place |
| 7 | `/publish-prep` | Validate frontmatter, check links, remove draft flag, optionally generate social snippets | Draft file, `--check-links`, `--generate-social` | `posts/<slug>.md` + optional `posts/_social/<slug>.md` |
| 8 | `/series-plan` | Plan multi-part series with progression, cross-references, and production schedule | Topic, `--parts`, `--type` | `posts/_series/<slug>/plan.md` |

## Applicability to This Repo

### What works well

- **Research pipeline** (`research-topic` → `refine-research-plan` → `gather-resources`): Fully compatible. Output goes to `posts/_research/` and `posts/_resources/`, both outside the Astro collection.
- **Outlining** (`outline-post`): Fully compatible. Output to `posts/_outlines/`.
- **Drafting** (`draft-post`): Mostly compatible, but generates wrong frontmatter schema (see below).
- **SEO pass** (`seo-pass`): Compatible for content optimization. Title/description guidance applies universally.
- **Series planning** (`series-plan`): Fully compatible. Output to `posts/_series/`.

### What needs adaptation

#### Frontmatter Schema Mismatch

The blog-workflow generates:
```yaml
title: "..."
description: "..."
date: 2026-03-13          # WRONG KEY
author: "..."
tags: [...]
type: deep-dive            # NOT IN SCHEMA
draft: true
image: "..."               # WRONG KEY
canonical: "..."           # WRONG KEY
```

This repo (AstroPaper) expects:
```yaml
title: "..."
description: "..."
pubDatetime: 2026-03-13T00:00:00Z   # ISO 8601
modDatetime: null                      # nullable
author: "..."
tags: [...]
draft: true
featured: false                        # MISSING from workflow
ogImage: "..."                         # different key
canonicalURL: "..."                    # different key
hideEditPost: false                    # MISSING from workflow
timezone: "America/New_York"           # MISSING from workflow
```

#### Publish Destination Mismatch

- Workflow outputs to: `posts/<slug>.md`
- Repo expects posts at: `src/data/blog/<slug>.md`

#### Missing Review Loops

The current workflow is linear:
```
research → refine → outline → draft → seo → publish
```

There's no structured:
- Brainstorming/ideation phase before research
- Plan review before executing research
- Content review before SEO/publish
- Decomposition of a single idea into multiple posts
- Iterative refinement cycles (brainstorm → plan → review → refine → execute)

### Recommended Improvements

1. **Add a `.claude/rules/blog-frontmatter.md`** rule that maps blog-workflow output to AstroPaper schema
2. **Update publish-prep** destination awareness to target `src/data/blog/`
3. **Add ideation phase** before research (brainstorm → refine → research plan)
4. **Add review checkpoints** between major phases
5. **Support idea decomposition** (single idea → multiple posts/experiments/tutorials)

## Directory Structure

```
posts/
├── _research/      # Research notes          (exists ✓)
├── _resources/     # Collected links          (created on demand)
├── _outlines/      # Post outlines            (created on demand)
├── _drafts/        # Full drafts              (created on demand)
├── _social/        # Social snippets          (created on demand)
└── _series/        # Series plans             (created on demand)
```

All use `_` prefix → excluded from Astro collection glob pattern `**/[^_]*.md`.

## Content Gating Summary

| Mechanism | Where | Effect |
|-----------|-------|--------|
| Location outside `src/data/blog/` | `content/.todo/`, `posts/_*/` | Not in collection at all |
| `draft: true` frontmatter | `src/data/blog/` | Hidden in prod, visible in dev |
| Future `pubDatetime` | `src/data/blog/` | Hidden until date passes |
