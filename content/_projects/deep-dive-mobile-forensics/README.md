# Deep Dive: Mobile Forensics

> From acquisition to analysis — understanding mobile evidence extraction through the lens of OS internals and encryption architecture.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A deep-dive into mobile forensics covering the acquisition spectrum (logical through chip-off), iOS Data Protection and Android FBE encryption architectures, SQLite forensic recovery techniques, key artifact categories and their storage formats, commercial and open-source tool ecosystems, and the legal/procedural framework governing evidence handling. Architecture-first approach: each forensic technique is explained through the OS storage and encryption mechanisms it targets. Includes hands-on artifact examination and tool-agnostic methodology.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- May decompose into 2-3 posts: acquisition methods + encryption architecture, artifact analysis + deleted data recovery, and tools + legal framework
- Hands-on with test devices and SQLite artifact examination is essential
- Educational/DFIR context — defensive forensics and incident response focused
- BFU vs AFU distinction is a key teaching moment for encryption impact on forensics
