# Feature: Semantic Search for ADRs

> Replacing grep with meaning — embedding-powered discovery for Architecture Decision Records.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A project-oriented deep-dive on adding semantic search to an ADR CLI tool as an open-source contribution. Covers the discovery problem (keyword search fails for conceptual queries across growing ADR collections), the implementation (ADR parsing, section-level embeddings, vector storage, similarity search), CLI integration, preliminary evaluation against keyword baselines, and the broader vision for ADR tooling as context engineering infrastructure. Contribution-first approach: developed in collaboration with the tool's maintainer.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Open-source contribution — credit maintainer, describe collaboration process
- Implementation post with actual code examples readers can adapt
- Evaluation rigor matters even for preliminary results — show precision@k, recall, MRR
- Connects to the broader context engineering theme (ADRs as persistent architectural context)
- Part of larger ADR tooling vision (distributed stores, scoping, relationship visualization)
- NOTE: when idea is approved, remove .todo/urgent/semantic-search-adrs.draft.md
