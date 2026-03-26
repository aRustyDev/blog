# ADR-0011: Component Data Input Pattern

## Status

Accepted

## Date

2026-03-25

## Related Decisions

- ADR-0010: Content Component Architecture (established string props over slots for raw text)

## Context

Components that display structured data (timelines, hierarchies, series links, brand cards) need a consistent pattern for how they receive that data. Three approaches exist:

1. **Slot content** — pass data as children, parse at runtime
2. **Inline props** — pass data as prop values directly in the template
3. **JSON file import** — define data in a `.json` file, import at build time in Astro frontmatter, pass as prop

ADR-0010 already established that raw text content uses string props (not slots) because Astro slots render HTML. But structured data (arrays of objects) needs its own convention.

## Decision

### Structured data lives in JSON files, imported at build time

Data-driven components accept **typed props** (not slots or file paths). The data is defined in JSON files under `src/data/` and imported in Astro component frontmatter using standard ESM imports:

```astro
---
import scopeData from "@/data/hierarchies/scope-hierarchy.json";
import HierarchySimple from "@/components/HierarchySimple.astro";
---
<HierarchySimple items={scopeData.items} title={scopeData.title} />
```

### Why this pattern

| Approach | Pros | Cons |
|----------|------|------|
| Slot content | Familiar markdown syntax | Astro renders as HTML, losing structure; parsing is fragile |
| Inline props | No extra files | Data not reusable; large inline arrays clutter templates |
| **JSON file import** | **Reusable across pages; TypeScript validates shape; Vite caches; clean separation of data and presentation** | Extra file per dataset |

### Conventions

1. **Data location**: `src/data/<domain>/` — e.g., `src/data/hierarchies/`, `src/data/series.json`, `src/data/brands.json`
2. **Schema.org compatibility**: When a schema.org type exists for the data (Person, DefinedTerm), use it as the `@type`. Top-level wrapper gets `@context`/`@type`, entries do not repeat them.
3. **Props interface**: Components define a TypeScript `type Props` with the expected shape. The JSON file matches this shape.
4. **Helpers in `src/utils/`**: Lookup functions (like `getPerson`, `getTerm`) import the JSON and provide typed accessors with module-level caching.
5. **Component is dumb, data is smart**: Components render what they receive. They don't fetch, parse, or transform data — that happens in the Astro frontmatter or in utility functions.

### Existing examples

| Data File | Utility | Components |
|-----------|---------|------------|
| `src/data/people.json` | `src/utils/people.ts` | PersonPopup, Tweet |
| `src/data/series.json` (planned) | `src/utils/series.ts` | SeriesLink, SeriesNav |
| `src/data/brands.json` (planned) | `src/utils/brands.ts` | OGCard |
| `src/data/terms.json` (planned) | `src/utils/terms.ts` | TermPopup, TermLink |
| `src/data/hierarchies/*.json` (planned) | — (direct import) | HierarchySimple |

### When NOT to use JSON files

- **One-off inline data**: If data is used in exactly one place and is small (<5 items), inline props are fine: `<Timeline items={[{ date: "2025-06-22", label: "Event" }]} />`
- **Content collection data**: Blog post metadata comes from content collections, not JSON files
- **Runtime data**: Data fetched at runtime (not build time) uses hooks or API calls, not JSON imports

## Consequences

- All data-driven components have a consistent, predictable interface
- Data is reusable across pages without duplication
- TypeScript catches schema mismatches at build time
- Adding a new data source follows an established pattern (JSON file + optional utility module + component)
- JSON files are version-controlled, diffable, and reviewable
- Build-time import means zero runtime cost — data is inlined into the page at build
