# Code Review Fixes Plan

82 findings across 8 review categories, ordered by dependency and priority.

**Source**: `refs/2026-03-20-*.json` (8 review files + `refs/index.md`)

## Phase Index

| Phase | Title | Findings | Priority | Time | Status |
|-------|-------|----------|----------|------|--------|
| [0](phase/0-broken-tokens.md) | Broken Tokens | 1 | Immediate | 5 min | pending |
| [1](phase/1-event-listener-leaks.md) | Event Listener Leaks | 6 | Critical | 1-2h | pending |
| [2](phase/2-build-pipeline.md) | Build Pipeline | 4 | Critical | 30 min | pending |
| [3](phase/3-data-model-cleanup.md) | Data Model Cleanup | 8 | Critical | 1-2h | pending |
| [4](phase/4-color-safety.md) | Color Safety | 6 | High | 1h | pending |
| [5](phase/5-view-transition-safety.md) | View Transition Safety | 4 | High | 1h | pending |
| [6](phase/6-import-cleanup.md) | Import & Dead Code | 9 | High/Med | 1h | pending |
| [7](phase/7-css-polish.md) | CSS Polish | 7 | Medium | 1h | pending |
| [8a](phase/8a-aria-labels.md) | ARIA Labels | 10 | High | 1h | pending |
| [8b](phase/8b-dialog-semantics.md) | Dialog Semantics | 6 | High | 2-3h | pending |
| [8c](phase/8c-advanced-accessibility.md) | Advanced Accessibility | 5 | High | 3-4h | pending |
| [9](phase/9-deferred.md) | Deferred | 16 | Future | — | deferred |

## Dependency Graph

```
Phase 0 (immediate, no deps)
Phase 1 (no deps)
Phase 2 (no deps)
Phase 3 (no deps)
  ↓
Phase 4 (no deps, but establishes hex guard pattern)
  ↓
Phase 5 (depends on Phase 1 listener pattern)
Phase 6 (depends on Phase 4 for CSS-001/009 overlap)
Phase 7 (depends on Phase 4 hex guard pattern)
  ↓
Phase 8a (no deps)
Phase 8b (depends on 8a)
Phase 8c (depends on 8a, 8b)
  ↓
Phase 9 (deferred)
```

## Critical Path

Phases 0-3 resolve all 24 critical findings (~4 hours).

## Severity Summary

| Severity | Count |
|----------|-------|
| Critical | 24 |
| High | 36 |
| Medium | 11 |
| Low | 11 |
| **Total** | **82** |
