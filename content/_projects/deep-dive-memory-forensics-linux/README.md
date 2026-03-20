# Deep Dive: Memory Forensics — Linux

> From task_struct to rootkit detection — analyzing Linux RAM through the kernel data structures that forensic tools traverse.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A deep-dive into Linux memory forensics covering acquisition methods (LiME, AVML, VM snapshots), the ISF profile/symbol generation challenge, key kernel data structures that Volatility parses (task_struct, mm_struct, files_struct, module), rootkit detection through memory analysis, KASLR/KPTI handling, and fileless malware detection. Kernel-structure-first approach: each analysis technique is explained through the kernel data structure it traverses, connecting tool output to what's actually in memory.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Source material: `content/.todo/dfir/memory/linux-memory-forensics.mdx` (empty stub — to be removed once idea is approved)
- Related: deep-dive-host-forensics-linux (disk artifacts complement memory analysis)
- May decompose into 2-3 posts: acquisition + profile generation, process/network analysis, and rootkit/fileless malware detection
- The profile/symbol problem is the #1 barrier to Linux memory forensics adoption — deserves dedicated coverage
- Rootkit lab with controlled specimens (Diamorphine, Reptile) is essential for detection demonstrations
- Educational/DFIR context — defensive incident response focused
