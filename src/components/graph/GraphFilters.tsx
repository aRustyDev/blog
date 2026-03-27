// src/components/graph/GraphFilters.tsx

import { useState, type FC } from "react";
import {
  CATEGORY_COLORS,
  CATEGORY_LABELS,
  TOPIC_GROUPS,
  CONTENT_TYPE_LABELS,
} from "./graph.shared";

interface GraphFiltersProps {
  availableTags: string[];
  availableCategories: string[];
  availableStatuses: string[];
  availableContentTypes: string[];
  availableLanguages: string[];
  selectedTags: string[];
  selectedCategories: string[];
  selectedTypes: string[];
  selectedStatuses: string[];
  selectedContentTypes: string[];
  selectedLanguages: string[];
  tagMode: "union" | "intersection" | "exclusion";
  onTagsChange: (tags: string[]) => void;
  onCategoriesChange: (categories: string[]) => void;
  onTypesChange: (types: string[]) => void;
  onStatusesChange: (statuses: string[]) => void;
  onContentTypesChange: (contentTypes: string[]) => void;
  onLanguagesChange: (languages: string[]) => void;
  onTagModeChange: (mode: "union" | "intersection" | "exclusion") => void;
}

const sectionBtn: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "var(--foreground)",
  cursor: "pointer",
  fontWeight: 600,
  fontSize: "0.8rem",
  padding: 0,
  display: "flex",
  alignItems: "center",
  gap: "0.25rem",
};

const checkLabel: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  cursor: "pointer",
  fontSize: "0.8rem",
  padding: "0.1rem 0",
};

const GraphFilters: FC<GraphFiltersProps> = ({
  availableTags,
  availableCategories,
  availableStatuses,
  availableContentTypes,
  availableLanguages,
  selectedTags,
  selectedCategories,
  selectedTypes,
  selectedStatuses,
  selectedContentTypes,
  selectedLanguages,
  tagMode,
  onTagsChange,
  onCategoriesChange,
  onTypesChange,
  onStatusesChange,
  onContentTypesChange,
  onLanguagesChange,
  onTagModeChange,
}) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["nodeType", "topics"])
  );
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(section)) next.delete(section);
      else next.add(section);
      return next;
    });
  };

  const toggleGroup = (group: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev);
      if (next.has(group)) next.delete(group);
      else next.add(group);
      return next;
    });
  };

  const toggleItem = (
    item: string,
    selected: string[],
    onChange: (v: string[]) => void
  ) => {
    onChange(
      selected.includes(item)
        ? selected.filter(i => i !== item)
        : [...selected, item]
    );
  };

  const toggleGroupAll = (groupCats: string[]) => {
    const available = groupCats.filter(c => availableCategories.includes(c));
    const allSelected = available.every(c => selectedCategories.includes(c));
    if (allSelected) {
      onCategoriesChange(
        selectedCategories.filter(c => !available.includes(c))
      );
    } else {
      onCategoriesChange([...new Set([...selectedCategories, ...available])]);
    }
  };

  const activeCount =
    selectedCategories.length +
    selectedTags.length +
    selectedTypes.length +
    selectedStatuses.length +
    selectedContentTypes.length +
    selectedLanguages.length;

  // Filter topic groups to only show those with available categories
  const visibleGroups = TOPIC_GROUPS.map(g => ({
    ...g,
    categories: g.categories.filter(c => availableCategories.includes(c)),
  })).filter(g => g.categories.length > 0);

  return (
    <div style={{ color: "var(--foreground)", fontSize: "0.8rem" }}>
      {/* Node Type */}
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => toggleSection("nodeType")} aria-expanded={expandedSections.has("nodeType")} style={sectionBtn}>
          {expandedSections.has("nodeType") ? "▾" : "▸"} Node Type
          {selectedTypes.length +
            selectedContentTypes.length +
            selectedStatuses.length >
            0 &&
            ` (${selectedTypes.length + selectedContentTypes.length + selectedStatuses.length})`}
        </button>
        {expandedSections.has("nodeType") && (
          <div
            style={{
              marginTop: "0.375rem",
              marginLeft: "0.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.375rem",
            }}
          >
            {/* Blog Posts */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.375rem",
                }}
              >
                <input
                  type="checkbox"
                  aria-label="Filter Blog Posts"
                  checked={selectedTypes.includes("post")}
                  onChange={() =>
                    toggleItem("post", selectedTypes, onTypesChange)
                  }
                />
                <button
                  onClick={() => toggleGroup("blogPosts")}
                  aria-expanded={expandedGroups.has("blogPosts")}
                  style={{
                    ...sectionBtn,
                    fontSize: "0.775rem",
                    fontWeight: 500,
                  }}
                >
                  {expandedGroups.has("blogPosts") ? "▾" : "▸"} Blog Posts
                </button>
              </div>
              {expandedGroups.has("blogPosts") && (
                <div
                  style={{
                    marginLeft: "1.5rem",
                    marginTop: "0.25rem",
                    fontSize: "0.75rem",
                    opacity: 0.7,
                  }}
                >
                  <em>Published posts — filter by content type below</em>
                </div>
              )}
            </div>

            {/* Projects */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.375rem",
                }}
              >
                <input
                  type="checkbox"
                  aria-label="Filter Projects"
                  checked={selectedTypes.includes("project")}
                  onChange={() =>
                    toggleItem("project", selectedTypes, onTypesChange)
                  }
                />
                <button
                  onClick={() => toggleGroup("projects")}
                  aria-expanded={expandedGroups.has("projects")}
                  style={{
                    ...sectionBtn,
                    fontSize: "0.775rem",
                    fontWeight: 500,
                  }}
                >
                  {expandedGroups.has("projects") ? "▾" : "▸"} Projects
                </button>
              </div>
              {expandedGroups.has("projects") && (
                <div
                  style={{
                    marginLeft: "1.5rem",
                    marginTop: "0.25rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.375rem",
                  }}
                >
                  {/* Content Type */}
                  <div>
                    <div
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        opacity: 0.7,
                        marginBottom: "0.25rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Content Type
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.125rem",
                      }}
                    >
                      {availableContentTypes
                        .filter(ct => ct !== "blog-post") // blog-post is under Blog Posts
                        .map(ct => (
                          <label key={ct} style={checkLabel}>
                            <input
                              type="checkbox"
                              checked={selectedContentTypes.includes(ct)}
                              onChange={() =>
                                toggleItem(
                                  ct,
                                  selectedContentTypes,
                                  onContentTypesChange
                                )
                              }
                            />
                            {CONTENT_TYPE_LABELS[ct] || ct}
                          </label>
                        ))}
                    </div>
                  </div>

                  {/* Status */}
                  {availableStatuses.length > 0 && (
                    <div>
                      <div
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: 600,
                          opacity: 0.7,
                          marginBottom: "0.25rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        Status
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.125rem",
                        }}
                      >
                        {availableStatuses.map(s => (
                          <label key={s} style={checkLabel}>
                            <input
                              type="checkbox"
                              checked={selectedStatuses.includes(s)}
                              onChange={() =>
                                toggleItem(
                                  s,
                                  selectedStatuses,
                                  onStatusesChange
                                )
                              }
                            />
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Topic Groups */}
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => toggleSection("topics")} aria-expanded={expandedSections.has("topics")} style={sectionBtn}>
          {expandedSections.has("topics") ? "▾" : "▸"} Topics
          {selectedCategories.length > 0 && ` (${selectedCategories.length})`}
        </button>
        {expandedSections.has("topics") && (
          <div
            style={{
              marginTop: "0.375rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.375rem",
            }}
          >
            {visibleGroups.map(group => {
              const selectedInGroup = group.categories.filter(c =>
                selectedCategories.includes(c)
              ).length;
              return (
                <div key={group.label}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.375rem",
                      marginLeft: "0.5rem",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={
                        selectedInGroup === group.categories.length &&
                        group.categories.length > 0
                      }
                      ref={el => {
                        if (el)
                          el.indeterminate =
                            selectedInGroup > 0 &&
                            selectedInGroup < group.categories.length;
                      }}
                      aria-label={`Filter all ${group.label}`}
                      onChange={() => toggleGroupAll(group.categories)}
                    />
                    <button
                      onClick={() => toggleGroup(group.label)}
                      aria-expanded={expandedGroups.has(group.label)}
                      style={{
                        ...sectionBtn,
                        fontSize: "0.775rem",
                        fontWeight: 500,
                      }}
                    >
                      {expandedGroups.has(group.label) ? "▾" : "▸"}{" "}
                      {group.label}
                      <span style={{ opacity: 0.5, fontWeight: 400 }}>
                        ({group.categories.length})
                      </span>
                    </button>
                  </div>
                  {expandedGroups.has(group.label) && (
                    <div
                      style={{
                        marginLeft: "1.75rem",
                        marginTop: "0.25rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.125rem",
                      }}
                    >
                      {group.categories.map(cat => (
                        <label key={cat} style={checkLabel}>
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(cat)}
                            onChange={() =>
                              toggleItem(
                                cat,
                                selectedCategories,
                                onCategoriesChange
                              )
                            }
                          />
                          <span
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              backgroundColor:
                                CATEGORY_COLORS[cat] || "#8b949e",
                              display: "inline-block",
                              flexShrink: 0,
                            }}
                          />
                          {CATEGORY_LABELS[cat] || cat}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Languages */}
      {availableLanguages.length > 0 && (
        <div style={{ marginBottom: "1rem" }}>
          <button onClick={() => toggleSection("languages")} aria-expanded={expandedSections.has("languages")} style={sectionBtn}>
            {expandedSections.has("languages") ? "▾" : "▸"} Languages
            {selectedLanguages.length > 0 && ` (${selectedLanguages.length})`}
          </button>
          {expandedSections.has("languages") && (
            <div
              style={{
                marginTop: "0.375rem",
                marginLeft: "0.75rem",
                display: "flex",
                flexWrap: "wrap",
                gap: "0.25rem",
              }}
            >
              {availableLanguages.map(lang => {
                const active = selectedLanguages.includes(lang);
                return (
                  <button
                    key={lang}
                    aria-pressed={active}
                    onClick={() =>
                      toggleItem(lang, selectedLanguages, onLanguagesChange)
                    }
                    style={{
                      background: active
                        ? "var(--accent, #3fb950)"
                        : "var(--muted, #161b22)",
                      border: "1px solid var(--border, #30363d)",
                      color: active
                        ? "var(--background, #0d1117)"
                        : "var(--foreground, #e6edf3)",
                      cursor: "pointer",
                      padding: "0.15rem 0.5rem",
                      borderRadius: "1rem",
                      fontSize: "0.7rem",
                      fontFamily: "monospace",
                    }}
                  >
                    {lang}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tags */}
      <div style={{ marginBottom: "0.5rem" }}>
        <button onClick={() => toggleSection("tags")} aria-expanded={expandedSections.has("tags")} style={sectionBtn}>
          {expandedSections.has("tags") ? "▾" : "▸"} Tags
          {selectedTags.length > 0 && ` (${selectedTags.length})`}
        </button>
        {expandedSections.has("tags") && (
          <div style={{ marginTop: "0.375rem", marginLeft: "0.75rem" }}>
            {/* Tag mode toggle */}
            <div
              style={{
                display: "flex",
                gap: "0.125rem",
                marginBottom: "0.5rem",
                width: "100%",
              }}
            >
              {(["union", "intersection", "exclusion"] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => onTagModeChange(mode)}
                  style={{
                    flex: 1,
                    background:
                      tagMode === mode
                        ? "var(--accent, #3fb950)"
                        : "var(--muted, #161b22)",
                    border: "1px solid var(--border, #30363d)",
                    color:
                      tagMode === mode
                        ? "var(--background, #0d1117)"
                        : "var(--foreground, #e6edf3)",
                    cursor: "pointer",
                    padding: "0.2rem 0.375rem",
                    borderRadius: "0.25rem",
                    fontSize: "0.65rem",
                    fontWeight: tagMode === mode ? 600 : 400,
                    textAlign: "center" as const,
                  }}
                  title={
                    mode === "union"
                      ? "Show nodes with ANY selected tag"
                      : mode === "intersection"
                        ? "Show nodes with ALL selected tags"
                        : "Exclude nodes with selected tags"
                  }
                >
                  {mode === "union"
                    ? "ANY"
                    : mode === "intersection"
                      ? "ALL"
                      : "NOT"}
                </button>
              ))}
            </div>
            {/* Tag pills */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.25rem",
                maxHeight: "200px",
                overflowY: "auto",
              }}
            >
              {availableTags.map(tag => {
                const active = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    aria-pressed={active}
                    onClick={() => toggleItem(tag, selectedTags, onTagsChange)}
                    style={{
                      background: active
                        ? tagMode === "exclusion"
                          ? "var(--error, #f85149)"
                          : "var(--accent, #3fb950)"
                        : "var(--muted, #161b22)",
                      border: "1px solid var(--border, #30363d)",
                      color: active
                        ? "var(--background, #0d1117)"
                        : "var(--foreground, #e6edf3)",
                      cursor: "pointer",
                      padding: "0.15rem 0.5rem",
                      borderRadius: "1rem",
                      fontSize: "0.7rem",
                    }}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Clear all */}
      {activeCount > 0 && (
        <button
          onClick={() => {
            onTagsChange([]);
            onCategoriesChange([]);
            onTypesChange([]);
            onStatusesChange([]);
            onContentTypesChange([]);
            onLanguagesChange([]);
          }}
          style={{
            marginTop: "0.5rem",
            background: "none",
            border: "1px solid var(--border)",
            color: "var(--foreground)",
            cursor: "pointer",
            padding: "0.25rem 0.5rem",
            borderRadius: "0.25rem",
            fontSize: "0.75rem",
            width: "100%",
          }}
        >
          Clear All Filters ({activeCount})
        </button>
      )}
    </div>
  );
};

export default GraphFilters;
