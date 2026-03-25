# ADR-0008: Brand Theming Strategy

## Status

Accepted

## Date

2026-03-19

## Related Decisions

- ADR-0004: Interactive Graph Visualization (established `client:only="react"` for WebGL)
- ADR-0007: Graph Component Architecture (file structure for `graph.shared.ts` and `graph.constants.ts`)

## Context

The blog integrates with `brand.arusty.dev` for theming via CSS custom properties. The Astro layer (layouts, components, pages) is fully theme-reactive — everything uses Tailwind utilities that resolve through CSS variables. However, the React graph components have ~40 hardcoded hex colors from the GitHub Dark palette that don't respond to theme changes.

Additionally, `forest-night.css` is loaded twice (via `<link>` in Layout.astro and `@import` in global.css), and `ThemeObserver` only updates label colors and background on theme toggle, leaving edge colors, node colors, and dim/overlay colors static.

## Decision

### Three-Tier Color Classification

All colors in the codebase fall into one of three tiers:

| Tier | Description | Source | Theme-reactive? | Where valid? |
|------|-------------|--------|-----------------|-------------|
| **Chrome** | UI surfaces, borders, text, overlays, dim states | CSS variables (`var(--foreground)`, etc.) | Yes — must respond to theme changes | DOM elements only |
| **Semantic** | Category node colors, edge type colors | `graph.shared.ts` constants | Partially — static per theme, but overridable | Both DOM and WebGL |
| **Feedback** | Error, warning, success states | CSS variables (`var(--error)`, etc.) | Yes — must respond to theme changes | DOM elements only |

### Critical Distinction: DOM vs WebGL Color Layers

CSS expressions (`var()`, `color-mix()`) are only valid for DOM elements (tooltips, overlays, panels, filter UI). All sigma WebGL settings — `nodeReducer` return colors, `edgeReducer` return colors, `defaultEdgeColor`, `defaultNodeColor`, and any color passed to sigma's renderer — **must receive pre-resolved hex or `rgb()` strings**.

This means:
- **DOM layer** (React JSX): use `var(--foreground)`, `color-mix(in srgb, var(--muted) 65%, transparent)`, etc.
- **WebGL layer** (sigma settings, reducers): use `resolveThemeColor("--foreground", "#e6edf3")` which calls `getComputedStyle()` and returns a resolved hex string

### Chrome Colors: Always Use CSS Variables (DOM) or Resolved Values (WebGL)

All UI chrome must use theme tokens. Replace hardcoded hex with:

**For DOM elements:**
```typescript
// WRONG
background: "rgba(22, 27, 34, 0.65)"

// RIGHT
background: "color-mix(in srgb, var(--muted) 65%, transparent)"
```

**For sigma WebGL settings:**
```typescript
// WRONG (inside reducer)
return { ...data, color: "#30363d40" };

// RIGHT (dim color pre-resolved, captured in closure)
return { ...data, color: dimColor };
```

### Sigma Reducer Color Resolution Pattern

Sigma reducers run per-node per-frame (~6000 calls/second at 99 nodes × 60fps). Calling `getComputedStyle()` inside a reducer is prohibitively expensive. Instead:

1. `ThemeObserver` resolves dim colors once per theme change
2. Stores resolved values in a React ref or module-level variable
3. `FilterController` and `GraphSearch` capture the resolved value at `useEffect` time (closure capture), not inside the reducer callback

```typescript
// In ThemeObserver or a shared theme context:
const dimColors = useRef({
  filtered: "#30363d15",   // resolved from --border at 9% opacity
  dimmed: "#30363d40",     // resolved from --border at 25% opacity
  edgeFiltered: "#30363d08",
  edgeDimmed: "#30363d20",
});

// Updated on theme change:
const border = resolveThemeColor("--border", "#30363d");
dimColors.current = {
  filtered: adjustColor(border, 0) + "15",  // hex + alpha suffix
  dimmed: adjustColor(border, 0) + "40",
  edgeFiltered: adjustColor(border, 0) + "08",
  edgeDimmed: adjustColor(border, 0) + "20",
};

// In FilterController's useEffect (captured once, stable during reducer lifetime):
const dim = dimColors.current;
sigma.setSetting("nodeReducer", (node, data) => {
  if (!visible.has(node)) return { ...data, color: dim.filtered, label: "", size: 2 };
  return data;
});
```

### Semantic Colors: Static But Centralized

Category colors (`CATEGORY_COLORS`) and edge colors (`EDGE_COLORS`) are intentional data visualization colors — "Kernels" is always red, "Editors" is always purple. They:

1. Live in `graph.shared.ts` (per ADR-0007), not scattered across files
2. Are pre-resolved hex values (valid for WebGL)
3. Use the GitHub Dark palette, which provides good contrast on dark backgrounds
4. May have poor contrast on light backgrounds — a `CATEGORY_COLORS_LIGHT` variant can be added later if needed, selected by `ThemeObserver` based on the resolved `--background` luminance

### Feedback Colors: Add CSS Variables

Add to `global.css`:

```css
:root {
  --error: var(--color-error, #f85149);
  --warning: var(--color-warning, #d29922);
  --success: var(--color-success, #3fb950);
}
```

The brand CDN already provides `--color-error`, `--color-warning`, `--color-success` in both light and dark variants. Map them to short tokens and use throughout.

### Hardcoded Color Audit

Complete inventory of hardcoded colors requiring replacement:

| File | Line(s) | Current Value | Tier | Replacement |
|------|---------|---------------|------|-------------|
| `GraphView.tsx` | 815 | `"#f85149"` (error text) | Feedback | `"var(--error, #f85149)"` (DOM) |
| `GraphFilters.tsx` | 397 | `"#f85149"` (exclusion tag pill) | Feedback | `"var(--error, #f85149)"` (DOM) |
| `GraphView.tsx` | 356,359,516,520 | `"#30363d40"`, `"#30363d20"` (reducer dim) | Chrome/WebGL | Pre-resolved via `getDimColor()` |
| `GraphView.tsx` | 534,537 | `"#30363d15"`, `"#30363d08"` (filter dim) | Chrome/WebGL | Pre-resolved via `getDimColor()` |
| `GraphView.tsx` | 388-393 | `rgba(22,27,34,0.65)` (search spotlight bg) | Chrome/DOM | `color-mix(in srgb, var(--muted) 65%, transparent)` |
| `GraphView.tsx` | 389 | `rgba(255,255,255,0.08)` (spotlight border) | Chrome/DOM | `color-mix(in srgb, var(--foreground) 8%, transparent)` |
| `GraphView.tsx` | 857-858 | `defaultEdgeColor: "#30363d"`, `defaultNodeColor: "#8b949e"` | Chrome/WebGL | Resolved in `ThemeObserver` from `--border` and `--foreground` |
| `useGraphData.ts` | 109 | `color: "#3fb950"` (initial node) | Dead code | Remove (overwritten by `getNodeColor()`) |
| `LocalGraphWidget.tsx` | 41 | `rgba(0,0,0,0.6)` (modal backdrop) | Chrome/DOM | `rgba(0,0,0,0.6)` is acceptable (pure black overlay) |

### ThemeObserver Scope

`ThemeObserver` must update all theme-reactive sigma settings on `data-theme` change:

| Setting | Current State | Required State |
|---------|--------------|----------------|
| `labelColor` | Updated | Keep |
| Container background | Updated via `getSigmaBackground()` | Keep |
| `defaultEdgeColor` | Static `"#30363d"` | Update from `resolveThemeColor("--border", "#30363d")` |
| `defaultNodeColor` | Static `"#8b949e"` | Update from `resolveThemeColor("--foreground", "#8b949e")` with reduced opacity |
| Dim color refs | Not tracked | Resolve and cache in ref for `FilterController`/`GraphSearch` |

### CDN Loading: Single Source

Remove `@import url("https://brand.arusty.dev/assets/colors/themes/forest-night.css")` from `global.css`. The `<link>` tag in `Layout.astro` is the single source of truth. The `@import` is redundant and adds a waterfall request.

`global.css` should only contain the token mapping (`--background: var(--color-background)`) and Tailwind configuration, not the CDN import.

**CDN race condition:** If the CDN is slow or unavailable, the `<link>` tag blocks rendering in most configurations. The existing `requestAnimationFrame` delay in `ThemeObserver` is sufficient for normal conditions. If the CDN fails entirely, the system-preference fallbacks in `global.css` provide usable defaults. This is an accepted limitation — adding a `load` event listener on the stylesheet would add complexity for a rare edge case.

### Light Mode System Fallback

Add a light-mode fallback to `global.css` for when `BrandTheme` fails to load:

```css
@media (prefers-color-scheme: light) {
  :root:not([data-theme]) {
    --background: #ffffff;
    --foreground: #1f2328;
    --accent: #2ea043;
    --muted: #f6f8fa;
    --border: #d0d7de;
  }
}
```

The existing `@media (prefers-color-scheme: dark)` fallback in `global.css` already covers dark mode.

### Helper Functions (in `graph.constants.ts`, browser-only)

Per ADR-0007, these live in `graph.constants.ts` (never imported by `build-graph.ts`):

```typescript
/** Resolve a CSS custom property to a hex value */
export function resolveThemeColor(varName: string, fallback: string): string

/** Get sigma background (slightly offset from page background) */
export function getSigmaBackground(): string

/** Adjust a hex color by lightening/darkening */
export function adjustColor(hex: string, amount: number): string

/** Get pre-resolved dim color for sigma reducers (hex + alpha suffix) */
export function getDimColor(opacity: number): string
```

### `color-mix()` Usage Pattern

`color-mix(in srgb, ...)` is valid for DOM elements only. The correct pattern for semi-transparent theme-aware backgrounds:

```typescript
// DOM element (React JSX style prop) — VALID
background: "color-mix(in srgb, var(--muted, #161b22) 85%, transparent)"

// Sigma WebGL setting — INVALID, must use:
background: resolveThemeColor("--muted", "#161b22")  // returns "#161b22" or resolved value
```

`LocalGraphWidget.tsx` already uses the correct DOM pattern at line 137. Other components should follow this example.

## Consequences

- All UI chrome colors become theme-reactive across both Astro and React components
- Theme toggle in graph view updates edges, nodes, dim states, and overlays — not just labels and background
- `forest-night.css` loads once instead of twice
- `--error`, `--warning`, `--success` tokens available for feedback UI
- Semantic category/edge colors remain static but are centralized and overridable
- Light mode has a proper fallback if the CDN fails to load
- Graph components that resolve CSS variables at runtime call helpers from `graph.constants.ts`
- Sigma reducer dim colors are resolved once per theme change (not per frame)

### Risks

- `color-mix()` requires Chrome 111+, Firefox 113+, Safari 16.2+ (March 2023+). Older browsers will see broken semi-transparent backgrounds on DOM elements. Acceptable for this site's target audience.
- Category colors are GitHub Dark palette — some may have poor contrast on light backgrounds. A future `CATEGORY_COLORS_LIGHT` map can be added and selected by luminance detection in `ThemeObserver`.

### Known Violations (2026-03-25)

`typography.css` lines 107-116 use hardcoded Tailwind palette colors for Shiki diff annotations that do not respond to theme changes:

| Current | Required Replacement |
|---------|---------------------|
| `bg-green-400/20`, `text-green-500` | `bg-(--success)/20`, `text-(--success)` |
| `bg-red-500/20`, `text-red-500` | `bg-(--error)/20`, `text-(--error)` |
| `bg-slate-400/20` | `bg-mt/20` |

Tracked for fix during content component implementation (see ADR-0010).
- Removing the `@import` from `global.css` means Tailwind's build-time CSS processing won't see the brand tokens. This is fine because the tokens are mapped via `var()` indirection (`--background: var(--color-background)`), not consumed directly by Tailwind at build time.
