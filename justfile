# Justfile for blog management

# Default recipe - show available commands
default:
    @just --list

# Install dependencies
install:
    npm install

# Run local development server
dev:
    npm run dev

# Preview production build locally
preview:
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

# Test build locally
test: build preview

# Deploy to Cloudflare Pages
deploy: build
    @echo "Deploying to Cloudflare Pages..."
    npx wrangler pages deploy dist --project-name=blog

# Deploy without building (use existing dist/)
deploy-only:
    @echo "Deploying existing build to Cloudflare Pages..."
    npx wrangler pages deploy dist --project-name=blog

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
