---
id: "e5f6a7b8-5555-4eee-f555-555555555507"
type: idea
status: draft
created: "2026-03-16T00:00:00Z"
updated: "2026-03-16T00:00:00Z"
---

## Concept

Build log writing a cross-platform Swift app — targeting iOS, macOS, tvOS, watchOS, and visionOS from a shared codebase. Covers SwiftUI's cross-platform capabilities and limitations, conditional compilation (#if os()), platform-specific code organization, shared data layer design, multiplatform targets in Xcode, adaptive layouts, and the reality of "write once, run anywhere" with Swift. Shared-first approach: maximize the shared code, accept platform-specific adaptation where needed — the goal is not identical UIs across platforms but a shared architecture with platform-native experiences.

## Target Audience

Swift developers targeting multiple Apple platforms who want to understand how much code can realistically be shared and where platform-specific adaptation is necessary. Teams evaluating cross-platform strategies who need a realistic assessment of SwiftUI's multiplatform story compared to alternatives (Flutter, React Native, Kotlin Multiplatform). Developers maintaining apps on multiple Apple platforms who want architectural patterns for maximizing code reuse while respecting platform conventions.

## Problem/Need

Apple markets SwiftUI as a cross-platform framework, and it genuinely enables significant code sharing across iOS, macOS, tvOS, watchOS, and visionOS — but the reality is more nuanced than the marketing suggests. Developers who try to write a single SwiftUI codebase for multiple platforms quickly discover the gaps: navigation works differently on each platform, some views and modifiers are platform-specific, layout expectations differ between phone, tablet, desktop, TV, and spatial computing, and platform-specific capabilities (focus engine on tvOS, immersive spaces on visionOS, menu bars on macOS) require conditional code. There's a gap for a realistic build log that documents how much sharing is actually achievable, what the architectural patterns for managing platform-specific code look like, and where the boundaries of SwiftUI's cross-platform story currently are.

## Unique Angle

- **Shared-first** — starts from the premise of maximizing shared code and documents where platform-specific adaptation becomes necessary, quantifying the ratio of shared vs platform-specific code in a real app
- **Conditional compilation patterns** — documents the practical patterns for #if os(iOS), #if os(macOS), #if os(tvOS), #if os(watchOS), #if os(visionOS), including how to organize platform-specific code in a maintainable way (extensions, protocol conformances, separate files)
- **Shared data layer** — covers designing a data layer (models, persistence, networking) that works identically across all platforms, using SwiftData, URLSession async/await, and platform-agnostic Swift code
- **Adaptive layout strategies** — documents how to create layouts that adapt across phone, tablet, desktop, TV, and spatial contexts using SwiftUI's layout system, GeometryReader, and conditional modifiers
- **Multiplatform Xcode project** — covers the practical Xcode setup: multiplatform targets, shared schemes, per-platform asset catalogs, per-platform entitlements, and the build configuration for targeting multiple platforms
- **Honest sharing assessment** — provides a realistic breakdown of what can be shared vs what needs platform-specific implementation, with percentages from the actual build experience

## Scope

**Included**: SwiftUI cross-platform capabilities (views and modifiers available on all platforms, platform-specific views and modifiers, availability annotations with #available and @available), conditional compilation (#if os() for platform-specific code, #if canImport() for framework availability, #if targetEnvironment(simulator) for simulator-specific code, organizing conditional code: inline vs extension-based vs separate files), shared data layer (model definitions shared across platforms, SwiftData with shared model container configuration, URLSession networking shared across platforms, shared business logic in Swift packages), platform-specific adaptation (iOS: tab-based navigation, touch gestures, compact layouts; macOS: sidebar navigation, menu bar, keyboard shortcuts, multiple windows; tvOS: focus-based navigation, remote control, large layouts; watchOS: complications, Digital Crown, small-screen constraints; visionOS: spatial layouts, ornaments, RealityView), multiplatform Xcode project (multiplatform app template, per-platform targets, shared source files with target membership, per-platform asset catalogs and app icons, per-platform entitlements and capabilities, per-platform Info.plist settings, shared Swift packages for business logic), adaptive layouts (GeometryReader for size-based adaptation, horizontalSizeClass and verticalSizeClass, ViewThatFits, adaptive Grid layouts, platform-specific navigation patterns), shared Swift packages (extracting shared code into Swift packages, package dependencies, package plugins, testing packages independently), testing strategy (shared test targets, platform-specific test targets, UI testing per platform, Preview-driven development for each platform), CI/CD considerations (building for multiple platforms, testing on multiple simulators, matrix builds)

**Excluded**: Flutter/React Native/Kotlin Multiplatform comparison in depth (brief positioning only), Swift on non-Apple platforms (Linux, Windows — covered in overview), Catalyst (macOS-specific approach, not multiplatform), detailed platform-specific features covered in individual platform deep-dives, advanced SwiftUI performance optimization, server-side Swift integration, game development across platforms

## Research Needs

- Evaluate SwiftUI API availability matrix across all five platforms
- Research multiplatform Xcode project configuration best practices
- Study conditional compilation patterns used in open-source multiplatform Swift apps
- Review SwiftData behavior differences across platforms
- Research adaptive layout strategies for the range from watchOS to visionOS
- Study shared Swift package architecture patterns
- Review community experience with multiplatform SwiftUI apps (blog posts, conference talks)
- Research CI/CD approaches for building and testing across multiple Apple platforms
- Evaluate the realistic sharing percentage in production multiplatform apps

## Estimated Effort

- Research: 5-7 hours (cross-platform API availability, multiplatform architecture patterns, community experiences)
- Building: 7-10 hours (actual multiplatform app development across iOS, macOS, tvOS, watchOS, visionOS)
- Writing: 5-6 hours (4000-5500 word build log with sharing assessment and architecture patterns)
- Diagrams: 2-3 hours (shared architecture diagram, platform-specific adaptation map, code sharing breakdown)
- Review/revision: 2-3 hours
- Total: ~18-24 hours across multiple sessions
