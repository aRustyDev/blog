# Testing Strategy Plan

## Overview

Establish a comprehensive testing strategy for the blog's content components and utilities. Uses vitest as the test runner, with progressive adoption from pure-function unit tests through component tests to E2E.

## Test Pyramid

```
        /  E2E  \          Playwright (Phase 5)
       / Component \       vitest + @testing-library/react (Phase 4)
      /    Unit     \      vitest (Phase 3)
     /  Framework    \     vitest config + patterns (Phase 2)
    /   Adoption      \    Install vitest + deps (Phase 1)
```

## Phases

| Phase | Title | Depends On | Complexity |
|-------|-------|------------|------------|
| 1 | [Vitest Adoption](./phases/1-vitest-adoption.md) | — | Low |
| 2 | [Test Framework & Patterns](./phases/2-framework-patterns.md) | Phase 1 | Low |
| 3 | [Unit Tests](./phases/3-unit-tests.md) | Phase 2 | Medium |
| 4 | [Component Tests](./phases/4-component-tests.md) | Phase 2 | Medium |
| 5 | [E2E Tests](./phases/5-e2e-tests.md) | Phase 3 | High |

## Test Case Brainstorm

See [Phase 3](./phases/3-unit-tests.md) for the full test case inventory organized by module.

## Principles

- **Test behavior, not implementation** — assert what the function returns or what the DOM shows, not how it gets there
- **Pure functions first** — highest value, easiest to test, no mocking needed
- **Colocate tests** — `src/utils/people.test.ts` next to `src/utils/people.ts`
- **No test-only refactoring** — don't restructure production code just to make it testable; if code is hard to test, that's a design signal
- **Run fast** — unit tests < 5s, component tests < 15s, E2E < 60s
- **CI integration** — `just smoke` should include `npx vitest run` once tests exist

## What NOT to Test

- Astro's build pipeline (Shiki highlighting, static site generation) — that's Astro's job
- CSS appearance (use the visual test page at `/dev/component-test/` for manual QA)
- Third-party library internals (Shiki, dayjs, Sigma.js)
- Content correctness (blog post text, people.json entries)
