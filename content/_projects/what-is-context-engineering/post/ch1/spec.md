---
type: post-spec
status: draft
parent: ../../phase/1-what-is-context-engineering.md
template: staff-eng.md
persona: staff-engineer
created: "2026-03-24T00:00:00Z"
updated: "2026-03-24T00:00:00Z"
---

# Post Spec: What is Context Engineering?

## Post Metadata

| Field | Value |
|-------|-------|
| **Title** | What is Context Engineering? |
| **Subtitle** | The discipline behind the context window |
| **Series** | Context Engineering (1 of 6) |
| **Persona** | Staff Engineer |
| **Template** | `.claude/templates/outlines/staff-eng.md` |
| **Target** | ~2500-3000 words (~10-12 min read) |

## Target Audience

Mid-to-senior software engineers and AI practitioners who build with LLM-powered tools (Claude Code, Cursor, Copilot, Windsurf) and create system prompts, skills, rules, or plugins — but lack a shared vocabulary for what they're doing. Comfortable with engineering concepts like modularity, testing, and composition. May have heard "context engineering" on Twitter/HN but haven't seen a rigorous definition.

**Not the audience**: ML researchers focused on model training; beginners who haven't used LLM tools; managers wanting a business case.

## Key Takeaways

A reader who finishes this post should:

1. **Define context engineering** in one sentence and distinguish it from prompt engineering — CE encompasses 6 component types flowing through a temporal pipeline, not just text prompts
2. **Know the origin story** — Lutke coined it (June 22, 2025), Karpathy amplified it (June 25), academic surveys formalized it within weeks, Gartner endorsed it by Q3
3. **Understand why "prompt" is too narrow** — production context includes persistent rules, event-driven hooks, external tools, cross-session memory, and reference documents, not just the text you type
4. **Preview the 6 component types** — skills, rules, hooks, memory, tools, references — as a teaser for Post 3
5. **Preview the pipeline model** — build-time → session-start → on-demand → event-triggered — as a teaser for Post 2

## Prerequisites

- Experience using at least one LLM-powered coding tool (Claude Code, Cursor, Copilot, or similar)
- Familiarity with the concept of a "system prompt" or "context window"
- No prior knowledge of "context engineering" as a term required

## Scope

### Included
- Definition of context engineering (Karpathy's + our refined version)
- Origin timeline: tweets → blog posts → academic surveys → Gartner endorsement
- Why "prompt engineering" is too narrow (the 6 other component types exist)
- The "agent harness" framing (BIB-076: model = commodity, harness = moat)
- Preview of the taxonomy and pipeline (teasers, not full treatment)
- Community landscape (7 communities, briefly)

### Excluded
- Detailed treatment of any single component type (that's Post 3)
- The pipeline model in depth (that's Post 2)
- SE pattern mapping (that's Post 4)
- Security analysis (that's Post 5)
- Implementation tutorials or code examples
- Academic comparison or literature review tone

## Narrative Arc

```
Hook: "You've been doing context engineering for months. You just didn't have a name for it."
  ↓
Problem: Practitioners create system prompts, skills, rules, hooks — but no shared vocabulary
  ↓
Origin: How the term crystallized in 72 hours (Lutke → Karpathy → community)
  ↓
Definition: CE = the discipline of designing what enters the context window, when, and how
  ↓
Why it matters: "prompt" trivializes the engineering work; CE encompasses 6 component types
  ↓
Preview: The 6 types (1 paragraph each, just enough to intrigue)
  ↓
Preview: The pipeline model (1 paragraph teaser)
  ↓
Close: "The model is commodity. The harness is the moat." (BIB-076)
```

## Code Examples

None — this is a conceptual/definitional post. Code examples begin in Post 3.

## Diagrams

None — this post is text-driven. The first diagram (pipeline flow) appears in Post 2.

## Key Sources (with planned usage)

| Source | How Used |
|--------|----------|
| BIB-010 Karpathy tweet | Opening definition: "the delicate art and science of filling the context window with just the right information for the next step" |
| BIB-011 Lutke tweet | Origin point: "the art of providing all the context for the task to be plausibly solvable by the LLM" |
| BIB-001 Mei et al. CE Survey | Academic validation: 1,400 papers analyzed, 69 citations — CE is now a formal discipline |
| BIB-002 Hua et al. CE 2.0 | Historical depth: traces CE concepts back 20+ years to HCI |
| BIB-024 Schulhoff Prompt Report | Contrast: 58 prompting techniques — shows what CE supersedes |
| BIB-076 Gupta Agent Harnesses | Closing framing: model = commodity, harness = moat |
| `research/communities.md` | Community landscape: 7 communities, timeline |

## Voice & Tone

- **Staff Engineer perspective**: framing a concept for the industry, not teaching a tutorial
- **Explanatory dev-blog**: "here's what we found and how it works"
- **Honest about what's emerging**: this field is <1 year old; acknowledge evolution
- **Opinionated but grounded**: take a position (CE > PE) with evidence
- **No academic jargon**: cite papers but don't write like one

## SEO Targets

| Field | Value |
|-------|-------|
| **Title** (< 60 chars) | What is Context Engineering? |
| **Description** (150-160 chars) | Context engineering is the discipline of designing what enters an LLM's context window, when, and how. A taxonomy of 6 component types. |
| **Primary keyword** | context engineering |
| **Secondary keywords** | prompt engineering, context window, LLM, AI agents, skills rules hooks |

## Self-Review

| Check | Status |
|-------|--------|
| Takeaways concrete and measurable? | Yes — 5 specific things the reader should know |
| Prerequisites clear and minimal? | Yes — just "used an LLM tool" |
| Scope achievable in word count? | Yes — definitional + origin + preview fits 2500-3000 |
| Narrative arc has clear progression? | Yes — hook → problem → origin → definition → preview → close |
| Sources sufficient for claims? | Yes — 6 sources + community map |
| Voice matches persona? | Yes — Staff Engineer framing |
