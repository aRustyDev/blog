# Deep Dive: Kernels - BSD

> From 4.4BSD-Lite to modern variants — understanding BSD kernel architecture and the Unix heritage that shapes every design decision.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A deep-dive into BSD kernels covering the kernel architecture and heritage-first design philosophy, the four major variants (FreeBSD, OpenBSD, NetBSD, DragonflyBSD) and what each optimizes for, the process model and virtual memory subsystem, the networking stack (BSD sockets as the origin of the universal sockets API), the VFS layer, security mechanisms (jails, Capsicum, pledge/unveil), the kqueue event system, the BSD build system ("making world"), and how BSD kernels compare in philosophy to Linux. Heritage-first approach: BSD's direct lineage from Unix research at Bell Labs and Berkeley informs every architectural choice.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Heritage-first framing connects every BSD design decision back to the Unix research tradition
- Variant comparison matrix shows how FreeBSD, OpenBSD, NetBSD, and DragonflyBSD each optimized for different priorities
- BSD sockets origin story provides historical context for an API every network programmer uses
- Security section covers jails, Capsicum, and pledge/unveil as distinct philosophies from Linux's approach
- "Making world" as a lens for understanding the integrated base system philosophy
- Sibling projects cover Linux, Darwin, XNU, and unikernels for cross-kernel comparison
