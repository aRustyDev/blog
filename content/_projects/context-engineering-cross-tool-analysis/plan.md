---
id: "b3c4d5e6-7777-4aaa-b888-crosstool00002"
type: plan
status: approved
parent: ./idea.md
created: "2026-03-24T00:00:00Z"
updated: "2026-03-24T00:00:00Z"
---

## Overview

A standalone blog post providing an implementation-level comparison of context engineering across Claude Code, Cursor, GitHub Copilot, and Windsurf. Unlike feature-list comparisons, this post maps the actual file formats, frontmatter schemas, glob patterns, hook models, memory strategies, and MCP configurations — using the six-component context engineering taxonomy (Skills, Rules, Hooks, Memory, Tools, References) as the comparison framework.

The post serves as a practical migration/translation guide: "if you know how to configure context in Tool A, here's the equivalent in Tool B." It also analyzes where the tools are converging (MCP, AGENTS.md, glob-gated rules) and where they diverge (hooks maturity, memory validation, context window strategy).

## Research Phase

- **Scope**: Verify Phase 3 cross-platform findings are current (tools update rapidly); collect concrete config file examples from each tool's latest docs; confirm hook event counts, tool caps, and memory features haven't changed since research date (2026-03-24)
- **Sources**: Phase 3 findings at `../what-is-context-engineering/research/findings/phase-3-cross-platform.md` (primary); official docs for each tool (Claude Code, Cursor, Copilot, Windsurf); changelogs since research date
- **Deliverable**: Verification pass notes (inline updates to Phase 3 findings or a short verification report)

## Content Deliverables

| # | Type | Title | Est. Words | Notes |
|---|------|-------|------------|-------|
| 1 | blog post | Cross-Tool Context Engineering: Claude Code vs Cursor vs Copilot vs Windsurf | 3000-4000 | Standalone post; comparison tables + code blocks + convergence analysis |

## Timeline

| Phase | Duration | Deliverable |
|-------|----------|-------------|
| Research | 1-2 hours | Verification pass on Phase 3 data |
| Content Planning | 1 hour | Post spec + outline |
| Writing | 4-5 hours | Full draft with comparison tables and code examples |
| Review & Publish | 1-2 hours | Final edits, SEO, frontmatter, publish |

## Dependencies

- Phase 3 cross-platform research findings (complete — 360 lines at `../what-is-context-engineering/research/findings/phase-3-cross-platform.md`)
- Approved idea (complete — `./idea.md` status: approved)
- No dependency on CE series posts (standalone)
- Blog platform (Astro 5 + Cloudflare Workers) must be deployable for publishing phase

## Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Tool updates invalidate research data | Medium | Medium | Verification pass before writing; note "as of March 2026" dates |
| Post becomes too long (>4000 words) | Low | Low | Use collapsible sections and summary tables; link to detailed docs |
| Overlap with CE series Post 1 | Low | Medium | Keep focus on cross-tool comparison, not CE taxonomy definition; link to series for depth |

## Success Criteria

- [ ] All 4 tools compared across all 6 component types with concrete config examples
- [ ] Convergence/divergence analysis provides actionable insight
- [ ] Post works as a standalone reference (no CE series prerequisite)
- [ ] Published and indexed on the blog
