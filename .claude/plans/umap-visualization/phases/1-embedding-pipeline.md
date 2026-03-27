# Phase 1: Embedding Pipeline

## Goal

Build-time script that generates text embeddings for all posts and reduces them to 2D coordinates via UMAP.

## Files to Create

- `src/scripts/build-umap.ts` — main build script
- `src/data/embeddings.json` — cached raw embeddings (gitignored, regenerated on demand)
- `public/umap-data.json` — 2D coordinates for each post (consumed by visualization)

## Implementation Steps

1. Read all published posts, extract text content (strip markdown syntax)
2. Call embedding API (OpenAI `text-embedding-3-small` or Anthropic) to generate vectors
3. Cache raw embeddings in `src/data/embeddings.json` (skip re-embedding unchanged posts)
4. Run UMAP reduction (`umap-js` package) to produce 2D coordinates
5. Output `public/umap-data.json`:
   ```json
   {
     "points": [
       { "id": "post-slug", "x": 0.42, "y": -0.31, "title": "...", "category": "...", "tags": [...] }
     ],
     "generatedAt": "..."
   }
   ```
6. Add `build:umap` npm script and justfile recipe

## Dependencies

- New deps: `umap-js`, embedding API client
- API key in environment variable (not committed)

## Acceptance Criteria

- [ ] Embeddings generated for all published posts
- [ ] Unchanged posts use cached embeddings (no re-computation)
- [ ] UMAP produces stable 2D coordinates
- [ ] `umap-data.json` contains all posts with coordinates, titles, metadata
