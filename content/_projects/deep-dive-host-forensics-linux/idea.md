---
id: "5f3a82c6-1d47-4e9b-a0b5-9c8e6d7f2a31"
type: idea
status: draft
created: "2026-03-15T00:00:00Z"
updated: "2026-03-15T00:00:00Z"
---

## Concept

A deep-dive into Linux host forensics — the discipline of investigating security incidents on Linux systems by examining the OS-level artifacts that record user activity, process execution, network connections, authentication events, and system state. Covers the Linux forensic artifact landscape organized by investigation question (who logged in, what ran, when it ran, how they got in, what they changed), the logging architecture (syslog/rsyslog/journald, audit subsystem, utmp/wtmp/btmp), process execution evidence (bash history, /proc artifacts, systemd service logs, cron, at), authentication and access artifacts (PAM, SSH, sudo, /etc/shadow, authorized_keys, lastlog), persistence mechanisms attackers use and how to detect them (cron jobs, systemd services/timers, init scripts, shell profiles, LD_PRELOAD, kernel modules), and live vs dead acquisition considerations (memory capture, disk imaging, volatile data collection order). Artifact-map-first approach: starts with the investigative questions and maps each to the specific files, logs, and system structures that answer it.

## Target Audience

Incident responders and SOC analysts who handle Linux server compromises but whose training emphasized Windows forensics. Cloud security engineers who investigate compromised EC2/GCE/Azure VM instances running Linux. System administrators responsible for Linux infrastructure who need to understand what evidence their systems produce and how to preserve it. DFIR practitioners expanding from Windows to Linux. Penetration testers who want to understand what forensic traces their activities leave on Linux targets. Comfortable with Linux command line and system administration basics, willing to examine log formats, binary file structures, and /proc entries inline.

## Problem/Need

Linux runs the majority of production servers, cloud instances, and containers, yet most DFIR training and tooling is Windows-centric. When a Linux server is compromised, responders trained on Windows forensics look for analogues that don't exist (no registry, no prefetch, no amcache) and miss Linux-specific artifacts that are equally powerful (audit logs, utmp records, systemd journal, /proc). The Linux forensic artifact landscape is fragmented across distributions — syslog vs journald, SysV init vs systemd, different default logging configurations — and many artifacts are ephemeral (lost on reboot) or depend on configuration that may not be enabled by default (auditd rules, process accounting). There's a gap for a deep-dive that maps the complete Linux forensic artifact landscape organized by investigative question, noting which artifacts are distribution-dependent, which require prior configuration, and which survive reboot.

## Unique Angle

- **Investigation-question-first** — organized around the questions investigators actually ask ("who logged in?", "what processes ran?", "how did they persist?", "what did they exfiltrate?") rather than by artifact category, so each section answers a real forensic question
- **Artifact availability matrix** — maps each artifact to its availability: which distros have it by default, whether it requires prior configuration (auditd rules, process accounting), whether it survives reboot, and what an attacker can do to destroy it
- **Logging architecture deep-dive** — explains the relationship between syslog, rsyslog, syslog-ng, journald, and auditd, showing where each sends logs, how they interact, and what each captures that the others miss
- **Persistence mechanism catalog** — comprehensive coverage of Linux persistence techniques (systemd units, cron, at, shell rc files, LD_PRELOAD, PAM modules, kernel modules, udev rules, authorized_keys) with the forensic indicators for each
- **Live acquisition order of volatility** — demonstrates the correct order for volatile data collection on a live Linux system (/proc entries, network connections, running processes, memory) before it's lost, with actual commands and their output
- **Cloud instance considerations** — addresses the cloud-specific forensic challenges: no physical access, EBS/disk snapshot as acquisition method, instance metadata service artifacts, cloud-init logs, and what's lost when an instance is terminated vs stopped

## Scope

**Included**: Disk acquisition for Linux (dd, dcfldd, dc3dd, EBS/disk snapshots for cloud), volatile data collection (/proc/*, ss/netstat, ps, lsof, /dev/shm, tmpfs), memory acquisition (LiME, AVML, /proc/kcore), logging systems (syslog/rsyslog configuration and log locations, systemd journald and journalctl forensics, auditd architecture and rule types, log rotation and retention), authentication artifacts (utmp/wtmp/btmp binary format, lastlog, faillog, /var/log/auth.log or /var/log/secure, PAM configuration and logs, SSH logs and authorized_keys/known_hosts, sudo logs, /etc/shadow and password change timestamps), process execution evidence (bash_history and other shell histories, /proc/PID/ entries on live systems, systemd service and timer logs, cron and at job logs, process accounting with acct/psacct, audit execve logging), persistence mechanisms (systemd services/timers, cron/anacron, at jobs, shell profile scripts: .bashrc/.profile/.bash_logout, /etc/profile.d/, LD_PRELOAD and /etc/ld.so.preload, PAM module backdoors, SSH authorized_keys, kernel modules and modprobe.d, udev rules, init scripts for SysV systems), network artifacts (ss/netstat output, iptables/nftables rules and logs, /etc/hosts and DNS resolver config, /etc/resolv.conf, NetworkManager logs), filesystem timestamps (atime/mtime/ctime semantics, find-based timeline generation, mount options affecting timestamps), user artifacts (home directory analysis, .ssh/, .gnupg/, desktop files, browser profiles), systemd journal binary format and forensic extraction, package manager logs (apt/dpkg, yum/dnf, pacman), scheduled task analysis, anti-forensics detection (log clearing, timestamp manipulation with touch/timestomp, history file manipulation, log injection)

**Excluded**: Filesystem internals (ext4/NTFS — separate project: deep-dive-filesystem-forensics), memory forensics in depth (Volatility framework — separate topic), malware reverse engineering (separate discipline), Windows forensics (separate platform), container forensics (separate project: deep-dive-cloud-forensics-containers), network forensics and packet analysis (separate discipline), SELinux/AppArmor policy forensics in depth (brief mention), kernel exploitation forensics, embedded Linux forensics, Android forensics (separate project)

## Research Needs

- Map the complete Linux forensic artifact landscape across major distributions (Ubuntu/Debian, RHEL/CentOS, SUSE, Arch)
- Study utmp/wtmp/btmp binary record format for direct parsing explanation
- Research systemd journal binary format and forensic extraction without journalctl
- Review auditd rule configuration and log format for forensic-relevant events
- Study PAM authentication flow and where each step is logged
- Catalog Linux persistence mechanisms with detection methods for each
- Research volatile data collection best practices and order of operations
- Study cloud-specific acquisition techniques (AWS EBS snapshots, GCP disk snapshots, Azure disk export)
- Set up forensic lab (Ubuntu and RHEL test VMs with controlled activity for artifact demonstration)
- Review SANS Linux forensic cheat sheets and artifact references for completeness
- Research LiME and AVML for memory acquisition demonstration
- Study process accounting (acct/psacct) configuration and record format

## Estimated Effort

- Research: 7-9 hours (artifact mapping across distros, binary format study, persistence mechanism cataloging, cloud acquisition research)
- Hands-on lab: 5-7 hours (test VM setup with controlled activity, artifact extraction demonstrations, volatile data collection, memory acquisition, persistence mechanism implantation and detection)
- Writing: 10-13 hours (5000-6500 word deep-dive with artifact location tables, log format examples, binary structure diagrams, and command output)
- Diagrams: 3-5 hours (logging architecture flow, artifact availability matrix, order of volatility pyramid, persistence mechanism detection flowchart, investigation question mapping)
- Review/revision: 2-3 hours
- Total: ~27-37 hours across multiple sessions
