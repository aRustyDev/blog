---
type: phase
phase_number: 3
status: draft
parent: ../content-brainstorm.md
template: research-eng.md
content_type: deep-dive
created: "2026-03-24T00:00:00Z"
updated: "2026-03-24T00:00:00Z"
---

# Phase 3: A Taxonomy of Context Components

## Post Metadata

| Field | Value |
|-------|-------|
| **Title** | A Taxonomy of Context Components |
| **Series** | Context Engineering (3 of 6) |
| **Type** | Deep dive |
| **Persona** | Research Engineer |
| **Template** | `.claude/templates/outlines/research-eng.md` |
| **Est. Words** | 3500-4000 |
| **Diagrams** | 2 — Taxonomy overview + cross-platform comparison table |

## Topics Covered

- The 6 component types (skills, rules, hooks, memory, tools, references)
- For each type: definition, distinguishing characteristic, pipeline stage, trigger, persistence
- Concrete examples from this blog's codebase (cf-wrangler rule, blog-workflow skills, MCP tools, templates)
- Cross-platform comparison: how Claude Code, Cursor, Copilot, Windsurf implement each type
- Convergence patterns (MCP universal, glob-gated rules universal, AGENTS.md emerging)
- Where the boundaries blur (rules vs skills in Cursor; instructions vs prompts in Copilot)

## Key Research Sources

| Source | Usage |
|--------|-------|
| Phase 3 Report | 18 examples with detailed writeups |
| Phase 3 cross-platform | 4-tool comparison across all 6 types |
| Phase 4 taxonomy reference table | Finalized definitions and fields |
| BIB-033 MCP Specification | Tool type: protocol structure, primitives |
| BIB-034 MCP Tool Description Smells | Tool quality: 97.1% have defects |
| BIB-035 MCP-Zero | Tool discovery pattern |
| BIB-044 OpenAI Agents SDK | Handoff-as-tool pattern |

## Cross-Platform Comparison Table

Include this as a diagram/visual table in the post (from Phase 3 cross-platform research):

| Component | Claude Code | Cursor | GitHub Copilot | Windsurf |
|-----------|------------|--------|----------------|----------|
| **Skills** | SKILL.md, `/name`, auto-invoke | Rules with `@`-mention | `.prompt.md`, `/name` | Workflows, Agent Skills |
| **Rules** | `.claude/rules/*.md` + CLAUDE.md | `.cursor/rules/*.mdc` + `.cursorrules` | `copilot-instructions.md` + AGENTS.md | `.windsurfrules` + AGENTS.md |
| **Hooks** | 21 events, 4 handlers, approve/deny | 6 events, observe-only | 6 events, approve/deny/ask | None |
| **Memory** | Auto-memory + CLAUDE.md | Generate Memories + Memory Bank | Copilot Memory (validated vs codebase) | Cascade Memories (~48hr learn) |
| **Tools** | MCP (no cap) | MCP (40-tool cap) | MCP + GitHub MCP Registry | MCP (100-tool cap, per-tool toggle) |
| **References** | `@file`, Read tool, templates | `@file`, `@codebase`, `@Docs`, `@web` | `#file`, markdown links | Open files, M-Query retrieval |

Key convergence: MCP universal (all 4); glob-gated rules (all 4); AGENTS.md emerging (Copilot + Windsurf).

## Design Principles in This Post

- **Atomicity** (primary) — each component does one thing
- **Composability** (primary) — components combine without conflicts
- **Testability** (primary) — components can be validated independently
- **Explicitness** (primary) — no hidden side effects

## Dependencies

- Post 1 defines CE
- Post 2 introduces the pipeline (readers know stages; this post fills in what populates them)

## Estimated Effort

- Writing: 5-6 hours (2-3 sessions)
- Diagrams: 2-3 hours (taxonomy overview + comparison table)
- Review: 1.5 hours
