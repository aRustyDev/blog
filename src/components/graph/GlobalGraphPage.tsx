// src/components/graph/GlobalGraphPage.tsx

import { useState, useEffect, useCallback, type FC } from "react";
import GraphView from "./GraphView";
import GraphFilters from "./GraphFilters";
import { useGraphData } from "./useGraphData";

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
  const [filtersOpen, setFiltersOpen] = useState(
    typeof window !== "undefined" && window.innerWidth >= 768
  );
  const toggleFilters = useCallback(() => setFiltersOpen(prev => !prev), []);

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
    <div style={{ display: "flex", height: "calc(100vh - 80px)", position: "relative" }}>
      {/* Filter toggle button — always visible */}
      <button
        onClick={toggleFilters}
        aria-label={filtersOpen ? "Close filters" : "Open filters"}
        aria-expanded={filtersOpen}
        style={{
          position: "absolute",
          top: "0.5rem",
          left: filtersOpen ? "241px" : "0",
          zIndex: 20,
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

      {/* Sidebar — collapsible */}
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
        }}
      >
        {filtersOpen && (
          <>
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
          </>
        )}
      </aside>

      {/* Graph — pass external data to avoid double-fetch */}
      <div style={{ flex: 1 }} className="graph-container">
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
        />
      </div>
    </div>
  );
};

export default GlobalGraphPage;
