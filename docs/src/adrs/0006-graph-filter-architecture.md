# ADR-0006: Graph Filter Architecture

## Status

Accepted

## Date

2026-03-19

## Context

The graph visualization needs filtering to be useful at scale (99+ nodes). Initial flat category/tag filters were unintuitive — selecting a filter re-ran the layout, disorienting the user. The filter structure also conflated content types, topics, and tags.

## Decision

### Filter Sections (Sidebar)

```
Node Type
  ▸ Blog Posts          ← type=post
  ▸ Projects            ← type=project
      Content Type:     deep-dive, eli5, dev-blog, build-log...
      Status:           ideation, in-progress, completed

Topics                  ← hierarchical category groups
  ▸ Programming (6)     C, Swift, Rust, Go, Zig, Comparisons
  ▸ DFIR (6)            Host/Memory/Mobile/Cloud/FS/DB Forensics
  ▸ Tools (2)           Editors, Nix
  ▸ Systems (2)         Kernels, eBPF
  ▸ Hardware (2)        PCB Design, Keyboards
  ▸ Security (3)        Reverse Engineering, LLM Security, Prompt Injection
  ▸ AI / ML (3)         Benchmarking, Agent Memory, Semantic Testing

Languages               ← programming languages (dedicated section)
  c, cpp, rust, go, swift, zig, nix...

Tags                    ← domain concept tags (pill-style toggles)
  security, forensics, ai, kernel, memory, hardware...
  [union | intersection | exclusion] mode toggle
```

### Filter Logic

Cross-section behavior: **AND** (inner join across all active filter sections)

A node is visible only if it passes ALL active filter sections:
1. **Node Type**: passes if type matches OR no type filter active. Within Node Type, status × contentType is an inner join.
2. **Topics**: passes if category is in any selected topic group OR no topic filter active (union within section)
3. **Languages**: passes if node has any selected language OR no language filter active OR node has no languages (union)
4. **Tags**: passes based on mode toggle:
   - **Union** (default): node has ANY selected tag
   - **Intersection**: node has ALL selected tags
   - **Exclusion**: node has NONE of the selected tags

### Filter State Persistence

Filter state is synced to URL search params for shareability:
- `?tags=security,ai&categories=deep-dive-kernels&types=project`
- Read on mount, written on change via `history.replaceState`

### Dev vs Production

- `npm run dev` builds graph with `--dev` flag → includes project nodes
- `npm run build` (production) → excludes project nodes, only published blog posts
- Filter sections adapt to available data (empty sections hidden)

## Consequences

- Filter sidebar width increased to 240px to accommodate hierarchy
- Topic groups are hardcoded in `GraphFilters.tsx` — must be updated when new categories are added
- Tags use pill-style toggle buttons (not checkboxes) for visual density
- Group-level checkboxes support indeterminate state for partial selection
- "Clear All Filters (N)" button shows active filter count
