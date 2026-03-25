# Build-Time Generation: LLMs.txt, repomix.xml, SEO/GEO/AEO

## Overview

Build-time generation of machine-readable site summaries and search engine optimization artifacts.

## Phase Table

| Phase | Title | Depends On | Complexity |
|-------|-------|------------|------------|
| 1 | [LLMs.txt](./phases/1-llms-txt.md) | — | Low |
| 2 | [repomix.xml](./phases/2-repomix-xml.md) | — | Low |
| 3 | [SEO Structured Data](./phases/3-seo.md) | — | Medium |
| 4 | [GEO (Generative Engine Optimization)](./phases/4-geo.md) | Phase 3 | Low |
| 5 | [AEO (Answer Engine Optimization)](./phases/5-aeo.md) | Phase 3 | Medium |

## Key Decisions

- All generation happens at build time (Astro endpoints or build scripts)
- SEO structured data uses JSON-LD (embedded in `<head>` via layouts)
- GEO/AEO are content structure guidelines + schema.org markup, not runtime features
