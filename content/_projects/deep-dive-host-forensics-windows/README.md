# Deep Dive: Host Forensics — Windows

> From registry hives to event logs — investigating Windows endpoints through the richest forensic artifact ecosystem in DFIR.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A deep-dive into Windows host forensics covering the registry as a forensic database (hive binary format, key forensic locations across all hives), Windows Event Log analysis (EVTX format, critical event IDs, cross-channel correlation), program execution artifacts (Prefetch, Amcache, ShimCache, BAM, UserAssist, SRUM), NTFS forensic metadata ($MFT, $UsnJrnl, $LogFile, VSS), lateral movement evidence matrices, and persistence mechanism detection. Registry-first approach: the registry is the central forensic database, and investigation expands outward from there.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Source material: `content/.todo/dfir/windows-forensics.mdx` (empty stub — to be removed once idea is approved)
- Sibling project: deep-dive-host-forensics-linux
- Related to filesystem forensics (NTFS layer beneath host artifacts)
- Largest estimated effort of all deep-dives (~35-47 hours) — will likely decompose into 3-4 posts
- Eric Zimmerman's tools as primary hands-on toolkit (open-source, well-documented)
- Educational/DFIR context — defensive incident response focused
