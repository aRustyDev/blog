---
type: phase
phase_number: 4
status: draft
parent: ../content-brainstorm.md
template: principal-eng.md
content_type: deep-dive
created: "2026-03-24T00:00:00Z"
updated: "2026-03-24T00:00:00Z"
---

# Phase 4: SE Patterns for Context Systems

## Post Metadata

| Field | Value |
|-------|-------|
| **Title** | Software Engineering Patterns for Context Systems |
| **Series** | Context Engineering (4 of 6) |
| **Type** | Deep dive |
| **Persona** | Principal Engineer |
| **Template** | `.claude/templates/outlines/principal-eng.md` |
| **Est. Words** | 3000-3500 |
| **Diagrams** | 1 — SE pattern mapping diagram (14 patterns → CE parallels) |

## Topics Covered

### Structural Patterns (how context is organized and assembled)
- Middleware pipeline → context assembly pipeline (110+ segments, ordered, cached)
- Context Object (POSA) → assembled context window carrying session state
- Plugin architecture → skills/plugins (namespaced, installable, versioned)
- Adapter / Service proxy → MCP tool invocation (JSON-RPC adapting to server)
- Configuration cascade / DI → CLAUDE.md hierarchy (managed > project > user)
- Repository pattern → memory persistence (index + topics, read/write)

### Behavioral Patterns (how context reacts and evolves)
- Observer / Event-driven → hooks (22 lifecycle events, parallel execution)
- Guard / Interceptor → PreToolUse hooks (approve/deny before execution)
- Command pattern → skill invocation (user `/name`, system loads and executes)
- Lazy loading / Virtual proxy → Tool Search (deferred schemas, 95% reduction)
- Progressive disclosure / Facade → skill metadata (name+description → full content)
- Change notification → system reminders (~40 types, user messages preserving cache)

### Novel Patterns (unique to context engineering)
- Cache-optimized injection → system prompt frozen; dynamic content as user messages (introduced in Post 2, named and mapped here)
- Progressive disclosure at scale → hundreds of components managed via metadata-only loading
- Memory agent delegation → a sub-LLM decides which memories to attach
- Dream consolidation → periodic multi-phase memory merge/prune cycle

### Production Concerns
- KV-cache optimization, token budgets, Tool Search (77K→8.7K)
- Why SE experience transfers to CE (and where it doesn't)

## Key Research Sources

| Source | Usage |
|--------|-------|
| Phase 2 Report (SE mapping table) | 18 pattern mappings with evidence |
| BIB-065 POSA Vol. 4 | Context Object, Interceptor, Broker patterns |
| BIB-064 Sarkar SE Patterns MCP | Mediator, Observer, Pub-Sub, Broker → agent communication |
| BIB-067 Guran Middleware for LLMs | Middleware pattern applied to LLM serving |
| BIB-068 AIOS | OS patterns (scheduling, access control) → agent infra |
| BIB-043 ToolRegistry | Adapter/registry patterns → LLM tool management |
| BIB-062 NVIDIA TensorRT-LLM | KV-cache: 5x TTFT speedup, prefix caching |
| BIB-017 Manus Production | KV-cache hit rate as #1 metric (10x cost differential) |
| BIB-035 MCP-Zero | Active tool discovery: 98% token reduction |

## Design Principles in This Post

- **Graceful degradation** (primary) — beads hook pattern; missing components don't crash
- **Token efficiency** (primary) — Tool Search, skill metadata, MEMORY.md cap
- **Cache awareness** (primary) — system prompt frozen; stable prefixes
- **Composability** (supporting) — plugin bundling pattern

## Dependencies

- Post 2 introduces the pipeline (readers know the stages)
- Post 3 introduces component types (readers know what's being mapped)

## Estimated Effort

- Writing: 4-5 hours (2 sessions)
- Diagrams: 2 hours (pattern mapping)
- Review: 1.5 hours
