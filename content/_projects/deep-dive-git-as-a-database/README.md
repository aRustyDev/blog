# Deep Dive: Git as a Database

> Reframing Git's object store as a content-addressable database — and exploring who else is building on the same idea.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

Explores Git not as a version control CLI but as a general-purpose immutable, content-addressable data store. Maps Git primitives to database concepts, examines real-world tools that exploit this model (Dolt, Nix, gitoxide, GitOps), compares to other content-addressable systems (IPFS, Bazel), and honestly covers the limitations.

## Artifacts

- [Idea](./idea.md)
- [Plan](./plan.md)
- [Research Report](./research/reports/main.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Source material: `content/.todo/deep-dives/deep-dive-git-vs-gitoxide.mdx` (empty stub — pivoted from "git vs gitoxide" to "git as a database" which is broader and subsumes gitoxide as a case study)
- Flagged for removal: `content/.todo/deep-dives/deep-dive-git-vs-gitoxide.mdx`
- Related project: deep-dive-git-internals (covers the object model; this post builds on it with the database framing)
