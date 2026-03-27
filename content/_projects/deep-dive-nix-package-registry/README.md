# Deep Dive: Nix - Nixpkgs

> The largest package repository in existence — understanding how 100,000+ packages are built, tested, and distributed through a single community-maintained monorepo.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A deep-dive on Nixpkgs covering the repository architecture, the stdenv build system (mkDerivation and build phases), language-specific builders (buildPythonPackage, buildGoModule, buildRustPackage, buildNpmPackage), the dependency model (buildInputs vs nativeBuildInputs vs propagated), the Hydra CI system and binary cache infrastructure, channels vs flakes for version pinning, the ofborg PR testing bot, and the contribution and review workflow. Scale-first approach: understanding how 100,000+ packages are built, tested, and distributed through a single monorepo.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Scale-first framing highlights the engineering achievement that makes nixpkgs unique among package repositories
- Builder taxonomy provides a practical reference for choosing the right builder for any language
- Dependency model coverage addresses one of the most common sources of packaging errors
- CI infrastructure section (Hydra, ofborg, binary cache) explains why Nix package installation is fast despite building from source
- Contribution workflow section lowers the barrier to becoming a nixpkgs contributor
- Connects to parent overview and sibling deep-dives on nix-darwin, NixOS, and the Nix language
