---
id: "e4d70457-0519-4bf1-b6ff-78267823e70a"
type: plan
status: approved
parent: ./idea.md
children:
  - ./research/plans/context-engineering-taxonomy.md
created: "2026-03-15T00:00:00Z"
updated: "2026-03-15T00:00:00Z"
---

## Overview

This project produces an explanatory blog post (3000-3500 words) that defines "Context Engineering" as a discipline and introduces the **context pipeline** — a temporal model showing when and how each type of modular component (skills, rules, hooks, memory, tools, references) enters an AI assistant's context window. The pipeline is the central organizing metaphor: readers learn the taxonomy of component types by seeing where each fits in the temporal flow (build-time → session-start → on-demand → event-triggered). Design principles for building these components well round out the piece.

The post targets mid-to-senior software engineers and AI practitioners who build with LLM-powered tools but lack a shared vocabulary for the components they create. Voice is explanatory dev-blog — teaching from direct experience building a real plugin system (the blog-workflow plugin for Claude Code).

## Research Phase

- **Scope**:
  1. Survey existing prompt engineering literature and any prior taxonomies of AI tooling/context components
  2. Review Anthropic's public documentation on context windows, system prompts, tool use, and hooks
  3. Review in-context learning papers for theoretical grounding on how context shapes model behavior
  4. Map the temporal lifecycle of context components in Claude Code specifically: what loads when (CLAUDE.md → rules → plugins → skills → hooks → conversation), ordering/priority rules, triggers and gates
  5. Gather concrete examples from the blog-workflow plugin system illustrating each component type at each pipeline stage
  6. Review software engineering pattern literature for parallels (middleware pipelines, plugin architectures, event-driven systems)

- **Sources**:
  - Anthropic documentation (context windows, system prompts, tool use, Claude Code hooks)
  - Claude Code source/docs (plugin system, skill loading, hook lifecycle)
  - Prompt engineering papers (few-shot learning, chain-of-thought, system prompt design)
  - In-context learning literature (how context injection shapes generation)
  - Software engineering texts (middleware patterns, plugin architectures, event systems)
  - The blog-workflow plugin codebase itself (first-party examples)

- **Deliverable**: Research report at `research/reports/main.md`

## Content Deliverables

| # | Type | Title | Est. Words | Notes |
|---|------|-------|------------|-------|
| 1 | dev-blog | What is Context Engineering? A Taxonomy of AI Context Components | 3000-3500 | Pipeline-first structure; static diagrams for v1 |

### Planned Diagrams

| # | Type | Description |
|---|------|-------------|
| 1 | Pipeline flow | The context pipeline: build-time → session-start → on-demand → event-triggered, showing which component types enter at each stage |
| 2 | Taxonomy overview | Component types (skills, rules, hooks, memory, tools, references) with key characteristics |
| 3 | Component lifecycle | How a single component (e.g., a skill) moves through creation → loading → execution → context entry |
| 4 | Comparison table | Component type comparison matrix (function, persistence, trigger, example) |

## Timeline

| Phase | Duration | Deliverable |
|-------|----------|-------------|
| Research | 4-5 hours (2-3 sessions) | Research report |
| Content Planning | 1-2 hours (1 session) | Phase files, post outline |
| Writing | 5-7 hours (2-3 sessions) | Draft post |
| Diagrams | 2-3 hours (1-2 sessions) | 4 static diagrams |
| Review & Publish | 2-3 hours (1-2 sessions) | Published post |
| **Total** | **14-20 hours (7-12 sessions)** | |

## Dependencies

- Access to Anthropic's public documentation on Claude Code hooks, plugins, and context loading
- The blog-workflow plugin codebase (already available in this repo and marketplace)
- No external reviewers required — self-review workflow handles quality gates
- AstroPaper blog must be deployable (build passing) for publish phase

## Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| "Context engineering" term evolves rapidly; post becomes dated | Medium | Medium | Focus on structural concepts (pipeline, component types) that are durable; keep platform-specific details minimal |
| Scope creep from quality criteria / evaluation framework | Low | Medium | Already deferred to follow-up post; enforce exclusion boundary |
| Pipeline model oversimplifies reality (components may load in parallel or dynamically) | Medium | Low | Acknowledge simplification explicitly; note edge cases in a callout |
| Diagram creation takes longer than estimated | Medium | Low | Static diagrams only for v1; animations deferred to v2 |
| Research turns up an existing taxonomy that makes ours redundant | Low | High | Pivot to "building on X" framing rather than "proposing new"; cite and extend |

## Success Criteria

- [ ] Post published at `src/data/blog/` with valid AstroPaper frontmatter
- [ ] 3000-3500 words covering pipeline, taxonomy, and design principles
- [ ] 4 diagrams (pipeline flow, taxonomy overview, component lifecycle, comparison table)
- [ ] At least 3 concrete examples from the blog-workflow plugin grounding abstract concepts
- [ ] Passes SEO review (title <60 chars, description 150-160 chars)
- [ ] No broken links or missing images
- [ ] Dev-blog voice consistent throughout — explanatory, not academic
