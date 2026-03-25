# CLISnippet Interactive — Implementation Plan

## Overview

A presentation-grade code display system built as **two separate React components** sharing a common core. Combines Shiki-powered syntax highlighting with Carbon-style aesthetics.

- **CLISnippetCollapsible** — semantic collapsing (`()`, `{}`, `[]`, `""`, `''`), no animation
- **CLISnippetAnimated** — progressive reveal (line groups, split-line), timing controls, no collapsing

## Key Architecture Decisions

### 1. Build-Time + Runtime Hybrid Shiki

| Mode | When | Shiki Runs | Bundle Cost |
|------|------|-----------|-------------|
| Production | `astro build` | Build-time in Astro frontmatter | 0 KB (HTML pre-rendered) |
| Development | `astro dev` | Runtime in React component | ~50KB (lazy-loaded) |

Production: Astro frontmatter calls `codeToHtml()` with a custom transformer that injects `data-scope`, `data-line`, `data-col` attributes. React receives pre-rendered HTML, parses the DOM at mount to build token metadata maps.

Development: React receives raw `code` + `lang` props, calls Shiki at runtime for live iteration and theme switching.

The Astro wrapper handles the switch:
```astro
---
const html = await highlightWithMetadata(code, lang);
---
<CLISnippetCollapsible client:only="react"
  html={html}
  code={import.meta.env.DEV ? code : undefined}
  lang={lang}
/>
```

### 2. Two Components, Shared Core

Collapsing and animation are mutually exclusive to avoid interaction complexity:

```
src/components/cli-snippet/
├── CLISnippetCollapsible.astro  ← Astro wrapper: build-time Shiki (includeScope: true)
├── CLISnippetAnimated.astro     ← Astro wrapper: build-time Shiki (includeScope: false)
├── CLISnippetCore.tsx           ← shared React: Carbon chrome, code container, copy
├── CLISnippetCollapsible.tsx    ← React: Core + CollapseGutter + useCollapsing
├── CLISnippetAnimated.tsx       ← React: Core + AnimationControls + useAnimation
├── CollapseGutter.tsx           ← fold/unfold icon column
├── AnimationControls.tsx        ← playback UI
├── hooks/
│   ├── useTokenMap.ts           ← shared: parse pre-rendered HTML → token metadata
│   ├── useCollapsing.ts         ← bracket/quote pair detection, fold state
│   └── useAnimation.ts         ← step sequencing, rAF timing, playback state
├── types.ts
├── themes.ts                    ← dev-mode theme profiles
└── index.ts                     ← barrel exports (React components)
src/utils/shiki-transformer.ts   ← build-time custom Shiki transformer
src/utils/shiki.ts               ← shared highlighter singleton (defined in astro-components Phase 2)
```

**Known limitation**: Cannot combine animation + collapsing on the same block. Acceptable — animation is for walkthroughs, collapsing is for reference code. If needed in the future, a combined component can be built on top of both hooks.

### 3. Animation Model: Progressive Reveal with Token Granularity

Slidev-style progressive disclosure (lines appear in sequence) combined with Magic Move-level granularity (split-line reveals within a single line). NOT state-diffing — all steps operate on a single code block.

```
Step 1: const x =                          ← line-group reveal
Step 2: const x = calculateValue()         ← split-line reveal (chars appear on same line)
Step 3: console.log(x)                     ← line-group reveal
```

### 4. GIF Export is V2

Not implemented in V1. Research plan drafted for future reference.

## Design References

| Reference | What to Learn |
|-----------|---------------|
| [carbon.now.sh](https://carbon.now.sh/) | Visual aesthetics, theme system |
| [Shiki Magic Move](https://github.com/shikijs/shiki-magic-move) | Token-level animation, React bindings |
| [Slidev](https://sli.dev/features/) | Code animation, click-through reveals |
| [reveal.js](https://revealjs.com/) | Fragment animations, step-through |
| [CodeAnimator](https://github.com/HeyItsJhello/CodeAnimator) | Frame-based code animation |
| [code-slide/ui](https://github.com/code-slide/ui/) | Slide-based code presentation |
| [Marp](https://marp.app/) | Markdown-driven presentation paradigm |

## Research Plans

Research 1, 2, 3, and 5 must complete before implementation. Research 4 is V2.

| # | Title | Status | Blocks |
|---|-------|--------|--------|
| 1 | [Shiki + Tree-Sitter Integration](./research/plans/1-shiki-tree-sitter.md) | **done** ([findings](./research/findings/1-shiki-tree-sitter.md)) | Phase 1 |
| 2 | [Animation Systems](./research/plans/2-animation-systems.md) | **done** ([findings](./research/findings/2-animation-systems.md)) | Phase 3 |
| 3 | [Semantic Token Groups](./research/plans/3-semantic-token-groups.md) | **done** ([findings](./research/findings/3-semantic-token-groups.md)) | Phase 2 |
| 5 | [Build-Time Shiki Transformer](./research/plans/5-build-time-shiki-transformer.md) | **done** ([findings](./research/findings/5-build-time-shiki-transformer.md)) | Phase 1 |
| 4 | [GIF Export Pipeline](./research/plans/4-gif-export-pipeline.md) | todo | **V2** |

## Implementation Phases (V1)

| Phase | Title | Depends On | Complexity |
|-------|-------|------------|------------|
| 1 | Core Engine (CLISnippetCore) | Research 1, 5 | High |
| 2 | CLISnippetCollapsible | Research 3, Phase 1 | Medium |
| 3 | CLISnippetAnimated | Research 2, Phase 1 | High |
| 4 | Responsive + Polish | Phases 1-3 | Medium |

### Phase Plans

1. [Phase 1: Core Engine](./phases/1-core-engine.md)
2. [Phase 2: CLISnippetCollapsible](./phases/2-collapsible.md)
3. [Phase 3: CLISnippetAnimated](./phases/3-animated.md)
4. [Phase 4: Responsive + Polish](./phases/4-responsive-polish.md)

### V2 Phases (not implemented yet)

- GIF Export Pipeline (depends on Research 4, Phase 3)
- Runtime theme profile switching in production

## Technical Constraints

- All components use CSS variables (Brand CDN theming) — no hardcoded colors
- `client:only="react"` — NO SSR (Shiki WASM, canvas APIs, MutationObserver all require browser)
- Shiki: build-time via custom transformer (production), runtime via `createHighlighter` (dev only)
- Bundle size budget (V1, production):

  | Chunk | Target (gzipped) |
  |-------|-------------------|
  | CLISnippetCore (chrome, DOM parsing, copy) | <15KB |
  | CLISnippetCollapsible (core + collapsing) | <20KB |
  | CLISnippetAnimated (core + animation + controls) | <25KB |
  | Dev-only: Shiki runtime (lazy) | ~50KB |

- No Shiki in production bundle — highlighting is pre-rendered HTML

## Author-Facing API (MDX)

Authors import Astro wrappers (NOT the React components directly). The Astro wrappers handle build-time Shiki highlighting and pass pre-rendered HTML to the React islands.

**Two Astro wrappers** (one per component type):
- `src/components/cli-snippet/CLISnippetCollapsible.astro` — calls `transformerTokenMetadata({ includeScope: true })`
- `src/components/cli-snippet/CLISnippetAnimated.astro` — calls `transformerTokenMetadata({ includeScope: false })`

**MDX usage:**

```mdx
---
# MDX frontmatter (YAML only — no async calls here)
---
import CLISnippetCollapsible from '@/components/cli-snippet/CLISnippetCollapsible.astro';
import CLISnippetAnimated from '@/components/cli-snippet/CLISnippetAnimated.astro';

{/* Reference code with foldable regions */}
<CLISnippetCollapsible
  code={`{
  "hooks": {
    "PreToolUse": [{ "matcher": "Bash" }]
  }
}`}
  lang="json"
  title="Configuration"
  defaultCollapsed={["{}","[]"]}
/>

{/* Walkthrough with progressive reveal */}
<CLISnippetAnimated
  code={`const greeting = "hello";
console.log(greeting);`}
  lang="typescript"
  title="Building the pipeline"
  steps={[
    { type: "lines", range: [1, 1] },
    { type: "split", line: 2, chars: [0, 12] },
    { type: "split", line: 2, chars: [12, 30] },
  ]}
/>
```

The Astro wrapper frontmatter handles the async `codeToHtml()` call and passes `html` to the React island via `client:only="react"`. In dev mode, it also passes `code` + `lang` for runtime Shiki fallback.

**Programmatic usage** (React-to-React, no Astro wrapper needed):
```tsx
import { CLISnippetCollapsible } from '@/components/cli-snippet';
<CLISnippetCollapsible html={preRenderedHtml} title="Config" />
```

## Testing Strategy

| Phase | What to Test |
|-------|-------------|
| Phase 1 | `useTokenMap`: token map construction from pre-rendered HTML; markdown copy output; error fallback |
| Phase 2 | `useCollapsing`: bracket pair detection (empty blocks, nested 3+, unclosed, strings containing brackets); quote detection via TextMate scopes |
| Phase 3 | `useAnimation`: step sequencing, rAF timing, split-line boundary calculation |
| Phase 4 | Responsive breakpoints; `prefers-reduced-motion`; cross-browser |

Dev test page: `src/pages/dev/cli-snippet-test.astro`

## Relationship to CLISnippet Simple

| Aspect | CLISnippet Simple | CLISnippetCollapsible | CLISnippetAnimated |
|--------|------------------|----------------------|-------------------|
| File | `CLISnippet.astro` | `cli-snippet/CLISnippetCollapsible.tsx` | `cli-snippet/CLISnippetAnimated.tsx` |
| Runtime | Zero JS | React (`client:only`) | React (`client:only`) |
| Highlighting | Prompt/output styling | Full Shiki (build-time) | Full Shiki (build-time) |
| Animation | None | None | Line groups, split reveals |
| Collapsing | `<details>/<summary>` | Semantic token groups | None |
| Export | None | Markdown copy | Markdown copy |
| Use case | CLI output display | Reference code with foldable regions | Code walkthroughs |
