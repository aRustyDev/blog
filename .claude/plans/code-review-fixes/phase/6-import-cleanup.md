# Phase 6: Import Direction & Dead Code

**Priority**: High/Medium — architecture debt
**Findings**: IMP-004, IMP-005, IMP-008, IMP-009, DEAD-001, DEAD-002, DEAD-003, DEAD-007, DEAD-008
**Estimated time**: 1 hour
**Dependencies**: Phase 4 (CSS-001/CSS-009 overlap)

## Tasks

### IMP-005: Move dimColorsRef to graph.shared.ts
- [ ] Move `DimColors` interface and `dimColorsRef` from graph.constants.ts to graph.shared.ts
- [ ] Keep `resolveDimColors()` in graph.constants.ts (uses DOM)
- [ ] Update imports in GraphControllers.tsx and GraphSearch.tsx

### IMP-004: Fix GraphSearch import (after IMP-005)
- [ ] Change `import { dimColorsRef } from "./graph.constants"` to `from "./graph.shared"`

### DEAD-001 / IMP-009 / CSS-009: Remove unused getSigmaBackground import
- [ ] Remove from GraphView.tsx import line

### DEAD-002: Remove unused getDimColor
- [ ] Delete `getDimColor()` function from graph.constants.ts

### DEAD-003: Un-export adjustColor
- [ ] Remove `export` keyword from adjustColor in graph.constants.ts

### IMP-008: Remove resolveThemeColor from GraphView render
- [ ] Overlaps with Phase 4 CSS-001 — verify already done

### DEAD-008: Document or remove window.theme extensions
- [ ] If AstroPaper template residue, remove
- [ ] If intentional API, add comment

### Verification
- [ ] `grep -r "from.*graph.constants" src/scripts/` — empty
- [ ] `grep -r "from.*GraphView" src/components/graph/ --include="*.tsx"` — only GlobalGraphPage, GraphModal
- [ ] Commit: `refactor: fix import direction, remove dead exports`
