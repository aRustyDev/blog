---
id: "2b8d63e5-a41f-4c97-9e0a-f73c1d5b8a29"
type: idea
status: draft
created: "2026-03-15T00:00:00Z"
updated: "2026-03-15T00:00:00Z"
---

## Concept

A deep-dive into Android forensics — the platform-specific discipline of extracting and analyzing evidence from Android devices. Covers Android's storage architecture (ext4/f2fs partitions, /data layout, app sandboxing), encryption evolution (FDE with dm-crypt through FBE with fscrypt, CE/DE storage, Keymaster/StrongBox key hierarchy), acquisition methods specific to Android (ADB logical, ADB backup limitations, custom recovery, bootloader exploits, EDL/JTAG/chip-off), the Android artifact landscape (SQLite databases, SharedPreferences XML, protocol buffers, content providers), key forensic artifacts by app and OS component (Google account data, call/SMS databases, location history, notification log, UsageStats, media scanner), and deleted data recovery on Android (SQLite WAL/journal carving, f2fs undelete challenges, NAND-level recovery). AOSP-first approach: each forensic technique is explained through Android's open-source architecture, showing the actual code paths and storage formats that tools exploit.

## Target Audience

DFIR practitioners who handle Android devices regularly but rely on commercial tools without understanding the underlying extraction mechanisms. Security researchers analyzing Android malware or spyware who need to know where evidence persists. Mobile developers who want to understand what forensic traces their apps leave. Law enforcement digital forensics analysts specializing in or transitioning to mobile. Also appeals to CTF players working mobile forensics challenges. Comfortable with Linux file systems and command-line tools, willing to work with ADB, SQLite, and hex editors inline.

## Problem/Need

Android's open-source nature makes it simultaneously the most forensically accessible and most fragmented mobile platform. Unlike iOS with its uniform hardware and software, Android spans thousands of device models, multiple OEM customizations, varying bootloader lock states, and different encryption implementations. This fragmentation means that a forensic technique that works on a Samsung Galaxy differs from what works on a Google Pixel or a OnePlus device. Commercial tools abstract this complexity but break frequently on new devices or OS versions, and when they fail, the examiner who understands Android internals can often find alternative paths. There's a gap for a deep-dive that maps forensic capabilities to Android's actual architecture — why unlocked bootloaders enable physical acquisition, how FBE's CE/DE split determines what's accessible on a locked device, where each app stores its data under /data/data/, and what AOSP's source code reveals about artifact formats.

## Unique Angle

- **AOSP source-grounded** — references actual Android source code (ContentProviders, database schemas, system services) to explain where artifacts come from and why they're stored the way they are
- **Encryption state matrix** — maps device state (BFU, AFU locked, AFU unlocked) × encryption type (FDE, FBE) × acquisition method to a concrete "what you get" matrix, replacing vague tool documentation with architectural explanation
- **Partition-level walkthrough** — traces the Android partition layout (boot, system, vendor, userdata, metadata) and explains what each contains forensically, including recovery and factory reset implications
- **Per-artifact provenance** — for each key artifact (calls, SMS, location, notifications), traces the data from the Android API that generates it → the ContentProvider that stores it → the SQLite database file → the table and column schema → the forensic tool parser that reads it
- **Fragmentation-aware** — explicitly addresses OEM differences (Samsung Knox, Pixel Titan M, Huawei eRecovery) and how they affect acquisition and artifact availability
- **ADB-first methodology** — demonstrates what's achievable with ADB + open-source tools (ALEAPP, adb-export, SQLite CLI) before introducing commercial tools, establishing a baseline that doesn't require $10K licenses

## Scope

**Included**: Android partition layout (boot, system, vendor, userdata, metadata, persist), file systems (ext4, f2fs, YAFFS2 legacy), app data storage (/data/data/ structure, SQLite databases, SharedPreferences, internal/external storage), Android encryption (FDE with dm-crypt, FBE with fscrypt, CE vs DE storage, Keymaster HAL, StrongBox, key derivation from lockscreen credential), acquisition methods (ADB pull on rooted/unrooted, ADB backup limitations post-Android 12, custom recovery boot, bootloader unlock + dd, EDL mode on Qualcomm, JTAG, chip-off), key artifacts: telephony (contacts2.db, calllog.db, mmssms.db), location (cache.wifi, LocationHistory, Google Maps history, cell tower logs), messaging (per-app databases: WhatsApp msgstore.db, Telegram, Signal), browser (Chrome history, cookies, saved passwords), system (packages.xml, UsageStats, notification_log, battery stats, WiFi configs), media (media scanner database, thumbnails, EXIF data), Google account (account sync, Google Photos, Drive, Keep), ALEAPP artifact parsers and usage, SQLite forensics on Android (WAL mode, journal, freelist pages, deleted record recovery), factory reset analysis (what survives, crypto footer wipe vs data overwrite), anti-forensics on Android (secure folder, app hiding, encrypted messengers)

**Excluded**: iOS forensics (separate project: deep-dive-mobile-forensics covers both at overview level), Android malware reverse engineering (offensive/RE topic), Android application pentesting (security testing topic), rooting methods and exploits in detail (referenced for acquisition context only), carrier/SIM forensics (brief mention), Android kernel exploitation, custom ROM forensics (LineageOS etc. — niche), Android enterprise/MDM bypass, baseband/modem forensics, Android Automotive/TV/Wear OS

## Research Needs

- Review Android FBE implementation in AOSP (vold, fscrypt, Keymaster HAL)
- Map current Android partition layout across reference devices (Pixel 7/8, Samsung S23/S24)
- Study ALEAPP parser source code to map artifact coverage
- Research EDL (Emergency Download) mode exploitation for Qualcomm devices
- Review SQLite WAL and journal recovery techniques specific to Android's SQLite version
- Study Samsung Knox architecture and its forensic implications (KNOX warranty void, Secure Folder encryption)
- Gather artifact database schemas for key apps (WhatsApp, Telegram, Signal, Chrome) on current Android versions
- Research factory reset effectiveness across file systems (ext4 TRIM behavior, f2fs garbage collection)
- Set up forensic examination environment (test Pixel device, ADB, ALEAPP, SQLite browser, Autopsy)
- Review current state of bootloader unlock policies across major OEMs
- Study Pixel Titan M security chip and its impact on physical acquisition

## Estimated Effort

- Research: 8-10 hours (AOSP encryption code review, partition layout mapping, OEM-specific acquisition research, artifact schema documentation)
- Hands-on lab: 5-7 hours (test device extractions via multiple methods, ALEAPP runs, SQLite artifact examination, deleted data recovery attempts, factory reset analysis)
- Writing: 10-14 hours (5000-6500 word deep-dive with architecture diagrams, database schemas, ADB command sequences, and tool output)
- Diagrams: 4-5 hours (partition layout, FBE key hierarchy, encryption state matrix, artifact provenance flow, acquisition decision tree)
- Review/revision: 2-3 hours
- Total: ~29-39 hours across multiple sessions
