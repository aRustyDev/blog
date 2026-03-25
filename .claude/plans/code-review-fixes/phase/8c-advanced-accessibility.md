# Phase 8c: Advanced Accessibility

**Priority**: High — accessibility compliance (larger effort)
**Findings**: A11Y-004, A11Y-013, A11Y-014, A11Y-018, A11Y-020
**Estimated time**: 3-4 hours
**Dependencies**: Phase 8a, 8b

## Tasks

### A11Y-004: Graph canvas keyboard navigation
- [ ] Add `aria-label` to SigmaContainer wrapper: "Interactive knowledge graph. Use Ctrl+K to search."
- [ ] Consider: accessible node list as `<details>` fallback below the canvas
- [ ] Full keyboard nav (arrow keys between nodes) is a stretch goal — document decision

### A11Y-013: GraphSearch combobox pattern
- [ ] Results container: `role="listbox"`
- [ ] Input: `aria-haspopup="listbox"` `aria-controls="graph-search-results"`
- [ ] Each result: `role="option"` `aria-selected={i === selectedIndex}`
- [ ] Live region: visually hidden div announcing result count changes

### A11Y-014: prefers-reduced-motion
- [ ] LayoutController: skip ForceAtlas2 if `matchMedia('(prefers-reduced-motion: reduce)').matches`
- [ ] GraphToolbar normalize: skip animation, apply positions instantly
- [ ] Camera.animate: set duration to 0 when reduced motion preferred

### A11Y-018: graph.astro page structure
- [ ] Add sr-only `<h1>Knowledge Graph</h1>` before GlobalGraphPage
- [ ] Add `<Footer />` component

### A11Y-020: Tooltip via aria-live
- [ ] Add visually hidden `aria-live="polite"` div
- [ ] Update its text when hover tooltip data changes

### Verification
- [ ] VoiceOver: navigate graph page end-to-end
- [ ] prefers-reduced-motion: enable in System Preferences, verify no animation
- [ ] Commit: `fix: advanced accessibility — canvas alt, combobox, reduced motion`
