---
id: "3b9e72d4-1a58-4c6f-b5d0-9e8c4f7a2d13"
type: idea
status: draft
created: "2026-03-16T00:00:00Z"
updated: "2026-03-16T00:00:00Z"
---

## Concept

A deep-dive into BSD memory forensics — the niche but operationally relevant discipline of capturing and analyzing RAM from FreeBSD, OpenBSD, and NetBSD systems. These operating systems run critical infrastructure (pfSense/OPNsense firewalls, TrueNAS storage, Netflix CDN, network appliances), and when they're compromised, memory analysis may be the only way to find rootkits or in-memory-only implants. Covers memory acquisition on BSD variants (/dev/mem access differences, kernel crash dumps, VM snapshots, bhyve guest memory), the BSD kernel data structures that forensic analysis targets (proc structure, vmspace for virtual memory, kld modules, network socket structures), the current state of tooling (Volatility BSD support gaps, manual analysis with crash/kgdb, custom scripts), and the practical reality of BSD memory forensics in a world where tooling is scarce but the targets are high-value. Infrastructure-first approach: framed through the investigation scenarios that actually arise — compromised firewalls, breached storage servers, suspected rootkits on network appliances — rather than treating BSD memory forensics as an academic exercise.

## Target Audience

DFIR practitioners who encounter BSD systems in investigations, particularly compromised pfSense/OPNsense firewalls or TrueNAS appliances, and need to understand their memory forensics options. Security researchers studying BSD kernel rootkits or developing forensic capabilities for BSD platforms. Incident responders who can do memory forensics on Windows and Linux but have never tackled BSD. FreeBSD/OpenBSD system administrators who want to understand what memory-level evidence their systems could provide during an incident. Comfortable with BSD kernel concepts, willing to work with crash dumps, kernel debugger output, and raw memory structures inline.

## Problem/Need

BSD memory forensics exists in a tooling desert. On Windows, Volatility has comprehensive support with dozens of plugins. On Linux, support is growing with active development. On BSD, Volatility support is minimal to non-existent — there are no maintained BSD plugins for Volatility 3, and Volatility 2's FreeBSD support was limited and outdated. Yet BSD systems are high-value forensic targets: a compromised pfSense firewall can intercept all network traffic, a breached TrueNAS server can access all stored data, and a rootkitted BSD network appliance can persist undetected for years. When these systems are compromised, disk forensics reveals the filesystem state but misses loaded kernel modules, hooked system calls, and in-memory implants. The gap isn't just content — it's capability. Practitioners need to understand what acquisition methods work on BSD, what kernel structures to examine manually when automated tools don't exist, and how to use the BSD kernel debugger (kgdb) and crash dump tools as forensic instruments. This deep-dive addresses the least-served platform in memory forensics.

## Unique Angle

- **Infrastructure-first** — frames BSD memory forensics through real investigation scenarios: compromised pfSense firewall, breached TrueNAS, suspected rootkit on a network appliance — making the niche topic immediately practical
- **The tooling desert, navigated** — honestly addresses the lack of automated tooling and provides practical alternatives: kgdb for crash dump analysis, DDB for live kernel debugging, custom scripts for structure walking, manual /dev/mem reading where available
- **BSD kernel structure walkthrough** — explains the FreeBSD/OpenBSD proc structure, vmspace, kld_file for loaded modules, and socket structures at the field level, enabling manual analysis when Volatility doesn't work
- **Cross-BSD acquisition map** — documents memory acquisition capabilities across FreeBSD, OpenBSD, and NetBSD: /dev/mem restrictions per variant, crash dump configuration (savecore, dumpdev), VM guest memory access, and JTAG/debug port options for embedded BSD
- **Rootkit detection without tools** — demonstrates how to detect BSD kernel rootkits (syscall table hooking, kld module hiding, network tap injection) using crash dump analysis and kgdb, walking kernel structures manually
- **pfSense/OPNsense memory forensics** — dedicated section on memory acquisition and analysis for the most common BSD forensic target: what's in pf state tables in memory, firewall rule manipulation detection, and how to capture memory from a pfSense appliance

## Scope

**Included**: BSD memory acquisition (FreeBSD: /dev/mem access and securelevel restrictions, kernel crash dumps with savecore/dumpdev/dumpon, bhyve VM guest memory, JTAG on embedded systems; OpenBSD: /dev/mem restrictions and kern.allowkmem, crash dumps, vmm guest memory; NetBSD: /dev/mem, crash dumps; VM-based: VMware/QEMU memory files for virtualized BSD), BSD kernel data structures for forensics (FreeBSD proc: p_pid, p_comm, p_ucred, p_vmspace, p_fd, allproc list; vmspace: vm_map, pmap, virtual memory entries; kld structures: linker_file list, module metadata, symbol tables; socket structures: protosw, inpcb, tcpcb for network connections; mount structures: filesystem mount points and vnode cache), crash dump analysis (FreeBSD crash dump format, kgdb usage for forensic analysis, DDB kernel debugger for live analysis, savecore output structure, minidump vs full dump), manual structure walking (using kgdb to traverse allproc list, examining kld_file chain, dumping socket structures, comparing syscall table entries against known-good), rootkit detection (syscall table hooking: comparing sysent entries against kernel symbol table, kld module hiding: scanning memory for kld_file structures not in the linked list, network tap/divert injection, cdevsw hooking for device driver manipulation), pfSense/OPNsense memory forensics (pf state table in memory, firewall rule structures, pf anchor manipulation, NAT state, altq queue state, Suricata/Snort in-memory state if running), OpenBSD-specific (pledge/unveil state in process structures, kernel address space randomization impact), comparison with Linux/Windows memory forensics (what translates: process structure walking is similar to Linux; what doesn't: no Volatility support, different VM subsystem, kld vs kmod)

**Excluded**: macOS memory forensics (separate project — XNU/Mach adds layers not present in pure BSD), Linux memory forensics (sibling project), Windows memory forensics (sibling project), BSD kernel exploitation (offensive topic, referenced for rootkit forensic indicators), Volatility plugin development for BSD (developer topic — would be valuable but outside scope), JunOS memory forensics (vendor-proprietary BSD derivative — too specific), hardware-level acquisition (cold boot, bus-level DMA — specialized), BSD kernel debugging for non-forensic purposes, userland process memory analysis (brief mention, not deep-dived)

## Research Needs

- Review FreeBSD proc/vmspace/kld structures from kernel source code
- Study FreeBSD crash dump format and kgdb forensic usage
- Map /dev/mem access restrictions across FreeBSD, OpenBSD, and NetBSD (securelevel, kern.allowkmem)
- Research BSD kernel rootkit techniques and their memory-level indicators
- Study pf internals for firewall state extraction from memory
- Research bhyve guest memory access for VM-based acquisition
- Review OpenBSD kernel memory protections and their impact on forensic acquisition
- Study FreeBSD kld module loading structures for hidden module detection
- Set up forensic lab (FreeBSD VM with crash dump configured, pfSense VM, kgdb environment)
- Research whether any Volatility 3 BSD development is underway
- Study DDB kernel debugger capabilities for live forensic analysis
- Review savecore(8) and crash(8) documentation for forensic workflow

## Estimated Effort

- Research: 7-9 hours (BSD kernel source review, crash dump format study, cross-BSD acquisition mapping, rootkit technique research, pf internals, tooling landscape assessment)
- Hands-on lab: 5-7 hours (FreeBSD VM with crash dump setup, kernel crash dump capture and analysis with kgdb, manual structure walking, pfSense memory acquisition attempt, rootkit indicator simulation)
- Writing: 7-10 hours (4000-5000 word deep-dive with kernel structure diagrams, kgdb output examples, acquisition comparison tables, and manual analysis walkthroughs)
- Diagrams: 3-4 hours (BSD kernel structure relationships, acquisition decision tree per variant, rootkit detection workflow, pfSense memory artifact map)
- Review/revision: 2-3 hours
- Total: ~24-33 hours across multiple sessions
