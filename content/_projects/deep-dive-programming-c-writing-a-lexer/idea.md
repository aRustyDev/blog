---
id: "c3d4e5f6-3333-4ccc-d333-333333333304"
type: idea
status: draft
created: "2026-03-16T00:00:00Z"
updated: "2026-03-16T00:00:00Z"
---

## Concept

A build log writing a lexer/tokenizer in C — the first phase of a compiler/interpreter. Covers finite automata theory (briefly), character classification, token types, string/number/identifier scanning, handling whitespace and comments, error positions (line/column tracking), and testing a lexer. Characters-first approach: a lexer's job is turning a stream of characters into a stream of meaningful tokens, and understanding this transformation is the gateway to understanding compilers, interpreters, and language tools.

## Target Audience

Developers wanting to build parsers, compilers, or language tools who need to understand the first phase of the pipeline. Programmers learning C through a real project that exercises core skills (pointers, memory management, string handling, state machines). CS students studying formal languages who want a practical grounding for automata theory. Anyone curious about how programming languages work under the hood — the lexer is the most accessible entry point into language implementation.

## Problem/Need

Every compiler, interpreter, linter, syntax highlighter, and language server starts with a lexer, yet most developers have never built one. This means they treat tokenization as magic — they don't understand how their source code gets broken into meaningful pieces, why certain syntax errors produce confusing messages (the lexer couldn't make sense of the characters), or how language tools achieve their syntax awareness. Lexer construction is also one of the best intermediate C projects: it exercises pointers, string handling, memory management, state machine patterns, and error handling in a focused, completable project. Most lexer tutorials either use regex (hiding the actual logic) or lex/flex (hiding everything behind a generator). Building a hand-written lexer in C reveals the actual character-by-character logic and produces a reusable component for the compiler project.

## Unique Angle

- **Characters-first** — frames the lexer's job as a character-to-token transformation, starting from raw bytes and building up to meaningful tokens, making the abstraction layers visible
- **Build log format** — presents the project as a build log with incremental development: start with the simplest tokens, add complexity progressively, show the debugging and testing process
- **Hand-written, no generators** — builds the lexer entirely by hand in C (no lex/flex/regex), so every character classification and state transition is explicit and educational
- **Finite automata connection** — briefly connects the hand-written code to finite automata theory, showing that the switch/case logic implements a state machine, bridging theory and practice
- **Token design decisions** — covers the design decisions in token representation: what data a token carries (type, lexeme, literal value, source location), how tokens are stored and passed to the parser
- **Error handling as a first-class concern** — tracks line and column numbers from the start, produces meaningful error messages for invalid characters and unterminated strings, showing that good error reporting is built in, not bolted on
- **Testing strategy** — covers how to test a lexer (expected token sequences for input strings, edge cases, error cases), building quality into the project from the beginning
- **Foundation for the compiler project** — explicitly designed as the first stage of the compiler project, producing a clean token stream interface that the parser will consume

## Scope

**Included**: Finite automata theory connection (brief: DFAs and NFAs as the theoretical basis for lexers, how hand-written lexers implement state machines implicitly through switch/case and loops, regular expressions as finite automata descriptions — theory grounding without getting lost in formalism), character classification (ASCII table awareness, character categories: digits, letters, whitespace, operators, delimiters; using ctype.h functions vs hand-rolled classification; handling EOF and null terminators), token types (designing a token enum: keywords, identifiers, literals, operators, delimiters, EOF; choosing granularity: single TOKEN_OPERATOR vs TOKEN_PLUS/TOKEN_MINUS/TOKEN_STAR; keyword vs identifier disambiguation), scanning implementation (the scanner loop: advance, peek, match patterns; single-character tokens: parentheses, braces, semicolons, commas; multi-character tokens: ==, !=, <=, >=, &&, ||; string literal scanning: opening quote, character accumulation, escape sequences, unterminated string detection; number literal scanning: integer digits, decimal points, scientific notation; identifier and keyword scanning: letter-or-underscore start, alphanumeric continuation, keyword table lookup), whitespace and comment handling (skipping spaces, tabs, newlines; single-line comments: // to end of line; multi-line comments: /* to */, nested comment decisions; newline tracking for line numbers), source location tracking (line and column counting, updating position on every character advance, attaching source location to every token for error reporting downstream), token representation (Token struct design: type enum, lexeme string or pointer, literal value union, source location; memory management for token lexemes: arena allocation, string interning, or simple malloc), error handling (invalid character detection, unterminated string/comment reporting, error recovery: skip to next valid token start, error token type for passing errors to the parser), testing (test harness design, input-to-expected-tokens test cases, edge cases: empty input, all-whitespace, maximum-length identifiers, nested comments, escape sequences; automated test runner)

**Excluded**: Parser implementation (covered in the compiler project), regular expression engines, lex/flex/generator tools, Unicode handling beyond ASCII (mentioned as an extension but not implemented), full C language lexer (a simpler C-like language subset is sufficient), performance optimization (hash tables for keywords — mentioned but simple linear search is fine for learning), lexer generator theory (DFA minimization, NFA-to-DFA conversion — mentioned for context but not implemented)

## Research Needs

- Study hand-written lexer implementations (Crafting Interpreters scanner chapter, chibicc lexer, tcc lexer)
- Review token design patterns across different compiler implementations
- Research finite automata theory basics for the theory connection section
- Study error recovery strategies in lexers (what to do after encountering an invalid character)
- Review testing strategies for lexers (property-based testing, fuzzing as extensions)
- Study C string handling patterns for safe lexeme storage
- Review escape sequence specifications for string literal handling

## Estimated Effort

- Research: 3-4 hours (lexer implementations, token design patterns, automata theory connection, testing strategies)
- Implementation/writing: 6-8 hours (build log covering scanner implementation, token design, error handling, testing)
- Diagrams: 2-3 hours (state machine diagrams, token flow, scanner architecture)
- Testing: 1-2 hours (test suite for the lexer)
- Review/revision: 1-2 hours
- Total: ~12-16 hours across multiple sessions
