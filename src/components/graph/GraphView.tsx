// src/components/graph/GraphView.tsx

import { useEffect, useCallback, useState, useRef } from "react";
import type Graph from "graphology";
import { SigmaContainer } from "@react-sigma/core";
import "@react-sigma/core/lib/style.css";
import { useGraphData } from "./useGraphData";
import { CATEGORY_LABELS, getNodeColor } from "./graph.shared";
import { resolveThemeColor, getSigmaBackground } from "./graph.constants";
import GraphEvents, { type TooltipData } from "./GraphEvents";
import {
  DragController,
  LayoutController,
  ThemeObserver,
  FilterController,
} from "./GraphControllers";
import GraphToolbar from "./GraphToolbar";
import GraphSearch from "./GraphSearch";

// --- Main component ---
export interface GraphViewProps {
  mode: "global" | "local";
  focusNode?: string;
  depth?: number;
  filterTags?: string[];
  filterCategories?: string[];
  filterTypes?: string[];
  filterStatuses?: string[];
  filterContentTypes?: string[];
  filterLanguages?: string[];
  tagMode?: "union" | "intersection" | "exclusion";
  // External data (provided by GlobalGraphPage to avoid double-fetch)
  graph?: Graph | null;
  loading?: boolean;
  error?: string;
  visibleNodes?: () => Set<string> | null;
  hasActiveFilters?: boolean;
  // Display
  height?: string;
  className?: string;
  showToolbar?: boolean;
  showWatermark?: boolean;
}

export default function GraphView({
  mode,
  focusNode,
  depth = 2,
  filterTags,
  filterCategories,
  filterTypes,
  filterStatuses,
  filterContentTypes,
  filterLanguages,
  tagMode,
  graph: externalGraph,
  loading: externalLoading,
  error: externalError,
  visibleNodes: externalVisibleNodes,
  hasActiveFilters: externalHasActiveFilters,
  height = "600px",
  className = "",
  showToolbar = false,
  showWatermark = false,
}: GraphViewProps) {
  // Always call useGraphData (React rules), but skip fetch when external data provided
  const hasExternalData = externalGraph !== undefined;
  const internal = useGraphData({
    mode,
    focusNode,
    depth,
    filterTags,
    filterCategories,
    filterTypes,
    filterStatuses,
    filterContentTypes,
    filterLanguages,
    tagMode,
    skip: hasExternalData,
  });

  // Use external data when available, fall back to internal
  const graph = hasExternalData ? externalGraph : internal.graph;
  const loading = hasExternalData
    ? (externalLoading ?? false)
    : internal.loading;
  const error = hasExternalData ? (externalError ?? null) : internal.error;
  const visibleNodes = externalVisibleNodes ?? internal.visibleNodes;
  const hasActiveFilters =
    externalHasActiveFilters ?? internal.hasActiveFilters;

  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Ctrl+K / Cmd+K to open search
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Apply category colors (in effect, not render path — avoids mutation hazard when graph is prop-owned)
  useEffect(() => {
    if (!graph) return;
    graph.forEachNode(node => {
      const category = graph.getNodeAttribute(node, "category") as string;
      graph.setNodeAttribute(node, "color", getNodeColor(category));
    });
  }, [graph]);

  // WebGL cleanup on unmount
  useEffect(() => {
    return () => {
      if (graph) graph.clear();
    };
  }, [graph]);

  const handleNodeClick = useCallback((_nodeId: string, url: string) => {
    if (!url) return;
    import("astro:transitions/client")
      .then(({ navigate }) => navigate(url))
      .catch(() => {
        window.location.href = url;
      });
  }, []);

  if (loading) {
    return (
      <div
        className={className}
        style={{
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ color: "var(--foreground)", opacity: 0.6 }}>
          Loading graph...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={className}
        style={{
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ color: "var(--error, #f85149)" }}>
          Failed to load graph: {error}
        </span>
      </div>
    );
  }

  if (!graph || graph.order === 0) {
    return (
      <div
        className={className}
        style={{
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ color: "var(--foreground)", opacity: 0.6 }}>
          No connections found.
        </span>
      </div>
    );
  }

  // Collect visible categories for legend
  const visibleCategories = new Set<string>();
  graph.forEachNode(node => {
    const cat = graph.getNodeAttribute(node, "category") as string;
    if (cat) visibleCategories.add(cat);
  });

  const labelColor = resolveThemeColor("--foreground", "#e6edf3");

  return (
    <div
      className={className}
      style={{ position: "relative" }}
      ref={containerRef}
    >
      {/* Wrapper uses CSS var() directly — always matches current theme instantly, no race condition */}
      <div style={{ height, position: "relative", background: "var(--background, #0d1117)" }}>
        <SigmaContainer
          graph={graph}
          style={{ width: "100%", height: "100%" }}
          settings={{
            renderEdgeLabels: false,
            labelRenderedSizeThreshold: 8,
            labelColor: { color: labelColor },
            defaultEdgeColor: "#30363d",
            defaultNodeColor: "#8b949e",
            labelFont: "monospace",
            labelSize: 11,
          }}
        >
          <GraphEvents
            onNodeClick={handleNodeClick}
            onHoverChange={setTooltip}
            onHoveredNodeChange={setHoveredNode}
          />
          <LayoutController />
          <DragController />
          <ThemeObserver />
          <FilterController
            visibleNodes={visibleNodes}
            hasActiveFilters={hasActiveFilters}
            hoveredNode={hoveredNode}
          />
          {showToolbar && (
            <>
              <GraphToolbar
                categories={[...visibleCategories].sort()}
                onSearchOpen={() => setSearchOpen(true)}
              />
              <GraphSearch
                open={searchOpen}
                onClose={() => setSearchOpen(false)}
              />
            </>
          )}
        </SigmaContainer>

        {/* Tooltip */}
        {tooltip && (
          <div
            style={{
              position: "absolute",
              left: tooltip.mouseX + 15,
              top: tooltip.mouseY - 15,
              background: "var(--muted, #161b22)",
              border: "1px solid var(--border, #30363d)",
              borderRadius: "0.375rem",
              padding: "0.375rem 0.625rem",
              fontSize: "0.75rem",
              color: "var(--foreground, #e6edf3)",
              pointerEvents: "none",
              zIndex: 10,
              whiteSpace: "nowrap",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              maxWidth: "300px",
            }}
          >
            <div style={{ fontWeight: 600 }}>{tooltip.label}</div>
            <div style={{ opacity: 0.7, fontSize: "0.65rem" }}>
              {CATEGORY_LABELS[tooltip.category] || tooltip.category}
              {tooltip.type === "post" ? " · Published" : " · Project"}
            </div>
          </div>
        )}

        {/* Watermark */}
        {showWatermark && (
          <div
            style={{
              position: "absolute",
              bottom: 8,
              right: 12,
              fontSize: "0.9rem",
              color: "var(--foreground, #e6edf3)",
              opacity: 0.25,
              pointerEvents: "none",
              fontFamily: "monospace",
            }}
          >
            Copyright &copy; {new Date().getFullYear()} &nbsp;|&nbsp; All rights
            reserved.
          </div>
        )}
      </div>
    </div>
  );
}
