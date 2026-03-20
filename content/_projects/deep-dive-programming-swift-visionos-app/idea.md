---
id: "e5f6a7b8-5555-4eee-f555-555555555504"
type: idea
status: draft
created: "2026-03-16T00:00:00Z"
updated: "2026-03-16T00:00:00Z"
---

## Concept

Build log writing a visionOS app — spatial computing with Swift and RealityKit. Covers the visionOS programming model (windows, volumes, immersive spaces), RealityKit integration, spatial gestures, 3D content creation pipeline, SharePlay in spatial contexts, personas, and the unique UX considerations for spatial computing. Spatial-first approach: visionOS fundamentally changes how users interact with apps — the eye-and-hand interaction model, the concept of shared space vs immersive space, and the responsibility of placing content in the user's physical environment require rethinking assumptions from 2D app development.

## Target Audience

iOS developers exploring visionOS who want to understand how their existing SwiftUI knowledge transfers and where spatial computing requires fundamentally new thinking. Spatial computing enthusiasts who want a realistic picture of visionOS development maturity and capabilities. AR/VR developers from other platforms (Unity, Unreal, Meta Quest) who want to understand Apple's approach to spatial computing and how it differs from traditional VR development.

## Problem/Need

visionOS is Apple's newest platform and represents a genuinely new interaction paradigm — but most content about it is either Apple's WWDC session transcripts or surface-level "first look" articles. Developers exploring visionOS encounter a steep learning curve: the window/volume/immersive space model is unlike anything on iOS or macOS, RealityKit's entity-component system requires 3D thinking, spatial gestures work differently from touch, and the 3D content pipeline (Reality Composer Pro, USDZ) is unfamiliar territory for 2D developers. There's a gap for a build log that documents the realistic experience of building a visionOS app — including the simulator limitations, the 3D content creation challenges, and the unique UX considerations that come with placing content in someone's physical space.

## Unique Angle

- **Spatial-first** — frames every decision through the lens of spatial computing: what changes when your app exists in the user's physical space rather than on a bounded screen
- **Window/volume/immersive space model** — explains the three presentation modes as a fundamental concept, not just an API: windows for 2D content lifted into space, volumes for bounded 3D content, and immersive spaces for unbounded experiences
- **RealityKit integration** — covers the entity-component system, 3D asset loading, spatial audio, physics simulation, and custom render effects as integrated parts of the visionOS development model
- **3D content pipeline** — documents the reality of creating 3D content for visionOS: Reality Composer Pro, USDZ format, asset optimization, and the gap between what demos show and what indie developers can realistically produce
- **Eye-and-hand interaction** — explains the look-and-tap interaction model, indirect gestures, direct gestures in immersive spaces, and custom gesture recognizers for spatial input
- **SharePlay and personas** — covers multiplayer/shared experiences in spatial computing, including persona representation and the social dynamics of shared immersive spaces

## Scope

**Included**: visionOS programming model (windows: SwiftUI in 3D space with depth, glass material; volumes: bounded 3D content with RealityView, volumetric window style; immersive spaces: full, mixed, progressive immersion styles; scene types and lifecycle), RealityKit fundamentals (Entity-Component system, ModelEntity, AnchorEntity, spatial audio with AudioPlaybackController, physics with PhysicsBodyComponent, collision with CollisionComponent, materials: SimpleMaterial, UnlitMaterial, ShaderGraphMaterial), 3D content pipeline (Reality Composer Pro: scenes, behaviors, shader graph; USDZ format and asset creation; asset optimization for real-time rendering; Object Capture for 3D scanning), spatial gestures (indirect interaction: eye tracking + hand pinch; direct interaction: touching content in immersive spaces; SpatialTapGesture, DragGesture, RotateGesture3D, MagnifyGesture; custom gesture composition; hover effects), SwiftUI on visionOS (ornaments, depth and 3D offsets, glass background material, Model3D for quick 3D content, RealityView for interactive 3D, toolbar and navigation adaptations), SharePlay integration (GroupActivity, spatial personas, shared coordinate spaces, synchronized state), ARKit on visionOS (hand tracking, scene understanding, plane detection, mesh classification, image anchoring, world tracking for immersive spaces), development environment (visionOS simulator limitations, Xcode previews for visionOS, Apple Vision Pro developer mode, Reality Composer Pro workflow), UX considerations (comfortable viewing distances, text legibility in 3D, motion comfort and VR sickness prevention, ergonomic hand positioning, respect for personal space, lighting and environment adaptation), App Store submission for visionOS (TestFlight on Vision Pro, visionOS-specific review guidelines, spatial app metadata)

**Excluded**: Unity-based visionOS development (PolySpatial), game development in depth, advanced shader programming (ShaderGraph basics only), enterprise deployment (MDM, custom enterprise apps), detailed ARKit image recognition, LiDAR-specific features (visionOS uses built-in sensors differently), Objective-C on visionOS, performance optimization beyond basics, multi-platform target sharing (covered in cross-platform project)

## Research Needs

- Study current visionOS SDK capabilities and limitations (visionOS 2.x)
- Research RealityKit Entity-Component system patterns and best practices
- Review Reality Composer Pro workflow for 3D content creation
- Study spatial gesture system and custom gesture implementation
- Research SharePlay implementation for spatial experiences
- Review ARKit on visionOS capabilities vs ARKit on iOS
- Study USDZ format and 3D asset optimization for real-time rendering
- Research visionOS UX guidelines and spatial design principles
- Evaluate visionOS simulator accuracy vs real device behavior
- Study developer community experiences with visionOS app development

## Estimated Effort

- Research: 6-8 hours (visionOS SDK, RealityKit, spatial UX guidelines, 3D content pipeline, SharePlay)
- Building: 8-10 hours (actual app development including 3D content creation and spatial interactions)
- Writing: 5-7 hours (4000-5500 word build log with spatial interaction diagrams and development screenshots)
- Diagrams: 3-4 hours (window/volume/immersive space model, interaction model, 3D content pipeline, architecture)
- Review/revision: 2-3 hours
- Total: ~20-26 hours across multiple sessions
