# Deep Dive: Programming - Swift tvOS App

> The big screen experience — focus-based navigation, remote control interaction, and media playback on Apple TV.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

Build log writing a tvOS app covering focus-based navigation (the fundamental difference from touch), TVUIKit, remote control interaction model, top shelf extensions, TVMLKit (web-based UI), media playback (AVKit on tvOS), multi-user support, and the tvOS App Store submission process. Focus-first approach: everything on tvOS revolves around the focus engine.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Focus engine is the single most important concept — positioned as the central theme
- Least documented Apple platform — filling a significant content gap
- Remote control constraints (touch surface, limited buttons) shape all UI decisions
- Media playback is the killer use case — AVPlayerViewController tvOS features covered in depth
- Top shelf extension is tvOS's unique content showcase opportunity
- TVMLKit section covers the web-based UI alternative and when it makes sense
