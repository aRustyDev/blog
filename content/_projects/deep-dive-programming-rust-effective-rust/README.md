# Deep Dive: Effective Rust

> From fighting the borrow checker to working with it — the patterns and idioms that make Rust productive.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

Effective Rust patterns and idioms covering ownership patterns (clone vs borrow vs Rc/Arc), error handling strategies (thiserror vs anyhow, custom error types), trait design (extension traits, sealed traits, newtype pattern), lifetime elision, iterator chains, smart pointer selection, unsafe boundaries, and testing patterns. Idiom-first approach: the practices that separate beginners from productive Rust developers.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Ownership decision tree and smart pointer selection guide are high-value reference sections
- Pairs with "When to Use Rust" for a complete Rust evaluation story
- Pairs with "Rust Reverse Engineering" for understanding compiled output of these patterns
- Before/after examples are key to the "borrow checker mental shift" framing
