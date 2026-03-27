---
id: "04a49071-01f0-4f47-8ae6-49f0354d65c9"
type: idea
status: approved
children:
  - ./plan.md
created: "2026-03-14T00:00:00Z"
updated: "2026-03-15T00:00:00Z"
---

## Concept

Explain what "Context Engineering" is by showing how modular components (skills, rules, hooks, memory, tools, references) flow through a **context pipeline** — a temporal sequence with distinct phases, ordering rules, and triggers. The pipeline is the central metaphor: readers learn the taxonomy of component types by seeing where and when each enters the context window. Design principles for building these components well round out the piece.

## Target Audience

Software engineers and AI practitioners who build with LLM-powered tools (Claude Code, Cursor, Copilot, etc.) and create system prompts, skills, rules, or plugins — but lack a shared vocabulary for what they're doing. Mid-to-senior level; comfortable with engineering concepts like modularity, testing, and composition.

## Problem/Need

Practitioners create context components (system prompts, skills, rules, hooks, memory systems) ad-hoc without a shared framework. There's no unified vocabulary for discussing what these components are, how they relate, or how to evaluate their quality. "Prompt engineering" is too narrow — it doesn't cover event-driven hooks, persistent memory, tool definitions, or compositional workflows. The field needs a broader frame.

## Unique Angle

- **Leads with the context pipeline** — most existing content treats context components as a flat list; this post shows them as a temporal flow with build-time, session-start, on-demand, and event-triggered phases, with ordering, priority, and gating
- Introduces the taxonomy of component types (skills, rules, hooks, memory, tools, references) _through_ the pipeline — each type is explained at the point it enters context, not as a standalone definition
- Draws parallels to software engineering (middleware pipelines, plugin architectures, event systems)
- Grounded in hands-on experience building a real plugin system (the blog-workflow plugin for Claude Code)
- Positions context engineering as a superset of prompt engineering, not a synonym
- Explanatory dev-blog voice — "here's what we found and how it works" — honest about what's still emerging, but teaching from direct experience

## Scope

**Included**: Definition of context engineering, the context pipeline (temporal phases: build-time → session-start → on-demand → event-triggered; ordering, priority, gates/triggers), taxonomy of 6 component types introduced through the pipeline, design principles (atomicity, composability, testability, explicitness, graceful degradation), practical examples from Claude Code ecosystem, diagrams illustrating the pipeline and taxonomy

**Excluded**: Model fine-tuning, training data curation, RAG pipeline design (adjacent but distinct), platform-specific implementation details, benchmarking methodology (future work), quality criteria / evaluation framework (follow-up post)

## Research Needs

- Survey existing prompt engineering literature for prior art on component taxonomies
- Review Anthropic's public documentation on context windows, system prompts, and tool use
- Review in-context learning papers for theoretical grounding
- Look for existing frameworks or taxonomies of AI tooling/prompting
- Gather concrete examples from Claude Code plugin system (skills, hooks, rules, memory)
- Review software engineering pattern literature for parallels (component-based architecture, plugin systems, middleware pipelines)
- Map the temporal lifecycle of context components in Claude Code: what loads when, what triggers what, priority/ordering rules (CLAUDE.md → rules → plugins → skills → hooks → conversation)

## Estimated Effort

- Research: 4-5 hours (literature review, gathering examples, mapping pipeline lifecycle)
- Writing: 5-7 hours (3000-3500 word target with diagrams)
- Diagrams: 2-3 hours (pipeline flow, taxonomy, component lifecycle — static for v1, animations considered for v2)
- Review/revision: 2-3 hours
- Total: ~13-18 hours across multiple sessions
