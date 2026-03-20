# Deep Dive: Filesystem Forensics

> From inodes to MFT entries — understanding digital evidence through the on-disk structures that store it.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A deep-dive into filesystem forensics covering ext4, NTFS, APFS, and FAT32/exFAT side-by-side at the data structure level. Explains file deletion mechanics per filesystem, timestamp forensics and timeline analysis from journal and metadata artifacts, file carving from unallocated space, and the impact of modern features (SSD TRIM, COW semantics, encryption) on forensic recovery. Data-structure-first approach: every forensic technique is grounded in the raw on-disk layout it parses.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- May decompose into 3-4 posts: filesystem structures (ext4/NTFS/APFS comparison), deletion and recovery mechanics, timeline analysis (journals and timestamps), and modern challenges (SSD/encryption/COW)
- Cross-filesystem comparison tables are a key differentiator
- Hex dumps of actual on-disk structures are essential for the data-structure-first approach
- Sleuthkit as the hands-on tool (open-source, well-documented internals)
- Educational/DFIR context — foundational forensics discipline
