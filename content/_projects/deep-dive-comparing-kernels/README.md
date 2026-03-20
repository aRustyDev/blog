# Deep Dive: Comparing Kernels

> How Linux, FreeBSD, XNU/Darwin, and Windows NT solve the same fundamental problems differently — a tradeoffs-first comparison.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A side-by-side comparison of four major kernel implementations — Linux, FreeBSD, XNU/Darwin, and Windows NT — across every fundamental kernel responsibility: process/thread models, scheduling, memory management, filesystems, networking, security, drivers, IPC, and syscall interfaces. Uses a tradeoffs-first approach where every design decision is examined as a point in a design space with different optimizations for different goals, rather than declaring winners. This is the capstone of the kernels series — best read after the overview and at least one specific kernel deep-dive.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Capstone post for the kernels deep-dive series — synthesizes the individual kernel posts into a comparative framework
- Best read after deep-dive-kernels-overview and at least one of the specific kernel deep-dives (Linux, FreeBSD, XNU, Darwin)
- Tradeoffs-first framing avoids the "which kernel is best" trap — every design is a set of tradeoffs
- Comparison tables for each kernel responsibility make architectural differences immediately visible
- Covers where each kernel excels as natural consequences of design tradeoffs: Linux (scale/hardware support), BSD (networking/correctness), XNU (integration/security), Windows (backwards compatibility/enterprise)
- Licensing and development model comparison connects open-source philosophy to engineering outcomes
