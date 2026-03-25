# Phase 1: Foundation (People DB + Component Rules)

## Goal

Establish the data layer and development rules that downstream components depend on.

## Files to Create

### 1. `src/data/people.json`

Schema.org/Person-compatible JSON array. Initial entries for CE Post 1.

```typescript
// Top-level JSON structure
interface PeopleDB {
  "@context": "https://schema.org";
  "@type": "ItemList";
  itemListElement: Person[];
}

// TypeScript interface (for component consumers)
interface Person {
  "@type": "Person";
  "@id": string;                    // lookup key (e.g., "karpathy")
  name: string;
  jobTitle?: string;
  affiliation?: {
    "@type": "Organization";
    name: string;
    url?: string;
  };
  sameAs: string[];                 // Twitter, LinkedIn, personal URL
  image?: string;                   // path to avatar (e.g., "/assets/people/karpathy.jpg")
  tags?: string[];                  // filtering tags
}
```

Note: `@context` and `@type` live on the top-level wrapper only, not repeated per person entry.

**Initial entries**: `karpathy`, `lutke`, `willison`, `schmid`, `mei-lingrui`, `gupta-aakash`

**Link precedence logic** (for components that render person links):
1. Twitter/X URL (contains `x.com` or `twitter.com`)
2. Personal URL (not a known social platform domain — exclude: `github.com`, `linkedin.com`, `x.com`, `twitter.com`, `medium.com`, `youtube.com`)
3. LinkedIn URL (contains `linkedin.com`)
4. Affiliation URL

### 2. `.claude/rules/components.md`

Glob-scoped rule for `src/components/**/*.{astro,tsx,ts}`:

```yaml
---
globs:
  - "src/components/**/*.astro"
  - "src/components/**/*.tsx"
  - "src/components/**/*.ts"
---
```

Contents:
- All components MUST use CSS variables — zero hardcoded colors
- Collapsible components use `<details>/<summary>` (Astro) or equivalent React pattern
- Props interfaces use `type Props = { ... }` (Astro) or named interface (React)
- Existing convention: PascalCase filenames, `class:list` for conditional classes
- Reference Brand CDN tokens: `--foreground`, `--background`, `--accent`, `--muted`, `--border`
- Tailwind aliases: `text-fg`, `bg-bg`, `text-ac`, `bg-mt`, `border-bd`
- React components that need DOM: `client:only="react"` for WebGL, `client:load` for standard interactivity

### 3. `src/utils/people.ts`

Helper to load and query People DB:

```typescript
import peopleData from "@/data/people.json";

export function getPerson(id: string): Person | undefined;
export function getPersonLink(person: Person): string | undefined;
// Returns first available: Twitter > personal > LinkedIn > affiliation
```

## Implementation Steps

1. Create `src/data/people.json` with 6 initial entries
2. Create `src/utils/people.ts` with lookup + link precedence helpers
3. Create `.claude/rules/components.md` with glob and conventions
4. Verify JSON is valid and importable in Astro (`import people from "@/data/people.json"`)

## Dependencies

None — this is the foundation phase.

## Acceptance Criteria

- [ ] `people.json` validates as JSON with 6 entries
- [ ] `getPerson("karpathy")` returns correct data
- [ ] `getPersonLink(person)` follows precedence (Twitter > personal > LinkedIn > affiliation)
- [ ] `.claude/rules/components.md` loads when editing `src/components/` files
- [ ] No hardcoded colors in any created file
