# Deep Dive: Programming - Writing a Compiler in C

> From source code to executable — building a compiler in C to understand the pipeline that transforms human-readable code into machine instructions.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A build log writing a compiler in C covering compiler architecture (frontend, IR, backend), parsing strategies (recursive descent), intermediate representations, code generation (targeting x86-64 or ARM64), optimization passes, symbol tables, type checking, and error reporting. Pipeline-first approach: each compiler phase transforms the program representation, and understanding the pipeline is understanding the compiler.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- The most substantial project in the C series — builds a real compiler targeting real hardware
- Pipeline-first structure follows the compiler phases: source, tokens, AST, IR, optimized IR, assembly, executable
- Build log format shows decisions, dead ends, and iterations rather than a polished tutorial
- Recursive descent parsing throughout (no parser generators) keeps implementation transparent
- Builds on the lexer project as its first stage
- Covers optimization passes as systematic IR transformations (constant folding, dead code elimination, register allocation)
- Prerequisite: the lexer project should be completed first
