# Phase 2: CLISnippetCollapsible

## Goal

A code display component with semantic collapsing — users can fold/unfold content inside `()`, `{}`, `[]`, `""`, `''` pairs. No animation support.

## Prerequisites

- Research 3 (Semantic Token Groups) complete
- Phase 1 (Core Engine) complete

## Files to Create

```
src/components/cli-snippet/
├── CLISnippetCollapsible.tsx    ← thin wrapper: Core + CollapseGutter + useCollapsing
├── CollapseGutter.tsx           ← fold/unfold icons column
├── hooks/useCollapsing.ts       ← pair detection, fold state management
```

## Props Interface

```typescript
interface CLISnippetCollapsibleProps extends CLISnippetCoreProps {
  collapsibleGroups?: boolean;      // Enable collapsing (default: true)
  defaultCollapsed?: string[];      // Group types to collapse initially: ["{}", "[]", '""']
}
```

## Component Structure

```typescript
// CLISnippetCore owns the containerRef and tokenMap.
// It accepts `ref` as a plain React 19 prop (no forwardRef needed).
// Feature components receive tokenMap as a prop.

function CLISnippetCollapsible(props: CLISnippetCollapsibleProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // tokenMap is computed by CLISnippetCore and passed back via render prop / callback
  return (
    <CLISnippetCore {...coreProps} ref={containerRef}>
      {(tokenMap) => {
        const { pairs, togglePair, isCollapsed } = useCollapsing(tokenMap, {
          enabled: props.collapsibleGroups ?? true,
          defaultCollapsed: props.defaultCollapsed,
        });
        return <CollapseGutter pairs={pairs} onToggle={togglePair} isCollapsed={isCollapsed} />;
      }}
    </CLISnippetCore>
  );
}

// Alternative (simpler): CLISnippetCore exposes tokenMap via a callback prop:
//   <CLISnippetCore onTokenMap={setTokenMap} ... />
// and CLISnippetCollapsible holds the tokenMap in state.
// Either pattern works — the key constraint is: Core owns the ref, Core computes tokenMap,
// feature components consume tokenMap without creating their own ref.
```

## useCollapsing Hook

```typescript
interface BracketPair {
  id: string;
  type: "()" | "{}" | "[]" | '""' | "''";
  openLine: number;
  openCol: number;
  closeLine: number;
  closeCol: number;
  depth: number;
  children: string[];    // nested pair IDs
}

function useCollapsing(tokenMap: TokenMap | null, options: CollapsingOptions) {
  const [collapsedPairs, setCollapsedPairs] = useState<Set<string>>(new Set());
  const pairs = useMemo(() => detectPairs(tokenMap), [tokenMap]);

  // Re-detect pairs whenever tokenMap changes (innerHTML replaced by dev-mode theme switch)
  // When pairs change, re-apply collapse state:
  //   1. Clean up: querySelectorAll('[data-pair-indicator]').forEach(el => el.remove())
  //   2. Re-apply: for each pair in collapsedPairs, hide lines + inject indicator spans
  //   3. Any pair IDs no longer in the new pair set → remove from collapsedPairs

  useEffect(() => {
    if (!tokenMap) return;
    // Cleanup old indicators
    tokenMap.lineElements[0]?.closest('.cli-snippet-body')
      ?.querySelectorAll('[data-pair-indicator]')
      .forEach(el => el.remove());
    // Re-apply fold state for all currently collapsed pairs
    collapsedPairs.forEach(pairId => {
      const pair = pairs.find(p => p.id === pairId);
      if (pair) applyCollapse(pair, tokenMap);
      else setCollapsedPairs(prev => { const n = new Set(prev); n.delete(pairId); return n; });
    });
  }, [tokenMap, pairs]); // Re-runs when HTML changes → tokenMap changes → pairs recomputed

  return { pairs, togglePair, isCollapsed: (id: string) => collapsedPairs.has(id) };
}
```

**Indicator span cleanup**: All injected indicator spans carry `data-pair-indicator="<pairId>"`. Before re-applying collapse state, all existing indicators are removed to prevent duplication. This handles the case where React replaces innerHTML (dev-mode theme switch) and `useTokenMap` re-parses.

## Pair Detection Strategy

**Brackets** (`()`, `{}`, `[]`): Stack-based character matching.
Walk all tokens sequentially, push openers onto stack, pop on matching closer. Stack depth = nesting depth.

**Quotes** (`""`, `''`): TextMate scope-based, NOT character matching.
Scan `data-scope` attributes for `string.quoted.double` / `string.quoted.single`. The scope boundaries define the string extent. This avoids the `"hello" + "world"` false-pairing problem.

## Collapse Behavior

**Multi-line** (most common — `{}` spanning lines):
```
Before:  {
           foo: "bar",
           baz: [1, 2, 3]
         }

After:   { ... }     ← single line, indicator replaces content
```
- Hide intermediate `<span class="line">` elements via `display: none`
- Insert indicator span (`{...}`) after the opening bracket token
- Show closing bracket on the same line as opener

**Single-line** (`[1, 2, 3]` on one line):
```
Before:  const x = [1, 2, 3, 4, 5];
After:   const x = [...];
```
- Hide tokens between brackets
- Insert indicator span

## CollapseGutter

A narrow column to the left of line numbers:
```
▼  1 │ function foo() {
     2 │   const x = 1;
▼  3 │   if (x > 0) {
     4 │     return x;
     5 │   }
     6 │ }
```
- `▼` = expanded (clickable to collapse)
- `▶` = collapsed (clickable to expand)
- Only shown on lines that START a multi-line pair
- Positioned absolutely, aligned with line numbers
- Hidden on mobile (<640px) — collapse via tap on bracket instead

## ARIA

- Fold indicators: `role="button"`, `aria-expanded="true|false"`, `aria-label="Collapse block"`
- Collapsed regions: `aria-hidden="true"` on hidden lines

## Acceptance Criteria

- [ ] Detects bracket pairs: `()`, `{}`, `[]` via stack-based matching
- [ ] Detects quote pairs: `""`, `''` via TextMate scope
- [ ] Handles nested pairs (3+ levels deep)
- [ ] Handles unclosed/unmatched brackets gracefully (ignore, don't crash)
- [ ] Fold gutter with toggle icons (▼/▶)
- [ ] Multi-line collapse: hides intermediate lines, shows `{...}` indicator
- [ ] Single-line collapse: hides content between brackets, shows `[...]`
- [ ] `defaultCollapsed` initializes fold state
- [ ] Mobile: fold gutter hidden, tap on bracket toggles instead
- [ ] ARIA attributes on fold controls and hidden regions
- [ ] Production bundle: <20KB gzipped (Core + collapsing)
