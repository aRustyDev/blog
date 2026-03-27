# Graph Visualization

The blog includes an interactive graph view (inspired by Obsidian) that visualizes relationships between blog posts and content projects.

## Architecture

```
Build time:                          Runtime:
┌─────────────────────┐              ┌──────────────────────┐
│ blog posts (.md)    │──┐           │ /graph page          │
│ project index.md    │  ├─► graph   │  └─ GlobalGraphPage  │
│ frontmatter (tags,  │  │   .json   │                      │
│  languages)         │──┘           │ Post layout           │
└─────────────────────┘              │  └─ LocalGraphWidget  │
                                     └──────────────────────┘
```

- **Build time**: `src/scripts/build-graph.ts` parses posts and projects into `public/graph.json`
- **Runtime**: React components (Astro islands via `client:only="react"`) render the graph using Sigma.js + Graphology

## Pages and Components

### Global Graph (`/graph`)

Full-screen graph with all nodes, filter sidebar, search, and toolbar.

### Local Graph Widget (post pages)

Floating widget (top-right, desktop only) showing the current post's connections. Has two modal views:
- **Page Graph**: subgraph around the current post with configurable depth
- **Site Graph**: full graph view

## Node Data Model

Each node has 6 dimensions (see [ADR-0005](../adrs/0005-graph-node-data-model.md)):

| Dimension | Examples | Filter Section |
|-----------|----------|----------------|
| `type` | post, project | Node Type |
| `contentType` | deep-dive, eli5, tutorial | Node Type > Content Type |
| `status` | ideation, in-progress | Node Type > Status |
| `category` | deep-dive-kernels, keebs | Topics |
| `languages` | c, rust, swift | Languages |
| `tags` | security, forensics, ai | Tags |

## Adding a New Project to the Graph

1. Create the project in `content/_projects/<slug>/` with `index.md`
2. Add `tags` and optionally `languages` to the frontmatter:

```yaml
---
type: project
title: "My Project"
status: ideation
tags:
  - security
  - ai
languages:
  - rust
---
```

3. Add relationships in the `## Related Projects` table
4. Run `just graph-dev` to rebuild the graph data

The project appears in the dev graph automatically. It will NOT appear in production until published as a blog post.

## Tag Vocabulary

Tags are domain concepts — not content types, not languages. Keep them:
- Singular (`kernel` not `kernels`)
- Lowercase
- Domain-specific (`security`, `forensics`, `ai`, not `overview`, `tutorial`)

Current vocabulary (~33 tags):

| Category | Tags |
|----------|------|
| Security | security, forensics, reverse-engineering, injection |
| Platforms | linux, bsd, macos, windows, darwin, ios, android, tvos, visionos |
| AI | ai, agents, benchmarking, observability, testing |
| Systems | kernel, memory, ebpf, containers, kubernetes, filesystems, databases |
| Hardware | hardware, pcb, keebs |
| Other | git, networking, nix, editors, compilers, book, mobile |

## Language Field

Languages are programming languages relevant to the project:

`c`, `cpp`, `rust`, `go`, `swift`, `zig`, `nix`

Nodes without a language have `languages: []` and pass through the language filter.

## Deriving Tags for Projects

Use the tag derivation script:

```bash
just tag-projects --dry-run   # Preview changes
just tag-projects             # Apply tags
just tag-projects --force     # Overwrite existing tags
```

The script maps project slugs to tags and languages via rules in `src/scripts/tag-projects.ts`.

## Edge Types

| Edge Type | Source | Threshold |
|-----------|--------|-----------|
| parent, child | Related Projects table | Always |
| sibling | Related Projects table | Always |
| prerequisite, sequel | Related Projects table | Always |
| related | Related Projects table | Always |
| tag-shared | Shared tags | 2+ tags (projects), 1+ (posts) |

## Filter Logic

Filters operate as cross-section AND:

**Topics ∩ Node Type ∩ Languages ∩ Tags = visible nodes**

Within each section:
- **Topics**: union (OR) of selected categories
- **Node Type**: union of status × contentType
- **Languages**: union of selected languages (nodes without languages pass through)
- **Tags**: configurable mode:
  - **ANY** (default): node has at least one selected tag
  - **ALL**: node has every selected tag
  - **NOT**: node has none of the selected tags

Filtering uses sigma reducers to fade non-matching nodes in place — no re-layout.

## Dev vs Production

| | Dev (`just dev`) | Production (`just build`) |
|---|---|---|
| Projects | Included | Excluded |
| Blog posts | Included | Included |
| Graph data | `--dev` flag | No flag |
| Node count | ~99 | ~5 (published posts only) |

## Tech Stack

- **Sigma.js**: WebGL-based graph renderer
- **Graphology**: Graph data structure library
- **@react-sigma/core**: React bindings for Sigma.js
- **graphology-layout-forceatlas2**: Force-directed layout algorithm
- **Fuse.js**: Fuzzy search for the spotlight search bar

All components use `client:only="react"` (not `client:load`) because Sigma.js requires WebGL/browser APIs unavailable during Astro's SSR pass.
