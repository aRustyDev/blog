---
globs:
  - "src/components/**/*.astro"
  - "src/components/**/*.tsx"
  - "src/components/**/*.ts"
---

# Component Development Rules

## CSS Variables — Zero Hardcoded Colors

All components MUST use CSS variables for Chrome-tier colors (ADR-0008). Never hardcode hex/rgb values.

| Token | Tailwind | Usage |
|-------|----------|-------|
| `var(--foreground)` | `text-fg` | Body text |
| `var(--background)` | `bg-bg` | Page background |
| `var(--accent)` | `text-ac` | Links, highlights, active states |
| `var(--muted)` | `bg-mt` | Subtle backgrounds, surfaces |
| `var(--border)` | `border-bd` | Borders, dividers |
| `var(--error)` | `text-(--error)` | Error states |
| `var(--success)` | `text-(--success)` | Success feedback (e.g., "Copied!") |

Opacity modifiers are allowed: `bg-mt/50`, `text-fg/40`.

## Collapsible Components

- Use `<details>/<summary>` with class `.component-details` (resets prose overrides from `typography.css`)
- Always provide `aria-label` on `<summary>` when no visible title text
- Style `<summary>` with `list-style: none`; render chevron via `::before` or inline element

## Astro Components

- PascalCase filenames: `CodeBlock.astro`, `DirTree.astro`
- Props via `type Props = { ... }` interface
- Conditional classes via `class:list`
- Raw text content via string props (NOT `<slot />`), because Astro slots render HTML

## React Components (Interactive)

- `client:only="react"` — never `client:load` (SSR fails for Shiki WASM, canvas APIs, MutationObserver)
- `ref` as plain React 19 prop (no `forwardRef` needed)
- Inline styles with CSS variables for dynamic values: `style={{ color: 'var(--foreground)' }}`
- View transitions: use event delegation on `document` (avoids `astro:after-swap` re-binding)

## People DB

- Location: `src/data/people.json`
- Helpers: `src/utils/people.ts` (`getPerson`, `getPersonLink`, `getTwitterHandle`)
- Link precedence: Twitter > personal URL > LinkedIn > affiliation URL
