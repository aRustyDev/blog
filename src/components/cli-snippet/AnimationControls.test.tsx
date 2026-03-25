import { render, screen, fireEvent } from "@testing-library/react";
import AnimationControlsUI, {
  type AnimationControlsProps,
} from "./AnimationControls";

function makeProps(
  overrides: Partial<AnimationControlsProps> = {}
): AnimationControlsProps {
  return {
    currentStep: 0,
    totalSteps: 5,
    isPlaying: false,
    speed: 1,
    onPlay: vi.fn(),
    onPause: vi.fn(),
    onNext: vi.fn(),
    onPrev: vi.fn(),
    onReset: vi.fn(),
    onGoTo: vi.fn(),
    onSpeedChange: vi.fn(),
    ...overrides,
  };
}

describe("AnimationControls", () => {
  it("should render all five buttons (reset, prev, play, next, last)", () => {
    render(<AnimationControlsUI {...makeProps()} />);
    expect(screen.getByLabelText("Reset animation")).toBeInTheDocument();
    expect(screen.getByLabelText("Previous step")).toBeInTheDocument();
    expect(screen.getByLabelText("Play")).toBeInTheDocument();
    expect(screen.getByLabelText("Next step")).toBeInTheDocument();
    expect(screen.getByLabelText("Jump to last step")).toBeInTheDocument();
  });

  it("should show Pause label when isPlaying=true", () => {
    render(<AnimationControlsUI {...makeProps({ isPlaying: true })} />);
    expect(screen.getByLabelText("Pause")).toBeInTheDocument();
    expect(screen.queryByLabelText("Play")).not.toBeInTheDocument();
  });

  it("should disable Prev and Reset at start (currentStep=-1)", () => {
    render(<AnimationControlsUI {...makeProps({ currentStep: -1 })} />);
    expect(screen.getByLabelText("Previous step")).toBeDisabled();
    expect(screen.getByLabelText("Reset animation")).toBeDisabled();
  });

  it("should disable Next and Last at end (currentStep=totalSteps-1)", () => {
    render(
      <AnimationControlsUI
        {...makeProps({ currentStep: 4, totalSteps: 5 })}
      />
    );
    expect(screen.getByLabelText("Next step")).toBeDisabled();
    expect(screen.getByLabelText("Jump to last step")).toBeDisabled();
  });

  it("should cycle speed on click: 1x -> 1.5x -> 2x -> 0.5x -> 1x", () => {
    const onSpeedChange = vi.fn();
    const { rerender } = render(
      <AnimationControlsUI {...makeProps({ speed: 1, onSpeedChange })} />
    );
    const speedBtn = screen.getByLabelText(/Playback speed/);

    // 1x -> 1.5x
    fireEvent.click(speedBtn);
    expect(onSpeedChange).toHaveBeenLastCalledWith(1.5);

    // Re-render with speed=1.5, click -> 2x
    rerender(
      <AnimationControlsUI {...makeProps({ speed: 1.5, onSpeedChange })} />
    );
    fireEvent.click(speedBtn);
    expect(onSpeedChange).toHaveBeenLastCalledWith(2);

    // Re-render with speed=2, click -> 0.5x
    rerender(
      <AnimationControlsUI {...makeProps({ speed: 2, onSpeedChange })} />
    );
    fireEvent.click(speedBtn);
    expect(onSpeedChange).toHaveBeenLastCalledWith(0.5);

    // Re-render with speed=0.5, click -> 1x
    rerender(
      <AnimationControlsUI {...makeProps({ speed: 0.5, onSpeedChange })} />
    );
    fireEvent.click(speedBtn);
    expect(onSpeedChange).toHaveBeenLastCalledWith(1);
  });

  it("should set progress bar fill width to match progress", () => {
    // currentStep=2, totalSteps=5 -> progress = (2+1)/5 = 60%
    const { container } = render(
      <AnimationControlsUI
        {...makeProps({ currentStep: 2, totalSteps: 5 })}
      />
    );
    const fill = container.querySelector(
      ".cli-snippet-progress-fill"
    ) as HTMLElement;
    expect(fill).toBeInTheDocument();
    expect(fill.style.width).toBe("60%");
  });

  describe("keyboard support", () => {
    it("should toggle play/pause with Space", () => {
      const onPlay = vi.fn();
      const onPause = vi.fn();
      const { rerender } = render(
        <AnimationControlsUI
          {...makeProps({ isPlaying: false, onPlay, onPause })}
        />
      );
      const toolbar = screen.getByRole("toolbar");

      // Space when paused -> onPlay
      fireEvent.keyDown(toolbar, { key: " " });
      expect(onPlay).toHaveBeenCalledTimes(1);
      expect(onPause).not.toHaveBeenCalled();

      // Now re-render as playing and press Space again -> onPause
      rerender(
        <AnimationControlsUI
          {...makeProps({ isPlaying: true, onPlay, onPause })}
        />
      );
      fireEvent.keyDown(toolbar, { key: " " });
      expect(onPause).toHaveBeenCalledTimes(1);
    });

    it("should call onNext on ArrowRight", () => {
      const onNext = vi.fn();
      render(<AnimationControlsUI {...makeProps({ onNext })} />);
      const toolbar = screen.getByRole("toolbar");
      fireEvent.keyDown(toolbar, { key: "ArrowRight" });
      expect(onNext).toHaveBeenCalledTimes(1);
    });

    it("should call onPause + onReset on Escape", () => {
      const onPause = vi.fn();
      const onReset = vi.fn();
      render(
        <AnimationControlsUI {...makeProps({ onPause, onReset })} />
      );
      const toolbar = screen.getByRole("toolbar");
      fireEvent.keyDown(toolbar, { key: "Escape" });
      expect(onPause).toHaveBeenCalledTimes(1);
      expect(onReset).toHaveBeenCalledTimes(1);
    });
  });
});
