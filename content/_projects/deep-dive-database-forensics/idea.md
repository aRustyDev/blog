---
id: "e54c81a7-2d39-4b6f-a0e8-3f7d9c5b1e42"
type: idea
status: draft
created: "2026-03-16T00:00:00Z"
updated: "2026-03-16T00:00:00Z"
---

## Concept

A deep-dive into database forensics — the discipline of investigating data breaches, insider threats, and unauthorized access by examining database internals rather than just query logs. Covers the forensic artifact landscape across major database engines (PostgreSQL, MySQL/MariaDB, SQLite, MSSQL), the storage engine internals that make forensic recovery possible (page-level storage, WAL/redo logs, undo logs, MVCC version chains), transaction log forensics (reconstructing who did what and when from write-ahead logs and binary logs), deleted data recovery at the storage engine level (page-level recovery from free space, MVCC ghost records, WAL replay for point-in-time reconstruction), access auditing and authentication forensics (connection logs, query logs, audit plugins, pg_stat_statements, SQL Server extended events), and SQLite forensics as its own sub-discipline (the most-examined database in mobile/desktop forensics). Storage-engine-first approach: each forensic technique is explained through the storage engine's page format and logging mechanism, because understanding how the database stores data on disk is what makes recovery and timeline reconstruction possible.

## Target Audience

DFIR practitioners who investigate data breaches and need to determine what data was accessed or exfiltrated from databases. Database administrators and security engineers who need to configure forensic-ready audit logging and understand what evidence their databases produce. Incident responders who find PostgreSQL/MySQL/MSSQL servers in compromised environments and need to extract forensic artifacts beyond just reading query logs. Mobile forensics practitioners who examine SQLite databases from iOS/Android devices (crossover with mobile forensics projects). Insider threat investigators who need to reconstruct database activity timelines. Comfortable with SQL and basic database concepts, willing to examine page-level hex dumps and transaction log records inline.

## Problem/Need

Database breaches are among the most impactful security incidents — they involve the data attackers actually want (PII, financial records, credentials, IP). But database forensics is underserved in the DFIR community. When a PostgreSQL server is breached, most investigators check the query log (if it was enabled — often it wasn't), look at connection logs, and stop. They miss the rich forensic artifacts in the storage engine itself: the WAL contains a complete record of every data modification, MVCC version chains preserve previous row versions that may show pre-attack state, deleted rows may still exist in page free space, and the system catalogs record schema changes that indicate exfiltration preparation. Each database engine stores data differently, logs differently, and preserves deleted data differently — but most forensic training treats "database forensics" as a single topic. There's a gap for a deep-dive that covers each major engine at the storage level, showing what's recoverable and how.

## Unique Angle

- **Storage-engine-first** — explains each database's forensic capabilities through its storage engine: PostgreSQL's heap pages and MVCC, MySQL/InnoDB's clustered index and undo logs, SQLite's B-tree pages and WAL, MSSQL's page structure and transaction log — because the storage format determines what's recoverable
- **WAL/transaction log forensics** — deep-dives into write-ahead log analysis for each engine: PostgreSQL WAL (pg_waldump), MySQL binary log (mysqlbinlog), MSSQL transaction log (fn_dblog), showing how to reconstruct a complete modification timeline from log records
- **Deleted data recovery per engine** — explains what "deleted" means at the page level for each database: PostgreSQL dead tuples (visible until VACUUM), MySQL/InnoDB undo log rollback segments, SQLite free pages and WAL checkpointing, MSSQL ghost records — with recovery techniques for each
- **Cross-engine comparison** — covers PostgreSQL, MySQL, SQLite, and MSSQL side-by-side rather than in isolation, highlighting where forensic capabilities diverge (PostgreSQL preserves deleted rows until VACUUM; InnoDB undo logs expire; SQLite WAL checkpointing destroys history)
- **Forensic-ready configuration** — for each engine, specifies the configuration needed to maximize forensic evidence: audit logging, query logging, WAL retention, connection logging — and what's lost when these aren't configured
- **SQLite as forensic specialty** — dedicated section treating SQLite forensics as a distinct sub-discipline, given its role as the artifact store for iOS, Android, browsers, and desktop applications (crossover with mobile forensics)

## Scope

**Included**: PostgreSQL forensics (heap page format: page header, line pointers, tuples, special space; MVCC: xmin/xmax, tuple visibility, dead tuples as forensic artifacts; WAL: segment files, pg_waldump for record-level analysis, WAL-based timeline reconstruction; system catalogs: pg_stat_activity, pg_stat_statements, pg_audit extension; connection/authentication logs; VACUUM impact on forensic recovery), MySQL/MariaDB forensics (InnoDB page format: page header, record format, clustered index B+tree; undo logs: rollback segments, purge thread, undo log-based version recovery; binary log: statement-based vs row-based, mysqlbinlog for forensic analysis, GTID tracking; general query log and slow query log; mysql.general_log table; audit plugin; information_schema forensic queries), MSSQL forensics (page format: page header, data rows, row offset array; transaction log: fn_dblog() and fn_dump_dblog(), VLF structure, log record types; ghost records: ghost cleanup process timing, ghost record recovery; Extended Events for audit; default trace; SQL Server Audit; system DMVs for session history), SQLite forensics (B-tree page format: interior pages, leaf pages, overflow, cell format; WAL: WAL header, frame headers, checkpoint types, WAL-based recovery; journal: rollback journal format, hot journals; free page list: recovering deleted records from freelist pages; SQLite forensic tools: sqlite3, sqlparse, undark, Belkasoft), cross-engine forensic comparison tables (logging capabilities, deleted data retention, recovery techniques, audit configuration), forensic-ready database configuration per engine, common investigation scenarios (data exfiltration: large SELECT queries in logs; insider threat: privilege escalation via GRANT; ransomware: mass DELETE/UPDATE in transaction logs; unauthorized access: authentication failure patterns)

**Excluded**: NoSQL databases (MongoDB, Redis, Elasticsearch — different storage models, separate topics), cloud-managed database forensics (RDS, Cloud SQL — cloud-specific access limitations, brief mention), database encryption forensics (TDE, column-level encryption — brief mention of impact), application-level ORM forensics (what the application layer tells you vs database layer), database backup forensics in depth (backup-based recovery is standard DBA, not forensic technique), database performance forensics (slow query analysis for non-security purposes), graph/time-series database forensics, detailed B-tree theory beyond forensic relevance

## Research Needs

- Review PostgreSQL heap page format and MVCC tuple header fields (xmin, xmax, infomask)
- Study PostgreSQL WAL record format and pg_waldump output interpretation
- Research InnoDB page format and undo log structure for forensic recovery
- Study MySQL binary log format (row-based events) and mysqlbinlog forensic usage
- Review MSSQL page format and fn_dblog() output for transaction log forensics
- Study SQLite B-tree page format, WAL frame structure, and free page recovery
- Map forensic-ready audit configuration for each engine
- Research VACUUM timing and its destruction of PostgreSQL forensic evidence
- Study InnoDB purge thread behavior and undo log expiration timing
- Set up forensic lab (PostgreSQL, MySQL, MSSQL, SQLite test instances with controlled data manipulation and deletion)
- Review existing SQLite forensic tools (undark, sqlite-deleted-records, Belkasoft)
- Gather 2-3 data breach investigation scenarios that demonstrate cross-engine differences
- Research pg_audit and MySQL audit plugin configuration and output formats

## Estimated Effort

- Research: 8-10 hours (storage engine page formats across 4 engines, transaction log formats, MVCC/undo log internals, audit configuration, SQLite forensic tooling)
- Hands-on lab: 6-8 hours (test instance setup for each engine, controlled data modification and deletion, transaction log analysis, deleted record recovery attempts, audit log examination, SQLite WAL/freepage recovery)
- Writing: 10-14 hours (5500-7000 word deep-dive with page-level hex dumps, transaction log record examples, cross-engine comparison tables, recovery walkthroughs, and audit configuration guides)
- Diagrams: 4-6 hours (page format diagrams per engine, MVCC/undo log version chain visualization, WAL/binlog forensic workflow, cross-engine comparison matrix, SQLite B-tree page structure)
- Review/revision: 2-3 hours
- Total: ~30-41 hours across multiple sessions
