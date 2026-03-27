# Deep Dive: Semantic Testing for AI Skills

> Beyond unit tests — a methodology for evaluating AI components with fuzzy, non-deterministic outputs.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A research-oriented deep-dive on semantic testing — a novel evaluation methodology for AI skills, plugins, prompts, and context documents where traditional unit testing fails due to non-deterministic outputs. Methodology-first approach: presents a reusable framework with a semantic assertion taxonomy, testing pyramid, YAML-based test specifications, multi-evaluator pipeline, and proposed metrics. Includes early results from testing Claude skills and honest acknowledgment of the methodology's limitations.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Research/methodology contribution — framework is the primary value, not just results
- Connects property-based testing (QuickCheck/Hypothesis) and LLM evaluation (HELM/BigBench) to a new problem space
- YAML test specification format should be immediately adoptable by readers
- Non-determinism handling (multi-trial, pass rates, stability scores) is the key differentiator from traditional testing
- Early-stage work — be humble about results, invite collaboration
- NOTE: when idea is approved, remove .todo/urgent/semantic-testing-ai-skills.draft.md
