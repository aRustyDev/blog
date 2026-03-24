---
version: 0.1.0
status: draft
---
# UMAP Topic Coverage Analysis

## READY (well-covered — can write directly)

- CE Definition — 14 sources, 9 primary. Strongest coverage by far.
- Agent Architecture — 12 sources, 8 primary. Rich academic + practitioner overlap.

## REVIEW (moderate — usable but may want a source or two more):

- Tool Use & MCP — 10 sources but only 3 primary focus. Breadth without depth.
- Memory Systems — 9 sources, good academic/practitioner balance (0.71).
- RAG — 8 sources, best balance score (0.83). Well-rounded.
- Prompt Engineering — 9 sources but only 1 primary. Mostly tangential coverage.
- Community & Terminology — 7 sources, 4 primary, but skews heavily practitioner (4.5 vs 1.0 academic).

## RESEARCH (gaps — need follow-up before writing)

- Production Engineering — only 6 sources, skews practitioner. No academic grounding on caching, latency, KV-cache patterns.
- SE Patterns — 6 sources, only 2 primary. The middleware/plugin/event-driven parallels are mentioned but never systematically mapped. This is a gap our taxonomy fills but we need stronger evidence.
- Multi-Agent — 5 sources, 1 primary. Thin.
- In-Context Learning — 4 sources, all academic, zero practitioner. Strong theory but disconnected from the rest of the narrative.
- Security & Control — 1 source. Essentially uncovered.

## Series Structure

### post boundaries

1. "What is Context Engineering?" — CE Definition + Community/Terminology (both ready)
2. "The Agent Architecture Behind It" — Agent Architecture + Tool Use + Memory (ready/moderate)
3. "From RAG to Context Pipelines" — RAG + Production Engineering (moderate/gap)
4. "SE Patterns for Context Systems" — SE Patterns + Multi-Agent (both gaps — needs Phase 2/3 research)
5. "The Theory: Why Context Structure Matters" — ICL + Prompt Engineering (academic heavy — needs practitioner bridge)

> Security could be a sidebar or folded into post 3.
