# Phase 2: Term Hover Modals

## Goal

Inline term references that show a popup with name, category badge, short definition, and link to glossary page. Mirrors PersonPopup architecture.

## Files to Create

### `src/components/TermPopup.astro`

Props: `{ id: string; class?: string }`

Render: inline `<slot />` text with dotted underline. Hover/click shows popup with:
- Term name
- Category badge (`bg-ac/15 text-ac`)
- Short definition
- "View full definition" link to `/glossary/{id}/`

Fallback: if term not found, render plain `<slot />` (no popup).

Event delegation script (same pattern as PersonPopup): single `document.addEventListener("click", ...)` checking `.term-trigger`.

## Files to Modify

### `src/styles/components.css`

Add TermPopup section after PersonPopup styles:
- `.term-wrapper`, `.term-trigger`, `.term-popup` (mirror `.person-*` classes)
- `.term-popup::after` hit area bridge (same hover-intent pattern)
- `.term-popup-name`, `.term-popup-category`, `.term-popup-definition`, `.term-popup-link`

## Dependencies

Phase 1 (Terms Database).

## Acceptance Criteria

- [ ] Popup appears on hover (desktop) with term details
- [ ] Popup appears on tap (mobile) via event delegation
- [ ] Category badge renders with accent color
- [ ] "View full definition" links to `/glossary/{id}/`
- [ ] Graceful fallback for unknown terms
- [ ] Hover intent: `::after` bridge prevents popup loss
- [ ] CSS variables only — no hardcoded colors
