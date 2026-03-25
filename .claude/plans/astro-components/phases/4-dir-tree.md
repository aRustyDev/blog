# Phase 4: DirTree

## Goal

A styled directory tree visualization with file/folder icons, optional path highlighting, and collapsible wrapper.

## File to Create

`src/components/DirTree.astro`

## Props Interface

```typescript
type Props = {
  content: string;         // Indented plain text tree (NOT slot — see PLAN.md Content Passing Strategy)
  collapsible?: boolean;   // Default: true
  label?: string;          // Caption above tree (e.g., "Plugin bundle structure")
  highlight?: string[];    // Paths to highlight in accent color
  class?: string;
};
```

**MDX usage**:
```astro
<DirTree content={`my-plugin/
  .claude-plugin/plugin.json
  skills/
    brainstorm/SKILL.md`} label="Plugin bundle structure" />
```

## Render Spec

```
┌──────────────────────────────────────────┐
│ [▾] Plugin bundle structure              │  ← label/caption
├──────────────────────────────────────────┤
│  📁 my-plugin/                           │
│  ├── 📁 .claude-plugin/                  │
│  │   └── 📄 plugin.json                  │  ← highlighted if in highlight[]
│  ├── 📁 skills/                          │
│  │   ├── 📁 brainstorm/                  │
│  │   │   └── 📄 SKILL.md                 │
│  │   └── 📁 review/                      │
│  │       └── 📄 SKILL.md                 │
│  └── 📄 .mcp.json                        │
└──────────────────────────────────────────┘
```

## Implementation Steps

1. Parse `content` string prop as indented plain text
2. Parse indentation to determine depth (2-space or tab-based)
3. Determine file vs directory: lines ending with `/` are directories
4. Generate tree connectors: `├──`, `└──`, `│` using CSS or Unicode characters
5. Apply file/folder indicators: use Unicode (📁/📄) or CSS-generated content
6. Highlight logic: if a path matches an entry in `highlight[]`, apply accent color
7. Collapsible wrapper with label as summary text
8. Monospace font, subtle background

## Parsing Logic

```
Input (content prop):
  my-plugin/
    .claude-plugin/plugin.json
    skills/
      brainstorm/SKILL.md

Parsing rules:
- Count leading whitespace to determine depth
- Line ending with `/` = directory
- Line containing `/` but not ending with it = nested path → split into segments
- Each segment at its depth level

Nested path expansion example:
  ".claude-plugin/plugin.json" at depth 1 becomes:
    depth 1: 📁 .claude-plugin/
    depth 2: 📄 plugin.json
```

## CSS Approach

```css
.dir-tree {
  @apply border border-bd rounded-lg overflow-hidden font-mono text-sm;
}

.dir-tree-label {
  @apply px-3 py-1.5 bg-mt text-fg text-sm border-b border-bd;
}

.dir-tree-body {
  @apply p-3 bg-mt/30 overflow-x-auto;
}

.dir-tree-entry {
  @apply whitespace-pre text-fg;
}

.dir-tree-entry.highlighted {
  @apply text-ac font-semibold;
}

.dir-tree-connector {
  @apply text-fg/40 select-none;  /* muted foreground, not border color */
}
```

## Dependencies

Phase 2 (CodeBlock) — shares collapsible pattern.

## Acceptance Criteria

- [ ] Correctly parses indented text into tree structure with connectors
- [ ] Files and directories visually distinguishable
- [ ] Highlighted paths rendered in accent color
- [ ] Collapsible by default with label as summary
- [ ] Handles nested paths (e.g., `skills/brainstorm/SKILL.md`)
- [ ] Uses CSS variables — no hardcoded colors
