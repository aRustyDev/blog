---
id: "7a3d92e5-1c48-4b6f-85d0-2e9f7c4a8b16"
type: idea
status: draft
created: "2026-03-16T00:00:00Z"
updated: "2026-03-16T00:00:00Z"
---

## Concept

A deep-dive into SQLite forensics — the single most examined database in digital forensics, used by virtually every mobile app, desktop browser, macOS/iOS system service, and countless embedded applications. Covers the SQLite file format at forensic depth (header, B-tree pages, cell format, overflow pages, free page list), the Write-Ahead Log as a forensic goldmine (WAL header, frame structure, checkpoint behavior, recovering pre-checkpoint state), deleted record recovery techniques (freelist page carving, unallocated space within pages, cell pointer analysis, fragment recovery from page slack), journal file forensics (rollback journal format, hot journals, journal as crash-state evidence), forensic analysis of specific high-value SQLite databases (iOS KnowledgeC, Android mmssms.db, Chrome History/Cookies, Firefox places.sqlite, macOS TCC.db), and anti-forensics awareness (secure_delete pragma, VACUUM, WAL checkpoint, page overwrite patterns). Page-format-first approach: every recovery technique is explained through the raw B-tree page layout, so readers understand exactly what they're carving from free space and why some records are recoverable while others aren't.

## Target Audience

Mobile forensics practitioners who examine SQLite databases from iOS and Android devices daily and want to move beyond tool output to understand what's actually on disk. Browser forensics analysts who examine Chrome, Firefox, and Safari SQLite databases. DFIR practitioners who encounter SQLite in virtually every investigation (it's embedded in more software than any other database). Tool developers building SQLite parsers who need to understand the file format for recovery features. Digital forensics students who need foundational knowledge of the most common forensic artifact format. Comfortable with hex editors and database concepts, willing to examine raw page structures and binary cell formats inline.

## Problem/Need

SQLite is everywhere in forensics — iOS stores user activity in dozens of SQLite databases, Android uses it for SMS/contacts/browser history, Chrome and Firefox store browsing data in it, macOS system services write to it, and countless applications embed it. Forensic tools (Cellebrite, AXIOM, Autopsy) parse these databases automatically, but when a tool misses a deleted record or misinterprets a value, the examiner who doesn't understand the file format can't evaluate the result. More critically, deleted record recovery depends entirely on understanding SQLite's page structure: when a row is deleted, the cell space is freed within the page but the data may remain until overwritten — and the freelist tracks which pages are entirely free. WAL files contain a rolling history of modifications that may preserve data that's been overwritten in the main database. But most forensic training treats SQLite as "use this tool, read the output." There's a gap for a deep-dive that explains the file format at the page level, shows exactly what "deleted" means in SQLite, and demonstrates recovery techniques grounded in the actual data structures.

## Unique Angle

- **Page-format-first** — starts with the 100-byte database header and B-tree page structure (page header, cell pointer array, cell content area, unallocated space, free blocks), building understanding from the raw bytes up
- **Cell anatomy** — dissects the SQLite cell format in detail: record header with serial type codes, payload area, overflow page pointers, showing exactly how data types are encoded and how to reconstruct records manually from hex
- **Deletion mechanics deep-dive** — traces exactly what happens when a row is deleted: cell pointer removal, free block chain update, page defragmentation (or lack thereof), freelist page addition — showing precisely where deleted data persists and for how long
- **WAL as forensic time machine** — explains the WAL not just as a recovery mechanism but as a forensic artifact: WAL frames contain complete page images from before each checkpoint, meaning the WAL can preserve multiple historical versions of the same page, enabling point-in-time reconstruction
- **Freelist carving vs page slack carving** — distinguishes two different recovery sources: freelist pages (entire pages of freed data) and page slack (freed cells within active pages), with different recovery techniques and different reliability levels for each
- **High-value database catalog** — provides forensic analysis guides for the most important SQLite databases investigators encounter: iOS (KnowledgeC.db, sms.db, call_history.db, Photos.sqlite, cache_encryptedB.db), Android (mmssms.db, contacts2.db, calllog.db, External.db), browsers (Chrome History, Cookies, Login Data; Firefox places.sqlite, cookies.sqlite), macOS (TCC.db, Quarantine events)
- **Anti-forensics awareness** — explains how secure_delete pragma, VACUUM, manual WAL checkpointing, and file shredding affect evidence availability, with detection methods for each

## Scope

**Included**: SQLite file format (100-byte database header: magic bytes, page size, file format versions, schema cookie, auto-vacuum mode, text encoding, application ID; page types: interior B-tree, leaf B-tree, interior table, leaf table, overflow, freelist trunk, freelist leaf, pointer map; B-tree page structure: page header, cell pointer array, first free block offset, cell content area offset, fragmented free bytes), cell format (cell structure for table leaf pages: rowid varint, payload length varint, record header with serial types, payload data, overflow pointer; serial type encoding: NULL, integers 1-8 bytes, floats, BLOBs, text with encoding; varint encoding), WAL forensics (WAL file header: magic, format version, database page size, checkpoint sequence, salt values; frame header: page number, database size, salt, checksum; frame payload: complete page image; checkpoint types: passive, full, restart, truncate; forensic value: pre-checkpoint page states, multiple frame versions of same page, recovery of overwritten data), rollback journal (journal header format, page records, master journal pointer, hot journal detection as evidence of crash/interruption), freelist structure (freelist trunk pages, freelist leaf pages, total free page count in header, auto-vacuum vs manual freelist management), deleted record recovery (cell pointer removal mechanics, free block chain within pages, page defragmentation behavior, recovering cells from page slack space, recovering complete pages from freelist, carving records from unallocated page space, SQLite record reconstruction from partial data), forensic tools (sqlite3 CLI for examination, undark for deleted record recovery, sqlparse for binary format parsing, Epilog for WAL analysis, Belkasoft SQLite viewer, Autopsy SQLite plugin), high-value database analysis (iOS: KnowledgeC.db schema and forensic interpretation, sms.db message reconstruction, call_history.db, Photos.sqlite asset/album relationships; Android: mmssms.db, contacts2.db, calllog.db; browsers: Chrome History/Cookies/Login Data, Firefox places.sqlite; macOS: TCC.db, QuarantineEventsV2), anti-forensics (PRAGMA secure_delete: zeroing freed cells; VACUUM: rebuilding database from scratch, destroying all free space; WAL checkpoint + truncate: destroying WAL history; detection of anti-forensic activity via header analysis and anomalies)

**Excluded**: SQLite query optimization and indexing (database performance topic), SQLite C API and application development, other database engines (PostgreSQL, MySQL, MSSQL — covered in parent project), full mobile forensics workflow (acquisition, extraction — separate projects), full browser forensics methodology (separate topic), SQLite encryption (SEE, SQLCipher — brief mention of impact on forensics), FTS (Full-Text Search) virtual table forensics (niche), SQLite in-memory databases (non-persistent, no forensic artifacts), R-Tree and other virtual table internals

## Research Needs

- Review SQLite file format specification (sqlite.org/fileformat2.html) in complete detail
- Study B-tree page structure at byte level with hex dump examples
- Map cell format and serial type encoding for manual record reconstruction
- Research WAL frame structure and checkpoint behavior for forensic timeline reconstruction
- Study freelist management and auto-vacuum differences for recovery impact
- Research deleted record recovery techniques (free block chain parsing, page slack carving, freelist page analysis)
- Map high-value SQLite database schemas across current iOS/Android/browser versions
- Review undark, sqlparse, and Epilog tool capabilities and limitations
- Study PRAGMA secure_delete implementation and detection methods
- Create prepared test databases with known content, deletion, and WAL state for hands-on demonstrations
- Research SQLite page cache behavior and its interaction with WAL for forensic analysis
- Study overflow page chain following for large record reconstruction
- Review SQLite source code for exact deletion behavior (btreeDropCell, freeSpace, freePage)

## Estimated Effort

- Research: 7-9 hours (file format specification deep study, WAL internals, cell format encoding, deletion mechanics from source code, high-value database schema mapping)
- Hands-on lab: 5-7 hours (test database creation with controlled content, deletion and recovery exercises, WAL frame analysis, freelist carving, anti-forensics demonstration, high-value database examination with real artifacts)
- Writing: 9-12 hours (5000-6500 word deep-dive with hex dumps of page structures, cell format annotations, WAL frame walkthroughs, recovery technique demonstrations, and database catalog entries)
- Diagrams: 4-5 hours (B-tree page structure with annotations, cell format diagram, WAL frame chain visualization, deletion state flow, freelist structure, recovery source comparison)
- Review/revision: 2-3 hours
- Total: ~27-36 hours across multiple sessions
