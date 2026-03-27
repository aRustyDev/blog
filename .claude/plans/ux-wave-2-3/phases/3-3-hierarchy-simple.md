# Phase 3.3: HierarchySimple Component

## Goal

A vertical hierarchy diagram with connected boxes. Supports title, description, badge, and multiple leaf items per node. Data loaded from JSON files at build time.

## Render Spec

```
┌──────────────────────────────────────────┐
│  Managed Policy                          │  ← label (bold)
│  cannot be excluded                      │  ← badge
│                                          │
│  ┌──────────┐                            │
│  │CLAUDE.md │                            │  ← leaves (branching items)
│  └──────────┘                            │
└──────────────────┬───────────────────────┘
                   │
┌──────────────────┴───────────────────────┐
│  Project                                 │
│                                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│  │CLAUDE.md │ │rules/*.md│ │settings  │ │  ← multiple leaves
│  └──────────┘ └──────────┘ └──────────┘ │
└──────────────────┬───────────────────────┘
                   │
                  ...
```

## Files to Create

### `src/components/HierarchySimple.astro`

Props:
```typescript
interface HierarchyItem {
  label: string;
  description?: string;
  badge?: string;
  leaves?: string[];
}

type Props = {
  items: HierarchyItem[];
  title?: string;
  collapsible?: boolean;  // default: false
  class?: string;
};
```

### `src/data/hierarchies/scope-hierarchy.json`

```json
{
  "title": "The scope hierarchy: who overrides whom",
  "items": [
    {
      "label": "Managed Policy",
      "description": "/Library/Application Support/ClaudeCode/",
      "badge": "cannot be excluded",
      "leaves": ["CLAUDE.md"]
    },
    {
      "label": "Project",
      "leaves": ["./CLAUDE.md", ".claude/rules/*.md", ".claude/settings.json"]
    },
    {
      "label": "User",
      "leaves": ["~/.claude/CLAUDE.md", "~/.claude/rules/*.md"]
    },
    {
      "label": "Local",
      "description": "gitignored overrides",
      "leaves": [".claude/settings.local.json"]
    }
  ]
}
```

## Data Input Pattern

Build-time JSON import in Astro frontmatter:
```astro
---
import scopeData from "@/data/hierarchies/scope-hierarchy.json";
import HierarchySimple from "@/components/HierarchySimple.astro";
---
<HierarchySimple items={scopeData.items} title={scopeData.title} />
```

Data and component are decoupled — same hierarchy data reusable across pages.

## CSS Approach

```css
.hierarchy-simple { /* container */ }
.hierarchy-node { /* card with border, rounded corners */ }
.hierarchy-node-label { /* bold title */ }
.hierarchy-node-description { /* muted subtitle */ }
.hierarchy-node-badge { /* small pill badge */ }
.hierarchy-node-leaves { /* flex row of leaf items */ }
.hierarchy-leaf { /* small box for each leaf item */ }
.hierarchy-connector { /* vertical line between nodes */ }
```

All CSS variables. Visual style: smartway.es reference (rounded cards, subtle borders, vertical connecting line with dots at junctions).

## Files to Modify

- `src/styles/components.css` — add hierarchy styles
- `src/pages/dev/draft-preview.mdx` — replace broken CodeBlock scope hierarchy with `<HierarchySimple>`
- `src/pages/dev/component-test.astro` — add hierarchy example

## Dependencies

None — standalone component.

## Acceptance Criteria

- [ ] Vertical box-and-line hierarchy renders with connected nodes
- [ ] Each node shows label, optional description, optional badge
- [ ] Leaf items render as small boxes branching from the node
- [ ] Multiple leaves display in a horizontal row
- [ ] Data loaded from JSON file at build time
- [ ] Connecting lines between nodes with dot markers at junctions
- [ ] CSS variables only — no hardcoded colors
- [ ] Responsive: cards stack naturally on mobile
- [ ] Iterative visual review with user
