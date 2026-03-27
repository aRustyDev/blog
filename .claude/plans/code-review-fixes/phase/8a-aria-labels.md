# Phase 8a: ARIA Labels

**Priority**: High — accessibility compliance
**Findings**: A11Y-005, A11Y-006, A11Y-007, A11Y-008, A11Y-009, A11Y-012, A11Y-015, A11Y-017, A11Y-019, A11Y-021
**Estimated time**: 1 hour
**Dependencies**: None

## Tasks

All trivial/small fixes — add aria attributes to existing elements.

### LocalGraphWidget
- [ ] A11Y-005: collapse toggle → `aria-expanded={!collapsed}`
- [ ] A11Y-006: icon buttons → `aria-label="Expand page graph"`, `aria-label="Open site graph"`
- [ ] A11Y-012: depth slider → `<label htmlFor="depth-slider">Depth</label>`

### GraphModal
- [ ] A11Y-007: close button → `aria-label="Close graph modal"`

### GraphToolbar
- [ ] A11Y-008: search button → `aria-label="Search nodes"`, legend toggle → `aria-expanded={legendOpen}`

### Header
- [ ] A11Y-009: theme-btn → dynamic `aria-label` via reflectPreference ("Switch to dark/light mode")

### BackToTopButton
- [ ] A11Y-015: button → `aria-label="Back to top"`, icons → `aria-hidden="true"`

### GlobalGraphPage
- [ ] A11Y-017: aside → `aria-label="Graph filters"`

### GraphFilters
- [ ] A11Y-019: language + tag pills → `aria-pressed={active}`

### GraphSearch
- [ ] A11Y-021: input → `aria-label="Search graph nodes"`

### Verification
- [ ] Screen reader test (VoiceOver): navigate graph page, widget, modals
- [ ] Commit: `fix: add ARIA labels to graph components and controls`
