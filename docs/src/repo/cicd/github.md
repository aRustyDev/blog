# GitHub Actions

## Workflows

### Deploy to Cloudflare Pages

**File**: `.github/workflows/astro.yml`

**Triggers**:
- Push to `main` branch
- Manual dispatch (workflow_dispatch)

**Steps**:
1. Checkout repository
2. Setup Node.js 20 with npm cache
3. Install dependencies (`npm ci`)
4. Build site (`npm run build`)
5. Deploy to Cloudflare Pages via wrangler

**Required Secrets**:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## Other Configurations

### Dependabot

**File**: `.github/dependabot.yml`

Automated dependency updates for npm packages.

### CodeQL

**File**: `.github/workflows/codeql.yml`

Security scanning for JavaScript/TypeScript code.
