# Deep Dive: Reverse Engineering Rust Binaries

> From mangled symbols to state machines — what makes Rust binaries distinctive and how to analyze them.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A deep-dive on reverse engineering Rust binaries covering binary characteristics (monomorphization, panic infrastructure), symbol demangling (v0 mangling scheme), ownership/lifetime artifacts in disassembly, enum/match representation in machine code, trait object vtable layout, async state machines in compiled form, and RE tools/techniques (IDA plugins, Ghidra scripts). Artifacts-first approach: Rust's compiler leaves distinctive patterns that aid (and complicate) reverse engineering.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Artifacts-first framing differentiates from "Rust compilation" overview content
- Vtable layout and enum niche optimization are high-value reference sections
- Increasingly relevant as Rust adoption grows in both legitimate and malicious software
- Connects to RE tool deep-dives (Ghidra, Binary Ninja, IDA Pro) for tool-specific workflows
- Pairs with Effective Rust for understanding source-to-binary pattern mapping
