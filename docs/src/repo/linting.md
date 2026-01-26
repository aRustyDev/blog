# Linting & Formatting

## Tools

| Tool | Config File | Purpose |
|------|-------------|---------|
| ESLint | `eslint.config.js` | JavaScript/TypeScript linting |
| Prettier | `.prettierrc.mjs` | Code formatting |
| astro-check | (built-in) | Astro component type checking |

## Commands

```bash
# Format all files
npm run format

# Check formatting without changes
npm run format:check

# Lint code
npm run lint

# Run all checks
just check
```

## Pre-commit Hooks

Pre-commit hooks are configured in `.pre-commit-config.yaml` to run formatting checks before commits.

## Editor Integration

VS Code settings in `.vscode/` configure:
- Recommended extensions for Astro development
- Format on save with Prettier
- ESLint integration
