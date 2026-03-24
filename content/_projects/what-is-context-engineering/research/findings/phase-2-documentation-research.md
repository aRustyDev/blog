# Phase 2: Documentation Research -- Claude Code Context Lifecycle

> Research compiled 2026-03-24. Sources: official Anthropic documentation (code.claude.com), GitHub issues, Piebald-AI/claude-code-system-prompts repository (v2.1.81), and community analyses.

---

## CLAUDE.md Loading

### Hierarchy (Highest to Lowest Priority)

Claude Code uses a scope system where more specific locations take precedence over broader ones. From official docs:

| Scope | Location | Priority |
|-------|----------|----------|
| **Managed policy** | `/Library/Application Support/ClaudeCode/CLAUDE.md` (macOS), `/etc/claude-code/CLAUDE.md` (Linux) | Highest -- cannot be excluded |
| **Project instructions** | `./CLAUDE.md` or `./.claude/CLAUDE.md` | Mid-high |
| **User instructions** | `~/.claude/CLAUDE.md` | Lowest explicit tier |

**Key quote from docs:** "User-level rules are loaded before project rules, giving project rules higher priority."

### Loading Mechanism: Ancestor vs. Descendant

Two distinct discovery mechanisms operate:

1. **Ancestor loading (upward walk):** "Claude Code reads CLAUDE.md files by walking up the directory tree from your current working directory, checking each directory along the way." These load **at launch** in full.

2. **Descendant loading (lazy/on-demand):** "Claude also discovers CLAUDE.md files in subdirectories under your current working directory. Instead of loading them at launch, they are included when Claude reads files in those subdirectories."

### Injection Method

From the official docs troubleshooting section: **"CLAUDE.md content is delivered as a user message after the system prompt, not as part of the system prompt itself."** This is a critical architectural detail -- CLAUDE.md is context, not system prompt.

### Merge Behavior

- No formal merge: files at multiple levels are all loaded, but conflicts may result in arbitrary behavior.
- **Quote:** "If two rules contradict each other, Claude may pick one arbitrarily."
- `claudeMdExcludes` setting allows skipping specific files by glob pattern in large monorepos.
- Managed policy CLAUDE.md files **cannot be excluded.**

### Import System

- `@path/to/import` syntax for pulling in additional files.
- Relative paths resolve relative to the containing file, not the working directory.
- Recursive imports allowed, max depth of 5 hops.
- First encounter of external imports shows an approval dialog.

### Post-Compaction Behavior

**"CLAUDE.md fully survives compaction. After `/compact`, Claude re-reads your CLAUDE.md from disk and re-injects it fresh into the session."**

---

## Rules System

### Location and Discovery

Rules are markdown files in `.claude/rules/` (project-level) or `~/.claude/rules/` (user-level). Files are discovered **recursively** within the rules directory, supporting subdirectory organization.

### Loading: Unconditional vs. Path-Scoped

Two loading modes:

1. **Unconditional rules** (no `paths` frontmatter): "Rules without `paths` frontmatter are loaded at launch with the same priority as `.claude/CLAUDE.md`."

2. **Path-scoped rules** (with `paths` YAML frontmatter): "These conditional rules only apply when Claude is working with files matching the specified patterns." They trigger "when Claude reads files matching the pattern, not on every tool use."

### Glob Pattern Syntax

Standard glob patterns with brace expansion:

| Pattern | Matches |
|---------|---------|
| `**/*.ts` | All TypeScript files in any directory |
| `src/**/*` | All files under `src/` |
| `*.md` | Markdown files in project root only |
| `src/**/*.{ts,tsx}` | TypeScript and TSX files under `src/` |

Multiple patterns supported in a single rule via YAML list.

### Precedence

- User-level rules (`~/.claude/rules/`) load **before** project rules, giving project rules higher priority.
- Rules without paths have the same priority as `.claude/CLAUDE.md`.
- Path-scoped rules gain high priority only when Claude is working on matching files.

### Symlink Support

The `.claude/rules/` directory supports symlinks for sharing rules across projects. Circular symlinks are detected and handled gracefully.

---

## Skills & Plugins

### Skill Discovery: Progressive Disclosure

From official docs: **"Skill descriptions are loaded into context so Claude knows what's available, but full skill content only loads when invoked."**

The disclosure architecture works in stages:
1. At session start, Claude sees only the **name and description** of every available skill (metadata scan, ~100 tokens per skill).
2. When activated (by user `/skill-name` invocation or Claude's automatic decision), the full SKILL.md content loads (<5k tokens target).
3. Supporting files (reference.md, examples.md, etc.) load on-demand when Claude reads them.

**Budget:** "The budget scales dynamically at 2% of the context window, with a fallback of 16,000 characters."

### Skill File Format

```yaml
---
name: my-skill           # Display name, becomes /slash-command
description: What it does # Used by Claude for auto-invocation decisions
disable-model-invocation: true  # Only user can invoke
user-invocable: false           # Only Claude can invoke
allowed-tools: Read, Grep       # Tool restrictions when active
model: claude-sonnet-4-6        # Model override
effort: high                    # Effort level override
context: fork                   # Run in subagent
agent: Explore                  # Which subagent type
hooks: {}                       # Scoped hooks
---

Skill instructions in markdown...
```

### Invocation Flow

| Frontmatter | User can invoke | Claude can invoke | Context loading |
|-------------|-----------------|-------------------|-----------------|
| (default) | Yes | Yes | Description always in context; full skill loads when invoked |
| `disable-model-invocation: true` | Yes | No | Description NOT in context; loads on user `/invoke` |
| `user-invocable: false` | No | Yes | Description always in context; full skill loads when invoked |

### Skill Priority (Name Conflicts)

"When skills share the same name across levels, higher-priority locations win: enterprise > personal > project." Plugin skills use `plugin-name:skill-name` namespace so they cannot conflict.

### Automatic Discovery from Nested Directories

"When you work with files in subdirectories, Claude Code automatically discovers skills from nested `.claude/skills/` directories." Supports monorepo setups.

### Plugin Architecture

Plugins package skills, agents, hooks, and MCP servers. Structure:

```
my-plugin/
  .claude-plugin/plugin.json    # Manifest (name, description, version)
  skills/                       # SKILL.md files
  agents/                       # Custom agent definitions
  hooks/hooks.json              # Event handlers
  .mcp.json                     # MCP server configs
  .lsp.json                     # LSP server configs
  settings.json                 # Default settings
```

- "At session startup, servers for enabled plugins connect automatically."
- `/reload-plugins` reconnects/disconnects MCP servers mid-session.
- Plugin skills are namespaced: `/plugin-name:skill-name`.

---

## Hooks

### Complete Lifecycle Events (22 Events)

From official documentation (as of v2.1.81):

| Event | When It Fires | Matcher Field |
|-------|---------------|---------------|
| `SessionStart` | Session begins or resumes | How session started: `startup`, `resume`, `clear`, `compact` |
| `UserPromptSubmit` | User submits prompt, before processing | No matcher support |
| `PreToolUse` | Before tool call executes (can block) | Tool name: `Bash`, `Edit\|Write`, `mcp__.*` |
| `PermissionRequest` | Permission dialog appears | Tool name |
| `PostToolUse` | After tool call succeeds | Tool name |
| `PostToolUseFailure` | After tool call fails | Tool name |
| `Notification` | Claude sends notification | Notification type |
| `SubagentStart` | Subagent spawned | Agent type |
| `SubagentStop` | Subagent finishes | Agent type |
| `Stop` | Claude finishes responding | No matcher support |
| `StopFailure` | Turn ends due to API error | Error type |
| `TeammateIdle` | Agent team teammate going idle | No matcher support |
| `TaskCompleted` | Task marked as completed | No matcher support |
| `InstructionsLoaded` | CLAUDE.md or rule file loaded into context | Load reason |
| `ConfigChange` | Config file changes during session | Config source |
| `WorktreeCreate` | Worktree being created | No matcher support |
| `WorktreeRemove` | Worktree being removed | No matcher support |
| `PreCompact` | Before context compaction | Trigger: `manual`, `auto` |
| `PostCompact` | After compaction completes | Trigger: `manual`, `auto` |
| `Elicitation` | MCP server requests user input | MCP server name |
| `ElicitationResult` | User responds to MCP elicitation | MCP server name |
| `SessionEnd` | Session terminates | Reason: `clear`, `resume`, `logout`, etc. |

### Handler Types

Four hook types:

1. **`command`** -- Shell command, communicates via stdin/stdout/stderr/exit codes
2. **`http`** -- POST event data to URL endpoint
3. **`prompt`** -- Single-turn LLM evaluation (Haiku by default), returns `{ok: true/false, reason: "..."}`
4. **`agent`** -- Multi-turn verification with tool access (Read, Grep, Glob), 60s default timeout, up to 50 tool-use turns

### Decision Control

- **Exit 0:** Action proceeds. Stdout added to context for `UserPromptSubmit`/`SessionStart`.
- **Exit 2:** Action blocked. Stderr becomes Claude's feedback.
- **Other exit codes:** Action proceeds, stderr logged but not shown.
- **Structured JSON:** Exit 0 with JSON stdout for fine-grained control (`permissionDecision: "allow"|"deny"|"ask"`).

### InstructionsLoaded Hook

Critical for debugging context loading. The `load_reason` field values reveal the loading trigger:
- `session_start` -- Eagerly loaded at session initialization
- `nested_traversal` -- Lazy-loaded when Claude accesses a subdirectory
- `path_glob_match` -- Conditional rule activated by file pattern match
- `include` -- Loaded via `@import` syntax
- `compact` -- Re-loaded after compaction

### Execution Model

"When an event fires, all matching hooks run in parallel, and identical hook commands are automatically deduplicated."

Hook timeout: 10 minutes default, configurable per hook.

### Configuration Locations

| Location | Scope |
|----------|-------|
| `~/.claude/settings.json` | All projects |
| `.claude/settings.json` | Single project (committed) |
| `.claude/settings.local.json` | Single project (gitignored) |
| Managed policy settings | Organization-wide |
| Plugin `hooks/hooks.json` | When plugin is enabled |
| Skill/agent frontmatter | While skill/agent is active |

---

## MCP Server Lifecycle

### Registration Methods

Three transport types:

1. **stdio** -- Local processes, direct system access. Configured via `claude mcp add <name> --transport stdio -- <command>`.
2. **HTTP (streamable-http)** -- Remote MCP servers, recommended for cloud services.
3. **SSE** -- Server-sent events transport.

Configuration stored in `~/.claude.json` (user/local scope) or `.mcp.json` (project scope).

### Startup Lifecycle

1. At session startup, MCP servers for enabled plugins connect automatically.
2. Tool schemas are fetched from connected servers.
3. If tool descriptions exceed 10K tokens, **Tool Search (lazy loading)** activates.

### Tool Search / Lazy Loading (Deferred Tools)

Introduced in Claude Code v2.1.7:

- **Trigger:** MCP tool descriptions exceed 10K token threshold.
- **Mechanism:** Tools marked with `defer_loading: true`. Claude receives a `ToolSearch` meta-tool instead of all definitions.
- **Discovery:** When Claude needs a tool, it searches by keywords; 3-5 relevant tools (~3K tokens) loaded per query.
- **Impact:** Reduces context overhead from ~77K tokens to ~8.7K tokens (95% reduction) with 50+ MCP tools.
- **Accuracy:** Internal testing showed improved tool selection accuracy (Opus 4: 49% to 74%; Opus 4.5: 79.5% to 88.1%).

### Managed MCP Configuration

Managed settings support `allowedMcpServers` (allowlist) and `deniedMcpServers` (denylist). Denylist takes precedence over allowlist.

---

## Memory System

### Two Complementary Systems

| | CLAUDE.md files | Auto memory |
|---|---|---|
| **Who writes it** | You | Claude |
| **What it contains** | Instructions and rules | Learnings and patterns |
| **Scope** | Project, user, or org | Per working tree |
| **Loaded into** | Every session | Every session (first 200 lines) |
| **Use for** | Coding standards, workflows | Build commands, debugging insights |

### Auto Memory Architecture

**Storage:** `~/.claude/projects/<project>/memory/`

```
~/.claude/projects/<project>/memory/
  MEMORY.md          # Concise index, loaded every session
  debugging.md       # Topic file, loaded on demand
  api-conventions.md # Topic file, loaded on demand
```

- `<project>` path derived from git repository -- all worktrees and subdirectories share one auto memory directory.
- Requires Claude Code v2.1.59+. On by default.
- **MEMORY.md:** First 200 lines loaded at session start. Content beyond line 200 is NOT loaded.
- **Topic files:** NOT loaded at startup. Claude reads them on demand using file tools.
- Machine-local, not shared across machines or cloud environments.

### Memory Determination

"Claude doesn't save something every session. It decides what's worth remembering based on whether the information would be useful in a future conversation."

An agent prompt for memory management exists: "Agent Prompt: Determine which memory files to attach" (218 tokens) -- a specialized agent decides which memory files to include for the main agent.

### Dream Memory Consolidation

A "Dream memory consolidation" agent (706 tokens) performs "a multi-phase memory consolidation pass -- orienting on existing memories, gathering recent signal from logs and transcripts, merging updates into topic files, and pruning the index."

---

## System Reminders

### Injection Mechanism

System reminders are discrete contextual notifications injected at **conversation runtime** using `<system-reminder>` XML tags. They are delivered as user messages (not system prompt modifications), preserving prompt cache stability.

### Format

```xml
<system-reminder>
Note: /path/to/file.json was modified, either by the user or by a linter.
Don't tell the user this, since they are already aware. This change was
intentional, so make sure to take it into account as you proceed (ie. don't
revert it unless the user asks you to). So that you don't need to re-read the
file, here's the result of running `cat -n` on a snippet of the edited file:
[file content]
</system-reminder>
```

### Catalog (~40 System Reminders as of v2.1.81)

Documented by Piebald-AI, grouped by function:

**File/Editor Events:**
- File modified by user or linter (97 tks)
- File opened in IDE (37 tks)
- Lines selected in IDE (66 tks)
- File exists but empty (27 tks)
- File shorter than offset (59 tks)
- File truncated (74 tks)
- Compact file reference (57 tks)
- New diagnostics detected (35 tks)

**Hook Events:**
- Hook additional context (35 tks)
- Hook blocking error (52 tks)
- Hook success (29 tks)
- Hook stopped continuation (30 tks)

**Memory & Context:**
- Memory file contents (36 tks)
- Nested memory contents (33 tks)
- Invoked skills (33 tks)
- Output style active (32 tks)
- Token usage (39 tks)
- USD budget (42 tks)

**Plan Mode:**
- Plan mode is active, 5-phase (1,297 tks)
- Plan mode is active, iterative (923 tks)
- Plan mode is active, subagent (307 tks)
- Plan mode re-entry (236 tks)
- Exited plan mode (73 tks)
- Plan file reference (62 tks)
- Verify plan reminder (47 tks)

**Security & Safety:**
- Malware analysis after Read tool call (87 tks)

**Agent/Team:**
- Agent mention (45 tks)
- Session continuation (37 tks)
- Task status (18 tks)
- Task tools reminder (123 tks)
- TodoWrite reminder (98 tks)
- Team Coordination (250 tks)
- Team Shutdown (136 tks)
- /btw side question (244 tks)

**MCP:**
- MCP resource no content (41 tks)
- MCP resource no displayable content (43 tks)

### Why System Reminders Exist (Cache Optimization)

"When information changes between turns (dates, file contents, git status), it's sent as a system-reminder instead of modifying the system prompt. The system prompt stays frozen. The cache stays warm."

### Triggering Behavior

From GitHub issue #4464 analysis: System-reminder injections for file modifications are triggered **inconsistently** -- CLI tool-based modifications of JSON files consistently trigger them, while direct echo/fs operations often do not. Anthropic has acknowledged this behavior but not fully documented triggering rules.

---

## Context Assembly

### System Prompt Architecture

From the Piebald-AI analysis of v2.1.81, Claude Code's system prompt is **not a single monolithic string.** It is a modular, conditionally-assembled, cache-optimized architecture comprising 110+ separate instruction segments.

### Component Categories and Token Counts

**Core System Section:** ~156 tokens. Establishes base identity and behavior.

**System Prompt Segments (selected, from Piebald catalog):**
- Agent memory instructions: 337 tks
- Executing actions with care: 590 tks
- Fork usage guidelines: 326 tks
- Git status: 97 tks
- Output efficiency: 177 tks
- Various "Doing tasks" micro-instructions: 24-104 tks each
- Tool usage policies: 26-102 tks each
- Learning mode: 1,042 tks (conditional)
- Auto mode: 266 tks (conditional)
- Minimal mode: 164 tks (conditional)

**Tool Descriptions (22+ builtin tools):**
- TodoWrite: 2,161 tks
- TeammateTool: 1,645 tks
- Bash git commit/PR instructions: 1,558 tks
- SendMessageTool: 1,205 tks
- EnterPlanMode: 878 tks
- Agent usage notes: 879 tks
- CronCreate: 754 tks
- Others: 18-527 tks each

**Security Monitors:**
- Autonomous agent security (part 1): 2,726 tks
- Autonomous agent security (part 2): 2,941 tks

**Agent Prompts (conditional):**
- Plan mode (enhanced): 680 tks
- Explore agent: 517 tks
- Verification specialist: 2,453 tks
- Others: 78-956 tks each

### Assembly Order (Inferred from Architecture)

The prompt is assembled in a cache-optimized order:

1. **System blocks** (sent as system parameter to API):
   - Core system section (identity, base behavior)
   - Conditional mode prompts (learning, minimal, auto)
   - Tool usage policies and guidance
   - Tool descriptions for available tools
   - Security monitor instructions
   - Agent memory instructions
   - `cache_control` breakpoints placed at stable boundaries

2. **User-level context** (injected as user messages):
   - Managed policy CLAUDE.md
   - Ancestor CLAUDE.md files (walked up from cwd)
   - `.claude/rules/` unconditional rules
   - Auto memory (first 200 lines of MEMORY.md)
   - Git status snapshot
   - Skill descriptions (metadata only, ~100 tks each)
   - `--append-system-prompt` content (if used)

3. **Runtime context** (injected as conversation progresses):
   - Path-scoped rules (when matching files are read)
   - Descendant CLAUDE.md files (when subdirectories are accessed)
   - System reminders (file changes, hook outputs, mode changes)
   - Full skill content (when skills are invoked)
   - MCP tool definitions (via Tool Search, on demand)

### Cache Optimization Strategy

The system prompt is structured as a **layered, stateful, cache-optimized architecture** with a specific ordering for specific reasons:
- Static content (system prompt segments) stays frozen across turns.
- Dynamic content (file changes, git status, dates) is injected via system-reminders as user messages.
- This keeps the prompt cache warm, reducing API costs significantly.

### Settings Scope Interaction

Settings priority: Managed (highest) > Command line arguments > Local > Project > User (lowest).

For example: "If a permission is allowed in user settings but denied in project settings, the project setting takes precedence and the permission is blocked."

---

## Sources

### Official Anthropic Documentation
- [Memory (CLAUDE.md and auto memory)](https://code.claude.com/docs/en/memory) -- Primary source for CLAUDE.md hierarchy, loading mechanism, auto memory architecture, import system, and troubleshooting. Contains the critical quote: "CLAUDE.md content is delivered as a user message after the system prompt."
- [Hooks guide](https://code.claude.com/docs/en/hooks-guide) -- Complete list of 22 hook lifecycle events, handler types, matcher syntax, configuration locations, and decision control mechanisms.
- [Hooks reference](https://code.claude.com/docs/en/hooks) -- Full event schemas, InstructionsLoaded load_reason values.
- [Skills](https://code.claude.com/docs/en/skills) -- Progressive disclosure, SKILL.md format, frontmatter reference, invocation control, tool restrictions, skill priority.
- [Plugins](https://code.claude.com/docs/en/plugins) -- Plugin architecture, directory structure, manifest format, MCP integration, reload behavior.
- [Settings](https://code.claude.com/docs/en/settings) -- Configuration scopes (managed/user/project/local), settings file hierarchy, available settings, permission rules.
- [MCP](https://code.claude.com/docs/en/mcp) -- MCP server registration, transport types, managed MCP configuration.

### Community Analysis & Reverse Engineering
- [Piebald-AI/claude-code-system-prompts](https://github.com/Piebald-AI/claude-code-system-prompts) -- Complete catalog of 110+ system prompt segments, 40+ system reminders, 22+ tool descriptions, and agent prompts. Updated for v2.1.81 (March 20, 2026). Primary source for understanding the modular prompt architecture.
- [GitHub Issue #4464: System reminder content injection](https://github.com/anthropics/claude-code/issues/4464) -- Technical analysis of system-reminder triggering behavior, format, and token consumption impact. Includes Anthropic engineer acknowledgment.
- [GitHub Issue #17601: Hidden system-reminder injections](https://github.com/anthropics/claude-code/issues/17601) -- Additional investigation into system-reminder scope and frequency.
- [Claude Code System Prompt Camp: Prompt Caching Analysis](https://www.claudecodecamp.com/p/how-prompt-caching-actually-works-in-claude-code) -- Analysis of cache-optimized ordering (not fully accessible but search snippets confirm: "system prompt stays frozen, cache stays warm").
- [Claude Code System Prompt Camp: Inside the System Prompt](https://www.claudecodecamp.com/p/inside-claude-code-s-system-prompt) -- "It's 110+ separate instructions, conditionally assembled based on your configuration."

### Community Guides
- [ClaudeFast: Rules Directory Guide](https://claudefa.st/blog/guide/mechanics/rules-directory) -- Rules loading mechanics, glob matching, precedence.
- [ClaudeFast: Auto Memory](https://claudefa.st/blog/guide/mechanics/auto-memory) -- Auto memory behavior and performance data.
- [SFEIR Institute: CLAUDE.md Memory System](https://institute.sfeir.com/en/claude-code/claude-code-memory-system-claude-md/) -- Memory hierarchy deep dive.
- [Claude Skills Architecture Decoded (Medium)](https://medium.com/aimonks/claude-skills-architecture-decoded-from-prompt-engineering-to-context-engineering-a6625ddaf53c) -- Skills progressive disclosure architecture.
- [MCP Tool Search Explanation (JP Caparas)](https://jpcaparas.medium.com/claude-code-finally-gets-lazy-loading-for-mcp-tools-explained-39b613d1d5cc) -- Tool Search lazy loading mechanism, token reduction metrics.
- [Anthropic Engineering: Effective Context Engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) -- Official Anthropic perspective on context engineering principles.
- [Anthropic Engineering: Advanced Tool Use](https://www.anthropic.com/engineering/advanced-tool-use) -- Tool Search accuracy improvements data.

### Performance Data
- CLAUDE.md files under 200 lines: >92% rule application rate
- CLAUDE.md files over 400 lines: ~71% rule application rate
- MCP Tool Search: 85-95% context reduction with 50+ tools
- Skill metadata scan: ~100 tokens per skill description
- Full skill load: <5,000 tokens target (500-line max recommendation)
