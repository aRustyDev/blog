# Plan: Blog as MCP Endpoint

**Status**: draft
**Goal**: Make blog content queryable via MCP for use in resume-building pipeline and other AI workflows.
**Primary use case**: Feed blog posts, project metadata, and graph relationships into Claude for resume/cover letter generation.
**Secondary use case**: Make the blog publicly AI-queryable for any MCP client.

## Phased Approach

### Phase 1: Local MCP Server (30-60 min)

**Goal**: Query blog content from Claude Code/Desktop immediately, no blog changes.

**Steps**:
1. Evaluate `library-mcp` vs `MCP-Markdown-RAG` vs custom
   - library-mcp: simpler, tag/date/text search, Python
   - MCP-Markdown-RAG: semantic search, vector embeddings, Python + Milvus
   - Custom: TypeScript, reads graph.json + markdown, tailored to our schema
2. Install chosen tool, configure to read:
   - `src/data/blog/*.md` (published posts)
   - `content/_projects/*/index.md` (project metadata)
   - `public/graph.json` (relationship graph)
3. Add to `.claude/settings.json` as MCP server (stdio transport)
4. Test: query blog content from Claude Code
5. Test: use blog content to inform a resume draft

**Decision point**: Is a generic tool sufficient, or do we need custom tools that understand graph.json?

**Custom MCP tools to consider**:
- `search_posts(query)`: full-text search across posts
- `get_post(slug)`: full content of a post
- `list_by_tag(tag)`: filter posts/projects by tag
- `get_project(slug)`: project metadata + artifact table
- `get_graph_neighbors(node_id)`: related nodes from graph.json
- `get_expertise_summary()`: aggregate tags, categories, project counts
- `list_projects_by_status(status)`: filter by lifecycle stage

**Output**: Working local MCP server, queryable from Claude Code.

### Phase 2: Build-Time Content Manifest (2-4 hours)

**Goal**: Generate structured JSON artifacts at build time for consumption by MCP/RAG.

**Steps**:
1. Create `src/scripts/build-content-manifest.ts` (following `build-graph.ts` pattern)
   - Parse all markdown files (posts + projects)
   - Extract frontmatter + full text content
   - Include graph relationships per node
   - Output: `public/content-manifest.json`
2. Add `llms.txt` generation to build pipeline
   - `public/llms.txt`: titles + URLs
   - `public/llms-full.txt`: full post content in markdown
3. Update `package.json` build script:
   ```
   build:graph && build:content-manifest && astro check && astro build && pagefind
   ```
4. Update Phase 1 MCP server to read `content-manifest.json` instead of raw markdown

**Output**: `content-manifest.json` + `llms.txt` generated on every build.

### Phase 3: Dual-Purpose Cloudflare Worker (1-2 days)

**Goal**: Blog serves static pages AND MCP endpoint from same domain.

**Steps**:
1. Create `src/worker/index.ts` with path-based routing:
   - `/mcp` -> MCP handler (reads content-manifest.json)
   - `/*` -> `env.ASSETS.fetch(request)` (static site)
2. Update `wrangler.jsonc`:
   ```jsonc
   {
     "main": "./src/worker/index.ts",
     "assets": {
       "directory": "./dist",
       "binding": "ASSETS"
     }
   }
   ```
3. Implement MCP handler using Cloudflare's `agents` SDK or raw streamable HTTP
4. Decide auth: public (read-only content) or Cloudflare Access (gated)
5. Update `.claude/rules/cf-wrangler.md` to reflect hybrid config
6. Test: connect Claude Desktop to `https://blog.arusty.dev/mcp`
7. Deploy

**Decision point**: Does hybrid mode affect static site performance or caching?

**Output**: Blog publicly queryable via MCP at `blog.arusty.dev/mcp`.

### Phase 4: Semantic Search (optional, when content volume justifies)

**Goal**: Natural language queries against blog content.

**Two sub-options**:

**4a. AutoRAG (managed)**:
1. Upload content to R2 bucket as part of build
2. Configure AutoRAG to index R2 bucket
3. Query via AutoRAG API from the Worker
4. Minimal code, managed infrastructure

**4b. Custom RAG (Vectorize + Workers AI)**:
1. Add Vectorize index + Workers AI bindings to wrangler.jsonc
2. Generate embeddings at build time or via ingestion endpoint
3. Store vectors in Vectorize, documents in D1
4. Implement similarity search in Worker

**Decision criteria**: AutoRAG if <100 documents and want simplicity. Custom if need control over chunking, embedding model, or search tuning.

**Output**: Semantic search capabilities on MCP endpoint.

## Dependencies

| Phase | Depends On | Blocks |
|-------|-----------|--------|
| 1 | Nothing | 2, resume pipeline |
| 2 | 1 (validates tools are useful) | 3 |
| 3 | 2 (content manifest) | 4 |
| 4 | 3 (Worker infrastructure) | Nothing |

## Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Generic MCP tools don't understand graph.json | Medium | Low | Build custom MCP server (Phase 1 decision point) |
| Hybrid Worker affects static site caching | Low | Medium | Test before deploying; can always revert wrangler.jsonc |
| MCP spec changes break endpoint | Low | Medium | Pin to stable MCP version; streamable HTTP is stable |
| Content manifest too large | Low | Low | Lazy-load project details; manifest is metadata-only |
| AutoRAG beta instability | Medium | Low | Fall back to custom Vectorize pipeline |

## Success Criteria

- [ ] Phase 1: Can query blog content from Claude Code and generate resume context
- [ ] Phase 2: `content-manifest.json` and `llms.txt` generated on every build
- [ ] Phase 3: `blog.arusty.dev/mcp` responds to MCP requests from any client
- [ ] Phase 4: "What has this person written about security?" returns semantically relevant posts

## Reference Material

- `refs/research-findings.md`: Full research document with 6 options analyzed
- `refs/architecture-options.md`: Current stack, existing tools, config patterns
- `refs/key-urls.md`: Cloudflare docs, MCP tools, implementations, standards
