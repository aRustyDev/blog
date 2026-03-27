# Deep Dive: Programming - Comparing C vs C++

> What C++ adds, what it costs, and when each is the right choice — a tradeoffs-first comparison of two closely related but fundamentally different languages.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A comparison of C and C++ covering the shared heritage, what C++ adds (classes, templates, RAII, exceptions, STL, move semantics), what C++ costs (compile times, binary size, complexity), ABI stability differences, embedded/kernel contexts where C wins, application contexts where C++ wins, and the "C with classes" antipattern. Tradeoffs-first approach: neither language is universally better, and understanding the tradeoffs means understanding when each is the right tool.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Tradeoffs-first framing avoids the "which is better" trap
- RAII positioned as C++'s single most important addition over C
- ABI stability section explains why C remains the lingua franca of inter-language communication
- Context-specific recommendations: C wins in kernels, embedded, FFI; C++ wins in applications, games, HPC
- "C with classes" antipattern section addresses the most common C++ misuse pattern
- Related to the C overview project and sibling comparison projects
