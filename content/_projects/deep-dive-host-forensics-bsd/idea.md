---
id: "1e8c47b3-5d92-4a6f-b0c7-6f3a9d2e8b15"
type: idea
status: draft
created: "2026-03-16T00:00:00Z"
updated: "2026-03-16T00:00:00Z"
---

## Concept

A deep-dive into BSD host forensics — investigating security incidents on FreeBSD, OpenBSD, and NetBSD systems, the Unix variants that power firewalls (pfSense/OPNsense), storage appliances (TrueNAS/FreeNAS), network infrastructure (Netflix CDN, Juniper JunOS), and security-focused workstations. Covers the BSD-specific forensic artifact landscape that differs from Linux (different logging subsystems, different filesystem artifacts, different process accounting), the filesystems forensic examiners encounter on BSD (UFS2, ZFS), BSD audit subsystem (OpenBSM — the same audit framework that macOS inherited), jail forensics (BSD's original container-like isolation), and the unique artifacts each BSD variant produces. UFS/ZFS-first approach: starts with the filesystem layer since BSD's UFS2 and ZFS store metadata differently from Linux ext4, then builds upward through logging, authentication, and process execution artifacts.

## Target Audience

DFIR practitioners who encounter BSD systems in investigations — typically as network appliances (pfSense/OPNsense firewalls), storage systems (TrueNAS), or infrastructure (DNS servers, mail relays, embedded network devices). Security engineers responsible for BSD-based infrastructure who need to understand what forensic artifacts their systems produce. Incident responders from Linux/Windows backgrounds who need a reference for where the equivalent artifacts live on BSD. Network forensics practitioners who image pfSense/OPNsense firewalls and need to extract firewall rules, connection logs, and state tables. Comfortable with Unix command line, willing to examine UFS2/ZFS internals and binary log formats inline.

## Problem/Need

BSD systems appear in investigations more often than most DFIR practitioners expect — not as workstations, but as critical infrastructure components. When a pfSense firewall is compromised, a TrueNAS storage server is breached, or a JunOS-based router is suspect, the responder trained exclusively on Linux and Windows forensics faces unfamiliar territory. BSD's logging is similar to but different from Linux (syslogd vs rsyslog/journald, utx vs utmp, OpenBSM audit vs auditd), its filesystems require different tools (UFS2 doesn't have an ext4 equivalent in Sleuthkit coverage, ZFS snapshots provide unique forensic capabilities), and its security model introduces concepts like jails and securelevel that affect what evidence is available. There's virtually no dedicated BSD forensics training or deep-dive content — most DFIR courses mention BSD only in passing. This gap means that when investigators encounter BSD infrastructure, they either treat it like Linux (missing BSD-specific artifacts) or skip it entirely.

## Unique Angle

- **Infrastructure-focused** — frames BSD forensics through the systems investigators actually encounter: pfSense/OPNsense firewalls, TrueNAS storage, DNS/mail servers, rather than BSD as a general-purpose OS
- **UFS2 and ZFS forensic comparison** — covers both BSD filesystems from a forensic perspective: UFS2 with soft updates (different from journaling), ZFS with snapshots (forensic time machine), showing what each preserves and what's recoverable
- **OpenBSM audit deep-dive** — explains BSD's audit subsystem (which macOS inherited), including audit trail format, token types, audit policy configuration, and praudit/auditreduce for analysis — knowledge directly transferable to macOS forensics
- **Cross-BSD variant map** — notes where FreeBSD, OpenBSD, and NetBSD differ forensically (different default logging, different package management artifacts, OpenBSD's unique security features like pledge/unveil affecting process behavior)
- **Jail forensics** — explains FreeBSD jails from a forensic perspective: what's shared vs isolated, where jail-specific logs live, how to determine which jail a process or file belongs to
- **pfSense/OPNsense forensic playbook** — dedicated section on the most common BSD forensic target: extracting firewall rules, pflog binary format, state table dumps, package manager logs, and web UI access logs

## Scope

**Included**: BSD filesystem forensics (UFS2: superblock, cylinder groups, inode structure, soft updates vs journaled soft updates, directory format, file recovery; ZFS: pool/vdev/dataset structure, ZFS snapshots for forensic recovery, ZIL and SLOG forensic implications, ZFS send/receive for acquisition), BSD logging systems (syslogd configuration and log locations, newsyslog rotation, utx/utmpx binary format, lastlogin/failedlogin, OpenBSM audit: audit_event, audit_class, audit trail binary format, praudit/auditreduce, audit policy and flags), authentication artifacts (/etc/master.passwd, login.conf, SSH logs, PAM on FreeBSD, BSD auth on OpenBSD, login classes, sudo/doas logs), process execution evidence (process accounting: sa/lastcomm, shell history, rc.d/service execution logs, cron), persistence mechanisms (rc.conf and rc.local, periodic scripts, cron/at, inetd, pkg-message post-install scripts, kernel module loading), jail/container forensics (jail configuration, jail-specific /var, jls/jexec, jail log separation, ezjail/iocage metadata), pfSense/OPNsense forensics (config.xml, pflog binary format with tcpdump, state table: pfctl -ss, package manager logs, web UI access log, CARP/HA state, Suricata/Snort alert logs if installed), network artifacts (pf firewall rule extraction, pf state table, network interface configuration, ARP table, routing table), disk acquisition (dd, gpart output, GEOM layer, ZFS pool export/import, live acquisition with ZFS snapshot+send), BSD-specific tools (truss vs strace, dtrace, sockstat vs ss, fstat), macOS crossover notes (where OpenBSM and BSD heritage artifacts apply to macOS forensics)

**Excluded**: macOS forensics in depth (separate platform with Apple-specific layers on top of BSD), Linux host forensics (sibling project), JunOS forensics in depth (Juniper's BSD derivative — vendor-specific, brief mention), detailed ZFS administration (pool management, RAIDZ — sysadmin topic), BSD kernel exploitation, BSD security hardening (securelevel, pledge/unveil — defensive config, not forensics), DragonFlyBSD/other niche BSDs, detailed pf rule writing, FreeBSD bhyve hypervisor forensics, BSD package building/ports forensics

## Research Needs

- Review UFS2 on-disk format specification (FreeBSD ufs2 documentation, McKusick et al.)
- Study ZFS on-disk format and snapshot implementation for forensic use
- Map OpenBSM audit trail binary format and token types
- Research pfSense/OPNsense forensic artifact locations (config.xml, pflog, package logs)
- Study utx/utmpx binary record format on FreeBSD (differs from Linux utmp)
- Map forensic artifact locations across FreeBSD, OpenBSD, and NetBSD
- Research FreeBSD jail implementation details for forensic isolation analysis
- Review Sleuthkit UFS2 support and limitations
- Study pflog binary format and extraction with tcpdump
- Set up forensic lab (FreeBSD VM, pfSense VM, TrueNAS VM with controlled activity)
- Research ZFS snapshot-based acquisition workflow
- Review OpenBSD-specific security features (pledge, unveil) and their forensic traces

## Estimated Effort

- Research: 7-9 hours (UFS2/ZFS formats, OpenBSM specification, cross-BSD artifact mapping, pfSense/OPNsense artifact locations, jail architecture)
- Hands-on lab: 5-7 hours (FreeBSD and pfSense VM setup, controlled activity generation, UFS2 examination, ZFS snapshot forensics, pflog extraction, OpenBSM audit trail analysis)
- Writing: 8-11 hours (4500-5500 word deep-dive with filesystem diagrams, audit trail examples, pfSense extraction procedures, and cross-BSD comparison tables)
- Diagrams: 3-5 hours (UFS2 inode structure, ZFS pool/dataset hierarchy, OpenBSM audit flow, pfSense forensic artifact map, BSD variant comparison matrix)
- Review/revision: 2-3 hours
- Total: ~25-35 hours across multiple sessions
