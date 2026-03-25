# Research 2 Findings: Animation Systems

**Status: GREEN LIGHT** — CSS transitions only. Zero animation libraries. ~2.8 KB total for Phase 3 code.

## Key Decisions

| Question | Decision |
|----------|----------|
| Shiki Magic Move | NOT applicable — solves state-diffing, not progressive reveal |
| Line-group config | `AnimationStep[]` array (already defined in Phase 3) |
| Split-line animation | `clip-path: inset(0 X% 0 0)` on inline spans — hardware-accelerated |
| Timing controls | Props (`speed`, `delay`, `autoPlay`) + interactive UI (`AnimationControls`) |
| Animation library | **CSS transitions only** — 0 KB added |
| Step-through model | Manual (default) + auto-play + hybrid |
| `shiki-magic-move` reuse | **Do NOT use** — wrong abstraction, unnecessary bundle |
| rAF timing | Elapsed-time tracking with `performance.now()`, speed/delay via refs |

## Why NOT Shiki Magic Move

Shiki Magic Move animates between two complete code states (A→B diff). Our model is progressive reveal of a single code block. The library's token-keying, diff-match-patch dependency, and FLIP technique solve a fundamentally different problem. ~10-15 KB gzipped for zero benefit.

## Why CSS Transitions Only

Our animations are exclusively:
- `opacity: 0→1` (line reveal) — compositor-optimized
- `transform: translateY(4px)→none` (slide-up) — compositor-optimized
- `opacity: 1→0.3` (highlight dimming) — compositor-optimized
- `clip-path: inset(0 100% 0 0)→inset(0 0 0 0)` (split reveal) — compositor-optimized

All four properties run at 60fps on GPU composite layer. No JS animation library can improve on this.

## Split-Line Algorithm

```
Step: { type: "split", line: 5, chars: [0, 12] }

1. Batch read: For each token on line 5, read data-col + textContent.length
   Token at col=0 covers [0,6), col=6 covers [6,8), col=8 covers [8,10), col=10 covers [10,24)

2. Classify:
   - charEnd ≤ 12: fully visible → clip-path: inset(0 0 0 0)
   - charStart ≥ 12: fully hidden → clip-path: inset(0 100% 0 0)
   - boundary: partial clip via getBoundingClientRect width ratio

3. Batch write: Apply all clip-path values in one pass
```

## `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  .cli-snippet-code * {
    transition-duration: 0.01ms !important;
    transform: none !important;
  }
}
```

Use `0.01ms` not `0ms` — some browsers skip `0` and don't fire `transitionend`. Suppress `transform` (motion) but keep `opacity` (fading is not motion per WCAG C39).

## Performance Budget

| Component | Gzipped |
|-----------|---------|
| `useAnimation` hook | ~0.8 KB |
| `AnimationControls` | ~1.5 KB |
| Split-line logic | ~0.5 KB |
| CSS transitions | 0 KB |
| **Phase 3 total** | **~2.8 KB** |
