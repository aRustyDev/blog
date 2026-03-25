---
title: "What is Context Engineering?"
description: "Context engineering is the discipline of designing what enters an LLM's context window, when, and how. A taxonomy of 6 component types flowing through a temporal pipeline."
pubDatetime: 2026-03-25T00:00:00Z
featured: true
draft: true
tags:
  - ai
  - agents
  - context-engineering
  - series
---

You've been doing context engineering for months. You just didn't have a name for it.

Every `.cursorrules` file you've written. Every `CLAUDE.md` you've maintained. Every system prompt you've refined, every MCP server you've configured, every hook you've wired up to guard a dangerous command. All of it — context engineering.

The field crystallized in June 2025 when two tweets gave it a name. Within 72 hours, a decade of scattered practice had a vocabulary. Within weeks, academic surveys formalized it. By late 2025, Gartner declared it the successor to prompt engineering.

This post defines what context engineering actually is, where it came from, and why it matters more than "prompt engineering" ever did. It's the first in a six-part series mapping the discipline from first principles.

But to understand what context engineering is, we need to understand what it replaced.

---

## Prompt Engineering Hit Its Ceiling

Let's be clear: prompt engineering is real. It's not "just typing into a chatbox."

<!-- COMPONENT: PersonPopup { id: "schulhoff" } -->Schulhoff et al.<!-- /COMPONENT --> cataloged 58 distinct prompting techniques organized into six categories — few-shot learning, thought generation, zero-shot methods, ensembling, self-criticism, and more. Their _Prompt Report_ is the most comprehensive survey of the field, co-authored by researchers at OpenAI, Microsoft, Google, Princeton, and Stanford. <!-- COMPONENT: PersonPopup { id: "sahoo" } -->Sahoo et al.<!-- /COMPONENT --> produced a separate systematic survey with 767 citations — the most-cited prompt engineering paper in existence. These are legitimate engineering techniques with measurable impact on model performance.

But production AI tools don't just have prompts. They have persistent rules that activate when you open specific file types. Event-driven hooks that fire before tool calls and can block dangerous commands. External tools accessed through protocols like MCP. Cross-session memory that learns from past conversations and persists across sessions. Reusable skills invoked by slash commands. Reference documents loaded on demand.

"Prompt engineering" doesn't describe any of this. The term covers one component type in a system that has at least six. It's like calling all of software engineering "function writing" — technically a part of the job, but missing most of what makes the work hard.

The problem wasn't just semantic. Practitioners were building these systems — system prompts, skills, rules, hooks, memory systems — without a shared vocabulary. There was no way to compare approaches across tools, no framework for evaluating which components to build, no language for discussing composition and ordering. Every team invented their own terminology.

Then, in June 2025, the vocabulary arrived.

---

## 72 Hours That Named a Discipline

<!-- COMPONENT: Tweet { id: "1935533422589399127", author: "tobi" } -->
Tobi Lutke, June 22, 2025: "I really like the mass realization and description of 'context engineering' ... This is the new skill that will matter much more than 'prompt engineering.' It's the art of providing all the context for the task to be plausibly solvable by the LLM."
<!-- /COMPONENT -->

Three days later:

<!-- COMPONENT: Tweet { id: "1937902205765607626", author: "karpathy" } -->
Andrej Karpathy, June 25, 2025: "I think the word 'prompt' trivializes what actually happens ... It's the delicate art and science of filling the context window with just the right information for the next step."
<!-- /COMPONENT -->

<!-- COMPONENT: PersonPopup { id: "karpathy" } -->Karpathy<!-- /COMPONENT --> added a framing that stuck: LLMs are a new kind of operating system. The context window is RAM — a finite, volatile workspace where everything the model can reason over must fit simultaneously. And context engineering is the discipline of managing that RAM — deciding what goes in, when, and in what order. Like an OS kernel managing memory pages, a context engineer manages information payloads.

What happened next was remarkably fast. Within days, practitioners started publishing their own frameworks. <!-- COMPONENT: PersonPopup { id: "schmid" } -->Phil Schmid<!-- /COMPONENT --> identified seven context components and hit 915 points on Hacker News. LangChain proposed a four-strategy model for context management — writing, selecting, compressing, and isolating. Each framework was slightly different, but the convergence was unmistakable: the field was coalescing around the same architectural intuitions.

<!-- COMPONENT: Timeline { orientation: "vertical", collapsible: true } -->
- 2025-06-22: Tobi Lutke coins "context engineering" | url: https://x.com/tobi/status/1935533422589399127
- 2025-06-25: Karpathy amplifies with detailed definition | url: https://x.com/karpathy/status/1937902205765607626
- 2025-06-27: Simon Willison connects both definitions | url: https://simonwillison.net/2025/jun/27/context-engineering/
- 2025-06-30: Phil Schmid publishes 7-component framework (915 HN points) | url: https://www.philschmid.de/context-engineering
- 2025-07-02: LangChain publishes 4-strategy framework | url: https://blog.langchain.com/context-engineering-for-agents/
- 2025-07-17: Mei et al. publish first academic survey (1,400 papers analyzed) | url: https://arxiv.org/abs/2507.13334
- 2025-09-29: Anthropic publishes official context engineering framework | url: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- 2025-Q3: Gartner declares "context engineering is in, prompt engineering is out"
- 2026: First peer-reviewed PE vs CE comparison (IEEE IISEC)
<!-- /COMPONENT -->

From two tweets to academic formalization in 25 days. From practitioner blog posts to Gartner endorsement in a single quarter.

The term stuck because it captured something practitioners already felt but couldn't articulate. As <!-- COMPONENT: PersonPopup { id: "willison" } -->Simon Willison<!-- /COMPONENT --> noted, "context engineering" carries closer alignment to its intended meaning than "prompt engineering" ever did. It encompasses everything that enters the context window — not just the text you type, but the tools, memory, rules, and event-driven content that shape what the model sees.

And this wasn't a new idea. <!-- COMPONENT: PersonPopup { id: "hua-qishuo" } -->Hua et al.<!-- /COMPONENT --> traced the concept back 20+ years to human-computer interaction research. Context has always mattered. We just finally had a name for the engineering discipline around it.

---

## What Context Engineering Actually Is

Here's the working definition:

> **Context engineering** is the discipline of designing what information enters an LLM's context window, when it enters, and through what mechanism.

Not just text. Not just prompts. Context engineering encompasses tool schemas, persistent memory, event-triggered content, system-level injections, behavioral constraints, and reusable workflows — all of which flow into the same context window that the model reasons over.

<!-- COMPONENT: OGCard { url: "https://arxiv.org/abs/2507.13334" } -->
Mei et al. surveyed 1,400+ papers to define context engineering as "a formal discipline that transcends simple prompt design to encompass the systematic optimization of information payloads for LLMs."
<!-- /COMPONENT -->

### The Six Component Types

We identify six distinct types of context components. Each has its own lifecycle, trigger mechanism, and role in the system. Here's a preview — Post 3 in this series covers each in depth.

**Skills** are reusable, invocable prompt templates. You activate them by name — `/blog-workflow:brainstorm` or `/review` — and they load structured instructions that guide the model through a specific workflow. They're the closest thing to "prompt engineering," but packaged as reusable, composable units rather than one-off text.

**Rules** shape how the model operates without being explicitly invoked. Think of them as persistent behavioral constraints — some always active, others gated by file patterns. A rule about Cloudflare configuration might activate only when you open a `wrangler.jsonc` file, lying dormant the rest of the time. You never invoke a rule; it activates when conditions are met.

**Hooks** fire on system lifecycle events — 22 of them in Claude Code, including `PreToolUse`, `PostToolUse`, `SessionStart`, and `InstructionsLoaded`. Some observe (logging what happened after a tool call). Others guard (blocking a dangerous command before it executes). They're the event-driven backbone of the context system.

When you close a conversation and open a new one, you lose everything — unless **memory** carries it forward. Memory is persistent state that survives across sessions: your preferences, your project's conventions, the debugging insight from last Tuesday. It's what keeps you from repeating yourself.

**Tools** extend what the model can do beyond text. Accessed via protocols like MCP (Model Context Protocol), they connect the model to external capabilities: searching academic papers, scraping web pages, querying databases, running code. Every major AI coding tool now supports MCP.

Finally, **references** are static documents loaded on demand — templates, architecture decision records, style guides. They sit outside the context window until pulled in when relevant. No execution logic, no triggers; just knowledge available when needed.

> **What about commands and plugins?**
>
> Two familiar concepts are absent from this taxonomy. **Commands** (`.claude/commands/`) were the predecessor to skills — deprecated but functionally equivalent. They're the earlier name for the same component type.
>
> **Plugins** are different: they're _bundles_ of the other types. A plugin packages skills + rules + hooks + tools together into an installable unit. Plugins are a composition mechanism, not a component type — the same way an npm package isn't a new JavaScript primitive.

<!-- COMPONENT: DirTree { collapsible: true, label: "A plugin bundles component types, not a component itself" } -->
blog-workflow/
  .claude-plugin/plugin.json    # manifest
  skills/                       # Skills
    brainstorm/SKILL.md
    review/SKILL.md
  .claude/rules/                # Rules
    frontmatter.md
  hooks/hooks.json              # Hooks
  .mcp.json                     # Tools
<!-- /COMPONENT -->

### The Pipeline Model

<!-- COMPONENT: PipelineDiagram {} -->
[Pipeline flow diagram: Build-time → Session-start → On-demand → Event-triggered]
[Shows which component types enter at each stage]
[Skills metadata at session-start, full content on-demand; Rules at session-start or on-demand (glob); Hooks at event-triggered; Memory at session-start (index) + on-demand (topics); Tools at session-start (negotiate) + on-demand (invoke); References on-demand only]
<!-- /COMPONENT -->

These six component types don't all load at once. They flow through a temporal pipeline with four stages — and the ordering matters. If the context window is RAM, then the pipeline is the boot sequence.

**Build-time** is like installing packages before the OS runs. Plugins are installed. MCP servers are registered. Git hooks are wired up. Nothing enters the context window yet, but the infrastructure is in place.

**Session-start** is the boot process. When a conversation begins, the system assembles the initial context: CLAUDE.md files load in a three-tier hierarchy (managed policy > project > user), rules are discovered, memory is recalled, MCP servers negotiate their capabilities, and skill metadata is scanned. The system prompt — 110+ modular segments in Claude Code — is assembled in a specific order optimized for cache efficiency.

**On-demand** is demand paging — content loaded only when accessed. A user invokes a skill. The model calls a tool. A path-scoped rule activates because a matching file was opened. A memory topic file is loaded because the memory agent decided it was relevant. Nothing loads until something triggers it.

**Event-triggered** is the interrupt handler layer. Hooks fire on lifecycle events. System reminders inject context changes. And when the context window approaches its limit, compaction kicks in — the equivalent of garbage collection, compressing the conversation while re-reading CLAUDE.md and memory fresh from disk.

Post 2 maps this pipeline in full depth with implementation evidence and cross-platform validation. But if you want a preview of the evidence — the pipeline isn't theoretical. You can observe it directly.

<!-- COMPONENT: CodeBlock { lang: "text", collapsible: true, title: "The scope hierarchy: who overrides whom" } -->
Managed Policy  /Library/Application Support/ClaudeCode/CLAUDE.md  (cannot be excluded)
     |
Project         ./CLAUDE.md  +  .claude/rules/*.md  +  .claude/settings.json
     |
User            ~/.claude/CLAUDE.md  +  ~/.claude/rules/*.md
     |
Local           .claude/settings.local.json  (gitignored overrides)
<!-- /COMPONENT -->

<!-- COMPONENT: CLISnippet { collapsible: true, title: "Watch the pipeline in action with InstructionsLoaded" } -->
$ # With an InstructionsLoaded hook configured:
$ claude
Loaded: ~/.claude/CLAUDE.md (session_start)
Loaded: .claude/rules/cf-wrangler.md (session_start, skipped: no glob match)
$ # ... later, when you open wrangler.jsonc:
Loaded: .claude/rules/cf-wrangler.md (path_glob_match)
<!-- /COMPONENT -->

<!-- COMPONENT: OGCard { url: "https://code.claude.com/docs/en/hooks" } -->
Claude Code Hooks Reference — 22 lifecycle events with InstructionsLoaded load_reason values
<!-- /COMPONENT -->

This isn't just a Claude Code thing. Every major AI coding tool has converged on similar architecture.

---

## All Roads Lead to the Agent Harness

The convergence is striking. Four independent tools — built by different companies, powered by different models, targeting different workflows — arrived at the same architectural primitives.

**MCP** is now universal. Anthropic donated the Model Context Protocol to the Linux Foundation in December 2025. Claude Code, Cursor, Copilot, and Windsurf all support it. The protocol wars are over before they started.

**Glob-gated rules** exist in all four tools, with different syntax but identical semantics. Claude Code uses `.claude/rules/*.md` with YAML frontmatter globs. Cursor uses `.cursor/rules/*.mdc`. Copilot uses `.github/instructions/*.instructions.md` with `applyTo`. Windsurf uses `.windsurfrules` and directory-scoped `AGENTS.md` files.

**AGENTS.md** is emerging as a cross-tool instruction standard. Copilot supports it alongside `CLAUDE.md` and `GEMINI.md` — a deliberate bet on interoperability.

**Lifecycle hooks** show a maturity gradient: Claude Code leads with 21 events and four handler types (including approve/deny control flow). Cursor and Copilot each offer 6 events. Windsurf has none yet — but the pressure to add them is obvious.

This convergence isn't coincidence. It's the field discovering that context engineering requires the same architectural primitives regardless of which model powers the tool. Skills, rules, hooks, memory, tools, references — these aren't Claude Code features. They're the building blocks of any system that manages what an LLM sees.

Which points to a bigger insight.

<!-- COMPONENT: PersonPopup { id: "gupta-aakash" } -->Aakash Gupta<!-- /COMPONENT --> framed it sharply: "2025 was agents. 2026 is agent harnesses."

The model is commodity. The same Claude, the same GPT-4, the same Gemini is available to everyone. What differentiates tools — what creates the moat — is the _harness_: the context engineering, tool orchestration, memory management, and lifecycle hooks that wrap the model.

The evidence is concrete. Manus rewrote their harness five times. LangChain re-architected their Deep Research system four times. Vercel cut 80% of their tools and _improved_ results — because less context, better curated, outperformed more context, poorly assembled.

If the context window is RAM and the pipeline is the boot sequence, then the harness is the OS distribution. Ubuntu and Fedora and macOS all run on the same kernel — but the distribution is what users experience. The six component types — skills, rules, hooks, memory, tools, references — are the building blocks of that distribution. You're not building prompts. You're building a harness.

---

## What's Coming

This series maps the harness. Five more posts, each building on the vocabulary established here:

**[Post 2: The Context Pipeline](/blog/the-context-pipeline)** maps the four temporal stages in depth — what loads when, in what order, with what priority. Grounded in Claude Code's actual loading sequence and validated across all four major tools.

**[Post 3: A Taxonomy of Context Components](/blog/taxonomy-of-context-components)** covers each of the six component types with definitions, concrete examples, and a cross-platform comparison showing how Claude Code, Cursor, Copilot, and Windsurf implement them.

**[Post 4: SE Patterns for Context Systems](/blog/se-patterns-for-context-systems)** bridges software engineering expertise to context engineering — 14 classical patterns (middleware pipelines, plugin architectures, observer, DI) mapped to context engineering parallels, plus four novel patterns unique to the field.

**[Post 5: Securing the Context Pipeline](/blog/securing-the-context-pipeline)** analyzes trust boundaries at each pipeline stage, maps OWASP LLM Top 10 risks to context engineering, and shows how prompt injection parallels classical web security vulnerabilities.

**[Post 6: Memory, RAG, and the Future](/blog/memory-rag-and-the-future)** covers memory architectures (from MemGPT to temporal knowledge graphs), the RAG-to-context-engineering evolution, and where the field is heading.

Each post can stand alone, but they build on each other. A companion standalone post will compare context engineering implementations across the four tools in implementation detail — file formats, frontmatter schemas, hook models, memory strategies.

---

You've been doing context engineering. Now you have the vocabulary.

The term crystallized in 72 hours, but the practice has been building for years. Every `.cursorrules` file, every `CLAUDE.md`, every MCP server configuration, every hook that guards a tool call — these are context components. They flow through a temporal pipeline. They follow patterns that software engineers have been refining for decades.

The difference between a good AI coding assistant and a great one isn't the model. It's the harness.

The model is commodity. The harness is the moat.

_This is Post 1 of 6 in the Context Engineering series._

---

## Review

**Reviewed**: 2026-03-25T00:00:00Z
**Result**: warn

### Structure & Narrative

- [x] Hook opens with recognition, not definition — pass
- [x] Narrative arc follows spec: hook → problem → origin → definition → convergence → roadmap → close — pass
- [x] Each section has an explicit transition to the next — pass
- [x] Closing mirrors the opening ("You've been doing context engineering") — pass
- [x] Series roadmap previews all 5 remaining posts — pass

### Takeaway Coverage

- [x] Takeaway 1: Define CE in one sentence, distinguish from PE — pass (Section 3, blockquote definition)
- [x] Takeaway 2: Know the origin story — pass (Section 2, tweets + timeline)
- [x] Takeaway 3: Understand why "prompt" is too narrow — pass (Section 1, "function writing" analogy)
- [x] Takeaway 4: Preview 6 component types — pass (Section 3.2, one paragraph each + callout box)
- [x] Takeaway 5: Preview pipeline model — pass (Section 3.3, 4 stages + scope hierarchy + CLI evidence)

### Voice & Persona

- [x] Staff Engineer perspective: framing for the industry, not tutorial — pass
- [x] Explanatory dev-blog tone: "here's what we found and how it works" — pass
- [x] Honest about emergence: acknowledges field is <1 year old — pass
- [x] Opinionated but grounded: takes position (CE > PE) with evidence — pass
- [x] No academic jargon: cites papers without reading like one — pass
- [~] Voice consistency throughout — warn: the "72 Hours" section reads slightly more journalistic than the rest (event-narration style vs the explanatory tone of other sections). Minor — may actually work as a deliberate pacing shift, but worth noting.

### Content Quality

- [x] Opening doesn't bury the lede — hooks immediately — pass
- [x] PE is treated respectfully before being superseded — pass (Section 1.1)
- [x] Claims backed by specific sources — pass (Schulhoff 58 techniques, Sahoo 767 cites, Mei 1400 papers, etc.)
- [x] "Function writing" analogy is original and effective — pass
- [x] Commands/plugins callout addresses taxonomy evolution clearly — pass
- [x] Agent harness framing builds naturally from convergence evidence — pass
- [~] Section 3.2 descriptions are uniform in structure — warn: all six types follow "X are Y that Z" pattern, which is clean but may feel like a listicle. Consider varying the sentence structure for 1-2 types to break the rhythm, or adding a brief concrete scenario to at least one.
- [~] The Karpathy "OS framing" (context window = RAM) is introduced but not developed — warn: it's a strong analogy that could anchor more of the post. Currently it's one sentence in Section 2. Consider referencing it again in Section 3.3 (pipeline model = OS boot sequence analogy) for thematic continuity.

### Sources & Citations

- [x] Schulhoff et al. (BIB-024) cited with specific claim (58 techniques, 6 categories) — pass
- [x] Sahoo et al. (BIB-025) cited with specific claim (767 citations) — pass
- [x] Karpathy tweet (BIB-010) quoted accurately — pass
- [x] Lutke tweet (BIB-011) quoted accurately — pass
- [x] Mei et al. (BIB-001) cited with specific claim (1400 papers) — pass
- [x] Hua et al. (BIB-002) cited for historical roots — pass
- [x] Willison (BIB-012) cited for term alignment insight — pass
- [x] Gupta (BIB-076) cited for agent harness framing — pass
- [~] Schmid (BIB-015) and LangChain (BIB-014) appear in timeline but not cited in prose — warn: they contributed distinct frameworks (7-component, 4-strategy). A brief mention in Section 2.2 prose (not just timeline) would strengthen the "cascade" narrative.

### Word Count & Pacing

- [x] Total ~2430 prose + ~600 component content = ~3030 effective — within 2500-3200 target — pass
- [x] Hook is concise (130 words) — pass
- [x] Close is tight (100 words) — pass
- [~] Section 3 is the longest (~520 prose + ~320 components = ~840 effective) — warn: this is the densest section. Consider whether the scope hierarchy CodeBlock and CLISnippet should move to a "Further reading" or "Evidence" callout rather than inline, to maintain narrative momentum. Readers who want evidence can expand the collapsibles; the main text should flow without requiring them.

### Components & Visuals

- [x] Tweet components placed correctly with fallback text — pass
- [x] Timeline component has URLs for all events with links — pass
- [x] OGCard components reference correct URLs — pass
- [x] DirTree shows plugin structure clearly — pass
- [x] PersonPopup IDs match planned people DB entries — pass
- [x] CodeBlock and CLISnippet marked as collapsible — pass
- [ ] No pipeline diagram — fail: the outline specified "pipeline diagram" as a planned visual but it's not in the draft. The pipeline model (Section 3.3) describes 4 stages in prose but has no visual representation. A simple flow diagram (build-time → session-start → on-demand → event-triggered) would reinforce the mental model far more effectively than prose alone.

### SEO & Frontmatter

- [x] Title under 60 chars: "What is Context Engineering?" (32 chars) — pass
- [x] Description 150-160 chars — pass (155 chars)
- [x] Primary keyword "context engineering" in title and description — pass
- [x] Tags include primary topic tags — pass
- [x] `draft: true` set correctly — pass
- [x] `featured: true` set — pass
- [~] Series tag `series` is generic — warn: consider `series:context-engineering` or a more specific tag for series linking

### Cross-Series Coherence

- [x] Post 2 preview mentions pipeline stages — consistent with Phase 2 plan — pass
- [x] Post 3 preview mentions 6 types + cross-platform — consistent with Phase 3 plan — pass
- [x] Posts 4-6 previews consistent with phase plans — pass
- [x] Cross-tool comparison mentioned as standalone companion — pass
- [x] No content from later posts spoiled prematurely — pass

**Summary**: 29 pass, 5 warn, 1 fail

### Action Items (all resolved 2026-03-25)

1. ~~**[FAIL]** Add pipeline diagram~~ — RESOLVED: PipelineDiagram placeholder added at top of Section 3.3 showing all 6 types mapped to their pipeline stages
2. ~~**[WARN]** Develop OS analogy~~ — RESOLVED: threaded through 3 touchpoints — introduced in Sec 2 (context window = RAM), developed in Sec 3.3 (pipeline = boot sequence, stages mapped to OS concepts), callback in Sec 4.2 (harness = OS distribution)
3. ~~**[WARN]** Vary Section 3.2 descriptions~~ — RESOLVED: Rules, Hooks, Memory, References rewritten with varied sentence structure (imperative, question-answer, narrative opening)
4. ~~**[WARN]** Schmid + LangChain in prose~~ — RESOLVED: added 2 sentences in Sec 2 noting their frameworks as evidence of convergence, without detailing components (that's Post 3). Timeline entries preserved.
5. ~~**[WARN]** Section 3.3 evidence flow~~ — RESOLVED: restructured so prose tells the narrative first ("Post 2 maps this in full depth. But if you want a preview..."), then evidence blocks follow as optional expansions
6. ~~**[WARN]** Tags~~ — NO CHANGE NEEDED: tags were already separate (`series` + `context-engineering`), not combined
