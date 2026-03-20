// src/components/graph/LocalGraphWidget.tsx
// Obsidian-style floating graph widget: fixed top-right, collapsible,
// with modal overlays for local and global graph views.

import { useState, useEffect, type FC } from "react";
import GraphView from "./GraphView";

interface LocalGraphWidgetProps {
  nodeId: string;
  title: string;
}

// --- Modal overlay (simplified graph, no filters sidebar) ---
interface GraphModalProps {
  initialMode: "local" | "global";
  focusNode?: string;
  title: string;
  onClose: () => void;
}

const GraphModal: FC<GraphModalProps> = ({ initialMode, focusNode, title, onClose }) => {
  const [mode, setMode] = useState(initialMode);

  const toggleStyle = (active: boolean): React.CSSProperties => ({
    background: active ? "var(--accent, #3fb950)" : "none",
    color: active ? "var(--background, #0d1117)" : "var(--foreground, #e6edf3)",
    border: "none", cursor: "pointer",
    padding: "0.2rem 0.5rem", borderRadius: "0.25rem",
    fontSize: "0.7rem", fontWeight: active ? 600 : 400,
  });

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={e => {
          if (e.target === e.currentTarget) onClose();
        }}
        style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
      />
      {/* Modal */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: "fixed", inset: "5vh 5vw", zIndex: 101,
          background: "var(--muted, #161b22)",
          border: "1px solid var(--border, #30363d)",
          borderRadius: "0.75rem",
          boxShadow: "0 12px 48px rgba(0,0,0,0.5)",
          display: "flex", flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "0.5rem 1rem",
          borderBottom: "1px solid var(--border, #30363d)",
          flexShrink: 0,
        }}>
          {/* Mode toggle */}
          <div style={{ display: "flex", gap: "0.125rem", background: "var(--background, #0d1117)", borderRadius: "0.375rem", padding: "0.125rem" }}>
            <button onClick={() => setMode("local")} style={toggleStyle(mode === "local")}>
              Page Graph
            </button>
            <button onClick={() => setMode("global")} style={toggleStyle(mode === "global")}>
              Site Graph
            </button>
          </div>

          <span style={{ fontSize: "0.75rem", color: "var(--foreground)", opacity: 0.6 }}>
            {mode === "local" ? title : "All content"}
          </span>

          <button
            onClick={onClose}
            style={{
              background: "none", border: "none", color: "var(--foreground)",
              cursor: "pointer", fontSize: "1.1rem", lineHeight: 1,
              opacity: 0.6, padding: "0.25rem",
            }}
            title="Close (Esc)"
          >
            ✕
          </button>
        </div>
        {/* Graph — key forces fresh mount when mode changes */}
        <div style={{ flex: 1, position: "relative" }}>
          <GraphView
            key={`modal-${mode}-${focusNode || "global"}`}
            mode={mode}
            focusNode={mode === "local" ? focusNode : undefined}
            depth={3}
            height="calc(90vh - 80px)"
            showLegend={mode === "global"}
            showWatermark
          />
        </div>
      </div>
    </>
  );
};

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
