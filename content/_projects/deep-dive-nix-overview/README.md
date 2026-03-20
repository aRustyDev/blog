# Deep Dive: Nix - Overview

> The Nix ecosystem demystified — understanding the package manager, the language, NixOS, nix-darwin, and flakes through the lens of declarative, reproducible configuration as code.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

An overview of the Nix ecosystem covering the Nix package manager (purely functional, content-addressed), the Nix expression language, NixOS (declarative Linux), nix-darwin (declarative macOS), flakes (reproducible project interface), the Nix store (content-addressed isolation), channels vs flakes, and the broader ecosystem (Home Manager, devenv, direnv). Declarative-first approach: Nix's power comes from treating system configuration as code, and understanding this philosophy is the key to understanding how all the pieces fit together.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- This is the entry point for the Nix series — read this before the specific component deep-dives
- Declarative-first framing provides the philosophical foundation for understanding every Nix tool
- Ecosystem map showing component relationships (package manager, language, NixOS, nix-darwin, flakes, nixpkgs) is a key reference artifact
- Channels vs flakes explanation addresses the most common source of confusion for newcomers
- Connects to child deep-dives on nix-darwin, NixOS, the Nix language, and nixpkgs
