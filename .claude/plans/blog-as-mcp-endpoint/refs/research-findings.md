# Research: Turning a Static Blog into a RAG Endpoint or MCP Server

> Research compiled 2026-03-25. Sources: web search, Cloudflare documentation, GitHub repositories, project documentation, and community implementations.

---

## Context: Current Blog Architecture

The blog (blog.arusty.dev) is:
- **Framework**: Astro (static output, no SSR adapter)
- **Hosting**: Cloudflare Workers via `wrangler.jsonc` (static assets only, no `main` entry point)
- **Search**: Pagefind (keyword-based, built at build time, client-side)
- **Content**: Markdown files in `src/data/blog/` with frontmatter
- **Build**: `astro build && pagefind --site dist`

This means the site currently has **no server-side execution**. Every approach below requires evaluating what changes to that architecture.

---

## Option 1: Local MCP Server Over Markdown Files (No Web Infrastructure)

### Architecture
A local MCP server runs on your machine (via stdio transport) and reads markdown files directly from disk. AI clients like Claude Desktop, Claude Code, or Cursor connect to it locally.

### Existing Implementations

**library-mcp** (Will Larson, https://github.com/lethain/library-mcp)
- Works with folders of `.md` files with frontmatter (title, tags, URL, date)
- Exposes tools: list by tag, list by date range, retrieve content, text search
- Designed for his "datapack" concept -- dynamically building relevant content subsets for an LLM rather than dumping everything into one context window
- Python, runs locally, no web infrastructure needed
- "A simple MCP that you can use locally with tools like Claude Desktop to explore Markdown knowledge bases"

**MCP-Markdown-RAG** (Zackriya Solutions, https://github.com/Zackriya-Solutions/MCP-Markdown-RAG)
- Semantic search engine for markdown files via MCP
- Uses Milvus (file-based vector DB) for local storage
- Generates vector embeddings locally (~50MB model download on first run)
- Two MCP tools: `index_documents` (accepts directory, supports incremental updates) and `search` (semantic similarity)
- Splits documents by headings into logical chunks
- Python (requires UV), actively developed

**markdown-frontmatter-mcp** (https://github.com/caffeinatedwes/markdown-frontmatter-mcp)
- Queries markdown files by frontmatter metadata (tags, dates)
- Designed specifically for Obsidian vaults but works with any markdown collection

**mcp-local-rag** (https://github.com/shinpr/mcp-local-rag)
- Local-first RAG server for developers
- Semantic + keyword search for code and technical docs
- Fully private, zero setup

### Complexity
**Minimal.** No changes to the blog at all. Point the MCP server at `src/data/blog/` and it reads your existing markdown files. Configure in `.claude/settings.json` or Claude Desktop config.

### Trade-offs
| Gain | Lose |
|------|------|
| Immediate access -- works today with zero blog changes | Only works locally (your machine) |
| Full semantic search over your own content | Not accessible to external AI agents or other users |
| Privacy -- nothing leaves your machine | Requires running a local process |
| Can include unpublished drafts and research notes | No public-facing API |

### Verdict
**Best starting point.** This answers the question "can an MCP server just read local markdown files?" with a definitive yes. Multiple production-quality implementations exist. For personal use (querying your own blog content from Claude Code), this is the fastest path.

---

## Option 2: Remote MCP Server on Cloudflare Workers (Dual-Purpose Worker)

### Architecture
Convert the blog's Cloudflare Worker from pure static asset serving to a hybrid: static assets for browser requests, MCP endpoint for AI agent requests. A single Worker handles both via URL path routing.

Cloudflare's documentation explicitly shows this pattern:

```typescript
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    // MCP endpoint
    if (url.pathname === "/mcp") {
      return handleMcpRequest(request, env);
    }
    // Serve static assets (HTML, CSS, images)
    return env.ASSETS.fetch(request);
  },
};
```

### How Cloudflare Remote MCP Works
- **Transport**: Streamable HTTP (single HTTP endpoint for bidirectional messaging, introduced March 2025)
- **Framework**: `@anthropic-ai/agents` SDK or `createMcpHandler` (stateless)
- **Auth**: Optional OAuth flow, or public (authless) for read-only content
- **Deployment**: Standard `wrangler deploy`, uses `main` entry point alongside `assets`

### What Changes to the Blog
1. Add `@astrojs/cloudflare` adapter for hybrid rendering, OR
2. Keep Astro fully static and add a separate Worker script as the `main` entry point that routes between MCP and static assets

The second approach is simpler -- no Astro changes, just a small Worker script that checks the path and either handles MCP or falls through to `env.ASSETS.fetch()`.

### Wrangler Config Change
```jsonc
{
  "name": "blog-worker",
  "main": "./src/worker/index.ts",  // NEW: adds server-side logic
  "assets": {
    "directory": "./dist",
    "binding": "ASSETS"  // NEW: assets become a binding
  }
}
```

### MCP Tools to Expose
- `list_posts` -- return titles, tags, dates, slugs
- `get_post` -- return full markdown content of a specific post
- `search_posts` -- keyword or semantic search across posts
- `list_tags` -- return all tags with post counts
- `get_posts_by_tag` -- filter posts by tag

### Complexity
**Moderate.** Requires:
- Writing a small Worker script (~100-200 lines)
- Adding `main` entry point to wrangler config
- Bundling blog content data (a JSON manifest) at build time
- No Astro architecture changes if using the Worker-alongside-assets approach

### Trade-offs
| Gain | Lose |
|------|------|
| Publicly accessible MCP endpoint for any AI agent | Adds server-side complexity to a static site |
| Same domain, same deployment, zero additional infra | Must think about rate limiting and abuse |
| Edge-deployed globally via Cloudflare | Content updates require rebuild + redeploy |
| Can add auth via Cloudflare Access if needed | MCP spec is still maturing (though stabilizing) |
| Positions the blog as AI-queryable | Need to maintain the Worker code |

### Verdict
**Best option for public AI accessibility.** This directly answers "can a Cloudflare Worker serve as both a static site AND an MCP endpoint?" -- yes, and Cloudflare explicitly documents this dual-purpose pattern. The incremental complexity is low given the existing Cloudflare Workers deployment.

---

## Option 3: Cloudflare Workers + Vectorize + Workers AI (Full RAG)

### Architecture
Extend Option 2 with vector embeddings for semantic search. Cloudflare provides a fully integrated stack:

1. **Workers AI** -- generates embeddings using `@cf/baai/bge-base-en-v1.5` (768-dimension vectors)
2. **Vectorize** -- globally distributed vector database (cosine similarity search)
3. **D1** -- SQLite-compatible database for storing full document text
4. **Workers** -- orchestration layer that ties it all together

### RAG Pipeline (Cloudflare Reference Architecture)
**Knowledge Seeding (at build time or via admin endpoint):**
1. POST blog content to an API endpoint
2. Worker processes input, sends to Queues for batch processing
3. Consumer generates embeddings via Workers AI
4. Vectors stored in Vectorize, documents stored in D1
5. Queue handles ack/retry

**Knowledge Queries (at request time):**
1. GET query to API endpoint
2. Generate embedding for the query via Workers AI
3. Vector search in Vectorize for similar content
4. Retrieve full documents from D1
5. Optionally pass query + retrieved docs to Workers AI text generation model

### AutoRAG -- Managed Alternative
Cloudflare now offers **AutoRAG** (open beta) -- a fully managed RAG pipeline:
- Point it at an R2 bucket containing your content
- Automatic chunking, embedding, and vector storage
- Continuous indexing (re-processes new/updated files automatically)
- Single API endpoint for queries
- No code required for the RAG pipeline itself

This could work by uploading blog markdown to R2 as part of the build step.

### Wrangler Config
```jsonc
{
  "name": "blog-worker",
  "main": "./src/worker/index.ts",
  "assets": { "directory": "./dist", "binding": "ASSETS" },
  "vectorize": [{ "binding": "VECTORIZE", "index_name": "blog-index" }],
  "ai": { "binding": "AI" },
  "d1_databases": [{ "binding": "DB", "database_name": "blog-content" }]
}
```

### Complexity
**Significant.** Requires:
- Setting up Vectorize index, D1 database
- Writing embedding generation pipeline (or using AutoRAG)
- Managing content ingestion on each deploy
- More complex Worker code for query handling
- Understanding vector search tuning (chunk size, overlap, distance metrics)

### Trade-offs
| Gain | Lose |
|------|------|
| True semantic search ("find posts about error handling patterns" works even if those exact words aren't used) | Substantially more infrastructure to manage |
| Can power an AI chatbot that answers questions about your blog | Ongoing cost (Workers AI, Vectorize, D1 -- though free tiers are generous) |
| Production-grade RAG at the edge | Over-engineered for a personal blog with ~5 posts |
| AutoRAG reduces most of the complexity | AutoRAG is still in beta |

### Verdict
**Best for serious "blog as knowledge base" use cases.** Overkill for current blog size, but becomes valuable as content grows. AutoRAG significantly lowers the barrier. Consider this as a Phase 2 after Option 2 proves the concept.

---

## Option 4: Build-Time Embeddings Served as Static Assets (No Server Required)

### Architecture
Generate vector embeddings at build time and ship them as a static JSON file. Search runs entirely in the browser using a WASM-compiled embedding model.

### Real Implementation: allaboutken.com (March 2026)
A working example uses this exact approach for an Eleventy blog:

1. **Build pipeline**: Node.js script runs after static site build
2. **Model**: MiniLM-L6-v2 via Transformers.js
3. **Chunking**: Splits each post into overlapping ~1000-character chunks (stride 800, snaps to sentence boundaries)
4. **Output**: `vectors.json` shipped as a static asset
5. **Browser search**: Downloads ~30MB on first use (model + vectors), then runs entirely on-device
6. **Scoring**: Cosine similarity per chunk, keeps best match per page

### How to Apply to This Blog
Add a build step after `pagefind`:
```
astro build && pagefind --site dist && node scripts/generate-embeddings.js
```

The embedding script would:
1. Read all markdown files from `src/data/blog/`
2. Extract text content (strip frontmatter and markdown syntax)
3. Split into overlapping chunks
4. Generate embeddings via Transformers.js (runs in Node.js)
5. Write `dist/vectors.json` (or chunked files for lazy loading)

### Serving via API (Hybrid)
The vectors.json could also be consumed by a thin Worker endpoint that does similarity search server-side, avoiding the 30MB client download.

### Complexity
**Moderate.** Requires:
- Build script (~100 lines of JavaScript)
- Transformers.js dependency
- Client-side search component (or thin server wrapper)
- Build time increases (embedding generation takes seconds to minutes depending on content volume)

### Trade-offs
| Gain | Lose |
|------|------|
| True semantic search with zero runtime infrastructure | 30MB download for browser-side search |
| No API keys, no cloud dependencies | Embeddings are frozen at build time |
| Works offline after first load | Build time increases |
| Complements existing Pagefind (keyword + semantic) | Not directly useful for MCP/RAG (no query API) |
| Can be served from a Worker endpoint cheaply | Model quality limited by what runs in-browser |

### Verdict
**Best for adding semantic search to the blog itself** (human visitors). Not directly useful for MCP or external AI agent access unless paired with a Worker endpoint. The allaboutken.com implementation proves it works well in practice.

---

## Option 5: SiteMCP -- Turn the Deployed Website into an MCP Server (External Tool)

### Architecture
SiteMCP (https://github.com/nicepkg/sitemcp) is a TypeScript tool (~300 lines) that:
1. Crawls an existing website
2. Extracts readable text from each page
3. Spins up a local MCP server exposing every page as a resource

No changes to the blog at all -- it works with the already-deployed site.

### How It Works
- Uses polite rate limiting, ETags, If-Modified-Since caching
- Supports CSS selector targeting for specific content areas
- Configurable match patterns (micromatch globs) for URL filtering
- Works best with server-rendered HTML (which Astro static output is)

### Related: Seite SSG
Seite is a static site generator that builds MCP integration as a first-class feature:
- Generates `llms.txt`, `llms-full.txt`, and `.md` copies of every page
- Built-in MCP server over stdio (auto-starts via `.claude/settings.json`)
- Claude Code integration: `seite init` generates `.claude/CLAUDE.md` with full site schema
- Shows what "MCP-native" static site generation looks like

### Complexity
**Minimal.** Zero changes to the blog. Install SiteMCP, point it at `blog.arusty.dev`, done.

### Trade-offs
| Gain | Lose |
|------|------|
| Zero blog changes | Crawls HTML, not source markdown (less structured) |
| Works with any website | Only works locally |
| Quick evaluation tool | Content is stale until re-crawled |
| Polite caching reduces repeat crawl cost | ~300 lines of TypeScript dependency |

### Verdict
**Good for quick experiments** and validating whether MCP access to blog content is actually useful before investing in deeper integration. Not a long-term architecture.

---

## Option 6: llms.txt -- Passive AI Discoverability (No Server, Build-Time Only)

### Architecture
Generate `/llms.txt` and `/llms-full.txt` files at build time and serve them as static assets. This is a proposed standard (https://llmstxt.org/) for making website content consumable by LLMs.

### File Structure
- **`/llms.txt`**: Lightweight summary -- site name, one-sentence description per page, URLs
- **`/llms-full.txt`**: Complete content of all pages in plain markdown

### Current Adoption
Over 844,000 websites have implemented it (as of late 2025). Anthropic, Cloudflare, and Stripe use it. However, no major AI platform has officially confirmed they read these files, and empirical analysis of 300,000 domains showed no measurable impact on AI citation rates.

### Implementation
Add an Astro build step or page that:
1. Queries all blog posts via content collections
2. Generates `llms.txt` with titles and URLs
3. Generates `llms-full.txt` with full post content in markdown

### Complexity
**Minimal.** A single Astro page or build script (~50 lines).

### Trade-offs
| Gain | Lose |
|------|------|
| Zero runtime infrastructure | Passive -- no query capability |
| Standards-compliant (emerging) | No evidence AI models actually use it today |
| Trivially easy to implement | Does not enable RAG or MCP |
| Good documentation hygiene | Content is only as fresh as last deploy |

### Verdict
**Low-effort, low-reward, but harmless.** Worth adding as a build artifact alongside the existing sitemap. Not a substitute for MCP or RAG -- it is passive discovery, not an interactive query interface.

---

## Answering the Specific Questions

### 1. Can a Cloudflare Worker serve as both a static site AND an MCP endpoint?
**Yes.** Cloudflare explicitly documents this pattern. The Worker uses URL path routing: `/mcp` goes to the MCP handler, everything else falls through to `env.ASSETS.fetch(request)`. The `createMcpHandler` API from Cloudflare's agents SDK supports stateless MCP servers. Streamable HTTP transport works over a single HTTP endpoint. No architectural conflict with static asset serving.

### 2. Can an MCP server just read local markdown files without any web infrastructure?
**Yes.** Multiple production implementations exist:
- **library-mcp** (Will Larson) -- tag/date filtering + text search over markdown folders
- **MCP-Markdown-RAG** (Zackriya Solutions) -- semantic vector search over markdown files
- **markdown-frontmatter-mcp** -- frontmatter metadata queries
- **mcp-local-rag** -- local semantic + keyword search

These run locally via stdio transport. Claude Desktop, Claude Code, and Cursor all support this. Configuration is a few lines in `.claude/settings.json`.

### 3. What blog platforms already offer API access to content?
| Platform | API Type | Notes |
|----------|----------|-------|
| **Ghost** | RESTful Content API + Admin API | Self-consuming JSON API. Custom integrations get Content API + Admin API keys automatically. Webhooks for real-time sync. |
| **WordPress** | REST API (built-in since 4.7) | Full CRUD access to posts, pages, media. Extensive plugin ecosystem. |
| **Notion** | REST API | Database and page content in JSON. Requires integration token. Multiple RAG implementations exist (NotionRAG, notionLM). |
| **Obsidian** | Local REST API plugin | Local-only API. Multiple MCP servers exist (obsidian-mcp-server, ezrag, obsidian-rag-mcp). |
| **Hashnode** | GraphQL API | Full content access. |
| **Dev.to** | REST API | Public articles accessible without auth. |
| **Medium** | Limited RSS only | No real API for content retrieval. |
| **Hugo/Gatsby/Astro** | None built-in | Static generators -- content is files, not API. Must build your own. |

### 4. Are there existing MCP servers for markdown/content directories?
Yes, at least five:
1. **library-mcp** -- tag/date/text search, designed for knowledge bases
2. **MCP-Markdown-RAG** -- semantic vector search with Milvus
3. **markdown-frontmatter-mcp** -- frontmatter metadata queries
4. **mcp-local-rag** -- semantic + keyword, zero setup
5. **ezrag** -- Obsidian vault to Gemini File Search index with MCP endpoint

### 5. Can you generate vector embeddings at build time and serve them from a static site?
**Yes.** Proven implementation at allaboutken.com (March 2026):
- Build script generates embeddings using MiniLM-L6-v2 via Transformers.js
- Posts split into overlapping ~1000-char chunks
- Output: `vectors.json` shipped as static asset
- Browser runs cosine similarity search entirely on-device
- Trade-off: ~30MB initial download, but zero server costs
- Results are good -- semantic matches surface content that keyword search misses

### 6. What does the "blog as personal knowledge base" architecture look like?
Three tiers:

**Tier 1 -- Local Only (Personal Use)**
```
Your Markdown Files --> local MCP server (library-mcp) --> Claude Desktop/Code
```
- You query your own content from your AI tools
- Nothing public, nothing to deploy

**Tier 2 -- Public API (External AI Access)**
```
Astro Build --> Static Assets + Content JSON
                     |
Cloudflare Worker ---+--- Browser requests --> Static HTML
                     +--- /mcp requests --> MCP handler (reads content JSON)
                     +--- /api/search --> Search endpoint
```
- Your blog is queryable by any MCP client
- Same infrastructure, one Worker

**Tier 3 -- Full RAG (Semantic Knowledge Base)**
```
Astro Build --> R2 (markdown storage)
                     |
AutoRAG / Vectorize -+--- Automatic embedding + indexing
                     |
Cloudflare Worker ---+--- Browser --> Static HTML
                     +--- /mcp --> MCP with semantic search
                     +--- /api/ask --> RAG-powered Q&A
```
- Natural language queries about your blog content
- "What has this person written about error handling?" actually works
- Continuous re-indexing as content changes

---

## Recommended Progression for This Blog

### Phase 1: Local MCP (Today, 30 minutes)
Install `library-mcp` or `MCP-Markdown-RAG`. Point at `src/data/blog/`. Add to `.claude/settings.json`. Immediately queryable from Claude Code.

### Phase 2: llms.txt + Content Manifest (Next build cycle, 2 hours)
Add build steps to generate:
- `/llms.txt` and `/llms-full.txt`
- `/content.json` (structured manifest of all posts with metadata)

These are static assets, zero infrastructure change.

### Phase 3: Dual-Purpose Worker (When ready to add SSR, 1 day)
Add a `main` entry point to the Worker. Route `/mcp` to an MCP handler that reads from the content manifest. Keep everything else static. This makes the blog publicly AI-queryable.

### Phase 4: Semantic Search (When content volume justifies it)
Add Vectorize + Workers AI bindings. Generate embeddings for blog content. Enable semantic search via the MCP endpoint. Consider AutoRAG for managed pipeline.

---

## Key Sources

- Cloudflare Remote MCP Server Guide: https://developers.cloudflare.com/agents/guides/remote-mcp-server/
- Cloudflare RAG Reference Architecture: https://developers.cloudflare.com/reference-architecture/diagrams/ai/ai-rag/
- Cloudflare AutoRAG: https://blog.cloudflare.com/introducing-autorag-on-cloudflare/
- Cloudflare Vectorize + Workers AI Tutorial: https://developers.cloudflare.com/vectorize/get-started/embeddings/
- library-mcp (Will Larson): https://lethain.com/library-mcp/
- MCP-Markdown-RAG: https://github.com/Zackriya-Solutions/MCP-Markdown-RAG
- EzRAG (Obsidian + Gemini): https://github.com/benbjurstrom/ezrag
- SiteMCP: https://github.com/nicepkg/sitemcp
- Seite SSG (MCP-native): https://news.ycombinator.com/item?id=47151427
- Static Site Semantic Search (allaboutken.com): https://www.allaboutken.com/posts/20260302-semantic-search-browser-embeddings/
- llms.txt Specification: https://llmstxt.org/
- Cloudflare Workers Static Assets: https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/static-assets/
- Hugo MCP Server: https://github.com/SunnyCloudYang/hugo-mcp
- markdown-frontmatter-mcp: https://github.com/caffeinatedwes/markdown-frontmatter-mcp
- Cloudflare AI Search: https://developers.cloudflare.com/ai-search/
- Ghost Content API: https://docs.ghost.org/content-api
- Pagefind: https://pagefind.app/
