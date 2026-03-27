# Deep Dive: Reverse Engineering - Binary Ninja

> From multi-level ILs to automated analysis — understanding the modern binary analysis platform built around intermediate language innovation.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A deep-dive on Binary Ninja covering the IL hierarchy (Lifted IL, LLIL, MLIL, HLIL), the type system, Python scripting API, plugin development, binary patching, cross-references, decompiler quality, collaboration features, headless analysis, and licensing model comparison. IL-first approach: Binary Ninja's multi-level IL is its defining innovation that enables analysis techniques difficult or impossible in other tools.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- IL hierarchy walkthrough is the centerpiece — show what each level reveals about program behavior
- Compare decompiler output against IDA Hex-Rays and Ghidra on representative binaries
- Licensing reality section helps readers make informed purchasing decisions
- Scripting API design philosophy (IL-centric) differentiates from IDAPython's address-centric approach
- Connects to sibling RE tool deep-dives for cross-referencing
