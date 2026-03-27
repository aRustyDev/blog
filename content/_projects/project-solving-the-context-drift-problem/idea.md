---
id: "n4e5f6a7-4444-4nnn-o444-444444444401"
type: idea
status: draft
created: "2026-03-16T00:00:00Z"
updated: "2026-03-16T00:00:00Z"
---

## Concept

A project-oriented deep-dive on building a content-addressed build system for reusable Claude Code components (agents, skills, rules, templates) in the arustydev/ai repo. Solves the "copy-paste drift" problem: when a useful agent definition (like terraform-engineer.md) lives in context/agents/ and is included in multiple plugins (terraform, infrastructure, cloud-ops), copies drift over time — the original changes but copies don't, different plugins have different versions of the "same" component, and nobody knows which version is canonical. The solution: (1) components live in one canonical location (context/skills/, context/agents/, etc.), (2) plugins reference components via plugin.sources.json, (3) SHA256 hashes track whether the source has changed since the plugin was built, (4) `just plugin:build` detects stale references and prompts update or fork. The outcome: edit a skill once, run `just plugin:build --all`, and every plugin using it gets updated. Intentional divergence is marked as "forked" and the system leaves it alone. Build-system-first approach: treats the problem as a dependency management challenge — essentially npm/cargo for Claude Code context components.

## Target Audience

Claude Code power users managing multiple plugins across projects, AI tooling developers building reusable agent/skill libraries, developers who maintain shared configuration across multiple deployment contexts, teams experiencing configuration drift in AI agent setups, anyone building plugin ecosystems for LLM coding assistants.

## Problem/Need

As Claude Code plugin ecosystems grow, developers create reusable components — agent definitions, skills, rules, templates — that appear in multiple plugins. Without dependency tracking, these copies drift silently. A fix to the canonical terraform-engineer.md doesn't propagate to the 3 plugins using it. Manual synchronization doesn't scale and relies on human discipline that erodes over time. The result: inconsistent agent behavior across plugins (the "same" skill behaves differently in different contexts), debugging nightmares when you can't tell which version of a component a plugin is running, wasted effort maintaining multiple copies of identical content, and no visibility into whether a component is up-to-date or stale. This is the same class of problem that package managers (npm, cargo, pip) solved for code dependencies — but no equivalent exists for markdown-based AI configuration files.

## Unique Angle

- **Build-system-first** — treats context drift as a dependency management problem, not a discipline problem: the system detects staleness rather than relying on humans to remember
- **Content-addressed** — SHA256 hashes provide simple, reliable change detection without the complexity of semantic versioning: if the hash differs, the source changed
- **Fork-aware** — intentional divergence is a first-class concept: mark a component as "forked" and the build system stops flagging it as stale, acknowledging that some plugins legitimately need different versions
- **plugin.sources.json as manifest** — a single file per plugin declares all external component dependencies with their source paths and content hashes, making the dependency graph explicit and inspectable
- **`just` task runner integration** — builds on the existing `just` workflow rather than introducing a new build tool, keeping the developer experience familiar
- **Markdown-native** — designed specifically for the unique challenges of AI configuration files (markdown, YAML frontmatter) rather than adapting a code-oriented package manager

## Scope

**Included**: The copy-paste drift problem definition with concrete examples, content-addressed build system design, plugin.sources.json manifest format specification, SHA256 hash tracking implementation, `just plugin:build` command implementation, stale reference detection workflow, update-or-fork decision flow, `just plugin:build --all` for batch updates, fork marking mechanism for intentional divergence, integration with existing Claude Code plugin directory structure, example walkthrough with real components (agents, skills, rules)

**Excluded**: Cross-repository dependency management (single repo scope for now), semantic versioning (content-addressed is intentionally simpler), automated testing of plugin builds after update, GUI or dashboard for dependency visualization, publishing or registry for sharing components across users/orgs, automatic conflict resolution when both source and fork have changed, git hook integration for pre-commit staleness checks

## Research Needs

- Survey existing approaches to configuration drift management (Nix, Terraform modules, Helm charts)
- Design plugin.sources.json schema (source path, target path, hash, fork status, last-synced timestamp)
- Prototype SHA256 hashing for markdown files (handle whitespace normalization, frontmatter changes)
- Design the update workflow UX (diff preview, selective update, fork decision)
- Implement `just plugin:build` with stale detection
- Test with real plugin ecosystem (terraform, infrastructure, cloud-ops plugins)
- Document the fork workflow and when to use it vs. staying in sync

## Estimated Effort

- Research: 3-4 hours (existing approaches, schema design, workflow UX)
- Implementation: 8-12 hours (plugin.sources.json format, hash tracking, just tasks, stale detection, update workflow, fork marking)
- Testing: 2-3 hours (real-world plugin ecosystem validation)
- Writing: 4-6 hours (project post with implementation details, workflow examples, design decisions)
- Visuals: 1-2 hours (dependency graph diagram, update workflow flowchart)
- Total: ~18-27 hours across implementation and writing phases
