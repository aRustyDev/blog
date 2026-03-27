# ADR-0009: Smoke Tests

## Status

Accepted

## Date

2026-03-20

## Context

The blog has grown to include multiple build steps (graph data generation, Astro build, Pagefind indexing), React islands (graph visualization with WebGL), external CDN dependencies (brand theme), and multiple deployment targets (dev vs production). Changes that pass TypeScript checks can still break at runtime (e.g., ForceAtlas2 dynamic import type mismatch, SSR errors from WebGL access, missing `dist/` directory for preview).

We need a defined set of smoke tests that verify the system works end-to-end, and clear guidance on when to extend them.

## Decision

### Smoke Test Definition

A smoke test verifies that a critical path works at the most basic level — "does it start, does it render, does it not crash." Smoke tests are NOT comprehensive functional tests. They catch build failures, import errors, SSR crashes, and missing dependencies.

### Current Smoke Tests

Run via justfile recipes. Each test is a recipe that exits 0 on success, non-zero on failure.

#### Tier 1: Build Integrity (must pass before any commit)

| Test | Command | What It Verifies |
|------|---------|-----------------|
| TypeScript | `npx astro check` | All types resolve, no import errors |
| Graph build (dev) | `just graph-dev` | `build-graph.ts` can import from `graph.shared.ts`, produces valid JSON |
| Graph build (prod) | `just graph-prod` | Production graph excludes projects, outputs posts only |
| Full build | `just build` | Astro build succeeds, Pagefind indexes, `dist/` is created |

#### Tier 2: Runtime Verification (should pass before pushing)

| Test | Command | What It Verifies |
|------|---------|-----------------|
| Dev server starts | `just dev` (verify startup message) | No SSR errors, React integration loads, graph data generated |
| Graph page renders | `curl localhost:4321/graph/` — no `ReferenceError` | WebGL components don't crash SSR (`client:only="react"` working) |
| Post widget renders | `curl localhost:4321/posts/*/` — contains `graph-widget` | LocalGraphWidget island hydrates |
| Homepage renders | `curl localhost:4321/` — contains site title | Basic page rendering works |
| Component test page | `curl localhost:4321/dev/component-test/` — HTTP 200 | All content components render without SSR errors |
| Preview works | `just preview` | Production build serves correctly |

#### Tier 3: Data Integrity (run after content changes)

| Test | Command | What It Verifies |
|------|---------|-----------------|
| Tag derivation | `just tag-projects --dry-run` | All projects have tag mappings |
| Graph node count | Check `graph.json` node/edge counts | No regressions in content parsing |
| No circular imports | `grep -r "from.*GraphView" src/components/graph/` | Only approved consumers import GraphView |
| Node.js safety | `grep -r "from.*graph.constants" src/scripts/` | Browser-only module never imported by Node.js scripts |

### When to Add New Smoke Tests

Add a new smoke test when:

1. **A new build step is added** — if you add a new script to the build pipeline, add a Tier 1 test that verifies it runs without error
2. **A new page or route is created** — add a Tier 2 test that verifies it renders (HTTP 200, no error in body)
3. **A new Astro island is added** — add a Tier 2 test that the `client:only` component doesn't cause SSR errors
4. **A new data source is added** — add a Tier 3 test that verifies the data pipeline produces expected output
5. **A bug is found that a smoke test would have caught** — add a test to prevent regression

### When NOT to Add Smoke Tests

- Don't test visual appearance (that's manual review or screenshot testing)
- Don't test specific content (blog post text, project descriptions)
- Don't test external services (CDN availability, Cloudflare deployment)
- Don't test interactive behavior (click handlers, drag, search results)

### Smoke Test Recipe

Add a `smoke` recipe to the justfile that runs all Tier 1 tests:

```just
# Run smoke tests (Tier 1: build integrity)
smoke:
    @echo "Running smoke tests..."
    npx astro check
    just graph-dev
    just graph-prod
    just build
    @echo "All smoke tests passed."
```

For Tier 2 (runtime), a `smoke-full` recipe starts the dev server, runs curl checks, and kills the server:

```just
# Run full smoke tests (Tier 1 + Tier 2)
smoke-full: smoke
    @echo "Starting runtime checks..."
    npm run dev &
    sleep 10
    curl -sf http://localhost:4321/ > /dev/null
    curl -sf http://localhost:4321/graph/ > /dev/null
    kill %1 2>/dev/null
    @echo "All runtime checks passed."
```

### Integration with Development Workflow

- **Before committing:** Run `just smoke` (Tier 1, ~30 seconds)
- **Before pushing:** Run `just smoke-full` (Tier 1 + 2, ~60 seconds)
- **After content changes:** Run Tier 3 checks manually
- **CI/CD:** Run `just smoke` in the build pipeline (Workers Builds runs `npm run build` which covers Tier 1)

## Consequences

- Developers have a clear, fast way to verify nothing is broken
- New features require explicit consideration of smoke test coverage
- The `smoke` recipe becomes a pre-commit check that catches common failures
- Tier separation keeps fast checks fast (Tier 1: ~30s) while allowing thorough checks when needed (Tier 2: ~60s)
- Smoke tests are NOT a substitute for manual QA — they catch crashes, not quality issues
