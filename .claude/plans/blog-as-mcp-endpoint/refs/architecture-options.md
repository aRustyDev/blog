# Architecture Options Reference

## Current Blog Stack

- Astro 5.16.6 (static output, no SSR adapter)
- Cloudflare Workers (static assets only, no `main` entry point)
- Pagefind 1.4.0 (WASM full-text search, client-side)
- graph.json: 100 nodes, 442 edges, 45+ tags, 28 categories
- Content: 5 posts in `src/data/blog/`, 97 projects in `content/_projects/`

## Key Config Files

- `wrangler.jsonc`: static assets only, `assets.directory: "./dist"`
- `astro.config.ts`: no `output` or `adapter` configured
- `package.json` build: `build:graph && astro check && astro build && pagefind --site dist`
- `src/content.config.ts`: Content Collections schema (title, pubDatetime, tags, description, etc.)
- `src/scripts/build-graph.ts`: 305-line graph generator (parse markdown, build nodes/edges, output JSON)

## Existing MCP Tools for Markdown

| Tool | Type | Transport | Features |
|------|------|-----------|----------|
| library-mcp | Local | stdio | Tag/date filter, text search, designed for knowledge bases |
| MCP-Markdown-RAG | Local | stdio | Semantic vector search, Milvus, heading-based chunking |
| markdown-frontmatter-mcp | Local | stdio | Frontmatter metadata queries |
| mcp-local-rag | Local | stdio | Semantic + keyword, zero setup |
| SiteMCP | Local | stdio | Crawls deployed site, exposes pages as MCP resources |

## Cloudflare Dual-Purpose Worker Pattern

```typescript
// A single Worker handles static assets AND MCP
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/mcp") {
      return handleMcpRequest(request, env);
    }
    return env.ASSETS.fetch(request);
  },
};
```

Requires adding `main` to wrangler.jsonc and `binding: "ASSETS"` to assets config.

## Cloudflare RAG Stack

- Workers AI: `@cf/baai/bge-base-en-v1.5` (768-dim embeddings)
- Vectorize: distributed vector DB (cosine similarity)
- D1: SQLite for full document text
- AutoRAG: managed pipeline (open beta), point at R2 bucket

## Build-Time Embeddings Pattern (allaboutken.com)

- MiniLM-L6-v2 via Transformers.js
- ~1000-char overlapping chunks (stride 800, sentence boundary snap)
- Output: vectors.json as static asset
- Browser: cosine similarity search, ~30MB initial download

## Blog Platforms with Content APIs

| Platform | API | MCP Exists? |
|----------|-----|-------------|
| Ghost | REST Content + Admin API | No known MCP |
| WordPress | REST API (built-in) | Yes (wp-mcp) |
| Notion | REST API | Yes (multiple) |
| Obsidian | Local REST plugin | Yes (multiple) |
| Hugo/Gatsby/Astro | None built-in | Hugo: yes (hugo-mcp) |
