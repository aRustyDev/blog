# Code Review Findings Index

Generated: 2026-03-20

## Review Categories

| # | Category | File | Findings | Critical | High | Medium | Low |
|---|----------|------|----------|----------|------|--------|-----|
| 1 | CSS/Theming | `2026-03-20-css-theming.json` | 13 | 0 | 4 | 6 | 3 |
| 2 | Build Pipeline | `2026-03-20-build-pipeline.json` | 6 | 3 | 3 | 0 | 0 |
| 3 | Import Direction | `2026-03-20-import-direction.json` | 9 | 2 | 3 | 3 | 1 |
| 4 | View Transitions | `2026-03-20-view-transitions.json` | 10 | 4 | 5 | 1 | 0 |
| 5 | Graph Data Model | `2026-03-20-graph-data-model.json` | 8 | 4 | 4 | 0 | 0 |
| 6 | Accessibility | `2026-03-20-accessibility.json` | 21 | 9 | 12 | 0 | 0 |
| 7 | Performance | `2026-03-20-performance.json` | 7 | 2 | 5 | 0 | 0 |
| 8 | Dead Code | `2026-03-20-dead-code.json` | 8 | 0 | 0 | 1 | 7 |

## Summary

| Severity | Count |
|----------|-------|
| Critical | **24** |
| High | **36** |
| Medium | **11** |
| Low | **11** |
| **Total** | **82** |

## Top Priority Findings (Critical)

### View Transitions (4 critical)
- VT-001: theme-btn click listener accumulates on every navigation
- VT-002: astro:after-swap scroll-to-top listener added unboundedly
- VT-003: Scroll progress listener accumulates on every navigation
- VT-004: BackToTopButton scroll listener accumulates on every navigation

### Accessibility (9 critical)
- A11Y-001: GraphModal no focus trap
- A11Y-002: GraphModal no role=dialog
- A11Y-003: GraphSearch no focus trap or dialog semantics
- A11Y-004: Graph canvas not keyboard navigable
- A11Y-005: LocalGraphWidget toggle missing aria-expanded
- A11Y-006: LocalGraphWidget icon buttons missing aria-label
- A11Y-007: GraphModal close button missing aria-label
- A11Y-008: GraphToolbar search/legend missing ARIA
- A11Y-009: theme-btn aria-label static 'auto'

### Graph Data Model (4 critical)
- DATA-001: Blog post tags contain language identifiers
- DATA-002: Blog post tags contain format words
- DATA-003: Blog post tag 'lowlevel' prohibited
- DATA-004: 'book' and 'benchmarking' are contentType not tags

### Build Pipeline (3 critical)
- BUILD-001: wrangler not in dependencies
- BUILD-002: deploy recipe uses Pages API instead of Workers
- BUILD-003: deploy-only recipe same mismatch

### Import Direction (2 critical)
- IMP-001: LocalGraphWidget imports GraphView directly
- IMP-002: LocalGraphWidget uses GraphView in render path

### Performance (2 critical)
- PERF-001: CDN stylesheet render-blocking with no fallback
- PERF-002: CDN script render-blocking (no defer/async)

## Cross-Cutting Themes

1. **Event listener leaks** (VT-001 through VT-005): data-astro-rerun scripts add listeners without cleanup
2. **ARIA missing on graph components** (A11Y-001 through A11Y-021): comprehensive accessibility gap
3. **Tag/language/contentType confusion** (DATA-001 through DATA-004): blog post frontmatter doesn't follow ADR-0005
4. **CDN dependency risk** (PERF-001, PERF-002, CSS-008): render-blocking external resources
5. **Hardcoded dark-mode colors** (CSS-002 through CSS-004, CSS-012, CSS-013): light mode contrast issues
