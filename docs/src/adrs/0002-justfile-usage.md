# ADR-0002: Justfile for Task Running

## Status

Accepted

## Date

2026-03-13

## Context

The blog project uses npm scripts defined in `package.json` for build, dev, lint, and format tasks. However, some operations span multiple steps (build then deploy, clean then rebuild) or involve tools outside the npm ecosystem (wrangler for Cloudflare deployment). We need a task runner that provides a unified interface for all project operations.

## Decision

We use [just](https://github.com/casey/just) as the project's task runner, with a `justfile` at the repository root.

### Why just over alternatives

| Alternative | Reason for rejection |
|-------------|---------------------|
| `make` | Tab-sensitivity, file-based targets conflate build artifacts with commands |
| `npm scripts` | Cannot express dependencies between tasks, no built-in listing, verbose for multi-step operations |
| `task` (taskfile.dev) | YAML-based, more complex than needed |
| Shell scripts | No dependency management, no self-documenting `--list` |

### Current recipes

| Recipe | Purpose | Dependencies |
|--------|---------|--------------|
| `default` | List available commands | - |
| `install` | Install npm dependencies | - |
| `dev` | Run local dev server | - |
| `preview` | Preview production build | - |
| `format` | Format code | - |
| `format-check` | Check formatting | - |
| `lint` | Lint code | - |
| `check` | Run all checks | `format-check`, `lint` |
| `build` | Build for production | - |
| `test` | Build and preview | `build`, `preview` |
| `deploy` | Build and deploy to CF Pages | `build` |
| `deploy-only` | Deploy existing build | - |
| `clean` | Remove build artifacts | - |
| `clean-all` | Remove artifacts + node_modules | `clean` |
| `sync` | Sync Astro types | - |

### Conventions

- Recipes wrap `npm run` commands where an npm script exists
- Multi-step operations use just's dependency system (e.g., `deploy: build`)
- `@` prefix suppresses command echo for cleaner output on informational messages
- `just` (no args) shows all available commands via `--list`

## Consequences

- Single entry point for all project operations: `just <command>`
- Self-documenting via `just --list`
- Recipe dependencies ensure correct execution order (e.g., build before deploy)
- Developers need `just` installed (`brew install just` / `cargo install just`)
- npm scripts remain the source of truth for individual tool invocations; justfile orchestrates them
