---
type: phase
phase_number: 2
status: draft
parent: ../content-brainstorm.md
template: research-eng.md
content_type: deep-dive
created: "2026-03-24T00:00:00Z"
updated: "2026-03-24T00:00:00Z"
---

# Phase 2: The Context Pipeline

## Post Metadata

| Field | Value |
|-------|-------|
| **Title** | The Context Pipeline: How AI Tools Load Information |
| **Series** | Context Engineering (2 of 6) |
| **Type** | Deep dive |
| **Persona** | Research Engineer |
| **Template** | `.claude/templates/outlines/research-eng.md` |
| **Est. Words** | 3000-3500 |
| **Diagrams** | 1 — Pipeline flow diagram (build-time → session-start → on-demand → event-triggered) |

## Topics Covered

- The 4-stage temporal pipeline model
- What loads at each stage (with concrete examples)
- Claude Code's actual loading sequence (Phase 2 evidence)
- Priority and ordering rules — what happens when components compete
- Gates and triggers — what activates each component type
- Cross-platform validation (Cursor, Copilot, Windsurf all implement variants)
- **Introducing the "cache-optimized injection" pattern**: system prompt stays frozen across turns; CLAUDE.md, rules, and dynamic content arrive as user messages to preserve KV-cache. Named here as a foundational observation; Post 4 maps it formally as a novel SE pattern

## Key Research Sources

| Source | Usage |
|--------|-------|
| Phase 2 Report | Primary source — loading sequence, interaction matrix, lifecycle traces |
| BIB-013 Anthropic CE Framework | Official framework: compaction, note-taking, sub-agents |
| BIB-065 POSA Vol. 4 | Context Object, Interceptor/Pipeline patterns |
| BIB-067 Guran Middleware for LLMs | Middleware pipeline applied to LLM serving |
| BIB-068 AIOS | OS-inspired kernel: scheduling, context management |
| BIB-046 MemGPT | OS memory model (main/external tiers) |
| Phase 3 cross-platform | Pipeline stages validated across 4 tools |

## Design Principles in This Post

- Graceful degradation (supporting role)
- Token efficiency (supporting role)

## Dependencies

- Post 1 establishes the vocabulary (CE definition, 6 component types previewed)

## Estimated Effort

- Writing: 4-5 hours (2 sessions)
- Diagrams: 2 hours (pipeline flow)
- Review: 1 hour
