import { type FC } from "react";
import CLISnippetCore from "./CLISnippetCore";
import AnimationControlsUI from "./AnimationControls";
import { useAnimation, type AnimationStep } from "./hooks/useAnimation";
import type { CLISnippetCoreProps, TokenMap } from "./types";

export interface CLISnippetAnimatedProps extends CLISnippetCoreProps {
  /** Ordered reveal steps. Required for meaningful animation. */
  steps?: AnimationStep[];
  autoPlay?: boolean;
  speed?: number;
  delay?: number;
  showControls?: boolean;
}

/**
 * Animated code display with progressive reveal.
 *
 * Thin wrapper: CLISnippetCore + useAnimation + AnimationControls.
 * Core owns DOM container + tokenMap. This component orchestrates
 * animation state and renders playback controls.
 */
const CLISnippetAnimated: FC<CLISnippetAnimatedProps> = ({
  steps = [],
  autoPlay = false,
  speed: initialSpeed = 1,
  delay = 1000,
  showControls = true,
  ...coreProps
}) => {
  return (
    <CLISnippetCore {...coreProps}>
      {(tokenMap) => (
        <AnimatedInner
          tokenMap={tokenMap}
          steps={steps}
          autoPlay={autoPlay}
          initialSpeed={initialSpeed}
          delay={delay}
          showControls={showControls}
        />
      )}
    </CLISnippetCore>
  );
};

interface AnimatedInnerProps {
  tokenMap: TokenMap | null;
  steps: AnimationStep[];
  autoPlay: boolean;
  initialSpeed: number;
  delay: number;
  showControls: boolean;
}

const AnimatedInner: FC<AnimatedInnerProps> = ({
  tokenMap,
  steps,
  autoPlay,
  initialSpeed,
  delay,
  showControls,
}) => {
  const animation = useAnimation(tokenMap, steps, {
    autoPlay,
    speed: initialSpeed,
    delay,
  });

  if (!showControls) return null;

  return (
    <AnimationControlsUI
      currentStep={animation.currentStep}
      totalSteps={animation.totalSteps}
      isPlaying={animation.isPlaying}
      speed={animation.speed}
      onPlay={animation.play}
      onPause={animation.pause}
      onNext={animation.next}
      onPrev={animation.prev}
      onReset={animation.reset}
      onGoTo={animation.goTo}
      onSpeedChange={animation.setSpeed}
    />
  );
};

export default CLISnippetAnimated;
