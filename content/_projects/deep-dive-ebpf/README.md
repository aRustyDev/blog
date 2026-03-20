# Deep Dive: eBPF

> From verifier guarantees to production systems — understanding the technology that made the Linux kernel programmable.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A deep-dive into eBPF covering the virtual machine and instruction set, the verifier that enables safe kernel-space programmability, map data structures for state sharing, the hook point atlas (kprobes, tracepoints, XDP, TC, LSM, fentry/fexit), BTF/CO-RE for portability, and real-world systems built on eBPF (Cilium, Tetragon, bpftrace). Verifier-first approach: starts with the eBPF verifier as the key innovation that makes everything else possible.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- May decompose into 2-3 posts: VM + verifier + maps, hook points + BTF/CO-RE, and real-world systems dissected
- Verifier-first framing differentiates from "what is eBPF" overview content
- Hook point atlas and map taxonomy are reference-quality sections
- Connects to security (Tetragon/Falco), networking (Cilium), and observability (bpftrace/Pixie)
- Educational context — systems engineering and Linux internals focused
