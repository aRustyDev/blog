# Deep Dive: Host Forensics — BSD

> From UFS2 inodes to pfSense logs — forensic investigation of the Unix variant powering firewalls, storage, and network infrastructure.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A deep-dive into BSD host forensics covering UFS2 and ZFS filesystem analysis, OpenBSM audit trail examination, BSD-specific logging and authentication artifacts, FreeBSD jail forensics, and pfSense/OPNsense firewall investigation. Infrastructure-focused approach: framed through the BSD systems investigators actually encounter (firewalls, storage appliances, network infrastructure). Includes cross-BSD variant comparison and macOS crossover notes where OpenBSM knowledge transfers.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Sibling projects: deep-dive-host-forensics-linux, deep-dive-host-forensics-windows
- Related: deep-dive-filesystem-forensics (UFS2/ZFS layer)
- May decompose into 2-3 posts: UFS2/ZFS forensics, BSD artifacts + OpenBSM, and pfSense/OPNsense playbook
- OpenBSM knowledge directly transfers to macOS forensics — valuable crossover
- pfSense/OPNsense section likely has the broadest appeal (most common BSD forensic target)
- Educational/DFIR context — defensive incident response focused
