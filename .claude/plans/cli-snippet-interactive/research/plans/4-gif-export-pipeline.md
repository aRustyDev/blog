# Research 4: GIF Export Pipeline

> **Status: V2** — This research is drafted for future reference. Not required for V1 implementation.

## Research Questions

1. **DOM-to-canvas recording**: How to capture a React component's animation as frames? Options: `html2canvas`, `dom-to-image`, Canvas API manual render, OffscreenCanvas.
2. **GIF encoding**: What library to use for encoding frames into GIF? Options: `gif.js`, `gifshot`, `modern-gif`, `jsgif`. Trade-offs: quality, file size, encoding speed, Web Worker support.
3. **Transition-only export**: The GIF should capture animation transitions (line reveals, code state changes), NOT collapsible interactions. How to programmatically trigger the animation sequence for recording?
4. **Quality and file size**: What resolution and frame rate produce acceptable quality? 30fps vs 15fps vs 10fps? How large are typical code-block GIFs?
5. **UX for export**: Export button placement? Progress indicator during encoding? Download trigger?
6. **Lazy loading**: GIF export is a niche feature. Can the encoding library be lazy-loaded only when the user clicks "Export GIF"?

## Sources to Investigate

- `html2canvas` — rendering DOM to canvas
- `modern-gif` — modern GIF encoding with Web Workers
- `gif.js` — popular but older GIF encoder
- Carbon.now.sh — how they handle PNG/SVG export (not GIF, but similar pipeline)
- `dom-to-image-more` — fork with better support
- Web Workers for off-main-thread encoding

## Deliverable

Research note covering:
- Recommended capture + encoding pipeline
- Lazy-loading strategy for the export feature
- Expected quality/size at different settings
- Browser compatibility matrix

## Additional Research Questions

7. **CSS variable resolution**: `html2canvas` has known issues with CSS custom properties (`var(--*)`) — may render incorrect colors. Test CSS variable resolution during DOM-to-canvas capture. `dom-to-image-more` uses SVG foreignObject serialization which handles CSS vars correctly but has Safari issues.
8. **MP4/WebM alternative**: MediaRecorder API can capture canvas streams natively with better quality/size. Evaluate as GIF alternative (browser support varies).

## Success Criteria

- [ ] Chosen capture library (DOM → frames) — must handle CSS variables correctly
- [ ] Chosen encoding library (frames → GIF)
- [ ] Lazy-loading approach confirmed
- [ ] Quality/size trade-offs documented
- [ ] Browser support verified (Chrome, Firefox, Safari — document Safari limitations)
- [ ] CSS variable rendering verified in capture pipeline
