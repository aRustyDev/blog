---
id: "e5f6a7b8-5555-4eee-f555-555555555502"
type: idea
status: draft
created: "2026-03-16T00:00:00Z"
updated: "2026-03-16T00:00:00Z"
---

## Concept

Effective Swift patterns — idioms and best practices for productive Swift development. Covers protocol design (protocol composition, conditional conformance, PATs), value type architecture (structs over classes by default), enum-driven development, property wrappers, result builders, Swift concurrency patterns (actor isolation, Sendable, MainActor), testing strategies (protocol-based DI, Preview-driven development), and the Swift code review checklist. Idiom-first approach: writing Swift that compiles is easy — writing Swift that leverages the language's design is what separates productive Swift developers from those fighting the language.

## Target Audience

Swift developers wanting to write more idiomatic code who have learned the syntax but haven't internalized the patterns. Team leads establishing Swift conventions and code review standards for their teams. Developers coming from other languages (especially Java, C#, or Objective-C) whose instincts lead them toward class-heavy, inheritance-based designs that fight Swift's protocol-oriented, value-type-first philosophy.

## Problem/Need

Swift's syntax is approachable, but its idioms are not obvious to developers from other paradigms. Developers commonly write Swift that looks like Java-with-closures: class hierarchies instead of protocol composition, reference types where value types would be safer, stringly-typed APIs where enums would be exhaustive, and callback-based concurrency where async/await would be clearer. The result is code that compiles but doesn't leverage Swift's design — it's harder to test, harder to reason about, and prone to the exact categories of bugs Swift was designed to prevent. Most Swift resources teach syntax or build tutorials; there's a gap for a guide focused specifically on the patterns and idioms that make Swift code genuinely effective.

## Unique Angle

- **Idiom-first** — focuses not on what Swift can do but on what idiomatic Swift looks like: each pattern is presented as a before/after transformation from common non-idiomatic code to the Swift-native approach
- **Protocol design patterns** — covers protocol composition (small, focused protocols combined with &), conditional conformance (extending generic types to conform when their elements conform), protocol-associated types (PATs) and when to use them vs opaque types, and the protocol witness table mental model
- **Value type architecture** — explains when to use structs vs classes as an architectural decision, not just a syntax choice: structs for data, classes for identity, and the copy-on-write pattern for reference-type performance with value-type semantics
- **Enum-driven development** — covers using enums with associated values to make invalid states unrepresentable: state machines, API responses, navigation routes, and configuration — replacing stringly-typed APIs and boolean flags
- **Property wrappers and result builders** — explains these metaprogramming features as tools for building domain-specific APIs: @Published, @AppStorage, @Environment as property wrapper examples; ViewBuilder, RegexComponentBuilder as result builder examples
- **Concurrency patterns** — covers practical patterns for Swift concurrency: actor isolation boundaries, making types Sendable, MainActor for UI code, structured vs unstructured tasks, and migrating from completion handlers to async/await
- **Testing strategies** — covers protocol-based dependency injection (protocol witnesses), Preview-driven development for SwiftUI, and snapshot testing approaches

## Scope

**Included**: Protocol design (protocol composition with &, conditional conformance, protocol extensions with default implementations, associated types and type erasure, protocol witnesses for dependency injection, Equatable/Hashable/Codable conformance patterns, @retroactive conformance), value type architecture (struct vs class decision framework, copy-on-write implementation, immutable value types for thread safety, mutating methods and inout, reference types for identity and inheritance), enum-driven development (enums with associated values for state machines, Result-like patterns, exhaustive switching for compile-time completeness, CaseIterable and RawRepresentable, enum-based routing, replacing boolean parameters with enums), property wrappers (@propertyWrapper declaration, projected values with $, built-in wrappers: @Published, @State, @Binding, @AppStorage, @Environment, custom property wrappers for validation, logging, user defaults), result builders (@resultBuilder declaration, buildBlock, buildOptional, buildEither, ViewBuilder as the canonical example, custom result builders for DSLs), Swift concurrency patterns (actor isolation: when to use actors vs classes with locks, nonisolated methods, actor reentrancy considerations; Sendable: value types as naturally Sendable, @Sendable closures, @unchecked Sendable escape hatch; MainActor: UI isolation, @MainActor on types vs methods; structured concurrency: TaskGroup for dynamic concurrency, async let for static concurrency, task cancellation checking; migrating from callbacks to async/await), error handling patterns (typed throws, error hierarchies with enums, Result for synchronous fallible operations, do-catch placement strategies), testing strategies (protocol-based dependency injection, protocol witnesses as test doubles, Preview-driven SwiftUI development, XCTest vs Swift Testing framework, snapshot testing with swift-snapshot-testing), code organization (extensions for protocol conformance, access control strategy, module boundaries with Swift packages), Swift code review checklist (force unwrap audit, retain cycle check, Sendable compliance, naming conventions, documentation comments)

**Excluded**: Language syntax basics (covered in overview), platform-specific patterns (SwiftUI architecture, UIKit patterns — covered in platform deep-dives), performance optimization (profiling, Instruments), Objective-C interop patterns, detailed SwiftUI view composition (covered in iOS/macOS deep-dives), server-side Swift patterns

## Research Needs

- Review Swift community style guides (Google Swift Style Guide, Ray Wenderlich, Airbnb)
- Study protocol witness table implementation for performance understanding
- Research Swift Testing framework vs XCTest migration patterns
- Review property wrapper and result builder advanced patterns
- Study Swift 6 strict concurrency migration patterns and common issues
- Research enum-driven development patterns from community (PointFree, SwiftLee, Hacking with Swift)
- Review copy-on-write implementation details and performance characteristics

## Estimated Effort

- Research: 4-5 hours (community patterns, style guides, concurrency migration, testing frameworks)
- Writing: 6-8 hours (3500-5000 word guide with before/after code examples for each pattern)
- Diagrams: 2-3 hours (protocol composition diagrams, value type vs reference type decision tree, actor isolation boundaries)
- Review/revision: 2-3 hours
- Total: ~14-18 hours across multiple sessions
