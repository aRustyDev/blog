// src/components/graph/useGraphData.ts

import { useState, useEffect, useCallback, useRef } from "react";
import Graph from "graphology";
import type { GraphData, GraphNode } from "./graph.types";

interface UseGraphDataOptions {
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
}

function deriveContentType(category: string): string {
  if (category.startsWith("deep-dive")) return "deep-dive";
  if (category === "eli5") return "eli5";
  if (category === "keebs") return "dev-blog";
  if (category === "blog-post") return "blog-post";
  if (category === "feature") return "feature";
  if (category === "project") return "project";
  return "other";
}

export const EDGE_COLORS: Record<string, string> = {
  parent: "#3fb950",
  child: "#3fb950",
  sibling: "#58a6ff",
  prerequisite: "#d29922",
  sequel: "#d29922",
  related: "#8b949e",
  "tag-shared": "#30363d80",
};

/** Tests whether a node passes the current filter criteria */
function nodePassesFilters(node: GraphNode, options: UseGraphDataOptions): boolean {
  // Tags
  if (options.filterTags?.length) {
    const mode = options.tagMode || "union";
    const nodeTags = node.tags || [];
    if (mode === "union") {
      if (!nodeTags.some(t => options.filterTags!.includes(t))) return false;
    } else if (mode === "intersection") {
      if (!options.filterTags.every(t => nodeTags.includes(t))) return false;
    } else if (mode === "exclusion") {
      if (nodeTags.some(t => options.filterTags!.includes(t))) return false;
    }
  }

  // Categories (topics)
  if (options.filterCategories?.length) {
    if (!options.filterCategories.includes(node.category || "")) return false;
  }

  // Node type
  if (options.filterTypes?.length) {
    if (!options.filterTypes.includes(node.type)) return false;
  }

  // Status (projects only)
  if (options.filterStatuses?.length && node.type === "project") {
    if (!options.filterStatuses.includes(node.status || "ideation")) return false;
  }

  // Content type
  if (options.filterContentTypes?.length) {
    const ct = deriveContentType(node.category || "other");
    if (!options.filterContentTypes.includes(ct)) return false;
  }

  // Languages
  if (options.filterLanguages?.length) {
    const nodeLangs = node.languages || [];
    if (nodeLangs.length > 0 && !nodeLangs.some(l => options.filterLanguages!.includes(l))) return false;
  }

  return true;
}

export function useGraphData(options: UseGraphDataOptions) {
  const [graph, setGraph] = useState<Graph | null>(null);
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Store raw node data for filter checks (keyed by node id)
  const nodeDataRef = useRef<Map<string, GraphNode>>(new Map());

  // Load graph ONCE — no filter dependencies
  useEffect(() => {
    fetch("/graph.json")
      .then(r => r.json())
      .then((data: GraphData) => {
        setGraphData(data);
        const g = new Graph();
        const nodeMap = new Map<string, GraphNode>();

        // Add ALL nodes
        for (const node of data.nodes) {
          nodeMap.set(node.id, node);
          g.addNode(node.id, {
            label: node.label,
            size: 5,
            color: "#3fb950",
            nodeType: node.type,
            url: node.url,
            tags: node.tags,
            languages: node.languages || [],
            category: node.category,
            contentType: node.contentType,
            status: node.status,
            x: Math.random() * 100,
            y: Math.random() * 100,
          });
        }

        // Add ALL edges
        for (const edge of data.edges) {
          if (g.hasNode(edge.source) && g.hasNode(edge.target)) {
            try {
              g.addEdge(edge.source, edge.target, {
                relationship: edge.relationship,
                color: EDGE_COLORS[edge.relationship] || "#30363d",
                size: 1,
              });
            } catch {
              // Skip duplicate edges
            }
          }
        }

        // Local mode: extract subgraph around focusNode
        if (options.mode === "local" && options.focusNode) {
          const depth = options.depth ?? 2;
          const keep = new Set<string>();
          const queue: [string, number][] = [[options.focusNode, 0]];

          while (queue.length > 0) {
            const [nodeId, d] = queue.shift()!;
            if (keep.has(nodeId) || d > depth) continue;
            if (!g.hasNode(nodeId)) continue;
            keep.add(nodeId);
            for (const neighbor of g.neighbors(nodeId)) {
              if (!keep.has(neighbor)) {
                queue.push([neighbor, d + 1]);
              }
            }
          }

          for (const nodeId of g.nodes()) {
            if (!keep.has(nodeId)) {
              nodeMap.delete(nodeId);
              g.dropNode(nodeId);
            }
          }
        }

        // Size nodes by degree
        g.forEachNode(node => {
          const degree = g.degree(node);
          g.setNodeAttribute(node, "size", Math.max(5, Math.min(14, 5 + degree * 0.8)));
        });

        nodeDataRef.current = nodeMap;
        setGraph(g);
        setLoading(false);
      })
      .catch(e => {
        setError(e.message);
        setLoading(false);
      });
  }, [options.mode, options.focusNode, options.depth]); // Only reload on mode/focus changes

  // Compute the set of visible node IDs based on current filters
  const hasActiveFilters = !!(
    options.filterTags?.length || options.filterCategories?.length ||
    options.filterTypes?.length || options.filterStatuses?.length ||
    options.filterContentTypes?.length || options.filterLanguages?.length
  );

  const visibleNodes = useCallback((): Set<string> | null => {
    if (!hasActiveFilters) return null; // null = show all
    const visible = new Set<string>();
    for (const [id, node] of nodeDataRef.current) {
      if (nodePassesFilters(node, options)) {
        visible.add(id);
      }
    }
    return visible;
  }, [
    hasActiveFilters,
    JSON.stringify(options.filterTags), JSON.stringify(options.filterCategories),
    JSON.stringify(options.filterTypes), JSON.stringify(options.filterStatuses),
    JSON.stringify(options.filterContentTypes), JSON.stringify(options.filterLanguages),
    options.tagMode,
  ]);

  return { graph, graphData, loading, error, visibleNodes, hasActiveFilters };
}
