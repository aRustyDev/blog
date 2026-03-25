# Series Links + Status Pages

## Overview

Variablized "Post N" references with auto-linking, plus in-progress and coming-soon pages for unpublished series posts.

## Phase Table

| Phase | Title | Depends On | Complexity |
|-------|-------|------------|------------|
| 1 | [Series Configuration](./phases/1-series-config.md) | — | Low |
| 2 | [SeriesLink Component](./phases/2-series-link-component.md) | Phase 1 | Low |
| 3 | [Status Pages](./phases/3-status-pages.md) | Phase 1 | Medium |
| 4 | [Series Navigation](./phases/4-series-navigation.md) | Phases 1, 3 | Low |

## Key Decisions

- Single source of truth: `src/data/series.json` defines all series with post metadata
- `<SeriesLink>` resolves at build time: published → link, draft → draft link, coming-soon → plain text
- Status pages auto-generated from series.json via `getStaticPaths()`
- Series navigation (prev/next) at bottom of each series post
