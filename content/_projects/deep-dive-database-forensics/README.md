# Deep Dive: Database Forensics

> From page-level storage to transaction log replay — investigating data breaches through the database engine internals.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A deep-dive into database forensics covering PostgreSQL, MySQL/MariaDB, SQLite, and MSSQL at the storage engine level. Explains page formats, WAL/transaction log forensics for timeline reconstruction, deleted data recovery per engine (MVCC dead tuples, undo logs, freelist pages, ghost records), audit configuration, and SQLite as a forensic specialty. Storage-engine-first approach: each technique is grounded in how the database stores data on disk.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Related: mobile forensics projects (SQLite is the primary artifact store for iOS/Android)
- May decompose into 3-4 posts: PostgreSQL, MySQL/MSSQL, SQLite forensics, and cross-engine comparison + audit config
- Cross-engine comparison tables are a key differentiator
- VACUUM timing (PostgreSQL) and purge thread (InnoDB) are critical for understanding evidence destruction windows
- SQLite section has crossover appeal with mobile forensics audience
- Educational/DFIR context — defensive incident response and breach investigation focused
