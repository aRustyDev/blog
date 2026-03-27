# Research 1 Findings: Shiki Theme System + Tree-Sitter Feasibility

**Status: GREEN LIGHT** — All questions resolved. Tree-sitter unnecessary. Profile switching is pure CSS.

## Key Decisions

| Question | Verdict |
|----------|---------|
| Profile-based colors | CSS variable overrides on wrapper — no extra Shiki themes needed |
| Tree-sitter | **Unnecessary** — TextMate grammars sufficient; tree-sitter adds 1-3 MB for zero visual benefit |
| Runtime theme switching | Pure CSS — `defaultColor: false` already configured; no re-highlighting needed |
| Custom themes | `createCssVariablesTheme()` or raw TextMate JSON; 12 token categories suffice |
| Dual-theme / `data-theme` | Already done — blog uses `--shiki-light`/`--shiki-dark` with `html[data-theme]` |
| WASM/JSON loading | Not applicable — build-time rendering ships 0 client-side Shiki |
| Bundle size | **0 KB client** (build-time); ~130 KB gzipped if ever client-needed (selective imports) |

## Profile Switching Architecture

1. Build-time: `codeToHtml()` with `themes: { light: 'github-light', dark: 'github-dark' }` + `defaultColor: false`
2. Tokens get `--shiki-light:X;--shiki-dark:Y` inline styles
3. Base CSS applies variable based on `html[data-theme]`
4. Profile overrides via `.cli-snippet[data-profile="X"]` CSS — overrides `--shiki-light`/`--shiki-dark` at component level
5. Profile switching = `data-profile` attribute change — pure CSS, zero JS

## CSS Variables Theme Token Categories

| CSS Variable | Scopes Covered |
|---|---|
| `--shiki-foreground` | Default text, operators |
| `--shiki-background` | Background |
| `--shiki-token-string` | `string`, `markup.fenced_code` |
| `--shiki-token-comment` | `comment` |
| `--shiki-token-constant` | `constant.*`, `variable.language.this` |
| `--shiki-token-keyword` | `keyword`, `storage.*` |
| `--shiki-token-parameter` | `variable.parameter.function` |
| `--shiki-token-function` | `entity.name.function`, `support.function` |
| `--shiki-token-string-expression` | `entity.name.tag`, `string.regexp` |
| `--shiki-token-punctuation` | `punctuation.definition.*`, `punctuation.separator` |

## Bundle Size (if ever client-needed)

| Strategy | Size | Gzipped |
|---|---|---|
| `shiki` full | 6.4 MB | ~1.2 MB |
| `shiki/bundle/web` | 3.8 MB | ~695 KB |
| Selective (core + JS engine + 5 langs + 2 themes) | ~530 KB | ~130 KB |
| **Build-time only (current plan)** | **0 KB** | **0 KB** |
