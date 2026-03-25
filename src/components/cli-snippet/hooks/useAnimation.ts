import { useReducer, useEffect, useRef, useCallback, useState } from "react";
import type { TokenMap } from "../types";

// ── Step types ──────────────────────────────────────────────────────

export type AnimationStep =
  | { type: "lines"; range: [number, number] }
  | { type: "split"; line: number; chars: [number, number] }
  | { type: "highlight"; lines: number[] }
  | { type: "pause"; duration: number };

// ── State ───────────────────────────────────────────────────────────

export interface AnimationState {
  currentStep: number; // -1 = nothing revealed
  isPlaying: boolean;
  visibleLines: Set<number>;
  highlightedLines: Set<number> | null; // null = no highlight active
  splitReveals: Map<number, number>; // line → revealed char count
}

const initialState: AnimationState = {
  currentStep: -1,
  isPlaying: false,
  visibleLines: new Set(),
  highlightedLines: null,
  splitReveals: new Map(),
};

// ── Actions ─────────────────────────────────────────────────────────

type AnimationAction =
  | { type: "NEXT" }
  | { type: "PREV" }
  | { type: "PLAY" }
  | { type: "PAUSE" }
  | { type: "RESET" }
  | { type: "GOTO"; step: number }
  | { type: "APPLY_STEP"; step: AnimationStep; stepIndex: number }
  | {
      type: "REPLAY_TO";
      steps: AnimationStep[];
      targetStep: number;
    };

// ── Reducer helpers ─────────────────────────────────────────────────

function applyStep(state: AnimationState, step: AnimationStep): AnimationState {
  switch (step.type) {
    case "lines": {
      const next = new Set(state.visibleLines);
      for (let i = step.range[0]; i <= step.range[1]; i++) {
        next.add(i);
      }
      return { ...state, visibleLines: next };
    }
    case "split": {
      const next = new Map(state.splitReveals);
      next.set(step.line, step.chars[1]);
      // Also ensure the line is visible
      const vis = new Set(state.visibleLines);
      vis.add(step.line);
      return { ...state, splitReveals: next, visibleLines: vis };
    }
    case "highlight": {
      return { ...state, highlightedLines: new Set(step.lines) };
    }
    case "pause": {
      // Pause steps don't modify visual state — they only affect timing
      return state;
    }
  }
}

// ── Reducer ─────────────────────────────────────────────────────────

function createReducer(steps: AnimationStep[]) {
  return function animationReducer(
    state: AnimationState,
    action: AnimationAction
  ): AnimationState {
    switch (action.type) {
      case "PLAY":
        if (state.currentStep >= steps.length - 1) return state;
        return { ...state, isPlaying: true };

      case "PAUSE":
        return { ...state, isPlaying: false };

      case "NEXT": {
        const nextIdx = state.currentStep + 1;
        if (nextIdx >= steps.length) {
          return { ...state, isPlaying: false };
        }
        const step = steps[nextIdx];
        return { ...applyStep(state, step), currentStep: nextIdx };
      }

      case "PREV": {
        if (state.currentStep <= -1) return state;
        const targetStep = state.currentStep - 1;
        // Replay from initial to targetStep
        let replayed: AnimationState = { ...initialState };
        for (let i = 0; i <= targetStep; i++) {
          replayed = applyStep(replayed, steps[i]);
        }
        return { ...replayed, currentStep: targetStep, isPlaying: false };
      }

      case "RESET":
        return { ...initialState };

      case "GOTO": {
        const target = Math.min(
          Math.max(-1, action.step),
          steps.length - 1
        );
        if (target === -1) return { ...initialState };
        // Replay from initial to target
        let replayed: AnimationState = { ...initialState };
        for (let i = 0; i <= target; i++) {
          replayed = applyStep(replayed, steps[i]);
        }
        return {
          ...replayed,
          currentStep: target,
          isPlaying: state.isPlaying && target < steps.length - 1,
        };
      }

      case "APPLY_STEP":
        return {
          ...applyStep(state, action.step),
          currentStep: action.stepIndex,
        };

      case "REPLAY_TO": {
        let replayed: AnimationState = { ...initialState };
        for (let i = 0; i <= action.targetStep; i++) {
          replayed = applyStep(replayed, action.steps[i]);
        }
        return { ...replayed, currentStep: action.targetStep };
      }

      default:
        return state;
    }
  };
}

// ── Options ─────────────────────────────────────────────────────────

export interface AnimationOptions {
  autoPlay?: boolean;
  speed?: number;
  delay?: number;
}

// ── Return type ─────────────────────────────────────────────────────

export interface AnimationControls {
  currentStep: number;
  isPlaying: boolean;
  totalSteps: number;
  next: () => void;
  prev: () => void;
  play: () => void;
  pause: () => void;
  reset: () => void;
  goTo: (step: number) => void;
  speed: number;
  setSpeed: (speed: number) => void;
}

// ── Hook ────────────────────────────────────────────────────────────

export function useAnimation(
  tokenMap: TokenMap | null,
  steps: AnimationStep[],
  options: AnimationOptions = {}
): AnimationControls {
  const reducer = useRef(createReducer(steps)).current;
  const [state, dispatch] = useReducer(reducer, initialState);
  const [speed, setSpeed] = useState(options.speed ?? 1);

  // Use refs for mutable values accessed inside rAF closure
  const speedRef = useRef(speed);
  const delayRef = useRef(options.delay ?? 1000);
  speedRef.current = speed;
  delayRef.current = options.delay ?? 1000;

  // Track previous tokenMap identity to detect resets (theme switch in dev)
  const prevTokenMapRef = useRef<TokenMap | null>(null);
  useEffect(() => {
    if (prevTokenMapRef.current !== null && tokenMap !== prevTokenMapRef.current) {
      dispatch({ type: "RESET" });
    }
    prevTokenMapRef.current = tokenMap;
  }, [tokenMap]);

  // ── DOM visibility effect ─────────────────────────────────────────
  useEffect(() => {
    if (!tokenMap) return;

    tokenMap.lineElements.forEach((el, i) => {
      const lineNum = i + 1;
      const isVisible = state.visibleLines.has(lineNum);

      if (!isVisible) {
        // Not yet revealed — fully hidden
        el.style.opacity = "0";
        el.style.transform = "translateY(4px)";
      } else if (
        state.highlightedLines &&
        !state.highlightedLines.has(lineNum)
      ) {
        // Visible but not highlighted — dimmed
        el.style.opacity = "0.3";
        el.style.transform = "none";
      } else {
        // Visible (and highlighted, or no highlight active)
        el.style.opacity = "1";
        el.style.transform = "none";
      }
      el.style.transition = "opacity 0.3s, transform 0.3s";
    });
  }, [tokenMap, state.visibleLines, state.highlightedLines]);

  // ── Split-line clip-path effect ───────────────────────────────────
  useEffect(() => {
    if (!tokenMap || state.splitReveals.size === 0) return;

    // Check @supports clip-path
    if (!CSS.supports("clip-path", "inset(0)")) return;

    state.splitReveals.forEach((revealedCharEnd, lineNum) => {
      const lineIdx = lineNum - 1;
      if (lineIdx < 0 || lineIdx >= tokenMap.lines.length) return;

      const tokens = tokenMap.lines[lineIdx];
      if (!tokens || tokens.length === 0) return;

      // BATCH READ: force layout for all tokens before writing styles
      // This prevents forced reflows from interleaved reads/writes
      const measured = tokens.map((token) => ({
        token,
        rect: token.element.getBoundingClientRect(),
      }));

      // BATCH WRITE: apply clip-path in one pass
      for (const { token, rect } of measured) {
        if (token.charEnd <= revealedCharEnd) {
          // Fully visible
          token.element.style.clipPath = "inset(0 0 0 0)";
        } else if (token.charStart >= revealedCharEnd) {
          // Fully hidden
          token.element.style.clipPath = "inset(0 100% 0 0)";
        } else {
          // Boundary token — partial reveal using character ratio
          // Use rect.width for proportional clipping when available
          const totalChars = token.charEnd - token.charStart;
          const visibleChars = revealedCharEnd - token.charStart;
          const fraction = visibleChars / totalChars;
          const clipRightPx = rect.width * (1 - fraction);
          token.element.style.clipPath = `inset(0 ${clipRightPx}px 0 0)`;
        }
        token.element.style.transition = "clip-path 0.3s ease";
      }
    });
  }, [tokenMap, state.splitReveals]);

  // ── Clear clip-path on reset ──────────────────────────────────────
  useEffect(() => {
    if (!tokenMap || state.splitReveals.size > 0) return;
    // When splitReveals is empty (after reset), clear any leftover clip-paths
    for (const token of tokenMap.allTokens) {
      token.element.style.clipPath = "";
      token.element.style.transition = "";
    }
  }, [tokenMap, state.splitReveals]);

  // ── rAF auto-play loop ────────────────────────────────────────────
  useEffect(() => {
    if (!state.isPlaying) return;

    let lastTime = performance.now();
    let elapsed = 0;
    let rafId: number;

    // Handle pause steps — check current step's duration
    const currentIdx = state.currentStep;
    const nextIdx = currentIdx + 1;

    const frame = (time: number) => {
      elapsed += (time - lastTime) * speedRef.current;
      lastTime = time;

      // Determine delay: if next step is a pause, use its duration
      let effectiveDelay = delayRef.current;
      if (
        nextIdx < steps.length &&
        steps[nextIdx].type === "pause"
      ) {
        effectiveDelay = (steps[nextIdx] as { type: "pause"; duration: number })
          .duration;
      }

      if (elapsed >= effectiveDelay) {
        dispatch({ type: "NEXT" });
        elapsed = 0;
      }
      rafId = requestAnimationFrame(frame);
    };

    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, [state.isPlaying, state.currentStep, steps]);

  // ── Auto-play on mount ────────────────────────────────────────────
  const hasAutoPlayed = useRef(false);
  useEffect(() => {
    if (options.autoPlay && tokenMap && !hasAutoPlayed.current) {
      hasAutoPlayed.current = true;
      dispatch({ type: "PLAY" });
    }
  }, [options.autoPlay, tokenMap]);

  return {
    currentStep: state.currentStep,
    isPlaying: state.isPlaying,
    totalSteps: steps.length,
    next: useCallback(() => dispatch({ type: "NEXT" }), []),
    prev: useCallback(() => dispatch({ type: "PREV" }), []),
    play: useCallback(() => dispatch({ type: "PLAY" }), []),
    pause: useCallback(() => dispatch({ type: "PAUSE" }), []),
    reset: useCallback(() => dispatch({ type: "RESET" }), []),
    goTo: useCallback((step: number) => dispatch({ type: "GOTO", step }), []),
    speed,
    setSpeed,
  };
}
