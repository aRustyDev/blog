# Deep Dive: PCB Design - 32-Bit PC

> Where hobby meets professional EE — DDR memory, signal integrity, and multi-layer stackups change everything.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A build log designing a 32-bit computer PCB using ARM or RISC-V, covering SoC vs discrete design decisions, DDR memory interfacing challenges, high-speed signal integrity, multi-layer PCB design (4-layer and 6-layer stackups), boot firmware, and the point where PCB design transitions from hobby to engineering discipline. Complexity-first approach: 32-bit is where the rules change and amateur techniques start to fail.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Complexity-first framing explicitly calls out the hobby-to-professional inflection point
- DDR memory routing treated as the central PCB design challenge at this level
- Signal integrity introduction: transmission lines, impedance control, return paths, crosstalk
- Multi-layer stackup design (4-layer, 6-layer) as engineering decisions, not just cost increases
- Boot firmware (U-Boot, device tree) covers the often-overlooked software side of custom hardware
- Prerequisite: 16-bit PC build log — assumes familiarity with wider buses and more complex systems
