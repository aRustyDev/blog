# Phase 3.1: Timeline Redesign (2 Variants)

## Goal

Replace the current minimal timeline with two polished variants:
1. **`<TimelineCards>`** — vertical card-based (Telerik/Michelin style)
2. **`<TimelineProcess>`** — horizontal process flow (step-based)

## Variant 1: TimelineCards (Vertical)

Each event rendered as a card with:
- Date badge (accent color pill)
- Title (bold)
- Description (muted)
- Optional URL (clickable title)
- Dot marker on connecting vertical line
- Alternating left/right layout on desktop (single column on mobile)

```
          ●  Jun 22, 2025
          │  ┌─────────────────────────────┐
          ├──│ Tobi Lütke coins "context   │
          │  │ engineering"                 │
          │  │                             │
          │  │ Tweet defining CE as the    │
          │  │ new skill beyond prompting  │
          │  └─────────────────────────────┘
          │
          ●  Jun 25, 2025
          │  ┌─────────────────────────────┐
          ├──│ Karpathy amplifies          │
```

Props: same as current Timeline (`items`, `collapsible`, `class`).

## Variant 2: TimelineProcess (Horizontal)

Numbered steps connected by arrows/lines:

```
  ┌───┐    ┌───┐    ┌───┐    ┌───┐
  │ 1 │───→│ 2 │───→│ 3 │───→│ 4 │
  └───┘    └───┘    └───┘    └───┘
 Build    Session   On-      Event
 -time    Start     Demand   Triggered
```

Props: `items` (with `number`, `label`, `description`), `class`.

## Files to Create

- `src/components/TimelineCards.astro` — replaces current Timeline
- `src/components/TimelineProcess.astro` — new horizontal variant

## Files to Modify

- `src/styles/components.css` — new timeline card styles, process flow styles
- `src/pages/dev/component-test.astro` — update test page
- `src/pages/dev/draft-preview.mdx` — switch to `<TimelineCards>`

## Files to Remove

- `src/components/Timeline.astro` — replaced by TimelineCards (same props, same interface)

## Dependencies

None — standalone component redesign.

## Acceptance Criteria

- [ ] TimelineCards: vertical card layout with date badges, dot markers, connecting line
- [ ] TimelineCards: alternating left/right on desktop, single column on mobile
- [ ] TimelineCards: collapsible with date-range summary
- [ ] TimelineCards: handles quarter dates ("2025-Q3")
- [ ] TimelineProcess: horizontal numbered steps with connecting arrows
- [ ] TimelineProcess: responsive (wraps or scrolls on mobile)
- [ ] Both use CSS variables — no hardcoded colors
- [ ] Existing Timeline usage migrated to TimelineCards
- [ ] Iterative visual review with user (this needs to look polished)
