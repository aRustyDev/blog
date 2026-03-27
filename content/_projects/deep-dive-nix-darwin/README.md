# Deep Dive: Nix - nix-darwin

> Declarative macOS system configuration with Nix — replacing Homebrew, managing system defaults, and achieving reproducible Mac environments through nix-darwin.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A deep-dive on nix-darwin covering declarative macOS system configuration, Homebrew replacement and bridging, system defaults management, launchd services, dotfile management, flake-based configurations, the darwin-rebuild workflow, and Home Manager integration. Migration-first approach: how to incrementally adopt nix-darwin without nuking your existing setup — start with one thing, prove it works, expand from there.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Migration-first framing addresses the biggest barrier to nix-darwin adoption: fear of breaking a daily-driver Mac
- Homebrew bridge module coverage is practical — most macOS users can't go pure Nix for GUI apps
- macOS-specific gotchas (SIP, codesigning, APFS volume, upgrade compatibility) are critical for real-world adoption
- Flake-based setup throughout keeps the content modern and reproducible
- Connects to parent overview and sibling deep-dives on NixOS, the Nix language, and nixpkgs
