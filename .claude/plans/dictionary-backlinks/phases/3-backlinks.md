# Phase 3: Backlinks (Build-Time)

## Goal

Scan all posts at build time for term and inter-post references, generating a reverse link index.

## Files to Create

### `src/scripts/build-backlinks.ts`

Build script following `build-graph.ts` conventions:
1. Read all markdown from `src/data/blog/`, parse frontmatter, skip drafts
2. Scan post body for:
   - `<TermLink term="...">` and `<TermPopup id="...">` references (regex)
   - Markdown links to other posts: `](/posts/slug/)` patterns
3. Build reverse index and write `public/backlinks.json`

Output structure:
```typescript
interface BacklinksIndex {
  terms: Record<string, BacklinkEntry[]>;   // term @id → posts
  posts: Record<string, BacklinkEntry[]>;   // post slug → posts
  generatedAt: string;
}
```

### `src/utils/backlinks.ts`

```typescript
export function getTermBacklinks(termId: string): BacklinkEntry[];
export function getPostBacklinks(postSlug: string): BacklinkEntry[];
```

## Files to Modify

- `package.json` — add `build:backlinks` script, update `build` and `dev` scripts
- `justfile` — add `backlinks` recipe, update `smoke`
- `src/layouts/PostDetails.astro` — add "Referenced by" section

## Dependencies

Phase 1 (Terms Database).

## Acceptance Criteria

- [ ] Detects `<TermLink>` and `<TermPopup>` references
- [ ] Detects inter-post markdown links
- [ ] Generates `public/backlinks.json` with correct reverse index
- [ ] No duplicate entries
- [ ] Build pipeline: backlinks → graph → astro build
- [ ] "Referenced by" section visible on posts
