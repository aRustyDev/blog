---
id: "b6b8e06a-c77c-4a1e-ab0c-f55b01f792d0"
type: idea
status: draft
created: "2026-03-15T00:00:00Z"
updated: "2026-03-15T00:00:00Z"
---

## Concept

A deep-dive into stack-based buffer overflows — the foundational memory corruption vulnerability. Covers the x86-64 call stack layout (stack frames, return addresses, saved registers, local variables), how a buffer overflow overwrites adjacent memory, control flow hijacking via return address overwrite, shellcode injection, and the evolution of mitigations (stack canaries, NX/DEP, ASLR) alongside bypasses (ROP chains, ret2libc, information leaks). Hands-on with GDB/pwndbg from a simple `strcpy` overflow to a working exploit against a deliberately vulnerable binary.

## Target Audience

Software engineers and aspiring security practitioners who understand C and basic assembly but haven't explored exploitation. Prerequisite for the heap overflow deep-dive. Also appeals to systems programmers who want to understand why `strcpy` is dangerous at the machine level, and CTF beginners looking for a solid foundation in binary exploitation. Comfortable with C, willing to learn x86-64 assembly basics inline.

## Problem/Need

Stack-based buffer overflows are the "hello world" of exploitation — foundational to understanding all memory corruption vulnerabilities. But most educational content either oversimplifies ("just overwrite the return address") or assumes too much background (jumps straight to ROP without explaining the stack layout). There's a gap for a thorough walkthrough that builds from the call convention up: why the stack is laid out the way it is, why that layout creates the vulnerability, and how each mitigation addresses a specific part of the attack chain.

## Unique Angle

- **Call convention first** — starts with x86-64 calling convention and stack frame layout, so the vulnerability emerges naturally from how function calls work
- Progressive complexity: simple return address overwrite → shellcode injection → NX bypass (ret2libc) → ASLR bypass (information leak + ROP)
- Each mitigation introduced at the point where it would have stopped the current technique — readers understand *why* each defense exists
- Hands-on throughout: every concept demonstrated in GDB/pwndbg with actual memory inspection, not just diagrams
- Covers both the attacker and defender perspective — "here's how to exploit it" and "here's how to prevent it"
- Sets up the heap overflow deep-dive as a natural sequel ("now that you understand stack corruption, let's look at the heap")

## Scope

**Included**: x86-64 call stack layout (RSP, RBP, return address, callee/caller-saved registers), buffer overflow mechanics (`strcpy`, `gets`, off-by-one), return address overwrite and control flow hijacking, shellcode basics (execve `/bin/sh`), NX/DEP and the end of executable stacks, ret2libc as NX bypass, stack canaries and how they're checked, ASLR and information leaks, ROP chain basics (gadget finding, chain construction), hands-on exploitation with GDB/pwndbg/pwntools, compiler flags that affect exploitability (`-fno-stack-protector`, `-z execstack`, `-no-pie`)

**Excluded**: Heap-based overflows (separate deep-dive project), format string vulnerabilities (separate topic), Windows-specific exploitation (SEH, SafeSEH — different post), kernel exploitation, advanced ROP (JOP, SROP, sigreturn-oriented — follow-up material), ARM/RISC-V stack exploitation (x86-64 only)

## Research Needs

- Review x86-64 System V ABI calling convention details
- Set up exploitation lab (Ubuntu with specific compiler/glibc versions, ASLR toggling)
- Build progressively vulnerable binaries (no protections → canary → NX → full RELRO+PIE)
- Review how GCC stack protector implementation works (`__stack_chk_fail`)
- Research current state of stack canary bypasses
- Gather 2-3 classic CVEs that used stack overflow for real-world grounding
- Review pwntools exploit development workflow for the hands-on sections
- Verify ROPgadget / ropper tooling for gadget discovery walkthrough

## Estimated Effort

- Research: 4-6 hours (ABI review, lab setup, CVE selection)
- Hands-on lab: 4-6 hours (building vulnerable binaries, developing exploits, capturing GDB output)
- Writing: 7-9 hours (3500-4500 word deep-dive with code, assembly, GDB output, and diagrams)
- Diagrams: 3-4 hours (stack frame layout, overflow visualization, ROP chain diagram)
- Review/revision: 2-3 hours
- Total: ~20-28 hours across multiple sessions
