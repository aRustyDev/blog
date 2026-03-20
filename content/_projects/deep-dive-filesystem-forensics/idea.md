---
id: "4a6b83d1-9e27-4f5c-b0a8-7c3d2e1f5b96"
type: idea
status: draft
created: "2026-03-15T00:00:00Z"
updated: "2026-03-15T00:00:00Z"
---

## Concept

A deep-dive into filesystem forensics — the foundational DFIR discipline of extracting evidence from how operating systems organize, store, and delete data on disk. Covers the major forensic filesystems side-by-side (ext4, NTFS, APFS, FAT32/exFAT), their on-disk structures and what each reveals to an investigator (inodes vs MFT entries vs B-trees, journaling behavior, timestamp semantics), the mechanics of file deletion and recovery across filesystems (what "deleted" actually means at the data structure level), timeline analysis from filesystem metadata (MAC/MACE timestamps, journal replay, $UsnJrnl/$LogFile on NTFS, ext4 journal transactions), artifact carving from unallocated space, and the impact of modern filesystem features on forensics (APFS snapshots, ext4 extents, NTFS alternate data streams, encryption, compression). Data-structure-first approach: each forensic technique is explained through the on-disk layout it reads, not just the tool that automates it.

## Target Audience

DFIR practitioners who use Autopsy, FTK, or Sleuthkit daily but want to understand what these tools are actually parsing. Security engineers and incident responders who need to recover deleted files or build activity timelines but don't understand why recovery sometimes works and sometimes doesn't. Systems engineers and developers who want to understand filesystem internals through the forensic lens — what happens to their data after `rm`, what timestamps actually mean, how journaling affects crash recovery and evidence. Computer science students studying operating systems who want a practical application of filesystem theory. Comfortable with hex editors and basic OS concepts, willing to examine raw disk structures inline.

## Problem/Need

Filesystem forensics is the bedrock of digital investigation — nearly every DFIR case involves examining what's on disk, what was deleted, and when things happened. But most practitioners rely on tools (Autopsy, FTK Imager, Sleuthkit) without understanding the filesystem structures underneath. When a tool reports "file deleted at 14:32," the examiner who doesn't understand MFT entry flags or inode deallocation can't evaluate whether that timestamp is reliable, whether the file content is recoverable, or whether anti-forensics could have manipulated the metadata. Cross-filesystem work compounds the problem: an examiner who understands NTFS may not know that ext4 handles deletion completely differently (inode zeroing vs. MFT flag), or that APFS snapshots create a forensic capability that doesn't exist on other filesystems. There's a gap for a deep-dive that compares filesystems at the data structure level, explaining what each preserves and destroys, so examiners can make informed decisions regardless of which tool they're using.

## Unique Angle

- **Cross-filesystem comparison** — covers ext4, NTFS, APFS, and FAT32/exFAT side-by-side rather than treating each in isolation, highlighting where forensic capabilities diverge (NTFS preserves MFT entries after deletion, ext4 zeroes inodes; APFS has snapshots, NTFS has VSS; FAT has no journaling)
- **Data-structure-first** — every forensic operation is grounded in the on-disk structure: show the raw hex of an inode/MFT entry/B-tree node, then explain what the forensic tool is parsing from it
- **Deletion mechanics deep-dive** — traces exactly what happens at the filesystem level when a file is deleted on each filesystem, explaining why recovery is sometimes possible (data blocks not yet overwritten) and sometimes not (TRIM on SSD, inode zeroing, APFS space reclamation)
- **Timeline analysis from first principles** — explains what each timestamp field actually records (not just "modification time" but "last data write that was flushed"), how journaling affects timestamp reliability, and how to build authoritative timelines from $MFT + $UsnJrnl + $LogFile on NTFS or inode + journal on ext4
- **Journal as forensic goldmine** — deep-dives into how NTFS $LogFile/$UsnJrnl and ext4 JBD2 journal contain a history of filesystem operations that survives file deletion, enabling reconstruction of activity even when files are gone
- **Modern filesystem challenges** — covers how APFS copy-on-write semantics, ext4 extent trees, SSD TRIM commands, and filesystem-level encryption change the forensic calculus compared to traditional assumptions

## Scope

**Included**: ext4 on-disk layout (superblock, block groups, inode table, inode structure, extent trees, directory entries, JBD2 journal), NTFS on-disk layout ($MFT, MFT entry structure, attributes: $STANDARD_INFORMATION, $FILE_NAME, $DATA, resident vs non-resident, $BITMAP, $LogFile, $UsnJrnl, alternate data streams), APFS on-disk layout (container superblock, volume superblock, object map, B-tree catalog, inode records, extent records, snapshots, clones), FAT32/exFAT (boot sector, FAT table, directory entries, LFN entries, no journaling implications), file deletion mechanics per filesystem (what's modified, what's preserved, what's recoverable), timestamp forensics (MACE timestamps on NTFS, MAC on ext4/APFS, timestamp resolution differences, timestamp manipulation detection), journal forensics ($LogFile redo/undo records, $UsnJrnl change reasons, ext4 journal transaction replay), file carving from unallocated space (signature-based carving, fragment recovery challenges), Sleuthkit/Autopsy usage for hands-on demonstrations, disk imaging basics (dd, dcfldd, FTK Imager, E01 format), SSD and TRIM forensic impact, filesystem encryption implications (BitLocker, LUKS, FileVault/APFS encryption)

**Excluded**: Memory forensics (separate discipline), network forensics, registry forensics on Windows (separate artifact category), database forensics (SQLite, etc. — separate topic), detailed file carving tool internals (Scalpel, PhotoRec — tool-specific), RAID reconstruction, NAS/SAN forensics, cloud storage forensics, ZFS/Btrfs/XFS (mentioned for comparison, not deep-dived), filesystem driver implementation/kernel code, file system creation/formatting internals beyond what's forensically relevant

## Research Needs

- Review ext4 on-disk format specification (kernel.org documentation, ext4 wiki)
- Study NTFS MFT entry structure and attribute layout in detail ($STANDARD_INFORMATION vs $FILE_NAME timestamps)
- Review APFS specification (Apple's APFS Reference document)
- Map deletion behavior per filesystem with hex-level before/after comparisons
- Study NTFS $UsnJrnl record format and change reason codes
- Research ext4 JBD2 journal structure and transaction replay for forensic timeline
- Study APFS snapshot implementation and forensic recovery capabilities
- Research SSD TRIM impact on forensic recovery across filesystems
- Set up forensic lab (test disk images with known content, deletion, and modification for each filesystem)
- Review Sleuthkit source code for inode/MFT parsing to ground tool explanations
- Gather 2-3 case examples where filesystem-level analysis revealed evidence that file-level tools missed
- Research timestamp manipulation techniques and detection methods

## Estimated Effort

- Research: 8-10 hours (filesystem specifications for ext4/NTFS/APFS/FAT, journal formats, deletion mechanics, SSD TRIM behavior)
- Hands-on lab: 5-7 hours (create test images per filesystem, perform deletions, capture hex dumps, run Sleuthkit analysis, timeline generation, carving demonstrations)
- Writing: 10-14 hours (5000-7000 word deep-dive with hex dumps, data structure diagrams, cross-filesystem comparison tables, and tool output)
- Diagrams: 4-6 hours (inode/MFT/B-tree structure diagrams, deletion state diagrams per filesystem, journal transaction flow, timeline analysis workflow)
- Review/revision: 2-3 hours
- Total: ~29-40 hours across multiple sessions
