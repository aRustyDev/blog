// src/components/graph/GraphToolbar.tsx

import { useCallback, useState, type FC } from "react";
import { useSigma } from "@react-sigma/core";
import { CATEGORY_COLORS, CATEGORY_LABELS } from "./graph.shared";

/** Animation duration respecting prefers-reduced-motion */
function animDuration(): number {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 300;
}

interface GraphToolbarProps {
  categories: string[];
  onSearchOpen: () => void;
}

const GraphToolbar: FC<GraphToolbarProps> = ({ categories, onSearchOpen }) => {
  const [legendOpen, setLegendOpen] = useState(true);
  const sigma = useSigma();

  const handleNormalize = useCallback(() => {
    const graph = sigma.getGraph();

    // Reset all nodes to uniform size
    graph.forEachNode(node => {
      graph.setNodeAttribute(node, "size", 8);
    });

    // Group nodes by category, arrange each group in a cluster on a large circle
    const groups = new Map<string, string[]>();
    graph.forEachNode(node => {
      const cat =
        (graph.getNodeAttribute(node, "category") as string) || "other";
      if (!groups.has(cat)) groups.set(cat, []);
      groups.get(cat)!.push(node);
    });

    const groupKeys = [...groups.keys()];
    const groupCount = groupKeys.length;

    groupKeys.forEach((cat, gi) => {
      const nodes = groups.get(cat)!;
      const groupAngle = (2 * Math.PI * gi) / groupCount;
      const outerRadius = 80;
      const cx = outerRadius * Math.cos(groupAngle);
      const cy = outerRadius * Math.sin(groupAngle);
      const innerRadius = Math.max(5, nodes.length * 1.5);
      nodes.forEach((node, ni) => {
        const nodeAngle = (2 * Math.PI * ni) / nodes.length;
        graph.setNodeAttribute(
          node,
          "x",
          cx + innerRadius * Math.cos(nodeAngle)
        );
        graph.setNodeAttribute(
          node,
          "y",
          cy + innerRadius * Math.sin(nodeAngle)
        );
      });
    });

    // ForceAtlas2 with strong gravity for petri-dish shape
    import("graphology-layout-forceatlas2").then(mod => {
      const fa2 = mod.default ?? mod;
      const settings = fa2.inferSettings(graph);
      fa2.assign(graph, {
        iterations: 120,
        settings: {
          ...settings,
          gravity: 3,
          scalingRatio: 2,
          barnesHutOptimize: true,
          strongGravityMode: true,
        },
      });
      sigma.refresh();
      sigma
        .getCamera()
        .animate({ x: 0.5, y: 0.5, ratio: 1 }, { duration: animDuration() });
    });
  }, [sigma]);

  const handleResetView = useCallback(() => {
    sigma.getCamera().animate({ x: 0.5, y: 0.5, ratio: 1 }, { duration: animDuration() });
  }, [sigma]);

  const handleCategoryClick = useCallback(
    (category: string) => {
      const graph = sigma.getGraph();
      const matching: { x: number; y: number }[] = [];
      graph.forEachNode(node => {
        if (graph.getNodeAttribute(node, "category") === category) {
          const display = sigma.getNodeDisplayData(node);
          if (display) matching.push({ x: display.x, y: display.y });
        }
      });
      if (matching.length === 0) return;

      const cx = matching.reduce((s, n) => s + n.x, 0) / matching.length;
      const cy = matching.reduce((s, n) => s + n.y, 0) / matching.length;
      let ratio = 0.5;
      if (matching.length > 1) {
        const maxDist = Math.max(
          ...matching.map(n => Math.sqrt((n.x - cx) ** 2 + (n.y - cy) ** 2))
        );
        ratio = Math.min(1, Math.max(0.1, maxDist * 3));
      }
      sigma.getCamera().animate({ x: cx, y: cy, ratio }, { duration: animDuration() });
    },
    [sigma]
  );

  const itemStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.375rem",
    background: "none",
    border: "none",
    color: "inherit",
    cursor: "pointer",
    padding: "0.2rem 0.25rem",
    borderRadius: "0.25rem",
    fontSize: "0.7rem",
    textAlign: "left",
    width: "100%",
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 8,
        left: 8,
        zIndex: 5,
        background: "var(--muted, #161b22)",
        border: "1px solid var(--border, #30363d)",
        borderRadius: "0.375rem",
        fontSize: "0.7rem",
        color: "var(--foreground, #e6edf3)",
        maxWidth: "240px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      }}
    >
      {/* Control buttons */}
      <div
        style={{
          display: "flex",
          gap: "0.25rem",
          padding: "0.375rem 0.5rem",
          borderBottom: "1px solid var(--border, #30363d)",
        }}
      >
        <button
          onClick={handleResetView}
          style={{
            ...itemStyle,
            width: "auto",
            fontWeight: 600,
            fontSize: "0.65rem",
          }}
          title="Reset camera to center"
        >
          Re-center
        </button>
        <span
          style={{
            width: 1,
            alignSelf: "stretch",
            background: "var(--border, #30363d)",
            opacity: 0.5,
          }}
        />
        <button
          onClick={handleNormalize}
          style={{
            ...itemStyle,
            width: "auto",
            fontWeight: 600,
            fontSize: "0.65rem",
          }}
          title="Normalize sizes and re-layout"
        >
          Normalize
        </button>
        <span
          style={{
            width: 1,
            alignSelf: "stretch",
            background: "var(--border, #30363d)",
            opacity: 0.5,
          }}
        />
        <button
          onClick={onSearchOpen}
          style={{
            ...itemStyle,
            width: "auto",
            fontWeight: 600,
            fontSize: "1.1rem",
            lineHeight: 1,
            padding: "0.1rem 0.375rem",
          }}
          title="Search nodes (Ctrl+K)"
          aria-label="Search nodes"
        >
          ⌕
        </button>
      </div>

      {/* Legend toggle */}
      <button
        onClick={() => setLegendOpen(!legendOpen)}
        aria-expanded={legendOpen}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.375rem",
          background: "none",
          border: "none",
          color: "inherit",
          cursor: "pointer",
          padding: "0.375rem 0.5rem",
          fontSize: "0.7rem",
          fontWeight: 600,
          width: "100%",
        }}
      >
        {legendOpen ? "▾" : "▸"} Legend
      </button>

      {/* Legend entries */}
      {legendOpen && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.125rem",
            padding: "0 0.5rem 0.5rem",
            maxHeight: "300px",
            overflowY: "auto",
          }}
        >
          {categories
            .filter(cat => CATEGORY_COLORS[cat])
            .map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                style={itemStyle}
                onMouseEnter={e =>
                  (e.currentTarget.style.background = "var(--border, #30363d)")
                }
                onMouseLeave={e => (e.currentTarget.style.background = "none")}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: CATEGORY_COLORS[cat],
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                {CATEGORY_LABELS[cat] || cat}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default GraphToolbar;
