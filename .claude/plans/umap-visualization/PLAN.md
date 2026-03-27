# UMAP Topic Visualization

## Overview

Two parallel approaches for visualizing post topics in 2D space using UMAP dimensionality reduction.

**Approach A (Primary)**: Real post embeddings → UMAP → interactive 2D scatter plot
**Approach B (Educational)**: Fake data demonstrating how the UMAP algorithm works

## Phase Table

| Phase | Title | Depends On | Complexity |
|-------|-------|------------|------------|
| 1 | [Embedding Pipeline](./phases/1-embedding-pipeline.md) | — | High |
| 2 | [2D Visualization](./phases/2-2d-visualization.md) | Phase 1 | Medium |
| 3 | [Algorithm Demo](./phases/3-algorithm-demo.md) | — | Medium |

## Version Roadmap

- **V1**: 2D scatter plot with real embeddings
- **V2**: 3D visualization (future)
- **V3+**: External camera CV-based 3D interaction (future)

## Key Decisions

- Embeddings computed at build time (like `build-graph.ts`)
- Cached locally (`src/data/embeddings.json`) to avoid re-computing on every build
- UMAP reduction via `umap-js` (JavaScript port, runs in Node.js at build time)
- Visualization: Canvas-based React component with `client:only="react"`
- Algorithm demo: standalone page inspired by pair-code.github.io/understanding-umap/
