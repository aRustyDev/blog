# Phase 2: CodeBlock

## Goal

A syntax-highlighted code block with optional title bar and collapsible wrapper. Leverages existing Shiki integration.

## File to Create

`src/components/CodeBlock.astro`

## Props Interface

```typescript
type Props = {
  code: string;            // Raw code text (NOT slot — see PLAN.md Content Passing Strategy)
  lang: string;            // Language for Shiki highlighting
  collapsible?: boolean;   // Default: true
  title?: string;          // Header label (e.g., "settings.json")
  lineNumbers?: boolean;   // Default: false
  class?: string;          // Additional CSS classes
};
```

**MDX usage**: `<CodeBlock code={\`{ "key": "value" }\`} lang="json" title="config.json" />`

## Render Spec

```
┌─────────────────────────────────────┐
│ [▾] settings.json                   │  ← title bar (if title prop set)
├─────────────────────────────────────┤
│  1 │ {                              │  ← line numbers (if lineNumbers)
│  2 │   "hooks": {                   │
│  3 │     "PreToolUse": [...]        │  ← Shiki-highlighted code
│  4 │   }                            │
│  5 │ }                              │
└─────────────────────────────────────┘
```

## Implementation Steps

1. Create component file with Props type
2. In component frontmatter, call `shiki.codeToHtml(code, { lang, themes: { light: 'github-light', dark: 'github-dark' } })` to produce highlighted HTML at build time. Import `createHighlighter` from `shiki` (add as dependency — currently only `@shikijs/transformers` exists for the markdown pipeline)
3. Title bar: render if `title` prop provided; include collapse toggle icon when collapsible
4. Collapsible: wrap in `<details class="component-details" open><summary>...</summary>` when `collapsible=true` — use `.component-details` class to reset prose `<details>` styles (see PLAN.md)
5. Code rendering: inject Shiki output via `<Fragment set:html={highlightedHtml} />`
6. Line numbers: CSS counter-based (`counter-reset: line` on `code` element; `counter-increment: line` on `.line::before`) — no JS needed. Shiki produces `<span class="line">` elements
7. Style with CSS variables: `bg-mt` for background, `border-bd` for borders, `text-fg` for text

## CSS Approach

```css
.code-block-wrapper {
  /* Uses existing .astro-code styles from typography.css */
  @apply border border-bd rounded-lg overflow-hidden;
}

.code-block-title {
  @apply flex items-center gap-2 px-3 py-1.5 bg-mt text-fg text-sm font-mono border-b border-bd;
}

.code-block-body {
  @apply overflow-x-auto;
}

/* Line numbers via CSS counters */
.code-block-body.line-numbers code {
  counter-reset: line;
}
.code-block-body.line-numbers .line::before {
  counter-increment: line;
  content: counter(line);
  @apply inline-block w-8 mr-4 text-right text-fg/40 select-none;
}
```

## Integration with Existing Shiki

The blog uses `@shikijs/transformers` in `astro.config.ts` for markdown code blocks. This component calls Shiki separately in its frontmatter for programmatic highlighting. Both use the same themes (GitHub Light/Dark).

- `shiki` package needed as a dependency (the transformer plugin doesn't expose `createHighlighter`)
- Use a shared highlighter instance: create a `src/utils/shiki.ts` helper that caches the highlighter singleton
- Standard markdown code blocks (triple backtick) continue to use the Astro pipeline unchanged
- This component is for MDX usage where title bar + collapse are needed

## Dependencies

New dependency: `shiki` in `dependencies` (see PLAN.md Shared Dependencies section).

## Additional Task: Fix `typography.css` diff colors

While establishing the Shiki foundation, fix the hardcoded Tailwind palette colors in `typography.css` that violate ADR-0008:

| Current | Replacement |
|---------|-------------|
| `bg-green-400/20` | `bg-(--success)/20` |
| `text-green-500` | `text-(--success)` |
| `bg-red-500/20` | `bg-(--error)/20` |
| `text-red-500` | `text-(--error)` |
| `bg-slate-400/20` | `bg-mt/20` |

This makes diff annotations theme-reactive, using the `--success`/`--error` CSS variables from `global.css`.

## Acceptance Criteria

- [ ] Renders syntax-highlighted code in both light and dark themes
- [ ] Title bar shows when `title` prop provided
- [ ] Collapsible by default; toggle works without JS (progressive enhancement)
- [ ] Line numbers display correctly when `lineNumbers` enabled
- [ ] Uses CSS variables — no hardcoded colors
- [ ] Visually consistent with existing `.astro-code` styling
