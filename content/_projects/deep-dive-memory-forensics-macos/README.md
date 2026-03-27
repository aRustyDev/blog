# Deep Dive: Memory Forensics — macOS

> From XNU kernel structures to acquisition reality — memory analysis on the platform that's trying hardest to prevent it.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A deep-dive into macOS memory forensics covering the acquisition landscape (what Apple has closed off and what remains), XNU/Mach kernel data structures (proc, task, Mach ports, vm_map), KDK-based Volatility profiling, alternative acquisition strategies when full memory capture isn't possible, Mach IPC forensics, and spyware detection through memory analysis. Acquisition-reality-first approach: honestly addresses what's possible on modern Macs before diving into analysis techniques.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Siblings: deep-dive-memory-forensics-linux, deep-dive-memory-forensics-windows
- Related: deep-dive-host-forensics-macos (disk artifacts complement memory analysis)
- macOS memory forensics is the least mature branch — acquisition constraints are the defining challenge
- VM-based acquisition (VMware Fusion/UTM snapshots) is the most practical path for lab work
- XNU source code is open — can reference actual structure definitions
- May decompose into 2 posts: acquisition landscape + alternatives, and XNU analysis + malware detection
- Educational/DFIR context — defensive incident response and security research focused
