---
id: "a1b2c3d4-3333-4ccc-d333-3333phase3003"
type: research-plan
status: complete
parent: ./context-engineering-taxonomy.md
created: "2026-03-20T00:00:00Z"
updated: "2026-03-24T00:00:00Z"
---

# Phase 3: Example Gathering

**Objective**: Collect concrete, documented examples from the blog-workflow plugin, superpowers plugin, and this blog's codebase for each component type at each pipeline stage. Ground the abstract taxonomy in real, working code. Include examples of production patterns, security mechanisms, and SE pattern parallels identified in Phase 1.

**Duration**: 1-2 hours
**Addresses**: Secondary question 6
**Prerequisites**: Phase 2 (lifecycle mapping provides the framework for categorizing examples)

## Phase 1 Inputs

Key sources informing example selection:

| Source | Example Pattern |
|--------|----------------|
| BIB-032 SGD-MCP Convergence | Schema design principles for tool definitions |
| BIB-034 MCP Tool Description Smells | Tool description quality rubric — 97.1% have defects |
| BIB-035 MCP-Zero | Active tool discovery vs passive injection pattern |
| BIB-036 SagaLLM | Transaction/compensation patterns for multi-agent coordination |
| BIB-038 Context-Folding | Sub-trajectory branching with outcome summaries |
| BIB-043 ToolRegistry | Adapter/registry SE patterns for tool integration |
| BIB-044 OpenAI Agents SDK | Handoff-as-tool pattern |
| BIB-069 OWASP LLM Top 10 | Security risks to illustrate in context pipeline |
| BIB-074 GuardRail Pipeline | Modular guardrail pipeline as middleware example |

## Search-Term Matrix

### Codebase Analysis (this repo + installed plugins)

| Search Pattern | Target | Tool |
|---------------|--------|------|
| `context/plugins/blog-workflow/` structure | Plugin anatomy | Glob + LS |
| `skills/*.md` in blog-workflow | Skill definitions | Glob + Read |
| `context/plugins/superpowers/` structure | Reference plugin architecture | Glob + LS |
| `skills/` in superpowers | Superpowers skill patterns | Glob + Read |
| `.claude/rules/*.md` | Rule files (glob-matched) | Glob + Read |
| `.claude/settings.json` hooks section | Hook definitions | Read |
| `content/_projects/*/index.md` | Memory/relationship data | Read |
| MCP server configuration in settings | Tool definitions | Read |
| `.claude/templates/` | Reference/template documents | Glob |
| `CLAUDE.md` | Top-level context document | Read |
| `.claude/projects/*/memory/` | Auto-memory files | Glob + Read |

### External Plugin Examples

| Search Query | Target | Expected Yield |
|-------------|--------|---------------|
| claude code plugin examples github 2025 | Other plugins for comparison | Medium |
| "superpowers" claude code plugin architecture | Reference plugin patterns | High |
| claude code marketplace skills | Available skill patterns | Medium |

### Documentation Cross-Reference

| Search Query | Target | Expected Yield |
|-------------|--------|---------------|
| claude code skill format specification | Official skill spec | High |
| claude code hook types events | Supported hook event types | High |
| claude code rule syntax glob | Rule file format and glob matching | High |
| claude code MCP server configuration | MCP setup reference | High |

## Example Matrix

| Component Type | Example Name | Source Location | Pipeline Stage | SE Pattern | Security Concern |
|---------------|-------------|-----------------|---------------|-----------|-----------------|
| **Skill** | blog-workflow:brainstorm | Plugin skills/ | On-demand | Command pattern | Skill content injection |
| **Skill** | superpowers:brainstorming | Plugin skills/ | On-demand | Strategy pattern | — |
| **Skill** | blog-workflow:research:spec:draft | Plugin skills/ | On-demand | Template method | — |
| **Rule** | cf-wrangler.md | .claude/rules/ | Session-start | Middleware filter | Rule conflict/override |
| **Rule** | Glob-matched rule (.claude/rules/) | .claude/rules/ | Session-start | Pattern matching | — |
| **Hook** | pre-tool-use / post-tool-use | .claude/settings.json | Event-triggered | Observer pattern | Hook as guardrail |
| **Hook** | notification hook | .claude/settings.json | Event-triggered | Event listener | — |
| **Memory** | Auto-memory files | .claude/projects/*/memory/ | Session-start + on-demand | Repository pattern | Memory persistence |
| **Memory** | Project relationships | content/_projects/*/index.md | Build-time + on-demand | Graph/entity model | — |
| **Tool** | arxiv MCP server | MCP server config | On-demand | Service proxy | Tool schema injection |
| **Tool** | semantic-scholar MCP | MCP server config | On-demand | Adapter pattern | Rate limiting |
| **Tool** | crawl4ai MCP | MCP server config | On-demand | Gateway pattern | URL validation |
| **Reference** | ADR documents | docs/src/adrs/ | On-demand | Documentation pattern | — |
| **Reference** | Templates | .claude/templates/ | On-demand | Template pattern | — |
| **Reference** | system-reminder injections | (runtime) | Event-triggered | Interceptor pattern | Context manipulation |

## Per-Example Documentation Template

For each example, capture:

```markdown
### [Component Type]: [Name]

**Source**: `path/to/definition`
**Pipeline Stage**: build-time | session-start | on-demand | event-triggered
**Trigger**: What causes this to load/activate
**SE Pattern**: Which established pattern this maps to

**Definition** (how it's written):
- File format, frontmatter structure, key sections

**Loading** (how Claude Code discovers it):
- Discovery mechanism, registration path

**Activation** (when it enters context):
- Trigger event, conditions, priority

**Context Impact** (what it adds to the context window):
- Approximate token count, what information is injected

**Production Concerns**:
- Token cost, cache impact, latency implications

**Security Considerations**:
- Trust boundaries, injection risks, isolation

**Example Output** (what the component produces):
- Concrete result when this component activates
```

## Deliverables

1. **Example Table** — completed matrix above with all 15+ examples documented
2. **Per-Example Documentation** — detailed writeup for at least 5 key examples (1 skill, 1 rule, 1 hook, 1 tool, 1 memory)
3. **Pipeline Stage Coverage** — verification that all 4 pipeline stages have at least 2 examples
4. **SE Pattern Mapping** — each example annotated with its SE pattern parallel
5. **Cross-Platform Comparison** — brief notes on how Cursor, Copilot, Windsurf handle equivalent concepts

## Quality Criteria

- [ ] At least 15 examples documented (3+ per pipeline stage)
- [ ] At least 5 examples with full detailed writeup
- [ ] All 6 component types represented with 2+ examples each
- [ ] All 4 pipeline stages have examples
- [ ] Each example annotated with SE pattern parallel
- [ ] Production concerns noted for at least 3 examples
- [ ] Security considerations noted for at least 2 examples
- [ ] Source locations verified (files exist, code is accurate)
- [ ] Cross-platform comparison covers at least 2 other tools
