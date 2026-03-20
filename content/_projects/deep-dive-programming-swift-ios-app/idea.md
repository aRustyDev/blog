---
id: "e5f6a7b8-5555-4eee-f555-555555555503"
type: idea
status: draft
created: "2026-03-16T00:00:00Z"
updated: "2026-03-16T00:00:00Z"
---

## Concept

Build log writing an iOS app in Swift — from empty Xcode project to App Store submission. Covers SwiftUI vs UIKit decision, app architecture (MVVM, TCA, or similar), navigation patterns, data persistence (SwiftData, Core Data, UserDefaults), networking (URLSession, async/await), push notifications, App Store Connect, TestFlight, and the submission/review process. Journey-first approach: documents the real decisions, tradeoffs, and mistakes encountered while building an actual iOS app, not an idealized tutorial path.

## Target Audience

Developers building their first iOS app who want to understand the full lifecycle from project creation to App Store submission. Android developers crossing over to iOS who need to map their existing mental models to iOS equivalents. Web developers exploring native mobile development who want a realistic picture of what iOS development involves beyond the code — including provisioning, TestFlight, and App Store review.

## Problem/Need

Most iOS tutorials teach individual features in isolation — "how to use SwiftUI lists," "how to persist data with SwiftData," "how to handle push notifications" — but never show how these pieces fit together in a real app or cover the non-code aspects of iOS development that consume significant time: provisioning profiles, App Store Connect configuration, TestFlight distribution, App Store review guidelines, and the submission process. First-time iOS developers are surprised by the complexity of the Apple ecosystem tooling and the gap between "app works in simulator" and "app is on the App Store." This build log fills that gap by documenting the complete journey with realistic time estimates for each phase.

## Unique Angle

- **Journey-first** — documents the actual sequence of decisions and challenges in building an iOS app, including the wrong turns and course corrections that tutorials edit out
- **Full lifecycle coverage** — goes beyond code to cover provisioning profiles, certificates, App Store Connect setup, TestFlight beta testing, App Store submission, and the review process
- **Architecture decision log** — documents the SwiftUI vs UIKit decision, the architecture pattern choice (MVVM, TCA, or similar), and the navigation approach with honest tradeoffs rather than prescriptive recommendations
- **SwiftData as default** — uses SwiftData (not Core Data) as the persistence layer, documenting the current state of SwiftData maturity and any workarounds needed
- **Async/await networking** — uses modern Swift concurrency for all networking code, showing URLSession with async/await rather than completion handlers or Combine
- **App Store submission walkthrough** — covers the full submission process including metadata, screenshots, privacy nutrition labels, and common review rejection reasons

## Scope

**Included**: Xcode project setup (project template selection, bundle identifier, team setup, minimum deployment target), SwiftUI vs UIKit decision (when to choose each, SwiftUI maturity assessment, UIKit interop with UIViewRepresentable/UIViewControllerRepresentable), app architecture (MVVM pattern, ObservableObject/Observable macro, dependency injection, navigation architecture with NavigationStack/NavigationSplitView), SwiftUI views (layouts, lists, forms, sheets, alerts, custom components, view modifiers, environment values), data persistence (SwiftData: model definition with @Model, ModelContainer, ModelContext, queries with @Query, relationships, migration; UserDefaults for preferences; Keychain for secrets), networking (URLSession with async/await, JSON decoding with Codable, error handling, request construction, authentication headers, image loading), push notifications (APNs setup, notification permissions, notification handling, silent notifications, notification service extension), local notifications (UNUserNotificationCenter, scheduling, actions), app lifecycle (scene phases, background tasks, state restoration), provisioning and signing (development certificates, provisioning profiles, automatic signing, manual signing, capabilities), App Store Connect (app record creation, metadata, screenshots and previews, privacy nutrition labels, app categories, pricing), TestFlight (internal testing, external testing, beta app review, feedback collection), App Store submission (build upload, submission for review, common rejection reasons, App Review guidelines, expedited review), Instruments basics (memory leaks, performance profiling, network profiling)

**Excluded**: Advanced SwiftUI techniques (custom layout, advanced animations — covered in effective Swift), watchOS companion app, App Clips, widgets in depth, In-App Purchases/subscriptions (substantial topic on its own), Core Data (SwiftData is the modern path), Combine framework, UIKit-only development, game development (SpriteKit, GameKit), AR features (ARKit — covered in visionOS project), CI/CD pipeline setup, detailed accessibility implementation

## Research Needs

- Evaluate current SwiftData maturity and known limitations
- Research current App Store Review Guidelines and common rejection reasons
- Study SwiftUI navigation patterns (NavigationStack vs NavigationSplitView vs custom)
- Review modern iOS architecture patterns (MVVM with Observable, TCA, MV pattern)
- Research push notification setup process and APNs configuration
- Study TestFlight distribution workflow and best practices
- Review Xcode 16+ project setup and new features
- Research App Store Connect API for automation possibilities

## Estimated Effort

- Research: 5-7 hours (SwiftData maturity, architecture patterns, App Store process, push notification setup)
- Building: 8-12 hours (actual app development from empty project to submission-ready)
- Writing: 5-7 hours (4000-6000 word build log documenting the journey with code excerpts and screenshots)
- Diagrams: 2-3 hours (architecture diagram, navigation flow, data model, App Store submission flowchart)
- Review/revision: 2-3 hours
- Total: ~20-28 hours across multiple sessions
