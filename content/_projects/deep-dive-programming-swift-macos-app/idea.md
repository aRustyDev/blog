---
id: "e5f6a7b8-5555-4eee-f555-555555555505"
type: idea
status: draft
created: "2026-03-16T00:00:00Z"
updated: "2026-03-16T00:00:00Z"
---

## Concept

Build log writing a macOS app — desktop development with Swift, AppKit, and SwiftUI. Covers macOS-specific UI patterns (menu bars, sidebars, multiple windows, toolbars), document-based apps, sandboxing and entitlements, Mac App Store vs direct distribution (notarization, Developer ID), Sparkle for updates, system integration (services, Finder extensions, share extensions), and the differences between macOS and iOS development. Desktop-first approach: macOS apps exist in a fundamentally different environment from mobile apps — multiple windows, menu bars, drag and drop, keyboard shortcuts, and user expectations of power and flexibility require a different design mindset.

## Target Audience

iOS developers moving to macOS who want to understand what changes when building for the desktop — from UI patterns to distribution to user expectations. Developers building desktop tools who want a practical guide to macOS development without the iOS-centric framing of most Swift tutorials. Mac power users wanting to create their own tools who have programming experience but haven't navigated the macOS development ecosystem.

## Problem/Need

macOS development is underserved in the Swift educational ecosystem. Most Swift content focuses on iOS, and developers who try to build macOS apps discover that the desktop is a different world: multiple windows need management, menu bars need configuration, sandboxing restricts file access, distribution outside the App Store requires notarization, and users expect keyboard shortcuts, drag and drop, and integration with macOS services. SwiftUI on macOS has matured significantly but still has gaps that require AppKit interop, and knowing when to reach for AppKit vs staying in SwiftUI is a hard-won skill. There's a gap for a build log that documents the realistic experience of building a macOS app — covering not just the code but the distribution, signing, and system integration challenges that are unique to the desktop.

## Unique Angle

- **Desktop-first** — frames every decision through the lens of desktop computing: multiple windows, persistent menu bar, keyboard-driven workflows, file system access, and user expectations of power and customization
- **SwiftUI + AppKit hybrid** — documents where SwiftUI works well on macOS and where AppKit interop is still necessary, with honest assessment of SwiftUI's macOS maturity
- **Distribution deep-dive** — covers both Mac App Store and direct distribution paths: code signing, notarization, Developer ID, Sparkle for auto-updates, DMG creation, and the tradeoffs between the two distribution models
- **Sandboxing reality** — documents the practical impact of App Sandbox on file access, inter-process communication, and system integration, including when and how to use security-scoped bookmarks
- **System integration** — covers macOS-specific integration points: Services menu, Finder extensions, share extensions, Spotlight integration, Quick Look previews, and menu bar extras (formerly status bar items)
- **Document-based app patterns** — covers the document architecture (NSDocument/DocumentGroup), file coordination, versioning, and autosave as the canonical macOS app pattern

## Scope

**Included**: Xcode project setup for macOS (app template, bundle identifier, deployment target, capabilities), SwiftUI on macOS (NavigationSplitView for sidebar-detail, Table for data display, Settings scene, MenuBarExtra, Window and WindowGroup management, keyboard shortcuts with .keyboardShortcut, toolbar customization, SwiftUI macOS-specific modifiers), AppKit interop (NSViewRepresentable, NSWindowController for custom window management, NSToolbar customization, NSMenu for complex menus, NSPasteboard for clipboard and drag-and-drop), document-based apps (DocumentGroup, FileDocument/ReferenceFileDocument protocols, UTType declarations, file coordination, autosave, versioning), data persistence (SwiftData on macOS, file-based storage, SQLite, UserDefaults, Keychain), menu bar (main menu configuration, contextual menus, menu validation, dynamic menu items), windows (multiple window support, window restoration, window toolbar style, full-screen support, miniaturization), keyboard and input (keyboard shortcuts, key equivalents, responder chain, focus management, text input), sandboxing (App Sandbox entitlements, file access with NSOpenPanel/NSSavePanel, security-scoped bookmarks, temporary exceptions, container directory), distribution: Mac App Store (App Store Connect for macOS, Transporter, Mac App Store review guidelines, sandboxing requirements), distribution: direct (Developer ID signing, notarization with notarytool, Sparkle for auto-updates, DMG creation, download page hosting, Gatekeeper), system integration (Services menu registration, Finder Sync extensions, Share extensions, Spotlight Importer, Quick Look Preview extensions, login items), differences from iOS (window management vs single-window, menu bar vs tab bar, file system access vs sandboxed container, mouse/trackpad vs touch, Catalyst as alternative to native)

**Excluded**: Game development on macOS (Metal, SpriteKit), audio/video production tools (AVFoundation in depth), kernel extensions (deprecated — covered in kernel deep-dives), system extensions in depth (network extensions, endpoint security), complex AppKit-only apps, Catalyst (brief comparison only), Mac Catalyst migration, Electron/web-based alternatives comparison, CI/CD pipeline for macOS apps

## Research Needs

- Evaluate SwiftUI macOS maturity for current Xcode/macOS versions
- Research notarization process and Developer ID requirements
- Study Sparkle framework for auto-update implementation
- Review macOS App Sandbox capabilities and limitations
- Research Finder Sync extension and Share extension implementation
- Study document-based app architecture with SwiftUI DocumentGroup
- Review Mac App Store vs direct distribution tradeoffs
- Research macOS-specific SwiftUI features (Table, MenuBarExtra, Settings)
- Study window management patterns in SwiftUI vs AppKit

## Estimated Effort

- Research: 5-7 hours (macOS APIs, distribution options, system integration, sandboxing)
- Building: 7-10 hours (actual app development including distribution setup and system integration)
- Writing: 5-6 hours (4000-5500 word build log with architecture decisions and distribution walkthrough)
- Diagrams: 2-3 hours (app architecture, distribution flowchart, sandbox model, window hierarchy)
- Review/revision: 2-3 hours
- Total: ~18-24 hours across multiple sessions
