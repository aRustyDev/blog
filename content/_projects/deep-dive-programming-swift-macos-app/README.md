# Deep Dive: Programming - Swift macOS App

> Desktop development with Swift — menu bars, multiple windows, sandboxing, and distribution beyond the App Store.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

Build log writing a macOS app covering macOS-specific UI patterns (menu bars, sidebars, multiple windows, toolbars), document-based apps, sandboxing and entitlements, Mac App Store vs direct distribution (notarization, Developer ID), Sparkle for updates, system integration (services, Finder extensions, share extensions), and the differences between macOS and iOS development. Desktop-first approach: macOS apps exist in a fundamentally different environment from mobile apps.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Desktop-first framing highlights the differences from iOS development
- SwiftUI + AppKit hybrid approach documents where each framework excels on macOS
- Distribution deep-dive covers both Mac App Store and direct distribution paths
- Sandboxing section covers the practical impact on file access and system integration
- System integration covers macOS-specific hooks: Services, Finder extensions, Quick Look, Spotlight
- Document-based app architecture is the canonical macOS app pattern
