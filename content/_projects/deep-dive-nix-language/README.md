# Deep Dive: Nix - The Nix Language

> The lazy, pure, functional language behind all of Nix — from attribute sets and derivations to overlays and fixed points, understanding the language that powers reproducible builds.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A deep-dive on the Nix expression language covering the type system (sets, lists, functions, paths), derivations as the bridge between language and store, builtins and lib functions, string interpolation and string context (invisible dependency tracking), the import system, overlays, the callPackage pattern, fixed-point evaluation, and common gotchas. Evaluation-first approach: understanding lazy evaluation is the key to understanding why Nix code behaves the way it does.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Evaluation-first framing addresses the root cause of most Nix language confusion: lazy evaluation surprises
- String context explanation covers the most magical and least-documented aspect of the Nix language
- Derivation section bridges the gap between "Nix the language" and "Nix the build system"
- callPackage and fixed-point sections demystify the patterns that make nixpkgs architecture possible
- Targets the large population of Nix users who copy-paste configs without understanding the language
- Connects to parent overview and sibling deep-dives on nix-darwin, NixOS, and nixpkgs
