# ADR-0005: Graph Node Data Model and Taxonomy

## Status

Accepted

## Date

2026-03-19

## Context

Graph nodes need structured metadata for filtering, coloring, and tooltips. The initial approach used a flat `category` field derived from slug prefixes, but this conflated multiple concerns: content format (deep-dive, eli5), subject matter (kernels, forensics), programming language, and project status. A clearer taxonomy is needed.

## Decision

We adopt a multi-dimensional data model for graph nodes:

### Node Dimensions

| Dimension | Purpose | Examples | Filter Behavior |
|-----------|---------|----------|----------------|
| **type** | Post vs project | `post`, `project` | Top-level toggle |
| **contentType** | Format/structure | `deep-dive`, `eli5`, `dev-blog`, `tutorial`, `overview`, `comparison`, `build-log`, `book`, `resources`, `internals` | Subtype under Node Type |
| **status** | Project lifecycle | `ideation`, `in-progress`, `completed` | Subtype under Projects |
| **category** | Topic group (for coloring) | `deep-dive-kernels`, `deep-dive-editors`, `keebs` | Topics filter (hierarchical) |
| **language** | Programming languages | `c`, `cpp`, `rust`, `go`, `swift`, `zig`, `nix` | Dedicated Languages filter; empty array if N/A |
| **tags** | Domain concepts | `security`, `forensics`, `ai`, `agents`, `hardware`, `keebs`, `kernel` | Tags filter (union/intersection/exclusion toggle) |

### What Goes Where

- **Content types** (format): `overview`, `tutorial`, `guide`, `comparison`, `build-log`, `book`, `resources`, `internals` — these describe HOW content is structured, not WHAT it's about
- **Languages**: `c`, `cpp`, `rust`, `go`, `swift`, `zig`, `nix`, `python` — dedicated dimension, not tags or topics
- **Tags** (domain concepts): `security`, `forensics`, `ai`, `kernel`, `memory`, `keebs`, `hardware` — cross-cutting concerns that connect nodes across categories

### Tag Conventions

- Singular form (`kernel` not `kernels`)
- Lowercase
- Domain concepts only (not format, not language)
- `injection` not `prompt-injection` (keep generic)
- `keebs` not `keyboards` (match project naming)
- No `lowlevel` (too vague, captured by topic/language)

### Filter Logic

Filters operate as: **Topics ∩ Node Type ∩ Tags ∩ Languages** (cross-section AND)

Within each filter section:
- **Topics**: union of selected categories
- **Node Type**: union of (status × contentType) inner join
- **Tags**: configurable via UI toggle — union (default), intersection, or exclusion
- **Languages**: union of selected languages

### Graph Edges

| Edge Type | Source | Threshold |
|-----------|--------|-----------|
| `parent`, `child`, `sibling`, `prerequisite`, `sequel`, `related` | Project `index.md` Related Projects table | Always created |
| `tag-shared` | Shared tags between nodes | 2+ shared tags (projects), 1+ (posts) |

## Consequences

- Project `index.md` frontmatter gains `tags` and `language` arrays
- `build-graph.ts` derives `contentType` from category at build time
- `tag-projects.ts` script provides initial tag derivation with controlled vocabulary
- Tags should be manually refined over time; the script provides a baseline
- Tag vocabulary should stay under ~40 domain concept tags
- Language list is small and stable (~10 items)
