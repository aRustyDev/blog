---
id: "b72e41d8-6a93-4f15-8c09-3e5d7f1a9b24"
type: idea
status: draft
created: "2026-03-16T00:00:00Z"
updated: "2026-03-16T00:00:00Z"
---

## Concept

A deep-dive into Windows host forensics — the most mature and artifact-rich forensic discipline in DFIR. Covers the Windows forensic artifact ecosystem organized by investigative question (what executed, when it executed, who executed it, how they got in, how they persisted), the registry as a forensic database (hive structure, key forensic keys across SYSTEM/SOFTWARE/NTUSER/UsrClass, timestamps, deleted key recovery), Windows Event Log analysis (EVTX format, critical event IDs for security/system/PowerShell/Sysmon, log correlation), program execution artifacts (Prefetch, Amcache, ShimCache, BAM/DAM, UserAssist, SRUM), persistence mechanism detection (Run keys, scheduled tasks, services, WMI subscriptions, COM hijacking, DLL search order), file system artifacts specific to Windows (NTFS $MFT, $UsnJrnl, $LogFile, alternate data streams, Volume Shadow Copies, Recycle Bin), and lateral movement evidence (RDP, PsExec, WMI, WinRM, DCOM, named pipes). Registry-first approach: starts with the registry hive as the central forensic database that records system configuration, user activity, and program execution, then expands outward to event logs, filesystem, and network artifacts.

## Target Audience

Incident responders and SOC analysts who investigate Windows endpoint compromises — from commodity malware to APT intrusions. DFIR practitioners who want to move beyond tool-driven analysis to understand what each artifact actually records at the data structure level. Blue team members building detection rules who need to understand which artifacts record which activities. Threat hunters who need to know where to look for evidence of specific TTPs. Junior analysts preparing for GCFE/GCFA/EnCE certifications. Comfortable with Windows administration, willing to examine registry binary structures, EVTX records, and NTFS metadata inline.

## Problem/Need

Windows is the richest forensic environment in existence — decades of backwards compatibility have created layers of overlapping artifacts that record program execution, user activity, and system changes. But this richness is also the problem: there are so many artifacts that investigators either miss critical ones or don't understand the relationship between them. Prefetch tells you something ran; Amcache tells you something was installed; ShimCache tells you something existed on disk — but which do you trust when they disagree? Event ID 4624 records a logon, but what's the difference between Logon Type 3 and Type 10, and which lateral movement technique produces which? The registry contains thousands of forensically relevant keys, but most training covers only a handful. There's a gap for a deep-dive that maps the complete Windows forensic artifact landscape, explains what each artifact actually records (not just "program execution" but the exact conditions under which an entry is created, updated, and persisted), and shows how to correlate across artifacts to build reliable investigation timelines.

## Unique Angle

- **Registry-first** — treats the Windows registry as the central forensic database, explaining the hive binary format (header, bin, cell, key node, value node), then mapping the key forensic locations across all hives with exactly what each records and when it's updated
- **Artifact correlation model** — shows how the same activity (e.g., program execution) creates entries across multiple artifacts (Prefetch, Amcache, ShimCache, UserAssist, BAM, SRUM, Event Logs) and explains the subtle differences in what each captures (creation time vs last run vs existence on disk)
- **Event log deep-dive** — goes beyond "important Event IDs" to explain the EVTX binary format, how to correlate events across channels (Security + System + PowerShell + Sysmon + TaskScheduler), and how log clearing/rolling affects investigation
- **Lateral movement evidence matrix** — maps each lateral movement technique (RDP, PsExec, WMI, WinRM, DCOM, SMB) to the specific artifacts it creates on both the source and destination systems
- **Persistence mechanism encyclopedia** — catalogs every major Windows persistence location with its registry key or file path, how to detect it forensically, and which legitimate software commonly uses each (to distinguish attacker activity from noise)
- **Timeline super-timeline construction** — demonstrates building a comprehensive timeline from $MFT timestamps + $UsnJrnl entries + Event Logs + Prefetch timestamps + registry key last-write times, showing how multiple artifact sources fill each other's gaps

## Scope

**Included**: Registry forensics (hive binary format: header, hbin, cells, key nodes, value nodes; SYSTEM hive: CurrentControlSet, services, network config, time zone, computer name, USB device history; SOFTWARE hive: installed programs, network profiles, Run keys, app compatibility; NTUSER.DAT: UserAssist, MRU lists, typed URLs, recent docs, shell bags, Run keys; UsrClass.dat: shell bags, CLSID associations; SAM: user accounts, last logon; deleted key recovery from hive slack space), Windows Event Logs (EVTX format and structure, Security log: 4624/4625/4634/4648/4672/4688/4697/4698/4720, System log: 7034/7036/7040/7045, PowerShell: 4103/4104/ScriptBlock logging, Sysmon: process creation/network/file creation/registry, ScheduledTask: 106/140/141/200/201, WMI: 5857/5858/5860/5861, RDP: 1149/21/22/24/25, log clearing detection: 1102/104), program execution artifacts (Prefetch: structure, execution count, timestamps, referenced files; Amcache.hve: file entries, program entries, driver entries; ShimCache/AppCompatCache: entry format, last modified time, execution flag; BAM/DAM: background activity entries; UserAssist: ROT13 encoded entries, run count, focus time; SRUM: application resource usage, network usage, energy usage), NTFS forensic artifacts ($MFT: entry structure, $STANDARD_INFORMATION vs $FILE_NAME timestamps, timestomping detection; $UsnJrnl: change journal reason codes, timeline reconstruction; $LogFile: transaction records; Alternate Data Streams: Zone.Identifier, hidden data; Volume Shadow Copies: previous file versions, deleted file recovery; Recycle Bin: $I and $R files, original path and deletion time), lateral movement artifacts (RDP: bitmap cache, event logs 1149/21/22, registry terminal server keys; PsExec: service installation event 7045, Prefetch, named pipe; WMI: event logs 5857-5861, OBJECTS.DATA, scrcons.exe; WinRM: event logs, WSMan traces; DCOM: event logs, DCE/RPC traces; SMB: mapped drives, $MFT entries), persistence mechanisms (registry Run/RunOnce keys, Startup folder, scheduled tasks XML and registry, services, WMI event subscriptions, COM object hijacking, AppInit_DLLs, Image File Execution Options, DLL search order hijacking, Winlogon, boot/logon autostart), disk acquisition (FTK Imager, KAPE, dd, E01/AFF4 formats), timeline analysis tools (plaso/log2timeline, KAPE with Eric Zimmerman tools)

**Excluded**: Memory forensics (Volatility — separate deep-dive topic), malware reverse engineering (separate discipline), Linux/macOS host forensics (sibling project), Active Directory forensics (ntds.dit, GPO — separate scope), Exchange/O365 forensics, cloud-specific Windows (Azure AD, Intune), Windows kernel exploitation forensics, detailed network packet analysis, browser forensics in depth (brief mention for typed URLs/history), mobile device forensics, NTFS filesystem internals beyond forensic artifacts (covered in filesystem forensics parent project)

## Research Needs

- Review registry hive binary format specification (Maxim Suhanov's research, libregf documentation)
- Map critical forensic registry keys across all hives with exact value interpretations
- Study EVTX binary format and event record structure
- Research Prefetch file format (versions 17/23/26/30 across Windows versions)
- Study Amcache.hve structure changes across Windows 10/11 versions
- Review ShimCache/AppCompatCache parsing and the execution flag controversy
- Map lateral movement technique → artifact matrix for source and destination systems
- Research WMI persistence repository format (OBJECTS.DATA)
- Study $UsnJrnl record format and change reason code enumeration
- Set up forensic lab (Windows 10/11 VMs with controlled activity, Sysmon installed, audit policy configured)
- Review Eric Zimmerman's tool suite (RECmd, EvtxECmd, PECmd, AmcacheParser, ShimCacheParser, MFTECmd) for tool grounding
- Review KAPE collection and processing methodology
- Research Volume Shadow Copy forensic recovery and access methods
- Gather 2-3 real investigation scenarios that demonstrate artifact correlation

## Estimated Effort

- Research: 9-12 hours (registry format, event log mapping, execution artifact details, lateral movement matrix, persistence catalog, format version differences across Windows versions)
- Hands-on lab: 6-8 hours (Windows VM setup with audit policy and Sysmon, controlled activities, artifact extraction with KAPE and EZ tools, lateral movement simulation, persistence mechanism implantation, timeline generation with plaso)
- Writing: 12-16 hours (6000-8000 word deep-dive with registry hex dumps, event log examples, artifact correlation tables, lateral movement matrices, and timeline reconstructions)
- Diagrams: 5-7 hours (registry hive structure, artifact correlation model for program execution, lateral movement evidence matrix, persistence mechanism detection flowchart, timeline super-timeline composition)
- Review/revision: 3-4 hours
- Total: ~35-47 hours across multiple sessions
