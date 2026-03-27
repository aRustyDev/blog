# Deep Dive: Mobile Forensics — Android

> From AOSP source to SQLite artifacts — understanding Android evidence extraction through the platform's open architecture.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A deep-dive into Android forensics covering partition layout, FDE/FBE encryption architecture (CE/DE storage, Keymaster key hierarchy), acquisition methods (ADB through chip-off), per-artifact provenance tracing from Android API to SQLite database, and deleted data recovery techniques. AOSP-first approach: each forensic technique is explained through Android's open-source code paths and storage formats. Fragmentation-aware, covering OEM differences (Samsung Knox, Pixel Titan M) and their forensic implications.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Source material: `content/.todo/dfir/android-forensics.mdx` (empty stub — to be removed once idea is approved)
- Related to parent project: deep-dive-mobile-forensics (platform overview)
- May decompose into 2-3 posts: acquisition + encryption, artifact analysis, and deleted data/anti-forensics
- ADB-first methodology before commercial tools
- Test on Pixel device for reproducible, OEM-neutral baseline
- Educational/DFIR context — defensive forensics and incident response focused
