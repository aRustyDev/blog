# ADR-0007: Graph Component Architecture

## Status

Accepted

## Date

2026-03-19

## Related Decisions

- ADR-0004: Interactive Graph Visualization (tech stack foundation)
- ADR-0005: Graph Node Data Model (data structures this architecture renders)
- ADR-0006: Graph Filter Architecture (filter logic these components implement)
- ADR-0008: Brand Theming Strategy (theming helpers placed in `graph.constants.ts`)

## Context

The graph visualization feature grew iteratively through interactive development — each feature (hover, drag, search, filters, legend, normalize, theme observer) was added as a sub-component inside `GraphView.tsx`. This resulted in a 924-line file containing 8 components (7 sub-components + the main export), constants scattered across 4 files, an inverted import dependency (filter imports from view), a triplicated utility function, and a double-fetch of `graph.json`.

Additionally, `showLegend` gates both the legend/toolbar AND the search feature, coupling unrelated concerns under a misleading prop name.

These issues don't affect functionality but create maintenance burden, make testing difficult, and increase the cognitive load of modifying any single feature.

## Decision

### File Structure

Extract sub-components and centralize constants into isomorphic and browser-only modules:

```
src/components/graph/
├── graph.types.ts           # Types only (unchanged)
├── graph.shared.ts          # NEW: isomorphic constants + pure utilities (Node.js safe)
├── graph.constants.ts       # NEW: browser-only helpers (DOM access, CSS resolution)
├── useGraphData.ts          # Data hook (imports from graph.shared, graph.types)
├── GraphView.tsx            # Main container (~200 lines, renders children, receives graph as prop)
├── GraphEvents.tsx          # NEW: hover, click handlers
├── GraphControllers.tsx     # NEW: DragController, LayoutController, ThemeObserver, FilterController
├── GraphToolbar.tsx         # NEW: legend, normalize, re-center, search trigger
├── GraphSearch.tsx          # NEW: spotlight search overlay
├── GraphFilters.tsx         # Sidebar filters (imports from graph.shared)
├── GlobalGraphPage.tsx      # Page wrapper (filter state owner, URL sync, calls useGraphData)
├── LocalGraphWidget.tsx     # Floating widget
└── GraphModal.tsx           # NEW: extracted from LocalGraphWidget.tsx
```

### Isomorphic vs Browser-Only Module Split

**`graph.shared.ts`** — Node.js safe, no DOM access, importable by `build-graph.ts`:
- `CATEGORY_COLORS`
- `CATEGORY_LABELS`
- `EDGE_COLORS`
- `TOPIC_GROUPS`
- `CONTENT_TYPE_LABELS`
- `deriveContentType()` — pure function, no DOM
- `getNodeColor()` — pure lookup into `CATEGORY_COLORS`

**`graph.constants.ts`** — browser-only, uses `document`, `getComputedStyle`:
- `resolveThemeColor()` — reads CSS custom properties from DOM
- `getSigmaBackground()` — derives offset background from resolved `--background`
- `adjustColor()` — hex color math (pure, but colocated with its consumers)
- `getDimColor(opacity: number)` — resolves `--border` and applies alpha for sigma reducers

The build script (`src/scripts/build-graph.ts`) imports from `graph.shared.ts` only, never from `graph.constants.ts`. This prevents Node.js runtime errors from `getComputedStyle` calls.

### Controller Bundling Rationale

`DragController`, `LayoutController`, `ThemeObserver`, and `FilterController` are colocated in `GraphControllers.tsx` because they share a common pattern:
- All are null-returning (`return null`) sigma context consumers
- All use `useSigma()` hook with `useEffect` for side effects
- None produce JSX output
- None share state with each other
- Individual files would add ceremony (4 files × ~40-80 lines each) without clarity benefit

If any controller grows beyond ~100 lines or gains JSX output, extract it to its own file.

### Data Ownership: Lifting `useGraphData`

Currently `GraphView` owns its data fetching via `useGraphData` internally. After the refactor:

- **`GlobalGraphPage`** calls `useGraphData` directly, receives `graph`, `graphData`, `visibleNodes`, `hasActiveFilters`. Passes `graph` and filter-related values as props to `GraphView`. Reads `graphData.metadata` for filter options — eliminating the double-fetch.
- **`GraphView`** becomes a pure rendering component that receives `graph` as a prop instead of fetching its own data.
- **`LocalGraphWidget`** and **`GraphModal`** still use `GraphView` but must also call `useGraphData` to get their graph instance (local mode with focusNode/depth). This is acceptable — each is an independent island with its own graph data.

### GraphModal Extraction

`GraphModal` (currently lines 21-107 of `LocalGraphWidget.tsx`) is extracted to `GraphModal.tsx`. It is an existing component, not a new creation.

After extraction:
- `LocalGraphWidget` imports `GraphModal` (not `GraphView` directly — `GraphModal` uses `GraphView` internally)
- `GraphModal` imports `GraphView` and `useGraphData`

### Import Direction

Dependencies flow strictly downward:
```
graph.shared.ts     ← no imports from other graph files (also imported by build-graph.ts)
graph.types.ts      ← no imports from other graph files
graph.constants.ts  ← imports from graph.shared (for color constants)
useGraphData.ts     ← imports from graph.shared, graph.types
GraphEvents.tsx     ← imports from graph.shared (for CATEGORY_LABELS in tooltips)
GraphControllers.tsx ← imports from graph.constants (for theme helpers), graph.shared
GraphSearch.tsx     ← imports from graph.shared (for labels)
GraphToolbar.tsx    ← imports from graph.shared (for colors, labels)
GraphFilters.tsx    ← imports from graph.shared (for topics, labels, content type labels)
GraphView.tsx       ← imports all above, composes them
GraphModal.tsx      ← imports GraphView, useGraphData
LocalGraphWidget.tsx ← imports GraphModal (not GraphView directly)
GlobalGraphPage.tsx  ← imports GraphView, GraphFilters, useGraphData
```

No component imports from a sibling component. All shared data flows through `graph.shared.ts` or `graph.constants.ts`.

### Prop Rename: `showLegend` → `showToolbar`

Rename `showLegend` to `showToolbar` since it gates the toolbar (which includes legend, normalize, re-center, AND search). The legend and search should not be coupled to a prop named "legend."

### URL Sync Ownership

`GlobalGraphPage` owns URL search parameter sync (read on mount, write on filter change via `history.replaceState`). This responsibility stays with `GlobalGraphPage` even if filter state management is later refactored to a context or reducer.

### Filter State Management

Keep the current prop-passing approach. The 14-prop interface (6 available arrays + 6 selected arrays + tagMode + onTagModeChange) is verbose but explicit. A filter context or reducer would add indirection for minimal benefit at the current scale. Reassess if filter dimensions (currently 6) exceed 9 or if a third consumer of filter state appears.

## Migration Steps

Execute in this order — each step produces a working, verifiable codebase:

1. **Create `graph.shared.ts`** — move pure constants and `deriveContentType` from `GraphView.tsx`, `useGraphData.ts`, `GraphFilters.tsx`. Update all imports.
2. **Create `graph.constants.ts`** — move DOM helpers from `GraphView.tsx` (`resolveThemeColor`, `getSigmaBackground`, `adjustColor`). Add `getDimColor`. Update imports.
3. **Update `build-graph.ts`** — import `deriveContentType` from `graph.shared.ts`. Delete local copy.
4. **Extract `GraphEvents.tsx`** — move from `GraphView.tsx`. Update imports.
5. **Extract `GraphControllers.tsx`** — move `DragController`, `LayoutController`, `ThemeObserver`, `FilterController` from `GraphView.tsx`. Update imports.
6. **Extract `GraphSearch.tsx`** — move from `GraphView.tsx`. Update imports.
7. **Extract `GraphToolbar.tsx`** — move from `GraphView.tsx`. Update imports.
8. **Extract `GraphModal.tsx`** — move from `LocalGraphWidget.tsx`. Update imports.
9. **Lift `useGraphData` to `GlobalGraphPage`** — change `GraphView` to accept `graph` as a prop. Update `GlobalGraphPage` to call the hook and pass data down. Remove double-fetch.
10. **Rename `showLegend` → `showToolbar`** — update all call sites.

## Consequences

- `GraphView.tsx` drops from ~924 lines to ~200 lines
- `graph.shared.ts` becomes the single source of truth for graph metadata (Node.js safe)
- `graph.constants.ts` holds browser-only theme helpers
- Import direction is strictly downward — no circular or inverted dependencies
- `deriveContentType` exists in exactly one place (`graph.shared.ts`)
- `graph.json` is fetched exactly once per page load
- Each sub-component is independently testable
- File count in `src/components/graph/` increases from 6 to 13
- `build-graph.ts` can safely import shared constants without hitting DOM APIs

### Risks

- Increased file count (6 → 13) may feel like over-decomposition for a ~1000 line feature. Mitigated by the clear single-responsibility of each file.
- Lifting `useGraphData` changes `GraphView`'s interface from self-contained to prop-driven. `LocalGraphWidget` and `GraphModal` callers must adapt.
