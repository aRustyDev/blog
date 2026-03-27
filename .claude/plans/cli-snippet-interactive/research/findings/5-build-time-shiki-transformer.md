# Research 5 Findings: Build-Time Shiki Transformer + DOM Token Parsing

**Status: GREEN LIGHT** — The hybrid approach is validated. Build-time pre-rendering with metadata injection is feasible and simpler than initially planned.

## Key Findings

### 1. The `span` hook receives the raw token (5th argument)

The transformer `span` hook signature is:

```typescript
span(hast: Element, line: number, col: number, lineElement: Element, token: ThemedToken)
```

- `line` — 1-based line number
- `col` — **0-based character offset within the line** (cumulative `token.content.length`), NOT a token index
- `token` — the raw `ThemedToken` with `content`, `offset`, `color`, and optionally `explanation` (scope data)

**Impact**: The closure-based `tokens` → `span` pattern we designed is UNNECESSARY. Scope data is directly available on the `token` argument. The transformer is dramatically simpler.

### 2. `includeExplanation: 'scopeName'` enables lightweight scope access

```typescript
const html = highlighter.codeToHtml(code, {
  lang: 'typescript',
  themes: { light: 'github-light', dark: 'github-dark' },
  defaultColor: false,
  includeExplanation: 'scopeName', // lightweight — scope names only, no theme match data
  transformers: [/* ... */],
})
```

With `includeExplanation: 'scopeName'`, each token gets:
```json
{
  "explanation": [{
    "content": "const",
    "scopes": [
      { "scopeName": "source.ts" },
      { "scopeName": "meta.var.expr.ts" },
      { "scopeName": "storage.type.ts" }
    ]
  }]
}
```

The deepest (most specific) scope is `scopes.at(-1).scopeName`.

**Caveat**: `includeExplanation` is NOT available through Astro's `shikiConfig` passthrough. We must call `codeToHtml()` programmatically in the Astro wrapper component, not via the markdown pipeline. This is fine — the CLISnippet components are explicitly invoked in MDX, not triggered by fenced code blocks.

### 3. `col` is character offset — simplifies split-line animation

Since `col` is the cumulative character offset (not token index), `data-col` directly maps to the `chars: [start, end]` ranges in animation steps. No separate `charStart`/`charEnd` computation needed — `data-col` IS the character start position, and `data-col + element.textContent.length` is the end.

**Impact**: The `TokenMeta.charStart` can be derived directly from `data-col`. The `charEnd` is `parseInt(data-col) + element.textContent.length`. No cumulative traversal needed.

### 4. `clip-path: inset()` works on `display: inline` spans

Per CSS Masking Level 1 spec, `clip-path` applies to "all elements" including inline non-replaced elements. For Shiki token spans (always single-line, never fragmented):

| Browser | Support |
|---------|---------|
| Chrome 55+ | Full |
| Firefox 54+ | Full |
| Safari 13.1+ | Full (no prefix needed) |

The only concern is multi-line inline fragmentation (via `box-decoration-break`), but Shiki tokens never span multiple lines. **No fallback needed.**

### 5. Programmatic `codeToHtml()` produces identical output to Astro

```typescript
import { createHighlighter } from 'shiki';

const highlighter = await createHighlighter({
  themes: ['github-light', 'github-dark'],
  langs: ['typescript', 'json', 'yaml', 'bash', 'markdown'],
});

const html = highlighter.codeToHtml(code, {
  lang: 'typescript',
  themes: { light: 'github-light', dark: 'github-dark' },
  defaultColor: false,
  includeExplanation: 'scopeName',
  transformers: [transformerTokenMetadata({ includeScope: true })],
});
```

Output with `defaultColor: false` uses CSS variables identical to Astro's:
```html
<span style="--shiki-light:#1976D2;--shiki-dark:#D8DEE9" data-line="1" data-col="0" data-scope="storage.type.ts">const</span>
```

### 6. The simplified transformer

```typescript
import type { ShikiTransformer } from 'shiki';

export function transformerTokenMetadata(options?: {
  includeScope?: boolean;
}): ShikiTransformer {
  return {
    name: 'token-metadata',
    span(node, line, col, _lineEl, token) {
      node.properties['data-line'] = String(line);
      node.properties['data-col'] = String(col);

      if (options?.includeScope) {
        const scope = token.explanation?.[0]?.scopes?.at(-1)?.scopeName;
        if (scope) {
          node.properties['data-scope'] = scope;
        }
      }
    },
  };
}
```

That's the entire transformer. No closure, no `tokens` hook, no scope lookup map.

### 7. HTML size impact estimate

For a 100-line TypeScript block (~12 tokens/line = 1200 tokens):
- `data-line` + `data-col`: ~30 bytes/token × 1200 = ~36KB raw, ~2-4KB gzipped (high repetition)
- `data-scope` (opt-in): ~40 bytes/token × 1200 = ~48KB raw, ~3-8KB gzipped (repeated scope strings compress well)
- **Total overhead**: ~5-12KB gzipped with scope, ~2-4KB gzipped without

Acceptable for static Cloudflare serving.

## Open Questions Resolved

| Question | Resolution |
|----------|-----------|
| Q3: clip-path on inline spans? | **Works** — all modern browsers, no fallback needed |
| Q5: HTML payload with data-scope? | **~5-12KB gzipped** with scope, ~2-4KB without — acceptable |
| Transformer scope access? | **Direct** — 5th arg to `span` hook is the token |
| col semantics? | **Character offset** (not token index) — directly usable for split-line animation |

## Recommendation

1. Use `codeToHtml()` programmatically in the Astro wrapper with `includeExplanation: 'scopeName'`
2. Use the simplified 10-line transformer above
3. `TokenMeta.charStart` = `parseInt(element.dataset.col)`, `charEnd` = `charStart + element.textContent.length`
4. `clip-path: inset()` for split-line animation — no `inline-block` wrapper needed
5. `data-scope` only for Collapsible component (opt-in via transformer option)
