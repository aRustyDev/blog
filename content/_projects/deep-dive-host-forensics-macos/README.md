# Deep Dive: Host Forensics — macOS

> From Unified Logs to TCC databases — investigating Apple endpoints through the artifacts that Apple's security architecture creates.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A deep-dive into macOS host forensics covering Unified Logging as the primary telemetry source, APFS snapshot forensics, TCC database as activity evidence, FSEvents and Spotlight metadata, Quarantine events, KnowledgeC, persistence mechanism detection, macOS security architecture mapping, acquisition challenges on T2/Apple Silicon, and spyware detection methodology. Unified-Log-first approach: starts with Apple's richest artifact source and expands outward. Includes acquisition decision tree for modern Mac hardware.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Source material: `content/.todo/dfir/macos-forensics.mdx` (empty stub — to be removed once idea is approved)
- Siblings: Linux, Windows, BSD host forensics projects
- Related: iOS forensics (shared frameworks like TCC, KnowledgeC), filesystem forensics (APFS layer)
- OpenBSM knowledge from BSD project transfers directly to macOS
- May decompose into 2-3 posts: Unified Logging + TCC + FSEvents, APFS + acquisition, and persistence + malware detection
- Apple Silicon acquisition is a rapidly evolving area — will need version-specific notes
- Educational/DFIR context — defensive incident response focused
