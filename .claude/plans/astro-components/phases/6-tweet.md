# Phase 6: Tweet

## Goal

A clickable tweet card that displays author info, tweet text, and date. Links to the original tweet on X. Does NOT embed Twitter's JS widget — renders as a static SVG-style card.

## File to Create

`src/components/Tweet.astro`

## Props Interface

```typescript
type Props = {
  id: string;              // Tweet ID (from URL)
  author: string;          // Twitter handle (without @), must match People DB @id
  text: string;            // Tweet body text (required — static card, no Twitter API)
  date?: string;           // Tweet date (ISO 8601, formatted via dayjs)
  class?: string;
};
```

## Render Spec

```
┌─────────────────────────────────────────────────────┐
│  ┌────┐                                             │
│  │ AV │  Andrej Karpathy          𝕏                │  ← avatar + name + X logo
│  └────┘  @karpathy                                  │  ← handle
│                                                     │
│  The hottest new programming language is English.   │  ← tweet text
│  Context engineering is the art of...               │
│                                                     │
│  Jun 22, 2025                                       │  ← date
└─────────────────────────────────────────────────────┘
```

## Implementation Steps

1. Import `getPerson` from `src/utils/people.ts`
2. Look up author in People DB by `@id`
3. Render card with:
   - Avatar image (from People DB `image` field, or placeholder)
   - Display name and handle
   - X/Twitter logo (inline SVG)
   - Tweet text (`text` prop)
   - Date
4. Entire card is an `<a>` linking to `https://x.com/{author}/status/{id}`
5. Dark/light theme aware via CSS variables
6. No Twitter API calls — this is a fully static card

## Design Decision: Why Static?

- Twitter/X API requires authentication and has rate limits
- Embedding Twitter's JS widget adds 500KB+ and tracking
- Static cards are faster, privacy-respecting, and work offline
- Trade-off: content must be manually provided via `fallbackText`

## CSS Approach

```css
.tweet-card {
  @apply block border border-bd rounded-xl p-4 hover:border-ac/60 transition-colors no-underline;
}

.tweet-header {
  @apply flex items-center gap-3 mb-3;
}

.tweet-avatar {
  @apply w-10 h-10 rounded-full bg-mt object-cover;
}

.tweet-author-name {
  @apply text-fg font-semibold text-sm;
}

.tweet-author-handle {
  @apply text-fg/50 text-sm;
}

.tweet-x-logo {
  @apply ml-auto text-fg/40 w-5 h-5;
}

.tweet-body {
  @apply text-fg text-sm leading-relaxed mb-3;
}

.tweet-date {
  @apply text-fg/40 text-xs;
}
```

## Dependencies

Phase 1 (Foundation) — requires People DB and `getPerson()` helper.

## Acceptance Criteria

- [ ] Displays author name, handle, avatar from People DB
- [ ] Shows tweet text from `text` prop (required)
- [ ] Links to original tweet on X
- [ ] X logo rendered as inline SVG (no external requests)
- [ ] Works in light and dark themes
- [ ] Graceful fallback if author not found in People DB (show handle only)
- [ ] Uses CSS variables — no hardcoded colors
