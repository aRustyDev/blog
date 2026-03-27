---
id: "a1b2c3d4-1111-4aaa-b111-111111111105"
type: idea
status: draft
created: "2026-03-16T00:00:00Z"
updated: "2026-03-16T00:00:00Z"
---

## Concept

A deep-dive on Nixpkgs — the largest package repository in existence, how it's organized, how to contribute packages, the stdenv build system, packaging patterns (mkDerivation, buildPythonPackage, buildGoModule, buildRustPackage, buildNpmPackage, and other language-specific builders), the Hydra CI system (how packages are built and cached, binary cache infrastructure, cache.nixos.org), channels vs flakes (how package versions are pinned and distributed, the channel release process, flake lock files as the modern alternative), and the nixpkgs review process (contributing packages, the PR workflow, package maintainer responsibilities, the by-name directory structure). Scale-first approach: understanding how 100,000+ packages are built, tested, and distributed through a single monorepo — the engineering decisions that make this possible and the tradeoffs they create.

## Target Audience

Developers wanting to package software for Nix who need to understand the packaging conventions, build system, and contribution process. Nixpkgs contributors looking for a structured guide to the repository's architecture and patterns. Package maintainers who need to understand the build infrastructure, CI pipeline, and review process. Engineers evaluating Nix who want to understand what makes nixpkgs the largest package repository and how it maintains quality at scale. Comfortable with build systems and packaging concepts, willing to learn Nix-specific patterns.

## Problem/Need

Nixpkgs is simultaneously Nix's greatest asset and its most intimidating component. With over 100,000 packages in a single monorepo, it's the largest package repository in any ecosystem — larger than Homebrew, AUR, or Debian's archive by package count. But contributing to or understanding nixpkgs is daunting: the repository has its own conventions, patterns, and review process that aren't well-documented in a structured way. The nixpkgs manual covers individual functions but doesn't explain the architecture or the reasoning behind design decisions. New contributors struggle with knowing which builder to use (mkDerivation vs language-specific builders), how to handle dependencies (buildInputs vs nativeBuildInputs, propagation), how the CI system works (Hydra, binary cache, ofborg), and how the review process functions. The by-name migration has changed the directory structure. Most packaging guides are either too simple ("here's how to package a basic C program") or assume deep existing knowledge.

## Unique Angle

- **Scale-first** — frames nixpkgs through the engineering challenge of maintaining 100,000+ packages in a single monorepo: how the directory structure, builder abstraction, CI pipeline, and review process all serve the goal of scaling a community-maintained package repository to unprecedented size
- **Builder taxonomy** — provides a structured comparison of all major builders (stdenv.mkDerivation as the base, buildPythonPackage, buildGoModule, buildRustPackage, buildNpmPackage, trivial-builders) showing how each extends mkDerivation for language-specific needs, when to use each, and common patterns
- **Dependency model explained** — demystifies nixpkgs' dependency classification: buildInputs vs nativeBuildInputs vs propagatedBuildInputs vs depsBuildBuild, why this matters for cross-compilation, and how to choose the right one
- **CI infrastructure** — covers Hydra (the Nix CI system), how it evaluates and builds packages, the binary cache (cache.nixos.org), ofborg (the GitHub bot for PR testing), and how this infrastructure enables fast package installation without local compilation
- **Contribution workflow** — provides a complete guide to contributing packages: the by-name directory structure, nixpkgs-review for testing, the PR process, what reviewers look for, maintainer responsibilities, and the social dynamics of the nixpkgs community

## Scope

**Included**: What nixpkgs is and why it matters (the largest package repository, monorepo architecture, community-maintained, Nix's primary value proposition), repository structure (top-level directories: pkgs/, lib/, nixos/, doc/; the by-name directory structure for packages; all-packages.nix and the package set; maintainer list), stdenv and the build system (stdenv.mkDerivation: phases (unpack, patch, configure, build, install, fixup, check), hooks, setup hooks; buildInputs vs nativeBuildInputs vs propagatedBuildInputs vs depsBuildBuild; cross-compilation support; the builder sandbox), language-specific builders (buildPythonPackage: Python wheel and source builds, dependency management, pytestCheckHook; buildGoModule: Go module support, vendoring, proxyVendor; buildRustPackage: Cargo integration, cargoHash, cargoLock; buildNpmPackage: Node.js packaging, npmDeps, npmBuild; other builders: buildDotnetModule, buildMavenPackage, mkYarnPackage), trivial builders (writeShellScriptBin, writeTextFile, runCommand, symlinkJoin — for simple packages and wrappers), overriding packages (override: changing function arguments; overrideAttrs: changing derivation attributes; overrideDerivation: last resort; the difference between them and when to use each), Hydra CI system (what Hydra does: evaluate jobsets, build packages, populate binary cache; how cache.nixos.org works; the relationship between channels and Hydra evaluations), ofborg (the GitHub bot: package builds on PRs, eval checks, maintainer notifications, rebuild count estimation), channels and releases (the nixos-unstable, nixos-24.11, nixpkgs-unstable channels; channel advancement criteria; how channels relate to Hydra evaluations; flakes as the modern alternative to channels), the contribution workflow (finding or filing an issue, writing the package expression, testing with nix-build and nixpkgs-review, the PR template, review process and criteria, the by-name migration, becoming a maintainer), package maintenance (meta attributes: description, homepage, license, maintainers, platforms; keeping packages updated; security updates; the update bot), nixpkgs conventions and style (formatting, naming conventions, commit message format, the nixpkgs-fmt tool)

**Excluded**: Detailed Nix language tutorial (covered in nix-language deep-dive), NixOS module system and configuration (covered in NixOS deep-dive), nix-darwin specifics (covered in nix-darwin deep-dive), Hydra administration and self-hosting (operational concern, not packaging), writing NixOS tests for packages in depth (covered in NixOS deep-dive), flake development in depth (covered in overview), alternative package repositories (NUR, flake-based package sets — related but separate), enterprise nixpkgs usage patterns (internal forks, overlay-heavy setups), historical nixpkgs architecture and migration decisions

## Research Needs

- Review current nixpkgs repository structure and the by-name migration status
- Study each major language-specific builder's interface and conventions
- Research the dependency model (buildInputs vs nativeBuildInputs) with cross-compilation context
- Study Hydra's evaluation and build pipeline for accurate description
- Review ofborg capabilities and the PR testing workflow
- Research channel advancement criteria and release process
- Study the contribution workflow from current PR guidelines and reviewer expectations
- Compile packaging patterns from well-maintained packages as examples
- Review nixpkgs-review tool capabilities and usage

## Estimated Effort

- Research: 4-6 hours (builder interfaces, dependency model, CI infrastructure, contribution process, repository structure)
- Writing: 6-7 hours (4000-5500 word deep-dive covering repository architecture, builders, CI, and contribution workflow)
- Diagrams: 2-3 hours (repository structure, build phase pipeline, dependency types, CI flow, contribution workflow)
- Review/revision: 2-3 hours
- Total: ~14-19 hours across multiple sessions
