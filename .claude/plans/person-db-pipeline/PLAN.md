# PersonDB Pipeline + Graph Nodes

## Overview

Automated data enrichment for People DB entries plus Person as a graph node type.

## Phase Table

| Phase | Title | Depends On | Complexity |
|-------|-------|------------|------------|
| 1 | [Enrichment Script](./phases/1-enrichment-script.md) | — | Medium |
| 2 | [Avatar Pipeline](./phases/2-avatar-pipeline.md) | Phase 1 | Low |
| 3 | [Person Graph Nodes](./phases/3-graph-nodes.md) | — | Medium |
| 4 | [Person Pages](./phases/4-person-pages.md) | Phase 3 | Low |

## Key Decisions

- Manual overrides take precedence over fetched data
- Cache fetched data locally (avoid re-fetching on every build)
- Avatars resized to 128x128 WebP + letter-initial SVG fallback
- Person nodes connect to posts via "mentioned in" edges
- Person pages at `/people/{id}/` with backlinks
