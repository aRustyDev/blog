# Research 2: Animation Systems

## Research Questions

1. **Shiki Magic Move**: How does it animate between code states? What's the token-diffing algorithm? Can we reuse it for line-group reveals (not just state transitions)?
2. **Line-group animation**: How to define "groups" of lines that reveal together? Config format: `{ groups: [[1,3], [4,7], [8,12]] }` vs declarative comments in code?
3. **Split-line animation**: Revealing code progressively within a single line (e.g., `const x =` appears, then ` calculateValue()` fades in). What DOM structure supports this? Per-token `<span>` with staggered opacity?
4. **Timing controls**: How to expose speed/delay/pacing to the user? Props-based (`speed={1.5}`) or interactive UI (scrubber/playback controls)?
5. **Animation library choice**: CSS transitions vs Web Animations API vs GSAP vs Framer Motion? Note: project currently has zero animation libraries. Strongly prefer CSS transitions or Web Animations API to avoid bundle bloat (Framer Motion adds ~30-40KB gzipped).
6. **Step-through model**: Slidev and reveal.js use click/keypress to advance. Should we support both auto-play and manual step-through?

## Sources to Investigate

- `shiki-magic-move` — https://github.com/shikijs/shiki-magic-move (core algorithm, React bindings)
- Slidev code animation — how `v-clicks` and `{lines}` ranges work
- reveal.js fragment system — `data-fragment-index`, nested fragments
- CodeAnimator — https://github.com/HeyItsJhello/CodeAnimator, https://github.com/Madalaski/CodeAnimator
- code-slide/ui — https://github.com/code-slide/ui/
- Web Animations API browser support and performance characteristics

## Deliverable

Research note covering:
- Recommended animation library/approach
- Proposed config format for line groups and split-line reveals
- UX model: auto-play vs step-through vs hybrid
- Performance considerations (60fps target, re-paint minimization)

## Additional Research Questions

7. **`shiki-magic-move` as a dependency**: Can we use `shiki-magic-move` directly (it has React bindings) rather than reimplementing token-level diffing? Evaluate its API, bundle size, and whether it supports our line-group reveal use case (not just state transitions).
8. **`requestAnimationFrame` timing**: Auto-play should use rAF with elapsed-time tracking (not `setInterval`) for smooth, non-drifting animation.

## Success Criteria

- [ ] Chosen animation approach with justification
- [ ] Line-group config format defined
- [ ] Split-line animation feasibility confirmed with prototype approach
- [ ] Timing control UX decided (props vs interactive)
- [ ] `shiki-magic-move` reuse evaluated (use vs reimplement)
