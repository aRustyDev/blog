// src/components/graph/LocalGraphWidget.tsx
// Obsidian-style floating graph widget: fixed top-right, collapsible,
// with modal overlays for local and global graph views.

import { useState, useEffect, type FC } from "react";
import GraphView from "./GraphView";
import GraphModal from "./GraphModal";

interface LocalGraphWidgetProps {
  nodeId: string;
  title: string;
}

// --- Floating widget ---
const LocalGraphWidget: FC<LocalGraphWidgetProps> = ({ nodeId, title }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [modal, setModal] = useState<"local" | "global" | null>(null);
  const [depth, setDepth] = useState(2);

  // ESC to close modal
  useEffect(() => {
    if (!modal) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModal(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [modal]);

  const iconBtn: React.CSSProperties = {
    background: "none", border: "none", cursor: "pointer",
    color: "var(--foreground, #e6edf3)", opacity: 0.6,
    padding: "0.125rem", lineHeight: 1, fontSize: "0.8rem",
  };

  return (
    <>
      {/* Floating widget — hidden on mobile */}
      <div style={{
        position: "fixed", top: 80, right: 16, zIndex: 30,
        width: collapsed ? "auto" : "280px",
        background: "color-mix(in srgb, var(--muted, #161b22) 85%, transparent)",
        backdropFilter: "blur(16px) saturate(1.3)",
        WebkitBackdropFilter: "blur(16px) saturate(1.3)",
        border: "1px solid var(--border, #30363d)",
        borderRadius: "0.625rem",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        overflow: "hidden",
        display: "none", // hidden by default, shown via media query
      }} className="graph-widget">
        {/* Header */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "0.375rem 0.5rem",
          borderBottom: collapsed ? "none" : "1px solid var(--border, #30363d)",
        }}>
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "var(--foreground, #e6edf3)",
              fontSize: "0.7rem", fontWeight: 600, padding: 0,
              display: "flex", alignItems: "center", gap: "0.25rem",
            }}
          >
            {collapsed ? "▸" : "▾"} Graph
          </button>
          <div style={{ display: "flex", gap: "0.25rem" }}>
            {/* Expand local graph modal */}
            <button
              onClick={e => { e.stopPropagation(); setModal("local"); }}
              style={iconBtn}
              title="Expand page graph"
            >
              ⤢
            </button>
            {/* Open global graph modal */}
            <button
              onClick={e => { e.stopPropagation(); setModal("global"); }}
              style={iconBtn}
              title="Open site graph"
            >
              ◉
            </button>
          </div>
        </div>

        {/* Graph + depth */}
        {!collapsed && (
          <>
            {/* Depth slider */}
            <div style={{
              display: "flex", alignItems: "center", gap: "0.375rem",
              padding: "0.25rem 0.5rem",
              fontSize: "0.65rem", color: "var(--foreground, #e6edf3)", opacity: 0.7,
            }}>
              <span>Depth</span>
              <input
                type="range" min={1} max={4} value={depth}
                onChange={e => setDepth(Number(e.target.value))}
                style={{ flex: 1, height: "2px" }}
              />
              <span style={{ minWidth: "0.75rem", textAlign: "center" }}>{depth}</span>
            </div>

            {/* Local graph */}
            <GraphView
              mode="local"
              focusNode={nodeId}
              depth={depth}
              height="220px"
            />
          </>
        )}
      </div>

      {/* Modal overlay */}
      {modal && (
        <GraphModal
          initialMode={modal}
          focusNode={nodeId}
          title={title}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
};

export default LocalGraphWidget;
