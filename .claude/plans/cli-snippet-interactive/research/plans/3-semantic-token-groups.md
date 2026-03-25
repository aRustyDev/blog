# Research 3: Semantic Token Groups

## Research Questions

1. **Token group identification**: How to identify matching pairs — `()`, `{}`, `[]`, `""`, `''` — from Shiki's highlighted output? Shiki produces `<span>` elements with TextMate scopes. Do the scopes contain bracket/string information?
2. **Nesting**: How to handle nested groups? E.g., `{ foo: { bar: [1, 2] } }` — collapsing the inner `[]` vs the outer `{}`.
3. **Collapse behavior**: What replaces the collapsed content? Options: `{...}`, `[...]`, `(...)`, or a custom indicator. How does the user know something is collapsed?
4. **State management**: Collapse state per-group. React `useState` per collapsible region? Or a single state object mapping group IDs to open/closed?
5. **Interaction model**: Click on bracket to toggle? Click on a gutter icon? Hover to preview?
6. **Integration with animation**: If code is being animated (line-group reveal), can groups also be collapsed? Interaction between two systems.

## Sources to Investigate

- VS Code's bracket matching and code folding implementation (conceptual, not code)
- Shiki's token output format — inspect actual `<span>` structure for bracket scopes
- CodeMirror's fold system — how it identifies foldable ranges
- Tree-sitter's node structure — `named_node`, `start_point`, `end_point` for bracket pairs

## Deliverable

Research note covering:
- Whether Shiki's token output contains enough information for bracket detection
- If not, alternative approaches (regex post-processing, tree-sitter AST)
- Recommended collapse UX (gutter icons, click-on-bracket, etc.)
- State management approach

## Important: Quote Pair Detection

Quote detection (`""`, `''`) is fundamentally different from bracket detection. Unlike brackets with distinct open/close characters, quotes use the same character for both. Naive character scanning will fail on `const x = "hello" + "world"` (would incorrectly pair closing `"` of "hello" with opening `"` of "world").

**Recommended approach for quotes**: Use Shiki's TextMate scope (`string.quoted.double`, `string.quoted.single`) rather than character matching. The scope already correctly identifies string boundaries. Bracket detection can use character matching with a stack, but quote detection MUST use scopes.

## Success Criteria

- [ ] Confirmed method for detecting bracket pairs (`()`, `{}`, `[]`) — likely stack-based character matching
- [ ] Confirmed method for detecting quote pairs (`""`, `''`) — likely TextMate scope-based
- [ ] Nesting strategy defined
- [ ] Collapse UX chosen
- [ ] Know whether bracket detection needs tree-sitter AST or can work from Shiki tokens + character matching
