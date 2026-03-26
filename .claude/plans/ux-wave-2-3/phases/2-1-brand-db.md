# Phase 2.1: Brand DB + theme-color Extraction

## Goal

Create a brand color system that auto-extracts `theme-color` from fetched HTML and falls back to a manual `brands.json` database.

## Files to Create

### `src/data/brands.json`

Manual overrides and entries for sites without `theme-color`:

```json
{
  "x.com": { "name": "X/Twitter", "color": "#1DA1F2" },
  "twitter.com": { "name": "X/Twitter", "color": "#1DA1F2" },
  "arxiv.org": { "name": "arXiv", "color": "#B31B1B" },
  "anthropic.com": { "name": "Anthropic", "color": "#D97757" },
  "github.com": { "name": "GitHub", "color": "#24292F" },
  "code.claude.com": { "name": "Claude Code", "color": "#D97757" }
}
```

### `src/utils/brands.ts`

```typescript
export function getBrandColor(domain: string): string | null;
export function extractThemeColor(html: string): string | null;
```

## Files to Modify

### `src/utils/og-fetch.ts`

Extend `OGData` with `brandColor` field:
- Extract `<meta name="theme-color" content="...">` from already-fetched HTML
- If not found, look up domain in `brands.json`
- Store on `OGData.brandColor`

### `src/utils/og-fetch.test.ts`

Add tests for `theme-color` extraction and brand fallback.

## Implementation Steps

1. Create `brands.json` with initial entries (Twitter, Arxiv, Anthropic, GitHub, Claude)
2. Create `brands.ts` with `getBrandColor()` (domain lookup) and `extractThemeColor()` (HTML meta extraction)
3. Extend `extractMeta()` pattern in `og-fetch.ts` to also extract `theme-color`
4. Add `brandColor` to `OGData` interface
5. Fallback chain: `theme-color` meta → `brands.json` → `null`

## Acceptance Criteria

- [ ] `OGData.brandColor` populated from `theme-color` meta when available
- [ ] Falls back to `brands.json` when `theme-color` absent
- [ ] Manual override in `brands.json` takes precedence
- [ ] Twitter, Arxiv, Anthropic all have brand colors resolved
- [ ] Unit tests cover extraction + fallback chain
