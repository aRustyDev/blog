# Phase 3: Cross-Platform Context Engineering Comparison

_Researched: 2026-03-24. Sources: web search across official docs, changelogs, and community guides._

## Executive Summary

All four major AI coding tools (Claude Code, Cursor, GitHub Copilot, Windsurf) have converged on remarkably similar context component architectures by early 2026. Each implements some version of persistent rules, lifecycle hooks, memory persistence, tool extensibility (MCP), reusable skill/prompt templates, and reference/context injection. The key differentiators are in **where** each tool runs (terminal vs. IDE vs. cloud), **how** context is assembled (full-read vs. embedding retrieval vs. sliding window), and **maturity** of each component.

---

## 1. Master Comparison Table

| Component Type | Claude Code | Cursor | GitHub Copilot | Windsurf |
|---------------|------------|--------|----------------|----------|
| **Skills** (reusable prompt templates) | `.claude/skills/<name>/SKILL.md` invoked via `/skill-name`; supports autonomous invocation | Deprecated Notepads (Oct 2025); now use `.cursor/rules/*.mdc` with manual `@`-mention or alwaysApply | `.github/prompts/<name>.prompt.md` invoked via `/promptname` in chat | `.windsurf/workflows/` invoked via slash commands; also supports Agent Skills spec |
| **Rules** (persistent instructions) | `.claude/rules/*.md` with glob frontmatter + `CLAUDE.md` hierarchy | `.cursor/rules/*.mdc` with `globs`, `description`, `alwaysApply` frontmatter (legacy: `.cursorrules`) | `.github/copilot-instructions.md` (global) + `.github/instructions/*.instructions.md` (glob-scoped via `applyTo`) + `AGENTS.md` (directory-scoped) | `.windsurfrules` (project root) + `global_rules.md` (~/.codeium/windsurf/memories/) + `AGENTS.md` (directory-scoped) |
| **Hooks** (lifecycle event handlers) | `settings.json` hooks; 21 lifecycle events (PreToolUse, PostToolUse, Notification, Stop, SubagentStop, etc.); 4 handler types; can approve/deny tool calls | `.cursor/hooks.json`; 6 events (beforeSubmitPrompt, beforeShellExecution, beforeMCPExecution, beforeReadFile, afterFileEdit, stop); JSON config + stdin/stdout | `.github/hooks/*.json`; 6 events (preToolUse, postToolUse, etc.); can approve/deny/ask on tool calls; shared by CLI + Coding Agent | No native hook system; relies on MCP tools + rules for workflow control |
| **Memory** (cross-session persistence) | CLAUDE.md + auto-memory in `~/.claude/` | "Generate Memories" setting; community Memory Bank pattern via rules + markdown files | Copilot Memory (repo-scoped, validated against codebase); cross-session since v0.0.412 CLI | Auto-generated Cascade Memories stored in `~/.codeium/windsurf/memories/`; workspace-scoped; learns patterns over ~48 hours |
| **Tools** (external integrations) | MCP servers (stdio, SSE, streamable HTTP); configured in settings.json | MCP servers; one-click install; 40-tool cap; resources support since v1.6 (Sep 2025) | MCP servers (replaced deprecated GitHub App extensions Nov 2025); GitHub MCP Registry; built-in GitHub MCP server in CLI | MCP servers (stdio, streamable HTTP, SSE + OAuth); 100-tool cap; per-tool enable/disable |
| **References** (explicit context injection) | `@file`, `@url`, inline file reads; skills can reference templates/scripts/docs | `@file`, `@codebase`, `@Docs`, `@web`; embedding-based retrieval | Markdown links in prompt files; `#file` references in chat; workspace indexing | Open files (highest weight), codebase retrieval via M-Query, recent actions history |

---

## 2. Claude Code

### 2.1 Architecture

Terminal-native agentic tool. Reads the project directory structure upfront and maintains full context throughout a session. Leverages Claude's 200K-token context window (1M with Opus) to hold large codebases in memory simultaneously.

### 2.2 Rules

- **CLAUDE.md hierarchy**: Enterprise > User (`~/.claude/CLAUDE.md`) > Project root > `.claude/rules/*.md`
- **Glob-gated rules**: Each rule file uses YAML frontmatter with `globs` array; activates only when matching files are in context
- **Always-apply rules**: Rules without globs or with explicit always-apply flag inject into every conversation
- **No explicit priority field**: Non-conflicting rules recommended; all matching rules apply simultaneously

### 2.3 Skills

- **Location**: `.claude/skills/<name>/SKILL.md` (project) or `~/.claude/skills/` (personal)
- **Structure**: YAML frontmatter (`name`, `description`) + markdown body with instructions
- **Invocation**: Slash commands (`/skill-name`) or autonomous invocation by Claude when relevant
- **Bundling**: Directory can include templates, example outputs, scripts, reference docs
- **Legacy**: `.claude/commands/` (single-file format) still works but deprecated

### 2.4 Hooks

- **Events (21+)**: PreToolUse, PostToolUse, Notification, Stop, SubagentStop, and more as of March 2026
- **Handler types (4)**: command, prompt, agent, and JSON structured output
- **Control flow**: PreToolUse can approve (exit 0), deny (exit 2), or modify tool calls
- **Configuration**: `settings.json` at project (`.claude/settings.json`) or global (`~/.claude/settings.json`) level
- **Matcher patterns**: Filter hooks by tool name (e.g., only fire on `Write` or `Bash`)

### 2.5 Memory

- **Auto-memory**: Claude can store learned facts in `~/.claude/` for future sessions
- **CLAUDE.md**: Manual, version-controlled memory shared with team
- **No explicit forgetting mechanism** documented; relies on recency and relevance

### 2.6 Tools

- **MCP servers**: Full support for stdio, SSE, and streamable HTTP transports
- **Configuration**: `settings.json` with `mcpServers` object
- **No documented tool cap** (unlike Cursor's 40 or Windsurf's 100)

### 2.7 Context Window Strategy

Full project read on session start. No embedding-based retrieval needed for moderate codebases. For very large projects, relies on the 200K/1M token window plus Claude's ability to navigate files on demand.

**Sources:**
- [Claude Code Skills docs](https://code.claude.com/docs/en/skills)
- [Claude Code Hooks guide](https://code.claude.com/docs/en/hooks-guide)
- [Claude Code Hooks: all 12+ lifecycle events](https://www.pixelmojo.io/blogs/claude-code-hooks-production-quality-ci-cd-patterns)

---

## 3. Cursor

### 3.1 Architecture

IDE-native (VS Code fork). Uses embedding-based retrieval to surface relevant code chunks from across the project. Supports multiple AI models (Claude, GPT-4, Gemini, etc.).

### 3.2 Rules

- **Modern format**: `.cursor/rules/*.mdc` files with frontmatter:
  ```yaml
  ---
  description: "When to apply this rule"
  globs: ["**/*.ts", "**/*.tsx"]
  alwaysApply: false
  ---
  ```
- **Precedence** (highest to lowest): Team Rules > Project Rules (`.cursor/rules/`) > User Rules (Settings > Rules) > Legacy `.cursorrules`
- **Legacy**: `.cursorrules` at project root (plain text, deprecated but still works)
- **MDC format**: Markdown Cursor files supporting frontmatter metadata

### 3.3 Skills / Reusable Prompts

- **Notepads (deprecated Oct 2025)**: Were Markdown pads bundling prompts, docs, file references; accessible via `@NotepadName`
- **Current approach**: Use `.cursor/rules/*.mdc` with `alwaysApply: false` as reference documents, invoked via `@`-mention
- **No native slash-command invocation** equivalent to Claude Code skills or Copilot prompt files

### 3.4 Hooks

- **Introduced**: Cursor v1.7 (October 2025), beta feature
- **Events (6)**: `beforeSubmitPrompt`, `beforeShellExecution`, `beforeMCPExecution`, `beforeReadFile`, `afterFileEdit`, `stop`
- **Configuration**: JSON in `.cursor/hooks.json`
- **Execution model**: Each hook runs as a standalone process; receives structured input over stdin, returns output to stdout
- **Limitations**: Cannot approve/deny tool calls (unlike Claude Code and Copilot); primarily for side effects (formatting, logging, observing)

### 3.5 Memory

- **Generate Memories**: Setting that lets Cursor remember preferences across sessions
- **Community pattern**: "Memory Bank" using `.cursor/rules/` + markdown files for persistent project context (not an official feature)
- **No auto-generated memory** comparable to Windsurf's Cascade Memories

### 3.6 Tools

- **MCP support**: Full integration with one-click "Add to Cursor" buttons on MCP server docs
- **Tool cap**: 40 tools maximum across all connected MCP servers
- **Resources**: Supported since Cursor v1.6 (September 2025)
- **Security**: Multiple CVEs published in 2025; fixed in Cursor v2.0

### 3.7 References / Context Injection

- **@-mentions**: `@file`, `@codebase` (embedding search), `@Docs` (documentation), `@web` (web search)
- **Codebase indexing**: Creates semantic embeddings of entire codebase; powers `@codebase` queries
- **Agent Mode**: Automatically retrieves relevant files using custom retrieval models without manual `@` input

### 3.8 Context Window Strategy

Embedding-based retrieval (RAG). Does NOT read every file -- retrieves the most relevant chunks via semantic search. Composer mode assembles context from retrieved snippets + explicit `@`-mentions + rules. Context window size depends on the selected model.

**Sources:**
- [Cursor Rules docs](https://docs.cursor.com/context/rules)
- [Cursor Hooks docs](https://cursor.com/docs/hooks)
- [Cursor MCP docs](https://docs.cursor.com/context/model-context-protocol)
- [Cursor Rules Guide 2026](https://www.agentrulegen.com/guides/cursor-rules-guide)
- [Cursor Hooks deep dive (GitButler)](https://blog.gitbutler.com/cursor-hooks-deep-dive)
- [Cursor Hooks InfoQ](https://www.infoq.com/news/2025/10/cursor-hooks/)

---

## 4. GitHub Copilot

### 4.1 Architecture

Plugin/extension approach spanning VS Code, JetBrains, CLI, and cloud (Coding Agent). Moving from proprietary extension model to open MCP standard. Three distinct surfaces: IDE chat, CLI agent, and cloud Coding Agent.

### 4.2 Rules / Instructions

- **Repository-wide**: `.github/copilot-instructions.md` -- Markdown, auto-injected into all requests
- **Path-specific**: `.github/instructions/<name>.instructions.md` with `applyTo` glob frontmatter
  ```yaml
  ---
  applyTo: "**/tests/*.spec.ts"
  ---
  ```
- **Directory-scoped**: `AGENTS.md` files at any directory level; nearest file in tree takes precedence (since August 2025)
- **Agent-specific control**: `excludeAgent` property to control which Copilot agents use a given instructions file
- **Cross-tool compatibility**: Also reads `CLAUDE.md` and `GEMINI.md` files

### 4.3 Skills / Prompt Files

- **Location**: `.github/prompts/<name>.prompt.md`
- **Invocation**: `/promptname` in chat (similar to Claude Code slash commands)
- **Structure**: Optional YAML frontmatter + Markdown body with task-specific context and guidelines
- **References**: Can reference workspace files via relative Markdown links
- **Availability**: VS Code, Visual Studio, JetBrains (public preview)
- **CLI Plugins**: Can bundle MCP servers, agents, skills, and hooks; installable via `/plugin install owner/repo`

### 4.4 Hooks

- **Location**: `.github/hooks/<name>.json`
- **Events (6)**: `preToolUse`, `postToolUse`, and 4 others covering the full agent lifecycle
- **Control flow**: `preToolUse` can return `permissionDecision` of `allow`, `deny`, or `ask` (interactive prompt)
- **Shared**: Same hooks work for both Copilot CLI and cloud Coding Agent
- **Scope**: `postToolUse` and other non-pre events are side-effect only (logging, notifications, metrics)

### 4.5 Memory

- **Copilot Memory**: Repository-scoped, validated against current codebase before being applied; stale context is never used
- **Cross-session**: CLI v0.0.412+ remembers past work across sessions
- **Default on**: Copilot Memory on by default for Pro and Pro+ users (March 2026 public preview)
- **Strict scoping**: Memories are scoped to a single repository

### 4.6 Tools

- **MCP servers**: Full support; replaced deprecated GitHub App extensions (sunset November 2025)
- **GitHub MCP Registry**: Curated list of MCP servers; one-click add to VS Code
- **Built-in GitHub MCP server**: Ships with CLI; enables repo search, issue management, PR creation from terminal
- **No documented tool cap**

### 4.7 Context Window Strategy

IDE: Sliding context window of ~8K-16K tokens depending on model; includes current file, adjacent files, recently opened files, workspace context. CLI: Automatic compaction at 95% token capacity; creates recovery checkpoints; preserves tool call sequences and reasoning summaries through compaction. Struggles with large-scale refactors spanning 20+ files in IDE mode.

**Sources:**
- [Copilot custom instructions](https://docs.github.com/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot)
- [Copilot prompt files (VS Code)](https://code.visualstudio.com/docs/copilot/customization/prompt-files)
- [Copilot MCP integration](https://docs.github.com/copilot/customizing-copilot/using-model-context-protocol/extending-copilot-chat-with-mcp)
- [Copilot hooks configuration](https://docs.github.com/en/copilot/reference/hooks-configuration)
- [Copilot AGENTS.md support](https://github.blog/changelog/2025-08-28-copilot-coding-agent-now-supports-agents-md-custom-instructions/)
- [Copilot Memory default on](https://github.blog/changelog/2026-03-04-copilot-memory-now-on-by-default-for-pro-and-pro-users-in-public-preview/)
- [Copilot CLI GA](https://github.blog/changelog/2026-02-25-github-copilot-cli-is-now-generally-available/)
- [Copilot CLI hooks guide](https://smartscope.blog/en/generative-ai/github-copilot/github-copilot-hooks-guide/)

---

## 5. Windsurf (Codeium)

### 5.1 Architecture

AI-native IDE (VS Code fork) centered on "Cascade" -- an agentic chat/write system. Emphasizes a "Flow" paradigm with deep context awareness across the session. Supports Chat mode and Agent (Write) mode.

### 5.2 Rules

- **Project-level**: `.windsurfrules` (or `.windsurfrules.md`) at project root
- **Global**: `~/.codeium/windsurf/memories/global_rules.md`
- **Directory-scoped**: `AGENTS.md` files for directory-specific instructions
- **Precedence**: System rules merged with workspace and global rules; user-defined rules take precedence
- **Known issue**: `.windsurfrules` re-reads on workspace open only (no hot-reload)

### 5.3 Skills / Workflows

- **Workflows**: `.windsurf/workflows/` directory; reusable structured prompts invoked via slash commands
- **Agent Skills**: Based on open-source Agent Skills spec; automatically invoked when prompt aligns with skill description/triggers
- **Slash commands**: Custom workflows (e.g., `/0-task`, `/1-discovery`, `/2-design`, `/3-implement`, `/4-clean`)
- **Bundling**: Skills can include reference scripts, templates, checklists, and supporting files

### 5.4 Hooks

- **No native hook system** as of March 2026
- **Workaround**: MCP tools + rules can approximate some hook-like behavior
- **Gap**: Cannot intercept or approve/deny tool calls; no lifecycle event model

### 5.5 Memory

- **Auto-generated Cascade Memories**: Stored in `~/.codeium/windsurf/memories/`; workspace-scoped; not committed to repo
- **Learning curve**: Takes ~48 hours of use to learn architecture patterns, coding conventions, project structure
- **Retrieval**: Cascade retrieves memories when it believes they are relevant (semantic matching)
- **Recommendation**: For reliable reuse, write as a Rule or add to `AGENTS.md` rather than relying on auto-generated memories

### 5.6 Tools

- **MCP support**: Stdio, streamable HTTP, SSE transports; OAuth support for all transport types
- **Configuration**: `~/.codeium/windsurf/mcp_config.json`
- **Tool cap**: 100 tools maximum
- **Granular control**: Can enable/disable individual tools within a server (not all-or-nothing)
- **Security concern**: Reported lack of approval prompts for consequential tool invocations; individual tool disable is the mitigation

### 5.7 References / Context Injection

No explicit `@`-mention system comparable to Cursor. Instead, context is assembled automatically via a pipeline:

1. Load global then project rules
2. Load relevant memories from previous sessions
3. Read open files (active file gets highest weight; other open tabs included)
4. Run codebase retrieval via M-Query (semantic snippet retrieval)
5. Read recent actions (file edits, terminal commands, navigation history)
6. Assemble, weight, and trim to fit context window

### 5.8 Context Window Strategy

Automatic multi-source assembly pipeline. Semantic retrieval via M-Query. Prioritizes active file and recent actions. Trims to fit context window automatically. No documented compaction or checkpoint mechanism.

**Sources:**
- [Windsurf Cascade Memories docs](https://docs.windsurf.com/windsurf/cascade/memories)
- [Windsurf Cascade MCP docs](https://docs.windsurf.com/windsurf/cascade/mcp)
- [Windsurf Cascade Skills docs](https://docs.windsurf.com/windsurf/cascade/skills)
- [Windsurf Flow context engine](https://markaicode.com/windsurf-flow-context-engine/)
- [Windsurf context management strategies](https://iceberglakehouse.com/posts/2026-03-context-windsurf/)
- [Windsurf rules & workflows (Paul Duvall)](https://www.paulmduvall.com/using-windsurf-rules-workflows-and-memories/)
- [Windsurf memory & rules deep dive](https://mer.vin/2025/12/windsurf-memory-rules-deep-dive/)

---

## 6. Cross-Cutting Analysis

### 6.1 Context Window Management Strategies

| Tool | Strategy | Window Size | Overflow Handling |
|------|----------|-------------|-------------------|
| Claude Code | Full project read; direct file access on demand | 200K (Sonnet) / 1M (Opus) | Relies on large window; subagent delegation |
| Cursor | Embedding-based retrieval (RAG); `@codebase` semantic search | Model-dependent (varies) | Retrieves chunks, not full files; trimming to fit |
| GitHub Copilot (IDE) | Sliding window with adjacent files | ~8K-16K tokens | Drops older context silently |
| GitHub Copilot (CLI) | Full session; auto-compaction at 95% | Model-dependent | Checkpoints + reasoning summaries preserved |
| Windsurf | Multi-source assembly pipeline; M-Query retrieval | Model-dependent | Automatic weighting and trimming |

### 6.2 Progressive Disclosure / Lazy Loading

| Tool | Mechanism |
|------|-----------|
| Claude Code | Skills loaded on-demand (slash command or autonomous); rules loaded only when glob matches; references loaded from SKILL.md when invoked |
| Cursor | Rules with `alwaysApply: false` loaded only when globs match or `@`-mentioned; `@codebase` retrieves on demand |
| GitHub Copilot | `applyTo` globs gate instruction files; prompt files loaded only on `/` invocation; AGENTS.md loaded based on working directory |
| Windsurf | Rules always loaded; memories retrieved by relevance; workflows loaded on slash-command invocation |

### 6.3 Priority / Precedence Rules

| Tool | Precedence (highest to lowest) |
|------|-------------------------------|
| Claude Code | Enterprise > User CLAUDE.md > Project CLAUDE.md > .claude/rules/*.md (all matching rules apply; no explicit conflict resolution) |
| Cursor | Team Rules > Project Rules (.cursor/rules/) > User Rules (Settings) > Legacy .cursorrules |
| GitHub Copilot | copilot-instructions.md (repo-wide) + path-specific .instructions.md (applyTo) + AGENTS.md (nearest in tree wins); `excludeAgent` for per-agent control |
| Windsurf | System rules (base) + global_rules.md + project .windsurfrules + AGENTS.md; user-defined rules take precedence over system |

### 6.4 Plugin / Extension Architecture

| Tool | Architecture | Ecosystem |
|------|-------------|-----------|
| Claude Code | MCP servers + Skills (`.claude/skills/`) + Hooks | Growing; `awesome-claude-code` community repo; Agent SDK for programmatic use |
| Cursor | MCP servers (one-click install) + Marketplace | 5,000+ MCP servers; cursor.directory; Cursor Marketplace |
| GitHub Copilot | MCP servers (replaced GitHub App extensions) + CLI plugins (`/plugin install`) + GitHub MCP Registry | GitHub-native ecosystem; `awesome-copilot` repo; cross-agent compatibility |
| Windsurf | MCP servers + Agent Skills spec + Workflows | Supports same MCP ecosystem; open Agent Skills standard |

### 6.5 Convergence Patterns

Several patterns have emerged as de facto standards across all tools:

1. **MCP as universal tool protocol**: All four tools now support MCP. Anthropic donated MCP to the Linux Foundation's Agentic AI Foundation in December 2025, cementing it as the industry standard.

2. **Glob-gated rules**: Every tool supports file-pattern-based rule activation (Cursor `globs`, Copilot `applyTo`, Claude Code `globs`, Windsurf directory-scoped rules).

3. **AGENTS.md as cross-tool standard**: Both Copilot and Windsurf support AGENTS.md. Copilot also reads CLAUDE.md and GEMINI.md, suggesting a trend toward interoperable instruction formats.

4. **Lifecycle hooks**: Claude Code (21 events), Cursor (6 events), and Copilot (6 events) all implement pre/post tool-call hooks. Windsurf is the outlier with no native hook system.

5. **Auto-generated memory**: Windsurf, Copilot, and Cursor all offer some form of cross-session memory persistence. Claude Code has auto-memory plus the manual CLAUDE.md approach.

6. **Slash-command invocation for reusable prompts**: Claude Code skills, Copilot prompt files, and Windsurf workflows all use `/name` invocation. Cursor lacks this (deprecated Notepads, now uses `@`-mention for rules).

### 6.6 Key Differentiators

| Differentiator | Leader | Why |
|---------------|--------|-----|
| Hook maturity | Claude Code | 21 events, 4 handler types, approve/deny control, async execution |
| Tool ecosystem access | Cursor | One-click MCP install, largest marketplace, but 40-tool cap |
| Memory validation | GitHub Copilot | Memories validated against current codebase; stale context rejected |
| Context assembly transparency | Windsurf | Documented 6-step pipeline; M-Query semantic retrieval |
| Context window size | Claude Code | 200K-1M tokens; full project read without retrieval |
| Cross-tool compatibility | GitHub Copilot | Reads CLAUDE.md, GEMINI.md, AGENTS.md; interoperable by design |
| Granular tool control | Windsurf | Per-tool enable/disable within MCP servers; 100-tool cap |

---

## 7. Implications for Context Engineering Taxonomy

The cross-platform analysis validates the six-component model (Skills, Rules, Hooks, Memory, Tools, References) as a useful taxonomy for context engineering in AI coding assistants. Every major tool implements some version of each component, though with different names, maturity levels, and architectural approaches.

Key observations for the article:

1. **Context engineering is not just prompt engineering.** It encompasses persistent rules, lifecycle automation, cross-session memory, external tool integration, and reusable templates -- a full systems-engineering discipline.

2. **The field is converging rapidly.** MCP adoption, AGENTS.md support, glob-gated rules, and lifecycle hooks are becoming table stakes. Tools that lack any of these components (e.g., Windsurf's missing hooks) face pressure to add them.

3. **Context window strategy is the deepest architectural differentiator.** Claude Code's "read everything" approach vs. Cursor's embedding retrieval vs. Copilot's sliding window represent fundamentally different tradeoffs between comprehensiveness and scalability.

4. **Memory validation is an unsolved problem.** Only Copilot explicitly validates memories against the current codebase to prevent stale context. This is a critical concern for production reliability.

5. **The boundary between "rules" and "skills" is blurring.** Cursor uses rules for both always-on instructions and on-demand reference documents. Copilot's instruction files and prompt files serve overlapping purposes. Clear taxonomic distinctions matter for practitioners.
