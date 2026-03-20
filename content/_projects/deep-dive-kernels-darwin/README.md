# Deep Dive: Kernels - Darwin

> Apple's hybrid open-source kernel — understanding how Mach and BSD fuse into the OS that powers every Apple device.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A deep-dive into the Darwin kernel covering its unique hybrid architecture (Mach microkernel + BSD monolithic layer), the relationship between Darwin and XNU, the IOKit driver framework, the launchd init system, Darwin's userland, Grand Central Dispatch at the kernel level, APFS integration, Apple's security model (SIP, AMFI, code signing), sandboxing, and Darwin's open-source status. Hybrid-first approach: Darwin's power comes from combining microkernel and monolithic designs, and understanding this hybrid architecture is the key to understanding everything else.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- May decompose into 2-3 posts: hybrid architecture + Mach/BSD integration, IOKit + launchd + userland, and security model + APFS + open-source audit
- Hybrid-first framing differentiates from "what is Darwin" overview content
- Darwin vs XNU clarification is essential — these terms are routinely conflated
- Security architecture dissection (SIP, AMFI, sandboxing) is reference-quality material
- Connects to BSD heritage (FreeBSD lineage), Apple platform security, and kernel design patterns
