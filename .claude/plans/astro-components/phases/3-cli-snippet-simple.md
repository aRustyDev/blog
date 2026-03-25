# Phase 3: CLISnippet Simple

## Goal

A terminal-styled code block that visually distinguishes prompt/command lines from output lines. Collapsible. Zero JS.

## File to Create

`src/components/CLISnippet.astro`

## Props Interface

```typescript
type Props = {
  content: string;         // Raw text content (NOT slot — see PLAN.md Content Passing Strategy)
  collapsible?: boolean;   // Default: true
  title?: string;          // Header label (e.g., "Checking what loaded")
  prompt?: string;         // Default: "$"
  class?: string;
};
```

**MDX usage**: `<CLISnippet content={\`$ claude --hooks-debug\n[InstructionsLoaded] session_start: CLAUDE.md\`} title="Checking what loaded" />`

## Render Spec

```
┌─────────────────────────────────────────────────────┐
│ [▾] Checking what loaded                            │  ← title bar
├─────────────────────────────────────────────────────┤
│ $ claude --hooks-debug                              │  ← prompt line (bold, accent)
│ [InstructionsLoaded] session_start: CLAUDE.md       │  ← output (muted)
│ [InstructionsLoaded] path_glob_match: cf-wrangler   │  ← output (muted)
└─────────────────────────────────────────────────────┘
```

## Implementation Steps

1. Create component with Props type
2. Parse `content` string prop: split by `\n`, lines starting with `prompt` character are commands; all others are output
3. Title bar: terminal-window chrome (dots or label), reuse CodeBlock title pattern
4. Collapsible: `<details class="component-details" open><summary>` wrapper (reset prose styles)
6. Render command lines with prompt char in accent color, bold
7. Render output lines in muted/dimmer style
8. Terminal aesthetic: dark background (`bg-mt`), monospace font, slight padding
9. No syntax highlighting for output — just text styling

## CSS Approach

```css
.cli-snippet {
  @apply border border-bd rounded-lg overflow-hidden font-mono text-sm;
}

.cli-snippet-title {
  @apply flex items-center gap-2 px-3 py-1.5 bg-mt text-fg/70 text-xs border-b border-bd;
}

.cli-snippet-title::before {
  /* Terminal dots */
  content: "● ● ●";
  @apply text-xs tracking-wider opacity-40;
}

.cli-snippet-body {
  @apply p-3 bg-mt/50 overflow-x-auto;
}

.cli-line-command {
  @apply text-fg font-semibold;
}

.cli-line-command .cli-prompt {
  @apply text-ac mr-1 select-none;
}

.cli-line-output {
  @apply text-fg/60;
}
```

## Dependencies

Phase 2 (CodeBlock) — shares the collapsible wrapper pattern and title bar convention.

## Acceptance Criteria

- [ ] Command lines visually distinct from output lines
- [ ] Prompt character rendered in accent color, not selectable (user-select: none)
- [ ] Collapsible by default
- [ ] Terminal aesthetic (dark surface, monospace, window chrome dots)
- [ ] Uses CSS variables — no hardcoded colors
- [ ] Works in light and dark themes
