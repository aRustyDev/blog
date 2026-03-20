# Deep Dive: Kernels - Unikernels

> Library operating systems and minimal kernel images — what if we only included what we actually need?

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A deep-dive into unikernels covering the unikernel concept and the library OS model (linking OS functionality as libraries rather than running a separate kernel), major implementations (MirageOS, Unikraft, IncludeOS, Nanos, OSv, HermiTux) and the different approaches each takes, the security argument (minimal attack surface — no shell, no unnecessary syscalls, no multi-user), performance characteristics (no context switches, no syscall overhead, single address space), deployment models (hypervisor-based, bare-metal, cloud), the real tradeoffs (debugging difficulty, single-process model, ecosystem maturity), comparison to containers and serverless, production use cases and adoption barriers, and the future of unikernels in the cloud-native era. Minimalism-first approach: every design decision is framed through the question of what happens when you strip an OS down to only what the application needs.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Minimalism-first framing connects every unikernel design decision to the principle of including only what is needed
- Library OS model explanation demystifies the core abstraction that distinguishes unikernels from traditional kernels
- Implementation survey covers six major projects as a design space, not a flat list
- Honest tradeoff assessment balances the security and performance benefits against real-world pain points
- Container vs unikernel comparison explains why containers won adoption despite unikernels' theoretical advantages
- Sibling projects cover BSD, Darwin, Linux, and XNU for cross-kernel comparison
