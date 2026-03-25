---
globs:
  - "content/_drafts/**/*.md"
  - "content/_drafts/*.md"
  - "src/data/blog/**/*.md"
  - "src/data/blog/*.md"
---

# AI Signal Detection — Blog Post Review Rule

When reviewing or writing blog post drafts, apply this AI signal detection checklist. This is a BLOCKING requirement for all `/blog post review` commands and should be checked during `/blog post draft` as well.

## Severity Levels

- **FLAG** — Rewrite required. Widely recognized as AI-generated.
- **WATCH** — Acceptable in isolation, problematic in clusters. 3+ WATCH items in one section = treat as FLAG.
- **WARN** — Ask the user before using. May be warranted but needs explicit approval.

## Structural Patterns

| Pattern | Severity |
|---------|----------|
| Triple parallel structure ("X isn't just Y — it's Z") | FLAG |
| Balanced paragraph pairs (identical length, complementary points) | FLAG |
| Colon-then-triple-list ("Three areas: A, B, and C") | WATCH |
| Every bullet same length | WATCH |
| Perfect topic-sentence-then-evidence in every paragraph | WATCH |
| Suspiciously balanced sections (same structure, same # bullets) | FLAG |
| "X. Here's why." / "X. And it matters." one-sentence-paragraph setups | WATCH |
| Numbered "N reasons why" / "N things you need to know" clickbait | FLAG |

## Lexical Patterns

### FLAG Words (rewrite immediately)
"spearheaded", "leveraged", "synergized", "fostered", "cultivated", "orchestrated", "transformative", "holistic", "empower", "delve", "tapestry", "multifaceted", "pivotal", "groundbreaking", "game-changing", "revolutionary"

### WATCH Words (acceptable in isolation, problematic in clusters)
"cutting-edge", "innovative" (self-describing), "passionate about", "driven/drive", "navigate" (metaphorical), "landscape" (metaphorical), "robust", "seamless", "streamline", "furthermore", "moreover", "additionally", "it's worth noting", "it's important to note", "in conclusion", "to summarize", "let's dive in", "let's explore", "without further ado"

### WARN: "harness" (context-specific)
The word "harness" is a WATCH word in general AI writing but is a LEGITIMATE TERM in this blog's context engineering taxonomy (BIB-076 "Agent Harnesses"). Use freely when referring to the agent harness concept. Flag when used as a generic verb ("harness the power of").

## Tonal Patterns

| Pattern | Severity |
|---------|----------|
| Diplomatic hedging ("While there are challenges, opportunities are significant") | WATCH |
| Performative humility ("I would be honored to contribute") | FLAG |
| Universal claims ("in today's fast-paced environment") | WATCH |
| Motivation-before-action ("Driven by desire to X, I built Y") | WATCH |
| Nested qualifiers ("I believe my experience could potentially help") | FLAG |
| Mirror-image sentences ("Not only did I X, but I also Y") | FLAG |
| Over-hedging ("it could be argued", "one might consider", "perhaps") | WATCH |
| Hollow affirmations before substance ("Great question!", "That's important") | FLAG |

## Filler Phrases (FLAG — remove on sight)

- "It's worth noting that"
- "It's important to note that"
- "In conclusion"
- "To summarize"
- "Let's dive in" / "Let's explore" / "Let's take a look"
- "Without further ado"
- "At the end of the day"
- "In this section we will"
- "As mentioned above/earlier"

## Density Rules

| Rule | Threshold | Action |
|------|-----------|--------|
| Buzzwords | >2 flagged words per sentence | Rewrite |
| Em-dashes (agent-discovered) | >0 anywhere | ILLEGAL — rewrite immediately. Em-dashes found by Claude/agents require human permission to keep. Remove all em-dashes and rewrite using periods, colons, commas, or parentheses. |
| Em-dashes (programmatic/CI) | >0 anywhere | WARN — flag for human review. Em-dashes caught by CI, pre-commit hooks, or automated checks are WARN severity. |
| Semicolons | >1 per paragraph | Split or restructure |
| Adjective stacking | >2 adjectives before a noun | Cut to 1 |
| Passive voice | >2 passive constructions per section | Rewrite to active |

## Em-Dash Policy

Em-dashes (—) have **two severity levels** depending on discovery method:

### Agent-discovered (ILLEGAL)
When Claude or any AI agent discovers em-dashes during writing or review:
- **Remove immediately.** Do not ask, do not evaluate, do not keep.
- Rewrite using periods, colons, commas, or parentheses.
- Em-dashes require explicit human permission to exist in the final text.

### Programmatically discovered (WARN)
When CI, pre-commit hooks, or automated tooling flags em-dashes:
- Flag as WARN for human review.
- Human decides whether each instance is warranted.

### Common rewrites:
- "X — Y" → "X. Y" (two sentences)
- "X — Y — Z" → "X (Y) Z" (parenthetical)
- "A, B — and C" → "A, B, and C" (serial comma)
- "X — content — Y" → "X: content. Y" (colon + period)

## Authentic Voice Indicators (what GOOD writing looks like)

- Short declarative sentences mixed with longer ones
- Parenthetical asides that show personality
- Contractions used naturally
- Direct claims backed by specific numbers/sources
- Humor or self-awareness without performing it
- Opinions stated as opinions ("I think", "we found") not as universal truths
- Concrete examples from actual experience, not hypotheticals

## Application Process

When reviewing a blog post draft:

1. **Scan each section** for FLAG patterns — any found require rewrite
2. **Count WATCH patterns** per section — 3+ in one section = treat as FLAG
3. **Check density rules** (buzzwords, em-dashes, semicolons, adjective stacking)
4. **Flag every em-dash** — note each with WARN, evaluate if warranted
5. **Read the opening paragraph aloud** — does it sound like a person talking?
6. **Check for listicle uniformity** — are all items the same structure/length?
7. **Verify voice matches persona** — compare against the post spec's voice guidelines

## Review Output Format

Include an `### AI Signals` section in every post review with:

```markdown
### AI Signals

- FLAG items: N (must fix)
- WATCH items: N (fix if 3+ per section)
- WARN items: N (em-dashes + items needing approval)
- Em-dashes found: N (list locations)
- Density violations: N

[Details of each finding with line reference and suggested fix]
```
