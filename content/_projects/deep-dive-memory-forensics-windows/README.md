# Deep Dive: Memory Forensics — Windows

> From EPROCESS to injection detection — analyzing Windows RAM through the kernel structures that reveal what's really running.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A deep-dive into Windows memory forensics covering acquisition methods, Windows kernel data structures (EPROCESS, VAD, PEB/LDR, handle tables), Volatility 3 analysis organized by investigation phase, process injection technique detection (hollowing, reflective loading, APC injection), DKOM rootkit detection via pool tag scanning, credential extraction from LSASS memory, and memory-to-disk artifact integration. EPROCESS-first approach: starts with the process structure as the nucleus from which all other analysis radiates.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Sibling project: deep-dive-memory-forensics-linux
- Related: deep-dive-host-forensics-windows (disk artifacts complement memory analysis)
- May decompose into 2-3 posts: acquisition + process analysis, injection detection + DKOM, and credential forensics + advanced techniques
- Windows memory forensics is the most mature branch — benefits from pre-built profiles and extensive tooling
- Injection technique gallery is key differentiator for modern threat landscape
- Educational/DFIR context — defensive incident response focused
