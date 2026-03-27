# Deep Dive: Memory Forensics — BSD

> From crash dumps to kgdb — memory analysis in the tooling desert where the targets are high-value infrastructure.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A deep-dive into BSD memory forensics covering acquisition methods across FreeBSD/OpenBSD/NetBSD, BSD kernel data structures (proc, vmspace, kld, socket), crash dump analysis with kgdb as a forensic instrument, manual structure walking when automated tools don't exist, rootkit detection without Volatility, and pfSense/OPNsense memory analysis. Infrastructure-first approach: framed through real investigation scenarios on compromised firewalls, storage servers, and network appliances.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Siblings: memory-forensics-linux, memory-forensics-windows, memory-forensics-macos
- Related: deep-dive-host-forensics-bsd (disk artifacts complement memory analysis)
- Most niche of the memory forensics series — but high value given the infrastructure BSD runs
- Tooling desert is the defining challenge — kgdb and manual analysis fill the gap
- pfSense section likely has broadest appeal (most common BSD forensic target)
- May decompose into 2 posts: acquisition + kernel structures, and rootkit detection + pfSense analysis
- Educational/DFIR context — defensive incident response focused
