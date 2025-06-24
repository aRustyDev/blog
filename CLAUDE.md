# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based blog template using TypeScript, Tailwind CSS, and MDX for content. The project includes Tina CMS integration, search functionality via Pagefind, and comprehensive pre-commit hooks.

## Essential Commands

### Development
```bash
# Start development server with Tina CMS
pnpm dev

# Start development server without CMS
pnpm start

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Code Quality
```bash
# Lint code with ESLint
pnpm lint

# Format code with Prettier
pnpm format

# Check formatting without applying changes
pnpm format:check

# Sync Astro types
pnpm sync
```

### Pre-commit
The project uses extensive pre-commit hooks. To run manually:
```bash
pnpm pre-commit
```

## Architecture Overview

### Content Schema (src/content/config.ts)
Blog posts require:
- `title`: String (max 80 chars)
- `description`: String
- `pubDate`: Date
- `heroImage`: Image reference
- `category`: Must be one of: 'How2', 'Analysis', 'Projects', 'ELI5', 'Rants', 'CTFs', 'Random'
- `tags`: Optional string array
- `draft`: Optional boolean (defaults to false)

### Key Configuration Files
- `astro.config.mjs`: Astro configuration with site URL, integrations, and markdown settings
- `src/data/site.config.ts`: Site metadata (title, author, pagination settings)
- `src/data/categories.ts`: Valid blog categories enum
- `.pre-commit-config.yaml`: Hooks for code quality, security scanning, and commit validation

### Project Structure
```
src/
├── content/blog/        # MDX blog posts
├── components/          # Reusable Astro components
│   ├── icons/          # Icon components
│   └── mdx/            # MDX-specific components
├── layouts/            # Page layouts (BaseLayout, BlogPost)
├── pages/              # Route-based pages
├── data/               # Configuration files
└── utils/              # Helper functions
```

### Content Management
- Blog posts are MDX files in `src/content/blog/`
- Filename becomes the URL slug
- Draft posts: Set `draft: true` in frontmatter
- Categories must match values in `src/data/categories.ts`
- Images go in `src/assets/images/`

### Git Workflow
- Uses conventional commits (@commitlint/config-conventional)
- Pre-commit hooks validate commits, scan for secrets, optimize images
- GitHub Actions deploy to GitHub Pages on main branch push
- Currently on `blog-posts` branch with uncommitted changes

### Important Notes
1. **Package.json has merge conflicts** - Resolve before installing dependencies
2. **Category validation** - Zod validates categories; invalid categories throw build errors
3. **Image references** - Use relative paths from the MDX file location
4. **Search index** - Pagefind builds search index post-build automatically
5. **Deployment** - Site URL in astro.config.mjs must match deployment domain

### Common Tasks

#### Adding a Blog Post
1. Create MDX file in `src/content/blog/`
2. Include required frontmatter properties
3. Ensure category exists in `src/data/categories.ts`
4. Place images in `src/assets/images/`

#### Modifying Site Configuration
1. Edit `src/data/site.config.ts` for metadata
2. Update `astro.config.mjs` for site URL
3. Modify social links in `src/components/Header.astro`

#### Working with Components
- Follow existing component patterns
- Use Tailwind classes with `clsx` and `tailwind-merge`
- Icons are in `src/components/icons/`
- MDX components in `src/components/mdx/`