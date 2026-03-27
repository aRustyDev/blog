# Deployment

The blog deploys as a static site to Cloudflare Workers via the `wrangler.jsonc` configuration.

## Prerequisites

- Cloudflare account with Workers enabled
- `wrangler` CLI (installed as a dev dependency)
- Custom domain configured in Cloudflare DNS

## Configuration

The deployment is configured in `wrangler.jsonc`:

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

Key settings:

| Field | Purpose |
|-------|---------|
| `build.command` | Workers Builds runs this automatically (dependencies installed first) |
| `assets.directory` | Static output directory (`./dist` from Astro build) |
| `not_found_handling` | Serves `404.html` for missing pages |
| `html_handling` | Adds trailing slashes to URLs automatically |

## Build Pipeline

The production build runs these steps in order:

```
npm run build
  ├── npm run build:graph        # Generate graph.json (posts only, no projects)
  ├── astro check                # TypeScript validation
  ├── astro build                # Generate static site in dist/
  ├── pagefind --site dist       # Build search index
  └── cp -r dist/pagefind public/  # Copy search index for dev mode
```

## Deploy Methods

### Via Justfile

```bash
just deploy        # Build + deploy
just deploy-only   # Deploy existing dist/ without rebuilding
```

### Via Workers Builds (GitHub App)

If the Cloudflare GitHub App is connected, pushes to the configured branch trigger automatic builds. The build command in `wrangler.jsonc` is used — Workers Builds runs `npm ci` automatically before the build command.

### Manual via Wrangler

```bash
npx wrangler pages deploy dist --project-name=blog
```

## Custom Domain

The custom domain `blog.arusty.dev` is configured as a route in `wrangler.jsonc`. Cloudflare manages the DNS record automatically.

If you need to change the domain:
1. Update `routes[0].pattern` in `wrangler.jsonc`
2. Update `site` in `src/config.ts`
3. Delete the old DNS record in Cloudflare Dashboard if needed

## Node.js Version

The build requires Node >= 20.19.0. Set this via `.node-version` or `.nvmrc` for Workers Builds to detect automatically.

## Dev vs Production Graph

The graph visualization behaves differently per environment:

| Environment | Command | Graph Content |
|-------------|---------|---------------|
| Development | `just dev` | All posts + all projects (99 nodes) |
| Production | `just build` | Published posts only (5 nodes) |

This is controlled by the `--dev` flag on `build:graph`. The dev script passes it; the production build script does not.
