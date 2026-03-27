# Phase 7: PersonPopup

## Goal

An inline text element (person's name) that shows a popup card with photo, name, role, affiliation, and links on hover/click. NOT collapsible.

## File to Create

`src/components/PersonPopup.astro`

## Props Interface

```typescript
type Props = {
  id: string;    // Key in people.json (e.g., "karpathy")
  class?: string;
};
```

## Render Spec

**Inline state** (default):
```
...as <!-- COMPONENT: PersonPopup -->Andrej Karpathy<!-- /COMPONENT --> noted...
        ↑ underlined, hoverable
```

**Popup state** (on hover/click):
```
┌───────────────────────────────┐
│  ┌────┐                      │
│  │ AV │  Andrej Karpathy     │  ← name
│  └────┘  AI Researcher       │  ← jobTitle
│          Independent          │  ← affiliation
│                               │
│  𝕏 Twitter  🔗 Website       │  ← links (precedence-ordered)
└───────────────────────────────┘
```

## Implementation Steps

1. Import `getPerson`, `getPersonLink` from `src/utils/people.ts`
2. Look up person by `id` prop
3. Render inline: `<span class="person-trigger">` wrapping `<slot />` (the name text)
4. Render popup card as a hidden sibling `<div class="person-popup">`
5. CSS-only approach first: use `:hover` and `:focus-within` to show popup
   - Position popup with `position: absolute` relative to trigger
   - `display: none` by default, `display: block` on hover/focus
6. Fallback `<script>` for mobile tap-to-toggle (`:hover` doesn't work well on touch)
7. Popup content: avatar, name, jobTitle, affiliation, links from `sameAs` array
8. Links rendered with icons (X logo, LinkedIn logo, generic link icon)
9. Click outside to dismiss (for mobile)

## CSS-First Interactivity

```css
.person-wrapper {
  @apply relative inline;
}

.person-trigger {
  @apply underline decoration-dotted decoration-ac underline-offset-2 cursor-pointer;
}

.person-popup {
  @apply absolute bottom-full left-1/2 -translate-x-1/2 mb-2
         invisible opacity-0 w-64 p-3 rounded-lg border border-bd bg-bg shadow-lg z-50
         transition-[opacity,visibility] duration-150;
  /* Use opacity+visibility instead of display:none→block — enables CSS transitions.
     display:none is not animatable; opacity+visibility is. */
}

/* Show on hover (desktop) */
.person-wrapper:hover .person-popup,
.person-wrapper:focus-within .person-popup,
.person-popup.active {
  @apply visible opacity-100;
}

.person-popup-avatar {
  @apply w-12 h-12 rounded-full bg-mt object-cover;
}

.person-popup-name {
  @apply text-fg font-semibold text-sm;
}

.person-popup-role {
  @apply text-fg/60 text-xs;
}

.person-popup-links {
  @apply flex gap-3 mt-2 text-xs;
}

.person-popup-links a {
  @apply text-ac hover:underline flex items-center gap-1;
}
```

## Mobile Script (Progressive Enhancement)

```html
<script>
  // Event delegation — avoids duplicate listener accumulation across view transitions.
  // A single document-level handler works for all current and future .person-trigger elements.
  function initPersonPopups() {
    // Event delegation: one listener on document, no per-trigger binding needed
    document.addEventListener('click', (e) => {
      const trigger = (e.target as HTMLElement).closest('.person-trigger');
      if (trigger) {
        const popup = trigger.parentElement?.querySelector('.person-popup');
        if (popup) {
          // Close any other open popups first
          document.querySelectorAll('.person-popup.active').forEach(p => {
            if (p !== popup) p.classList.remove('active');
          });
          popup.classList.toggle('active');
          e.stopPropagation();
        }
        return;
      }
      // Click outside any trigger — dismiss all popups
      document.querySelectorAll('.person-popup.active').forEach(p => p.classList.remove('active'));
    });
  }

  // Run once — event delegation means no re-binding needed on astro:after-swap
  initPersonPopups();
</script>

Note: Event delegation on `document` eliminates the need for `astro:after-swap` re-binding entirely. New `.person-trigger` elements from page transitions are handled automatically because the click handler checks `e.target.closest('.person-trigger')` at event time.
```

Add `.person-popup.active { display: block; }` to CSS.

## Dependencies

Phase 1 (Foundation) — requires People DB and helpers.

## Acceptance Criteria

- [ ] Inline text renders as the slot content (person's name) with dotted underline
- [ ] Popup appears on hover (desktop) with person details
- [ ] Popup appears on tap (mobile) via progressive enhancement script
- [ ] Shows avatar, name, jobTitle, affiliation, and links
- [ ] Link precedence follows: Twitter > personal > LinkedIn > affiliation
- [ ] Popup positions above the trigger, centered
- [ ] NOT collapsible
- [ ] Graceful fallback if person not found (render plain text, no popup)
- [ ] Uses CSS variables — no hardcoded colors
- [ ] Known limitation (v1): popup may clip at viewport edges — acceptable, revisit with `popover` API or JS repositioning in v2
