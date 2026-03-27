# Deep Dive: Zig Overview

> Better C without being C++ — the systems language that achieves power through simplicity.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

An overview of the Zig programming language covering design philosophy (no hidden control flow, no hidden allocations), comptime (compile-time code execution replacing macros and generics), the allocator interface (explicit allocators as first-class concept), error handling (error unions), C interop (drop-in C compiler replacement, direct C header import), the build system (build.zig), and cross-compilation. Simplicity-first approach: Zig achieves power through simplicity rather than abstraction.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Simplicity-first framing differentiates from "new language hype" content
- Comptime and allocator interface are the key distinctive features to emphasize
- C interop story (zig cc, @cImport) is a major practical differentiator
- Connects to C overview for understanding what Zig improves upon
- Real-world validation through Bun and TigerBeetle adoption
