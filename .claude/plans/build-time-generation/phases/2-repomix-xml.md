# Phase 2: repomix.xml

## Goal

Generate a repomix-compatible XML file with structured representation of blog content.

## Files to Create

- `src/scripts/build-repomix.ts` — build script generating `public/repomix.xml`

## Implementation Steps

1. Read all published posts, extract text + code examples
2. Include component library documentation
3. Structure as XML with sections for content, code, and metadata
4. Add to build pipeline (`build:repomix` script)

## Acceptance Criteria

- [ ] `public/repomix.xml` generated at build time
- [ ] Contains all published post content
- [ ] Valid XML structure
