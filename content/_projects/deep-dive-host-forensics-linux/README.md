# Deep Dive: Host Forensics — Linux

> From auth logs to persistence mechanisms — investigating compromised Linux systems through the artifacts they leave behind.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A deep-dive into Linux host forensics covering the OS-level artifact landscape organized by investigation question, the logging architecture (syslog/journald/auditd), authentication and access evidence, process execution artifacts, persistence mechanism detection, live vs dead acquisition, and cloud instance considerations. Artifact-map-first approach: starts with investigative questions and maps each to the specific files, logs, and structures that answer it. Includes an artifact availability matrix across distributions.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Source material: `content/.todo/dfir/linux-forensics.mdx` (empty stub — to be removed once idea is approved)
- Related to filesystem forensics (ext4 project covers the filesystem layer beneath this)
- Related to container forensics (containers run on Linux hosts, this covers the host layer)
- May decompose into 2-3 posts: logging + authentication, process execution + persistence, and live acquisition + cloud
- Cross-distribution differences (Ubuntu vs RHEL vs SUSE) are a key differentiator
- Educational/DFIR context — defensive incident response focused
