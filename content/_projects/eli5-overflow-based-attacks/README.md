# ELI5: Overflow-Based Attacks

> Boxes on a shelf — understanding how writing too much data into a container lets attackers hijack programs.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

An ELI5 introduction to overflow-based attacks covering the unifying pattern (writing past boundaries into adjacent memory), the major overflow types (stack, heap, integer), format string vulnerabilities as a cousin, real-world impact (Morris Worm through EternalBlue), and the mitigation arms race. Boxes-on-a-shelf analogy throughout — no assembly required. Serves as entry point to the stack and heap overflow deep-dive projects.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Source material: `content/.todo/eli5/eli5-overflows.mdx` (empty stub — to be removed once idea is approved)
- Sibling: eli5-injection-based-attacks (same ELI5 series)
- Gateway to deep-dives: stack-based and heap-based buffer overflow projects go deeper
- ELI5 format — shorter, visual, analogy-driven
- No exploit payloads or assembly — educational/defensive framing
- "Why Rust/Go exist" framing gives historical context to modern language choices
