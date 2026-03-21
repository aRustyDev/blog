// src/components/graph/GraphControllers.tsx
// Null-returning sigma context consumers for side effects.
// Bundled because they share: useSigma() pattern, no JSX output, no shared state.

import { useEffect, useRef, type FC } from "react";
import { useSigma } from "@react-sigma/core";
import {
  resolveThemeColor,
  resolveHexColor,
  getSigmaBackground,
  resolveDimColors,
  dimColorsRef,
} from "./graph.constants";

// --- Drag ---
export const DragController: FC = () => {
  const sigma = useSigma();
  const dragStateRef = useRef<{ node: string } | null>(null);

  useEffect(() => {
    const graph = sigma.getGraph();
    let dragging = false;

    const handleDownNode = (event: {
      node: string;
      event: { original: MouseEvent | TouchEvent };
    }) => {
      dragging = true;
      dragStateRef.current = { node: event.node };
      sigma.getCamera().disable();
    };
    const handleMouseMove = (event: { x: number; y: number }) => {
      if (!dragging || !dragStateRef.current) return;
      const pos = sigma.viewportToGraph(event);
      graph.setNodeAttribute(dragStateRef.current.node, "x", pos.x);
      graph.setNodeAttribute(dragStateRef.current.node, "y", pos.y);
    };
    const handleUp = () => {
      if (dragging) {
        dragging = false;
        dragStateRef.current = null;
        sigma.getCamera().enable();
      }
    };

    sigma.on("downNode", handleDownNode);
    sigma.getMouseCaptor().on("mousemovebody", handleMouseMove);
    sigma.getMouseCaptor().on("mouseup", handleUp);
    return () => {
      sigma.off("downNode", handleDownNode);
      sigma.getMouseCaptor().off("mousemovebody", handleMouseMove);
      sigma.getMouseCaptor().off("mouseup", handleUp);
    };
  }, [sigma]);

  return null;
};

// --- Layout ---
export const LayoutController: FC = () => {
  const sigma = useSigma();

  useEffect(() => {
    import("graphology-layout-forceatlas2").then(mod => {
      const fa2 = mod.default ?? mod;
      const graph = sigma.getGraph();
      if (graph.order === 0) return;
      const settings = fa2.inferSettings(graph);
      fa2.assign(graph, { iterations: 100, settings });
      sigma.refresh();
    });
  }, [sigma]);

  return null;
};

// --- Theme Observer (ADR-0008: updates all theme-reactive sigma settings) ---
// Updates dimColorsRef (from graph.constants) for FilterController and GraphSearch

export const ThemeObserver: FC = () => {
  const sigma = useSigma();

  useEffect(() => {
    const updateColors = () => {
      // Label color
      sigma.setSetting("labelColor", {
        color: resolveThemeColor("--foreground", "#e6edf3"),
      });

      // Default edge/node colors
      sigma.setSetting(
        "defaultEdgeColor",
        resolveThemeColor("--border", "#30363d")
      );
      sigma.setSetting(
        "defaultNodeColor",
        resolveHexColor("--foreground", "#8b949e") + "60"
      );

      // Canvas background
      const bg = getSigmaBackground();
      const container = sigma.getContainer();
      if (container) {
        container.style.background = bg;
        if (container.parentElement) {
          container.parentElement.style.background = bg;
        }
      }

      // Cache dim colors for reducers (resolved once, not per frame)
      dimColorsRef.current = resolveDimColors();

      sigma.refresh();
    };

    const rafId = requestAnimationFrame(updateColors);

    const observer = new MutationObserver(updateColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [sigma]);

  return null;
};

// --- Filter Controller (uses cached dim colors from ThemeObserver) ---
interface FilterControllerProps {
  visibleNodes: () => Set<string> | null;
  hasActiveFilters: boolean;
  hoveredNode: string | null;
}

export const FilterController: FC<FilterControllerProps> = ({
  visibleNodes,
  hasActiveFilters,
  hoveredNode,
}) => {
  const sigma = useSigma();

  useEffect(() => {
    const visible = hasActiveFilters ? visibleNodes() : null;
    const graph = sigma.getGraph();

    let hoverNeighbors: Set<string> | null = null;
    if (hoveredNode && graph.hasNode(hoveredNode)) {
      hoverNeighbors = new Set(graph.neighbors(hoveredNode));
      hoverNeighbors.add(hoveredNode);
    }

    const needsReducer = visible || hoverNeighbors;

    if (!needsReducer) {
      sigma.setSetting("nodeReducer", null);
      sigma.setSetting("edgeReducer", null);
      sigma.refresh();
      return;
    }

    // Capture dim colors at effect time (not per frame inside reducer)
    const dim = dimColorsRef.current;

    sigma.setSetting(
      "nodeReducer",
      (node: string, data: Record<string, unknown>) => {
        const passesFilter = !visible || visible.has(node);
        const passesHover = !hoverNeighbors || hoverNeighbors.has(node);
        if (passesFilter && passesHover) return data;
        if (!passesFilter)
          return { ...data, color: dim.nodeFiltered, label: "", size: 2 };
        return { ...data, color: dim.nodeDimmed, label: "" };
      }
    );

    sigma.setSetting(
      "edgeReducer",
      (edge: string, data: Record<string, unknown>) => {
        const src = graph.source(edge);
        const tgt = graph.target(edge);
        const srcVisible = !visible || visible.has(src);
        const tgtVisible = !visible || visible.has(tgt);
        const srcHover = !hoverNeighbors || hoverNeighbors.has(src);
        const tgtHover = !hoverNeighbors || hoverNeighbors.has(tgt);
        if (srcVisible && tgtVisible && srcHover && tgtHover) return data;
        if (!srcVisible || !tgtVisible)
          return { ...data, color: dim.edgeFiltered, size: 0.5 };
        return { ...data, color: dim.edgeDimmed };
      }
    );

    sigma.refresh();
  }, [visibleNodes, hasActiveFilters, hoveredNode, sigma]);

  return null;
};
