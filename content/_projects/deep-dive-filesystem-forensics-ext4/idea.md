---
id: "c19d54a7-3f82-4e6b-91b0-8a5e7d2c4f63"
type: idea
status: draft
created: "2026-03-15T00:00:00Z"
updated: "2026-03-15T00:00:00Z"
---

## Concept

A deep-dive into ext4 forensics — the most widely deployed Linux filesystem and the primary target for forensic examination on Linux servers, Android devices, and embedded systems. Covers the ext4 on-disk layout in forensic detail (superblock, block group descriptors, inode table, inode structure with all fields, extent trees vs indirect block maps), the JBD2 journal as a forensic artifact (transaction structure, journal replay, recovering overwritten metadata from journal copies), file deletion mechanics at the inode level (what ext4 zeroes, what it preserves, why recovery is harder than on NTFS), directory entry forensics (htree directories, directory entry structure, recovering deleted filenames), timestamp analysis (atime/mtime/ctime/crtime with nanosecond precision, what updates each, mount options that affect timestamps), and advanced recovery techniques (extent-based file recovery, journal carving, orphan inode list, unallocated block scanning). Inode-first approach: every forensic technique is explained by showing the raw inode structure and which fields the technique reads or reconstructs.

## Target Audience

DFIR practitioners who examine Linux systems (servers, cloud instances, Android devices) and need to go beyond tool output to understand what ext4 preserves and destroys during incidents. Cloud incident responders who image EBS volumes or VM disks running ext4 and need to extract maximum evidence. Malware analysts examining compromised Linux servers who need to recover deleted attacker tools or reconstruct file activity timelines. Linux system administrators and engineers who want to understand ext4 internals through the forensic lens. Comfortable with Linux command line, willing to work with hex dumps of raw disk structures and debugfs output inline.

## Problem/Need

ext4 is the default filesystem on virtually every Linux distribution, every Android device, and most cloud instances — making it the most common filesystem DFIR practitioners encounter outside of Windows. But ext4 forensics differs fundamentally from NTFS forensics in ways that trip up examiners trained on Windows: ext4 zeroes critical inode fields on deletion (block pointers/extents, file size, timestamps on older kernels), making file recovery significantly harder than on NTFS where the MFT entry is simply flagged. The JBD2 journal provides a rich source of metadata history but is structured completely differently from NTFS $LogFile. Extent trees replaced indirect block maps in ext4 but most forensic documentation still describes the old format. There's a gap for a deep-dive that covers ext4 as it actually exists today — with extents, nanosecond timestamps, htree directories, and 64-bit block addressing — explaining each on-disk structure at the hex level and mapping it to what forensic tools can and cannot recover.

## Unique Angle

- **Inode-first** — starts with the 256-byte inode structure field by field, annotated with forensic significance of each field (which survive deletion, which are zeroed, which contain historical data)
- **Extent tree walkthrough** — explains the ext4 extent tree (header, index, leaf nodes) with hex dumps, showing how extents map file data to disk blocks and why extent-based recovery requires different techniques than indirect block recovery
- **JBD2 journal deep-dive** — traces a journal transaction from commit to replay, showing the descriptor block, data blocks, and commit block structure, then demonstrates recovering overwritten inode metadata from journal copies
- **Deletion anatomy** — walks through exactly what the kernel's ext4_delete_inode() path does: which fields are zeroed, when the inode is added to the orphan list, when blocks are freed, and what evidence remains at each stage
- **Directory entry forensics** — explains htree (hash tree) directory structure, how deleted directory entries can be recovered from directory blocks even after the inode is deallocated, and the difference between linear and htree directory recovery
- **Hands-on with debugfs and Sleuthkit** — every concept demonstrated with actual tool output: `debugfs` for raw ext4 exploration, `istat`/`fls`/`blkcat` from Sleuthkit for forensic analysis, showing what each tool is parsing from the raw structures
- **Modern ext4 features** — covers forensic implications of features most documentation ignores: inline data for small files (data stored in inode itself), metadata checksums, project quotas, encryption (fscrypt), and 64-bit mode

## Scope

**Included**: ext4 on-disk layout (superblock fields and feature flags, block group descriptor table, 64-bit mode, flexible block groups), inode structure (all 256 bytes: mode, uid/gid, size, timestamps with nanosecond fields, block count, flags, extent tree/block map, generation number, file ACL, extra isize), extent tree (header, index entries, leaf entries, depth, extent-based file reconstruction), indirect block maps (legacy, for comparison and older filesystem examination), JBD2 journal (superblock, descriptor blocks, data blocks, commit blocks, revoke blocks, transaction sequence numbers, journal recovery for forensic metadata extraction), file deletion mechanics (ext4_evict_inode code path, inode zeroing behavior, block bitmap updates, orphan inode list), directory forensics (directory entry structure, rec_len chain, htree/hash tree directories, name_len and file_type, recovering deleted entries from directory blocks), timestamp forensics (atime, mtime, ctime, crtime, nanosecond precision, mount options: noatime/relatime/strictatime, timestamp manipulation detection via crtime comparison), file recovery techniques (inode-based recovery when metadata survives, extent-based block recovery, journal-assisted recovery, signature-based carving from unallocated blocks, extundelete/ext4magic usage), Sleuthkit ext4 support (istat, fls, ffind, blkcat, fsstat, jls, jcat), debugfs for raw exploration, hands-on with prepared test images

**Excluded**: Other filesystems (NTFS, APFS, FAT — covered in parent project for comparison), ext2/ext3 in depth (differences noted but not deep-dived), FUSE-based ext4 access from non-Linux (brief mention), ext4 kernel implementation beyond deletion path, block-level disk forensics (sector editing, disk controller behavior), RAID/LVM layer below ext4, Android-specific ext4 variations in depth (noted but not primary focus), ext4 performance tuning, filesystem creation internals (mkfs.ext4)

## Research Needs

- Review ext4 on-disk format specification (kernel.org ext4 wiki, Documentation/filesystems/ext4/)
- Study inode structure in detail including extra fields beyond 128 bytes (extended attributes inline, nanosecond timestamps)
- Map the ext4 extent tree format with hex-level examples
- Research JBD2 journal structure (journal superblock, descriptor block format, transaction lifecycle)
- Study ext4_evict_inode() kernel code path to document exact deletion behavior
- Research htree directory implementation for directory entry recovery techniques
- Review Sleuthkit ext4 implementation (tsk_fs_ext4.c) for tool grounding
- Study ext4 encryption (fscrypt) forensic implications
- Create prepared test images with known content, deletion, and modification for hands-on examples
- Research extundelete and ext4magic recovery tool internals
- Review real case examples of ext4 journal recovery revealing evidence
- Study ext4 metadata checksum implementation and forensic validation

## Estimated Effort

- Research: 6-8 hours (ext4 specification review, JBD2 journal format, deletion code path, extent tree structure, encryption implications)
- Hands-on lab: 5-7 hours (test image creation, controlled deletions, debugfs exploration, Sleuthkit analysis, journal carving, extent recovery demonstrations)
- Writing: 8-11 hours (4500-5500 word deep-dive with hex dumps, inode field annotations, extent tree diagrams, journal transaction traces, and tool output)
- Diagrams: 3-5 hours (inode structure annotated diagram, extent tree visualization, block group layout, JBD2 transaction structure, deletion state flow)
- Review/revision: 2-3 hours
- Total: ~24-34 hours across multiple sessions
