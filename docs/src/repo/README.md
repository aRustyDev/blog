# proj-dirs

📁 **`/tina`** - TinaCMS Configuration

This directory contains the configuration for **Tina CMS** (Content Management System). 

- **File**: `tina/config.ts` - Defines the CMS schema and settings
- **Purpose**: Tina CMS provides a visual editor interface for managing your blog content
- **Key Features**:
  - Defines content structure for blog posts (title, description, cover image, tags, category, etc.)
  - Outputs admin interface to `/public/admin` 
  - Manages media files in `/src/assets/images`
  - When you run `pnpm dev`, it launches the Tina CMS dev server alongside Astro
- **Access**: The admin UI is available at `/admin` when running locally

## 📁 **`/public`** - Static Assets

This directory contains static files that are **copied directly** to the build output without processing.

- **Contents**:
  - `favicon.svg` - Site icon
  - `robots.txt` - Search engine crawling instructions
  - `open-graph.png` - Social media preview image
  - `demo.gif`, `project.png` - Images/demos
  - `/fonts` - Web fonts
  - `/admin` - TinaCMS admin interface (built by Tina)
- **Purpose**: These files are served as-is at the root URL (e.g., `/favicon.svg`, `/robots.txt`)
- **Deployment**: Copied directly to the Cloudflare Worker's static assets

## 📁 **`/src`** - Source Code & Content

This is the main application source directory containing all your Astro components, pages, and content.

- **Structure**:
  - `/content/blog/` - Your blog posts (MDX files) - this is what Tina CMS edits
  - `/pages/` - Astro pages that become routes
  - `/components/` - Reusable UI components
  - `/layouts/` - Page layout templates
  - `/styles/` - CSS/styling files
  - `/utils/` - Utility functions
  - `/data/` - Configuration data (like categories, site config)
  - `/assets/` - Images and assets that get processed/optimized by Astro
- **Purpose**: All code that gets compiled, bundled, and transformed by Astro during build
- **Deployment**: Processed by Astro and bundled for the Cloudflare Worker

**In summary**: `/tina` = CMS config, `/public` = static files, `/src` = your application code and blog content.
