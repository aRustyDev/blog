import { useCallback, useEffect, useRef, type FC } from "react";

const SPEED_STEPS = [0.5, 1, 1.5, 2] as const;

export interface AnimationControlsProps {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  speed: number;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
  onGoTo: (step: number) => void;
  onSpeedChange: (speed: number) => void;
}

const AnimationControlsUI: FC<AnimationControlsProps> = ({
  currentStep,
  totalSteps,
  isPlaying,
  speed,
  onPlay,
  onPause,
  onNext,
  onPrev,
  onReset,
  onGoTo,
  onSpeedChange,
}) => {
  const controlsRef = useRef<HTMLDivElement>(null);

  // Progress as fraction (0 to 1)
  const progress = totalSteps > 0 ? (currentStep + 1) / totalSteps : 0;

  // Cycle speed on click
  const handleSpeedClick = useCallback(() => {
    const currentIdx = SPEED_STEPS.indexOf(speed as (typeof SPEED_STEPS)[number]);
    const nextIdx = currentIdx === -1 ? 1 : (currentIdx + 1) % SPEED_STEPS.length;
    onSpeedChange(SPEED_STEPS[nextIdx]);
  }, [speed, onSpeedChange]);

  // Progress bar click — jump to step
  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const fraction = (e.clientX - rect.left) / rect.width;
      const targetStep = Math.round(fraction * totalSteps) - 1;
      onGoTo(Math.max(-1, Math.min(targetStep, totalSteps - 1)));
    },
    [totalSteps, onGoTo]
  );

  // Jump to last step
  const handleLast = useCallback(() => {
    onGoTo(totalSteps - 1);
  }, [totalSteps, onGoTo]);

  // Keyboard support — only when controls container is focused
  useEffect(() => {
    const el = controlsRef.current;
    if (!el) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case " ":
          e.preventDefault();
          if (isPlaying) onPause();
          else onPlay();
          break;
        case "ArrowRight":
          e.preventDefault();
          onNext();
          break;
        case "ArrowLeft":
          e.preventDefault();
          onPrev();
          break;
        case "Escape":
          e.preventDefault();
          onPause();
          onReset();
          break;
        case "Home":
          e.preventDefault();
          onGoTo(-1);
          break;
        case "End":
          e.preventDefault();
          onGoTo(totalSteps - 1);
          break;
      }
    };

    el.addEventListener("keydown", handleKeyDown);
    return () => el.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, onPlay, onPause, onNext, onPrev, onReset, onGoTo, totalSteps]);

  const atStart = currentStep <= -1;
  const atEnd = currentStep >= totalSteps - 1;

  return (
    <div
      ref={controlsRef}
      className="cli-snippet-controls"
      role="toolbar"
      aria-label="Animation controls"
      tabIndex={0}
    >
      <div className="cli-snippet-controls-buttons">
        {/* Reset (first) */}
        <button
          type="button"
          onClick={onReset}
          disabled={atStart}
          aria-label="Reset animation"
          title="Reset"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
          </svg>
        </button>

        {/* Previous */}
        <button
          type="button"
          onClick={onPrev}
          disabled={atStart}
          aria-label="Previous step"
          title="Previous"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
          </svg>
        </button>

        {/* Play / Pause */}
        <button
          type="button"
          onClick={isPlaying ? onPause : onPlay}
          disabled={atEnd && !isPlaying}
          aria-label={isPlaying ? "Pause" : "Play"}
          title={isPlaying ? "Pause" : "Play"}
          className="cli-snippet-controls-play"
        >
          {isPlaying ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6 19h4V5H6zm8-14v14h4V5z" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Next */}
        <button
          type="button"
          onClick={onNext}
          disabled={atEnd}
          aria-label="Next step"
          title="Next"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z" />
          </svg>
        </button>

        {/* Last */}
        <button
          type="button"
          onClick={handleLast}
          disabled={atEnd}
          aria-label="Jump to last step"
          title="Last"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
          </svg>
        </button>
      </div>

      {/* Progress bar */}
      <div
        className="cli-snippet-progress"
        onClick={handleProgressClick}
        role="progressbar"
        aria-valuenow={currentStep + 1}
        aria-valuemin={0}
        aria-valuemax={totalSteps}
        aria-label={`Step ${currentStep + 1} of ${totalSteps}`}
        title={`Step ${currentStep + 1} of ${totalSteps}`}
      >
        <div
          className="cli-snippet-progress-fill"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Speed */}
      <button
        type="button"
        className="cli-snippet-speed"
        onClick={handleSpeedClick}
        aria-label={`Playback speed: ${speed}x`}
        title={`Speed: ${speed}x`}
      >
        {speed}x
      </button>
    </div>
  );
};

export default AnimationControlsUI;
