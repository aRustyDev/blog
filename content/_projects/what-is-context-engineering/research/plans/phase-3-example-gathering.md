---
id: "a1b2c3d4-3333-4ccc-d333-3333phase3003"
type: research-plan
status: draft
parent: ./context-engineering-taxonomy.md
created: "2026-03-20T00:00:00Z"
updated: "2026-03-20T00:00:00Z"
---

# Phase 3: Example Gathering

**Objective**: Collect concrete, documented examples from the blog-workflow plugin and this blog's codebase for each component type at each pipeline stage. These examples ground the abstract taxonomy in real, working code.

**Duration**: 1-2 hours
**Addresses**: Secondary question 6
**Prerequisite**: Phase 2 (lifecycle mapping provides the framework for categorizing examples)

## Search-Term Matrix

### Codebase Analysis (this repo + blog-workflow plugin)

| Search Pattern | Target | Tool |
|---------------|--------|------|
| `context/plugins/blog-workflow/` structure | Plugin anatomy | Glob + LS |
| `skills/*.md` in blog-workflow | Skill definitions | Glob + Read |
| `.claude/rules/*.md` | Rule files | Glob + Read |
| `.claude/hooks/` | Hook definitions | Glob + Read |
| `content/_projects/*/index.md` | Memory/relationship data | Read |
| MCP server configuration | Tool definitions | Read |
| `.claude/templates/` | Reference documents | Glob |
| `CLAUDE.md` | Top-level context document | Read |

### External Plugin Examples

| Search Query | Target | Expected Yield |
|-------------|--------|---------------|
| claude code plugin examples github | Other plugins for comparison | Medium |
| "superpowers" claude code plugin | Reference plugin architecture | High |
| claude code marketplace plugins | Available plugin patterns | Medium |

### Documentation Cross-Reference

| Search Query | Target | Expected Yield |
|-------------|--------|---------------|
| claude code skill format | Official skill specification | High |
| claude code hook types | Supported hook events | High |
| claude code rule syntax | Rule file format | High |

## Example Matrix

For each component type, document:

| Component Type | Example Name | Source Location | Pipeline Stage | How It Works | When It Enters Context |
|---------------|-------------|-----------------|---------------|-------------|----------------------|
| **Skill** | blog-workflow:brainstorm | Plugin skills/ | On-demand | User invokes `/brainstorm`, skill markdown loaded into context | User command |
| **Skill** | blog-workflow:review | Plugin skills/ | On-demand | User invokes `/review`, review checklist applied | User command |
| **Rule** | cf-wrangler.md | .claude/rules/ | Session-start | Loaded automatically, constrains Cloudflare config behavior | Always active |
| **Hook** | pre-commit (beads) | .beads/hooks/ | Event-triggered | Runs `bd hooks run pre-commit` on git commit | Git event |
| **Memory** | Project relationships | content/_projects/*/index.md | Build-time + on-demand | Related Projects table, tags, status — persisted across sessions | Graph build + query |
| **Tool** | crawl4ai MCP | MCP server config | On-demand | Model decides to fetch web content, MCP server handles request | Model decision |
| **Reference** | ADR documents | docs/src/adrs/ | On-demand | Loaded when relevant to current discussion | Agent/user reference |
| **Reference** | Templates | .claude/templates/ | On-demand | Loaded when creating content matching a template pattern | Skill/agent invocation |

## Per-Example Documentation Template

For each example, capture:

```markdown
### [Component Type]: [Name]

**Source**: `path/to/definition`
**Pipeline Stage**: build-time | session-start | on-demand | event-triggered
**Trigger**: What causes this to load/activate

**Definition** (how it's written):
- File format, frontmatter structure, key sections

**Loading** (how Claude Code discovers it):
- Discovery mechanism, registration path

**Activation** (when it enters context):
- Trigger event, conditions, priority

**Context Impact** (what it adds to the context window):
- Approximate token count, what information is injected

**Example Output** (what the component produces):
- Concrete result when this component activates
```

## Deliverables

1. **Example Table** — completed matrix above with all 8+ examples documented
2. **Per-Example Documentation** — detailed writeup for at least 3 key examples (1 skill, 1 rule, 1 hook)
3. **Pipeline Stage Coverage** — verification that all 4 pipeline stages have at least 1 example
4. **Cross-Platform Comparison** — brief notes on how other tools (Cursor, Copilot) handle equivalent concepts

## Quality Criteria

- [ ] At least 8 examples documented (2+ per pipeline stage)
- [ ] At least 3 examples with full detailed writeup
- [ ] All 6 component types represented
- [ ] All 4 pipeline stages have examples
- [ ] Source locations verified (files exist, code is accurate)
