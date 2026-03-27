# Deep Dive: Graph-Based Agent Memory Implementation Patterns

> Implementing graph-based memory for AI agents with practical patterns using FalkorDB and Graphiti.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A technical implementation guide for building graph-based memory systems for AI agents. Covers the full architecture (entity extractor, relationship builder, graph store, temporal tracker, query engine, context injector), schema design with temporal properties and decay functions, entity extraction and resolution patterns, Cypher query patterns, context injection strategies, and honest lessons learned. Uses FalkorDB and the Graphiti temporal knowledge graph library. Pattern-first approach: presents reusable implementation patterns, not a one-off tutorial.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- NOTE: when idea is approved, remove `.todo/urgent/graph-memory-implementation-patterns.draft.md`
- Companion to deep-dive-benchmarking-agent-memory (this post = "how to build it," benchmark post = "which approach is better")
- Implementation-driven framing: "We needed X, implemented Y, learned Z"
- Entity resolution called out as the hardest unsolved problem
- Temporal decay as first-class concern, not an afterthought
- Target: 3500-4500 words, technical implementation guide with code examples and architecture diagrams
