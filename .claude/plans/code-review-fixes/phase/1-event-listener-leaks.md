# Phase 1: Event Listener Leaks

**Priority**: Critical — memory leaks and incorrect behavior after navigation
**Findings**: VT-001, VT-002, VT-003, VT-004, VT-005, VT-009
**Estimated time**: 1-2 hours
**Dependencies**: None

## Pattern

`data-astro-rerun` scripts re-execute on every view transition, adding new event listeners without removing old ones. After N navigations, N duplicate listeners fire.

**Fix pattern**: Use an AbortController stored on `window`, abort at top of each rerun script before re-registering.

## Tasks

### VT-001: theme.ts theme-btn click listener
- [ ] In `setThemeFeature()`, remove previous listener before adding new one
- [ ] Use AbortController or named function + removeEventListener

### VT-002 + VT-003: PostDetails scroll listeners
- [ ] Move `astro:after-swap` scroll-to-top from data-astro-rerun to regular script
- [ ] Add AbortController to `updateScrollProgress()` — abort previous before re-registering
- [ ] Guard `createProgressBar()`: `if (!document.querySelector('.progress-container'))` (VT-009)

### VT-004 + VT-005: BackToTopButton listeners
- [ ] Add AbortController to `backToTop()` — abort previous signal before re-registering scroll + click

### Verification
- [ ] Navigate between pages 10+ times, check DevTools → Event Listeners — count should stay constant
- [ ] Commit: `fix: prevent event listener accumulation during view transitions`
