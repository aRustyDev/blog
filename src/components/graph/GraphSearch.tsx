// src/components/graph/GraphSearch.tsx

import {
  useEffect,
  useCallback,
  useState,
  useRef,
  useMemo,
  type FC,
} from "react";
import Fuse from "fuse.js";
import { useSigma } from "@react-sigma/core";
import { CATEGORY_LABELS } from "./graph.shared";
import { dimColorsRef } from "./graph.shared";

// --- Search overlay (spotlight-style, inside SigmaContainer) ---
interface SearchItem {
  id: string;
  label: string;
  tags: string;
  languages: string;
  category: string;
}

export interface GraphSearchProps {
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
  const { fuse } = useMemo(() => {
    const graph = sigma.getGraph();
    const searchItems: SearchItem[] = [];
    graph.forEachNode(node => {
      searchItems.push({
        id: node,
        label: graph.getNodeAttribute(node, "label") as string,
        tags: ((graph.getNodeAttribute(node, "tags") as string[]) || []).join(
          " "
        ),
        languages: (
          (graph.getNodeAttribute(node, "languages") as string[]) || []
        ).join(" "),
        category:
          CATEGORY_LABELS[graph.getNodeAttribute(node, "category") as string] ||
          "",
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

  const results = query.length > 0 ? fuse.search(query).slice(0, 12) : [];

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

    sigma.setSetting(
      "nodeReducer",
      (node: string, data: Record<string, unknown>) => {
        if (matchIds.has(node)) return { ...data, highlighted: true };
        return { ...data, color: dimColorsRef.current.nodeDimmed, label: "" };
      }
    );
    sigma.setSetting(
      "edgeReducer",
      (_edge: string, data: Record<string, unknown>) => {
        return { ...data, color: dimColorsRef.current.edgeDimmed };
      }
    );
    sigma.refresh();
  }, [query, results.length, open, sigma]);

  const handleSelect = useCallback(
    (nodeId: string) => {
      const display = sigma.getNodeDisplayData(nodeId);
      if (display) {
        sigma
          .getCamera()
          .animate(
            { x: display.x, y: display.y, ratio: 0.3 },
            { duration: 300 }
          );
      }
      onClose();
    },
    [sigma, onClose]
  );

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 20,
          background: "rgba(0,0,0,0.4)",
        }}
      />
      {/* Spotlight */}
      <div
        style={{
          position: "absolute",
          top: 24,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 21,
          width: "min(460px, 85%)",
          background: "var(--muted, #161b22)",
          opacity: 0.95,
          backdropFilter: "blur(20px) saturate(1.4)",
          WebkitBackdropFilter: "blur(20px) saturate(1.4)",
          border: "1px solid var(--border, #30363d)",
          borderRadius: "1.25rem",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
          overflow: "hidden",
        }}
      >
        {/* Input */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1rem",
            borderBottom:
              results.length > 0 ? "1px solid var(--border, #30363d)" : "none",
          }}
        >
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
                setSelectedIndex(prev =>
                  Math.min(prev + 1, results.length - 1)
                );
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex(prev => Math.max(prev - 1, 0));
              } else if (e.key === "Enter" && results.length > 0) {
                e.preventDefault();
                handleSelect(results[selectedIndex].item.id);
              }
            }}
            placeholder="Search nodes..."
            aria-label="Search graph nodes"
            style={{
              flex: 1,
              background: "none",
              border: "none",
              outline: "none",
              color: "var(--foreground, #e6edf3)",
              fontSize: "0.9rem",
              fontFamily: "monospace",
            }}
          />
          <span
            style={{
              opacity: 0.4,
              fontSize: "0.65rem",
              border: "1px solid var(--border)",
              borderRadius: "0.25rem",
              padding: "0.1rem 0.3rem",
            }}
          >
            ESC
          </span>
        </div>
        {/* Results */}
        {results.length > 0 && (
          <div
            ref={resultsRef}
            style={{ maxHeight: "320px", overflowY: "auto" }}
          >
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
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.1rem",
                  width: "100%",
                  textAlign: "left",
                  padding: "0.5rem 1rem",
                  background:
                    i === selectedIndex ? "var(--border, #30363d)" : "none",
                  border: "none",
                  color: "var(--foreground, #e6edf3)",
                  cursor: "pointer",
                  borderBottom:
                    i < results.length - 1
                      ? "1px solid var(--border, #30363d)"
                      : "none",
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
          <div
            style={{
              padding: "1rem",
              textAlign: "center",
              opacity: 0.5,
              fontSize: "0.8rem",
            }}
          >
            No matches
          </div>
        )}
      </div>
    </>
  );
};

export default GraphSearch;
