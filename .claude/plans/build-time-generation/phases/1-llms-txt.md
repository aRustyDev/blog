# Phase 1: LLMs.txt

## Goal

Generate `/llms.txt` and optionally `/llms-full.txt` at build time for AI crawler consumption.

## Files to Create

- `src/pages/llms.txt.ts` — Astro endpoint (like `robots.txt.ts` and `rss.xml.ts`)

## Implementation Steps

1. Follow llmstxt.org spec: site name, description, base URL
2. List all published posts with titles, descriptions, URLs
3. Key topics/tags aggregated from all posts
4. Author info from `src/config.ts`
5. Optional: `llms-full.txt.ts` with full post content for deeper indexing

## Acceptance Criteria

- [ ] `/llms.txt` returns valid llmstxt.org format
- [ ] All published posts listed
- [ ] No draft posts included
