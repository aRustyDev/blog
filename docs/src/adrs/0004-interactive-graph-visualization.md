# ADR-0004: Interactive Graph Visualization

## Status

Accepted

## Date

2026-03-19

## Context

The blog has ~94 projects and ~5 published posts with structured relationships (parent/child, sibling, prerequisite/sequel, related) defined in project `index.md` files. Discovering connections between content is difficult without visualization. We want an Obsidian-style interactive graph showing relationships between all content nodes.

## Decision

We implement an interactive graph visualization using:

- **Sigma.js + Graphology** for WebGL-based graph rendering (handles large graphs efficiently)
- **@astrojs/react** for Astro islands architecture (React components hydrated client-side)
- **Build-time graph.json** generated from blog posts and project index.md files
- **`client:only="react"`** directive (not `client:load`) because Sigma.js accesses WebGL/browser APIs that fail during Astro's SSR pass
- **Global graph** at `/graph` with filter sidebar
- **Local graph** widget in the PostDetails layout (collapsible, with depth slider)

### Key Technical Decisions

1. **No MDX required** — local graph is in the layout, not in post content
2. **Build-time data generation** — `build-graph.ts` runs before `astro build`, outputs static JSON to `public/`
3. **Dev vs production mode** — `build:graph --dev` includes project nodes; production excludes unpublished projects
4. **ForceAtlas2 layout** — runs 100 iterations at load time, then stops (not continuous simulation)
5. **Node dragging** via sigma mouse captor events (disable camera while dragging)
6. **Normalize button** — resets to circular category-grouped layout, then re-runs ForceAtlas2 with strong gravity for petri-dish shape

## Consequences

- React and Sigma.js added as dependencies (~150KB JS increase)
- `npm run dev` now runs `build:graph --dev` before starting Astro dev server
- `npm run build` runs `build:graph` (production, posts only) as first step
- `public/graph.json` is gitignored (generated artifact)
- Graph nav link added to site header
