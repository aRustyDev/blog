# Phase 3: Data Model Cleanup

**Priority**: Critical — blog post frontmatter violates ADR-0005
**Findings**: DATA-001, DATA-002, DATA-003, DATA-004, DATA-005, DATA-006, DATA-007, DATA-008
**Estimated time**: 1-2 hours
**Dependencies**: None

## Tasks

### DATA-001/002/003: Fix blog post frontmatter
- [ ] `src/data/blog/starting-contributing-to-linux-kernel.md`: remove `c`, `rust`, `lowlevel`, `tutorial`, `guide` from tags; add `languages: [c, rust]`
- [ ] Audit other blog posts for same violations

### DATA-004: Fix tag-projects.ts vocabulary
- [ ] Remove `book` from `deep-dive-programming-c-effective-c` tags
- [ ] Remove `benchmarking` from `deep-dive-benchmarking-agent-memory` tags
- [ ] Run `just tag-projects --force` to update project frontmatter

### DATA-005/006/007: Fix deriveCategory mappings
- [ ] Add `"deep-dive-comparing-kernels"` prefix → returns `"deep-dive-kernels"`
- [ ] Add `"deep-dive-llm-observability"` prefix → returns new category or existing AI/ML one
- [ ] Add `"deep-dive"` to TOPIC_GROUPS as catch-all "Other Deep Dives" group
- [ ] Update CATEGORY_COLORS/CATEGORY_LABELS if new categories added

### DATA-008: Validate edge targets
- [ ] In build-graph.ts, build nodeIds set after node loop
- [ ] Filter edges against nodeIds before deduplication

### Verification
- [ ] `just graph-dev` — verify node/edge counts reasonable
- [ ] Check `graph.json` for no dangling edges
- [ ] Commit: `fix: data model cleanup per ADR-0005 — tags, categories, edges`
