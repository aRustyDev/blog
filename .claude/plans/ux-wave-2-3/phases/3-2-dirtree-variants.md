# Phase 3.2: DirTree Variants

## Goal

Add a `variant` prop to DirTree supporting multiple visual modes.

## Variants

### `variant="simple"` — ASCII tree (no icons)

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json
├── skills/
│   ├── brainstorm/
│   │   └── SKILL.md
│   └── review/
│       └── SKILL.md
└── .mcp.json
```

Pure monospace text, no emoji icons. Clean, minimal.

### `variant="icons"` (default) — ASCII tree with file/folder icons

Current behavior but with improved spacing and alignment.
Fix the "clunky" look: tighter spacing, consistent icon sizing, better connector alignment.

### `variant="interactive"` (V2) — Collapsible tree nodes

React component with expandable/collapsible directories. Future work.

## Files to Modify

- `src/components/DirTree.astro` — add `variant` prop, conditional rendering
- `src/styles/components.css` — variant-specific styles

## Props Change

```typescript
type Props = {
  content: string;
  variant?: "simple" | "icons";  // default: "icons"
  collapsible?: boolean;
  label?: string;
  highlight?: string[];
  class?: string;
};
```

## Acceptance Criteria

- [ ] `variant="simple"` renders clean ASCII tree without icons
- [ ] `variant="icons"` renders with file/folder icons (improved spacing)
- [ ] Default behavior unchanged (icons mode)
- [ ] Both variants handle highlighting
- [ ] Iterative visual review with user
