# Configuration

## Site Config (`src/config.ts`)

The main site configuration file. Controls metadata, display options, and behavior.

| Setting | Description |
|---------|-------------|
| `website` | Site URL (e.g., `https://blog.arusty.dev/`) |
| `author` | Default author name for posts |
| `desc` | Site description for meta tags |
| `title` | Site title |
| `ogImage` | Default Open Graph image filename |
| `lightAndDarkMode` | Enable light/dark mode toggle |
| `postPerIndex` | Number of posts on the index page |
| `postPerPage` | Number of posts per paginated page |
| `scheduledPostMargin` | Grace period (ms) before a scheduled post goes live |
| `showArchives` | Show the archives page |
| `editPost` | "Edit on GitHub" link configuration |
| `dynamicOgImage` | Generate OG images dynamically |
| `lang` | Site language code |
| `timezone` | Default IANA timezone |

## Social Links (`src/constants.ts`)

Defines two arrays:

- **`SOCIALS`** -- Header social icons. Each entry has `name`, `href`, `icon`, and `enabled`. Set `enabled: true` to show an icon in the site header.
- **`SHARE_LINKS`** -- Post sharing buttons. Same structure. Controls which share options appear on post pages.

To add or change a social link, edit the corresponding entry and set `enabled` to `true` or `false`.

## Deployment (`wrangler.jsonc`)

Configures Cloudflare Workers static site deployment.

```jsonc
{
  "name": "blog-worker",
  "build": {
    "command": "npm run build"
  },
  "assets": {
    "directory": "./dist",
    "not_found_handling": "404-page",
    "html_handling": "auto-trailing-slash"
  },
  "routes": [
    {
      "pattern": "blog.arusty.dev",
      "custom_domain": true
    }
  ]
}
```

Key points:
- `build.command` is used by Workers Builds. Dependencies are installed automatically (`npm ci`), so do not add `npm install` to the build command.
- `assets.directory` points to Astro's output directory (`./dist`).
- The `routes` entry maps the custom domain.

## Brand Theme Integration

The site loads theme CSS and JavaScript from `https://brand.arusty.dev/`:

- **Theme stylesheet** -- `brand.arusty.dev/assets/colors/themes/forest-night.css` provides CSS custom properties for colors.
- **Theme switcher** -- `brand.arusty.dev/assets/js/theme-switcher.js` exposes a `BrandTheme` API for toggling light/dark mode and switching color themes.

The integration is configured in `src/layouts/Layout.astro` (loading the CDN assets) and `src/scripts/theme.ts` (wiring up the toggle button to `BrandTheme`). The TypeScript interface for `BrandTheme` is declared in `src/env.d.ts`.
