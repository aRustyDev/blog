# Phase 2 Report: Context Component Lifecycle Mapping

_Synthesized 2026-03-24 from codebase analysis + official documentation research._

## Deliverable 1: Loading Sequence Diagram Data

### Stage 1 — Build / Install Time

| Order | Component | Action | SE Pattern |
|-------|-----------|--------|-----------|
| 1.1 | Plugins | Plugin packages installed via `claude plugins add` | **Package manager / Build pipeline** |
| 1.2 | MCP Servers | Server commands registered in `~/.claude.json` or `.mcp.json` | **Service registry** |
| 1.3 | Git Hooks | Beads shims installed to `.git/hooks/` | **Observer (install-time)** |
| 1.4 | Memory Dir | `~/.claude/projects/<project>/memory/` created on first use | **Repository initialization** |

### Stage 2 — Session Start

| Order | Component | Action | SE Pattern | Token Cost |
|-------|-----------|--------|-----------|-----------|
| 2.1 | System prompt | 110+ modular segments assembled, cache-optimized order | **Template method** | ~15-20K |
| 2.2 | Managed CLAUDE.md | Loaded from `/Library/Application Support/ClaudeCode/CLAUDE.md` — cannot be excluded | **Policy injection** | Variable |
| 2.3 | Ancestor CLAUDE.md | Upward directory walk from cwd, each level loaded | **Configuration cascade / DI** | Variable |
| 2.4 | Project CLAUDE.md | `./CLAUDE.md` or `./.claude/CLAUDE.md` | **Context Object (POSA)** | Variable |
| 2.5 | User rules | `~/.claude/rules/*.md` without `paths` frontmatter | **Middleware filter chain** | Variable |
| 2.6 | Project rules | `.claude/rules/*.md` without `paths` frontmatter (overrides user) | **Middleware filter chain** | Variable |
| 2.7 | Auto-memory | First 200 lines of `MEMORY.md` loaded; memory agent decides which topic files to attach | **Repository / Cache** | ≤200 lines |
| 2.8 | MCP negotiation | Each server connects, declares capabilities; tool schemas fetched | **Capability negotiation / Handshake** | ~100 tks/tool or deferred |
| 2.9 | Tool Search | If MCP tools exceed 10K tokens, deferred loading activates — only `ToolSearch` meta-tool loaded | **Lazy loading / Virtual proxy** | ~8.7K vs ~77K |
| 2.10 | Skill metadata | Name + description of every available skill scanned (~100 tks each) | **Progressive disclosure / Facade** | ~100 tks/skill |
| 2.11 | Git status | Snapshot of current git state | **State capture** | ~97 tks |
| 2.12 | Security monitors | Autonomous agent security instructions (Parts 1+2) | **Guard / Policy enforcement** | ~5.7K |

**Key insight**: CLAUDE.md is injected as a **user message after the system prompt**, not as part of the system prompt. System blocks stay frozen for cache optimization; dynamic content arrives as user messages.

**Injection order**: System blocks (frozen, cached) → CLAUDE.md hierarchy (user messages) → rules (user messages) → memory (user messages) → metadata (user messages)

### Stage 3 — On-Demand

| Trigger | Component | Action | SE Pattern | Token Cost |
|---------|-----------|--------|-----------|-----------|
| User types `/skill-name` | Skill | Full SKILL.md content loaded (was metadata-only before) | **Command / Lazy loading** | <5K target |
| Model decides tool_call | MCP Tool | JSON-RPC call to server; result injected into context | **Service proxy / Adapter** | Variable |
| Model reads file | Path-scoped rule | Rule with matching `paths` glob activated | **Interceptor / Filter** | Variable |
| Model reads subdirectory | Descendant CLAUDE.md | Subdirectory CLAUDE.md lazy-loaded | **Lazy loading** | Variable |
| Model reads file | Reference doc | Template, ADR, plan loaded via Read tool | **On-demand reference** | Variable |
| Model writes memory | Memory file | Topic file created/updated in memory dir | **Repository write** | — |
| Model reads memory | Memory topic | Topic file loaded on demand | **Repository read** | Variable |
| Tool Search query | Deferred MCP tools | 3-5 relevant tool schemas loaded per query | **Virtual proxy resolution** | ~3K per query |

### Stage 4 — Event-Triggered

| Event | Component | Action | SE Pattern | Token Cost |
|-------|-----------|--------|-----------|-----------|
| Any of 22 lifecycle events | Hooks | Matching hooks fire in parallel; can block (exit 2) or proceed (exit 0) | **Observer / Event listener** | Varies by handler |
| `PreToolUse` | Hook (blocking) | Can deny tool execution; stderr becomes Claude's feedback | **Guard / Interceptor** | ~52 tks |
| `InstructionsLoaded` | Hook (diagnostic) | Reveals load_reason: `session_start`, `nested_traversal`, `path_glob_match`, `include`, `compact` | **Diagnostic observer** | ~35 tks |
| File modified externally | System reminder | File diff injected as `<system-reminder>` user message | **Change notification** | ~97 tks |
| Context limit approached | Compaction | Context compressed; CLAUDE.md re-read from disk; memory survives | **Garbage collection / Compaction** | Reduces context |
| Post-compaction | Re-injection | CLAUDE.md, rules, memory re-loaded fresh | **Checkpoint/restore** | Full reload |

---

## Deliverable 2: Component Interaction Matrix

### How Component Types Interact

| Component A | Component B | Interaction | Precedence Rule |
|------------|------------|-------------|-----------------|
| CLAUDE.md (project) | CLAUDE.md (user) | Additive — both loaded | Project > User (loaded later = higher priority) |
| CLAUDE.md (managed) | CLAUDE.md (project) | Additive, non-excludable | Managed always included |
| Rules (project) | Rules (user) | Project overrides user | "User rules loaded before project rules, giving project rules higher priority" |
| Rules (unconditional) | Rules (path-scoped) | Coexist — path-scoped adds when files match | Path-scoped layers on top of unconditional |
| Rules | CLAUDE.md | Same priority level | "Rules without paths have same priority as .claude/CLAUDE.md" |
| Skill (enterprise) | Skill (project) | Name collision → enterprise wins | Enterprise > personal > project |
| Skill metadata | Skill full content | Progressive disclosure — metadata first, full on invoke | Metadata always; full replaces on activation |
| MCP tool schemas | Tool Search | Tool Search replaces full schemas when >10K tokens | Lazy loading threshold |
| Hooks | Tool execution | `PreToolUse` can block; `PostToolUse` observes | Hook decides before tool runs |
| Memory (MEMORY.md) | Memory (topic files) | Index loaded at start; topics loaded on demand by memory agent | Two-tier: index always, topics selective |
| System reminders | System prompt | Reminders are user messages; system prompt stays frozen | System prompt cached; reminders additive |

### Conflict Resolution

| Conflict Type | Resolution | Source |
|--------------|-----------|--------|
| Two CLAUDE.md files contradict | "Claude may pick one arbitrarily" | Official docs |
| Rule glob matches multiple rules | All matching rules applied simultaneously | Observed behavior |
| Skill name collision across levels | Higher scope wins (enterprise > personal > project) | Official docs |
| Plugin skill namespace | No collision possible — `plugin-name:skill-name` | Architecture |
| Hook + tool execution | Hook exit code determines: 0=proceed, 2=block | Official docs |
| Memory conflicts | Later write wins — no merge strategy | Observed behavior |

---

## Deliverable 3: Gate/Trigger Reference

| Component Type | Gate Mechanism | Trigger | When Active | SE Pattern |
|---------------|---------------|---------|-------------|-----------|
| **CLAUDE.md** | File existence + directory walk | Session start (ancestor) or file access (descendant) | Always if file exists; descendant on access | Configuration cascade / DI container |
| **Rules (unconditional)** | File exists in `.claude/rules/` without `paths` | Session start | Always active | Middleware filter (always-on) |
| **Rules (path-scoped)** | `paths` YAML frontmatter with glob pattern | Claude reads matching file | Only when file pattern matches | Interceptor / Conditional filter |
| **Skills** | Skill metadata loaded at session start | User `/invoke` or model auto-invoke (unless `disable-model-invocation`) | On-demand | Command pattern / Lazy loading |
| **Hooks** | Event matcher in settings.json | One of 22 lifecycle events fires | Event-triggered; all matching hooks run in parallel | Observer / Event listener |
| **Tools (MCP)** | Server registered + tool permitted | Model decides to call tool | On-demand (model decision) | Service proxy / Adapter |
| **Memory (index)** | MEMORY.md exists | Session start | Always (first 200 lines) | Repository / Cache preload |
| **Memory (topics)** | Topic files exist | Memory agent decides relevance | On-demand (agent-selected) | Repository / Lazy loading |
| **Templates/Refs** | Files exist in known locations | Model reads via Read tool | On-demand (explicit request) | Document repository |
| **System reminders** | Runtime platform events | File changes, hook outputs, mode changes, etc. | Event-triggered (platform-level) | Change notification / Observer |

### Loading Reason Taxonomy (from InstructionsLoaded hook)

| `load_reason` | What Triggered It | Pipeline Stage |
|--------------|-------------------|---------------|
| `session_start` | Eagerly loaded at launch | Stage 2 |
| `nested_traversal` | Claude accessed a subdirectory | Stage 3 |
| `path_glob_match` | File matching rule's glob was read | Stage 3 |
| `include` | `@import` directive in another file | Stage 2 or 3 |
| `compact` | Re-loaded after context compaction | Stage 4 |

---

## Deliverable 4: Lifecycle Traces

### Trace A: `blog-workflow:brainstorm` Skill Invocation

```
STAGE 1 — Build/install time:
  └─ blog-workflow plugin installed externally
  └─ Plugin manifest declares 8 skills including 'brainstorm'
  └─ Skill(blog-workflow:brainstorm) added to settings.local.json permissions

STAGE 2 — Session start:
  └─ Plugin skills metadata scanned
  └─ Claude receives: "blog-workflow:brainstorm — [description]" (~100 tokens)
  └─ Full skill content NOT loaded yet (progressive disclosure)
  └─ Skill listed in available-skills system-reminder block

STAGE 3 — On-demand (user types /blog-workflow:brainstorm):
  └─ Skill tool invoked via Skill tool call
  └─ Full SKILL.md content loaded into context (<5K tokens)
  └─ system-reminder injected: "Called the Skill tool... skill has ALREADY been loaded"
  └─ Claude follows skill instructions (brainstorming workflow)
  └─ Skill may reference other tools (Write, Read, Agent)
  └─ Skill may invoke sub-skills or create tasks

STAGE 4 — Event-triggered (during skill execution):
  └─ If skill creates files → file modification system-reminders
  └─ If skill uses tools → PreToolUse/PostToolUse hooks fire (if configured)
  └─ If context approaches limit → compaction may trigger, skill context preserved via re-read
```

**Token lifecycle**: ~100 tks (metadata at session start) → ~5K tks (full content on invoke) → may shrink on compaction

### Trace B: `mcp__arxiv__search_papers` Tool Invocation

```
STAGE 1 — Build/install time:
  └─ arXiv MCP server registered in user-level config: ~/.claude.json
  └─ Command: node + path to server script
  └─ mcp__arxiv__search_papers added to settings.local.json permissions

STAGE 2 — Session start:
  └─ MCP server process started (stdio transport)
  └─ JSON-RPC initialize handshake: client ↔ server
  └─ Server declares capabilities: tools (search_papers, read_paper, list_papers, download_paper)
  └─ Tool schemas fetched:
     ├─ If total MCP tool tokens < 10K → all schemas loaded into system prompt
     └─ If total > 10K → Tool Search activated, ToolSearch meta-tool loaded instead
  └─ Tool descriptions available to Claude for decision-making

STAGE 3 — On-demand (model decides to search papers):
  └─ If Tool Search active:
     └─ Claude calls ToolSearch with query keywords
     └─ 3-5 relevant tool schemas loaded (~3K tokens)
     └─ mcp__arxiv__search_papers schema now available
  └─ Claude constructs tool_call with parameters:
     { "query": "...", "categories": [...], "max_results": 10 }
  └─ PreToolUse hook fires (if configured) — can block
  └─ JSON-RPC request sent to arXiv MCP server
  └─ Server executes search, returns results
  └─ PostToolUse hook fires (if configured)
  └─ Tool result injected into conversation as assistant message
  └─ Claude processes results and continues

STAGE 4 — Event-triggered:
  └─ Rate limit tracking (Semantic Scholar: 1 req/sec — managed by server, not client)
  └─ If server crashes → error result, model can retry or adapt
  └─ If context approaches limit → tool results included in compaction consideration
```

**Token lifecycle**: ~0 tks (deferred) or ~500 tks (schema at session start) → ~500-2000 tks per result set (on invoke) → compactable

---

## Deliverable 5: SE Pattern Mapping Table

| Pipeline Stage | SE Pattern | CE Parallel | Evidence |
|---------------|-----------|-------------|---------|
| **Build-time** | Package manager / Build pipeline | Plugin installation, MCP server registration | Plugins installed once, reused across sessions |
| **Build-time** | Service registry | MCP server registration in `~/.claude.json` | Servers registered at user level, discovered at session start |
| **Session-start** | Configuration cascade / DI container | CLAUDE.md hierarchy (managed > project > user) | Three-tier config with upward walk; project overrides user |
| **Session-start** | Context Object (POSA) | Assembled system prompt (~110 segments) | Structured context window carrying all session state |
| **Session-start** | Middleware filter chain | Rules without `paths` — always active | Unconditional rules filter/constrain all interactions |
| **Session-start** | Progressive disclosure / Facade | Skill metadata scan (~100 tks each) | Only name+description loaded; full content deferred |
| **Session-start** | Lazy loading / Virtual proxy | Tool Search for MCP tools >10K tokens | Replaces 77K of schemas with 8.7K meta-tool |
| **Session-start** | Repository / Cache preload | MEMORY.md index (first 200 lines) | Index always loaded; topics deferred to agent decision |
| **On-demand** | Command pattern | Skill invocation via `/skill-name` | User issues command; system loads and executes skill |
| **On-demand** | Service proxy / Adapter | MCP tool invocation via JSON-RPC | Model calls tool; MCP protocol adapts to server implementation |
| **On-demand** | Interceptor / Conditional filter | Path-scoped rules (with `paths` glob) | Rule activates only when matching file is accessed |
| **On-demand** | Lazy loading | Descendant CLAUDE.md, deferred tool schemas | Content loaded only when accessed, not at startup |
| **On-demand** | Repository read/write | Memory topic files | Agent reads/writes topic files as needed |
| **Event-triggered** | Observer / Event listener | Hooks (22 lifecycle events) | All matching hooks fire in parallel on event |
| **Event-triggered** | Guard / Interceptor | `PreToolUse` hook with exit 2 (block) | Hook can deny tool execution before it runs |
| **Event-triggered** | Change notification | System reminders (~40 types) | Platform injects context changes as user messages |
| **Event-triggered** | Garbage collection / Compaction | Context compaction on window limits | CLAUDE.md re-read from disk; context compressed |
| **Event-triggered** | Checkpoint/restore | Post-compaction re-injection | Full reload of CLAUDE.md, rules, memory after compaction |

### Novel Patterns (not in classical SE literature)

| Pattern | Description | Why It's Novel |
|---------|-------------|---------------|
| **Cache-optimized injection** | System prompt stays frozen; dynamic content arrives as user messages to preserve prompt cache | Combines cache optimization with configuration injection |
| **Progressive disclosure at scale** | Skills expose metadata at startup, full content on invoke; MCP tools deferred if >10K tokens | Scales context management across hundreds of potential components |
| **Memory agent delegation** | A sub-agent decides which memory topic files to attach | Delegated lazy loading — the loader itself is an LLM |
| **Dream consolidation** | Periodic multi-phase memory merge, prune, and index update | No classical SE parallel — closest is database vacuum/compaction |

---

## Quality Criteria Checklist

- [x] Loading sequence documented with evidence (official docs + codebase analysis)
- [x] Priority/ordering rules identified for 6 component types (CLAUDE.md, rules, skills, hooks, tools, memory)
- [x] Complete lifecycle trace of 1 skill (blog-workflow:brainstorm)
- [x] Complete lifecycle trace of 1 MCP tool (mcp__arxiv__search_papers)
- [x] Gate/trigger documented for all 6 component types + system reminders
- [x] Each pipeline stage mapped to at least 1 SE pattern with source citation
- [x] Production engineering concerns noted (token costs, cache optimization, Tool Search thresholds)
- [x] 18 SE pattern mappings + 4 novel patterns documented
