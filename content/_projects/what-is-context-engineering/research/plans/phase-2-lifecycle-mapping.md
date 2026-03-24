---
id: "a1b2c3d4-2222-4bbb-c222-2222phase2002"
type: research-plan
status: complete
parent: ./context-engineering-taxonomy.md
created: "2026-03-20T00:00:00Z"
updated: "2026-03-24T00:00:00Z"
---

# Phase 2: Claude Code Lifecycle Mapping

**Objective**: Map the exact temporal lifecycle of context components in Claude Code — what loads when, in what order, with what priority, and what triggers each stage. Cross-reference with SE patterns and production engineering findings from Phase 1.

**Duration**: 1-2 hours
**Addresses**: Secondary questions 2, 3, 4 (partial)
**Prerequisites**: Phase 1 complete (74 sources in bibliography)

## Phase 1 Inputs

Key sources to ground this phase's observations:

| Source | Relevance |
|--------|-----------|
| BIB-013 Anthropic CE Framework | Official framework: system prompts, tools, examples, message history + long-horizon strategies (compaction, note-taking, sub-agents) |
| BIB-033 MCP Specification | Protocol lifecycle: capability negotiation, server primitives (Resources, Prompts, Tools), client features (Sampling, Roots, Elicitation) |
| BIB-046 MemGPT | OS memory model (main/external context tiers) — maps to session-start vs on-demand lifecycle stages |
| BIB-047 MemoryOS | Three-level hierarchy (short/mid/long-term) with dynamic update operations — maps to temporal pipeline stages |
| BIB-064 Sarkar SE Patterns MCP | Mediator, Observer, Pub-Sub, Broker patterns mapped to agent communication — informs ordering/priority rules |
| BIB-065 POSA Vol. 4 | Context Object, Interceptor/Pipeline, Broker patterns — foundational SE parallels for each pipeline stage |
| BIB-067 Guran Middleware for LLMs | Middleware pipeline pattern applied to LLM serving — direct parallel to context assembly pipeline |
| BIB-068 AIOS | OS-inspired kernel for agents: scheduling, context management, access control — maps to ordering/priority rules |
| BIB-038 Context-Folding | Sub-trajectory branching with outcome summaries — long-horizon context management pattern |

## Search-Term Matrix

### Documentation Sources

| Search Query | Target | Expected Yield |
|-------------|--------|---------------|
| CLAUDE.md loading order | Claude Code docs | High |
| claude code hooks lifecycle | Hook execution timing | High |
| claude code plugins skills | Plugin/skill loading mechanism | High |
| claude code rules precedence | Rule priority and ordering | Medium |
| claude code context window assembly | How context is assembled per inference | Medium |
| "system-reminder" claude code | Runtime context injection mechanism | Medium |
| claude code MCP server lifecycle | Tool registration and invocation flow | High |
| claude code memory auto-memory | File-based memory system loading | Medium |

### Codebase Analysis

| Search Pattern | Target | Tool |
|---------------|--------|------|
| `CLAUDE.md` references in docs | How CLAUDE.md is loaded | Grep |
| `.claude/rules/` directory processing | Rule loading order, glob matching | Glob + Read |
| `skills/` invocation flow | Skill activation triggers | Read |
| `.claude/settings.json` hooks | Hook event registration | Read |
| Plugin manifest / package.json | How plugins declare components | Read |
| `.claude/projects/*/memory/` | Auto-memory loading | Glob + Read |
| `system-reminder` injection points | When/how system reminders appear | Grep |

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
1. Build/install time:
   - Plugin installation, skill/rule file compilation
   - MCP server registration in settings.json
   - Memory directory initialization

2. Session start:
   - CLAUDE.md loading (project + user + enterprise hierarchy)
   - Rule file discovery (.claude/rules/*.md, glob-matched)
   - MCP server connection + capability negotiation
   - Auto-memory recall from .claude/projects/*/memory/
   - System prompt assembly

3. On-demand:
   - Skills invoked by user (/skill-name)
   - Tools called by model (MCP tool_call)
   - Memory read/write operations
   - Reference document loading (Read tool)

4. Event-triggered:
   - Hooks fired on system events (pre/post tool use, notification)
   - system-reminder injection at inference boundaries
   - Context compaction on window limits
```

Map each to SE patterns from Phase 1:
- Build-time → **Build pipeline** / **Plugin installation** pattern
- Session-start → **Dependency injection** / **Context Object** pattern (POSA)
- On-demand → **Lazy loading** / **Service locator** pattern
- Event-triggered → **Observer** / **Event-driven architecture** pattern

### Step 2: Map Priority and Ordering

For each stage, document:
- What happens when multiple components compete? (rule conflicts, skill precedence)
- How is ordering determined? (alphabetical, specificity, explicit priority)
- Can components override each other?
- How does this parallel the **Interceptor/Pipeline** pattern (POSA) where order matters?

### Step 3: Identify Gates and Triggers

| Component Type | Gate/Trigger | When Active | SE Pattern Parallel |
|---------------|-------------|-------------|-------------------|
| CLAUDE.md | Session start | Always (if file exists) | Configuration injection |
| Rules | Session start + glob match | When file pattern matches current context | Middleware filter chain |
| Skills | User invocation (`/name`) | On-demand | Command pattern |
| Hooks | System event | Event-triggered (per settings.json) | Observer / Event listener |
| Tools (MCP) | Model decision (tool_call) | On-demand | Service proxy / Adapter |
| Memory | Read: session start + query; Write: model action | Mixed lifecycle | Repository pattern |

### Step 4: Trace Complete Lifecycles

Trace two specific examples through the full lifecycle:

**Example A: `blog-workflow:brainstorm` skill**
1. Definition → plugin skills/ directory
2. Registration → plugin manifest declares available skills
3. Invocation → user types `/blog-workflow:brainstorm`
4. Context entry → skill markdown loaded into context window
5. Execution → model follows skill instructions
6. Side effects → may create files, invoke sub-skills

**Example B: MCP tool invocation (e.g., `mcp__arxiv__search_papers`)**
1. Registration → MCP server configured in settings.json
2. Capability negotiation → server declares available tools at session start
3. Context entry → tool schemas included in system prompt
4. Invocation → model decides to call tool
5. Execution → JSON-RPC call to MCP server
6. Result handling → tool output injected into context

### Step 5: Map to Production Engineering Patterns

Cross-reference lifecycle observations with production findings from Phase 1:

| Lifecycle Concern | Production Pattern | Source |
|------------------|-------------------|--------|
| Context window limits | KV-cache optimization, prefix caching | BIB-059, BIB-062 |
| Long-running tasks | Context compaction, sub-agent architecture | BIB-013, BIB-038 |
| Tool schema overhead | Active tool discovery (MCP-Zero) vs passive injection | BIB-035 |
| Memory persistence | File-based memory vs knowledge graphs | BIB-046, BIB-049 |

## Deliverables

1. **Loading Sequence Diagram Data** — ordered list of what loads when, with SE pattern annotations
2. **Component Interaction Matrix** — how component types interact/override, mapped to POSA patterns
3. **Gate/Trigger Reference** — what activates each component type, with SE pattern parallel
4. **Lifecycle Traces** — complete traces of 1 skill + 1 MCP tool invocation
5. **SE Pattern Mapping Table** — each pipeline stage mapped to its SE pattern parallel(s)

## Quality Criteria

- [ ] Loading sequence documented with evidence (not guesses)
- [ ] Priority/ordering rules identified for at least 4 component types
- [ ] Complete lifecycle trace of 1 skill + 1 MCP tool
- [ ] Gate/trigger documented for all 6 component types
- [ ] Each pipeline stage mapped to at least 1 SE pattern with source citation
- [ ] Production engineering concerns noted for each lifecycle stage
