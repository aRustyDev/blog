# Phase 2: Avatar Pipeline

## Goal

Download, process, and serve person avatar images locally.

## Implementation Steps

1. For each person with an avatar URL (from enrichment or manual):
   - Download image
   - Resize to 128x128 and 256x256
   - Convert to WebP (smaller file size)
   - Save to `public/assets/people/{id}.webp`
2. Update `people.json` `image` fields to point to local paths
3. Generate SVG letter-initial placeholders for people without images
4. Add to `enrich-people.ts` or separate `build-avatars.ts` script

## Acceptance Criteria

- [ ] Avatars downloaded and resized
- [ ] WebP format for all images
- [ ] Placeholder SVGs for missing images
- [ ] `people.json` image paths updated to local
- [ ] No 404s on avatar URLs
