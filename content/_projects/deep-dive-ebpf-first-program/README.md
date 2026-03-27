# Deep Dive: eBPF — Writing Your First eBPF Program

> From hello world to process monitor — building a real eBPF tool with libbpf and C, the modern way.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A hands-on build-along that walks through writing a complete eBPF program using the modern libbpf/C/CO-RE approach. Progresses from a minimal tracepoint "hello world" through maps and ring buffers to a working process execution monitor. Covers the full development cycle: environment setup, build pipeline, kernel program, userspace loader, verifier error debugging, and cross-kernel portability. Build-along-first approach: theory serves code, not the other way around.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Source material: `content/.todo/ebpf/writing-your-first-ebpf-program.mdx` (empty stub — to be removed once idea is approved)
- Prerequisite: deep-dive-ebpf (overview provides the conceptual foundation)
- Sibling: deep-dive-ebpf-internals (goes deeper into kernel implementation)
- Every code example MUST compile and run — tutorial accuracy is critical
- libbpf-bootstrap as reference project structure
- Progressive build: hello world → maps → ring buffer → process monitor
- Educational context — hands-on systems programming tutorial
