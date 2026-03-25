import { render, screen, fireEvent } from "@testing-library/react";
import CollapseGutter from "./CollapseGutter";
import type { BracketPair } from "./hooks/useCollapsing";

function makePair(overrides: Partial<BracketPair> = {}): BracketPair {
  return {
    id: "bp-0",
    type: "{}",
    openLine: 1,
    openCol: 0,
    closeLine: 5,
    closeCol: 0,
    depth: 0,
    children: [],
    ...overrides,
  };
}

describe("CollapseGutter", () => {
  it("should render fold buttons on correct lines", () => {
    const pairs: BracketPair[] = [
      makePair({ id: "bp-0", openLine: 1, closeLine: 4 }),
      makePair({ id: "bp-1", openLine: 5, closeLine: 8 }),
    ];
    const isCollapsed = vi.fn().mockReturnValue(false);
    const { container } = render(
      <CollapseGutter
        pairs={pairs}
        onToggle={vi.fn()}
        isCollapsed={isCollapsed}
        lineCount={10}
      />
    );
    // Buttons on lines 1 and 5
    const buttons = container.querySelectorAll(".cli-snippet-gutter-btn");
    expect(buttons).toHaveLength(2);

    // Spacers fill the remaining 8 lines
    const spacers = container.querySelectorAll(".cli-snippet-gutter-spacer");
    expect(spacers).toHaveLength(8);
  });

  it("should show down-triangle for expanded pair", () => {
    const pairs = [makePair({ id: "bp-0", openLine: 1, closeLine: 3 })];
    const isCollapsed = vi.fn().mockReturnValue(false);
    const { container } = render(
      <CollapseGutter
        pairs={pairs}
        onToggle={vi.fn()}
        isCollapsed={isCollapsed}
        lineCount={5}
      />
    );
    const btn = container.querySelector(".cli-snippet-gutter-btn")!;
    // \u25BC = black down-pointing triangle
    expect(btn.textContent).toBe("\u25BC");
  });

  it("should show right-triangle for collapsed pair", () => {
    const pairs = [makePair({ id: "bp-0", openLine: 1, closeLine: 3 })];
    const isCollapsed = vi.fn().mockReturnValue(true);
    const { container } = render(
      <CollapseGutter
        pairs={pairs}
        onToggle={vi.fn()}
        isCollapsed={isCollapsed}
        lineCount={5}
      />
    );
    const btn = container.querySelector(".cli-snippet-gutter-btn")!;
    // \u25B6 = black right-pointing triangle
    expect(btn.textContent).toBe("\u25B6");
  });

  it("should call onToggle with pair id on click", () => {
    const onToggle = vi.fn();
    const pairs = [makePair({ id: "bp-42", openLine: 2, closeLine: 6 })];
    const { container } = render(
      <CollapseGutter
        pairs={pairs}
        onToggle={onToggle}
        isCollapsed={() => false}
        lineCount={8}
      />
    );
    const btn = container.querySelector(".cli-snippet-gutter-btn")!;
    fireEvent.click(btn);
    expect(onToggle).toHaveBeenCalledWith("bp-42");
  });

  it("should return null when there are no multi-line pairs", () => {
    // Single-line pairs (closeLine <= openLine) are skipped by the component
    const pairs = [
      makePair({ id: "bp-0", openLine: 3, closeLine: 3 }),
      makePair({ id: "bp-1", openLine: 7, closeLine: 7 }),
    ];
    const { container } = render(
      <CollapseGutter
        pairs={pairs}
        onToggle={vi.fn()}
        isCollapsed={() => false}
        lineCount={10}
      />
    );
    // Component returns null -> nothing rendered
    expect(container.querySelector(".cli-snippet-gutter")).not.toBeInTheDocument();
  });

  it("should have correct ARIA attributes on fold buttons", () => {
    const pairs = [makePair({ id: "bp-0", openLine: 1, closeLine: 5 })];
    const isCollapsed = vi.fn().mockReturnValue(false);
    const { container } = render(
      <CollapseGutter
        pairs={pairs}
        onToggle={vi.fn()}
        isCollapsed={isCollapsed}
        lineCount={5}
      />
    );
    const btn = container.querySelector(".cli-snippet-gutter-btn")!;
    expect(btn.getAttribute("role")).toBe("button");
    expect(btn.getAttribute("aria-expanded")).toBe("true");
    expect(btn.getAttribute("aria-label")).toBe("Collapse block");

    // Now re-render with collapsed = true
    isCollapsed.mockReturnValue(true);
    const { container: c2 } = render(
      <CollapseGutter
        pairs={pairs}
        onToggle={vi.fn()}
        isCollapsed={isCollapsed}
        lineCount={5}
      />
    );
    const btn2 = c2.querySelector(".cli-snippet-gutter-btn")!;
    expect(btn2.getAttribute("aria-expanded")).toBe("false");
    expect(btn2.getAttribute("aria-label")).toBe("Expand block");
  });
});
