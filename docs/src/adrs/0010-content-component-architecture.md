# ADR-0010: Content Component Architecture

## Status

Accepted

## Date

2026-03-25

## Related Decisions

- ADR-0007: Graph Component Architecture (established component decomposition patterns)
- ADR-0008: Brand Theming Strategy (CSS variable system these components comply with)

## Context

The blog needs reusable components for content display: code blocks with titles and collapsing, terminal output, directory trees, tweet cards, person popups, timelines, terminal recordings, and an interactive code presentation tool. These components span two categories:

1. **Simple content components** (9 total) — pure Astro, zero or minimal JS, used in MDX posts
2. **Interactive CLISnippet** — React-based, animated code presentation with semantic collapsing

Key constraints discovered during planning:
- Astro slots render children as HTML (MDX transforms markdown), breaking components that parse raw text
- The prose `<details>` styles in `typography.css` (`inline-block`, `select-none`, `[&_p]:hidden`) conflict with component collapsible wrappers
- Shiki's `defaultColor: false` dual-theme pattern must be preserved for theme reactivity
- `client:load` causes SSR failures on static Cloudflare Workers deployment for components using Shiki WASM, canvas APIs, or MutationObserver

## Decision

### Content via String Props, Not Slots

Components that parse raw text (CodeBlock, CLISnippet, DirTree) accept content via string props:

```astro
<CodeBlock code={`const x = 1;`} lang="ts" />
<CLISnippet content={`$ echo hello\nhello`} />
<DirTree content={`src/\n  index.ts`} />
```

Timeline accepts a typed array prop:

```astro
<Timeline items={[{ date: "2025-06-22", label: "Event" }]} />
```

**Rationale**: Astro's `<slot />` renders children as HTML. MDX transforms markdown syntax into `<p>`, `<ul>`, etc. before the component receives it. `content.split('\n')` fails on HTML. String props preserve raw text.

### Collapsible Pattern: `<details>` with Reset Class

All collapsible components use native `<details>/<summary>` for progressive enhancement (works without JS). A `.component-details` class resets the conflicting prose styles:

```css
.component-details {
  @apply block cursor-default select-auto;
}
.component-details p, .component-details ul {
  @apply block;
}
```

Every `<summary>` must have an `aria-label` (either from a title prop or a sensible default like "Code block").

### Shiki Integration: Shared Singleton

A single `src/utils/shiki.ts` with module-level promise cache serves all components:

```typescript
let highlighterPromise: Promise<Highlighter> | null = null;
export function getHighlighter() {
  return highlighterPromise ??= createHighlighter({ ... });
}
```

This ensures `createHighlighter()` runs once per build, not per component instance. The highlighter uses the same dual-theme config as `astro.config.ts`:

```typescript
themes: { light: 'github-light', dark: 'github-dark' },
defaultColor: false,
```

### Interactive CLISnippet: Two Components, Shared Core

The interactive code display is split into two components to avoid interaction complexity between animation and collapsing:

```
CLISnippetCollapsible — semantic folding ({}, [], (), "", '')
CLISnippetAnimated    — progressive reveal (line groups, split-line)
```

Both share `CLISnippetCore` (Carbon-style chrome, code rendering, markdown copy) and `useTokenMap` (DOM parsing).

**Known limitation**: Cannot combine animation + collapsing on the same block. Acceptable — animation is for walkthroughs, collapsing is for reference code.

### Build-Time Shiki with Runtime DOM Parsing (Hybrid)

| Mode | When | Shiki Runs | Client Bundle |
|------|------|-----------|---------------|
| Production | `astro build` | Astro frontmatter | 0 KB |
| Development | `astro dev` | React runtime (lazy) | ~50 KB |

A custom Shiki transformer injects `data-line`, `data-col`, and optionally `data-scope` onto token spans at build time. React's `useTokenMap` hook parses the pre-rendered HTML DOM at mount to reconstruct token metadata for animation and collapsing.

The `span` hook in Shiki's transformer API receives the raw `ThemedToken` as its 5th argument, providing direct access to TextMate scope data without needing a closure pattern.

### CSS-Only Animation (Zero Libraries)

All animations use CSS transitions on compositor-friendly properties:
- `opacity` — line reveal/dimming
- `transform: translateY()` — slide-up entrance
- `clip-path: inset()` — split-line progressive reveal

No JavaScript animation library (GSAP, Framer Motion, shiki-magic-move). The `useAnimation` hook toggles CSS property values; the browser's transition engine interpolates.

### Event Delegation for View Transitions

Components with click handlers (PersonPopup) use event delegation on `document` instead of per-element binding:

```typescript
document.addEventListener('click', (e) => {
  const trigger = (e.target as HTMLElement).closest('.person-trigger');
  if (trigger) { /* handle */ }
});
```

This eliminates the need for `astro:after-swap` re-binding — new elements from page transitions are handled automatically.

### People DB

`src/data/people.json` uses a schema.org/Person-compatible structure with `@context`/`@type` on the top-level wrapper (not per entry). Link precedence: Twitter > personal URL > LinkedIn > affiliation URL. Social platform exclusion list prevents GitHub, Medium, etc. from matching as "personal URL."

## Consequences

- All content components are theme-reactive via CSS variables (ADR-0008 compliant)
- Zero Shiki in production client bundle — syntax highlighting is pre-rendered HTML
- `details/summary` provides accessible collapsing with progressive enhancement
- String props avoid the Astro slot HTML rendering pitfall
- Event delegation avoids listener accumulation across view transitions
- Two-component CLISnippet split simplifies both implementations at the cost of mutual exclusivity
- People DB is reusable across Tweet, PersonPopup, and future components

### Risks

- `clip-path: inset()` requires Safari 13.1+ — graceful degradation via `@supports` guard
- Build-time Shiki adds to SSG build time (~200ms per highlighted block, cached via singleton)
- `dangerouslySetInnerHTML` in CLISnippetCore — safe because input is always `codeToHtml()` output, never external/user content
- OGCard build-time fetches can slow builds if target URLs are slow — mitigated by 5s `AbortController` timeout and module-level cache
