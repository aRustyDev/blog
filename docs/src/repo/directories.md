# Directories

## `/src` - Source Code

Main application source directory.

| Directory | Purpose |
|-----------|---------|
| `src/data/blog/` | Blog posts (Markdown files) |
| `src/pages/` | Astro pages that become routes |
| `src/components/` | Reusable UI components |
| `src/layouts/` | Page layout templates |
| `src/styles/` | CSS files (global.css, typography.css) |
| `src/utils/` | Utility functions (slugify, OG image generation, etc.) |
| `src/assets/` | Images and icons processed by Astro |
| `src/scripts/` | Client-side scripts (theme toggle) |

### Key Files in `/src`

- `config.ts` - Site configuration (title, author, social links behavior)
- `constants.ts` - Social links and share buttons
- `content.config.ts` - Blog post schema definition
- `env.d.ts` - TypeScript environment declarations

## `/public` - Static Assets

Files copied directly to build output without processing.

| File/Directory | Purpose |
|----------------|---------|
| `favicon.svg` | Site icon |
| `robots.txt` | Search engine crawling instructions |
| `fonts/` | Web fonts (JetBrains Mono) |
| `pagefind/` | Generated search index (gitignored) |

## `/docs` - Documentation

MDBook-based project documentation.

| File | Purpose |
|------|---------|
| `book.toml` | MDBook configuration |
| `src/SUMMARY.md` | Documentation table of contents |
| `src/repo/` | Repository documentation |

## `/content` - Draft Content

| Directory | Purpose |
|-----------|---------|
| `content/.todo/` | Draft blog posts and content plans |

## `/.github` - GitHub Configuration

| Directory | Purpose |
|-----------|---------|
| `workflows/` | GitHub Actions (Cloudflare Pages deployment) |
| `dependabot.yml` | Dependency update configuration |

## `/.todo` - Project Planning

Project-level planning and TODO items (tracked as GitHub issues).

## `/.vscode` - Editor Configuration

VS Code workspace settings and recommended extensions.

## `/dist` - Build Output

Generated static site (gitignored). Created by `npm run build`.
