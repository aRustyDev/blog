# Phase 4: Hardcoded Color Safety

**Priority**: High — light mode bugs, potential WebGL rendering failures
**Findings**: CSS-001, CSS-002, CSS-003, CSS-004, CSS-007, CSS-009
**Estimated time**: 1 hour
**Dependencies**: None

## Tasks

### CSS-003 + CSS-004: Hex format guards
- [ ] `graph.constants.ts` resolveDimColors: add `if (!border.startsWith("#") || border.length < 7) border = "#30363d";` guard
- [ ] `GraphControllers.tsx` ThemeObserver: same guard before `+ "60"` alpha append

### CSS-002: Verify sigma 8-digit hex support
- [ ] Test: does sigma v3 render `#30363d40` correctly?
- [ ] If not, convert to rgba: `rgba(48, 54, 61, 0.25)` format

### CSS-001 + CSS-009: Remove render-path DOM calls from GraphView
- [ ] Remove `resolveThemeColor` call at render time (line 195) — use hardcoded fallback `"#e6edf3"`
- [ ] Remove `getSigmaBackground` from import (unused)
- [ ] ThemeObserver already handles live updates

### CSS-007: Initial SigmaContainer defaults
- [ ] Use resolveThemeColor (with hex guard) for initial defaultEdgeColor/defaultNodeColor
- [ ] Or accept hardcoded dark fallbacks as "good enough" since ThemeObserver updates on first frame

### Verification
- [ ] Theme toggle on graph page — edges/nodes update colors
- [ ] Light mode — no invisible edges
- [ ] Commit: `fix: add hex guards to color resolution, remove render-path DOM calls`
