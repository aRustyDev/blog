---
id: "d83a15c7-4e62-4b9f-a7d0-1f5c8e3b9a27"
type: idea
status: draft
created: "2026-03-16T00:00:00Z"
updated: "2026-03-16T00:00:00Z"
---

## Concept

A deep-dive into eBPF — the technology that has fundamentally changed how we observe, secure, and network Linux systems by enabling safe, JIT-compiled programs to run inside the kernel without modifying kernel source or loading kernel modules. Covers the eBPF virtual machine and instruction set (registers, instruction encoding, program types), the verifier that makes kernel-space programmability safe (static analysis, bounded loops, memory safety proofs), the map data structures that enable state sharing (hash maps, arrays, ring buffers, per-CPU maps, LRU maps), the hook points where eBPF programs attach (kprobes, tracepoints, XDP, TC, cgroup, LSM, fentry/fexit), the helper functions that provide kernel capabilities to eBPF programs, and the real-world systems built on eBPF (Cilium for networking, Falco/Tetragon for security, bpftrace for tracing, Pixie for observability). Verifier-first approach: starts with the eBPF verifier because it's the innovation that makes everything else possible — understanding what the verifier guarantees (and what it rejects) is key to understanding both the power and the constraints of eBPF.

## Target Audience

Systems engineers and platform engineers who use eBPF-based tools (Cilium, Falco, bpftrace) without understanding the underlying technology. Backend developers who want to understand how their production observability stack works at the kernel level. Security engineers building detection capabilities who need to understand eBPF's tracing and LSM hook capabilities. Linux kernel enthusiasts who want to understand the most significant kernel innovation of the past decade. Developers interested in writing eBPF programs who need foundational knowledge before diving into libbpf or BCC. Comfortable with C and Linux system concepts, willing to examine bytecode, verifier output, and kernel hook points inline.

## Problem/Need

eBPF has become the foundational technology for modern Linux observability, networking, and security — Cilium replaces iptables with eBPF, Falco and Tetragon use it for runtime security, bpftrace and Pixie use it for tracing, and every major cloud provider runs eBPF programs in their infrastructure. But most engineers interact with eBPF only through high-level tools and have no mental model of what's actually happening: what does the verifier check, why do some programs get rejected, how do maps work, what can a kprobe actually see, why is XDP faster than traditional packet processing? This lack of understanding means engineers can't debug eBPF tool failures, can't evaluate which eBPF-based tool fits their use case, and can't write their own programs when existing tools don't suffice. Most eBPF educational content either stays at the "what is eBPF" overview level or jumps straight to "write this BCC script." There's a gap for a deep-dive that explains the eBPF machinery — the VM, the verifier, the maps, the hooks — so that the higher-level tools make sense.

## Unique Angle

- **Verifier-first** — starts with the eBPF verifier as the key innovation, explaining what it proves (memory safety, bounded execution, no infinite loops, valid helper calls) and why these guarantees enable running untrusted code in kernel space — the verifier is what separates eBPF from "just loading a kernel module"
- **Instruction set walkthrough** — explains the eBPF virtual machine (11 registers, 64-bit, RISC-like instruction set, 512-byte stack) with actual bytecode examples, showing what the JIT compiler produces and how programs execute in kernel context
- **Map taxonomy** — covers eBPF maps not as a flat list but as a design space: hash maps for flexible lookups, arrays for indexed access, per-CPU variants for lock-free performance, ring buffers for event streaming, LRU maps for bounded caches, map-in-map for atomic updates — each with its use case and performance characteristics
- **Hook point atlas** — maps every major eBPF attachment point to what it can observe and modify: kprobes/kretprobes (any kernel function), tracepoints (stable ABI), fentry/fexit (type-safe with BTF), XDP (pre-stack packet processing), TC (post-stack), cgroup (process group control), LSM (security policy), uprobe (userspace function tracing) — showing the tradeoffs between flexibility and stability
- **BTF and CO-RE revolution** — explains how BTF (BPF Type Format) and CO-RE (Compile Once, Run Everywhere) solved the portability problem that made eBPF development painful, enabling programs to run across kernel versions without recompilation
- **Real systems dissected** — for each major eBPF application (Cilium, Tetragon, bpftrace), shows which program types, maps, and hooks it uses, connecting the abstract concepts to production systems readers may already use

## Scope

**Included**: eBPF virtual machine (register set: R0-R10, R1-R5 for arguments, R6-R9 callee-saved, R10 frame pointer; instruction encoding: opcode, dst/src registers, offset, immediate; instruction classes: ALU64/ALU32, memory load/store, branch, call, exit; JIT compilation: architecture-specific backends, performance implications), eBPF verifier (static analysis approach, register state tracking, scalar vs pointer types, bounds checking, memory safety for maps/stack/context, bounded loop detection, pruning/caching for performance, verifier log interpretation, common rejection reasons and how to fix them), eBPF maps (BPF_MAP_TYPE_HASH, ARRAY, PERCPU_HASH, PERCPU_ARRAY, LRU_HASH, RINGBUF, PERF_EVENT_ARRAY, PROG_ARRAY for tail calls, STACK_TRACE, MAP_OF_MAPS; map operations: lookup, update, delete; map pinning to bpffs), eBPF program types and hooks (BPF_PROG_TYPE_KPROBE, TRACEPOINT, RAW_TRACEPOINT, PERF_EVENT, SCHED_CLS/ACT for TC, XDP, CGROUP_SKB/SOCK/SYSCTL, LSM, TRACING for fentry/fexit/fmod_ret, STRUCT_OPS), helper functions (bpf_map_lookup_elem, bpf_map_update_elem, bpf_probe_read, bpf_ktime_get_ns, bpf_get_current_pid_tgid, bpf_trace_printk, bpf_ringbuf_output, bpf_skb_load_bytes, bpf_redirect, bpf_get_current_comm — organized by capability category), BTF and CO-RE (BPF Type Format: what it contains, how it's generated, vmlinux BTF; CO-RE: field offset relocation, type existence/size checks, libbpf CO-RE macros), bpf() syscall interface (program load, map create, object pin, prog attach), libbpf as the canonical library, bpftool for introspection, real-world systems (Cilium: XDP+TC programs for networking, identity-based policy; Tetragon: tracing+LSM for runtime security, process execution monitoring; bpftrace: tracepoint+kprobe for ad-hoc tracing, one-liner syntax; Pixie: uprobe+kprobe for application observability), eBPF security considerations (eBPF programs as rootkit vector, unprivileged eBPF restrictions, CAP_BPF capability, signed programs)

**Excluded**: Detailed packet processing with XDP (networking deep-dive territory), writing production eBPF programs (tutorial territory — concepts not implementation), classic BPF / cBPF (brief historical mention only), BCC framework in depth (libbpf is the modern canonical path), eBPF on Windows (brief mention), detailed Cilium networking architecture (Cilium-specific deep-dive), kernel source code deep-dives into verifier implementation (referenced at concept level), eBPF for storage (io_uring, BPF-based filesystems — emerging/niche), HID-BPF, eBPF CPU scheduler (sched_ext)

## Research Needs

- Review eBPF instruction set specification and register conventions
- Study eBPF verifier logic at conceptual level (Alexei Starovoitov's talks and papers)
- Map complete eBPF program type taxonomy with supported hooks and capabilities
- Research eBPF map types with performance characteristics and use case guidance
- Study BTF format and CO-RE relocation mechanism
- Review libbpf API for program loading and map management
- Research Cilium, Tetragon, and bpftrace architecture to identify which eBPF primitives each uses
- Study common verifier rejection scenarios and resolution patterns
- Set up hands-on environment (Linux VM with recent kernel, libbpf, bpftool, bpftrace)
- Review eBPF security considerations (CVEs, rootkit potential, unprivileged restrictions)
- Study JIT compilation behavior and performance characteristics
- Research helper function categories and availability per program type

## Estimated Effort

- Research: 7-9 hours (instruction set, verifier concepts, map taxonomy, program types, BTF/CO-RE, real-world system architecture analysis)
- Hands-on lab: 4-6 hours (eBPF program loading and verification, map operations, kprobe/tracepoint attachment, bpftrace examples, bpftool introspection, verifier rejection debugging)
- Writing: 9-12 hours (5000-6500 word deep-dive with instruction encoding diagrams, verifier output examples, map operation visualizations, hook point atlas, and real-system breakdowns)
- Diagrams: 4-5 hours (eBPF architecture overview, verifier analysis flow, map type decision tree, hook point atlas, BTF/CO-RE relocation model, real-system component maps)
- Review/revision: 2-3 hours
- Total: ~26-35 hours across multiple sessions
