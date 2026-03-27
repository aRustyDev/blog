---
id: "7f4a28c1-3e95-4b0d-a6f8-d12e5c8b9037"
type: idea
status: draft
created: "2026-03-15T00:00:00Z"
updated: "2026-03-15T00:00:00Z"
---

## Concept

A deep-dive into mobile forensics — the discipline of extracting, preserving, and analyzing evidence from mobile devices. Covers the acquisition spectrum (logical, filesystem, physical, chip-off), how mobile operating systems store data (iOS Data Protection, Android's FDE/FBE, SQLite databases, plists, protocol buffers), the forensic artifacts that matter (call logs, messages, location data, app caches, deleted data recovery), tool-assisted analysis (Cellebrite UFED, Magnet AXIOM, open-source alternatives like ALEAPP/iLEAPP/MEAT), and the legal/procedural framework that governs what you can extract and how (chain of custody, court admissibility, consent vs warrant). Architecture-first approach: each forensic technique is explained through the underlying storage and encryption mechanisms it targets, not just "press this button in the tool."

## Target Audience

DFIR practitioners (digital forensics and incident response), security engineers, law enforcement analysts transitioning to digital forensics, and cybersecurity students preparing for certifications (GCFE, CCE, MCFE). Engineers who understand operating systems and file systems but haven't worked specifically with mobile device extraction. Also appeals to mobile developers curious about what forensic artifacts their apps leave behind and privacy researchers studying data exposure. Comfortable with file system concepts, willing to work with hex editors and database browsers inline.

## Problem/Need

Mobile devices are the primary evidence source in most investigations — criminal, corporate, and incident response — yet mobile forensics knowledge is heavily tool-dependent. Practitioners learn to use Cellebrite or AXIOM without understanding *why* a logical acquisition misses deleted data, *how* iOS Data Protection encryption works at the key hierarchy level, or *what* determines whether a physical extraction is possible on a given device. When tools fail (and they frequently do with newer devices, updated OS versions, or locked devices), the practitioner who understands the underlying architecture can pivot to alternative methods. There's a gap for a deep-dive that connects forensic techniques to the mobile OS internals they exploit — why a BFU (Before First Unlock) device yields fewer artifacts, how file-based encryption changes what's accessible per-file, and what "deleted" actually means in SQLite WAL files vs NAND flash.

## Unique Angle

- **Acquisition spectrum** — maps every extraction method (logical, advanced logical, filesystem, physical, chip-off, JTAG, ISP) to the OS layer it accesses, explaining what each level reveals and what it misses
- **Encryption architecture** — explains iOS Data Protection classes (NSFileProtectionComplete through None) and Android FBE (CE/DE storage) at the key hierarchy level, showing exactly what's accessible in each device state (BFU, AFU, fully unlocked)
- **Artifact deep-dives** — traces specific forensic artifacts through their storage format: iMessage in `sms.db`, location in `cache_encryptedB.db`, Android notifications in `notification_log`, app caches in SQLite WAL/journal files
- **Deleted data recovery** — explains *why* deleted data is sometimes recoverable (SQLite free pages, NAND wear leveling, WAL checkpointing) and when it isn't (TRIM, encrypted file deletion, secure enclave operations)
- **Tool-agnostic methodology** — covers both commercial tools (Cellebrite, AXIOM) and open-source alternatives (ALEAPP, iLEAPP, mvt, MEAT), emphasizing understanding over button-pressing
- **Legal/procedural integration** — each technique is annotated with its procedural requirements (consent, warrant, border exception) and chain of custody implications, not as an afterthought but as part of the forensic workflow

## Scope

**Included**: Mobile forensic acquisition methods (logical, filesystem, physical, chip-off, JTAG/ISP, cloud), iOS Data Protection architecture (key hierarchy, protection classes, Secure Enclave role, BFU vs AFU), Android encryption (FDE legacy, FBE with CE/DE, Keymaster/Strongbox), SQLite forensics (WAL files, journal mode, free pages, deleted record recovery), key forensic artifacts by category (communications, location, media, browser, app data), iOS-specific artifacts (KnowledgeC, PowerLog, Health, biome), Android-specific artifacts (UsageStats, notification_log, Google account sync), commercial tools overview (Cellebrite UFED, Magnet AXIOM, GrayKey), open-source tools (ALEAPP, iLEAPP, mvt, MEAT, SQLite examination), chain of custody and evidence handling, legal framework overview (4th Amendment digital search, consent, warrant requirements), anti-forensics awareness (factory reset effectiveness, secure deletion, encryption as barrier)

**Excluded**: Network forensics involving mobile devices (separate discipline), malware analysis on mobile platforms (reverse engineering topic), mobile application penetration testing (offensive security topic), detailed legal jurisdiction comparisons (US-centric framework with notes), SIM card forensics in detail (brief mention only), IoT/wearable device forensics (smartwatch, fitness tracker — separate scope), mobile device management (MDM) bypass techniques, baseband/radio forensics, detailed NAND flash internals (referenced for chip-off context only)

## Research Needs

- Review iOS Data Protection architecture (Apple Platform Security Guide, latest version)
- Study Android file-based encryption implementation (AOSP documentation, Keymaster HAL)
- Map SQLite forensic recovery techniques (WAL analysis, free page carving, journal file examination)
- Research current Cellebrite UFED and GrayKey capabilities and limitations by device/OS version
- Review ALEAPP and iLEAPP artifact parser lists for coverage mapping
- Study BFU vs AFU extraction differences with specific artifact examples
- Gather 2-3 case studies where forensic technique choice affected evidence recovery
- Review NIST SP 800-101 Rev 1 (Guidelines on Mobile Device Forensics)
- Research current state of GrayKey/Cellebrite vs latest iOS/Android security
- Set up forensic examination environment (test devices, extraction tools, SQLite browser)
- Review mvt (Mobile Verification Toolkit) for spyware detection use case

## Estimated Effort

- Research: 7-9 hours (iOS/Android encryption architecture, tool capabilities, legal framework, NIST guidelines)
- Hands-on lab: 4-6 hours (test device extractions, SQLite artifact examination, tool comparison, deleted data recovery demonstration)
- Writing: 9-12 hours (4500-6000 word deep-dive with architecture diagrams, artifact examples, and tool output screenshots)
- Diagrams: 3-5 hours (acquisition spectrum visualization, iOS key hierarchy, Android FBE architecture, forensic workflow decision tree)
- Review/revision: 2-3 hours
- Total: ~25-35 hours across multiple sessions
