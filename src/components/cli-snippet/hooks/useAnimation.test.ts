import { applyStep, createReducer, type AnimationState, type AnimationStep } from "./useAnimation";

const initial: AnimationState = {
  currentStep: -1,
  isPlaying: false,
  visibleLines: new Set(),
  highlightedLines: null,
  splitReveals: new Map(),
};

describe("applyStep", () => {
  it("should reveal lines for 'lines' step", () => {
    const step: AnimationStep = { type: "lines", range: [1, 3] };
    const result = applyStep(initial, step);
    expect(result.visibleLines).toEqual(new Set([1, 2, 3]));
  });

  it("should accumulate visible lines across steps", () => {
    const s1 = applyStep(initial, { type: "lines", range: [1, 2] });
    const s2 = applyStep(s1, { type: "lines", range: [4, 5] });
    expect(s2.visibleLines).toEqual(new Set([1, 2, 4, 5]));
  });

  it("should set highlightedLines for 'highlight' step", () => {
    const step: AnimationStep = { type: "highlight", lines: [2, 4] };
    const result = applyStep(initial, step);
    expect(result.highlightedLines).toEqual(new Set([2, 4]));
  });

  it("should set splitReveals and make line visible for 'split' step", () => {
    const step: AnimationStep = { type: "split", line: 3, chars: [0, 12] };
    const result = applyStep(initial, step);
    expect(result.splitReveals.get(3)).toBe(12);
    expect(result.visibleLines.has(3)).toBe(true);
  });

  it("should not modify state for 'pause' step", () => {
    const state = {
      ...initial,
      visibleLines: new Set([1, 2]),
      currentStep: 2,
    };
    const step: AnimationStep = { type: "pause", duration: 500 };
    const result = applyStep(state, step);
    expect(result).toBe(state); // same reference — no mutation
  });
});

describe("createReducer", () => {
  const steps: AnimationStep[] = [
    { type: "lines", range: [1, 3] },
    { type: "lines", range: [4, 6] },
    { type: "highlight", lines: [2, 5] },
    { type: "lines", range: [7, 8] },
  ];
  const reducer = createReducer(steps);

  describe("NEXT", () => {
    it("should advance to first step", () => {
      const result = reducer(initial, { type: "NEXT" });
      expect(result.currentStep).toBe(0);
      expect(result.visibleLines).toEqual(new Set([1, 2, 3]));
    });

    it("should advance to second step and accumulate", () => {
      const s1 = reducer(initial, { type: "NEXT" });
      const s2 = reducer(s1, { type: "NEXT" });
      expect(s2.currentStep).toBe(1);
      expect(s2.visibleLines).toEqual(new Set([1, 2, 3, 4, 5, 6]));
    });

    it("should stop and pause at last step", () => {
      let state = initial;
      for (let i = 0; i < steps.length; i++) {
        state = reducer(state, { type: "NEXT" });
      }
      expect(state.currentStep).toBe(steps.length - 1);
      // One more NEXT should not advance
      const beyond = reducer(state, { type: "NEXT" });
      expect(beyond.currentStep).toBe(steps.length - 1);
      expect(beyond.isPlaying).toBe(false);
    });
  });

  describe("PREV", () => {
    it("should go back by replaying steps", () => {
      let state = initial;
      state = reducer(state, { type: "NEXT" }); // step 0
      state = reducer(state, { type: "NEXT" }); // step 1
      state = reducer(state, { type: "NEXT" }); // step 2 (highlight)
      // Now prev from step 2 → replay to step 1
      const prev = reducer(state, { type: "PREV" });
      expect(prev.currentStep).toBe(1);
      expect(prev.visibleLines).toEqual(new Set([1, 2, 3, 4, 5, 6]));
      // highlight should be cleared (step 2 was highlight, we're at step 1)
      expect(prev.highlightedLines).toBeNull();
    });

    it("should go to -1 from step 0", () => {
      const s0 = reducer(initial, { type: "NEXT" });
      const result = reducer(s0, { type: "PREV" });
      expect(result.currentStep).toBe(-1);
      expect(result.visibleLines.size).toBe(0);
    });

    it("should be no-op at step -1", () => {
      const result = reducer(initial, { type: "PREV" });
      expect(result.currentStep).toBe(-1);
    });

    it("should stop playing on prev", () => {
      // Need to actually advance properly for replay
      let state = initial;
      state = reducer(state, { type: "NEXT" });
      state = reducer(state, { type: "NEXT" });
      state = { ...state, isPlaying: true };
      const result = reducer(state, { type: "PREV" });
      expect(result.isPlaying).toBe(false);
    });
  });

  describe("PLAY / PAUSE", () => {
    it("should set isPlaying to true", () => {
      const s0 = reducer(initial, { type: "NEXT" });
      const result = reducer(s0, { type: "PLAY" });
      expect(result.isPlaying).toBe(true);
    });

    it("should not play at last step", () => {
      let state = initial;
      for (let i = 0; i < steps.length; i++) {
        state = reducer(state, { type: "NEXT" });
      }
      const result = reducer(state, { type: "PLAY" });
      expect(result.isPlaying).toBe(false);
    });

    it("should set isPlaying to false", () => {
      const playing = { ...initial, isPlaying: true };
      const result = reducer(playing, { type: "PAUSE" });
      expect(result.isPlaying).toBe(false);
    });
  });

  describe("RESET", () => {
    it("should return to initial state", () => {
      let state = initial;
      state = reducer(state, { type: "NEXT" });
      state = reducer(state, { type: "NEXT" });
      const result = reducer(state, { type: "RESET" });
      expect(result.currentStep).toBe(-1);
      expect(result.visibleLines.size).toBe(0);
      expect(result.isPlaying).toBe(false);
    });
  });

  describe("GOTO", () => {
    it("should jump to specific step", () => {
      const result = reducer(initial, { type: "GOTO", step: 1 });
      expect(result.currentStep).toBe(1);
      expect(result.visibleLines).toEqual(new Set([1, 2, 3, 4, 5, 6]));
    });

    it("should clamp to -1", () => {
      const result = reducer(initial, { type: "GOTO", step: -5 });
      expect(result.currentStep).toBe(-1);
      expect(result.visibleLines.size).toBe(0);
    });

    it("should clamp to max step", () => {
      const result = reducer(initial, {
        type: "GOTO",
        step: 100,
      });
      expect(result.currentStep).toBe(steps.length - 1);
    });

    it("should reset when going to -1", () => {
      let state = initial;
      state = reducer(state, { type: "NEXT" });
      state = reducer(state, { type: "NEXT" });
      const result = reducer(state, { type: "GOTO", step: -1 });
      expect(result.currentStep).toBe(-1);
      expect(result.visibleLines.size).toBe(0);
    });

    it("should preserve playing state when not at end", () => {
      const playing = { ...initial, isPlaying: true };
      const result = reducer(playing, { type: "GOTO", step: 1 });
      expect(result.isPlaying).toBe(true);
    });

    it("should stop playing when jumping to last step", () => {
      const playing = { ...initial, isPlaying: true };
      const result = reducer(playing, {
        type: "GOTO",
        step: steps.length - 1,
      });
      expect(result.isPlaying).toBe(false);
    });
  });

  describe("split step integration", () => {
    const splitSteps: AnimationStep[] = [
      { type: "split", line: 1, chars: [0, 5] },
      { type: "split", line: 1, chars: [5, 12] },
    ];
    const splitReducer = createReducer(splitSteps);

    it("should set splitReveals on first split", () => {
      const result = splitReducer(initial, { type: "NEXT" });
      expect(result.splitReveals.get(1)).toBe(5);
      expect(result.visibleLines.has(1)).toBe(true);
    });

    it("should update splitReveals on second split", () => {
      const s1 = splitReducer(initial, { type: "NEXT" });
      const s2 = splitReducer(s1, { type: "NEXT" });
      expect(s2.splitReveals.get(1)).toBe(12);
    });
  });
});
