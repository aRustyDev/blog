# CI/CD

## Overview

The blog is deployed to Cloudflare Pages using GitHub Actions.

## Deployment Pipeline

```
Push to main → GitHub Actions → Build → Deploy to Cloudflare Pages
```

## Platforms

- **CI**: [GitHub Actions](./github.md)
- **Hosting**: Cloudflare Pages
- **Domain**: blog.arusty.dev

## Manual Deployment

```bash
# Build and deploy
just deploy

# Deploy without rebuilding
just deploy-only
```

## Required Secrets

The following secrets must be configured in GitHub repository settings:

| Secret | Description |
|--------|-------------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token with Pages permissions |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID |
