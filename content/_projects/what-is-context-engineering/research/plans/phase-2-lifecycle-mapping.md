---
id: "a1b2c3d4-2222-4bbb-c222-2222phase2002"
type: research-plan
status: draft
parent: ./context-engineering-taxonomy.md
created: "2026-03-20T00:00:00Z"
updated: "2026-03-20T00:00:00Z"
---

# Phase 2: Claude Code Lifecycle Mapping

**Objective**: Map the exact temporal lifecycle of context components in Claude Code — what loads when, in what order, with what priority, and what triggers each stage.

**Duration**: 1-2 hours
**Addresses**: Secondary questions 2, 3

## Search-Term Matrix

### Documentation Sources

| Search Query | Target | Expected Yield |
|-------------|--------|---------------|
| CLAUDE.md loading order | Claude Code docs | High |
| claude code hooks lifecycle | Hook execution timing | High |
| claude code plugins skills | Plugin/skill loading mechanism | High |
| claude code rules precedence | Rule priority and ordering | Medium |
| claude code context window | How context is assembled | Medium |
| "system-reminder" claude code | Runtime context injection | Medium |
| claude code MCP tools | Tool registration and invocation | High |

### Codebase Analysis

| Search Pattern | Target | Tool |
|---------------|--------|------|
| `CLAUDE.md` references in docs | How CLAUDE.md is loaded | Grep |
| `rules/` directory processing | Rule loading order | Glob + Read |
| `skills/` invocation flow | Skill activation triggers | Read |
| `hooks/` event registration | Hook lifecycle | Read |
| Plugin manifest format | How plugins declare components | Read |

### Community/Expert Sources

| Search Query | Platform | Expected Yield |
|-------------|----------|---------------|
| claude code context loading order | GitHub discussions | Medium |
| "CLAUDE.md" priority rules | Community forums | Low-Medium |
| claude code plugin architecture | Blog posts | Medium |

## Methodology

### Step 1: Document the Loading Sequence

Trace the exact sequence when Claude Code starts a conversation:

```
1. What loads at build/install time? (plugin installation, rule files)
2. What loads at session start? (CLAUDE.md, project rules, .claude/ config)
3. What loads on demand? (skills invoked by user, tools called by model)
4. What loads on events? (hooks triggered by file changes, commits, etc.)
```

### Step 2: Map Priority and Ordering

For each stage, document:
- What happens when multiple components compete? (rule conflicts, skill precedence)
- How is ordering determined? (alphabetical, specificity, explicit priority)
- Can components override each other?

### Step 3: Identify Gates and Triggers

| Component Type | Gate/Trigger | When Active |
|---------------|-------------|-------------|
| CLAUDE.md | Session start | Always (if file exists) |
| Rules | Session start | Always (matched by glob) |
| Skills | User invocation | On-demand (`/skill-name`) |
| Hooks | System event | Event-triggered (pre-commit, etc.) |
| Tools (MCP) | Model decision | On-demand (model calls tool) |
| Memory | Various | Depends on implementation |

### Step 4: Trace a Complete Lifecycle

Follow one specific skill (`blog-workflow:brainstorm`) through:
1. Definition → where is it defined?
2. Registration → how does Claude Code discover it?
3. Invocation → what happens when user types `/blog-workflow:brainstorm`?
4. Context entry → what enters the context window and in what form?
5. Execution → how does the model process the skill's instructions?
6. Side effects → what does the skill produce?

## Deliverables

1. **Loading Sequence Diagram Data** — ordered list of what loads when
2. **Component Interaction Matrix** — how component types interact/override
3. **Gate/Trigger Reference** — what activates each component type
4. **Lifecycle Trace** — complete trace of blog-workflow:brainstorm

## Quality Criteria

- [ ] Loading sequence documented with evidence (not guesses)
- [ ] Priority/ordering rules identified for at least 3 component types
- [ ] Complete lifecycle trace of one skill
- [ ] Gate/trigger documented for all 6 component types
