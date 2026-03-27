# Phase 5: View Transition Safety

**Priority**: High — runtime stability
**Findings**: VT-006, VT-007, VT-008, VT-010
**Estimated time**: 1 hour
**Dependencies**: Phase 1 (listener cleanup pattern)

## Tasks

### VT-006: graph.astro overflow:hidden leaks
- [ ] Remove `:global(body) { overflow: hidden }` from `<style>` block
- [ ] Apply via JS in GlobalGraphPage useEffect: `document.body.style.overflow = "hidden"` with cleanup `return () => { document.body.style.overflow = "" }`

### VT-007: GraphView cleanup clears external graph
- [ ] Change cleanup to: `if (graph && !hasExternalData) graph.clear()`
- [ ] SigmaContainer handles its own WebGL teardown

### VT-008: Layout data-astro-rerun overwrites window.theme
- [ ] Change `window.theme = { ... }` to `window.theme = Object.assign(window.theme || {}, { ... })`

### VT-010: ThemeObserver rAF not cancelled
- [ ] Store rAF id: `const rafId = requestAnimationFrame(updateColors)`
- [ ] Cancel in cleanup: `return () => { cancelAnimationFrame(rafId); observer.disconnect(); }`

### Verification
- [ ] Navigate away from /graph — page scrolls normally
- [ ] Rapid navigation between pages — no console errors
- [ ] Theme toggle works after multiple navigations
- [ ] Commit: `fix: view transition safety — overflow cleanup, graph clear guard, rAF cancel`
