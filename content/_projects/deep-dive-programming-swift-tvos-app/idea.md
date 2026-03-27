---
id: "e5f6a7b8-5555-4eee-f555-555555555506"
type: idea
status: draft
created: "2026-03-16T00:00:00Z"
updated: "2026-03-16T00:00:00Z"
---

## Concept

Build log writing a tvOS app — the unique constraints and opportunities of the big screen. Covers focus-based navigation (the fundamental difference from touch), TVUIKit, remote control interaction model, top shelf extensions, TVMLKit (web-based UI), media playback (AVKit on tvOS), multi-user support, and the tvOS App Store submission process. Focus-first approach: everything on tvOS revolves around the focus engine — understanding how focus works, how to customize focus behavior, and how to design for focus-based navigation is the single most important concept for tvOS development.

## Target Audience

iOS developers expanding to tvOS who want to understand what changes when the interaction model shifts from touch to focus-based remote control navigation. Media app developers building streaming or content playback experiences for Apple TV. Apple ecosystem enthusiasts who want to explore the full range of Apple platforms and understand the unique constraints and opportunities of each.

## Problem/Need

tvOS is the least documented Apple platform. Most developers have never built for it, and the educational content that exists is sparse and often outdated. The focus engine — the fundamental interaction model on tvOS — is unlike anything on iOS, macOS, or visionOS, and developers who try to build tvOS apps without understanding focus end up with apps that feel broken. The remote control interaction model (touch surface, limited buttons) constrains what UI patterns work, and the big screen context changes text sizes, layout decisions, and information density. Media playback is the killer use case for tvOS, but integrating AVKit's tvOS-specific features (info panels, interstitials, content proposals) requires platform-specific knowledge. There's a gap for a build log that covers tvOS development realistically, with focus on the focus engine and the big-screen UX.

## Unique Angle

- **Focus-first** — positions the focus engine as the single most important concept: how focus moves between views, how to customize focus behavior with focusable modifiers and focus guides, and how focus changes the mental model for navigation and interaction
- **Remote control interaction** — documents the Siri Remote interaction model: touch surface for navigation, press for selection, menu button for back, play/pause, volume — and how these constraints shape UI design
- **Top shelf extensions** — covers the top shelf as tvOS's unique content showcase opportunity, including static and dynamic top shelf items, deep linking from top shelf to app content
- **Media playback deep-dive** — covers AVPlayerViewController on tvOS with its unique features: info tab for metadata, subtitle/audio track selection, interstitial content, content proposals ("up next"), and picture-in-picture
- **TVMLKit option** — documents the web-based UI alternative using TVMLKit (JavaScript + TVML templates), when it makes sense vs native SwiftUI/UIKit, and the hybrid approach
- **Multi-user support** — covers tvOS's multi-user model, user switching, and per-user data storage

## Scope

**Included**: Focus engine (UIFocusSystem, focusable modifier in SwiftUI, focus movement rules, preferred focus environments, focus guides for custom navigation, shouldUpdateFocus, didUpdateFocus, focus style customization, sound and animation on focus), remote control interaction (Siri Remote input model: touch surface gestures, button actions, press types; Menu button and back navigation; game controller support; keyboard input via onscreen keyboard), SwiftUI on tvOS (button styles for focus, card-based layouts, TabView for top-level navigation, NavigationStack, tvOS-specific view modifiers, focusable and focusSection), UIKit on tvOS (UICollectionView with focus, UITableView with focus, TVUIKit: TVMonogramView, TVCaptionButtonView, TVCardView, TVDigitEntryViewController, TVPosterView, TVLockupView), top shelf extension (static top shelf items, dynamic top shelf items via Top Shelf Extension, content provider, deep linking with NSUserActivity, top shelf image requirements), media playback (AVPlayerViewController on tvOS: transport bar, info tab, subtitle/audio selection, interstitial markers, content proposals, playback resumption; AVQueuePlayer for playlists; FairPlay streaming DRM), TVMLKit (TVML templates: alertTemplate, compilationTemplate, catalogTemplate, listTemplate, productTemplate; TVJS for logic; hybrid native+TVML approach; when to use TVML vs native), multi-user support (user profile switching, per-user data with TVUserManager, profile-aware content, parental controls), app lifecycle on tvOS (foreground/background behavior, memory constraints, app thinning, on-demand resources), networking (URLSession, background downloads for media, content caching), tvOS App Store (submission process, App Store product page, tvOS screenshots and previews, app icons for tvOS, top shelf image assets)

**Excluded**: Game development on tvOS (GameKit, game controller in depth), HomeKit hub features, AirPlay receiver functionality, tvOS MDM/enterprise deployment, detailed DRM implementation beyond FairPlay overview, Siri integration on tvOS, cross-device handoff in depth, advanced AVFoundation (custom player UI — brief mention only), tvOS CI/CD pipeline

## Research Needs

- Study tvOS focus engine behavior and customization options
- Research TVUIKit components and current availability
- Review AVPlayerViewController tvOS-specific features and configuration
- Study top shelf extension implementation and content provider patterns
- Research TVMLKit current status and viability
- Review tvOS App Store submission requirements and guidelines
- Study multi-user support implementation with TVUserManager
- Research tvOS SwiftUI maturity and available components
- Review remote control interaction best practices and Apple HIG for tvOS

## Estimated Effort

- Research: 4-5 hours (focus engine, TVUIKit, AVKit tvOS features, top shelf, TVMLKit)
- Building: 5-7 hours (actual tvOS app development with focus navigation and media playback)
- Writing: 4-5 hours (3500-4500 word build log focused on focus engine and big-screen UX)
- Diagrams: 2-3 hours (focus engine model, remote control interaction, top shelf architecture, app architecture)
- Review/revision: 2-3 hours
- Total: ~14-18 hours across multiple sessions
