---
id: "a7b8c9d0-6666-4fff-a666-crosstool00001"
type: idea
status: draft
created: "2026-03-24T00:00:00Z"
updated: "2026-03-24T00:00:00Z"
---

## Concept

A side-by-side comparison of how four major AI coding tools — Claude Code, Cursor, GitHub Copilot, and Windsurf — implement context engineering. Goes deeper than feature lists: compares the actual file formats, frontmatter schemas, glob patterns, hook models, memory strategies, and MCP configurations. Shows practitioners how to translate context engineering knowledge across tools.

## Target Audience

Software engineers who use (or are evaluating) AI coding tools and want to understand the architectural differences beneath the surface. May use multiple tools or be migrating between them. Comfortable reading config files, YAML frontmatter, and JSON schemas.

## Problem/Need

Practitioners moving between Claude Code, Cursor, Copilot, and Windsurf discover that each tool has its own names, file formats, and conventions for the same underlying concepts. A `.cursorrules` file, a `CLAUDE.md`, a `copilot-instructions.md`, and a `.windsurfrules` all serve the same purpose — but with different syntax, scoping rules, and precedence. No existing resource maps these equivalences at the implementation level.

## Unique Angle

- **Implementation-level comparison**: not features, but file formats, frontmatter schemas, glob syntax, and directory structures
- **Grounded in the context engineering taxonomy**: uses the 6 component types (skills, rules, hooks, memory, tools, references) as the comparison framework
- **Practical migration guide**: "if you know how to write .cursorrules, here's the equivalent in Claude Code"
- **Convergence analysis**: where the tools are converging (MCP, AGENTS.md) and where they diverge (hooks maturity, memory validation)
- **Research-backed**: Phase 3 cross-platform comparison provides 360 lines of structured data

## Scope

**Included**: Rules file comparison (format, frontmatter, glob syntax, precedence), skills/prompts comparison, hooks comparison, memory comparison, MCP/tools comparison, references comparison, context window strategies, convergence patterns

**Excluded**: Model quality comparison, pricing comparison, IDE UX comparison, performance benchmarks, installation guides

## Research Needs

- Most research already complete (Phase 3 cross-platform findings at `../what-is-context-engineering/research/findings/phase-3-cross-platform.md`)
- May need to verify current file formats (tools update rapidly)
- Collect concrete config file examples from each tool's documentation
- Screenshot/diagram of each tool's directory layout

## Estimated Effort

- Research: 1-2 hours (mostly done — verification pass)
- Writing: 4-5 hours (3000-4000 word target with comparison tables and code blocks)
- Diagrams: 2 hours (side-by-side format comparisons)
- Review: 1-2 hours
- Total: ~8-13 hours
