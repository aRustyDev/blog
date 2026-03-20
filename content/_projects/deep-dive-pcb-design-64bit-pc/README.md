# Deep Dive: PCB Design - 64-Bit PC

> The ultimate challenge — BGA, DDR4/5, multi-gigabit interfaces, and an honest look at what one person can actually build.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A build log designing a 64-bit computer PCB using ARM64 or RISC-V 64, covering BGA packaging, controlled impedance, DDR4/5 routing, high-speed differential pairs (USB 3.x, PCIe, HDMI), power integrity, thermal management, multi-layer stackup design (8+ layers), and an honest assessment of what's achievable without professional EE resources. Limits-first approach: explores the practical boundaries of what a determined individual can accomplish.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Limits-first framing provides an honest assessment rather than pretending everything is achievable
- BGA packaging treated as the defining gatekeeper between hobby and professional PCB design
- SoM vs custom board trade-off analysis may be the most practically valuable section
- DDR4/5 pushes hobbyist PCB fabrication to its tolerances — honest about what works and what doesn't
- Power integrity introduced as a serious engineering discipline (PDN analysis, impedance targets)
- Prerequisite: 32-bit PC build log — assumes deep familiarity with signal integrity and multi-layer design
