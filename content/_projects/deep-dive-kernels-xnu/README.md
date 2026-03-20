# Deep Dive: Kernels - XNU

> Apple's hybrid Mach+BSD kernel — understanding the three-layer architecture that powers every Apple device.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A deep-dive into XNU covering the Mach microkernel layer (tasks, threads, ports, IPC, virtual memory), the BSD layer (process model, POSIX compliance, networking, VFS, security), the glue that maps BSD abstractions onto Mach primitives, the IOKit driver model, the XNU scheduler, memory management, kernel extensions vs DriverKit/System Extensions, XNU security (MACF, sandboxing, code signing, AMFI), and Apple Silicon adaptations. Layers-first approach: structures the deep-dive around XNU's three distinct layers (Mach, BSD, IOKit) and how they interact.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- XNU is the kernel component of Darwin (Darwin = XNU + userland) — the Darwin deep-dive covers the broader OS while this focuses on kernel internals
- May decompose into 2-3 posts: Mach layer + BSD layer + glue, IOKit + scheduler + memory management, and security + Apple Silicon
- Layers-first framing differentiates from flat "XNU overview" content
- Mach IPC (ports and messages) is the architectural backbone connecting all three layers
- Connects to BSD deep-dive (XNU's BSD layer derives from FreeBSD), Darwin deep-dive (XNU is Darwin's kernel), and comparing-kernels (hybrid kernel case study)
