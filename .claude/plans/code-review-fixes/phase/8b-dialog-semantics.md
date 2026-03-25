# Phase 8b: Dialog Semantics & Focus Traps

**Priority**: High — accessibility compliance
**Findings**: A11Y-001, A11Y-002, A11Y-003, A11Y-010, A11Y-011, A11Y-016
**Estimated time**: 2-3 hours
**Dependencies**: Phase 8a (labels in place first)

## Tasks

### GraphModal (A11Y-001, A11Y-002)
- [ ] Add `role="dialog"` `aria-modal="true"` to modal container div
- [ ] Add `aria-labelledby` pointing to the mode toggle label
- [ ] Implement focus trap: on open, focus close button; Tab cycles within modal; on close, return focus
- [ ] Consider using a focus-trap library or manual implementation

### GraphSearch (A11Y-003)
- [ ] Add `role="dialog"` `aria-modal="true"` `aria-label="Search graph nodes"` to spotlight div
- [ ] Focus trap within input + results list + ESC key
- [ ] Return focus to search trigger button on close

### GraphFilters checkboxes (A11Y-010, A11Y-011)
- [ ] Blog Posts/Projects checkboxes: connect to label via `<label>` wrapper or `aria-labelledby`
- [ ] Topic group indeterminate checkboxes: same approach

### GraphFilters section toggles (A11Y-016)
- [ ] Add `aria-expanded` to all section toggle buttons (Node Type, Topics, Languages, Tags)
- [ ] Add `aria-controls` pointing to collapsible content id

### Verification
- [ ] Tab through graph page — focus stays within modals when open
- [ ] ESC closes modals and returns focus
- [ ] Screen reader announces checkboxes with labels
- [ ] Commit: `fix: add dialog semantics and focus traps to graph modals`
