# Phase 2.3: color-mix() Brand Refinement (V2)

> **Status: V2** — Not implemented in initial wave. Tracked for future refinement.

## Goal

Replace the simple opacity-based brand tinting with `color-mix(in oklch, ...)` for perceptually uniform blending that adapts to light/dark themes.

## Approach

```css
.og-card {
  background: color-mix(in oklch, var(--muted) 85%, var(--brand-color) 15%);
  border-left-color: color-mix(in oklch, var(--brand-color) 80%, var(--foreground) 20%);
}
```

Benefits over V1 (opacity-based):
- OKLCH color space produces perceptually uniform blends (no muddy browns from mixing blue + dark gray in sRGB)
- Light mode and dark mode produce equally pleasing tints (lightness adapts)
- Brand color's hue is preserved while chroma is reduced to fit our palette

## Prerequisites

- Phase 2.2 (V1 brand styling) deployed and validated
- Browser support: `color-mix()` requires Chrome 111+, Firefox 113+, Safari 16.2+ (same floor as existing Tailwind v4 opacity modifiers — already accepted per ADR-0008)

## Acceptance Criteria

- [ ] Brand tints look equally good in light and dark modes
- [ ] No muddy/brown blends from sRGB mixing
- [ ] Brand identity still recognizable at 15% mix ratio
