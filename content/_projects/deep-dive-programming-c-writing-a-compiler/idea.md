---
id: "c3d4e5f6-3333-4ccc-d333-333333333303"
type: idea
status: draft
created: "2026-03-16T00:00:00Z"
updated: "2026-03-16T00:00:00Z"
---

## Concept

A build log writing a compiler in C — from source code to executable. Covers compiler architecture (frontend, IR, backend), parsing strategies (recursive descent), intermediate representations, code generation (targeting x86-64 or ARM64), optimization passes, symbol tables, type checking, error reporting, and the satisfaction of running your own compiled code. Pipeline-first approach: each compiler phase transforms the program representation, and understanding the pipeline is understanding the compiler.

## Target Audience

Developers wanting to understand compilers beyond the black-box abstraction — how source code actually becomes machine instructions. Programming language enthusiasts interested in implementing their own languages. CS students beyond intro courses who want hands-on compiler construction experience in C. Systems programmers who want to understand what gcc and clang actually do, and how optimization passes transform their code. Anyone who has completed the lexer project and wants to continue building a complete compilation pipeline.

## Problem/Need

Compilers are among the most important software ever written, yet most developers treat them as magic black boxes. This creates several problems: developers can't reason about how their high-level code maps to machine instructions, they don't understand why certain "obvious" optimizations don't help (the compiler already does them), they can't write code that's friendly to compiler optimization, and they miss the deep satisfaction of building one of computing's most elegant pieces of software. Most compiler resources are either academic (dragon book, heavy on theory) or toy (compile arithmetic expressions to stack machines). There's a gap for a practical, build-log-style project that constructs a real compiler in C — targeting real hardware (x86-64 or ARM64), handling real language features (variables, functions, control flow, types), and showing the pipeline from source to executable. Building a compiler in C specifically reinforces C skills (memory management, data structures, pointer manipulation) while demystifying the tool every C programmer depends on.

## Unique Angle

- **Pipeline-first** — structures the entire project around the compiler pipeline (source, tokens, AST, IR, optimized IR, assembly, object code, executable), showing how each phase transforms the program representation and what information is gained or lost at each stage
- **Build log format** — presents the project as a build log with decisions, dead ends, and iterations visible, rather than a polished tutorial that hides the messy reality of compiler construction
- **Real target architecture** — generates actual x86-64 or ARM64 assembly rather than targeting a VM or interpreter, so readers see their compiled code run natively on real hardware
- **Recursive descent focus** — uses recursive descent parsing throughout (no parser generators like yacc/bison), keeping the implementation transparent and educational rather than hiding parsing behind generated code
- **Optimization passes as transformations** — covers several optimization passes (constant folding, dead code elimination, register allocation) as IR transformations, showing that optimization is not magic but systematic program transformation
- **Symbol tables and type checking** — covers the semantic analysis phase that most tutorials skip: how the compiler tracks variable scope, function signatures, and type correctness
- **Error reporting done right** — covers how to produce useful error messages with source locations, rather than the cryptic errors that plague many compilers
- **Builds on the lexer project** — explicitly uses the lexer from the sibling project as the first stage, showing how compiler components compose

## Scope

**Included**: Compiler architecture overview (frontend: lexing, parsing, semantic analysis; middle: IR generation and optimization; backend: code generation, register allocation, instruction selection), the source language (a small but non-trivial C-like language with integer and boolean types, variables, functions, if/else, while loops, arithmetic and comparison operators, function calls with arguments and return values), lexer integration (using the lexer from the sibling project, token stream interface), parsing with recursive descent (grammar definition, recursive descent parser implementation, AST node types, precedence climbing for expressions, error recovery strategies), semantic analysis (symbol table design and implementation: scoping, variable lookup, shadowing; type checking: type rules, type errors, implicit conversions; function signature validation), intermediate representation (designing a simple IR: three-address code or SSA-like form, IR instruction types, basic blocks, control flow graph construction), optimization passes (constant folding: evaluate compile-time-known expressions; dead code elimination: remove unreachable or unused code; simple register allocation: graph coloring or linear scan), code generation (targeting x86-64 or ARM64 assembly, instruction selection, calling convention compliance, stack frame layout, function prologue/epilogue), assembly and linking (using system assembler and linker, ELF or Mach-O output, producing a runnable executable), testing (test suite design, expected output verification, regression testing), error reporting (source location tracking through all phases, meaningful error messages with line/column information)

**Excluded**: Full C language support (a subset/C-like language is sufficient for learning), parser generators (yacc, bison, ANTLR — hand-written recursive descent only), advanced optimizations (loop unrolling, vectorization, interprocedural optimization — mentioned but not implemented), garbage collection or runtime systems (the compiled language uses manual memory or stack-only allocation), debugging information (DWARF, source maps — mentioned but not implemented), multiple backend targets (one target architecture, not a retargetable compiler), standard library implementation, JIT compilation, self-hosting (compiling the compiler with itself — aspirational but out of scope)

## Research Needs

- Study compiler architecture patterns (Engineering a Compiler by Cooper & Torczon, Crafting Interpreters by Nystrom for reference)
- Research x86-64 and ARM64 calling conventions and instruction sets for code generation
- Study intermediate representation designs (LLVM IR, QBE IR for simpler reference)
- Review recursive descent parsing techniques and precedence climbing algorithms
- Research register allocation strategies (linear scan vs graph coloring for a simple compiler)
- Study ELF and Mach-O executable format basics for the final linking stage
- Review error reporting best practices in compilers (Rust compiler's error messages as a gold standard)
- Study existing educational compilers (chibicc, 8cc, tcc) for implementation reference

## Estimated Effort

- Research: 6-8 hours (compiler architecture, target ISA, IR design, parsing algorithms, register allocation)
- Implementation/writing: 12-18 hours (build log covering lexer integration, parser, semantic analysis, IR, optimization, code generation)
- Diagrams: 3-4 hours (compiler pipeline, AST examples, IR transformations, code generation flow)
- Testing: 2-3 hours (test suite, verification)
- Review/revision: 2-3 hours
- Total: ~25-35 hours across multiple sessions
