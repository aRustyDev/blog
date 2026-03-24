# Research Report: What is Context Engineering? A Taxonomy of AI Context Components

_Final synthesis from 4 research phases. 75 sources, 7 communities, 18 concrete examples, 4-tool cross-platform comparison._

---

## 1. Executive Summary

Context engineering — the discipline of systematically designing what information enters an LLM's context window, when, and how — has rapidly emerged as a distinct engineering practice. Through analysis of 75 sources across 12 topic areas, lifecycle mapping of Claude Code's context loading architecture, and cross-platform comparison of four major AI coding tools, we identify six distinct context component types (skills, rules, hooks, memory, tools, references) that flow through a four-stage temporal pipeline (build-time → session-start → on-demand → event-triggered). Each component type maps to established software engineering patterns, and the pipeline model is validated by both implementation evidence and cross-platform convergence. This taxonomy bridges the gap between academic frameworks (which operate at conceptual levels) and practitioner experience (which operates at the implementation level), providing a framework for designing, evaluating, and comparing context engineering systems.

---

## 2. Literature Context

The term "context engineering" crystallized in June 2025 when Tobi Lutke [BIB-011] and Andrej Karpathy [BIB-010] independently framed it as the successor to "prompt engineering." Within months, academic surveys formalized the concept: Mei et al. [BIB-001] analyzed 1,400+ papers to decompose CE into retrieval/generation, processing, and management; Hua et al. [BIB-002] traced CE's intellectual lineage back to 1990s HCI.

Our work occupies a specific niche in this landscape:

| Prior Work | Their Contribution | Our Addition | Relationship |
|-----------|-------------------|-------------|-------------|
| Mei et al. CE Survey [BIB-001] | Conceptual taxonomy (retrieval, processing, management) across 1,400 papers | Temporal pipeline model + implementation-level component types | Complements |
| Hua et al. CE 2.0 [BIB-002] | Historical framing back to 1990s | Concrete, actionable taxonomy for the current agent era | Extends |
| Anthropic CE Framework [BIB-013] | Practitioner guidance (system prompts, tools, examples, history) | Formal taxonomy with ordering rules, SE parallels, security analysis | Systematizes |
| Schulhoff Prompt Report [BIB-024] | 58 prompting techniques in 6 categories | Shows PE as one dimension of broader CE; pipeline model shows when each technique applies | Subsumes |
| MemGPT [BIB-046] | OS-inspired memory hierarchy (main/external context) | Generalized pipeline covering all component types, not just memory | Extends |
| Sarkar SE→MCP [BIB-064] | 4 SE patterns mapped to agent communication | 18 SE pattern mappings across all component types with implementation evidence | Extends |

---

## 3. The Context Pipeline

Context components enter the LLM's context window at different times through different mechanisms. We identify four temporal stages, validated against Claude Code's actual loading sequence (Phase 2) and confirmed by cross-platform convergence across Cursor, Copilot, and Windsurf (Phase 3).

### Stage 1: Build-Time

Components installed or registered before any conversation begins.

- Plugin installation (skills, rules, hooks packaged together)
- MCP server registration (command, transport, credentials)
- Git hook installation (development workflow integration)
- Memory directory initialization

**SE Pattern**: Build pipeline / Package manager / Service registry

### Stage 2: Session-Start

Components loaded when a conversation begins, before the first user message.

- System prompt assembly (110+ modular segments, cache-optimized)
- CLAUDE.md hierarchy (managed > project > user, injected as user messages)
- Unconditional rules (no glob gate — always active)
- Auto-memory index (first 200 lines of MEMORY.md)
- MCP capability negotiation (server handshake, tool schema fetching)
- Skill metadata scan (~100 tokens per skill, name+description only)
- Tool Search activation (deferred loading if tool schemas >10K tokens)

**SE Pattern**: Configuration cascade / DI container / Context Object (POSA)

### Stage 3: On-Demand

Components loaded during conversation in response to user actions or model decisions.

- Skills invoked by user (slash command) or model (auto-invoke)
- MCP tools called by model decision (JSON-RPC)
- Path-scoped rules activated when matching files are accessed
- Descendant CLAUDE.md files loaded on subdirectory access
- Memory topic files selected by memory agent
- Reference documents loaded via Read tool
- Deferred tool schemas resolved via Tool Search

**SE Pattern**: Command / Lazy loading / Service proxy / Adapter

### Stage 4: Event-Triggered

Components activated by system events, not by user or model action.

- Hooks fired on 22 lifecycle events (PreToolUse can block, PostToolUse observes)
- System reminders injected at inference boundaries (~40 types)
- Context compaction when window limits approached
- Post-compaction re-injection (CLAUDE.md, rules, memory re-read from disk)

**SE Pattern**: Observer / Event listener / Guard / Change notification

### Pipeline Validation

| Validation Method | Result |
|------------------|--------|
| Claude Code lifecycle mapping (Phase 2) | All 4 stages confirmed with exact loading order evidence |
| Cross-platform comparison (Phase 3) | All 4 tools implement variants of each stage |
| Mei et al. taxonomy cross-reference | Our stages map to their retrieval (on-demand), processing (session-start), management (event-triggered) |
| LangChain 4-strategy cross-reference | Our stages map to their writing (build-time), selecting (on-demand), compressing (event-triggered), isolating (on-demand) |

### Edge Cases and Simplifications

1. **Stage-straddling components**: Rules are discovered at session-start but activated on-demand (when glob matches). We classify them by their activation stage, not discovery.
2. **Memory's mixed lifecycle**: MEMORY.md index loads at session-start; topic files load on-demand. We treat these as two sub-components.
3. **System reminders are platform-level**: They aren't configurable at the project level. We include them because they're a critical context injection mechanism, even though they're not user-authored.
4. **Compaction is destructive then restorative**: It removes context (stage 4) then re-loads it (back to stage 2). This circular behavior is a feature, not a bug — it's garbage collection with checkpoint/restore.

---

## 4. Component Taxonomy

### Taxonomy Reference Table

| Field | Skill | Rule | Hook | Memory | Tool | Reference |
|-------|-------|------|------|--------|------|-----------|
| **Definition** | Reusable, invocable prompt template that guides Claude through a specific workflow | Persistent behavioral constraint that shapes how Claude operates, optionally gated by file patterns | Event handler that fires on system lifecycle events, can observe or block actions | Persistent state that survives across sessions, carrying learned context forward | External capability accessed via MCP protocol, extending what Claude can do beyond text | Static document loaded on demand to provide domain knowledge or structural templates |
| **Distinguishing characteristic** | User-invocable via slash command; progressive disclosure (metadata → full content) | Always-on or glob-gated; shapes behavior without explicit invocation | Fires on events, not commands; can approve/deny actions | Persists across sessions; two-tier (index + topics) | External process; protocol-mediated (JSON-RPC); model-initiated | Passive; must be explicitly read; no execution logic |
| **Pipeline stage(s)** | Build-time (install) → Session-start (metadata) → On-demand (full content) | Session-start (unconditional) or On-demand (path-scoped) | Event-triggered | Session-start (index) + On-demand (topics) | Build-time (register) → Session-start (negotiate) → On-demand (invoke) | On-demand |
| **Persistence** | Persistent (file-based) | Persistent (file-based) | Persistent (config-based) | Persistent (file-based, cross-session) | Persistent (registration) | Persistent (file-based) |
| **Trigger** | User `/name` or model auto-invoke | File existence (unconditional) or glob match (path-scoped) | System event (22 types) | Session start (index) + agent decision (topics) | Model decision (tool_call) | Model decision (Read tool) |
| **Example** | blog-workflow:research-topic | cf-wrangler.md (glob: `**/wrangler.jsonc`) | PreToolUse blocking guard | MEMORY.md + topic files | mcp__arxiv__search_papers | research-eng.md template |
| **SE parallel** | Command pattern / Strategy | Interceptor / Middleware filter | Observer / Guard | Repository / Two-tier cache | Service proxy / Adapter | Document repository |
| **Production concern** | <5K tokens per invocation; accumulates in context | 0 tokens when inactive (glob-gated); ~800 when active | Latency on every matching event; 10min timeout | 200-line index cap; >92% application rate under 200 lines | Tool Search reduces 77K→8.7K for 50+ tools | Variable; no lazy loading mechanism |
| **Security boundary** | Skill content treated as instructions; compromised skill = arbitrary instruction injection | Project rules override user rules; no integrity check | Hooks ARE the guardrail mechanism; compromised hook = silent approval | Memory poisoning persists across sessions; no staleness validation | Two-layer auth (server registration + tool permission); no result integrity verification | Trust depends on source; system reminders are platform-trusted |
| **Cross-platform** | CC: SKILL.md; Cursor: rules @-mention; Copilot: .prompt.md; Windsurf: workflows | CC: .claude/rules; Cursor: .mdc; Copilot: .instructions.md + AGENTS.md; Windsurf: .windsurfrules | CC: 21 events; Cursor: 6; Copilot: 6; Windsurf: none | CC: auto-memory; Cursor: Generate Memories; Copilot: validated memory; Windsurf: Cascade Memories | All 4: MCP (universal since Dec 2025 Linux Foundation donation) | CC: Read + templates; Cursor: @file/@codebase; Copilot: #file; Windsurf: M-Query |

---

## 5. SE Pattern Mapping

| SE Pattern | CE Parallel | Evidence | Source |
|-----------|------------|----------|--------|
| **Middleware pipeline** | Context assembly (110+ segments, ordered, cached) | Phase 2: system prompt assembled in cache-optimized order | BIB-065 POSA, BIB-067 Guran |
| **Plugin architecture** | Skills + plugins (namespaced, installable, versioned) | Phase 3: blog-workflow plugin with 8 skills | BIB-043 ToolRegistry |
| **Observer / Event-driven** | Hooks (22 lifecycle events, parallel execution) | Phase 2: hook firing on PreToolUse/PostToolUse | BIB-066 Lazzari EDA |
| **Dependency injection** | CLAUDE.md hierarchy (config injected at session start) | Phase 2: three-tier config cascade | BIB-065 POSA |
| **Context Object (POSA)** | Assembled context window (structured, carrying session state) | Phase 2: 110+ segments conditionally assembled | BIB-065 POSA |
| **Adapter / Service proxy** | MCP tool invocation (JSON-RPC adapting to server implementation) | Phase 3: arxiv, crawl4ai, semantic-scholar servers | BIB-032 SGD-MCP, BIB-043 ToolRegistry |
| **Command pattern** | Skill invocation (user issues `/name`, system loads and executes) | Phase 3: blog-workflow:research-topic | — |
| **Repository pattern** | Memory persistence (index + topics, read/write operations) | Phase 3: auto-memory two-tier architecture | BIB-046 MemGPT |
| **Guard / Interceptor** | PreToolUse hooks (approve/deny before execution) | Phase 2: exit 2 blocks tool call | BIB-069 OWASP, BIB-074 GuardRail |
| **Lazy loading / Virtual proxy** | Tool Search (deferred schemas, loaded on keyword match) | Phase 2: 95% context reduction (77K→8.7K) | BIB-035 MCP-Zero |
| **Progressive disclosure / Facade** | Skill metadata (name+description at startup, full content on invoke) | Phase 2: ~100 tks → <5K tks lifecycle | — |
| **Configuration cascade** | CLAUDE.md hierarchy (managed > project > user) | Phase 2: three-tier loading with override semantics | — |
| **Change notification** | System reminders (~40 types, user messages preserving cache) | Phase 2: file modifications, hook outputs, mode changes | — |
| **Checkpoint / Restore** | Post-compaction re-injection (CLAUDE.md, rules, memory re-read) | Phase 2: compaction triggers full reload from disk | — |

**4 Novel Patterns** (no classical SE equivalent):
- **Cache-optimized injection**: System prompt frozen; dynamic content as user messages to preserve KV-cache
- **Progressive disclosure at scale**: Hundreds of potential components managed via metadata-only loading
- **Memory agent delegation**: A sub-LLM decides which memories to attach (the loader is itself an LLM)
- **Dream consolidation**: Periodic multi-phase memory merge/prune cycle (closest analog: database vacuum)

---

## 6. Design Principles

| # | Principle | Evidence | Counterexample | Source |
|---|-----------|----------|----------------|--------|
| 1 | **Atomicity** | Each component type serves one purpose (skills instruct, rules constrain, hooks react) | Some skills combine instruction + rule-like constraints | Phase 3 taxonomy |
| 2 | **Composability** | Components combine without conflicts; plugins bundle skills+rules+hooks+tools | Rule conflicts resolved arbitrarily ("Claude may pick one") | BIB-014 LangChain |
| 3 | **Testability** | Skills can be validated independently; MCP tools have typed schemas | Hooks depend on runtime state; integration-only testing | BIB-034 MCP Smells |
| 4 | **Explicitness** | Glob gates are visible in frontmatter; permissions in settings.json | System reminders are invisible to the user; compaction is automatic | BIB-013 Anthropic |
| 5 | **Graceful degradation** | Beads hook exits 0 if `bd` not installed; missing CLAUDE.md = skip | Required MCP servers that crash mid-session | Phase 2 lifecycle, Phase 3 beads hook |
| 6 | **Token efficiency** | Tool Search reduces 77K→8.7K; skill metadata ~100 tks; MEMORY.md capped at 200 lines | Verbose tool schemas; templates with no lazy loading | BIB-062 NVIDIA, BIB-035 MCP-Zero |
| 7 | **Trust boundaries** | Two-layer MCP auth (registration + permission); PreToolUse hooks as guardrails | Memory has no staleness validation; no rule integrity checks | BIB-069 OWASP, BIB-072 HouYi |
| 8 | **Cache awareness** | System prompt frozen; CLAUDE.md as user message; stable prefixes maximize KV-cache hits | Path-scoped rules invalidate cache when activated mid-session | BIB-062 NVIDIA, BIB-017 Manus |

---

## 7. Production Engineering

Key production patterns from Phase 1 research + Phase 2/3 observations:

**KV-Cache Optimization**: System prompt stays frozen across turns; dynamic content injected as user messages. Prefix caching yields up to 5x faster TTFT [BIB-062]. Manus reports KV-cache hit rate as the single most critical production metric (10x cost differential) [BIB-017].

**Token Budget Management**: Tool Search reduces MCP overhead by 95% (77K→8.7K for 50+ tools). Skill progressive disclosure: ~100 tks at startup, <5K on invoke. MEMORY.md capped at 200 lines (>92% rule application rate; drops to ~71% over 400 lines).

**Context Utilization**: "Lost-in-the-middle" problem documented by An et al. [BIB-063] — models underweight information in middle positions. Context-Folding [BIB-038] achieves 10x context reduction via sub-trajectory branching with outcome summaries.

**Compaction**: Destructive-then-restorative cycle. CLAUDE.md re-read from disk; memory survives; tool results compacted. Post-compaction, system returns to Stage 2 with a clean context window.

---

## 8. Security Analysis

Context engineering introduces security concerns at every pipeline stage:

| Stage | Attack Surface | Mitigation | OWASP Mapping |
|-------|---------------|-----------|---------------|
| Build-time | Compromised plugin/MCP server | Two-layer auth; `allowedMcpServers` allowlist | LLM03 Supply Chain |
| Session-start | Malicious CLAUDE.md or rule file | Managed policy (cannot be excluded); project > user precedence | LLM01 Prompt Injection |
| On-demand | Tool result manipulation; skill injection | PreToolUse hooks as guardrails; `allowed-tools` restrictions | LLM04 Data Poisoning, LLM06 Excessive Agency |
| Event-triggered | Compromised hook silently approving | Hook integrity; audit logging via PostToolUse | LLM07 System Prompt Leakage |
| Cross-session | Memory poisoning (persistent instruction injection) | Only Copilot validates memories vs codebase; no universal solution | Novel risk |

Key finding: Context IS both the attack surface and the defense mechanism. Wei et al. [BIB-073] demonstrate that minimal in-context demonstrations can both jailbreak (ICA) and guard (ICD) LLM alignment. Prompt injection [BIB-072 HouYi, 657 cites] parallels classical web injection (SQL injection, XSS) — an SE pattern analogy that strengthens the pipeline model.

---

## 9. Communities & Origins

Seven communities drive context engineering discourse (detailed in `research/communities.md`):

1. **Twitter/X** (Karpathy, Lutke, swyx) — coined and popularized the term (June 2025)
2. **Hacker News** — 915-point lead thread; practitioner evaluation and debate
3. **AI Agent Builders** (LangChain, Anthropic, Chroma) — framework design and tooling
4. **Academic/arXiv** — formal surveys and theoretical foundations
5. **Agent Memory Research** (Mem0, Zep, MemGPT) — persistent context infrastructure
6. **Reddit** (r/MachineLearning, r/LocalLLaMA, r/ClaudeAI) — CE concepts discussed under technical labels, not the umbrella term
7. **YouTube / HuggingFace Forums** — educational content and community handbooks

**Term origin**: Lutke tweet (June 22, 2025) → Karpathy amplification (June 25) → community adoption within days → first academic survey within 3 weeks (Mei et al., July 17) → Gartner endorsement (Q3 2025) → first peer-reviewed PE vs CE comparison (IEEE IISEC, 2026).

---

## 10. Limitations & Edge Cases

1. **Single-platform bias**: Our lifecycle mapping is grounded primarily in Claude Code. While cross-platform comparison validates the taxonomy, the detailed loading sequence is Claude Code-specific.

2. **Rapidly evolving field**: Between Phase 1 (initial survey) and Phase 4 (synthesis), the number of available sources grew. Some findings may be outdated by publication.

3. **Permission boundary**: Plugin cache, user-level configs, and memory directories were inaccessible during codebase analysis. Skill file contents were inferred from documentation rather than direct reading.

4. **Pipeline model is a simplification**: Real-world loading is not strictly sequential. Components can be re-loaded after compaction (stage 4 → stage 2), and some components straddle stages (rules discovered at session-start, activated on-demand).

5. **Security analysis is theoretical**: We document trust boundaries and attack surfaces but did not perform penetration testing or empirical vulnerability assessment.

6. **Cross-platform data currency**: Tool features change rapidly. Cursor's hook system was introduced October 2025; Copilot's memory validation shipped March 2026. Some features may have changed since research was conducted.

---

## 11. Series Structure Recommendation

Based on UMAP coverage analysis (75 sources, 12 topics) and the natural structure of findings, we recommend a 5-post series:

### Post 1: "What is Context Engineering?"
**Topics**: CE Definition (READY), Community & Terminology, Prompt Engineering → CE evolution
**Coverage**: Strongest topic cluster. Introduces the term, traces origin, positions against prompt engineering.
**Key sources**: BIB-010 Karpathy, BIB-001 Mei survey, BIB-024 Schulhoff Prompt Report
**Word count**: 2500-3000

### Post 2: "The Context Pipeline: How AI Tools Load Information"
**Topics**: Pipeline model (4 stages), Agent Architecture, Phase 2 lifecycle mapping
**Coverage**: Strong — grounded in implementation evidence + cross-platform validation
**Key sources**: Phase 2 report, BIB-013 Anthropic CE, BIB-065 POSA
**Word count**: 3000-3500

### Post 3: "A Taxonomy of Context Components"
**Topics**: 6 component types (taxonomy reference table), concrete examples from Phase 3
**Coverage**: The core contribution. Each type with definition, example, SE parallel, cross-platform comparison.
**Key sources**: Phase 3 report, cross-platform comparison, all 18 examples
**Word count**: 3500-4000

### Post 4: "Software Engineering Patterns for Context Systems"
**Topics**: SE Patterns (READY), Production Engineering, 18 pattern mappings + 4 novel patterns
**Coverage**: Strong after follow-up research. Bridges SE expertise to CE practice.
**Key sources**: BIB-065 POSA, BIB-067 middleware, BIB-064 Sarkar, BIB-062 NVIDIA
**Word count**: 3000-3500

### Post 5: "Security, Memory, and the Future of Context Engineering"
**Topics**: Security & Control, Memory Systems, RAG, In-Context Learning, future directions
**Coverage**: Mixed — security and memory are well-sourced but ICL practitioner coverage remains thin.
**Key sources**: BIB-069 OWASP, BIB-046 MemGPT, BIB-072 HouYi, BIB-004 ICL Survey
**Word count**: 2500-3000

**Total series**: ~14,500-17,000 words across 5 posts.

---

## 12. Bibliography

Full verified annotated bibliography with 75 sources available at `research/bibliography.md`.

- 52 academic papers
- 23 practitioner sources
- 38+ link graph edges
- 12 topic areas covered
- UMAP coverage analysis at `research/data/phase1-complete.yaml`

---

_Research completed 2026-03-24. Four phases executed: Literature Survey (75 sources), Lifecycle Mapping (4-stage pipeline), Example Gathering (18 examples, 4-tool comparison), Synthesis (this report)._

## Children

- [Content Brainstorm](../../content-brainstorm.md)
