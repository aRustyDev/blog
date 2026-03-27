# Phase 8: Timeline

## Goal

An interactive vertical or horizontal timeline with connected events. Collapsible with date-range summary.

## File to Create

`src/components/Timeline.astro`

## Props Interface

```typescript
interface TimelineItem {
  date: string;            // "YYYY-MM-DD" or "YYYY-QN"
  label: string;           // Event title
  description?: string;    // Additional text
  url?: string;            // Clickable link
  icon?: string;           // Optional icon identifier
}

type Props = {
  items: TimelineItem[];                     // Timeline entries (NOT slot — see PLAN.md)
  orientation?: "vertical" | "horizontal";   // Default: "vertical"
  collapsible?: boolean;                     // Default: true
  class?: string;
};
```

**MDX usage**:
```astro
<Timeline items={[
  { date: "2025-06-22", label: "Tobi Lutke tweets CE definition" },
  { date: "2025-06-25", label: "Karpathy amplifies" },
  { date: "2025-06-27", label: "Willison connects both" },
  { date: "2025-06-30", label: "Schmid 7-component framework", url: "https://..." },
]} />
```

## Date Formatting

The `date` field accepts two formats:
- **ISO date**: `"2025-06-22"` — formatted via `dayjs` (e.g., "Jun 22, 2025")
- **Quarter**: `"2025-Q3"` — displayed as-is ("Q3 2025") since `dayjs` cannot parse this

Detection: if `date.includes('-Q')`, display as `"Q{n} {year}"`. Otherwise, parse with `dayjs`.

## Render Spec

### Vertical (default)

```
┌────────────────────────────────────────────┐
│ [▾] Jun 2025 — Mar 2026                   │  ← collapsible summary
├────────────────────────────────────────────┤
│                                            │
│  ● 2025-06-22                              │  ← dot + date
│  │  Tobi Lutke tweets CE definition        │  ← label
│  │                                         │
│  ● 2025-06-25                              │
│  │  Karpathy amplifies                     │
│  │                                         │
│  ● 2025-06-27                              │
│  │  Willison connects both                 │
│  │                                         │
│  ● 2025-06-30                              │
│     Schmid 7-component framework           │
│                                            │
└────────────────────────────────────────────┘
```

### Horizontal

```
┌──────────────────────────────────────────────────────────┐
│ [▾] Jun 2025 — Mar 2026                                 │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ●─────────●─────────●─────────●─────────●              │
│  Jun 22    Jun 25    Jun 27    Jun 30    Jul 02          │
│  Lutke     Karpathy  Willison  Schmid    LangChain      │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

## Implementation Steps

1. Accept items via `items` prop (typed `TimelineItem[]` array)
2. Generate collapsible summary: first date — last date (formatted as month/year via `dayjs`)
5. Vertical layout: CSS grid or flexbox with left border line and dots
6. Horizontal layout: flex-row with top border line and dots, scroll on overflow
7. Collapsible wrapper: `<details open><summary>`
8. Responsive: horizontal scrolls on narrow screens, vertical stacks naturally

## CSS Approach

```css
/* Vertical */
.timeline-vertical {
  @apply relative pl-6;
}

.timeline-vertical::before {
  /* Connecting line */
  content: "";
  @apply absolute left-2 top-0 bottom-0 w-px bg-bd;
}

.timeline-item {
  @apply relative pb-6;
}

.timeline-dot {
  @apply absolute -left-4 top-1 w-2.5 h-2.5 rounded-full bg-ac border-2 border-bg;
}

.timeline-date {
  @apply text-ac text-xs font-mono font-semibold;
}

.timeline-label {
  @apply text-fg text-sm;
}

/* Horizontal */
.timeline-horizontal {
  @apply relative flex gap-8 overflow-x-auto pb-2;  /* relative for absolute ::before */
}

.timeline-horizontal::before {
  content: "";
  @apply absolute top-3 left-0 right-0 h-px bg-bd;
}

.timeline-h-item {
  @apply relative pt-6 min-w-[100px] text-center flex-shrink-0;
}

.timeline-h-dot {
  @apply absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-ac border-2 border-bg;
}
```

## Dependencies

Phase 2 (CodeBlock) — shares collapsible pattern.

## Acceptance Criteria

- [ ] Accepts structured `items` array prop
- [ ] Renders vertical timeline with connecting line and dots
- [ ] Renders horizontal timeline (via `orientation` prop)
- [ ] Clickable items when URLs detected in labels
- [ ] Collapsible with date-range summary
- [ ] Horizontal mode scrolls on narrow screens
- [ ] Uses CSS variables — no hardcoded colors
