// src/components/graph/GraphModal.tsx
import { useState, type FC } from "react";
import GraphView from "./GraphView";

interface GraphModalProps {
  initialMode: "local" | "global";
  focusNode?: string;
  title: string;
  onClose: () => void;
}

const GraphModal: FC<GraphModalProps> = ({
  initialMode,
  focusNode,
  title,
  onClose,
}) => {
  const [mode, setMode] = useState(initialMode);

  const toggleStyle = (active: boolean): React.CSSProperties => ({
    background: active ? "var(--accent, #3fb950)" : "none",
    color: active ? "var(--background, #0d1117)" : "var(--foreground, #e6edf3)",
    border: "none",
    cursor: "pointer",
    padding: "0.2rem 0.5rem",
    borderRadius: "0.25rem",
    fontSize: "0.7rem",
    fontWeight: active ? 600 : 400,
  });

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={e => {
          if (e.target === e.currentTarget) onClose();
        }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 100,
          background: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
      />
      {/* Modal */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: "fixed",
          inset: "5vh 5vw",
          zIndex: 101,
          background: "var(--muted, #161b22)",
          border: "1px solid var(--border, #30363d)",
          borderRadius: "0.75rem",
          boxShadow: "0 12px 48px rgba(0,0,0,0.5)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.5rem 1rem",
            borderBottom: "1px solid var(--border, #30363d)",
            flexShrink: 0,
          }}
        >
          {/* Mode toggle */}
          <div
            style={{
              display: "flex",
              gap: "0.125rem",
              background: "var(--background, #0d1117)",
              borderRadius: "0.375rem",
              padding: "0.125rem",
            }}
          >
            <button
              onClick={() => setMode("local")}
              style={toggleStyle(mode === "local")}
            >
              Page Graph
            </button>
            <button
              onClick={() => setMode("global")}
              style={toggleStyle(mode === "global")}
            >
              Site Graph
            </button>
          </div>

          <span
            style={{
              fontSize: "0.75rem",
              color: "var(--foreground)",
              opacity: 0.6,
            }}
          >
            {mode === "local" ? title : "All content"}
          </span>

          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "var(--foreground)",
              cursor: "pointer",
              fontSize: "1.1rem",
              lineHeight: 1,
              opacity: 0.6,
              padding: "0.25rem",
            }}
            title="Close (Esc)"
            aria-label="Close graph modal"
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
            showToolbar={mode === "global"}
            showWatermark
          />
        </div>
      </div>
    </>
  );
};

export default GraphModal;
