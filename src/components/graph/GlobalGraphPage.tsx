// src/components/graph/GlobalGraphPage.tsx

import { useState, useEffect, type FC } from "react";
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
    <div style={{ display: "flex", gap: "1rem", height: "calc(100vh - 80px)" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "240px",
          flexShrink: 0,
          padding: "1rem",
          borderRight: "1px solid var(--border)",
          overflowY: "auto",
        }}
      >
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
