<div align="center">

# aRustyDev's Blog

Technical notes on security, systems, and software engineering.

[blog.arusty.dev](https://blog.arusty.dev/)

![GitHub last commit](https://img.shields.io/github/last-commit/aRustyDev/blog)
![GitHub repo size](https://img.shields.io/github/repo-size/aRustyDev/blog)
![GitHub license](https://img.shields.io/github/license/aRustyDev/blog)
![Node version](https://img.shields.io/badge/node-%3E%3D20.19.0-brightgreen)
![Cloudflare Workers](https://img.shields.io/badge/deployed%20on-Cloudflare%20Workers-F38020?logo=cloudflare&logoColor=white)

</div>

## Features

<p align="center">
  <a href="https://pagespeed.web.dev/analysis/https-blog-arusty-dev/">
    <img width="510" alt="Lighthouse Score" src="public/openblog-lighthouse-score.svg">
  </a>
</p>

- Interactive graph visualization (Obsidian-style knowledge graph)
- Full-text search via Pagefind
- Dark/light theme with [brand.arusty.dev](https://brand.arusty.dev) integration
- RSS feed
- SEO optimized with dynamic OG images
- Responsive design
- View transitions

## Stack

| Technology                                                                         | Purpose                     |
| :--------------------------------------------------------------------------------- | :-------------------------- |
| [Astro 5](https://astro.build/) + TypeScript                                       | Static site framework       |
| [React](https://react.dev/)                                                        | Graph visualization islands |
| [Tailwind CSS v4](https://tailwindcss.com/)                                        | Utility-first styling       |
| [Sigma.js](https://www.sigmajs.org/) + [Graphology](https://graphology.github.io/) | Interactive graph rendering |
| [Pagefind](https://pagefind.app/)                                                  | Static search               |
| [Shiki](https://shiki.style/)                                                      | Syntax highlighting         |
| [Cloudflare Workers](https://developers.cloudflare.com/workers/)                   | Deployment                  |

## Running Locally

**Prerequisites:** Node >= 20.19.0, npm (not pnpm)

**Recommended VS Code extensions:** [Astro](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode), [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

```bash
git clone git@github.com:aRustyDev/blog.git
cd blog
just install    # Install dependencies
just dev        # Start dev server
just build      # Production build
just preview    # Preview production build
just check      # Run format + lint checks
```

## Commands

All commands are run from the root of the project via [just](https://github.com/casey/just):

| Command        | Action                                 |
| :------------- | :------------------------------------- |
| `just install` | Install dependencies                   |
| `just dev`     | Start local dev server                 |
| `just build`   | Production build to `./dist/`          |
| `just preview` | Preview build locally                  |
| `just check`   | Run format + lint checks               |
| `just format`  | Format code with Prettier              |
| `just lint`    | Lint with ESLint                       |
| `just deploy`  | Build and deploy to Cloudflare Workers |
| `just clean`   | Remove build artifacts                 |
| `just sync`    | Generate Astro TypeScript types        |

## Architecture

See the [`docs/`](./docs/) directory for detailed documentation, including:

- [Architecture Decision Records](./docs/src/adrs/)
- [Repository structure](./docs/src/repo/)
- [Content publishing workflow](./docs/content-publishing-workflow.md)
