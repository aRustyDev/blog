# Phase 4: Null/Hidden Links

## Goal

`<TermLink>` component that renders existing terms as interactive popups and undefined terms as plain text. Authors reference terms speculatively; links auto-activate when definitions are added.

## File to Create

### `src/components/TermLink.astro`

Props: `{ term: string; class?: string }`

Build-time logic:
```
if getTerm(term) exists → render <TermPopup id={term}><slot /></TermPopup>
if getTerm(term) undefined → render <span class="term-pending"><slot /></span>
```

`.term-pending` is intentionally unstyled — blends with surrounding text.

## MDX Usage

```mdx
import TermLink from "@/components/TermLink.astro";

<TermLink term="context-engineering">context engineering</TermLink>  <!-- interactive -->
<TermLink term="future-concept">future concept</TermLink>           <!-- plain text -->
```

When `future-concept` is later added to `terms.json`, it auto-activates on next build.

## Dependencies

Phases 1 (Terms Database), 2 (Term Hover Modals).

## Acceptance Criteria

- [ ] Existing terms render as interactive TermPopup
- [ ] Non-existing terms render as plain `<span>` (no link styling)
- [ ] No console errors for missing terms
- [ ] Adding term to `terms.json` activates all references on next build
- [ ] Works in both `.md` and `.mdx` files
