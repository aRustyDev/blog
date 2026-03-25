# Phase 9: Deferred Architecture

**Priority**: Lower — valid improvements, defer to future sprint
**Estimated time**: Varies

## Deferred Findings

| Finding | Why Defer |
|---------|-----------|
| IMP-001/002 | LocalGraphWidget uses GraphView for inline preview — requires ADR amendment or component restructuring |
| IMP-003/006 | GraphView still calls useGraphData internally — full prop-driven refactor, medium risk |
| IMP-007 | GraphEvents doesn't import CATEGORY_LABELS — ADR drift, cosmetic |
| BUILD-004/005 | Relative paths in build scripts — works for all current use cases |
| PERF-001/002 | CDN render-blocking — requires self-hosting or preload strategy |
| PERF-003 | JSON.stringify in useCallback deps — works, just inefficient |
| PERF-004/005 | Render-path memoization — works, just unnecessary work |
| PERF-006/007 | Fuse.js lazy loading — works, just eager |
| DEAD-005/006 | Placeholder social URLs — harmless while disabled |
| DEAD-007 | graphData unused in local/modal paths — minor waste |

## When to Revisit

- **IMP-001/002/003**: When adding new GraphView consumers or refactoring the data flow
- **PERF-001/002**: When PageSpeed score drops below target or CDN reliability is a concern
- **PERF-003/004/005/006/007**: When graph grows beyond ~200 nodes and performance degrades
- **BUILD-004/005**: When scripts need to run from a different working directory
