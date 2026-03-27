# Phase 1: PersonDB Enrichment Script

## Goal

Build script that fills in missing People DB fields by fetching from social platform APIs.

## Files to Create

- `src/scripts/enrich-people.ts` — enrichment script
- `src/data/.people-cache.json` — cached API responses (gitignored)

## Implementation Steps

1. For each person in `people.json` with missing fields:
   - Twitter/X: fetch profile info (display name, bio, avatar URL) via API or scraping
   - GitHub: fetch profile via `api.github.com/users/{handle}` (public, no auth needed)
   - LinkedIn: limited (no public API) — skip, manual only
2. Merge fetched data with existing: manual fields in `people.json` take precedence
3. Cache responses in `.people-cache.json` (TTL: 7 days)
4. Dry-run mode: `--dry-run` shows what would change without writing
5. Add `just enrich-people` recipe

## Acceptance Criteria

- [ ] Fills missing jobTitle, affiliation from available APIs
- [ ] Manual overrides preserved (never overwritten)
- [ ] Cache prevents re-fetching within TTL
- [ ] Dry-run shows planned changes
- [ ] Rate limits respected
