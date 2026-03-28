// src/components/graph/GlobalGraphPage.tsx

import { useState, useEffect, useCallback, useMemo, type FC } from "react";
import GraphView, { type GraphActions } from "./GraphView";
import GraphFilters from "./GraphFilters";
import { useGraphData } from "./useGraphData";
import { CATEGORY_COLORS, CATEGORY_LABELS } from "./graph.shared";

const GlobalGraphPage: FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedContentTypes, setSelectedContentTypes] = useState<string[]>(
    []
  );
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [tagMode, setTagMode] = useState<
    "union" | "intersection" | "exclusion"
  >("union");
  const [focusNode, setFocusNode] = useState<string | undefined>(undefined);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const [filtersOpen, setFiltersOpen] = useState(!isMobile);
  const toggleFilters = useCallback(() => setFiltersOpen(prev => !prev), []);
  const [graphActions, setGraphActions] = useState<GraphActions | null>(null);

  // Search: close sidebar on mobile, then open search
  const handleSearchClick = useCallback(() => {
    if (isMobile) setFiltersOpen(false);
    graphActions?.openSearch();
  }, [graphActions, isMobile]);

  // Single source of truth for graph data — eliminates double-fetch
  const { graph, graphData, loading, error, visibleNodes, hasActiveFilters } =
    useGraphData({
      mode: "global",
      focusNode,
      filterTags: selectedTags.length ? selectedTags : undefined,
      filterCategories: selectedCategories.length
        ? selectedCategories
        : undefined,
      filterTypes: selectedTypes.length ? selectedTypes : undefined,
      filterStatuses: selectedStatuses.length ? selectedStatuses : undefined,
      filterContentTypes: selectedContentTypes.length
        ? selectedContentTypes
        : undefined,
      filterLanguages: selectedLanguages.length ? selectedLanguages : undefined,
      tagMode,
    });

  const metadata = graphData?.metadata ?? null;

  // Compute visible categories for legend
  const categories = useMemo(() => {
    if (!graph) return [];
    const cats = new Set<string>();
    graph.forEachNode(node => {
      const cat = graph.getNodeAttribute(node, "category") as string;
      if (cat) cats.add(cat);
    });
    return [...cats].sort();
  }, [graph]);

  // Sync filters to URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedTags.length) params.set("tags", selectedTags.join(","));
    if (selectedCategories.length)
      params.set("categories", selectedCategories.join(","));
    if (selectedTypes.length) params.set("types", selectedTypes.join(","));
    if (selectedStatuses.length)
      params.set("statuses", selectedStatuses.join(","));
    if (selectedContentTypes.length)
      params.set("contentTypes", selectedContentTypes.join(","));
    if (selectedLanguages.length)
      params.set("languages", selectedLanguages.join(","));
    if (tagMode !== "union") params.set("tagMode", tagMode);
    const newUrl = params.toString()
      ? `${window.location.pathname}?${params}`
      : window.location.pathname;
    window.history.replaceState({}, "", newUrl);
  }, [
    selectedTags,
    selectedCategories,
    selectedTypes,
    selectedStatuses,
    selectedContentTypes,
    selectedLanguages,
    tagMode,
  ]);

  // Read filters and focus from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tags = params.get("tags");
    const cats = params.get("categories");
    const types = params.get("types");
    const statuses = params.get("statuses");
    const contentTypes = params.get("contentTypes");
    const languages = params.get("languages");
    const mode = params.get("tagMode");
    const focus = params.get("focus");
    if (tags) setSelectedTags(tags.split(","));
    if (cats) setSelectedCategories(cats.split(","));
    if (types) setSelectedTypes(types.split(","));
    if (statuses) setSelectedStatuses(statuses.split(","));
    if (contentTypes) setSelectedContentTypes(contentTypes.split(","));
    if (languages) setSelectedLanguages(languages.split(","));
    if (mode === "intersection" || mode === "exclusion") setTagMode(mode);
    if (focus) setFocusNode(focus);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        height: "calc(100vh - 80px)",
        position: "relative",
        overflow: "hidden",
        touchAction: "manipulation", /* prevent page-level zoom */
      }}
    >
      {/* Filter toggle button — always visible, on top of sidebar and graph */}
      <button
        onClick={toggleFilters}
        aria-label={filtersOpen ? "Close filters" : "Open filters"}
        aria-expanded={filtersOpen}
        style={{
          position: "absolute",
          top: "0.5rem",
          left: filtersOpen ? "241px" : "0",
          zIndex: 30,
          background: "var(--muted)",
          border: "1px solid var(--border)",
          borderRadius: "0 0.375rem 0.375rem 0",
          padding: "0.375rem 0.5rem",
          cursor: "pointer",
          color: "var(--foreground)",
          fontSize: "0.75rem",
          display: "flex",
          alignItems: "center",
          gap: "0.25rem",
          transition: "left 0.2s ease",
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
        {!filtersOpen && <span>Filters</span>}
      </button>

      {/* Mobile: overlay backdrop when sidebar open */}
      {filtersOpen && isMobile && (
        <div
          onClick={() => setFiltersOpen(false)}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 19,
            background: "rgba(0,0,0,0.4)",
          }}
        />
      )}

      {/* Sidebar — overlay on mobile, push on desktop */}
      <aside
        aria-label="Graph filters"
        style={{
          width: filtersOpen ? "240px" : "0",
          flexShrink: 0,
          padding: filtersOpen ? "1rem" : "0",
          borderRight: filtersOpen ? "1px solid var(--border)" : "none",
          overflowY: "auto",
          overflowX: "hidden",
          transition: "width 0.2s ease, padding 0.2s ease",
          background: "var(--background)",
          // Mobile: overlay (absolute), Desktop: push (static in flex flow)
          ...(isMobile ? {
            position: "absolute" as const,
            top: 0,
            left: 0,
            bottom: 0,
            zIndex: 20,
          } : {}),
        }}
      >
        {filtersOpen && (
          <>
            {/* Graph controls */}
            {graphActions && (
              <div
                style={{
                  display: "flex",
                  gap: "0.375rem",
                  marginBottom: "1rem",
                  paddingBottom: "0.75rem",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <button
                  onClick={graphActions.recenter}
                  style={{
                    flex: 1,
                    padding: "0.375rem",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    background: "var(--muted)",
                    border: "1px solid var(--border)",
                    borderRadius: "0.25rem",
                    color: "var(--foreground)",
                    cursor: "pointer",
                  }}
                  title="Reset camera to center"
                >
                  Re-center
                </button>
                <button
                  onClick={graphActions.normalize}
                  style={{
                    flex: 1,
                    padding: "0.375rem",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    background: "var(--muted)",
                    border: "1px solid var(--border)",
                    borderRadius: "0.25rem",
                    color: "var(--foreground)",
                    cursor: "pointer",
                  }}
                  title="Normalize sizes and re-layout"
                >
                  Normalize
                </button>
                <button
                  onClick={handleSearchClick}
                  style={{
                    padding: "0.375rem 0.5rem",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    background: "var(--muted)",
                    border: "1px solid var(--border)",
                    borderRadius: "0.25rem",
                    color: "var(--foreground)",
                    cursor: "pointer",
                  }}
                  title="Search nodes (Ctrl+K)"
                  aria-label="Search nodes"
                >
                  ⌕
                </button>
              </div>
            )}

            <h2
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                marginBottom: "1rem",
                color: "var(--foreground)",
              }}
            >
              Filters
            </h2>
            {metadata && (
              <>
                <GraphFilters
                  availableTags={metadata.tags}
                  availableCategories={metadata.categories}
                  availableStatuses={metadata.statuses}
                  availableContentTypes={metadata.contentTypes}
                  availableLanguages={metadata.languages}
                  selectedTags={selectedTags}
                  selectedCategories={selectedCategories}
                  selectedTypes={selectedTypes}
                  selectedStatuses={selectedStatuses}
                  selectedContentTypes={selectedContentTypes}
                  selectedLanguages={selectedLanguages}
                  tagMode={tagMode}
                  onTagsChange={setSelectedTags}
                  onCategoriesChange={setSelectedCategories}
                  onTypesChange={setSelectedTypes}
                  onStatusesChange={setSelectedStatuses}
                  onContentTypesChange={setSelectedContentTypes}
                  onLanguagesChange={setSelectedLanguages}
                  onTagModeChange={setTagMode}
                />
                <div
                  style={{
                    marginTop: "1.5rem",
                    fontSize: "0.7rem",
                    color: "var(--foreground)",
                    opacity: 0.5,
                  }}
                >
                  {metadata.nodeCount} nodes · {metadata.edgeCount} edges
                </div>
              </>
            )}

            {/* Legend */}
            {categories.length > 0 && (
              <div style={{ marginTop: "1.5rem" }}>
                <h3
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    marginBottom: "0.5rem",
                    color: "var(--foreground)",
                  }}
                >
                  Legend
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem",
                  }}
                >
                  {categories
                    .filter(cat => CATEGORY_COLORS[cat])
                    .map(cat => (
                      <div
                        key={cat}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.375rem",
                          fontSize: "0.7rem",
                          color: "var(--foreground)",
                          opacity: 0.8,
                        }}
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
                      </div>
                    ))}
                </div>
              </div>
            )}
          </>
        )}
      </aside>

      {/* Graph — always fills full width (sidebar overlays on mobile) */}
      <div style={{ flex: 1, minWidth: 0 }} className="graph-container">
        <GraphView
          mode="global"
          graph={graph}
          loading={loading}
          error={error ?? undefined}
          visibleNodes={visibleNodes}
          hasActiveFilters={hasActiveFilters}
          focusNode={focusNode}
          tagMode={tagMode}
          height="calc(100vh - 80px)"
          showToolbar
          showWatermark
          onActionsReady={setGraphActions}
        />
      </div>
    </div>
  );
};

export default GlobalGraphPage;
