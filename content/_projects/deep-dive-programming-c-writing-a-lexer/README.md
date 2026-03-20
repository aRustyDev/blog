# Deep Dive: Programming - Writing a Lexer in C

> Turning a stream of characters into a stream of meaningful tokens — building the first phase of a compiler from scratch in C.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A build log writing a lexer/tokenizer in C covering finite automata theory (briefly), character classification, token types, string/number/identifier scanning, handling whitespace and comments, error positions (line/column tracking), and testing. Characters-first approach: a lexer's job is turning a stream of characters into a stream of meaningful tokens, and understanding this transformation is the gateway to compilers and language tools.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- The most accessible entry point into language implementation — start here before the compiler project
- Characters-first framing makes the character-to-token transformation visible and intuitive
- Hand-written in C (no lex/flex/regex generators) so every state transition is explicit
- Exercises core C skills: pointers, string handling, memory management, state machines
- Error handling built in from the start with line/column tracking
- Produces a clean token stream interface that feeds directly into the compiler project
- Build log format shows incremental development and debugging process
