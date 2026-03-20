# Deep Dive: Go Internals

> From goroutine scheduling to garbage collection — how the Go runtime powers Go's simplicity.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A deep-dive on Go internals covering the goroutine scheduler (GMP model), memory allocator (mcache, mcentral, mheap), garbage collector (tri-color mark-and-sweep, write barriers, GC pacing), channel implementation, interface dispatch (itables), defer/panic/recover mechanics, stack growth and copying, and runtime profiling tools. Runtime-first approach: Go's simplicity is powered by a sophisticated runtime.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Runtime-first framing differentiates from Go tutorial content
- GMP scheduler model and tri-color GC are the core reference sections
- Connects to Rust vs Go comparison project for language evaluation context
- Educational context — systems programming and runtime internals focused
