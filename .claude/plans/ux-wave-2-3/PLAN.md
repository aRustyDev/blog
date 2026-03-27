# UX Waves 2 & 3 — Brand Cards, Timeline, DirTree, Hierarchy

## Overview

Address remaining UX issues from the draft preview audit. Organized in two waves:

- **Wave 2**: Brand-aware OGCard styling (issues 4, 6, 9)
- **Wave 3**: Component redesigns (Timeline, DirTree, HierarchySimple)

## Wave 2: Brand Cards

| Phase | Title | Complexity |
|-------|-------|------------|
| 2.1 | [Brand DB + theme-color extraction](./phases/2-1-brand-db.md) | Medium |
| 2.2 | [OGCard brand styling](./phases/2-2-ogcard-brand.md) | Low |
| 2.3 | [color-mix() refinement](./phases/2-3-color-mix-refinement.md) | Low (V2) |

## Wave 3: Component Redesigns

| Phase | Title | Complexity |
|-------|-------|------------|
| 3.1 | [Timeline redesign (2 variants)](./phases/3-1-timeline-redesign.md) | High |
| 3.2 | [DirTree variants](./phases/3-2-dirtree-variants.md) | Medium |
| 3.3 | [HierarchySimple component](./phases/3-3-hierarchy-simple.md) | Medium |

## Key Decisions

- **Brand colors**: `theme-color` meta tag as primary source, `brands.json` as fallback/override
- **Color harmony**: Strategy 1 (opacity-based) for V1, color-mix() refinement for V2
- **Timelines**: 2 variants — `<TimelineCards>` (vertical) and `<TimelineProcess>` (horizontal flow)
- **DirTree**: 3 modes via `variant` prop — `simple`, `icons`, `interactive` (future)
- **Hierarchy**: Structured prop with `items` array, data loaded from JSON files at build time
