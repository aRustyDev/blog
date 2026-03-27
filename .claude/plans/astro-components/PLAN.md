# Astro Components Implementation Plan

## Overview

Build 9 reusable Astro components + People DB + component rules for the blog. These components are needed by the CE blog series but designed for general reuse across all posts.

## Architecture Decisions

- **Pure Astro** for components with no client-side interactivity (CodeBlock, DirTree, CLISnippet Simple)
- **Astro + `<script>`** for components needing lightweight JS (PersonPopup hover/click, Timeline collapse, OGCard)
- **Astro wrappers** for third-party embeds (Asciinema, Tweet)
- **All components** use CSS variables (`var(--foreground)`, `var(--accent)`, etc.) — zero hardcoded colors
- **Collapsible pattern**: `<details>/<summary>` HTML elements (progressive enhancement, no JS required). **IMPORTANT**: `typography.css` applies `inline-block`, `select-none`, `[&_p]:hidden` to `.app-prose details`. All component `<details>` must use a scoped class (e.g., `.component-details`) that resets these styles: `display: block; user-select: auto;` and removes the `[&_p]:hidden` override
- **Content via string props, NOT slots**: Astro slots render children as HTML (MDX transforms markdown into `<p>`, `<ul>`, etc.). Components that parse raw text (CodeBlock, CLISnippet, DirTree, Timeline) MUST accept content via a string prop (e.g., `code`, `content`), NOT `<slot />`. This is the correct Astro pattern for raw text content
- **Shiki** already integrated for code highlighting — CodeBlock invokes `shiki.codeToHtml()` in component frontmatter at build time
- **People DB** is JSON (not JSONLD) at `src/data/people.json` — schema.org/Person compatible fields but simpler to consume. `@context`/`@type` fields on a top-level wrapper only, not repeated per entry

## Phase Sequence

| Phase | Component | Type | Complexity | Depends On |
|-------|-----------|------|------------|------------|
| 1 | Foundation (People DB + Rules) | Data + Config | Low | — |
| 2 | CodeBlock | Pure Astro | Low | — |
| 3 | CLISnippet Simple | Pure Astro | Low | Phase 2 (shared collapsible pattern) |
| 4 | DirTree | Pure Astro | Low-Med | Phase 2 (shared collapsible pattern) |
| 5 | OGCard | Astro + build-time fetch | Medium | — |
| 6 | Tweet | Astro | Medium | Phase 1 (People DB) |
| 7 | PersonPopup | Astro + script | Medium | Phase 1 (People DB) |
| 8 | Timeline | Astro + script | Medium | Phase 2 (collapsible pattern) |
| 9 | Asciinema | Astro + script | Medium | — |

## Shared Patterns

### Collapsible Wrapper

Most components use a collapsible wrapper. Standardize on `<details>/<summary>` with a class that resets prose conflicts:

```astro
{collapsible ? (
  <details class="component-details" open>
    <summary class="...">{summaryLabel}</summary>
    <div class="component-body">
      <!-- content rendered here -->
    </div>
  </details>
) : (
  <div class="component-body">
    <!-- content rendered here -->
  </div>
)}
```

**Accessibility**: `<summary>` MUST always have a meaningful accessible name. When no visible label text is provided, use `aria-label`:
- CodeBlock: `<summary aria-label={title ?? "Code block"}>`
- CLISnippet: `<summary aria-label={title ?? "Terminal output"}>`
- DirTree: `<summary aria-label={label ?? "Directory tree"}>`
- Timeline: `<summary aria-label="Timeline: {firstDate} — {lastDate}">`

**`<summary>` styling**: Apply `list-style: none` to hide the browser's default disclosure triangle. Render `▾`/`▸` as a CSS `::before` pseudo-element or inline element inside `<summary>`, making the entire title bar clickable.

**Critical**: The `.component-details` class MUST reset the prose `<details>` styles from `typography.css`:

```css
.component-details {
  @apply block cursor-default select-auto;
  /* Reset prose overrides: [&_p]:hidden and [&_ul]:my-0! */
}
.component-details p,
.component-details ul {
  @apply block my-0;  /* un-hide <p> tags, reset <ul> margins */
}
```

### Content Passing Strategy

Components that need raw text content use **string props** (not slots):

| Component | Prop | Example |
|-----------|------|---------|
| CodeBlock | `code: string` | `<CodeBlock code={\`const x = 1;\`} lang="ts" />` |
| CLISnippet | `content: string` | `<CLISnippet content={\`$ echo hello\nhello\`} />` |
| DirTree | `content: string` | `<DirTree content={\`src/\n  index.ts\`} />` |
| Timeline | `items: TimelineItem[]` | `<Timeline items={[{date: "2025-06-22", label: "..."}]} />` |

Components that display rendered HTML (Tweet, PersonPopup, OGCard) use props for data and `<slot />` only for inline text children (PersonPopup).

### CSS Variable Usage

All components MUST use these tokens:

| Token | Usage |
|-------|-------|
| `var(--foreground)` / `text-fg` | Text color |
| `var(--background)` / `bg-bg` | Background |
| `var(--accent)` / `text-ac` | Highlights, links, active states |
| `var(--muted)` / `bg-mt` | Subtle backgrounds, surfaces |
| `var(--border)` / `border-bd` | Borders, dividers |

### Opacity Variants

Phase plans use varying opacity modifiers intentionally — different components have different visual needs:
- `text-fg/40` — line numbers, connectors (very muted)
- `text-fg/60` — CLI output text (readable but subdued)
- `bg-mt/30` to `bg-mt/75` — surface backgrounds (range from barely-there to solid)

These are not inconsistencies; they reflect the component's role.

### File Naming

All components at `src/components/<Name>.astro` (PascalCase, matching existing convention). With 9 new components joining ~8 existing ones, consider grouping blog-content components under `src/components/content/` if the flat directory becomes unwieldy — but start flat and reorganize later if needed.

## Phase Plans

1. [Phase 1: Foundation](./phases/1-foundation.md)
2. [Phase 2: CodeBlock](./phases/2-code-block.md)
3. [Phase 3: CLISnippet Simple](./phases/3-cli-snippet-simple.md)
4. [Phase 4: DirTree](./phases/4-dir-tree.md)
5. [Phase 5: OGCard](./phases/5-og-card.md)
6. [Phase 6: Tweet](./phases/6-tweet.md)
7. [Phase 7: PersonPopup](./phases/7-person-popup.md)
8. [Phase 8: Timeline](./phases/8-timeline.md)
9. [Phase 9: Asciinema](./phases/9-asciinema.md)

## Divergences from Component Contracts

The component contracts file (`content/_projects/what-is-context-engineering/post/ch1/component-contracts.md`) was written before implementation planning. These plans diverge in:

| Contract | Plan | Reason |
|----------|------|--------|
| `people.jsonld` | `people.json` | Simpler to consume; `@context` on wrapper only |
| Tweet `fallbackText` (optional) | Tweet `text` (required) | Static card — text IS the content, not a fallback |
| Slot-based content for CodeBlock, CLISnippet, DirTree, Timeline | String/array props | Astro slots render HTML, not raw text — string props preserve raw content |
| Asciinema: no `title` prop | Asciinema: `title` prop added | Consistency with other collapsible components |

Update the contracts file to match these plans before content authors reference it.

## Shared Dependencies

### `shiki` package (new — add to `dependencies`)

Both the astro-components plan (CodeBlock) and the cli-snippet-interactive plan share Shiki. Install once:

```bash
npm install shiki
```

Must be `dependencies` (not `devDependencies`) because the CLISnippet Interactive lazy-loads it at runtime in dev mode.

### `src/utils/shiki.ts` — shared highlighter singleton

A single module-level cached singleton used by all components:

```typescript
import { createHighlighter, type Highlighter } from 'shiki';

let highlighterPromise: Promise<Highlighter> | null = null;

export function getHighlighter(): Promise<Highlighter> {
  return highlighterPromise ??= createHighlighter({
    themes: ['github-light', 'github-dark'],
    langs: ['typescript', 'javascript', 'json', 'yaml', 'bash', 'markdown', 'css', 'html'],
  });
}
```

The `??=` pattern ensures `createHighlighter()` is called exactly once per build process. Both CodeBlock's Astro frontmatter and CLISnippet's Astro wrappers import from `@/utils/shiki`.

**Created in Phase 2 (CodeBlock)**, referenced by cli-snippet-interactive Phase 1.

### Existing dependencies (no install needed)

- `dayjs` — used by Tweet (date formatting) and Timeline (date display)

## Out of Scope

- CLISnippet Interactive (separate plan: `../cli-snippet-interactive/PLAN.md`)
- Component stories/documentation pages
- Unit tests (add later when test framework is chosen)
