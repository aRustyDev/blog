# Deep Dive: Filesystem Forensics — ext4

> From inode fields to journal transactions — forensic examination of Linux's default filesystem at the hex level.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A deep-dive into ext4 forensics covering the complete inode structure, extent tree mechanics, JBD2 journal as a forensic artifact source, file deletion anatomy at the kernel code level, directory entry recovery from htree structures, and timestamp analysis with nanosecond precision. Inode-first approach: every forensic technique is explained by showing the raw 256-byte inode structure and which fields the technique reads or reconstructs. Hands-on with debugfs and Sleuthkit throughout.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Source material: `content/.todo/dfir/filesystem/ext4.mdx` (empty stub — to be removed once idea is approved)
- Child of parent project: deep-dive-filesystem-forensics (cross-filesystem comparison)
- May decompose into 2 posts: on-disk structures + deletion/recovery, and journal forensics + timeline analysis
- Test images with controlled content are essential for reproducible hex dump examples
- Modern ext4 features (extents, nanosecond timestamps, fscrypt) differentiate from outdated ext2/ext3 documentation
- Educational/DFIR context — foundational forensics discipline
