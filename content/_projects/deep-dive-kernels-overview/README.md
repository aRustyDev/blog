# Deep Dive: Kernels - Overview

> Understanding what kernels are, how they work, and why their design decisions shape every operating system you use.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A deep-dive overview of operating system kernels covering the kernel's role (hardware abstraction, resource management, security boundary), kernel architectures (monolithic, microkernel, hybrid, exokernel, unikernel — with real examples), core responsibilities (process management, memory management, I/O, filesystems, networking, IPC, security), the syscall interface as the user-kernel boundary, privilege rings and the protection model, the boot process end-to-end, and kernel development considerations. Fundamentals-first approach: every kernel makes the same core decisions differently, and understanding the questions matters more than memorizing one kernel's answers.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- This is the entry point for the kernels series — read this before the specific kernel deep-dives
- Fundamentals-first framing provides the vocabulary and mental model for all subsequent kernel posts
- Architecture taxonomy (monolithic, microkernel, hybrid, exokernel, unikernel) with concrete examples grounds theory in reality
- Syscall interface and privilege ring sections are reference-quality foundations
- Connects to child deep-dives on Linux, BSD, Darwin, XNU, and unikernels, plus a comparative analysis sequel
