// src/components/graph/GraphView.tsx

import { useEffect, useCallback, useState, useRef, useMemo, type FC } from "react";
import Fuse from "fuse.js";
import {
  SigmaContainer,
  useRegisterEvents,
  useSigma,
} from "@react-sigma/core";
import "@react-sigma/core/lib/style.css";
import { useGraphData } from "./useGraphData";

// Category → color mapping (exported for legend)
export const CATEGORY_COLORS: Record<string, string> = {
  "blog-post": "#58a6ff",
  "deep-dive-kernels": "#f97583",
  "deep-dive-editors": "#d2a8ff",
  "deep-dive-programming-swift": "#ff7b72",
  "deep-dive-programming-rust": "#ffa657",
  "deep-dive-programming-c": "#79c0ff",
  "deep-dive-programming-comparing": "#7ee787",
  "deep-dive-programming-go": "#79c0ff",
  "deep-dive-programming-zig": "#ffa657",
  "deep-dive-nix": "#a5d6ff",
  "deep-dive-pcb-design": "#d29922",
  "deep-dive-reverse-engineering": "#f85149",
  "deep-dive-ebpf": "#7ee787",
  "deep-dive-host-forensics": "#ff9bce",
  "deep-dive-memory-forensics": "#f0883e",
  "deep-dive-mobile-forensics": "#db61a2",
  "deep-dive-cloud-forensics": "#56d4dd",
  "deep-dive-filesystem-forensics": "#e3b341",
  "deep-dive-database-forensics": "#bc8cff",
  "deep-dive-benchmarking": "#79c0ff",
  "deep-dive-graph-agent": "#79c0ff",
  "deep-dive-indirect-prompt": "#f85149",
  "deep-dive-llm-backdoor": "#f85149",
  "deep-dive-semantic-testing": "#7ee787",
  "deep-dive": "#8b949e",
  "keebs": "#d2a8ff",
  "eli5": "#3fb950",
  "project": "#8b949e",
  "feature": "#58a6ff",
  "other": "#8b949e",
};

export const CATEGORY_LABELS: Record<string, string> = {
  "blog-post": "Blog Posts",
  "deep-dive-kernels": "Kernels",
  "deep-dive-editors": "Editors",
  "deep-dive-programming-swift": "Swift",
  "deep-dive-programming-rust": "Rust",
  "deep-dive-programming-c": "C",
  "deep-dive-programming-comparing": "Comparisons",
  "deep-dive-programming-go": "Go",
  "deep-dive-programming-zig": "Zig",
  "deep-dive-nix": "Nix",
  "deep-dive-pcb-design": "PCB Design",
  "deep-dive-reverse-engineering": "Reverse Engineering",
  "deep-dive-ebpf": "eBPF",
  "deep-dive-host-forensics": "Host Forensics",
  "deep-dive-memory-forensics": "Memory Forensics",
  "deep-dive-mobile-forensics": "Mobile Forensics",
  "deep-dive-cloud-forensics": "Cloud Forensics",
  "deep-dive-filesystem-forensics": "Filesystem Forensics",
  "deep-dive-database-forensics": "Database Forensics",
  "deep-dive-benchmarking": "Benchmarking",
  "deep-dive-graph-agent": "Agent Memory",
  "deep-dive-indirect-prompt": "Prompt Injection",
  "deep-dive-llm-backdoor": "LLM Security",
  "deep-dive-semantic-testing": "Semantic Testing",
  "deep-dive": "Deep Dives (Other)",
  "keebs": "Keyboards",
  "eli5": "ELI5",
  "project": "Projects",
  "feature": "Features",
  "other": "Other",
};

function getNodeColor(category?: string): string {
  if (!category) return "#8b949e";
  return CATEGORY_COLORS[category] || "#8b949e";
}

function resolveThemeColor(varName: string, fallback: string): string {
  try {
    const val = getComputedStyle(document.documentElement)
      .getPropertyValue(varName).trim();
    return val || fallback;
  } catch {
    return fallback;
  }
}

/** Lighten or darken a hex color by an amount (positive = lighter, negative = darker) */
function adjustColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, Math.max(0, ((num >> 16) & 0xff) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0xff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

/** Get a slightly offset background for the sigma canvas */
function getSigmaBackground(): string {
  const bg = resolveThemeColor("--background", "#0d1117");
  // Detect if light or dark by checking luminance
  const num = parseInt(bg.replace("#", ""), 16);
  const lum = (((num >> 16) & 0xff) * 0.299 + ((num >> 8) & 0xff) * 0.587 + (num & 0xff) * 0.114);
  // Dark theme: lighten slightly. Light theme: darken slightly.
  return adjustColor(bg, lum > 128 ? -12 : 12);
}

// --- Tooltip data ---
export interface TooltipData {
  label: string;
  category: string;
  type: string;
  mouseX: number;
  mouseY: number;
}

// --- Graph interactivity ---
interface GraphEventsProps {
  onNodeClick?: (nodeId: string, url: string) => void;
  onHoverChange?: (data: TooltipData | null) => void;
  onHoveredNodeChange?: (nodeId: string | null) => void;
}

const GraphEvents: FC<GraphEventsProps> = ({ onNodeClick, onHoverChange, onHoveredNodeChange }) => {
  const sigma = useSigma();
  const registerEvents = useRegisterEvents();

  useEffect(() => {
    const handlers = {
      enterNode: (event: { node: string; event: { x: number; y: number } }) => {
        const graph = sigma.getGraph();

        if (onHoverChange) {
          onHoverChange({
            label: graph.getNodeAttribute(event.node, "label") as string,
            category: graph.getNodeAttribute(event.node, "category") as string,
            type: graph.getNodeAttribute(event.node, "nodeType") as string,
            mouseX: event.event.x,
            mouseY: event.event.y,
          });
        }

        if (onHoveredNodeChange) onHoveredNodeChange(event.node);
      },

      leaveNode: () => {
        if (onHoverChange) onHoverChange(null);
        if (onHoveredNodeChange) onHoveredNodeChange(null);
      },

      clickNode: (event: { node: string }) => {
        const graph = sigma.getGraph();
        const url = graph.getNodeAttribute(event.node, "url") as string;
        if (onNodeClick) onNodeClick(event.node, url);
      },
    };

    registerEvents(handlers);
  }, [registerEvents, sigma, onNodeClick, onHoverChange, onHoveredNodeChange]);

  return null;
};

// --- Drag controller ---
const DragController: FC = () => {
  const sigma = useSigma();
  const dragStateRef = useRef<{
    node: string;
    startX: number;
    startY: number;
  } | null>(null);

  useEffect(() => {
    const graph = sigma.getGraph();
    let dragging = false;

    const handleDownNode = (event: { node: string; event: { original: MouseEvent | TouchEvent } }) => {
      dragging = true;
      dragStateRef.current = { node: event.node, startX: 0, startY: 0 };
      // Disable camera panning while dragging a node
      sigma.getCamera().disable();
    };

    const handleMouseMove = (event: { x: number; y: number }) => {
      if (!dragging || !dragStateRef.current) return;
      // Convert viewport coords to graph coords and update node position
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

// --- Layout controller ---
const LayoutController: FC = () => {
  const sigma = useSigma();

  useEffect(() => {
    import("graphology-layout-forceatlas2").then(mod => {
      const graph = sigma.getGraph();
      if (graph.order === 0) return;
      const settings = mod.inferSettings(graph);
      mod.assign(graph, { iterations: 100, settings });
      sigma.refresh();
    });
  }, [sigma]);

  return null;
};

// --- Theme observer ---
const ThemeObserver: FC = () => {
  const sigma = useSigma();

  useEffect(() => {
    const updateColors = () => {
      sigma.setSetting("labelColor", {
        color: resolveThemeColor("--foreground", "#e6edf3"),
      });
      // Update canvas background — set on container and its parent
      const bg = getSigmaBackground();
      const container = sigma.getContainer();
      if (container) {
        container.style.background = bg;
        if (container.parentElement) {
          container.parentElement.style.background = bg;
        }
      }
      sigma.refresh();
    };

    // Set initial (slight delay to ensure CSS variables are resolved)
    requestAnimationFrame(updateColors);

    const observer = new MutationObserver(updateColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, [sigma]);

  return null;
};

// --- Search overlay (spotlight-style, inside SigmaContainer) ---
interface SearchItem {
  id: string;
  label: string;
  tags: string;
  languages: string;
  category: string;
}

interface GraphSearchProps {
  open: boolean;
  onClose: () => void;
}

const GraphSearch: FC<GraphSearchProps> = ({ open, onClose }) => {
  const sigma = useSigma();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Build search index from current graph nodes
  const { fuse, items } = useMemo(() => {
    const graph = sigma.getGraph();
    const searchItems: SearchItem[] = [];
    graph.forEachNode((node) => {
      searchItems.push({
        id: node,
        label: graph.getNodeAttribute(node, "label") as string,
        tags: ((graph.getNodeAttribute(node, "tags") as string[]) || []).join(" "),
        languages: ((graph.getNodeAttribute(node, "languages") as string[]) || []).join(" "),
        category: CATEGORY_LABELS[graph.getNodeAttribute(node, "category") as string] || "",
      });
    });
    const f = new Fuse(searchItems, {
      keys: [
        { name: "label", weight: 3 },
        { name: "tags", weight: 1.5 },
        { name: "languages", weight: 1.5 },
        { name: "category", weight: 1 },
      ],
      threshold: 0.4,
      includeScore: true,
    });
    return { fuse: f, items: searchItems };
  }, [sigma, open]); // rebuild when opened (graph may have changed)

  const results = query.length > 0
    ? fuse.search(query).slice(0, 12)
    : [];

  // Focus input on open
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
      setQuery("");
    }
  }, [open]);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Highlight matching nodes in graph
  useEffect(() => {
    if (!open) {
      sigma.setSetting("nodeReducer", null);
      sigma.setSetting("edgeReducer", null);
      sigma.refresh();
      return;
    }
    if (query.length === 0 || results.length === 0) {
      sigma.setSetting("nodeReducer", null);
      sigma.setSetting("edgeReducer", null);
      sigma.refresh();
      return;
    }

    const matchIds = new Set(results.map(r => r.item.id));

    sigma.setSetting("nodeReducer", (node: string, data: Record<string, unknown>) => {
      if (matchIds.has(node)) return { ...data, highlighted: true };
      return { ...data, color: "#30363d40", label: "" };
    });
    sigma.setSetting("edgeReducer", (_edge: string, data: Record<string, unknown>) => {
      return { ...data, color: "#30363d20" };
    });
    sigma.refresh();
  }, [query, results.length, open, sigma]);

  const handleSelect = useCallback((nodeId: string) => {
    const display = sigma.getNodeDisplayData(nodeId);
    if (display) {
      sigma.getCamera().animate({ x: display.x, y: display.y, ratio: 0.3 }, { duration: 300 });
    }
    onClose();
  }, [sigma, onClose]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "absolute", inset: 0, zIndex: 20,
          background: "rgba(0,0,0,0.4)",
        }}
      />
      {/* Spotlight */}
      <div style={{
        position: "absolute", top: 24, left: "50%", transform: "translateX(-50%)",
        zIndex: 21, width: "min(460px, 85%)",
        background: "rgba(22, 27, 34, 0.65)",
        backdropFilter: "blur(20px) saturate(1.4)",
        WebkitBackdropFilter: "blur(20px) saturate(1.4)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "1.25rem",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
        overflow: "hidden",
      }}>
        {/* Input */}
        <div style={{
          display: "flex", alignItems: "center", gap: "0.5rem",
          padding: "0.75rem 1rem",
          borderBottom: results.length > 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}>
          <span style={{ opacity: 0.5, fontSize: "1rem" }}>🔍</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Escape") {
                onClose();
              } else if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex(prev => Math.max(prev - 1, 0));
              } else if (e.key === "Enter" && results.length > 0) {
                e.preventDefault();
                handleSelect(results[selectedIndex].item.id);
              }
            }}
            placeholder="Search nodes..."
            style={{
              flex: 1, background: "none", border: "none", outline: "none",
              color: "var(--foreground, #e6edf3)", fontSize: "0.9rem",
              fontFamily: "monospace",
            }}
          />
          <span style={{ opacity: 0.4, fontSize: "0.65rem", border: "1px solid var(--border)", borderRadius: "0.25rem", padding: "0.1rem 0.3rem" }}>
            ESC
          </span>
        </div>
        {/* Results */}
        {results.length > 0 && (
          <div ref={resultsRef} style={{ maxHeight: "320px", overflowY: "auto" }}>
            {results.map((r, i) => (
              <button
                key={r.item.id}
                onClick={() => handleSelect(r.item.id)}
                onMouseEnter={() => setSelectedIndex(i)}
                ref={el => {
                  if (i === selectedIndex && el) {
                    el.scrollIntoView({ block: "nearest" });
                  }
                }}
                style={{
                  display: "flex", flexDirection: "column", gap: "0.1rem",
                  width: "100%", textAlign: "left",
                  padding: "0.5rem 1rem",
                  background: i === selectedIndex ? "rgba(255,255,255,0.08)" : "none",
                  border: "none",
                  color: "var(--foreground, #e6edf3)",
                  cursor: "pointer",
                  borderBottom: i < results.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  fontSize: "0.8rem",
                }}
              >
                <span style={{ fontWeight: 600 }}>{r.item.label}</span>
                <span style={{ fontSize: "0.65rem", opacity: 0.6 }}>
                  {r.item.category}
                  {r.item.tags && ` · ${r.item.tags}`}
                  {r.item.languages && ` · ${r.item.languages}`}
                </span>
              </button>
            ))}
          </div>
        )}
        {query.length > 0 && results.length === 0 && (
          <div style={{ padding: "1rem", textAlign: "center", opacity: 0.5, fontSize: "0.8rem" }}>
            No matches
          </div>
        )}
      </div>
    </>
  );
};

// --- Filter controller (applies visual filtering + hover dimming via sigma reducers) ---
interface FilterControllerProps {
  visibleNodes: () => Set<string> | null;
  hasActiveFilters: boolean;
  hoveredNode: string | null;
}

const FilterController: FC<FilterControllerProps> = ({ visibleNodes, hasActiveFilters, hoveredNode }) => {
  const sigma = useSigma();

  useEffect(() => {
    const visible = hasActiveFilters ? visibleNodes() : null;
    const graph = sigma.getGraph();

    // Compute hover neighbors
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

    sigma.setSetting("nodeReducer", (node: string, data: Record<string, unknown>) => {
      const passesFilter = !visible || visible.has(node);
      const passesHover = !hoverNeighbors || hoverNeighbors.has(node);

      if (passesFilter && passesHover) return data;

      if (!passesFilter) {
        // Filtered out — very dim
        return { ...data, color: "#30363d15", label: "", size: 2 };
      }

      // Passes filter but not in hover neighborhood — medium dim
      return { ...data, color: "#30363d40", label: "" };
    });

    sigma.setSetting("edgeReducer", (edge: string, data: Record<string, unknown>) => {
      const src = graph.source(edge);
      const tgt = graph.target(edge);
      const srcVisible = !visible || visible.has(src);
      const tgtVisible = !visible || visible.has(tgt);
      const srcHover = !hoverNeighbors || hoverNeighbors.has(src);
      const tgtHover = !hoverNeighbors || hoverNeighbors.has(tgt);

      if (srcVisible && tgtVisible && srcHover && tgtHover) return data;

      if (!srcVisible || !tgtVisible) {
        return { ...data, color: "#30363d08", size: 0.5 };
      }

      return { ...data, color: "#30363d20" };
    });

    sigma.refresh();
  }, [visibleNodes, hasActiveFilters, hoveredNode, sigma]);

  return null;
};

// --- Unified toolbar: controls + legend (top-left overlay, inside SigmaContainer) ---
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
    graph.forEachNode((node) => {
      graph.setNodeAttribute(node, "size", 8);
    });

    // Group nodes by category, arrange each group in a cluster on a large circle
    const groups = new Map<string, string[]>();
    graph.forEachNode((node) => {
      const cat = (graph.getNodeAttribute(node, "category") as string) || "other";
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
        graph.setNodeAttribute(node, "x", cx + innerRadius * Math.cos(nodeAngle));
        graph.setNodeAttribute(node, "y", cy + innerRadius * Math.sin(nodeAngle));
      });
    });

    // ForceAtlas2 with strong gravity for petri-dish shape
    import("graphology-layout-forceatlas2").then(mod => {
      const settings = mod.inferSettings(graph);
      mod.assign(graph, {
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
      sigma.getCamera().animate({ x: 0.5, y: 0.5, ratio: 1 }, { duration: 300 });
    });
  }, [sigma]);

  const handleResetView = useCallback(() => {
    sigma.getCamera().animate({ x: 0.5, y: 0.5, ratio: 1 }, { duration: 300 });
  }, [sigma]);

  const handleCategoryClick = useCallback((category: string) => {
    const graph = sigma.getGraph();
    const matching: { x: number; y: number }[] = [];
    graph.forEachNode((node) => {
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
    sigma.getCamera().animate({ x: cx, y: cy, ratio }, { duration: 300 });
  }, [sigma]);

  const itemStyle: React.CSSProperties = {
    display: "flex", alignItems: "center", gap: "0.375rem",
    background: "none", border: "none", color: "inherit",
    cursor: "pointer", padding: "0.2rem 0.25rem",
    borderRadius: "0.25rem", fontSize: "0.7rem",
    textAlign: "left", width: "100%",
  };

  return (
    <div style={{
      position: "absolute", top: 8, left: 8, zIndex: 5,
      background: "var(--muted, #161b22)",
      border: "1px solid var(--border, #30363d)",
      borderRadius: "0.375rem",
      fontSize: "0.7rem",
      color: "var(--foreground, #e6edf3)",
      maxWidth: "240px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    }}>
      {/* Control buttons */}
      <div style={{
        display: "flex", gap: "0.25rem",
        padding: "0.375rem 0.5rem",
        borderBottom: "1px solid var(--border, #30363d)",
      }}>
        <button
          onClick={handleResetView}
          style={{ ...itemStyle, width: "auto", fontWeight: 600, fontSize: "0.65rem" }}
          title="Reset camera to center"
        >
          Re-center
        </button>
        <span style={{ width: 1, alignSelf: "stretch", background: "var(--border, #30363d)", opacity: 0.5 }} />
        <button
          onClick={handleNormalize}
          style={{ ...itemStyle, width: "auto", fontWeight: 600, fontSize: "0.65rem" }}
          title="Normalize sizes and re-layout"
        >
          Normalize
        </button>
        <span style={{ width: 1, alignSelf: "stretch", background: "var(--border, #30363d)", opacity: 0.5 }} />
        <button
          onClick={onSearchOpen}
          style={{ ...itemStyle, width: "auto", fontWeight: 600, fontSize: "1.1rem", lineHeight: 1, padding: "0.1rem 0.375rem" }}
          title="Search nodes (Ctrl+K)"
        >
          ⌕
        </button>
      </div>

      {/* Legend toggle */}
      <button
        onClick={() => setLegendOpen(!legendOpen)}
        style={{
          display: "flex", alignItems: "center", gap: "0.375rem",
          background: "none", border: "none", color: "inherit",
          cursor: "pointer", padding: "0.375rem 0.5rem",
          fontSize: "0.7rem", fontWeight: 600, width: "100%",
        }}
      >
        {legendOpen ? "▾" : "▸"} Legend
      </button>

      {/* Legend entries */}
      {legendOpen && (
        <div style={{
          display: "flex", flexDirection: "column", gap: "0.125rem",
          padding: "0 0.5rem 0.5rem",
          maxHeight: "300px", overflowY: "auto",
        }}>
          {categories
            .filter(cat => CATEGORY_COLORS[cat])
            .map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                style={itemStyle}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--border, #30363d)")}
                onMouseLeave={e => (e.currentTarget.style.background = "none")}
              >
                <span style={{
                  width: 8, height: 8, borderRadius: "50%",
                  backgroundColor: CATEGORY_COLORS[cat],
                  display: "inline-block", flexShrink: 0,
                }} />
                {CATEGORY_LABELS[cat] || cat}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

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
  height?: string;
  className?: string;
  showLegend?: boolean;
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
  height = "600px",
  className = "",
  showLegend = false,
  showWatermark = false,
}: GraphViewProps) {
  const { graph, loading, error, visibleNodes, hasActiveFilters } = useGraphData({
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
  });

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
      .catch(() => { window.location.href = url; });
  }, []);

  if (loading) {
    return (
      <div className={className} style={{ height, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: "var(--foreground)", opacity: 0.6 }}>Loading graph...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={className} style={{ height, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: "#f85149" }}>Failed to load graph: {error}</span>
      </div>
    );
  }

  if (!graph || graph.order === 0) {
    return (
      <div className={className} style={{ height, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: "var(--foreground)", opacity: 0.6 }}>No connections found.</span>
      </div>
    );
  }

  // Apply category colors
  graph.forEachNode((node) => {
    const category = graph.getNodeAttribute(node, "category") as string;
    graph.setNodeAttribute(node, "color", getNodeColor(category));
  });

  // Collect visible categories for legend
  const visibleCategories = new Set<string>();
  graph.forEachNode((node) => {
    const cat = graph.getNodeAttribute(node, "category") as string;
    if (cat) visibleCategories.add(cat);
  });

  // Resolve colors for sigma canvas
  const bgColor = getSigmaBackground();
  const labelColor = resolveThemeColor("--foreground", "#e6edf3");

  return (
    <div className={className} style={{ position: "relative" }} ref={containerRef}>
      <div style={{ height, position: "relative" }}>
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
          <FilterController visibleNodes={visibleNodes} hasActiveFilters={hasActiveFilters} hoveredNode={hoveredNode} />
          {showLegend && (
            <>
              <GraphToolbar
                categories={[...visibleCategories].sort()}
                onSearchOpen={() => setSearchOpen(true)}
              />
              <GraphSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
            </>
          )}
        </SigmaContainer>

        {/* Tooltip */}
        {tooltip && (
          <div style={{
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
          }}>
            <div style={{ fontWeight: 600 }}>{tooltip.label}</div>
            <div style={{ opacity: 0.7, fontSize: "0.65rem" }}>
              {CATEGORY_LABELS[tooltip.category] || tooltip.category}
              {tooltip.type === "post" ? " · Published" : " · Project"}
            </div>
          </div>
        )}

        {/* Watermark */}
        {showWatermark && (
          <div style={{
            position: "absolute", bottom: 8, right: 12,
            fontSize: "0.9rem", color: "var(--foreground, #e6edf3)",
            opacity: 0.25, pointerEvents: "none",
            fontFamily: "monospace",
          }}>
            Copyright &copy; {new Date().getFullYear()} &nbsp;|&nbsp; All rights reserved.
          </div>
        )}
      </div>
    </div>
  );
}
