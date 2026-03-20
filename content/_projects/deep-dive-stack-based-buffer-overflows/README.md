# Deep Dive: Stack-Based Buffer Overflows

> From call convention to ROP chain — understanding the foundational memory corruption vulnerability at the machine level.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A deep-dive covering x86-64 stack layout, buffer overflow mechanics, shellcode injection, and the mitigation/bypass arms race (canaries, NX, ASLR, ROP). Call-convention-first approach: the vulnerability emerges naturally from how function calls work. Hands-on with GDB/pwndbg throughout. Serves as prerequisite for the heap-based buffer overflow deep-dive.

## Artifacts

- [Idea](./idea.md)
- [Plan](./plan.md)
- [Research Report](./research/reports/main.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Source material: `content/.todo/deep-dives/deep-dive-stack-based-buffer-overflows.mdx` (empty stub — to be removed once idea is approved)
- Prerequisite for: deep-dive-heap-based-buffer-overflows
- Requires exploitation lab setup (Ubuntu, specific compiler flags, ASLR control)
- May decompose into 2 posts: fundamentals (overflow + shellcode) and mitigations (NX + ASLR + ROP)
- Educational/defensive security context
