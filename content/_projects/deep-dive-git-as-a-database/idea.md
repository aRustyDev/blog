---
id: "b756efb3-4256-414a-a2f0-bbd48fb02075"
type: idea
status: draft
created: "2026-03-15T00:00:00Z"
updated: "2026-03-15T00:00:00Z"
---

## Concept

A deep-dive exploring Git as a content-addressable database — not a version control system you use for code, but a general-purpose immutable data store with built-in deduplication, integrity verification, and distributed replication. The post reframes Git's object store through a database lens: blobs as values, trees as directories/tables, commits as transactions, refs as named pointers/cursors, and the DAG as an append-only transaction log. Then explores unconventional uses that exploit these properties — configuration management, audit trails, document stores, infrastructure state, and how tools like Nix, Dolt, and gitoxide leverage similar content-addressable patterns.

## Target Audience

Software engineers who know Git well enough to use it daily but haven't considered it as a general-purpose data structure. Also appeals to systems engineers, database enthusiasts, and developers interested in content-addressable storage, CRDTs, or immutable data patterns. Mid-to-senior level; comfortable with both Git and database concepts.

## Problem/Need

Developers use Git as "the version control tool" without recognizing the powerful data model underneath. The content-addressable object store is a general-purpose immutable database with properties that many purpose-built systems try to replicate: deduplication, cryptographic integrity, efficient delta storage, and distributed replication without coordination. Understanding Git-as-database unlocks new ways to think about data storage, state management, and system design — and explains why so many modern tools borrow Git's architecture.

## Unique Angle

- **Database lens** — systematically maps Git concepts to database concepts (blob→value, tree→schema, commit→transaction, reflog→WAL, gc→compaction)
- Explores real-world "Git as database" use cases: Nix store, Dolt (SQL on Git), Terraform state, Kubernetes GitOps, configuration management
- Compares Git's object store to other content-addressable systems (IPFS, Merkle DAGs, content-addressable storage in build systems like Bazel)
- Examines gitoxide (Rust reimplementation) as evidence that the data model is worth reimplementing independently of the CLI
- Discusses limitations honestly — what Git's model is bad at (large files, binary data, queries, access control)
- Connects to broader trends: immutable infrastructure, append-only logs, CRDTs

## Scope

**Included**: Git object model as a database (blob/tree/commit/tag mapped to database primitives), content-addressable storage properties (deduplication, integrity, immutability), packfiles as database compaction, refs as cursors/bookmarks, reflog as write-ahead log, real-world "Git as database" tools and patterns, comparison to other content-addressable systems, gitoxide as a case study in separating the data model from the CLI, limitations and anti-patterns

**Excluded**: How to use Git (basic commands), Git server protocols, Git hosting platform comparisons, implementing a full database on Git (too ambitious), CRDT theory in depth (mention, don't teach)

## Research Needs

- Review Git's object store implementation and packfile format in detail
- Research Dolt (database built on Git-like primitives) — architecture and design decisions
- Review Nix store design and its relationship to content-addressable storage
- Research gitoxide architecture — how it separates the data model from porcelain
- Survey "Git as database" prior art (blog posts, talks, tools)
- Review content-addressable storage in build systems (Bazel, Buck2) and IPFS
- Examine GitOps patterns (Flux, ArgoCD) as "Git as source of truth for infrastructure"
- Understand Git's actual limitations for non-code use cases (performance, binary handling, query capabilities)

## Estimated Effort

- Research: 5-7 hours (prior art survey, Dolt/Nix/gitoxide architecture review)
- Writing: 6-8 hours (3500-4500 word deep-dive with diagrams and comparison tables)
- Diagrams: 3-4 hours (Git-to-database concept mapping, content-addressable storage comparison, object model as database schema)
- Review/revision: 2-3 hours
- Total: ~16-22 hours across multiple sessions
