# Phase 2.2: OGCard Brand Styling

## Goal

Apply brand-specific colors to OGCard components. Each card gets a tinted background and a solid left border in the brand color.

## Files to Modify

### `src/components/OGCard.astro`

Pass `brandColor` as an inline CSS variable on the card element:

```astro
<a
  href={url}
  class="og-card"
  style={og.brandColor ? `--brand-color: ${og.brandColor}` : undefined}
>
```

### `src/styles/components.css`

Add brand-aware OGCard styles:

```css
.og-card {
  /* Existing styles + brand overlay */
  border-left: 3px solid var(--brand-color, var(--border));
  background: linear-gradient(
    to right,
    color-mix(in srgb, var(--brand-color, transparent) 8%, transparent),
    transparent 40%
  );
}
```

When `--brand-color` is set (via inline style), the card gets:
- A 3px solid left border in the brand color
- A subtle gradient tint (8% opacity) fading from left to right
- Falls back to neutral `--border` when no brand color

## Implementation Steps

1. Update `OGCard.astro` to pass `brandColor` as `--brand-color` CSS variable
2. Update `.og-card` CSS with brand-aware border + gradient
3. Test with Twitter (blue), Arxiv (red), Anthropic (orange), and generic cards

## Dependencies

Phase 2.1 (Brand DB) — needs `OGData.brandColor` populated.

## Acceptance Criteria

- [ ] Twitter OGCards have blue-tinted left border and subtle blue background gradient
- [ ] Arxiv OGCards have red tint
- [ ] Anthropic OGCards have orange tint
- [ ] Cards without brand colors render with neutral default (no visual regression)
- [ ] Works in both light and dark themes
- [ ] Brand color at 8% opacity doesn't fight the blog's surface colors
