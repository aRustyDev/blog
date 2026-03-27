import { useMemo, type FC } from "react";
import type { BracketPair } from "./hooks/useCollapsing";

interface CollapseGutterProps {
  pairs: BracketPair[];
  onToggle: (id: string) => void;
  isCollapsed: (id: string) => boolean;
  /** Total number of lines in the code block */
  lineCount: number;
}

/**
 * Fold/unfold icon column rendered alongside code lines.
 *
 * - Shows triangles (collapsed/expanded) only on lines that START a multi-line pair.
 * - Hidden on mobile (<640px) via CSS.
 * - Uses role="button" + aria-expanded for accessibility.
 */
const CollapseGutter: FC<CollapseGutterProps> = ({
  pairs,
  onToggle,
  isCollapsed,
  lineCount,
}) => {
  // Build a map: line number (1-based) -> pair that starts on that line (multi-line only)
  const lineToFoldPair = useMemo(() => {
    const map = new Map<number, BracketPair>();
    for (const pair of pairs) {
      if (pair.closeLine <= pair.openLine) continue; // skip single-line pairs
      // If multiple pairs start on the same line, use the outermost (lowest depth)
      const existing = map.get(pair.openLine);
      if (!existing || pair.depth < existing.depth) {
        map.set(pair.openLine, pair);
      }
    }
    return map;
  }, [pairs]);

  if (lineToFoldPair.size === 0) return null;

  const gutterLines: React.ReactNode[] = [];
  for (let line = 1; line <= lineCount; line++) {
    const pair = lineToFoldPair.get(line);
    if (pair) {
      const collapsed = isCollapsed(pair.id);
      gutterLines.push(
        <button
          key={line}
          className="cli-snippet-gutter-btn"
          onClick={() => onToggle(pair.id)}
          role="button"
          aria-expanded={!collapsed}
          aria-label={collapsed ? "Expand block" : "Collapse block"}
          type="button"
        >
          {collapsed ? "\u25B6" : "\u25BC"}
        </button>
      );
    } else {
      gutterLines.push(
        <span key={line} className="cli-snippet-gutter-spacer" />
      );
    }
  }

  return (
    <div className="cli-snippet-gutter" aria-hidden="false">
      {gutterLines}
    </div>
  );
};

export default CollapseGutter;
