# Justfile for blog management

# Default recipe - show available commands
default:
    @just --list

# Install dependencies
install:
    pnpm install

# Run local development server (without Tina CMS)
dev:
    pnpm start

# Run local development server with Tina CMS admin interface
dev-cms:
    pnpm dev

# Preview production build locally
preview:
    pnpm preview

# Format code
format:
    pnpm format

# Check code formatting
format-check:
    pnpm format:check

# Lint code
lint:
    pnpm lint

# Run all checks (format, lint)
check: format-check lint

# Build the site for production
build:
    pnpm build
    @echo "Build complete. Output in ./dist"

# Build and remove admin interface
build-prod: build
    @echo "Removing /admin interface from production build..."
    rm -rf dist/admin
    @echo "Production build ready for deployment"

# Test build locally
test: build-prod preview

# Deploy to Cloudflare Workers
deploy: build-prod
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
    @echo "Cleaned build artifacts"

# Full clean including node_modules
clean-all: clean
    rm -rf node_modules/
    rm -rf pnpm-lock.yaml
    @echo "Cleaned everything"

# Sync Astro types
sync:
    pnpm sync
