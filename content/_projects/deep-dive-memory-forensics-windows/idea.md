---
id: "f18e63c5-4a29-4d7b-b5e0-8d3c7f2a1e96"
type: idea
status: draft
created: "2026-03-16T00:00:00Z"
updated: "2026-03-16T00:00:00Z"
---

## Concept

A deep-dive into Windows memory forensics — the most mature branch of memory forensics, where the combination of well-documented kernel structures, pre-built Volatility profiles, and the prevalence of in-memory attacks makes RAM analysis an essential investigation technique. Covers memory acquisition on Windows (WinPmem, DumpIt, FTK Imager, crash dumps, Hyper-V snapshots), the Windows kernel data structures that memory forensics tools parse (EPROCESS for processes, VAD tree for virtual memory, PEB/LDR for loaded modules, OBJECT_HEADER for handles, pool allocations), Volatility 3 analysis organized by investigation phase (process analysis, DLL/module analysis, network connections, registry hives from memory, handle analysis, code injection detection), advanced techniques (DKOM rootkit detection, VAD-based injection analysis, process hollowing/Reflective DLL detection, pool tag scanning for hidden objects), and the integration of memory forensics with disk artifacts to build complete investigation timelines. EPROCESS-first approach: starts with the EPROCESS structure as the nucleus of Windows memory forensics, since nearly every analysis technique begins by walking the process list.

## Target Audience

Incident responders investigating Windows endpoint compromises, especially those involving fileless malware, process injection, or credential theft. DFIR practitioners who have used Volatility at a surface level (ran pslist, saw output) but want to understand what the tools are actually parsing in memory. Malware analysts who need to extract injected payloads, reconstruct process hollowing, or identify reflective DLL loading from memory dumps. SOC analysts who receive memory dump artifacts and need to analyze them effectively. Threat hunters looking for indicators of in-memory-only attacks. Comfortable with Windows internals concepts, willing to examine kernel structures and Volatility output inline.

## Problem/Need

Modern attacks on Windows increasingly live in memory: fileless malware executes entirely in RAM via PowerShell/WMI, process injection techniques (hollowing, reflective loading, APC injection) place malicious code inside legitimate processes, and credential dumping tools like Mimikatz operate on in-memory copies of LSASS. Disk-based forensics misses all of this — the malicious code may never touch the filesystem. Memory forensics captures what's actually running, but most practitioners treat Volatility as a black box: they run plugins and read output without understanding that `pslist` walks EPROCESS linked lists (which rootkits can manipulate), that `malfind` looks for VAD regions with suspicious protection flags, or that `handles` traverses the handle table for each process. This gap means they can't evaluate when tools might miss evidence (DKOM hiding) or produce false positives. There's a need for a deep-dive that connects Volatility plugins to the Windows kernel structures they parse, explains what each technique can and cannot find, and walks through the modern injection techniques that make memory forensics essential.

## Unique Angle

- **EPROCESS-first** — starts with the EPROCESS/KPROCESS structure as the central object in Windows memory forensics, showing how process lists, thread lists, VAD trees, handle tables, and token information all hang off this structure
- **Kernel structure walkthroughs** — for each major analysis area, shows the actual Windows kernel structure being parsed: EPROCESS for processes, _LIST_ENTRY for linked lists, _RTL_BALANCED_NODE for VAD trees, PEB/LDR_DATA_TABLE_ENTRY for loaded modules, _FILE_OBJECT for handles
- **Injection technique gallery** — covers modern process injection techniques with their memory-level indicators: classic DLL injection (CreateRemoteThread), process hollowing (unmapped sections), reflective DLL loading (non-file-backed executable VADs), process doppelgänging (transacted hollowing), APC injection, early bird injection — with Volatility detection methodology for each
- **DKOM deep-dive** — explains Direct Kernel Object Manipulation as both an evasion technique and a forensic challenge: how rootkits unlink EPROCESS from ActiveProcessLinks, how pool tag scanning bypasses this hiding, and how cross-referencing pslist vs psscan reveals hidden processes
- **Credential extraction walkthrough** — demonstrates extracting credentials from LSASS memory: how Mimikatz works at the memory level, what structures it reads (LogonSessionList, credential providers), and how to detect credential dumping after the fact
- **Memory-to-disk integration** — shows how memory forensics fills gaps in disk analysis (injected code has no file, deleted files are still in memory) and how disk artifacts fill gaps in memory analysis (process execution history beyond current memory state), building a combined investigation methodology

## Scope

**Included**: Memory acquisition methods (WinPmem: kernel driver, output formats; DumpIt: commercial, one-click; FTK Imager: memory capture mode; comae/Magnet RAM Capture; Windows crash dumps: full, kernel, minidump; Hyper-V checkpoints: .vmrs format; cloud options: AWS Nitro, Azure), Windows kernel structures for forensics (EPROCESS: ActiveProcessLinks, VadRoot, ObjectTable, Token, ImageFileName, CreateTime, ExitTime, UniqueProcessId, InheritedFromUniqueProcessId; PEB: ImageBaseAddress, ProcessParameters, Ldr; LDR_DATA_TABLE_ENTRY: loaded module list, BaseDllName, FullDllName, EntryPoint; VAD: _MMVAD, VadNode, StartingVpn, EndingVpn, VadFlags, Protection, ControlArea/FilePointer; OBJECT_HEADER: TypeIndex, Body, handle table structure; pool allocations: pool tags, pool headers), Volatility 3 core plugins (windows.pslist, windows.psscan, windows.pstree, windows.cmdline, windows.dlllist, windows.ldrmodules, windows.handles, windows.filescan, windows.netscan, windows.netstat, windows.hivelist, windows.printkey, windows.hashdump, windows.malfind, windows.vadinfo, windows.modules, windows.modscan, windows.ssdt, windows.callbacks, windows.driverirp, windows.svcscan), injection detection (malfind: VAD protection analysis, PAGE_EXECUTE_READWRITE detection; hollowing: unmapped image sections, PEB discrepancies; reflective loading: non-file-backed executable VADs; process doppelgänging indicators; APC injection artifacts; thread start address analysis), DKOM rootkit detection (pslist vs psscan comparison, pool tag scanning for hidden EPROCESS, thread scanning for orphaned threads, driver object scanning for hidden drivers, SSDT hooking detection, IRP hooking detection), credential forensics (LSASS memory structure, LogonSessionList, Mimikatz memory-level operation, credential extraction with hashdump/lsadump, detecting LSASS access/dumping artifacts in memory), registry from memory (hive list enumeration, in-memory registry parsing, comparing memory registry with disk registry for tampering detection), analysis workflow (acquisition → profile identification → process survey → injection scan → network analysis → credential check → rootkit detection → timeline integration)

**Excluded**: Linux memory forensics (sibling project), macOS memory forensics (separate platform), kernel exploitation techniques in detail (offensive topic, referenced for rootkit context), Volatility plugin development (developer topic), hardware-level acquisition (cold boot, DMA — specialized), hibernation file analysis (hiberfil.sys — brief mention), page file analysis (pagefile.sys — brief mention), detailed malware reverse engineering from extracted payloads (RE discipline), WinDbg kernel debugging (debugging, not forensics), crash dump debugging for stability issues (non-forensic use case)

## Research Needs

- Review Volatility 3 Windows plugin architecture and current plugin coverage
- Study key Windows kernel structures at field-offset level (EPROCESS, PEB, VAD, LDR_DATA_TABLE_ENTRY)
- Map modern process injection techniques to their memory-level indicators
- Research DKOM rootkit techniques and pool tag scanning bypasses
- Study LSASS memory structure for credential extraction analysis
- Review WinPmem vs DumpIt vs FTK Imager acquisition comparison (format, atomicity, reliability)
- Research Windows crash dump formats (full, kernel, mini) and their forensic utility
- Study cloud memory acquisition options (AWS Nitro limitations, Azure memory capture, Hyper-V snapshots)
- Set up forensic lab (Windows 10/11 VM, process injection tools for demonstration, Mimikatz for credential exercise, simple rootkit for DKOM detection)
- Review Volatility 3 vs Volatility 2 differences for Windows analysis
- Research Windows Defender Credential Guard impact on credential extraction
- Study ETW (Event Tracing for Windows) traces in memory

## Estimated Effort

- Research: 8-10 hours (kernel structure documentation, injection technique mapping, DKOM techniques, credential extraction internals, acquisition comparison, cloud options)
- Hands-on lab: 6-8 hours (memory acquisition with multiple tools, Volatility analysis walkthrough, process injection simulation and detection, credential extraction exercise, DKOM rootkit detection, memory-to-disk correlation)
- Writing: 10-14 hours (5500-7000 word deep-dive with kernel structure diagrams, Volatility output examples, injection technique indicators, DKOM detection walkthroughs, and credential analysis)
- Diagrams: 4-6 hours (EPROCESS structure and relationships, VAD tree visualization, injection technique indicators, DKOM hiding mechanism, analysis workflow, memory-to-disk integration model)
- Review/revision: 2-3 hours
- Total: ~30-41 hours across multiple sessions
