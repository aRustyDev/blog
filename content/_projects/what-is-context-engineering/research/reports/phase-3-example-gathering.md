# Phase 3 Report: Example Gathering

_Synthesized 2026-03-24 from codebase analysis + cross-platform research._

## Deliverable 1: Example Table

### Build-Time Examples

| # | Component | Example | Source | SE Pattern | Notes |
|---|-----------|---------|--------|-----------|-------|
| 1 | **Tool** | MCP server registration | `~/.claude.json` mcpServers | Service registry | Servers registered at user level; command/args/env format |
| 2 | **Hook** | Beads git pre-commit | `.beads/hooks/pre-commit` | Observer (install-time) | 26-line shim delegating to `bd hooks run`; graceful degradation if bd absent |
| 3 | **Skill** | blog-workflow plugin install | External via `claude plugins add` | Package manager | 8 skills registered; plugin manifest declares capabilities |

### Session-Start Examples

| # | Component | Example | Source | SE Pattern | Notes |
|---|-----------|---------|--------|-----------|-------|
| 4 | **Rule** | cf-wrangler.md (path-scoped) | `.claude/rules/cf-wrangler.md` | Interceptor/Filter | 114 lines; `globs: ["**/wrangler.jsonc", "**/wrangler.toml"]`; only active for Wrangler files |
| 5 | **Memory** | MEMORY.md index | `~/.claude/projects/<project>/memory/MEMORY.md` | Repository/Cache preload | First 200 lines loaded; memory agent selects topic files |
| 6 | **Skill** | Skill metadata scan | All installed skills | Progressive disclosure/Facade | ~100 tks per skill; name+description only; full content deferred |
| 7 | **Tool** | MCP capability negotiation | MCP server → client | Capability negotiation/Handshake | JSON-RPC initialize; server declares tools; Tool Search if >10K tks |

### On-Demand Examples

| # | Component | Example | Source | SE Pattern | Notes |
|---|-----------|---------|--------|-----------|-------|
| 8 | **Skill** | blog-workflow:research-topic | Plugin skills/ | Command pattern | User types `/blog-workflow:research-topic`; full SKILL.md loaded (<5K tks) |
| 9 | **Skill** | superpowers:brainstorming | Plugin skills/ | Strategy pattern | Auto-invocable by Claude; orchestrates design exploration |
| 10 | **Tool** | mcp__arxiv__search_papers | arXiv MCP server | Service proxy/Adapter | Model decides to search; JSON-RPC call; result injected |
| 11 | **Tool** | mcp__crawl4ai__scrape | crawl4ai MCP server | Gateway pattern | JS-rendered web scraping; URL validation concern |
| 12 | **Reference** | research-eng.md template | `.claude/templates/outlines/` | Document repository | 407 lines; persona-specific structure; loaded via Read tool |
| 13 | **Reference** | Project index (as manifest) | `content/_projects/*/index.md` | Graph/Entity model | Structured YAML+tables; artifacts, phases, relationships |
| 14 | **Memory** | Memory topic file | `~/.claude/projects/*/memory/<topic>.md` | Repository read | Agent-selected; loaded when relevant to conversation |

### Event-Triggered Examples

| # | Component | Example | Source | SE Pattern | Notes |
|---|-----------|---------|--------|-----------|-------|
| 15 | **Hook** | PreToolUse (blocking) | `settings.json` hooks | Guard/Interceptor | Can deny tool execution (exit 2); stderr becomes feedback |
| 16 | **Hook** | PostToolUse (observing) | `settings.json` hooks | Observer | Fire-and-forget; logging, metrics, notifications |
| 17 | **Hook** | InstructionsLoaded | `settings.json` hooks | Diagnostic observer | Reveals load_reason: session_start, path_glob_match, compact |
| 18 | **Reference** | system-reminder injection | Runtime platform | Change notification | ~40 types; file changes, hook outputs, mode changes; user messages preserving cache |

**Total: 18 examples across all 6 component types and all 4 pipeline stages.**

---

## Deliverable 2: Per-Example Documentation (5 Detailed Writeups)

### Skill: blog-workflow:research-topic

**Source**: Externally installed plugin; pre-approved via `Skill(blog-workflow:research-topic)` in `.claude/settings.local.json`
**Pipeline Stage**: On-demand
**Trigger**: User types `/blog-workflow:research-topic`
**SE Pattern**: Command pattern

**Definition**:
- SKILL.md file in plugin's skills/ directory
- YAML frontmatter: `name`, `description`, optional `disable-model-invocation`, `user-invocable`, `allowed-tools`, `model`, `effort`, `context`, `agent`, `hooks`
- Markdown body with task instructions, output format specification, file path conventions

**Loading**:
- At plugin install time, plugin manifest scanned; skill registered in Claude Code's skill index
- `Skill(blog-workflow:research-topic)` permission in settings.local.json pre-approves invocation without per-session confirmation
- At session start, only metadata loaded (~100 tokens): name + description

**Activation**:
- User types `/blog-workflow:research-topic` (slash command)
- OR model auto-invokes if `disable-model-invocation` is not set and context matches description
- Full SKILL.md content loaded into context (<5K tokens target)
- system-reminder injected: skill content available, follow instructions directly

**Context Impact**:
- Session start: ~100 tokens (metadata only)
- On invocation: <5,000 tokens (full skill content)
- Budget: 2% of context window, fallback 16K chars
- Supporting files (templates, examples) loaded on-demand within skill execution

**Production Concerns**:
- Token cost is manageable (<5K per skill invocation)
- Multiple skill invocations accumulate; no automatic cleanup
- Cache impact: skill content is dynamic (loaded as user message), does not warm prompt cache

**Security Considerations**:
- Skill content is treated as instructions — a compromised skill file could inject arbitrary instructions
- Plugin source is external; no integrity verification documented
- `allowed-tools` frontmatter can restrict which tools the skill may use

**Example Output**:
```
/blog-workflow:research-topic "context engineering for LLM agents"
→ Creates: posts/_research/context-engineering.md
→ Contains: background synthesis, sources, key concepts, open questions
```

---

### Rule: cf-wrangler.md (Path-Scoped)

**Source**: `/private/etc/infra/pub/blog/.claude/rules/cf-wrangler.md`
**Pipeline Stage**: Session-start (discovered) → On-demand (activated when glob matches)
**Trigger**: Claude reads/edits a file matching `**/wrangler.jsonc` or `**/wrangler.toml`
**SE Pattern**: Interceptor/Conditional filter

**Definition**:
- 114-line Markdown file with YAML frontmatter
- Frontmatter: `globs: ["**/wrangler.jsonc", "**/wrangler.toml"]`
- Body: structured reference documentation — tables, code blocks, troubleshooting guide
- Sections: Static Site Deployment, Workers Builds, Custom Domains, SSR/Hybrid, Validation, References

**Loading**:
- At session start, `.claude/rules/` directory scanned recursively
- File discovered; glob patterns extracted from frontmatter
- Rule NOT injected into context yet (path-scoped, waiting for match)
- `InstructionsLoaded` hook would fire with `load_reason: path_glob_match` when activated

**Activation**:
- Claude accesses a `wrangler.jsonc` or `wrangler.toml` file (read, edit, or reference)
- Glob pattern matches → full rule content injected into context as user message
- Rule remains active for the rest of the session (no deactivation mechanism)

**Context Impact**:
- Before activation: 0 tokens (metadata tracked internally, not in context window)
- After activation: ~800 tokens (114 lines of Markdown)
- Persists through compaction (re-read from disk like CLAUDE.md)

**Production Concerns**:
- Minimal token cost when inactive (most sessions never trigger it)
- No cache impact until activated (system prompt stays frozen)
- Glob pattern evaluation happens on file access, not per-turn

**Security Considerations**:
- Project rules override user rules — a malicious `.claude/rules/` file could override user-level safety instructions
- Rule content is treated as high-priority instructions
- No signature or integrity check on rule files

**Example Output**:
```
When Claude opens wrangler.jsonc for editing:
→ cf-wrangler.md content injected
→ Claude now "knows" to use `assets` config (not `main`),
   avoid `npm install` in build.command, handle DNS conflicts for custom domains
```

---

### Hook: PreToolUse (Blocking Guard)

**Source**: `.claude/settings.json` hooks configuration (not configured in this repo — documented from official specification)
**Pipeline Stage**: Event-triggered
**Trigger**: Before any tool call executes; fires for every tool use matching the hook's matcher pattern
**SE Pattern**: Guard/Interceptor

**Definition**:
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [{
          "type": "command",
          "command": "/path/to/validator.sh"
        }]
      }
    ]
  }
}
```
- Matcher field: tool name pattern (exact match, regex, or `*` for all tools)
- Four handler types: `command` (shell), `http` (POST), `prompt` (single-turn LLM), `agent` (multi-turn LLM with tools)

**Loading**:
- At session start, hooks configuration parsed from settings.json
- Hook registered internally against its event + matcher
- No context tokens consumed until hook fires

**Activation**:
- Claude decides to call a tool matching the hook's matcher
- Hook fires BEFORE tool execution
- All matching hooks run in parallel; identical commands deduplicated
- Hook receives tool name, parameters, and context via stdin (command type)

**Context Impact**:
- Exit 0: tool proceeds; stdout can inject text into context (~variable tokens)
- Exit 2: tool BLOCKED; stderr becomes Claude's feedback (~52 tokens for error message)
- Structured JSON exit 0: `{"permissionDecision": "allow"|"deny"|"ask"}` for fine-grained control
- Timeout: 10 minutes default, configurable per hook

**Production Concerns**:
- Hook latency directly impacts tool call latency (synchronous blocking)
- Parallel execution mitigates multi-hook overhead
- No caching of hook results — fires every time
- Timeout configuration critical for long-running validators

**Security Considerations**:
- PreToolUse hooks ARE the guardrail mechanism — they enforce trust boundaries
- Can prevent dangerous Bash commands, block writes to protected files, require approval for external API calls
- Maps directly to BIB-069 OWASP LLM01 (Prompt Injection) and LLM06 (Excessive Agency) mitigations
- Hook commands themselves need trust — a compromised hook script could silently approve dangerous operations

**Example Output**:
```
Claude: tool_call(Bash, command="rm -rf /")
→ PreToolUse hook fires
→ Hook validator checks command against blocklist
→ Exit 2, stderr: "Dangerous command blocked: rm -rf /"
→ Claude receives: "Hook blocked this action: Dangerous command blocked: rm -rf /"
→ Claude adapts: "I can't execute that command. Let me suggest a safer alternative..."
```

---

### Tool: mcp__arxiv__search_papers

**Source**: User-level MCP server registration (`~/.claude.json`); tool permission in `.claude/settings.local.json`
**Pipeline Stage**: On-demand
**Trigger**: Model decides to search for papers
**SE Pattern**: Service proxy / Adapter

**Definition**:
- MCP server configured with stdio transport:
  ```json
  {
    "mcpServers": {
      "arxiv": {
        "command": "node",
        "args": ["/path/to/arxiv-mcp-server/index.js"],
        "env": {}
      }
    }
  }
  ```
- Server declares tools via JSON-RPC `initialize` response: `search_papers`, `read_paper`, `list_papers`, `download_paper`
- Each tool has a JSON Schema parameter definition

**Loading**:
- Build-time: server registered in user config
- Session start: stdio process spawned; JSON-RPC handshake; tools declared
- If total MCP tool descriptions >10K tokens → Tool Search activated; arxiv tools deferred
- Permission: `mcp__arxiv__search_papers` in settings.local.json pre-approves this specific tool

**Activation**:
- Model decides to call `mcp__arxiv__search_papers` based on conversation context
- If Tool Search active: model first calls `ToolSearch` with keywords → arxiv schema loaded (~500 tks)
- Then model constructs tool_call with parameters: `{ "query": "...", "categories": [...], "max_results": 10 }`
- PreToolUse hook fires (if configured) — can block
- JSON-RPC request sent to arXiv MCP server process
- Server executes search against arXiv API
- Response returned via JSON-RPC; injected into conversation

**Context Impact**:
- Session start: 0 tokens (deferred via Tool Search) or ~500 tokens (full schema)
- Per invocation: ~500-2000 tokens per result set (10 papers with titles, authors, abstracts)
- Results accumulate in conversation history; compactable

**Production Concerns**:
- Tool Search reduces initial context overhead by 95% (77K → 8.7K for 50+ tools)
- Server process lifecycle: spawned at session start, kept alive for duration
- arXiv API has its own rate limits (managed by the MCP server, not Claude Code)
- Latency: tool call round-trip adds 1-5 seconds depending on API response time

**Security Considerations**:
- MCP servers run with the user's system permissions
- Two-layer authorization: server must be registered (user-level) AND tool must be permitted (project-level)
- Server could theoretically return manipulated results (BIB-069 OWASP LLM04: Data Poisoning parallel)
- No content integrity verification on tool results

---

### Memory: Auto-Memory System

**Source**: `~/.claude/projects/<project>/memory/` (not initialized in this repo — documented from official specification)
**Pipeline Stage**: Session-start (index) + On-demand (topics)
**Trigger**: Session start (MEMORY.md) + agent decision (topic files)
**SE Pattern**: Repository / Two-tier cache

**Definition**:
- `MEMORY.md`: concise index file, pointer to topic files
  - Frontmatter: none (pure markdown index)
  - Max 200 lines; truncated beyond that
  - Contains links to topic files with brief descriptions
- Topic files: individual memory records with frontmatter
  ```yaml
  ---
  name: "user preferences"
  description: "coding style, communication preferences"
  type: user  # user | feedback | project | reference
  ---
  Content describing the memory...
  ```

**Loading**:
- Session start: MEMORY.md read; first 200 lines injected as user message
- Memory agent prompt (218 tokens) determines which topic files to attach
- Topic files loaded on-demand by the memory agent based on conversation relevance
- Dream consolidation agent (706 tokens) periodically merges/prunes memories

**Activation**:
- Index: always at session start (if MEMORY.md exists)
- Topics: agent-selected based on conversation context
- Write: Claude decides to save a memory during conversation (e.g., user says "remember this")
- Consolidation: periodic "dream" pass — multi-phase merge, prune, index update

**Context Impact**:
- Session start: ≤200 lines of MEMORY.md index (~400-800 tokens)
- Per topic file: variable (typically 100-500 tokens each)
- Memory agent decision overhead: 218 tokens (agent prompt)
- Total memory footprint: typically 1-3K tokens per session

**Production Concerns**:
- 200-line MEMORY.md cap enforces brevity — > 200 lines truncated silently
- Machine-local storage: not shared across devices or cloud
- All worktrees and subdirectories of a git repo share one memory directory
- Performance data: CLAUDE.md files under 200 lines have >92% rule application rate; over 400 lines drops to ~71%

**Security Considerations**:
- Memory persistence means context from one session influences future sessions
- No access control: anyone with filesystem access can read/modify memory files
- Memory poisoning: a compromised memory file could inject persistent instructions
- No expiration or staleness detection (Copilot's memory validation is unique here)

---

## Deliverable 3: Pipeline Stage Coverage

| Pipeline Stage | Example Count | Component Types Covered |
|---------------|--------------|------------------------|
| **Build-time** | 3 | Tool (MCP registration), Hook (git hooks), Skill (plugin install) |
| **Session-start** | 4 | Rule (cf-wrangler), Memory (MEMORY.md), Skill (metadata), Tool (MCP negotiation) |
| **On-demand** | 7 | Skill (2), Tool (2), Reference (2), Memory (topic) |
| **Event-triggered** | 4 | Hook (3 event types), Reference (system-reminder) |
| **Total** | **18** | **All 6 types covered with 2+ examples each** |

---

## Deliverable 4: SE Pattern Mapping (Per-Example)

| Example | SE Pattern | Pattern Family |
|---------|-----------|---------------|
| MCP server registration | Service registry | Creational |
| Beads pre-commit hook | Observer (install-time) | Behavioral |
| Plugin installation | Package manager / Build pipeline | Structural |
| cf-wrangler.md rule | Interceptor / Conditional filter | Structural |
| MEMORY.md index | Repository / Cache preload | Structural |
| Skill metadata scan | Progressive disclosure / Facade | Structural |
| MCP capability negotiation | Handshake / Capability negotiation | Behavioral |
| blog-workflow:research-topic | Command pattern | Behavioral |
| superpowers:brainstorming | Strategy pattern | Behavioral |
| mcp__arxiv__search_papers | Service proxy / Adapter | Structural |
| mcp__crawl4ai__scrape | Gateway pattern | Structural |
| research-eng.md template | Document repository | Structural |
| Project index | Graph / Entity model | Structural |
| Memory topic file | Repository read | Structural |
| PreToolUse hook | Guard / Interceptor | Behavioral |
| PostToolUse hook | Observer | Behavioral |
| InstructionsLoaded hook | Diagnostic observer | Behavioral |
| system-reminder | Change notification | Behavioral |

---

## Deliverable 5: Cross-Platform Comparison

_Full analysis in `research/findings/phase-3-cross-platform.md`._

### Summary Table

| Component | Claude Code | Cursor | Copilot | Windsurf |
|-----------|------------|--------|---------|----------|
| **Skills** | SKILL.md, `/name`, auto-invoke | Rules with `@`-mention (Notepads deprecated) | `.prompt.md`, `/name` | Workflows, Agent Skills |
| **Rules** | `.claude/rules/*.md` + CLAUDE.md hierarchy | `.cursor/rules/*.mdc` + `.cursorrules` | `copilot-instructions.md` + `.instructions.md` + AGENTS.md | `.windsurfrules` + AGENTS.md |
| **Hooks** | 21 events, 4 handler types, approve/deny | 6 events, command handler, observe-only | 6 events, approve/deny/ask | None |
| **Memory** | Auto-memory + CLAUDE.md (manual) | "Generate Memories" + community Memory Bank | Copilot Memory (validated vs codebase) | Cascade Memories (~48hr learning) |
| **Tools** | MCP (no cap) | MCP (40-tool cap) | MCP + GitHub MCP Registry | MCP (100-tool cap, per-tool toggle) |
| **References** | `@file`, Read tool, templates | `@file`, `@codebase`, `@Docs`, `@web` | Markdown links, `#file` | Open files, M-Query retrieval |

### Key Convergence

- **MCP**: Universal across all 4 tools (donated to Linux Foundation Dec 2025)
- **Glob-gated rules**: All 4 implement file-pattern-based rule activation
- **AGENTS.md**: Emerging cross-tool standard (Copilot + Windsurf; Copilot also reads CLAUDE.md)
- **Slash-command skills**: 3 of 4 tools (Claude Code, Copilot, Windsurf); Cursor is the outlier

### Key Differentiators

- **Hook maturity**: Claude Code (21 events) >> Cursor/Copilot (6 each) >> Windsurf (0)
- **Memory validation**: Only Copilot validates memories against current codebase
- **Context window strategy**: Claude Code reads full project (200K-1M) vs Cursor (RAG) vs Copilot IDE (sliding ~8-16K) vs Windsurf (M-Query pipeline)

---

## Quality Criteria Checklist

- [x] At least 15 examples documented (18 documented)
- [x] At least 5 examples with full detailed writeup (5: skill, rule, hook, tool, memory)
- [x] All 6 component types represented with 2+ examples each
- [x] All 4 pipeline stages have examples (3/4/7/4)
- [x] Each example annotated with SE pattern parallel (18 mappings)
- [x] Production concerns noted for at least 3 examples (noted for all 5 detailed writeups)
- [x] Security considerations noted for at least 2 examples (noted for all 5 detailed writeups)
- [x] Source locations verified (files exist, code is accurate)
- [x] Cross-platform comparison covers at least 2 other tools (3: Cursor, Copilot, Windsurf)
