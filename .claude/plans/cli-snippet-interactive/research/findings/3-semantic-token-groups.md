# Research 3 Findings: Semantic Token Groups

**Status: GREEN LIGHT** — Hybrid detection strategy confirmed. Stack-based for brackets, scope-based for quotes.

## Key Decisions

| Question | Decision |
|----------|---------|
| Bracket detection | Stack-based character matching, filtering out brackets inside `string.*`/`comment.*` scopes |
| Quote detection | TextMate scope-based (`string.quoted.double.*`, `string.quoted.single.*`) |
| Template literals | **Excluded from quote collapsing** (complex embedded expressions) |
| Nesting | Independent fold state per pair; `depth` field for level tracking |
| UX | Gutter triangle icons (desktop), bracket tap (mobile), `{...}` indicators |
| Tree-sitter needed? | **No** — stack + scope filtering is sufficient |

## Confirmed Scope Names

### Cross-Language String Pattern

| Type | Scope Pattern |
|------|--------------|
| Double-quoted | `string.quoted.double.<lang>` |
| Single-quoted | `string.quoted.single.<lang>` |
| Template literal | `string.template.<lang>` |

Detection regex: `/^string\.quoted\.(double|single)\./`

### TypeScript Bracket Scopes (Warning: Context-Dependent)

| Context | `{` Scope |
|---------|-----------|
| Function/if/for body | `punctuation.definition.block.ts` |
| Object literal | `meta.brace.curly.ts` |
| Function params `()` | `punctuation.definition.parameters.begin.ts` |
| Call/group `()` | `meta.brace.round.ts` |
| Array `[]` | `meta.brace.square.ts` |

**This is why bracket detection uses character matching, not scopes.** Same character → different scope names depending on context.

### Scope Filtering

Brackets inside strings/comments must be ignored:
```typescript
const IGNORE_SCOPES = /^(string\.|comment\.)/;
```

## Detection Algorithm Summary

**Brackets**: Walk tokens in document order. Push openers onto stack with depth. On closer, walk stack backward to find matching type (handles mismatched gracefully). Skip tokens whose `data-scope` starts with `string.` or `comment.`. Unmatched openers/closers silently dropped.

**Quotes**: Scan `data-scope` for `string.quoted.double.*` / `string.quoted.single.*` boundaries. Scope transitions define string extent — solves `"hello" + "world"` false-pairing.

## Edge Cases Handled

| Case | Handling |
|------|---------|
| Unclosed brackets | Silently ignored (stays on stack, dropped at end) |
| Unmatched closers | Silently skipped |
| Brackets inside strings | Filtered by `IGNORE_SCOPES` regex on `data-scope` |
| Brackets inside comments | Filtered by `IGNORE_SCOPES` regex |
| Template literal `${}` | Scope is `punctuation.definition.template-expression.*`, not `meta.brace.curly` — won't falsely match |
| Empty pairs `{}` | Detected but filtered from gutter (nothing to collapse) |
| Adjacent `{}{}` | Stack correctly produces two separate pairs |

## Collapse UX

| Pair | Indicator | Desktop | Mobile |
|------|-----------|---------|--------|
| `{}` | `{...}` | Gutter ▼/▶ icon | Tap on `{` |
| `[]` | `[...]` | Gutter ▼/▶ icon | Tap on `[` |
| `()` | `(...)` | Gutter ▼/▶ icon | Tap on `(` |
| `""` | `"..."` | Gutter ▼/▶ icon | Tap on `"` |
| `''` | `'...'` | Gutter ▼/▶ icon | Tap on `'` |

Gutter hidden below 640px. Fold indicators: `role="button"`, `aria-expanded`, `aria-label`.

## State Management

Single `Set<string>` of collapsed pair IDs. Toggle via `setCollapsedPairs(prev => { next.has(id) ? next.delete(id) : next.add(id) })`. Initial state seeded from `defaultCollapsed` prop (filter by pair type, multi-line only).
