# Phase 5: Terms as Graph Nodes

## Goal

Extend the knowledge graph with term nodes, creating edges to posts that reference them and to related terms.

## Files to Modify

### `src/components/graph/graph.types.ts`
- Add `"term"` to `GraphNode.type` union

### `src/scripts/build-graph.ts`
- Read `terms.json` and `backlinks.json`
- Create term nodes: `type: "term"`, `category: "glossary"`, URL: `/glossary/{id}/`
- Create edges: term → post (`"references"`), term → term (`"related"`)

### `src/components/graph/graph.shared.ts`
- `CATEGORY_COLORS`: add `"glossary"` color
- `CATEGORY_LABELS`: add `"glossary": "Glossary Terms"`
- `EDGE_COLORS`: add `"references"` color
- `deriveContentType`: add `"glossary"` case

### Build pipeline order
Backlinks → graph → astro build (graph reads backlinks.json for term-post edges).

## Dependencies

Phases 1 (Terms Database), 3 (Backlinks).

## Acceptance Criteria

- [ ] Term nodes appear in `graph.json` with correct metadata
- [ ] Term-to-post edges generated from backlinks index
- [ ] Term-to-term edges from `related` field
- [ ] Graph filters show "term" as Node Type option
- [ ] Glossary nodes have distinctive color
- [ ] `just graph-dev` and `just graph-prod` succeed
