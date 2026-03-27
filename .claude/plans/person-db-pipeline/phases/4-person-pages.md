# Phase 4: Person Pages

## Goal

Auto-generated pages for each person in the People DB.

## Files to Create

- `src/pages/people/[...id].astro` — person detail page via `getStaticPaths()`

## Implementation Steps

1. `getStaticPaths()` reads `people.json`, generates paths for each person
2. Page shows: avatar, name, role, affiliation, social links, bio
3. Backlinks section: all posts mentioning this person (from backlinks index if dictionary-backlinks Phase 3 is implemented, otherwise scan at build time)
4. PersonPopup links to this page

## Dependencies

Optional: dictionary-backlinks Phase 3 (Backlinks) for reverse link data.

## Acceptance Criteria

- [ ] `/people/{id}/` pages generated for each person
- [ ] Shows avatar, bio, links
- [ ] Lists posts mentioning this person
- [ ] PersonPopup links to person page
