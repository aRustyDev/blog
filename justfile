# Justfile for blog management

# Default recipe - show available commands
default:
    @just --list

# Install dependencies
install:
    npm install

# Run local development server (builds graph data first)
dev:
    npm run dev

# Preview production build locally (always rebuilds)
preview: build
    npm run preview

# Format code
format:
    npm run format

# Check code formatting
format-check:
    npm run format:check

# Lint code
lint:
    npm run lint

# Run all checks (format, lint)
check: format-check lint

# Build the site for production
build:
    npm run build
    @echo "Build complete. Output in ./dist"

# Run unit tests
test:
    npx vitest run

# Run unit tests in watch mode
test-watch:
    npx vitest

# Test build locally (build + preview)
test-build: build preview

# Deploy to Cloudflare Workers (uses wrangler.jsonc config)
deploy: build
    @echo "Deploying to Cloudflare Workers..."
    npx wrangler deploy

# Deploy without building (use existing dist/)
deploy-only:
    @echo "Deploying existing build to Cloudflare Workers..."
    npx wrangler deploy

# Clean build artifacts
clean:
    rm -rf dist/
    rm -rf .astro/
    rm -rf public/pagefind/
    @echo "Cleaned build artifacts"

# Full clean including node_modules
clean-all: clean
    rm -rf node_modules/
    rm -rf package-lock.json
    @echo "Cleaned everything"

# Sync Astro types
sync:
    npm run sync

# Build graph data only (dev mode with projects)
graph-dev:
    npm run build:graph -- --dev

# Build graph data only (production mode, posts only)
graph-prod:
    npm run build:graph

# Tag projects with derived metadata
tag-projects *FLAGS:
    npx tsx src/scripts/tag-projects.ts {{FLAGS}}

# Run smoke tests (Tier 1: build integrity)
smoke:
    @echo "=== Smoke Tests (Tier 1) ==="
    @echo "TypeScript check..."
    npx astro check
    @echo "Unit tests..."
    npx vitest run
    @echo "Graph build (dev)..."
    just graph-dev
    @echo "Graph build (prod)..."
    just graph-prod
    @echo "Full build..."
    just build
    @echo "=== All smoke tests passed ==="
