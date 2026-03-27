# Phase 1: Vitest Adoption

## Goal

Install vitest and configure it for the Astro + React + TypeScript project.

## Dependencies to Install

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom happy-dom
```

| Package | Purpose |
|---------|---------|
| `vitest` | Test runner — fast, Vite-native, TypeScript out of the box |
| `@testing-library/react` | React component testing (render, query, user events) |
| `@testing-library/jest-dom` | DOM matchers (`toBeInTheDocument`, `toHaveClass`, etc.) |
| `happy-dom` | Lightweight DOM implementation for unit/component tests (faster than jsdom) |

## Files to Create

### `vitest.config.ts`

```typescript
import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "happy-dom",
    globals: true,
    include: ["src/**/*.test.{ts,tsx}"],
    setupFiles: ["./src/test/setup.ts"],
    css: false, // Don't process CSS in unit tests
  },
});
```

### `src/test/setup.ts`

```typescript
import "@testing-library/jest-dom/vitest";
```

### `tsconfig.json` update

Add vitest types:
```json
{
  "compilerOptions": {
    "types": ["vitest/globals"]
  }
}
```

## Package.json Scripts

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage"
  }
}
```

## Justfile Update

Add `test` to the `smoke` recipe:
```just
smoke:
    @echo "=== Smoke Tests (Tier 1) ==="
    npx astro check
    npx vitest run
    just build
    @echo "=== All smoke tests passed ==="
```

## Acceptance Criteria

- [ ] `npx vitest run` exits 0 (no tests yet, but framework loads)
- [ ] Path alias `@/` resolves in tests
- [ ] `happy-dom` environment works
- [ ] `@testing-library/jest-dom` matchers available
- [ ] `npm test` script runs vitest
