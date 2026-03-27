---
id: "4c7e29b1-8d53-4a6f-b0e2-3a9f1c5d7e48"
type: idea
status: draft
created: "2026-03-16T00:00:00Z"
updated: "2026-03-16T00:00:00Z"
---

## Concept

A deep-dive into eBPF internals — going beneath the user-facing API to examine the kernel-side implementation: how the bpf() syscall loads programs, how the verifier actually performs its static analysis (register state tracking, path exploration, pruning), how the JIT compiler translates bytecode to native instructions, how maps are implemented as kernel data structures, how programs are attached to hooks and invoked, and how the kernel manages eBPF program lifecycle (reference counting, pinning, freeing). This is the sequel to the eBPF overview deep-dive — where that project explains *what* eBPF does, this one explains *how the kernel implements it*. Source-code-first approach: each mechanism is explained by walking through the relevant kernel source code paths (kernel/bpf/), showing the actual C implementation of the verifier, JIT, and map operations.

## Target Audience

Kernel developers and aspiring kernel developers who want to understand the eBPF subsystem implementation. eBPF tool developers who need to understand verifier behavior at the source level to debug program rejections. Security researchers analyzing eBPF for vulnerabilities (verifier bypasses are high-value CVEs) or developing eBPF-based security tools. Systems engineers who want to understand eBPF performance characteristics at the implementation level (JIT code quality, map operation complexity, hook invocation overhead). Contributors to eBPF ecosystem projects (libbpf, bpftool, Cilium, Tetragon) who need kernel-side knowledge. Comfortable reading C and kernel source code, willing to trace through kernel call paths inline.

## Problem/Need

The eBPF overview deep-dive explains the concepts — program types, maps, hooks, the verifier. But understanding *how* the kernel implements these concepts requires going into the source code, and the kernel's eBPF subsystem (kernel/bpf/) is large and interconnected. The verifier alone is thousands of lines of complex static analysis logic. Engineers who need to understand why a program is rejected, why a certain map operation is slow, how JIT compilation affects performance, or where eBPF security boundaries are enforced need source-level understanding. Most eBPF content stops at the API boundary. The few resources that go deeper (kernel commit messages, conference talks by maintainers) are scattered and assume deep kernel background. There's a gap for a structured deep-dive that walks through the kernel implementation path by path — from bpf() syscall entry through verifier analysis to JIT compilation and program attachment — making the internals accessible to engineers who can read C but aren't kernel maintainers.

## Unique Angle

- **Source-code-first** — walks through actual kernel source code paths in kernel/bpf/, showing the C implementation of each component rather than describing behavior abstractly
- **Verifier internals deep-dive** — traces the verifier's analysis from do_check() entry through instruction-by-instruction state tracking: register state machine (scalar, pointer, map value, stack, context), branch exploration, state pruning, bounded loop detection, and memory access validation — the most complex and least documented part of eBPF
- **JIT compilation walkthrough** — follows bytecode through the JIT compilation pipeline from bpf_int_jit_compile() to native code emission, showing how eBPF instructions map to x86-64 instructions, how the JIT handles register allocation, and what the generated code actually looks like
- **Map implementation dissection** — shows how each map type is implemented as a kernel data structure: hash maps (htab_map_ops with bucket locking), arrays (array_map_ops with direct indexing), per-CPU variants (per-CPU memory allocation), ring buffers (lock-free producer-consumer with memory mapping) — connecting API behavior to implementation complexity
- **Syscall-to-execution path** — traces the complete lifecycle from userspace bpf(BPF_PROG_LOAD) through verifier → JIT → attachment → invocation at hook point → return to kernel, showing every kernel function on the path
- **Security boundary analysis** — maps exactly where security checks are enforced: capability checks in bpf() syscall, verifier safety proofs, JIT hardening (constant blinding, retpolines), unprivileged restrictions, and how each boundary has been bypassed in past CVEs

## Scope

**Included**: bpf() syscall implementation (kernel/bpf/syscall.c: BPF_PROG_LOAD, BPF_MAP_CREATE, BPF_PROG_ATTACH, BPF_OBJ_PIN; fdget/fdput for program/map FDs; capability checks and security hooks), verifier internals (kernel/bpf/verifier.c: do_check() main loop, bpf_reg_state and register tracking, scalar vs pointer state machines, tnum — tracked numbers for value range tracking, bpf_verifier_env and exploration state, path exploration and state pruning, backtrack_insn for precise tracking, check_mem_access for memory safety, check_helper_call for helper validation, bounded loop detection, BTF-based type checking for fentry/fexit, verifier log generation), JIT compilation (arch/x86/net/bpf_jit_comp.c for x86-64: do_jit() instruction translation, register mapping eBPF→x86, stack frame setup, constant blinding for security, retpolines for Spectre mitigation, image allocation and permissions, JIT hardening options), map implementations (kernel/bpf/hashtab.c: bucket allocation, element lookup with hash and compare, bucket locking strategy, LRU eviction; kernel/bpf/arraymap.c: direct array access, per-CPU array with per-CPU memory; kernel/bpf/ringbuf.c: memory-mapped ring buffer, lock-free design, consumer/producer pointers; kernel/bpf/bpf_local_storage.c for cgroup/socket-local storage), program attachment (link-based attachment model, legacy fd-based attachment, bpf_link lifecycle, program replacement atomicity), hook invocation (BPF_PROG_RUN macro, BPF_PROG_RUN_ARRAY for hook arrays, direct call for fentry/fexit trampolines, XDP invocation in driver NAPI, TC invocation in cls_bpf), BTF implementation (kernel/bpf/btf.c: type parsing, type verification, btf_vmlinux for kernel type information, BTF-based program verification), program lifecycle (reference counting, bpffs pinning, program/map freeing, memory accounting), eBPF security analysis (capability model: CAP_BPF, CAP_PERFMON, CAP_NET_ADMIN; unprivileged eBPF restrictions; verifier CVEs: what was bypassed and how it was fixed; JIT spraying mitigations; Spectre v1/v2 mitigations in eBPF)

**Excluded**: User-space eBPF tooling (libbpf, BCC, bpftrace — covered in overview deep-dive), eBPF program writing tutorials, networking data path details (XDP/TC hook points covered in overview), application-level eBPF usage (Cilium, Tetragon, Falco — covered in overview), non-x86 JIT backends (ARM, RISC-V — brief comparison notes), eBPF for Windows implementation, detailed Spectre mitigation theory (referenced for JIT hardening context), kernel module comparison in depth, cBPF/classic BPF implementation, networking stack internals beyond eBPF hook points

## Research Needs

- Read kernel/bpf/verifier.c in depth (verifier main loop, register state tracking, pruning)
- Study kernel/bpf/syscall.c for program load and map creation paths
- Read arch/x86/net/bpf_jit_comp.c for x86-64 JIT translation
- Study kernel/bpf/hashtab.c and kernel/bpf/ringbuf.c for map implementation details
- Review bpf_reg_state and tnum (tracked number) implementation for value tracking
- Research verifier CVEs (CVE-2021-3490, CVE-2021-31440, CVE-2022-23222, others) to understand security boundary failures
- Study BPF_PROG_RUN invocation paths for different program types
- Review bpf_link implementation and lifecycle management
- Research JIT hardening features (constant blinding, retpolines, stack canaries)
- Set up kernel development environment (Linux source tree, QEMU for kernel debugging, ftrace for path tracing)
- Study BTF kernel implementation and vmlinux BTF generation
- Review Alexei Starovoitov and Daniel Borkmann's design documents and commit messages
- Trace full bpf() syscall path with ftrace to validate code walkthrough

## Estimated Effort

- Research: 10-13 hours (kernel source code reading for verifier, JIT, maps, syscall path; CVE analysis; design document review; maintainer talks)
- Hands-on lab: 5-7 hours (kernel development environment setup, ftrace-based path tracing, verifier log analysis with custom programs, JIT output inspection via bpf_jit_disasm, map performance characterization)
- Writing: 10-14 hours (5500-7000 word deep-dive with source code excerpts, verifier state diagrams, JIT translation examples, map implementation diagrams, and security boundary analysis)
- Diagrams: 4-6 hours (verifier state machine, JIT instruction mapping, syscall-to-execution full path, map implementation internals, security boundary map)
- Review/revision: 3-4 hours
- Total: ~32-44 hours across multiple sessions
