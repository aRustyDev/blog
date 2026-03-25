# Phase 3: Person as Graph Node Type

## Goal

Extend the knowledge graph to include Person nodes.

## Files to Modify

- `src/components/graph/graph.types.ts` — add `"person"` to type union
- `src/scripts/build-graph.ts` — create person nodes and edges
- `src/components/graph/graph.shared.ts` — add person category color/label

## Implementation Steps

1. Add `"person"` to `GraphNode.type` union
2. In `build-graph.ts`: read `people.json`, create person nodes
3. Edges: Person → Post ("mentioned in") — scan posts for `<PersonPopup id="...">` references
4. Edges: Person → Person ("co-cited") — if two people appear in the same post
5. Person nodes: distinct shape/icon in graph, use person category color
6. Extend graph filters for Person node type

## Acceptance Criteria

- [ ] Person nodes in `graph.json`
- [ ] Person → Post edges from PersonPopup references
- [ ] Graph filters include "person" type
- [ ] Distinct visual treatment in graph
