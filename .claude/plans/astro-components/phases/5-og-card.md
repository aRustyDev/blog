# Phase 5: OGCard

## Goal

A card displaying Open Graph metadata (title, description, image, favicon) for external URLs. Fetched at build time. NOT collapsible.

## File to Create

`src/components/OGCard.astro`

## Props Interface

```typescript
type Props = {
  url: string;              // URL to fetch OG metadata from
  title?: string;           // Override OG title
  description?: string;     // Override OG description
  image?: string;           // Override OG image
  class?: string;
};
```

## Render Spec

```
┌─────────────────────────────────────────────────────┐
│ ┌──────────┐                                        │
│ │          │  Effective Context Engineering for AI   │  ← og:title
│ │  IMAGE   │  Agents                                │
│ │          │                                        │
│ │          │  A practical guide to context           │  ← og:description
│ └──────────┘  engineering patterns...               │
│                                                     │
│  🔗 anthropic.com                                   │  ← domain + favicon
└─────────────────────────────────────────────────────┘
```

## Implementation Steps

1. At build time, fetch the URL's HTML and parse OG meta tags
2. Extract: `og:title`, `og:description`, `og:image`, `og:site_name`, favicon
3. Manual prop overrides take precedence over fetched values
4. Render as a clickable card (`<a>` wrapping the card)
5. Image on left (or top on mobile), text on right
6. Domain name + favicon at bottom
7. Graceful fallback: if fetch fails, show URL as a styled link with any override props
8. Cache consideration: Astro static build fetches once — no runtime cost

## Build-Time Fetch

```typescript
// In component frontmatter (runs at build time in Astro)
const { url, title: titleOverride, description: descOverride, image: imageOverride } = Astro.props;

let ogData = { title: "", description: "", image: "", siteName: "" };
try {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000); // 5s timeout
  const rawHtml = await fetch(url, { signal: controller.signal }).then(r => r.text());
  clearTimeout(timeout);
  // Truncate to first 50KB — all <meta> tags are in <head>, typically within first 10KB.
  // Prevents multi-MB pages from causing regex perf issues.
  const html = rawHtml.slice(0, 51200);
  // Parse <meta property="og:*"> tags
  ogData.title = extractMeta(html, "og:title") ?? "";
  ogData.description = extractMeta(html, "og:description") ?? "";
  ogData.image = extractMeta(html, "og:image") ?? "";
  ogData.siteName = extractMeta(html, "og:site_name") ?? new URL(url).hostname;
} catch {
  ogData.siteName = new URL(url).hostname;
}

const title = titleOverride ?? ogData.title;
const description = descOverride ?? ogData.description;
const image = imageOverride ?? ogData.image;
```

## Metadata Extraction

Simple regex or DOM-free parsing for `<meta>` tags — avoid pulling in a full HTML parser. Must handle both attribute orderings (`property` before `content` and `content` before `property`):

```typescript
function extractMeta(html: string, property: string): string | null {
  // Handle: <meta property="og:title" content="...">
  const re1 = new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`, "i");
  // Handle: <meta content="..." property="og:title">
  const re2 = new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${property}["']`, "i");
  // Also check name= attribute (some sites use name instead of property)
  const re3 = new RegExp(`<meta[^>]+name=["']${property}["'][^>]+content=["']([^"']+)["']`, "i");
  const re4 = new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${property}["']`, "i");
  return html.match(re1)?.[1] ?? html.match(re2)?.[1] ?? html.match(re3)?.[1] ?? html.match(re4)?.[1] ?? null;
}
```

## CSS Approach

```css
.og-card {
  @apply flex border border-bd rounded-lg overflow-hidden hover:border-ac/60 transition-colors no-underline;
}

.og-card-image {
  @apply w-32 sm:w-40 flex-shrink-0 object-cover bg-mt;
}

.og-card-content {
  @apply flex flex-col justify-center gap-1 p-3 min-w-0;
}

.og-card-title {
  @apply text-fg font-semibold text-sm line-clamp-2;
}

.og-card-description {
  @apply text-fg/60 text-xs line-clamp-2;
}

.og-card-domain {
  @apply text-fg/40 text-xs flex items-center gap-1;
}
```

## Build-Time Cache

Add a module-level `Map<string, OGData>` cache in `src/utils/og-fetch.ts` so the same URL is only fetched once per build (even if the OGCard appears on multiple pages):

```typescript
const cache = new Map<string, OGData>();
export async function fetchOGData(url: string): Promise<OGData> {
  if (cache.has(url)) return cache.get(url)!;
  const data = await doFetch(url);
  cache.set(url, data);
  return data;
}
```

## Dependencies

None.

## Acceptance Criteria

- [ ] Fetches OG metadata at build time (not runtime)
- [ ] Displays title, description, image, domain
- [ ] Manual prop overrides work
- [ ] Graceful fallback when fetch fails
- [ ] Clickable — entire card links to URL
- [ ] NOT collapsible
- [ ] Responsive (image stacks on mobile)
- [ ] Uses CSS variables — no hardcoded colors
- [ ] Fetch timeout (5s) prevents build hangs
- [ ] Favicon: use Google favicon service (`https://www.google.com/s2/favicons?domain=...&sz=32`) or extract from `<link rel="icon">` tag — Google service as fallback
