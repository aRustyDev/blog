---
id: "6d2b89a4-3e17-4f5c-a8d0-7c1f5e9b3a62"
type: idea
status: draft
created: "2026-03-16T00:00:00Z"
updated: "2026-03-16T00:00:00Z"
---

## Concept

A deep-dive into Linux memory forensics — the discipline of capturing and analyzing the contents of physical memory (RAM) on Linux systems to find evidence that exists nowhere on disk. Covers memory acquisition on Linux (LiME, AVML, /proc/kcore, /dev/mem restrictions, crash dumps, VM snapshots), the Linux kernel data structures that memory forensics tools parse (task_struct for processes, mm_struct for virtual memory, dentry/inode cache for filesystem activity, socket structures for network connections, kernel module list), Volatility 3 profile/symbol generation for Linux (the ISF/banner problem that makes Linux memory forensics harder than Windows), key analysis plugins and what they reveal (process listing, memory maps, file descriptors, network connections, bash history from memory, kernel module detection, rootkit indicators), and the practical challenges unique to Linux memory forensics (KASLR, kernel version fragmentation, custom kernels, KPTI, lack of pre-built profiles). Kernel-structure-first approach: each analysis technique is explained through the kernel data structure it traverses, so readers understand what Volatility is actually parsing and why it sometimes fails.

## Target Audience

Incident responders who handle Linux server compromises and need to capture and analyze memory for evidence of rootkits, fileless malware, or credential theft. DFIR practitioners who are comfortable with Windows memory forensics (Volatility on Windows) but haven't tackled the Linux-specific challenges (profile generation, KASLR, kernel diversity). Malware analysts investigating Linux threats who need to examine memory dumps for injected code, hidden processes, or in-memory-only payloads. Cloud security engineers who need to capture memory from compromised EC2/GCE instances before termination. Security researchers studying Linux rootkit techniques. Comfortable with Linux system internals, willing to examine kernel data structures and Volatility plugin output inline.

## Problem/Need

Linux memory forensics is significantly harder than Windows memory forensics for one fundamental reason: profile diversity. On Windows, there are a handful of kernel versions and Volatility ships with pre-built profiles for all of them. On Linux, every distribution, kernel version, and custom compilation produces a unique set of kernel symbols and data structure layouts — and without the exact matching profile, Volatility can't parse the memory dump. This means the first step of Linux memory forensics (generate or obtain the correct ISF profile) is often the hardest, and many practitioners give up before they start. Beyond the profile problem, Linux memory forensics involves understanding kernel internals that are less well-documented from a forensic perspective: how task_struct links form the process tree, how mm_struct maps virtual to physical memory, how the dentry cache reveals recently accessed files, and how kernel modules are linked in a way that rootkits manipulate. There's a gap for a deep-dive that demystifies the profile/symbol problem, explains the kernel data structures that analysis depends on, and walks through practical Linux memory forensics from acquisition through rootkit detection.

## Unique Angle

- **Kernel-structure-first** — explains each Volatility plugin by showing the kernel data structure it parses (task_struct → linux.pslist, mm_struct → linux.maps, files_struct → linux.lsof), so readers understand what's being traversed and why incorrect profiles cause failures
- **The profile problem, solved** — dedicated section on the ISF/symbol generation challenge that blocks most Linux memory forensics: how to generate profiles with dwarf2json, how to match kernel banners, how to handle custom kernels, and strategies for cloud instances where you don't control the kernel
- **Acquisition method comparison** — compares LiME (loadable kernel module), AVML (userspace via /proc/kcore), /dev/mem (restricted), crash dumps, and VM/cloud snapshots, explaining what each captures, what it misses, and atomicity tradeoffs
- **Rootkit detection methodology** — walks through the forensic indicators of common Linux rootkit techniques: process hiding (task_struct unlinking), kernel module hiding (list manipulation), syscall table hooking, LD_PRELOAD injection, eBPF-based rootkits — with the specific Volatility plugins and manual analysis to detect each
- **KASLR and KPTI impact** — explains how kernel address space layout randomization and kernel page table isolation affect memory analysis, and how modern tools handle them
- **Live memory vs disk correlation** — demonstrates the investigative value of comparing memory state with disk artifacts: processes running but not in /proc (hidden), files open but deleted from disk (evidence destruction), network connections not in logs (covert channels)

## Scope

**Included**: Memory acquisition methods (LiME: compilation, loading, output formats; AVML: userspace acquisition, Azure integration; /proc/kcore: capabilities and limitations; /dev/mem: modern restrictions and workarounds; crash dump: kdump configuration, makedumpfile; VM snapshots: VMware .vmem, KVM/QEMU snapshots, AWS/GCP memory forensic options), Volatility 3 for Linux (ISF symbol table generation with dwarf2json, kernel banner identification, profile matching, symbol table sources: debug symbols, System.map, vmlinux), key kernel data structures (task_struct: process metadata, state, parent/child/sibling links, credentials, namespaces; mm_struct: virtual memory areas, page tables, mmap regions; files_struct: file descriptor table, open files; dentry cache: recently accessed file paths; sk_buff/socket: network connection state; module: kernel module linked list), core analysis plugins (linux.pslist, linux.pstree, linux.bash, linux.lsof, linux.maps, linux.proc_maps, linux.sockstat, linux.lsmod, linux.check_syscall, linux.check_modules, linux.keyboard_notifiers, linux.hidden_modules, linux.malfind), rootkit detection (process hiding via task_struct unlinking, kernel module hiding via list_del, syscall table hooking/modification, inline function hooking, LD_PRELOAD and ld.so.preload injection, eBPF program abuse, /dev/mem rootkits), KASLR handling (kaslr_shift detection, physical-to-virtual offset calculation), practical analysis workflow (acquisition → profile matching → process analysis → network analysis → rootkit checks → memory-to-disk correlation), fileless malware detection (in-memory-only payloads, deleted-but-open executables, injected shared objects, memfd_create abuse), credential extraction from memory (SSH keys, environment variables, process memory containing passwords)

**Excluded**: Windows memory forensics (separate platform), macOS memory forensics (separate platform), kernel exploitation techniques (offensive topic, referenced for rootkit context), detailed Volatility plugin development (developer topic), hardware-level memory acquisition (cold boot attacks, DMA — specialized), memory forensics for containers specifically (referenced for namespace-aware analysis), Android memory forensics, UEFI/firmware memory analysis, detailed virtual memory management theory beyond forensic relevance, crash dump analysis for debugging (non-forensic use case)

## Research Needs

- Review Volatility 3 Linux plugin architecture and current plugin coverage
- Study dwarf2json workflow for ISF symbol table generation from debug symbols
- Map key Linux kernel data structures with field offsets for forensic analysis (task_struct, mm_struct, files_struct, module)
- Research LiME vs AVML acquisition comparison (atomicity, kernel version requirements, cloud compatibility)
- Study Linux rootkit techniques and their memory-level indicators (Reptile, Diamorphine, TripleCross, eBPF-based)
- Research KASLR implementation and how Volatility resolves the kernel slide
- Review cloud memory acquisition options (AWS Nitro limitations, GCP memory forensics, Azure AVML integration)
- Study memfd_create and fileless malware patterns in Linux memory
- Set up forensic lab (Linux VM with debug symbols, LiME compiled, controlled rootkit for detection demonstration)
- Review kernel namespaces impact on process visibility in memory analysis
- Research Volatility 3 vs Volatility 2 differences for Linux support
- Study /proc/kcore format and AVML's approach to userspace acquisition

## Estimated Effort

- Research: 8-10 hours (kernel data structures, Volatility 3 Linux internals, rootkit techniques, acquisition method comparison, cloud memory options)
- Hands-on lab: 6-8 hours (LiME/AVML acquisition, profile generation with dwarf2json, Volatility analysis walkthrough, rootkit installation and detection, fileless malware simulation, memory-to-disk correlation)
- Writing: 9-12 hours (4500-6000 word deep-dive with kernel structure diagrams, Volatility output examples, rootkit detection walkthroughs, and acquisition comparison tables)
- Diagrams: 4-5 hours (task_struct linked list diagram, kernel data structure relationships, rootkit hiding techniques visualization, acquisition method comparison, analysis workflow)
- Review/revision: 2-3 hours
- Total: ~29-38 hours across multiple sessions
