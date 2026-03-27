# Research 5: Build-Time Shiki Transformer + DOM Token Parsing

## Context

This is the most critical research item. The hybrid approach (build-time Shiki for production, runtime for dev) depends on two capabilities:
1. A Shiki transformer that injects metadata attributes (`data-scope`, `data-line`, `data-col`) during build-time highlighting
2. A runtime DOM parser that reconstructs token metadata from the pre-rendered HTML

If either fails, we fall back to runtime-only Shiki.

## Research Questions

1. **Shiki transformer API**: Can a custom Shiki transformer inject `data-*` attributes onto individual token `<span>` elements? What's the API surface — `decorations`, `postprocess`, `tokens` hook? Does the existing `@shikijs/transformers` package provide a pattern to follow?
2. **Scope preservation**: When Shiki renders tokens, each token has a TextMate scope chain (e.g., `variable.other.readwrite.ts`). Is the scope accessible in the transformer hooks? Can we inject it as a `data-scope` attribute without significantly increasing HTML size?
3. **Line/column metadata**: Shiki groups tokens by line (`<span class="line">`). Can we inject `data-line` on line spans and `data-col` on token spans during transformation? How does this interact with Shiki's existing line-class handling?
4. **HTML size impact**: Adding 3 data attributes per token to a 100-line code block — how much does this increase the serialized HTML? Estimate for typical blocks (50-100 lines, 10-15 tokens/line). Is this acceptable for static Astro pages served from Cloudflare?
5. **DOM parsing feasibility**: Given pre-rendered HTML injected via `dangerouslySetInnerHTML` or ref + `innerHTML`, can React `useEffect` reliably query all `[data-scope]` spans and reconstruct a token map? Any race conditions with hydration?
6. **Prototype**: Build a minimal proof-of-concept:
   - Astro component frontmatter: call `codeToHtml()` with custom transformer that adds `data-scope`, `data-line`, `data-col`
   - React component: receive HTML as prop, inject into DOM, `useEffect` to parse tokens, demonstrate collapsing a `{}` pair by toggling visibility of intermediate spans
   - If this works end-to-end, the hybrid approach is validated

## Sources to Investigate

- Shiki transformer API docs: https://shiki.style/guide/transformers
- `@shikijs/transformers` source — how `transformerNotationDiff`, `transformerNotationHighlight` etc. modify tokens
- Existing blog `astro.config.ts` — which transformers are already applied and how
- Astro `set:html` directive — behavior with React islands via `client:only`

## Deliverable

One of:
- **Green light**: Working prototype with pre-rendered HTML + runtime DOM parsing. Document the transformer code and parsing approach.
- **Yellow light**: Feasible with caveats (e.g., HTML size concern, scope data incomplete for some languages). Document trade-offs.
- **Red light**: Not feasible — fall back to runtime-only Shiki. Document why.

## Additional Research Criteria

7. **Scope injection via `tokens` → `span` closure pattern**: The Shiki `span` hook does not have direct access to TextMate scope data. The `tokens` hook (which receives `Token[][]` with `explanation` arrays containing scope chains) must build a lookup table stored in a closure, and the `span` hook reads from it. Confirm this pattern works and that `token.explanation[0].scopes` is populated for the languages we need (TypeScript, JSON, YAML, Bash, Markdown).

8. **`clip-path` on Shiki's `display: inline` token spans**: Shiki produces `<span>` elements that are `display: inline` by default. CSS `clip-path: inset()` on inline elements has historically been inconsistent. Test in Chrome, Firefox, Safari. If it fails, document whether wrapping each token in `display: inline-block` breaks the pre-rendered layout.

9. **Zero-width tokens**: Some languages/grammars produce tokens with empty `textContent`. Confirm `useTokenMap` handles these correctly (filter or mark as zero-width) so character-offset accumulation doesn't break.

10. **Scope opt-in**: Test the transformer with `includeScope: true` vs `false`. Measure HTML payload difference for a 100-line TypeScript block. Confirm the `false` path still produces valid `data-line` and `data-col` attributes.

## Success Criteria

- [ ] Custom Shiki transformer injects `data-scope`, `data-line`, `data-col` on tokens
- [ ] `tokens` → `span` closure pattern confirmed working (scope data accessible)
- [ ] HTML size increase measured: with scope (<30%) and without scope (<15%)
- [ ] React component successfully parses pre-rendered HTML and reconstructs token map
- [ ] `charStart`/`charEnd` computed correctly from `textContent` traversal
- [ ] Zero-width tokens handled (no offset corruption)
- [ ] Proof-of-concept: bracket pair detected and collapsed from pre-rendered HTML
- [ ] Proof-of-concept: `clip-path` on inline token spans works in Chrome/Firefox/Safari
- [ ] Dev-mode runtime path confirmed working as fallback
- [ ] Scope opt-in: `includeScope: false` produces smaller HTML with valid line/col data
