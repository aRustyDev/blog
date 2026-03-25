# Phase 4: Component Tests

## Goal

Test React component rendering, user interactions, and state management using @testing-library/react.

## Components to Test

### `CLISnippetCore`

| Test Case | Setup | Assert |
|-----------|-------|--------|
| Renders pre-rendered HTML | `html="<pre>...</pre>"` | HTML injected via dangerouslySetInnerHTML |
| Shows Chrome when enabled | `chrome={true}, title="test"` | dots + title visible |
| Hides Chrome when disabled | `chrome={false}` | no `.cli-snippet-chrome` element |
| Copy button shows | `showCopy={true}` | button with aria-label "Copy code as markdown" |
| Copy button hidden | `showCopy={false}` | no copy button |
| Loading skeleton when no HTML | `html={undefined}, code={undefined}` | `.cli-snippet-skeleton` visible |
| Error fallback | `code="hello", html={undefined}` (Shiki won't load in test) | `<pre><code>hello</code></pre>` |
| Render prop receives tokenMap | `html="...", children={(tm) => <div data-testid="child">{tm ? 'yes' : 'no'}</div>}` | child renders |

### `AnimationControls`

| Test Case | Setup | Assert |
|-----------|-------|--------|
| Renders all buttons | default props | reset, prev, play, next, last buttons visible |
| Play button toggles to Pause | `isPlaying={true}` | aria-label "Pause" |
| Prev disabled at start | `currentStep={-1}` | prev button disabled |
| Next disabled at end | `currentStep={totalSteps-1}` | next button disabled |
| Speed cycles on click | click speed button | cycles 1x → 1.5x → 2x → 0.5x → 1x |
| Progress bar width | `currentStep={2}, totalSteps={5}` | fill width = 60% |
| Keyboard: Space toggles play | focus + press Space | `onPlay` or `onPause` called |
| Keyboard: ArrowRight next | focus + press ArrowRight | `onNext` called |
| Keyboard: Escape resets | focus + press Escape | `onPause` + `onReset` called |

### `CollapseGutter`

| Test Case | Setup | Assert |
|-----------|-------|--------|
| Renders fold icons on correct lines | 2 multi-line pairs starting on lines 1 and 5, lineCount=10 | buttons on lines 1 and 5, spacers elsewhere |
| Shows ▼ for expanded pair | `isCollapsed("id") = false` | Unicode ▼ |
| Shows ▶ for collapsed pair | `isCollapsed("id") = true` | Unicode ▶ |
| Click calls onToggle | click button | `onToggle` called with pair id |
| Hidden when no multi-line pairs | single-line pairs only | returns null |
| ARIA attributes | — | `role="button"`, `aria-expanded`, `aria-label` |

### `CLISnippetCollapsible`

| Test Case | Setup | Assert |
|-----------|-------|--------|
| Renders with collapsible class | default | `.cli-snippet-collapsible` class present |
| Disables collapsing | `collapsibleGroups={false}` | no gutter rendered |
| Passes through Core props | `title="Test"` | title visible in chrome |

### `CLISnippetAnimated`

| Test Case | Setup | Assert |
|-----------|-------|--------|
| Renders controls when steps provided | `steps=[...]` | `.cli-snippet-controls` visible |
| Hides controls | `showControls={false}` | no controls |
| Passes through Core props | `title="Test"` | title visible |

## Testing Approach

```typescript
import { render, screen, fireEvent } from "@testing-library/react";
import AnimationControlsUI from "./AnimationControls";

describe("AnimationControls", () => {
  const defaultProps = {
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
  };

  it("should call onPlay when play button clicked", () => {
    render(<AnimationControlsUI {...defaultProps} />);
    fireEvent.click(screen.getByLabelText("Play"));
    expect(defaultProps.onPlay).toHaveBeenCalled();
  });
});
```

## Dependencies

- `@testing-library/react` (from Phase 1)
- `@testing-library/jest-dom` (from Phase 1)
- `happy-dom` environment (from Phase 1)

## Acceptance Criteria

- [ ] CLISnippetCore: 8 test cases covering all render states
- [ ] AnimationControls: 9 test cases covering buttons, keyboard, progress
- [ ] CollapseGutter: 6 test cases covering rendering and ARIA
- [ ] CLISnippetCollapsible: 3 test cases
- [ ] CLISnippetAnimated: 3 test cases
- [ ] All tests pass with `npx vitest run`
- [ ] Total: ~29 component test cases
