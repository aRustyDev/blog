# Phase 5: AEO (Answer Engine Optimization)

## Goal

Schema.org markup for answer-engine-friendly content (voice assistants, featured snippets).

## Implementation Steps

1. **FAQPage**: Add schema.org FAQPage markup to posts with Q&A sections
2. **HowTo**: Add HowTo markup to tutorial content
3. **DefinedTerm**: Add markup for glossary/dictionary terms (integrates with dictionary-backlinks plan)
4. **Speakable**: Mark key passages as speakable for voice assistants
5. **Featured snippet optimization**: Ensure first paragraph provides a direct answer

## Files to Modify

- `src/layouts/PostDetails.astro` — add conditional FAQ/HowTo JSON-LD based on post tags
- `src/pages/glossary/[...id].astro` — DefinedTerm JSON-LD (integrates with dictionary plan Phase 5)

## Acceptance Criteria

- [ ] FAQPage schema on Q&A posts
- [ ] DefinedTerm schema on glossary pages
- [ ] Speakable markup on key passages
- [ ] Validates with Google Rich Results Test
