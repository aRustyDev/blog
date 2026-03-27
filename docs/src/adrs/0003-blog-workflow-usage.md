# ADR-0003: Blog Workflow Skills for Content Creation

## Status

Accepted

## Date

2026-03-13

## Context

Writing technical blog posts involves multiple phases: ideation, research, structuring, drafting, optimization, and publishing. Each phase benefits from different tools and approaches. We use the `blog-workflow` Claude Code skill plugin to provide structured workflows for each phase, with AI-assisted research, writing, and review.

## Decision

We adopt the `blog-workflow` plugin skills as the standard content creation pipeline for this blog.

### Workflow Order

```
/research-topic → /refine-research-plan → /gather-resources → /outline-post → /draft-post → /seo-pass → /publish-prep
```

For multi-part series, `/series-plan` is used before starting individual post workflows.

### Skill Purposes

| Skill | Phase | Input | Output |
|-------|-------|-------|--------|
| `/research-topic` | Research | Topic + type + audience | `posts/_research/<slug>.md` |
| `/refine-research-plan` | Research | Research file | Updates in place |
| `/gather-resources` | Research | Topic or research file | `posts/_resources/<slug>.md` |
| `/outline-post` | Structure | Research file | `posts/_outlines/<slug>.md` |
| `/draft-post` | Writing | Outline file | `posts/_drafts/<slug>.md` |
| `/seo-pass` | Optimization | Draft file | Updates in place |
| `/publish-prep` | Publishing | Draft file | Final post file |
| `/series-plan` | Planning | Topic + part count | `posts/_series/<slug>/plan.md` |

### Directory Structure

```
posts/
├── _research/      # Research notes and synthesis
├── _resources/     # Collected links and references
├── _outlines/      # Structured post outlines
├── _drafts/        # Full draft posts
├── _social/        # Social media snippets (from publish-prep)
└── _series/        # Multi-part series plans
```

All prefixed with `_` to stay outside the Astro content collection glob pattern.

### Adaptation Required

The blog-workflow plugin uses a generic frontmatter schema. This repo's AstroPaper theme uses a different schema. Key mappings:

| blog-workflow field | This repo's field | Notes |
|--------------------|-------------------|-------|
| `date` | `pubDatetime` | Different key name |
| `image` | `ogImage` | Different key name |
| `canonical` | `canonicalURL` | Different key name |
| `type` | _(not used)_ | Not in AstroPaper schema |
| _(missing)_ | `featured` | AstroPaper-specific |
| _(missing)_ | `modDatetime` | AstroPaper-specific |

The `/publish-prep` skill outputs to `posts/<slug>.md` but the final destination must be `src/data/blog/<slug>.md`.

### Post Types Supported

| Type | Structure | Use Case |
|------|-----------|----------|
| `tutorial` | Step-by-step with setup/steps/troubleshooting | How-to guides |
| `deep-dive` | Progressive conceptual depth | Technical explorations |
| `research-summary` | Findings-first with analysis | Multi-source synthesis |
| `dev-journal` | Narrative with challenges/learnings | Personal experience |

## Consequences

- Structured, repeatable content creation process
- Research is preserved separately from final posts for reference
- Each phase produces a reviewable artifact before proceeding
- Frontmatter adaptation needed when moving from draft to published
- Content pipeline directories (`posts/_*`) are gitignored from the Astro collection by convention
- The workflow is not rigid: phases can be skipped or repeated as needed
