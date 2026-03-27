# Deep Dive: Benchmarking Agent Memory

> Empirically benchmarking three agent memory architectures — Zep, GraphRAG, and Vector RAG — with hypothesis-driven methodology and reproducible results.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

This project is an empirical benchmark study comparing three agent memory architectures: Zep (temporal knowledge graphs), GraphRAG (Microsoft's knowledge graph approach), and Vector RAG (traditional embedding-based retrieval). Using a hypothesis-driven scientific framing, the post presents original benchmark results across five task categories (entity recall, temporal reasoning, relationship queries, fact retrieval, contradiction detection) with the custom DMR (Dialogue Memory Retrieval) accuracy metric. Key finding: structured memory (Zep at 94.8%) significantly outperforms graph-based (GraphRAG ~75-85%) and pure vector retrieval (~60-70%). All results include confidence intervals, statistical significance, failure analysis, and actionable when-to-use guidance.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- NOTE: when idea is approved, remove `.todo/urgent/benchmarking-agent-memory.draft.md`
- Evidence-first approach: vendor claims are marketing, not evidence
- Sequel project: deep-dive-graph-agent-memory-implementation (implementation guide)
- Target visuals: architecture comparison diagram, results charts, cost table, failure examples
