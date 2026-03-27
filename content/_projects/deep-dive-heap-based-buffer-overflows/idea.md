---
id: "c36671e7-eb7f-4db5-a1ac-600c451400a3"
type: idea
status: draft
created: "2026-03-15T00:00:00Z"
updated: "2026-03-15T00:00:00Z"
---

## Concept

A deep-dive into heap-based buffer overflows — how they work at the memory level, why they're harder to exploit than stack overflows but more dangerous when they land, and what modern mitigations (and bypasses) look like. Covers the heap allocator's data structures (chunks, bins, arenas in glibc's ptmalloc2), how overflow corrupts heap metadata, classic exploitation techniques (unlink, house of force, fastbin dup, tcache poisoning), and modern defenses (ASLR, safe unlinking, heap canaries, hardened allocators). Hands-on with GDB, pwndbg, and a deliberately vulnerable binary.

## Target Audience

Software engineers and security practitioners who understand stack-based buffer overflows and want to go deeper into heap exploitation. Also appeals to CTF players looking to level up from beginner pwn challenges, and systems programmers who want to understand why `malloc` implementations matter for security. Comfortable with C, assembly basics, and debugger usage.

## Problem/Need

Heap exploitation is one of the most important areas in modern vulnerability research, but most educational content is either too theoretical (academic papers on allocator design) or too CTF-specific (write-ups that assume you already know the technique). There's a gap for content that builds from "I understand stack overflows" to "I can reason about heap corruption" — explaining the allocator internals that make exploitation possible, walking through techniques step by step, and connecting each technique to the allocator behavior it exploits.

## Unique Angle

- **Allocator-first approach** — explains ptmalloc2 internals (chunks, bins, tcache) first, then shows how each exploitation technique targets specific allocator behavior
- Hands-on: readers build and exploit a deliberately vulnerable binary, inspecting heap state with GDB/pwndbg at each step
- Traces the evolution of heap exploitation alongside mitigations — each defense motivated by the attack it prevents, each bypass motivated by the defense it circumvents
- Covers modern tcache exploitation (glibc 2.26+), not just legacy techniques
- Diagrams showing heap layout, chunk metadata, and how corruption propagates through the allocator's data structures
- Connects to real CVEs — shows where these techniques have been used in production exploits

## Scope

**Included**: Heap allocator internals (ptmalloc2: chunks, bins — fast, small, large, unsorted — arenas, tcache), heap overflow mechanics, classic techniques (unsafe unlink, house of force, fastbin dup), modern techniques (tcache poisoning, tcache house of spirit, safe-linking bypass), mitigations (safe unlinking, ASLR, heap randomization, hardened allocators), hands-on exploitation with GDB/pwndbg, connection to real CVEs

**Excluded**: Stack-based overflows (prerequisite, not covered), kernel heap exploitation (separate topic), Windows heap exploitation (ntdll RtlHeap — different allocator, different post), format string attacks (separate vulnerability class), ROP/JOP chain construction (assumed as follow-up technique, not taught here), jemalloc/musl/mimalloc internals (focus on glibc ptmalloc2)

## Research Needs

- Review glibc ptmalloc2 source code for current chunk/bin/tcache implementation
- Review safe-linking (glibc 2.32+) and other recent mitigations
- Survey existing heap exploitation tutorials and identify coverage gaps
- Gather 2-3 real CVEs that used heap overflow techniques for concrete examples
- Set up a vulnerable binary and exploitation environment (Ubuntu with known glibc version)
- Review how2heap repository for technique reference and validation
- Research hardened allocators (scudo, PartitionAlloc, hardened_malloc) for mitigations section
- Review pwndbg/pwntools heap inspection commands for the hands-on sections

## Estimated Effort

- Research: 6-8 hours (allocator source review, CVE analysis, environment setup)
- Writing: 8-10 hours (4000-5000 word deep-dive with code, GDB output, and diagrams)
- Diagrams: 3-4 hours (heap layout diagrams, chunk metadata visualization, corruption flow)
- Hands-on lab: 4-6 hours (building vulnerable binary, testing exploitation, capturing GDB output)
- Review/revision: 2-3 hours
- Total: ~23-31 hours across multiple sessions
