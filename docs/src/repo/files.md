# Files

## Configuration Files

| File | Purpose |
|------|---------|
| `astro.config.ts` | Astro framework configuration (site URL, plugins, fonts, markdown settings) |
| `tsconfig.json` | TypeScript configuration with path aliases |
| `package.json` | Node.js dependencies and npm scripts |
| `wrangler.jsonc` | Cloudflare Pages/Workers deployment configuration |

## Linting & Formatting

| File | Purpose |
|------|---------|
| `eslint.config.js` | ESLint configuration for code linting |
| `.prettierrc.mjs` | Prettier code formatting rules |
| `.prettierignore` | Files excluded from Prettier formatting |
| `.pre-commit-config.yaml` | Pre-commit hooks configuration |

## Environment & Runtime

| File | Purpose |
|------|---------|
| `.node-version` | Node.js version specification (for version managers) |
| `.nvmrc` | Node.js version for nvm |
| `.npmrc` | npm configuration |
| `.gitignore` | Git ignore patterns |

## Project Files

| File | Purpose |
|------|---------|
| `justfile` | Task runner recipes (just commands) |
| `LICENSE` | Project license (GPL-3.0) |
| `README.md` | Project readme |

## npm Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production (includes Pagefind)
npm run preview      # Preview production build
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run lint         # Run ESLint
npm run sync         # Sync Astro types
```

## Just Recipes

```bash
just dev      # Run development server
just build    # Build for production
just deploy   # Build and deploy to Cloudflare
just clean    # Remove build artifacts
just check    # Run format and lint checks
```
