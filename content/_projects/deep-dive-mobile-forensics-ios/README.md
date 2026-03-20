# Deep Dive: Mobile Forensics — iOS

> From Secure Enclave to KnowledgeC — understanding iOS evidence extraction through Apple's Data Protection architecture.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A deep-dive into iOS forensics covering Apple's Data Protection key hierarchy, Secure Enclave architecture, acquisition methods from backup to checkm8-based physical extraction, key forensic databases (KnowledgeC, biome, locationd, Health, Safari), iCloud extraction including Advanced Data Protection implications, and the evolving cat-and-mouse between Apple security hardening and forensic tooling. Data-Protection-first approach: every extraction capability is explained through which encryption keys are available in the device's current state.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Source material: `content/.todo/dfir/ios-forensics.mdx` (empty stub — to be removed once idea is approved)
- Related to parent project: deep-dive-mobile-forensics (platform overview)
- Sibling project: deep-dive-mobile-forensics-android
- May decompose into 2-3 posts: Data Protection + acquisition methods, artifact analysis, and iCloud + advanced topics
- checkm8 coverage is important as the most significant iOS forensic capability in history
- Educational/DFIR context — defensive forensics and incident response focused
