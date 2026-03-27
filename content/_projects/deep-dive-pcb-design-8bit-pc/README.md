# Deep Dive: PCB Design - 8-Bit PC

> From Ben Eater breadboard to a proper PCB — designing an 8-bit computer where you understand every signal.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A build log designing an 8-bit computer on a PCB, covering 6502/Z80 CPU selection, address decoding, clock circuits, ROM/RAM interfacing, I/O (UART, GPIO), power regulation, schematic design in KiCad, PCB layout for through-hole components, and testing/debugging strategies. Simplicity-first approach: an 8-bit PC is complex enough to be interesting but simple enough to understand every signal on the board.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Simplicity-first framing makes this the ideal first computer PCB project
- Breadboard-to-PCB transition is the core narrative — what changes and what stays the same
- Through-hole/DIP component focus keeps assembly accessible for beginners
- CPU selection (6502 vs Z80) is analyzed from a PCB design perspective, not just programming
- Part of the PCB design series — builds on the overview, siblings with 16-bit, 32-bit, 64-bit, and keyboard
