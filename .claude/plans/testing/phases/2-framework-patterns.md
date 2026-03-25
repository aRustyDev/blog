# Phase 2: Test Framework & Patterns

## Goal

Establish shared test utilities, conventions, and patterns that all subsequent test files follow.

## Conventions

### File Naming & Location

```
src/utils/people.ts          → src/utils/people.test.ts
src/utils/og-fetch.ts        → src/utils/og-fetch.test.ts
src/components/cli-snippet/
  hooks/useCollapsing.ts     → hooks/useCollapsing.test.ts
  hooks/useAnimation.ts      → hooks/useAnimation.test.ts
  CLISnippetCore.tsx          → CLISnippetCore.test.tsx
```

Colocated — test file sits next to the module it tests.

### Test Structure

```typescript
describe("moduleName", () => {
  describe("functionName", () => {
    it("should handle the happy path", () => { ... });
    it("should handle edge case X", () => { ... });
    it("should return undefined when not found", () => { ... });
  });
});
```

### Naming

- `describe` → module or function name
- `it` → starts with "should" + describes expected behavior
- No "test" prefix in test names

### Assertion Style

```typescript
// Prefer
expect(result).toBe(expected);
expect(result).toEqual({ key: "value" });
expect(fn).toThrow();

// Avoid
assert(result === expected);
```

## Shared Test Utilities

### `src/test/fixtures.ts`

Reusable test data:

```typescript
export const SAMPLE_CODE_TS = `const x = 1;\nconsole.log(x);`;
export const SAMPLE_CODE_JSON = `{ "key": "value" }`;

export const SAMPLE_SHIKI_HTML = `<pre class="shiki"><code>
<span class="line"><span style="--shiki-light:#D73A49" data-line="1" data-col="0" data-scope="storage.type.ts">const</span></span>
</code></pre>`;

export const SAMPLE_PERSON = {
  "@type": "Person" as const,
  "@id": "test-user",
  name: "Test User",
  jobTitle: "Engineer",
  sameAs: [
    "https://x.com/testuser",
    "https://testuser.dev",
    "https://linkedin.com/in/testuser",
  ],
  tags: ["test"],
};
```

### `src/test/helpers.ts`

```typescript
/** Create a minimal TokenMap for testing hooks */
export function createMockTokenMap(lines: string[][]): TokenMap;

/** Create a mock DOM container with Shiki-like HTML */
export function createShikiContainer(code: string, lang: string): HTMLElement;
```

## Files to Create

- `src/test/setup.ts` (from Phase 1)
- `src/test/fixtures.ts`
- `src/test/helpers.ts`

## Acceptance Criteria

- [ ] Test fixtures importable from `@/test/fixtures`
- [ ] Helper functions create valid mock TokenMaps
- [ ] First placeholder test passes: `src/test/smoke.test.ts` (verifies setup works)
