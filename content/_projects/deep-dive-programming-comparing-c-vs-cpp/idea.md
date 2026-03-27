---
id: "c3d4e5f6-3333-4ccc-d333-333333333305"
type: idea
status: draft
created: "2026-03-16T00:00:00Z"
updated: "2026-03-16T00:00:00Z"
---

## Concept

A comparison of C and C++ — what C++ adds, what it costs, and when each is the right choice. Covers the shared heritage, what C++ adds (classes, templates, RAII, exceptions, STL, move semantics), what C++ costs (compile times, binary size, complexity), ABI stability differences, embedded/kernel contexts where C wins, application contexts where C++ wins, and the "C with classes" antipattern. Tradeoffs-first approach: neither language is universally better, and understanding the tradeoffs means understanding when each is the right tool.

## Target Audience

Developers choosing between C and C++ for a new project or evaluating whether to migrate an existing codebase. Embedded engineers deciding whether C++ features justify the complexity and resource overhead in constrained environments. Systems programmers who use one language and want to understand what they're gaining or giving up compared to the other. Anyone who has heard "C++ is just C with classes" and wants to understand why that characterization is both wrong and harmful.

## Problem/Need

C and C++ share syntax, history, and even some source compatibility, which creates a persistent illusion that they're the same language with C++ being "C but better." This misunderstanding leads to bad decisions: choosing C++ for embedded systems where its complexity and binary size are liabilities, writing "C with classes" that uses neither language effectively, avoiding C++ features (templates, RAII, move semantics) out of misplaced C-style minimalism, or dismissing C as "outdated" without understanding why the Linux kernel, SQLite, Redis, and most OS kernels are written in C by choice. There's a need for a structured comparison that respects both languages, explains what C++ genuinely adds (and at what cost), identifies the contexts where each excels, and helps developers make informed decisions rather than defaulting to either language out of habit or prejudice.

## Unique Angle

- **Tradeoffs-first** — frames every C++ feature addition as a tradeoff with concrete costs (compile time, binary size, complexity, ABI stability, debugging difficulty), not as a pure upgrade over C
- **What C++ adds, concretely** — covers RAII (deterministic destruction, resource safety without goto cleanup), templates (zero-cost abstraction, type-safe generic programming, but compilation complexity), STL (containers and algorithms that eliminate entire categories of C bugs), move semantics (efficient value transfer without copies), and exceptions (structured error handling with stack unwinding)
- **What C++ costs, honestly** — covers compile time explosion (template instantiation, header-heavy design), binary size growth, ABI instability (the fragile base class problem, no stable C++ ABI across compilers), debugging complexity (template error messages, name mangling), and cognitive load (the language is enormous and still growing)
- **ABI stability as a key differentiator** — explains why C has a stable, universal ABI that makes it the lingua franca of inter-language communication, while C++ ABI instability forces extern "C" wrappers and limits library distribution
- **Context-specific recommendations** — identifies where C wins (kernel development, embedded systems, library APIs, cross-language FFI, resource-constrained environments) and where C++ wins (application development, game engines, performance-critical applications with complex data structures, anywhere RAII and templates reduce bug density)
- **"C with classes" antipattern** — explains why using C++ as "C with classes" (malloc instead of RAII, raw pointers instead of smart pointers, printf instead of iostream/format) gets the costs of C++ without the benefits

## Scope

**Included**: Shared heritage (C++ as "C with Classes" origin, Bjarne Stroustrup's design goals, C/C++ compatibility and divergence over time, areas where valid C is not valid C++), what C++ adds (RAII and deterministic destruction: the single most important C++ feature, resource safety without manual cleanup; classes and encapsulation: data + behavior bundling, access control, constructors/destructors; templates: generic programming, type safety without void pointers, compile-time polymorphism, template metaprogramming; STL: containers — vector, map, unordered_map, string — and algorithms that replace hand-rolled C data structures; exceptions: structured error handling, stack unwinding, RAII interaction; move semantics: efficient resource transfer, rvalue references, std::move; smart pointers: unique_ptr, shared_ptr as ownership models; operator overloading and function overloading; namespaces; references vs pointers), what C++ costs (compile times: template instantiation, header inclusion, unity builds as a workaround; binary size: template bloat, RTTI, exception tables; ABI instability: no standard C++ ABI, compiler and version incompatibilities, the fragile base class problem; complexity: the language specification is enormous, feature interaction complexity, the "expert-friendly" problem; debugging: template error messages, name mangling, complex stack traces through template code), ABI stability comparison (C's stable ABI as lingua franca, extern "C" as the bridge, why shared libraries and FFI prefer C interfaces), where C wins (Linux kernel and OS kernels: Linus Torvalds' position on C++, kernel simplicity requirements; embedded systems: deterministic behavior, minimal runtime, binary size constraints, no hidden allocations; library APIs: stable ABI, cross-language compatibility, dlopen/LoadLibrary friendliness; resource-constrained environments: no RTTI, no exceptions, no STL overhead), where C++ wins (application development: RAII eliminates resource leaks, STL eliminates buffer overflows from hand-rolled containers; game engines: Unreal Engine, performance with abstraction; high-performance computing: templates for zero-cost abstraction, expression templates; complex data structures: type-safe containers, iterators, algorithms), the "C with classes" antipattern (using malloc in C++, raw owning pointers, ignoring RAII, getting C++ costs without C++ benefits)

**Excluded**: Complete C++ tutorial (assumes familiarity with both languages at a basic level), C++ standards evolution in detail (covered in comparing-cpp-versions), comparison with other languages (Rust, Go, Swift — covered in their own comparison projects), build system comparison (cmake, meson, autotools), specific compiler implementation details (gcc internals, clang internals), performance benchmarks (tradeoffs discussion, not benchmarking), C++ modules (C++20 feature, mentioned briefly but not deep-dived)

## Research Needs

- Review Bjarne Stroustrup's design philosophy documents and "Design and Evolution of C++"
- Study ABI stability issues across C++ compilers (GCC, Clang, MSVC Itanium ABI vs MSVC ABI)
- Research binary size and compile time comparisons for representative projects
- Review Linus Torvalds' and other kernel developers' arguments for C over C++ in kernel development
- Study embedded systems constraints and how C++ features map to them (MISRA C++ vs MISRA C)
- Research the "C with classes" antipattern with concrete examples of the problems it causes
- Review modern C++ best practices (C++ Core Guidelines) for fair representation of modern C++ strengths
- Study real-world projects that switched from C to C++ or vice versa and their documented reasons

## Estimated Effort

- Research: 4-5 hours (ABI stability, compile time analysis, embedded constraints, kernel arguments, migration case studies)
- Writing: 5-7 hours (3500-5000 word comparison with concrete examples and tradeoff analysis)
- Code examples: 2-3 hours (side-by-side C vs C++ examples showing tradeoffs)
- Review/revision: 1-2 hours
- Total: ~12-16 hours across multiple sessions
