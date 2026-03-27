# Phase 1: Core Engine (CLISnippetCore)

## Goal

Build the shared foundation: Carbon-style chrome, build-time/runtime hybrid Shiki integration, `useTokenMap` hook for DOM parsing, and markdown copy. Both CLISnippetCollapsible and CLISnippetAnimated import this.

## Prerequisites

- Research 1 (Shiki themes, TextMate grammars) complete
- Research 5 (Build-time transformer prototype) complete — **GREEN LIGHT confirmed**

## Files to Create

```
src/components/cli-snippet/
├── CLISnippetCore.tsx       ← shared component: chrome, code container, copy button
├── hooks/useTokenMap.ts     ← parse pre-rendered HTML → token metadata
├── types.ts                 ← shared interfaces
├── themes.ts                ← dev-mode theme profiles (unused in production)
├── index.ts                 ← barrel export
src/utils/shiki-transformer.ts  ← build-time: custom Shiki transformer adding data-* attributes
```

## Props Interface

```typescript
interface CLISnippetCoreProps {
  // Content (one of these required)
  html?: string;              // Pre-rendered Shiki HTML (production path)
  code?: string;              // Raw code (dev-mode path — triggers runtime Shiki)
  lang?: string;              // Language identifier (required if code provided)

  // Chrome
  title?: string;             // Window title bar text
  chrome?: boolean;           // Show Carbon-style window chrome (default: true)
  showLineNumbers?: boolean;  // Default: true
  showCopy?: boolean;         // Show markdown copy button (default: true)

  // Passthrough
  className?: string;
  children?: React.ReactNode; // Slot for subcomponents (fold gutter, animation controls)
}
```

## Build-Time Shiki Transformer

```typescript
// src/utils/shiki-transformer.ts
import type { ShikiTransformer } from 'shiki';

export function transformerTokenMetadata(options?: {
  includeScope?: boolean;  // true for Collapsible, false for Animated
}): ShikiTransformer {
  return {
    name: 'token-metadata',
    // span hook receives 5 args: (hast, line, col, lineElement, token)
    // - line: 1-based line number
    // - col: 0-based CHARACTER OFFSET within line (not token index!)
    // - token: raw ThemedToken with explanation/scope data (if includeExplanation set)
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

**Validated by Research 5**: The `span` hook's 5th argument (`token: ThemedToken`) provides direct access to scope data. No closure or `tokens` hook needed. The `col` parameter is the cumulative character offset — directly usable for split-line animation mapping.

**Scope is opt-in**: `includeScope: true` for Collapsible (needs `string.quoted.*` scopes), `false` for Animated (doesn't need scope data, saves ~3-8KB gzipped per block). The Astro wrapper controls this.

## Shiki Theming — ADR-0008 Compliance

**MUST match existing blog pattern.** The blog uses `defaultColor: false` with dual themes in `astro.config.ts`:

```typescript
themes: { light: "github-light", dark: "github-dark" },
defaultColor: false,
```

This produces CSS variables on each token (not hardcoded hex):
```html
<span style="--shiki-light:#C678DD;--shiki-dark:#C678DD">const</span>
```

The existing CSS in `typography.css` selects the active theme:
```css
.astro-code { [&_span]:text-(--shiki-light); }
html[data-theme="dark"] .astro-code { [&_span]:text-(--shiki-dark); }
```

**The build-time Shiki call in the Astro wrappers MUST use the same config**: `{ themes: { light: 'github-light', dark: 'github-dark' }, defaultColor: false }`. The CLISnippet component CSS needs matching selectors (using a `.cli-snippet-code` class instead of `.astro-code`):
```css
.cli-snippet-code [data-line] span { color: var(--shiki-light); }
html[data-theme="dark"] .cli-snippet-code [data-line] span { color: var(--shiki-dark); }
```

This ensures:
- Token colors respond to theme toggle (ADR-0008 compliant)
- No hardcoded hex colors in production HTML
- CLISnippet blocks match the visual style of standard code blocks

## useTokenMap Hook

```typescript
interface TokenMeta {
  line: number;
  charStart: number;    // Character offset from line start (directly from data-col)
  charEnd: number;      // charStart + element.textContent.length
  scope: string | null; // TextMate scope (null if data-scope not present)
  text: string;         // element.textContent (decoded, safe for char counting)
  element: HTMLSpanElement;  // Direct DOM ref
}

interface TokenMap {
  lines: TokenMeta[][];       // tokens grouped by line
  lineElements: HTMLElement[]; // line-level <span class="line"> elements
  allTokens: TokenMeta[];     // flat list
}

function useTokenMap(
  containerRef: RefObject<HTMLElement>,
  htmlKey: string | null       // displayHtml or a hash — re-parse when this changes
): TokenMap | null {
  const [tokenMap, setTokenMap] = useState<TokenMap | null>(null);

  useEffect(() => {
    if (!containerRef.current || !htmlKey) {
      setTokenMap(null);
      return;
    }
    // Parse DOM: querySelectorAll('[data-line]')
    // For each line, accumulate charStart/charEnd from textContent.length
    // Filter zero-width tokens (textContent === "") — mark but don't skip
    // Build TokenMap
    setTokenMap(parsed);
  }, [htmlKey]);  // Re-parse whenever HTML content changes (dev theme switch, etc.)

  return tokenMap;
}
```

**Critical timing note**: The hook depends on `htmlKey` (not just mount) to handle the dev-mode path where `runtimeHtml` starts as `null` and is set asynchronously after Shiki loads. Without this dependency, the hook fires once on mount before the HTML exists and never re-runs.

This hook is consumed by both `useCollapsing` (Phase 2) and `useAnimation` (Phase 3).

## Hybrid Rendering Logic

```typescript
// Inside CLISnippetCore
const containerRef = useRef<HTMLDivElement>(null);
const [runtimeHtml, setRuntimeHtml] = useState<string | null>(null);

useEffect(() => {
  if (code && !html) {
    // Dev mode: runtime highlighting
    import('./highlighter').then(async ({ getHighlighter }) => {
      const h = await getHighlighter();
      setRuntimeHtml(h.codeToHtml(code, { lang, themes: { ... } }));
    });
  }
}, [code, lang, html]);

const displayHtml = html ?? runtimeHtml;

// useTokenMap re-parses whenever displayHtml changes (handles dev-mode async load)
const tokenMap = useTokenMap(containerRef, displayHtml);

// Render: <div ref={containerRef} dangerouslySetInnerHTML={{ __html: displayHtml ?? '' }} />
```

**Note**: `tokenMap` is passed to child components (Collapsible/Animated) as a prop or via context. The Core component owns the ref and the token map; feature components consume it.

## Markdown Copy

~15 lines, ships with Core:
1. "Copy" button in title bar (clipboard icon)
2. On click: extract `code` prop (or strip HTML from `html` prop via `textContent`), wrap as fenced markdown
3. Copy with fallback:
   ```typescript
   try {
     await navigator.clipboard.writeText(markdown);
   } catch {
     // Fallback for non-secure contexts (e.g., LAN dev access via HTTP)
     const textarea = document.createElement('textarea');
     textarea.value = markdown;
     document.body.appendChild(textarea);
     textarea.select();
     document.execCommand('copy');
     document.body.removeChild(textarea);
   }
   ```
4. Flash "Copied!" state for 2s — use `text-(--success)` color for the feedback text (ADR-0008 feedback tier)

**Security note**: The `html` prop MUST only receive output from `codeToHtml()`. Never pass HTML from external fetches or user input into `dangerouslySetInnerHTML`.

## Loading and Error States

- **Loading**: Pulsing `bg-mt` skeleton matching expected dimensions (line count × line height)
- **Error**: Fall back to `<pre><code>{code}</code></pre>` unstyled + `console.warn`
- Both implemented in Phase 1, not deferred

## Carbon Chrome

```
┌─────────────────────────────────────────┐
│ ● ● ●   settings.json          📋      │  ← title bar (dots, title, copy button)
├─────────────────────────────────────────┤
│  1 │ {                                  │
│  2 │   "hooks": { ... }                │  ← code body
│  3 │ }                                  │
└─────────────────────────────────────────┘
```

Optional via `chrome={false}` for minimal embedding.

## Acceptance Criteria

- [ ] Pre-rendered HTML path: injects HTML, `useTokenMap` builds metadata
- [ ] Dev-mode runtime path: Shiki lazy-loaded, highlights code, same token map output
- [ ] Carbon chrome: title bar with dots + title + copy button
- [ ] `chrome={false}` hides window decoration
- [ ] Markdown copy: copies fenced code block to clipboard, "Copied!" feedback
- [ ] Line numbers via CSS counters
- [ ] Loading skeleton shown when `displayHtml` is null
- [ ] Error fallback to plain `<pre>` if both paths fail
- [ ] `useTokenMap` returns correct `TokenMap` after mount
- [ ] `client:only="react"` — NO SSR
- [ ] Production bundle: <15KB gzipped (no Shiki)
