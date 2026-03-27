# Research 1: Shiki + Tree-Sitter Integration

## Research Questions

1. **Profile-based color customization**: How does Shiki's theme system work? Can we define custom "profiles" (named theme configurations) that users select?
2. **Tree-sitter feasibility check**: Shiki uses TextMate grammars via `vscode-textmate`. Confirm TextMate grammars are sufficient for our syntax coloring needs. If any specific language requires tree-sitter-level granularity, document the cost-benefit (web-tree-sitter is ~500KB+ per grammar WASM module — likely unjustified for a blog component)
3. **Runtime theme switching**: Can Shiki themes be switched at runtime without re-rendering, or does the code need to be re-highlighted?
4. **Custom theme creation**: What's the minimal structure for a custom Shiki theme? How do we map our CSS variables to Shiki's color system?
5. **Dual-theme support**: The blog uses GitHub Light/Dark. How do we handle theme-aware highlighting that respects the blog's `data-theme` attribute?

## Sources to Investigate

- Shiki docs: theme authoring, TextMate grammar format
- `@shikijs/transformers` — already in use; what transformers are available for token manipulation?
- `shiki-magic-move` source code — how does it resolve token-level diffs?
- Tree-sitter grammar format vs TextMate grammar format — overlap and conversion tools
- Existing blog Shiki config in `astro.config.ts`

## Deliverable

A research note answering each question with:
- Code examples or configuration snippets
- Feasibility assessment (easy / possible with effort / impractical)
- Recommended approach for the component

## Additional Research Questions

6. **WASM/JSON asset loading**: In a `client:only` component on a static Cloudflare site, Shiki loads grammars/themes over the network. How do dynamic imports work with Astro's Vite bundler? Where do WASM files end up in `dist/`? Can we bundle only needed languages/themes?
7. **`shiki` vs `@shikijs/core`**: What's the bundle size difference? Can we use `@shikijs/core` with selective grammar/theme imports to reduce first-load size?

## Success Criteria

- [ ] Understand how to create a custom Shiki theme from CSS variables
- [ ] Confirm TextMate grammars are sufficient (tree-sitter cost-benefit documented)
- [ ] Have a concrete plan for profile-based theme switching
- [ ] Bundle size measured: `shiki` full vs `@shikijs/core` + selective imports
- [ ] WASM/JSON loading strategy for static deployment confirmed
