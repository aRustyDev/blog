# Phase 7: Light Mode CSS Polish

**Priority**: Medium — visual quality
**Findings**: CSS-005, CSS-006, CSS-008, CSS-010, CSS-011, CSS-012, CSS-013
**Estimated time**: 1 hour
**Dependencies**: Phase 4 (hex guard pattern)

## Tasks

### CSS-005 + CSS-006: color-mix() Safari fallback
- [ ] GraphSearch spotlight: add plain var(--muted) fallback before color-mix()
- [ ] LocalGraphWidget: same approach

### CSS-008: graph.css var() fallbacks
- [ ] `var(--border)` → `var(--border, #30363d)`
- [ ] `var(--background)` → `var(--background, #0d1117)`

### CSS-010: Pre-populate theme-color meta
- [ ] Set `content="#0d1117"` as initial value in Layout.astro

### CSS-011: Typography dark-mode selector consistency
- [ ] Consider using @custom-variant dark consistently

### CSS-012 + CSS-013: GraphSearch light mode contrast
- [ ] Selected row highlight: `rgba(255,255,255,0.08)` → `var(--border, #30363d)`
- [ ] Dividers: `rgba(255,255,255,0.06)` → `var(--border, #30363d)` with low opacity

### Verification
- [ ] Toggle light/dark — search spotlight, widget, graph container all look correct
- [ ] Commit: `fix: light mode contrast and CSS fallbacks`
