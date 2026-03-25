# Phase 3: SEO Structured Data

## Goal

Add JSON-LD structured data to all pages for search engine consumption.

## Files to Modify

- `src/layouts/Layout.astro` — base JSON-LD (Organization, WebSite)
- `src/layouts/PostDetails.astro` — BlogPosting JSON-LD
- `src/components/Header.astro` — breadcrumb structured data

## Implementation Steps

1. **Organization**: name, URL, logo, sameAs (social links) — in base layout
2. **WebSite**: name, URL, search action — in base layout
3. **BlogPosting**: title, author (Person), datePublished, dateModified, description, image — in PostDetails
4. **BreadcrumbList**: Home → Posts → Post Title — in header
5. **Open Graph + Twitter Card**: ensure all pages have og:title, og:description, og:image, twitter:card
6. Canonical URLs on all pages

## Acceptance Criteria

- [ ] JSON-LD validates with Google Structured Data Testing Tool
- [ ] BlogPosting schema on all post pages
- [ ] BreadcrumbList on all pages
- [ ] Canonical URLs present
