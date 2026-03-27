# Deep Dive: PCB Design - 16-Bit PC

> Stepping up from 8-bit to 68000 — where wider buses, DMA, and video output make PCB design genuinely challenging.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A build log designing a 16-bit computer PCB based on the 68000 or similar architecture, covering the jump in complexity (wider buses, more address space, DMA), multi-board design considerations, memory management, interrupt controllers, video output basics, and the engineering tradeoffs when moving beyond hobby-scale. Architecture-first approach: understanding 16-bit architecture decisions reveals why personal computers evolved the way they did.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Architecture-first framing connects design decisions to the historical Amiga/Atari ST/early Mac era
- Complexity scaling is explicitly compared against the 8-bit build at every stage
- Multi-board design (backplane, board-to-board connectors) introduced as a practical solution
- Video output as the first timing-critical PCB challenge in the series
- Prerequisite: 8-bit PC build log — builds directly on those skills and knowledge
