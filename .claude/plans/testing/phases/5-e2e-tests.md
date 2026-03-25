# Phase 5: E2E Tests

## Goal

Test full interactive behavior in a real browser using Playwright against the dev server.

## Scope

E2E tests verify behaviors that unit and component tests cannot:
- Shiki build-time highlighting produces correct DOM
- Astro island hydration (`client:only="react"`) works
- CSS transitions fire correctly
- Print styles apply
- Mobile responsive breakpoints work
- Theme toggle affects component colors

## Dependencies to Install

```bash
npm install -D @playwright/test
npx playwright install chromium
```

## Configuration

### `playwright.config.ts`

```typescript
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "e2e",
  webServer: {
    command: "npm run dev",
    port: 4321,
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
  use: {
    baseURL: "http://localhost:4321",
  },
  projects: [
    { name: "chromium", use: { browserName: "chromium" } },
    // Add firefox and webkit when ready:
    // { name: "firefox", use: { browserName: "firefox" } },
    // { name: "webkit", use: { browserName: "webkit" } },
  ],
});
```

## Test Cases

### `e2e/component-test-page.spec.ts`

Uses the `/dev/component-test/` page as the test surface.

| Test | Action | Assert |
|------|--------|--------|
| Page loads | navigate to `/dev/component-test/` | HTTP 200, title visible |
| CodeBlock renders highlighted code | — | `.shiki` element with `--shiki-light` / `--shiki-dark` CSS vars |
| CodeBlock collapsible toggle | click summary | content toggles visibility |
| CLISnippet prompt styling | — | prompt chars have accent color |
| DirTree connectors render | — | `├──` and `└──` characters visible |
| Tweet card links to X | — | `href` contains `x.com` |
| PersonPopup hover | hover on person name | popup becomes visible |
| PersonPopup click (mobile) | set viewport 375px, tap name | popup toggles |
| Timeline vertical renders | — | `.timeline-dot` elements visible |
| Timeline horizontal scrolls | set viewport 375px | horizontal overflow scrollable |
| OGCard renders title | — | OG title text visible (from build-time fetch) |

### `e2e/cli-snippet-interactive.spec.ts`

Requires a test page with CLISnippetCollapsible and CLISnippetAnimated. Use `/dev/component-test/` or create a dedicated `/dev/cli-snippet-test/` page.

| Test | Action | Assert |
|------|--------|--------|
| Collapsible: fold gutter visible | — | `.cli-snippet-gutter` visible at >=640px |
| Collapsible: fold gutter hidden mobile | viewport 375px | gutter not visible |
| Collapsible: click fold collapses | click gutter ▼ | intermediate lines hidden, `{...}` indicator shown |
| Collapsible: click fold expands | click gutter ▶ | lines restored, indicator removed |
| Animated: controls visible | — | play, next, prev buttons visible |
| Animated: click next reveals lines | click next | lines become visible (opacity 1) |
| Animated: click prev hides lines | next then prev | lines hidden again |
| Animated: play auto-advances | click play, wait 2s | step advances automatically |
| Animated: keyboard space toggles play | focus controls, press Space | play state toggles |
| Copy button | click copy button | "Copied!" text appears briefly |

### `e2e/theme-toggle.spec.ts`

| Test | Action | Assert |
|------|--------|--------|
| Components respond to theme toggle | toggle `data-theme` attribute | Shiki vars switch from `--shiki-light` to `--shiki-dark` |
| Copy success uses --success color | click copy | "Copied!" text has success color |

### `e2e/print.spec.ts`

| Test | Action | Assert |
|------|--------|--------|
| Print hides controls | emulate print media | `.cli-snippet-controls` not visible |
| Print shows all code | emulate print | no `.cli-snippet-line-hidden` visible |

## Package.json Scripts

```json
{
  "scripts": {
    "test:e2e": "npx playwright test",
    "test:e2e:ui": "npx playwright test --ui"
  }
}
```

## Priority

E2E tests are **lowest priority**. Implement Phase 3 (unit) and Phase 4 (component) first. E2E is a "nice to have" that catches integration issues between Astro's build and React's hydration.

## Acceptance Criteria

- [ ] Playwright configured and running against dev server
- [ ] Component test page E2E: 11 test cases
- [ ] Interactive CLISnippet E2E: 10 test cases
- [ ] Theme toggle E2E: 2 test cases
- [ ] Print E2E: 2 test cases
- [ ] All tests pass on Chromium
- [ ] Total: ~25 E2E test cases
