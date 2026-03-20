# Project: Solving the Context Drift Problem

> npm/cargo for Claude Code context components — content-addressed dependency management for markdown-based AI configuration.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A content-addressed build system for reusable Claude Code components (agents, skills, rules, templates). Solves copy-paste drift by tracking SHA256 hashes of canonical components, detecting when plugin copies are stale, and providing update-or-fork workflows via `just plugin:build`. Components live in one place, plugins reference them via plugin.sources.json manifests, and intentional divergence is marked as "forked" so the system leaves it alone.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Build-system-first approach — dependency management, not discipline
- Content-addressed (SHA256) rather than version-numbered — simpler, more reliable
- Fork-aware — intentional divergence is a first-class concept
- Uses existing `just` task runner for workflow integration
- Start with single-repo scope, cross-repo is future work
- Real-world validation against terraform/infrastructure/cloud-ops plugins
