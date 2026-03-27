# Phase 4: Responsive + Polish

## Goal

Make both CLISnippetCollapsible and CLISnippetAnimated fully responsive, cross-browser tested, and production-polished.

## Prerequisites

- Phases 1-3 complete

## Files to Modify

- All `src/components/cli-snippet/*.tsx` files

## Responsive Behavior

### Portrait (narrow screens, <640px)

- Full-width layout, horizontal scroll for long lines
- Animation controls stack below code (not overlaid)
- Title bar truncates long titles with ellipsis
- Fold gutter hidden (tap on bracket instead)
- Font size slightly reduced

### Landscape (wide screens, >=640px)

- Standard layout with controls below code
- Fold gutter visible
- Full toolbar with labeled buttons

### Touch Support

- Tap on brackets for collapse toggle (CLISnippetCollapsible)
- Tap on animation controls (CLISnippetAnimated)
- Swipe left/right for step navigation (stretch goal — only if trivial to implement)

## Implementation Steps

1. Audit all components for responsive issues at 320px, 568px, 768px, 1024px
2. Add Tailwind responsive breakpoints (`sm:`, `md:`)
3. Test with various code block sizes (short/wide/tall)
4. Ensure horizontal scroll works well on mobile (momentum scrolling, `-webkit-overflow-scrolling: touch`)
5. Cross-browser testing: Chrome, Firefox, Safari
6. Print styles: show all code expanded, no controls, no fold gutter
7. Visual polish: consistent spacing with blog typography, Carbon chrome alignment

## Polish Checklist

- [ ] Smooth transitions (no janky reflows)
- [ ] Consistent spacing with blog's existing `.astro-code` blocks
- [ ] Carbon chrome matches reference (carbon.now.sh)
- [ ] Dark/light theme transitions are instant (no flash)
- [ ] Code blocks don't break blog layout (no horizontal overflow on parent)
- [ ] Loading skeleton matches final rendered dimensions
- [ ] Print: all code visible, no controls

## Acceptance Criteria

- [ ] Renders correctly on mobile portrait (320px width)
- [ ] Renders correctly on mobile landscape (568px width)
- [ ] Renders correctly on tablet (768px) and desktop (1024px+)
- [ ] Fold gutter hidden on mobile, bracket-tap works instead
- [ ] Animation controls compact on mobile
- [ ] No horizontal overflow breaks blog layout
- [ ] Print-friendly (expanded, no interactive elements)
- [ ] Chrome, Firefox, Safari tested
