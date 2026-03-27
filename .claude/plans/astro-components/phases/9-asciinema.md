# Phase 9: Asciinema

## Goal

Embed terminal recordings from `.cast` files or asciinema.org URLs. Collapsible wrapper.

## File to Create

`src/components/Asciinema.astro`

## Props Interface

```typescript
type Props = {
  src: string;             // Path to .cast file OR asciinema.org URL
  cols?: number;           // Terminal columns
  rows?: number;           // Terminal rows
  autoplay?: boolean;      // Default: false
  collapsible?: boolean;   // Default: true
  title?: string;          // Header label
  class?: string;
};
```

## Render Spec

```
┌─────────────────────────────────────────────────────┐
│ [▾] Demo: setting up hooks                          │  ← title bar
├─────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────┐ │
│ │                                                 │ │
│ │          asciinema-player embed                  │ │  ← player
│ │                                                 │ │
│ │  ▶  ━━━━━━━━━━○━━━━━━━━━  2:34                 │ │  ← controls
│ └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

## Implementation Steps

### Approach: asciinema-player Web Component

1. Use the official `asciinema-player` npm package (v3+) which provides a web component
2. Detect source type:
   - If `src` starts with `http` and contains `asciinema.org`: use the URL directly
   - If `src` is a local path (e.g., `/assets/casts/demo.cast`): point player to that file
3. Load the player JS + CSS lazily (only when component is on the page)
4. Collapsible wrapper with title
5. Pass `cols`, `rows`, `autoplay` to the player element

### Source Detection

```typescript
const isUrl = src.startsWith("http");
const isAsciinemaOrg = isUrl && src.includes("asciinema.org");
// For asciinema.org URLs, extract the recording ID and use their embed URL
// For local .cast files, use the path directly
```

### Lazy Loading Strategy

Since the player JS is ~100KB, load it only when needed:

```html
<script>
  // Lazy-load asciinema-player when the element enters viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        import('asciinema-player').then(AsciinemaPlayer => {
          AsciinemaPlayer.create(
            entry.target.dataset.src,
            entry.target,
            {
              cols: Number(entry.target.dataset.cols) || undefined,
              rows: Number(entry.target.dataset.rows) || undefined,
              autoPlay: entry.target.dataset.autoplay === 'true',
            }
          );
        });
        observer.unobserve(entry.target);
      }
    });
  });

  document.querySelectorAll('.asciinema-container').forEach(el => observer.observe(el));
</script>
```

## CSS Approach

```css
.asciinema-wrapper {
  @apply border border-bd rounded-lg overflow-hidden;
}

.asciinema-title {
  @apply px-3 py-1.5 bg-mt text-fg text-sm border-b border-bd;
}

.asciinema-container {
  @apply w-full min-h-[200px] bg-mt/50;
}

/* Override asciinema-player default theme to use CSS variables */
.asciinema-container .ap-wrapper {
  /* The player supports custom themes via CSS — override bg/fg */
}
```

## Dependencies

New npm dependency: `asciinema-player` (or use CDN script tag for the player).

Decision: prefer npm install for build-time bundling and tree-shaking over CDN for consistency with the project's dependency approach.

**CSS import**: Use a dynamic import inside the lazy-load `.then()` block:
```typescript
import('asciinema-player').then(async (AsciinemaPlayer) => {
  await import('asciinema-player/dist/bundle/asciinema-player.css');
  AsciinemaPlayer.create(/* ... */);
});
```
Vite supports CSS module lazy imports — the CSS arrives with the JS and only when the component is visible.

**View transitions**: The IntersectionObserver must be cleaned up and re-created on `astro:after-swap`:
```typescript
let observer: IntersectionObserver | null = null;

function setupAsciinemaObservers() {
  observer?.disconnect();
  observer = new IntersectionObserver(/* ... */);
  document.querySelectorAll('.asciinema-container').forEach(el => observer!.observe(el));
}

setupAsciinemaObservers();
document.addEventListener('astro:after-swap', setupAsciinemaObservers);
```

**Cast file location**: Store `.cast` files at `public/assets/casts/` so they're served as static assets at `/assets/casts/*.cast`.

## Acceptance Criteria

- [ ] Plays `.cast` files from local paths
- [ ] Embeds asciinema.org recordings by URL
- [ ] Lazy-loads player JS (not loaded until visible)
- [ ] Collapsible by default with title
- [ ] Respects `cols`, `rows`, `autoplay` props
- [ ] Player theme aligns with blog's dark/light mode
- [ ] Uses CSS variables — no hardcoded colors
