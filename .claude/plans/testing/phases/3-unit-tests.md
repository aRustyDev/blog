# Phase 3: Unit Tests

## Goal

Test all pure functions and stateless logic. These are the highest-value, easiest-to-write tests.

## Test Case Inventory

### `src/utils/people.ts`

| Function | Test Case | Input | Expected |
|----------|-----------|-------|----------|
| `getPerson` | finds by id | `"karpathy"` | Person object with name "Andrej Karpathy" |
| `getPerson` | returns undefined for unknown | `"nonexistent"` | `undefined` |
| `getPersonLink` | Twitter first (precedence) | person with Twitter + LinkedIn + personal | Twitter URL |
| `getPersonLink` | personal URL when no Twitter | person with LinkedIn + personal | personal URL (not LinkedIn) |
| `getPersonLink` | LinkedIn when no Twitter/personal | person with only LinkedIn | LinkedIn URL |
| `getPersonLink` | affiliation fallback | person with no sameAs, has affiliation.url | affiliation URL |
| `getPersonLink` | undefined when no links | person with empty sameAs, no affiliation url | `undefined` |
| `getPersonLink` | excludes social platforms from "personal" | person with GitHub + Twitter | Twitter (GitHub not treated as personal) |
| `getTwitterHandle` | extracts handle from x.com | person with `https://x.com/karpathy` | `"karpathy"` |
| `getTwitterHandle` | extracts handle from twitter.com | person with `https://twitter.com/user` | `"user"` |
| `getTwitterHandle` | returns undefined when no Twitter | person with no Twitter URL | `undefined` |
| `getAllPeople` | returns all entries | — | array of 6 Person objects |

### `src/utils/og-fetch.ts`

| Function | Test Case | Input | Expected |
|----------|-----------|-------|----------|
| `extractMeta` (internal) | property before content | `<meta property="og:title" content="Hello">` | `"Hello"` |
| `extractMeta` | content before property | `<meta content="Hello" property="og:title">` | `"Hello"` |
| `extractMeta` | name attribute | `<meta name="og:title" content="Hello">` | `"Hello"` |
| `extractMeta` | not found | `<html><head></head></html>` | `null` |
| `extractMeta` | handles single quotes | `<meta property='og:title' content='Hi'>` | `"Hi"` |
| `extractFavicon` (internal) | link rel="icon" | `<link rel="icon" href="/fav.ico">` | resolved URL |
| `extractFavicon` | relative href resolved | `<link rel="icon" href="/img/fav.png">` + base `https://example.com` | `https://example.com/img/fav.png` |
| `extractFavicon` | fallback to Google | no `<link>` tag | Google favicon service URL |
| `fetchOGData` | caches by URL | call twice with same URL | second call returns cached, no fetch |
| `fetchOGData` | overrides take precedence | OG title "A", override title "B" | `"B"` |
| `fetchOGData` | handles fetch failure | unreachable URL | default data with hostname |
| `fetchOGData` | truncates HTML | — | only first 50KB processed |

Note: `extractMeta` and `extractFavicon` are not exported. Either export them for testing, or test via `fetchOGData` with mocked `fetch`.

### `src/utils/people.ts` — link precedence edge cases

| Test Case | sameAs Array | Expected |
|-----------|-------------|----------|
| Multiple Twitter URLs | `["https://x.com/a", "https://twitter.com/a"]` | first Twitter URL |
| GitHub is not "personal" | `["https://github.com/user", "https://user.dev"]` | `"https://user.dev"` |
| Medium is not "personal" | `["https://medium.com/@user"]` | `undefined` (no personal, no Twitter, no LinkedIn) |
| Mastodon is not "personal" | `["https://mastodon.social/@user", "https://user.dev"]` | `"https://user.dev"` |

### `src/components/cli-snippet/hooks/useCollapsing.ts`

The detection functions are pure (take tokens, return pairs). Test them directly.

| Function | Test Case | Input | Expected |
|----------|-----------|-------|----------|
| `detectBracketPairs` | simple `{}` | tokens for `{ foo }` | 1 pair, type `{}` |
| `detectBracketPairs` | nested `{ { } }` | tokens for `{ { } }` | 2 pairs, outer depth 0, inner depth 1 |
| `detectBracketPairs` | 3+ nesting | `{ [ ( ) ] }` | 3 pairs, depths 0,1,2 |
| `detectBracketPairs` | mismatched `{ [ }` | tokens | 1 pair `{}` (unmatched `[` dropped) |
| `detectBracketPairs` | unclosed opener `{` | tokens | 0 pairs (dropped from stack) |
| `detectBracketPairs` | unmatched closer `}` | tokens | 0 pairs (skipped) |
| `detectBracketPairs` | brackets inside strings skipped | `"{ not a bracket }"` with `string.quoted.*` scope | 0 pairs |
| `detectBracketPairs` | brackets inside comments skipped | `// { comment }` with `comment.*` scope | 0 pairs |
| `detectBracketPairs` | empty pairs `{}` | tokens | 1 pair (single-line, open==close line) |
| `detectBracketPairs` | adjacent `{}{}`  | tokens | 2 separate pairs |
| `detectBracketPairs` | multi-line pair | `{\n  foo\n}` | 1 pair, openLine=1, closeLine=3 |
| `detectQuotePairs` | double quotes | tokens with `string.quoted.double.ts` scope | 1 pair, type `""` |
| `detectQuotePairs` | single quotes | tokens with `string.quoted.single.ts` scope | 1 pair, type `''` |
| `detectQuotePairs` | adjacent strings `"a" + "b"` | tokens | 2 separate pairs (not falsely merged) |
| `detectQuotePairs` | template literal excluded | tokens with `string.template.ts` scope | 0 pairs |
| `detectPairs` | combined bracket + quote | tokens for `{ "key": "val" }` | 1 bracket pair + 2 quote pairs |

### `src/components/cli-snippet/hooks/useAnimation.ts`

The reducer is pure. Test the state transitions.

| Action | Initial State | Expected State |
|--------|--------------|----------------|
| `NEXT` (first step, type: lines [1,3]) | currentStep=-1, visibleLines=empty | currentStep=0, visibleLines={1,2,3} |
| `NEXT` (highlight step) | visible={1,2,3} | highlightedLines={specified lines} |
| `NEXT` at last step | currentStep=totalSteps-1 | no change (stays at end) |
| `PREV` from step 2 | currentStep=2 | replays steps 0..1, correct visibleLines |
| `PREV` from step 0 | currentStep=0 | currentStep=-1, visibleLines=empty |
| `RESET` | currentStep=5, playing | currentStep=-1, isPlaying=false, empty sets |
| `PLAY` | isPlaying=false | isPlaying=true |
| `PAUSE` | isPlaying=true | isPlaying=false |
| `GOTO(3)` | currentStep=0 | replays steps 0..3, correct state |
| `GOTO(-1)` | currentStep=5 | reset to initial |
| split step `{line:1, chars:[0,5]}` | visible={1} | splitReveals.get(1)=5 |

### `src/utils/shiki-transformer.ts`

| Test Case | Input | Expected |
|-----------|-------|----------|
| `transformerTokenMetadata()` | call span hook | node gets `data-line`, `data-col` |
| `transformerTokenMetadata({ includeScope: true })` | token with explanation | node gets `data-scope` |
| `transformerTokenMetadata({ includeScope: false })` | token with explanation | node does NOT get `data-scope` |
| `transformerTokenMetadata({ includeScope: true })` | token without explanation | no `data-scope` (no crash) |

## Implementation Notes

- `detectBracketPairs` and `detectQuotePairs` are not currently exported. Export them (or use an `@internal` export pattern) to enable direct testing.
- The `animationReducer` in `useAnimation.ts` should also be exported for direct testing.
- `extractMeta` and `extractFavicon` in `og-fetch.ts` should be exported for testing, or test through `fetchOGData` with `vi.fn()` mocking `fetch`.

## Acceptance Criteria

- [ ] All `people.ts` functions tested (12+ test cases)
- [ ] OG fetch extraction logic tested (8+ test cases)
- [ ] Bracket pair detection tested with all edge cases (12+ test cases)
- [ ] Quote pair detection tested (5+ test cases)
- [ ] Animation reducer state transitions tested (10+ test cases)
- [ ] Shiki transformer metadata injection tested (4 test cases)
- [ ] All tests pass with `npx vitest run`
- [ ] Total: ~50+ unit test cases
