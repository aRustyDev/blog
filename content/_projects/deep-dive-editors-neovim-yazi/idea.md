---
id: "a7b8c9d0-7777-4aaa-b777-777777777702"
type: idea
status: draft
created: "2026-03-16T00:00:00Z"
updated: "2026-03-16T00:00:00Z"
---

## Concept

A deep-dive on Yazi — the terminal file manager built for Neovim workflows. Covers Yazi's architecture (async I/O, Rust-based), integration with Neovim (yazi.nvim plugin), file previewing (images in terminal, syntax highlighting, PDF/video previews), bulk operations, custom keybindings, theming, comparison to other file managers (ranger, lf, nnn, broot), and how Yazi complements a Neovim-based development workflow. Integration-first approach: Yazi shines when it's part of a larger terminal workflow, not as a standalone tool.

## Target Audience

Neovim users, terminal-centric developers, ranger/lf users looking for something faster. Comfortable with terminal workflows and configuration files, interested in optimizing their file management within a terminal-based development environment.

## Problem/Need

Terminal file managers have a long history (Midnight Commander, ranger, lf, nnn), but most content about them is either quick installation guides or dotfile showcases. Yazi represents a new generation — built in Rust for performance, designed with async I/O from the ground up, and with first-class Neovim integration. Developers using Neovim as their primary editor need a file management solution that fits their terminal workflow, but choosing between ranger, lf, nnn, broot, and Yazi requires understanding the tradeoffs. There's a gap for a deep-dive that explains Yazi's architecture, its integration story, and how it fits into a complete terminal-based development workflow.

## Unique Angle

- **Integration-first** — frames Yazi not as a standalone tool but as a component of a larger terminal workflow, showing how it integrates with Neovim, tmux/zellij, and shell workflows
- **Architecture comparison** — explains why Yazi's async I/O architecture makes it faster than ranger (Python) and how it compares to lf (Go) and nnn (C) architecturally
- **Preview system deep-dive** — covers Yazi's preview capabilities (image protocols: Kitty, iTerm2, sixel; syntax-highlighted text; PDF rendering; video thumbnails) and how terminal capabilities affect what's possible
- **Workflow patterns** — demonstrates concrete workflows: project navigation, bulk file operations, file picking for Neovim, and integration with shell pipelines

## Scope

**Included**: Yazi architecture (Rust-based, async I/O with tokio, plugin system), installation and configuration (yazi.toml, keymap.toml, theme.toml), file previewing (image protocols, syntax highlighting via bat, PDF/video preview, custom previewers), Neovim integration (yazi.nvim plugin, file picking, directory changing), comparison to alternatives (ranger: Python/synchronous, lf: Go/minimal, nnn: C/POSIX, broot: Rust/tree-view — architecture and philosophy differences), bulk operations (multi-select, rename, copy/move), custom keybindings and commands, theming, shell integration (cd on exit, shell aliases), terminal requirements (Kitty/iTerm2/WezTerm for images, fallback for basic terminals), workflow patterns (project navigation, monorepo management, dotfile management)

**Excluded**: Detailed Neovim configuration (Neovim deep-dive territory), terminal emulator deep-dives, shell scripting tutorial, Rust programming, building Yazi from source, contributing to Yazi

## Research Needs

- Study Yazi architecture and async I/O design
- Compare Yazi, ranger, lf, nnn, and broot feature-by-feature and architecturally
- Research image preview protocols (Kitty graphics protocol, iTerm2 inline images, sixel)
- Test yazi.nvim integration patterns and configuration
- Study Yazi plugin system and custom previewer development
- Research terminal emulator capabilities matrix for preview features
- Set up hands-on environment with Yazi integrated into Neovim workflow

## Estimated Effort

- Research: 3-4 hours (architecture study, alternative comparison, preview protocol research)
- Hands-on lab: 3-4 hours (installation, configuration, Neovim integration, workflow testing, alternative comparison)
- Writing: 3-4 hours (2500-3500 word deep-dive covering architecture, integration, previewing, and workflow patterns)
- Diagrams: 1-2 hours (architecture overview, alternative comparison matrix, workflow diagrams)
- Review/revision: 1 hour
- Total: ~10-14 hours across multiple sessions
