# Phase 3: CLISnippetAnimated

## Goal

A code display component with progressive reveal animation — line groups appear in sequence, with optional within-line split reveals and timing controls. No semantic collapsing.

## Prerequisites

- Research 2 (Animation Systems) complete
- Phase 1 (Core Engine) complete

## Files to Create

```
src/components/cli-snippet/
├── CLISnippetAnimated.tsx       ← thin wrapper: Core + AnimationControls + useAnimation
├── AnimationControls.tsx        ← playback UI (play/pause, step, speed, progress)
├── hooks/useAnimation.ts        ← step state machine, rAF timing, visibility control
```

## Props Interface

```typescript
interface CLISnippetAnimatedProps extends CLISnippetCoreProps {
  steps: AnimationStep[];         // Ordered reveal steps (required)
  autoPlay?: boolean;             // Default: false
  speed?: number;                 // Playback speed multiplier (default: 1)
  delay?: number;                 // Delay between auto-play steps in ms (default: 1000)
  showControls?: boolean;         // Show playback controls (default: true)
}

type AnimationStep =
  | { type: "lines"; range: [number, number] }               // Reveal line range [start, end] inclusive
  | { type: "split"; line: number; chars: [number, number] } // Reveal char range within a line
  | { type: "highlight"; lines: number[] }                   // Dim all except these lines
  | { type: "pause"; duration: number }                      // Wait (auto-play only)
```

## Component Structure

```typescript
// Core owns containerRef + tokenMap. Feature components receive tokenMap via render prop.
function CLISnippetAnimated(props: CLISnippetAnimatedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <CLISnippetCore {...coreProps} ref={containerRef}>
      {(tokenMap) => <AnimatedInner tokenMap={tokenMap} {...props} />}
    </CLISnippetCore>
  );
}

function AnimatedInner({ tokenMap, ...props }: { tokenMap: TokenMap | null } & CLISnippetAnimatedProps) {
  const animation = useAnimation(tokenMap, props.steps, {
    autoPlay: props.autoPlay,
    speed: props.speed,
    delay: props.delay,
  });

  return (
    <CLISnippetCore {...coreProps} ref={containerRef}>
      {props.showControls !== false && (
        <AnimationControls
          currentStep={animation.currentStep}
          totalSteps={props.steps.length}
          isPlaying={animation.isPlaying}
          onPlay={animation.play}
          onPause={animation.pause}
          onNext={animation.next}
          onPrev={animation.prev}
          onReset={animation.reset}
          speed={props.speed}
        />
      )}
    </CLISnippetCore>
  );
}
```

## useAnimation Hook

```typescript
interface AnimationState {
  currentStep: number;     // -1 = nothing revealed
  isPlaying: boolean;
  visibleLines: Set<number>;
  highlightedLines: Set<number> | null;  // null = no highlight active (all visible)
  splitReveals: Map<number, number>;     // line → revealed char count
}

// prev() rollback strategy: REPLAY from step 0 to (currentStep - 1)
// The reducer does NOT maintain a history stack. Instead, prev() resets state
// to initial and replays all steps from 0..currentStep-1. This is correct because:
// - Steps are deterministic (same steps always produce same state)
// - Step count is small (typically <20 steps) — replay is O(n) where n is tiny
// - Avoids memory overhead of a history stack
// - Handles all step types uniformly (lines, split, highlight, pause)

function useAnimation(
  tokenMap: TokenMap | null,
  steps: AnimationStep[],
  options: AnimationOptions
) {
  const [state, dispatch] = useReducer(animationReducer, initialState);

  // DOM manipulation: apply visibility to line elements from tokenMap
  useEffect(() => {
    if (!tokenMap) return;
    tokenMap.lineElements.forEach((el, i) => {
      const lineNum = i + 1;
      const isVisible = state.visibleLines.has(lineNum);

      if (!isVisible) {
        // Not yet revealed — fully hidden
        el.style.opacity = '0';
        el.style.transform = 'translateY(4px)';
      } else if (state.highlightedLines && !state.highlightedLines.has(lineNum)) {
        // Visible but not highlighted — dimmed
        el.style.opacity = '0.3';
        el.style.transform = 'none';
      } else {
        // Visible (and highlighted, or no highlight active)
        el.style.opacity = '1';
        el.style.transform = 'none';
      }
      el.style.transition = 'opacity 0.3s, transform 0.3s';
    });
  }, [tokenMap, state.visibleLines, state.highlightedLines]);

  // Use refs for options that change but shouldn't restart the rAF loop
  const speedRef = useRef(options.speed ?? 1);
  const delayRef = useRef(options.delay ?? 1000);
  speedRef.current = options.speed ?? 1;
  delayRef.current = options.delay ?? 1000;

  // rAF auto-play loop — only depends on isPlaying, reads speed/delay from refs
  useEffect(() => {
    if (!state.isPlaying) return;
    let lastTime = performance.now();
    let elapsed = 0;
    const frame = (time: number) => {
      elapsed += (time - lastTime) * speedRef.current;
      lastTime = time;
      if (elapsed >= delayRef.current) {
        dispatch({ type: 'NEXT' });
        elapsed = 0;
      }
      rafId = requestAnimationFrame(frame);
    };
    let rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, [state.isPlaying]);  // Only restart loop on play/pause toggle

  return {
    currentStep: state.currentStep,
    isPlaying: state.isPlaying,
    next: () => dispatch({ type: 'NEXT' }),
    prev: () => dispatch({ type: 'PREV' }),
    play: () => dispatch({ type: 'PLAY' }),
    pause: () => dispatch({ type: 'PAUSE' }),
    reset: () => dispatch({ type: 'RESET' }),
    goTo: (step: number) => dispatch({ type: 'GOTO', step }),
  };
}
```

## Split-Line Animation

Split reveals use character positions from animation steps (`chars: [0, 12]`). Since `data-col` IS the character offset (confirmed by Research 5), mapping is direct:
- Token at `data-col=5` with `textContent.length=7` covers chars 5-12
- A `chars: [0, 12]` reveal fully shows tokens at col 0-4, partially reveals the token at col 5 (if it extends past 12), and hides tokens beyond col 12

**CSS `clip-path: inset()` on inline `<span>` elements** (confirmed working by Research 5 — Chrome 55+, Firefox 54+, Safari 13.1+, no fallback needed):

```css
/* Token not yet revealed */
span[data-line] { clip-path: inset(0 100% 0 0); }
/* Token partially revealed (right edge clipped by percentage) */
span[data-line] { clip-path: inset(0 40% 0 0); }
/* Token fully revealed */
span[data-line] { clip-path: inset(0 0 0 0); }
```

No wrapper elements needed — `clip-path` works directly on Shiki's `display: inline` token spans. For partial token reveals, the clip percentage is calculated from `getBoundingClientRect` on the specific boundary token.

**DOM batching (critical)**: Read all `getBoundingClientRect` values in one pass BEFORE writing any `clip-path` styles. This avoids forced reflows from interleaved reads and writes.

**Cross-browser**: `clip-path: inset()` requires Safari 13.1+. Add `@supports (clip-path: inset(0))` guard — tokens still appear without animation on older browsers. The `prefers-reduced-motion` path also bypasses clip animations.

## AnimationControls UI

```
┌─────────────────────────────────────────┐
│  ⏮  ◀  ▶/⏸  ▶  ⏭   ━━━━○━━━  1.0x   │
│  reset prev play next last  progress speed│
└─────────────────────────────────────────┘
```

- Positioned below the code block
- Compact on mobile (icon-only, no labels)
- Progress bar: clickable to jump to any step
- Speed: clickable cycle through 0.5x, 1x, 1.5x, 2x

## Keyboard Support

| Key | Action |
|-----|--------|
| Space | Play/pause toggle |
| Right Arrow | Next step |
| Left Arrow | Previous step |
| Escape | Stop, reset to step 0 |
| Home | Reset to step -1 (nothing shown) |
| End | Jump to last step (all revealed) |

Only active when component is focused.

## prefers-reduced-motion

When `prefers-reduced-motion: reduce`:
- Disable all CSS transitions (opacity, transform)
- Steps still work but changes are instant (no fade/slide)
- Auto-play still functions (it's timing, not motion)

## Acceptance Criteria

- [ ] Line-group reveals with smooth fade-in + translate transitions
- [ ] Split-line reveals (within-line progressive character reveal)
- [ ] `highlight` step dims non-highlighted lines (distinct from show/hide)
- [ ] Playback controls: play/pause, next/prev, reset, speed
- [ ] Progress bar with step indicator
- [ ] Keyboard navigation (space, arrows, escape, home, end)
- [ ] Auto-play with rAF-based timing (no drift)
- [ ] `prefers-reduced-motion` respected (instant transitions)
- [ ] All step types work: `lines`, `split`, `highlight`, `pause`
- [ ] Steps use absolute line numbers (source positions)
- [ ] Production bundle: <25KB gzipped (Core + animation + controls)
- [ ] DOM reads batched before writes in split-line animation (no forced reflows)
- [ ] `@supports (clip-path: inset(0))` guard for graceful degradation
- [ ] Dev-mode theme switch resets animation to step -1 (expected — tokenMap change triggers reset)
- [ ] `prev()` replay: React batches intermediate dispatches into one state update, only one DOM effect fires
