# Phase 2: Codebase Lifecycle Analysis

_Analyzed: 2026-03-24. Branch: `feat/brand-cdn-theming`._

## 1. CLAUDE.md Hierarchy

No `CLAUDE.md` file exists in this repository. The project-level slot is vacant.

| Level | File | Status |
|-------|------|--------|
| Enterprise | `~/.claude/CLAUDE.md` or managed config | Not accessible |
| User | `~/.claude/CLAUDE.md` | Not accessible |
| Project | `/private/etc/infra/pub/blog/CLAUDE.md` | **ABSENT** |
| Project rules | `.claude/rules/cf-wrangler.md` | Present (1 file) |
| Project settings | `.claude/settings.json` + `settings.local.json` | Present |

## 2. Rules (.claude/rules/)

One rule file: `cf-wrangler.md`.

**Frontmatter:**
```yaml
globs:
  - "**/wrangler.jsonc"
  - "**/wrangler.toml"
```

**Gating**: Binary — activates only when a matching file is in context. No explicit priority field. When multiple rules match the same file pattern, all matching rules apply simultaneously. Rule conflicts are not handled by explicit priority; non-conflicting rules are the recommended pattern.

**Content**: 114 lines covering Cloudflare Workers static site deployment, Workers Builds integration, custom domains, SSR/hybrid sites, and validation. Constrains Wrangler configuration behavior — e.g., forbids including `npm install` in `build.command`.

**Gap**: `.claude/blog-workflow-review.md` recommends adding `.claude/rules/blog-frontmatter.md` to map plugin output to AstroPaper schema. Not yet created.

## 3. Plugins & Skills

### blog-workflow plugin

**Source**: Externally installed (no files in repo). Version v1.0.6.

**Registration**: 8 skills pre-approved in `.claude/settings.local.json`:
```
Skill(blog-workflow:research-topic)
Skill(blog-workflow:outline-post)
Skill(blog-workflow:draft-post)
Skill(blog-workflow:gather-resources)
Skill(blog-workflow:refine-research-plan)
Skill(blog-workflow:seo-pass)
Skill(blog-workflow:publish-prep)
Skill(blog-workflow:series-plan)
```

**Invocation**: Slash commands — `/blog-workflow:<skill-name>`.

**Workflow order**:
```
research-topic → refine-research-plan → gather-resources → outline-post → draft-post → seo-pass → publish-prep
                                                                                          ↑
                                                                              series-plan (for multi-part)
```

**`enabledPlugins` status**: Empty `{}` in both settings files. Skills authorized via `Skill()` permission format, which bypasses `enabledPlugins`. Distinction: `enabledPlugins` likely controls plugin-wide context injection (global rules, auto-context), while `Skill()` permissions pre-approve individual skill invocations.

### superpowers plugin

Not installed in this repo. Referenced only in Phase 3 research plan as a comparison architecture. Its skills are loaded via the system-level plugin cache at `~/.claude/plugins/cache/`.

## 4. Hooks

### Claude Code hooks

**None configured.** Neither `settings.json` nor `settings.local.json` contains a `hooks` key. `.claude/hooks/todo.md` is a placeholder only:
```markdown
# Hooks
- [ ] Highlighting AI Signals programmatically
```

### system-reminder injections

`<system-reminder>` tags are injected by the Claude Code runtime at inference boundaries — not project-configurable. Observed injections include:
- MCP server instructions (context7, crawl4ai usage notes)
- Tool availability announcements (deferred tools list)
- File modification notifications
- Session start hook context
- Task reminder nudges

### Beads Git hooks

Five Git lifecycle hooks in `.beads/hooks/` — thin shims delegating to `bd hooks run <hook-name>`:

| Hook | Purpose |
|------|---------|
| `pre-commit` | Exports issue state before commit |
| `prepare-commit-msg` | Injects issue metadata into commit messages |
| `pre-push` | Syncs issue state before push |
| `post-checkout` | Imports issue state on branch switch |
| `post-merge` | Merges Dolt issue state after git merge |

**Important**: These are Git hooks, not Claude Code context hooks. They affect development workflow but do not inject context into Claude conversations.

## 5. Memory System

**Not initialized.** `.claude/projects/` directory does not exist. No `MEMORY.md` index. No memory files.

Expected structure (from taxonomy + system prompt analysis):
```
.claude/projects/<project-id>/memory/
├── MEMORY.md           # Index (pointer file, max 200 lines)
├── user_role.md        # type: user
├── feedback_testing.md # type: feedback
├── project_goals.md    # type: project
└── ref_linear.md       # type: reference
```

Memory types: `user`, `feedback`, `project`, `reference`. Each has frontmatter with `name`, `description`, `type`.

## 6. MCP Servers

Server registration is at **user level** (outside repo). Project-level settings only pre-approve tool invocations.

**Reconstructed registry** (from permission strings + system-reminders):

| Server | Tool Namespace | Capability |
|--------|---------------|------------|
| `firecrawl` | `mcp__firecrawl__*` | Web scraping and search |
| `cloudflare-docs` | `mcp__cloudflare-docs__*` | Cloudflare documentation search |
| `crawl4ai` | `mcp__crawl4ai__*` | JS-rendered web crawling, structured extraction |
| `semantic-scholar` | `mcp__semantic-scholar__*` | Academic paper search, details, references |
| `arxiv` | `mcp__arxiv__*` | ArXiv preprint search |
| `context7` | (system-reminder only) | Library documentation lookup |
| `astro-docs` | `mcp__astro-docs__*` | Astro documentation search |
| `playwright` | `mcp__plugin_playwright_playwright__*` | Browser automation |
| `mermaid-chart` | `mcp__claude_ai_Mermaid_Chart__*` | Diagram rendering |
| `notion` | `mcp__claude_ai_Notion__*` | Notion integration |

**Two-layer authorization**: Server must be registered (user-level) AND tool invocation must be permitted (project-level `settings.local.json`).

## 7. Templates & References

### Templates: `.claude/templates/outlines/`

18 post outline templates covering diverse personas:

| Template | Type | Length | Persona |
|----------|------|--------|---------|
| `research-eng.md` | Empirical Research | 2500-4000 | Research Engineer |
| `tutorial.md` | Tutorial / How-To | 1500-3000 | Instructor |
| `dev-blog.md` | Development Blog | 1000-2000 | Developer |
| `reverse-eng.md` | Reverse Engineering | 2500-4000 | Investigator |
| `staff-eng.md` | Staff Eng Perspective | 2000-3000 | Staff Engineer |
| `principal-eng.md` | Principal Eng | 2500-4000 | Principal Engineer |
| `debug-error.md` | Debugging Journey | 1500-2500 | Debugger |
| `literature-review.md` | Literature Review | 3000-5000 | Systematic Reviewer |
| `simulation-study.md` | Simulation Study | 2500-3500 | Researcher |
| `thesis-blog.md` | Academic Research | 2500-4000 | Researcher |
| + 8 hardware-focused | EE, VLSI, ISA, etc. | — | — |

**Loading**: On-demand only (explicit `Read` tool). Not auto-loaded by any mechanism.

### Other reference files

- `.claude/future.md` — Design backlog (themes, features, color philosophy). On-demand.
- `.claude/blog-workflow-review.md` — Plugin compatibility review. On-demand.
- `.claude/plans/` — Execution plans and review findings. On-demand.

## 8. Loading Order Evidence

### Reconstructed loading sequence

**Stage 1 — Build/install time** (before any Claude session):
- Beads git hooks installed → `.git/hooks/` shims → `.beads/hooks/`
- blog-workflow plugin installed externally via Claude Code plugin system
- MCP servers registered at user level (`~/.claude/settings.json`)

**Stage 2 — Session start**:
- Enterprise CLAUDE.md loaded (if exists)
- User CLAUDE.md loaded (if exists)
- Project CLAUDE.md: **absent** → skipped
- Rule discovery: `.claude/rules/cf-wrangler.md` found → glob gate evaluated → **typically inactive** for non-Wrangler sessions
- `settings.local.json` permissions loaded: 113 pre-approved entries
- MCP capability negotiation: each server declares available tools
- Auto-memory recall: **no-op** (no memory files exist)
- System prompt assembled from all loaded components

**Stage 3 — On-demand** (during conversation):
- Skills activated by slash command: `/blog-workflow:<skill-name>`
- MCP tools called by model decision: `mcp__arxiv__search_papers`, etc.
- Template files read explicitly via `Read` tool
- Plan and reference documents read on demand

**Stage 4 — Event-triggered**:
- Claude Code hooks: **none configured**
- `system-reminder` injections at inference boundaries (platform-level, not project-configurable)
- Beads git hooks on git events (not Claude context)

### Key architectural observation

This repo uses `.claude/rules/` + `Skill()` permissions as primary project-level context mechanisms, rather than CLAUDE.md. The single glob-gated rule + 8 skill permissions + 8 MCP tool permissions form the project's "context configuration." The absence of hooks, memory, and CLAUDE.md means this is a lightweight Claude Code setup — context shaping is delegated to externally installed plugins and user-level MCP servers.
