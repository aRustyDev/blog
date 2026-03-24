---
type: post-outline
status: draft
parent: ./spec.md
template: staff-eng.md
created: "2026-03-24T00:00:00Z"
updated: "2026-03-24T00:00:00Z"
---

# Outline: What is Context Engineering?

**Template**: staff-eng.md (adapted — Context → Problem Framing → Approach → Impact → Learnings flow)
**Target**: ~2700 words (range: 2500-3000)
**Diagrams**: None
**Code examples**: None

---

## Hook (100-120 words)

Open with recognition, not definition:

> "You've been doing context engineering for months. You just didn't have a name for it."

- Every `.cursorrules` file, every CLAUDE.md, every system prompt, every MCP server config — that's context engineering
- The field crystallized in June 2025 when two tweets gave it a name
- This post defines what context engineering actually is, where the term came from, and why it matters more than "prompt engineering" ever did
- Series preview: this is Post 1 of 6

**Transition**: "But to understand what context engineering is, we need to understand what it replaced."

---

## 1. The Problem: Prompt Engineering Hit Its Ceiling (350-400 words)

### 1.1 What Prompt Engineering Actually Covers
- Schulhoff et al. [BIB-024] cataloged 58 distinct prompting techniques in 6 categories
- Sahoo et al. [BIB-025] produced the most-cited PE survey (767 citations)
- These are real techniques — few-shot examples, chain-of-thought, role prompting, structured output
- PE is a legitimate discipline, not "just typing into a chatbox"

### 1.2 Where It Breaks Down
- Production AI tools don't just have prompts — they have:
  - Persistent rules that activate on file patterns
  - Event-driven hooks that fire before/after tool calls
  - External tools accessed via protocols like MCP
  - Cross-session memory that learns from past conversations
  - Reusable skills invoked by slash commands
- "Prompt engineering" doesn't describe any of this
- Karpathy [BIB-010]: "I think the word 'prompt' trivializes what actually happens"

### 1.3 The Naming Gap
- Practitioners were building these systems without a shared vocabulary
- No way to compare approaches across tools (Claude Code, Cursor, Copilot, Windsurf)
- No framework for evaluating which components to build or how to structure them

**Transition**: "Then, in June 2025, the vocabulary arrived."

---

## 2. Origin: 72 Hours That Named a Discipline (350-400 words)

### 2.1 The Tweets
- **June 22, 2025**: Tobi Lutke (Shopify CEO) tweets [BIB-011]: "the art of providing all the context for the task to be plausibly solvable by the LLM"
- **June 25, 2025**: Andrej Karpathy amplifies [BIB-010]: "the delicate art and science of filling the context window with just the right information for the next step"
- Karpathy adds the OS framing: LLMs are a new kind of operating system; the context window is RAM

### 2.2 The Cascade
- **June 27**: Simon Willison [BIB-012] connects Lutke + Karpathy, identifies 7 context categories
- **June 30**: Phil Schmid [BIB-015] publishes 7-component framework — 915 HN points
- **July 2**: LangChain [BIB-014] publishes 4-strategy framework (writing, selecting, compressing, isolating)
- **July 17**: Mei et al. [BIB-001] publish the first comprehensive academic survey — 1,400 papers analyzed, 69 citations
- **Q3 2025**: Gartner declares "context engineering is in, prompt engineering is out"

### 2.3 Why It Stuck
- "Context engineering" carries closer alignment to its intended meaning than "prompt engineering" [BIB-012]
- The term encompasses everything that enters the context window, not just what you type
- Hua et al. [BIB-002] trace the concept back 20+ years to HCI research — the term was new, but the practice wasn't

**Transition**: "So what exactly IS context engineering?"

---

## 3. Definition: What Context Engineering Actually Is (400-500 words)

### 3.1 The Working Definition
- **Context engineering** is the discipline of designing what information enters an LLM's context window, when it enters, and through what mechanism
- Not just text — it includes tool schemas, memory, event-triggered content, and system-level injections
- Mei et al. [BIB-001]: "a formal discipline that transcends simple prompt design to encompass the systematic optimization of information payloads for LLMs"

### 3.2 The Six Component Types (preview)
One paragraph each — enough to intrigue, not enough to fully explain (that's Post 3):

1. **Skills** — reusable, invocable prompt templates (e.g., `/blog-workflow:brainstorm`)
2. **Rules** — persistent behavioral constraints, optionally gated by file patterns (e.g., `.claude/rules/cf-wrangler.md` activates only when editing Wrangler config)
3. **Hooks** — event handlers that fire on system lifecycle events (e.g., `PreToolUse` can block dangerous commands)
4. **Memory** — persistent state that survives across sessions (e.g., auto-memory that learns your preferences)
5. **Tools** — external capabilities via MCP protocol (e.g., arXiv search, web scraping)
6. **References** — static documents loaded on demand (e.g., templates, ADRs)

### 3.3 The Pipeline Model (preview)
- These components don't all load at once — they flow through a temporal pipeline:
  - **Build-time**: plugins installed, servers registered
  - **Session-start**: CLAUDE.md loaded, rules discovered, memory recalled
  - **On-demand**: skills invoked, tools called, references read
  - **Event-triggered**: hooks fired, system reminders injected, context compacted
- Each stage has its own ordering rules, triggers, and gates
- Full treatment in Post 2

**Transition**: "This isn't just a Claude Code thing. Every major AI coding tool has converged on similar architecture."

---

## 4. Convergence: All Roads Lead Here (300-350 words)

### 4.1 Cross-Tool Validation
- Claude Code, Cursor, Copilot, and Windsurf all implement variants of these 6 component types
- MCP is now universal (donated to Linux Foundation, Dec 2025)
- Glob-gated rules exist in all 4 tools (different syntax, same concept)
- AGENTS.md is emerging as a cross-tool instruction standard

### 4.2 The Agent Harness Framing
- Gupta [BIB-076]: "2025 was agents. 2026 is agent harnesses."
- The model is commodity — same Claude, same GPT-4, same Gemini
- The harness (context engineering, tool orchestration, memory) is the competitive moat
- Manus rewrote their harness 5 times; LangChain re-architected Deep Research 4 times; Vercel cut 80% of tools to improve results
- You're not building prompts. You're building a harness.

**Transition**: "This series maps the harness."

---

## 5. What's Coming: The Series Roadmap (200-250 words)

Brief preview of Posts 2-6:

- **Post 2**: The Context Pipeline — how AI tools actually load information through 4 temporal stages
- **Post 3**: A Taxonomy of Context Components — the 6 types in depth, with cross-platform comparison
- **Post 4**: Software Engineering Patterns — 14 classical SE patterns that map to context engineering
- **Post 5**: Securing the Context Pipeline — trust boundaries, prompt injection, guardrails
- **Post 6**: Memory, RAG, and the Future — where context engineering is heading

Each post builds on the vocabulary established here but can stand alone.

---

## Close (100-120 words)

Return to the opening:

> "You've been doing context engineering. Now you have the vocabulary."

- The term crystallized in 72 hours, but the practice has been building for years
- Every .cursorrules file, every CLAUDE.md, every MCP config is a context component
- The difference between a good AI coding assistant and a great one isn't the model — it's the harness
- "The model is commodity. The harness is the moat."

---

## Word Estimate Summary

| Section | Words | % of Total |
|---------|-------|-----------|
| Hook | 110 | 4% |
| 1. Prompt Eng Ceiling | 375 | 14% |
| 2. Origin Story | 375 | 14% |
| 3. Definition | 450 | 17% |
| 4. Convergence | 325 | 12% |
| 5. Series Roadmap | 225 | 8% |
| Close | 110 | 4% |
| **Section transitions** | ~80 | 3% |
| **Subtotal prose** | **~2050** | **76%** |
| **Quotes, callouts, lists** | ~650 | 24% |
| **Total** | **~2700** | 100% |

Target: 2500-3000. Estimate: ~2700. Within range.

## Takeaway Coverage

| Takeaway (from spec) | Section |
|---------------------|---------|
| 1. Define CE, distinguish from PE | Section 3.1 |
| 2. Know the origin story | Section 2 |
| 3. Understand why "prompt" is too narrow | Section 1.2 |
| 4. Preview 6 component types | Section 3.2 |
| 5. Preview pipeline model | Section 3.3 |

All 5 takeaways covered.

## Self-Review

| Check | Status |
|-------|--------|
| Structure follows staff-eng template flow? | Yes — Context → Problem → Definition → Impact → What's Next |
| Word estimates sum to target? | Yes — ~2700 within 2500-3000 range |
| All takeaways covered? | Yes — 5/5 mapped to sections |
| Narrative arc matches spec? | Yes — hook → problem → origin → definition → preview → close |
| No code examples (per spec)? | Yes — concept-only |
| No diagrams (per spec)? | Yes — text-driven |
| Transitions between sections? | Yes — 5 explicit transitions planned |
| Sources cited where claims made? | Yes — 8 BIB entries allocated to specific claims |
