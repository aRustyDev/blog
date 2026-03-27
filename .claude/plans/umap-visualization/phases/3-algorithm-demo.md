# Phase 3: UMAP Algorithm Demo

## Goal

Educational interactive page demonstrating how the UMAP algorithm works, inspired by pair-code.github.io/understanding-umap/.

## Files to Create

- `src/components/umap/UMAPDemo.tsx` — interactive algorithm visualization
- `src/pages/umap-demo.astro` — page hosting the demo

## Implementation Steps

1. Generate synthetic clustered data (3-5 labeled clusters)
2. Step-through visualization showing UMAP stages:
   - High-dimensional input (show as parallel coordinates or table)
   - k-nearest neighbor graph construction
   - Fuzzy simplicial set (weighted graph)
   - Layout optimization (force-directed in low-D)
   - Final 2D projection
3. Controls: step forward/backward, auto-play, speed control
4. Use blog's existing topic tags as cluster labels (even with fake positions)
5. Annotations explaining each step

## Dependencies

None — uses synthetic data, independent of embedding pipeline.

## Acceptance Criteria

- [ ] 3-5 labeled clusters with synthetic data
- [ ] Step-through controls (forward, backward, auto-play)
- [ ] Annotations explain each UMAP stage
- [ ] Visually engaging (matches blog's Carbon aesthetic)
- [ ] Works on mobile (responsive)
