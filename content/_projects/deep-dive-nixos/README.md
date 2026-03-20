# Deep Dive: Nix - NixOS

> The Linux distribution where the entire OS is a function of its configuration — immutable generations, atomic rollbacks, and declarative infrastructure from bootloader to services.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A deep-dive on NixOS covering the fully declarative Linux distribution built on Nix, the configuration.nix system specification, the NixOS module system (options, types, composition, custom modules), generations and rollbacks as OS version control, NixOS containers, custom ISO building, server deployment patterns (NixOps, deploy-rs, colmena), and the NixOS test framework for VM-based integration testing. Immutability-first approach: NixOS treats the entire OS as a versioned, reproducible artifact — every system state is a generation you can inspect, diff, and roll back to.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Immutability-first framing distinguishes NixOS from every other Linux distribution at a fundamental level
- Module system coverage goes beyond usage to design patterns — understanding modules is key to mastering NixOS
- Generations-as-version-control analogy makes the rollback model intuitive for developers
- NixOS test framework coverage highlights a unique capability no other distribution offers built-in
- Server deployment section addresses the gap between "NixOS on my laptop" and "NixOS in production"
- Connects to parent overview and sibling deep-dives on nix-darwin, the Nix language, and nixpkgs
