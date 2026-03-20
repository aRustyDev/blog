# Deep Dive: Kernels - Linux

> The monolithic kernel that runs everywhere — from embedded watches to supercomputers, understanding the design decisions behind the world's most deployed kernel.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A deep-dive into the Linux kernel covering the monolithic-but-modular architecture, process scheduling (CFS to EEVDF), memory management (virtual memory, page cache, OOM killer, memory cgroups), the VFS layer and filesystem diversity, the network stack (Netfilter, eBPF, XDP), namespaces and cgroups (the building blocks of containers), security frameworks (SELinux, AppArmor, seccomp-bpf, capabilities), the kernel module system, the development process, and syscall interface stability guarantees. Scale-first approach: every design decision is framed through the lens of a kernel that must run on everything from watches to data centers.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Scale-first framing differentiates from textbook OS treatments — Linux's unique challenge is running everywhere
- Container primitives (namespaces, cgroups, seccomp-bpf, capabilities) get special attention as the kernel's most impactful modern contribution
- Scheduler evolution narrative (O(n) to O(1) to CFS to EEVDF) illustrates how kernel design responds to changing workloads
- Connects to sibling deep-dives on BSD, Darwin/XNU, and unikernels for cross-kernel comparison
- Production failure patterns (OOM kills, scheduler issues, security misconfigs) ground the theory in practice
