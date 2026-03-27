# Deep Dive: Heap-Based Buffer Overflows

> From allocator internals to exploitation techniques — understanding heap corruption at the memory level.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A deep-dive into heap-based buffer overflows covering ptmalloc2 allocator internals, classic and modern exploitation techniques (unlink, fastbin dup, tcache poisoning), mitigations and bypasses, and hands-on exploitation with GDB/pwndbg. Allocator-first approach: each technique is explained through the allocator behavior it targets. Includes real CVEs as concrete examples.

## Artifacts

- [Idea](./idea.md)
- [Plan](./plan.md)
- [Research Report](./research/reports/main.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Source material: `content/.todo/deep-dives/deep-dive-heap-based-buffer-overflows.mdx` (empty stub — to be removed once idea is approved)
- Requires hands-on lab setup (Ubuntu with specific glibc version)
- May decompose into multiple posts during content planning (allocator internals + techniques + mitigations)
- Educational/defensive security context — CTF and vulnerability research focused
