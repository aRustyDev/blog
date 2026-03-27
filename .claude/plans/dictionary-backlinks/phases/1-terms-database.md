# Phase 1: Terms Database

## Goal

Establish the terms data layer mirroring the People DB pattern.

## Files to Create

### `src/data/terms.json`

```typescript
interface TermsDB {
  "@context": "https://schema.org";
  "@type": "ItemList";
  itemListElement: Term[];
}

interface Term {
  "@type": "DefinedTerm";
  "@id": string;                  // lookup key (e.g., "context-engineering")
  term: string;                   // display name
  definition: string;             // short definition (1-2 sentences, tooltip-friendly)
  category: TermCategory;         // "concept" | "technique" | "tool" | "framework" | "pattern"
  aliases?: string[];             // alternative names (e.g., ["CE"])
  related?: string[];             // @ids of related terms
  url?: string;                   // canonical external reference URL
}

type TermCategory = "concept" | "technique" | "tool" | "framework" | "pattern";
```

Initial entries: core CE taxonomy terms referenced in existing blog content.

### `src/utils/terms.ts`

```typescript
export function getTerm(id: string): Term | undefined;     // lookup by @id or alias
export function getAllTerms(): Term[];
export function getTermsByCategory(category: TermCategory): Term[];
export function searchTerms(query: string): Term[];         // case-insensitive substring
export function getTermPath(term: Term): string;            // returns /glossary/{@id}/
```

Alias lookup built at module load via `Map<string, Term>` (same singleton pattern as `people.ts`).

## Dependencies

None.

## Acceptance Criteria

- [ ] `terms.json` validates as JSON with 5-10 initial entries
- [ ] `getTerm("context-engineering")` returns correct data
- [ ] `getTerm("CE")` returns same term (alias lookup)
- [ ] `getTermsByCategory("concept")` returns filtered results
- [ ] `searchTerms("engineering")` returns matching terms
- [ ] `getTermPath(term)` returns `/glossary/{id}/`
