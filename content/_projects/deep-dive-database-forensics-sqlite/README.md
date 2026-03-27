# Deep Dive: Database Forensics — SQLite

> From B-tree pages to WAL frames — forensic examination of the most ubiquitous database in digital investigations.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A deep-dive into SQLite forensics covering the file format at page level, cell anatomy and serial type encoding, WAL as a forensic time machine, deleted record recovery from freelist pages and page slack, rollback journal forensics, high-value database catalog (iOS/Android/browser/macOS), and anti-forensics detection. Page-format-first approach: every recovery technique is explained through the raw B-tree page layout.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Source material: `content/.todo/dfir/sqlite-forensics.mdx` (empty stub — to be removed once idea is approved)
- Child of parent project: deep-dive-database-forensics
- Cross-references: mobile forensics (iOS/Android), host forensics (macOS TCC.db, browser databases)
- May decompose into 2-3 posts: file format + page structure, WAL + deleted recovery, and high-value database catalog
- SQLite is the most examined database in DFIR — this is a foundational reference
- Test databases with controlled content are essential for reproducible hex dump examples
- Educational/DFIR context — foundational forensics discipline
