---
id: "a1b2c3d4-1111-4aaa-b111-1111phase1001"
type: research-plan
status: complete
parent: ./context-engineering-taxonomy.md
children:
  # Topic follow-up plans (REVIEW tier)
  - ./phase-1-tool-use-mcp.md
  - ./phase-1-memory-systems.md
  - ./phase-1-rag.md
  - ./phase-1-prompt-engineering.md
  - ./phase-1-community-terminology.md
  # Topic follow-up plans (RESEARCH tier)
  - ./phase-1-production-engineering.md
  - ./phase-1-se-patterns.md
  - ./phase-1-multi-agent.md
  - ./phase-1-in-context-learning.md
  - ./phase-1-security-control.md
  # Cross-term plans (shared search queries)
  - ./phase-1-icl--prompt-eng.md
  - ./phase-1-tool-use--multi-agent.md
  - ./phase-1-production--se-patterns.md
  - ./phase-1-memory--rag.md
  - ./phase-1-tool-use--se-patterns.md
created: "2026-03-20T00:00:00Z"
updated: "2026-03-23T00:00:00Z"
---

# Phase 1: Literature Survey

**Objective**: Establish what prior work exists on context component taxonomies, identify the primary communities discussing "context engineering", and build a verified annotated bibliography with link graph data.

**Duration**: 2-3 hours
**Addresses**: Secondary questions 1, 4, 5, 7

## Search-Term Matrix

### Academic Sources (arXiv, Semantic Scholar, Google Scholar)

| Search Query | Target | Expected Yield |
|-------------|--------|---------------|
| "context engineering" LLM | Direct hits on the term | Low — term is emerging |
| "prompt engineering" taxonomy | Existing classification frameworks | Medium |
| "in-context learning" survey | Theoretical basis for context structure | High |
| "system prompt" design patterns | How practitioners structure context | Medium |
| "few-shot" "chain-of-thought" framework | Prompting technique taxonomies | High |
| "LLM" "tool use" architecture | How tools integrate with context | Medium |
| "retrieval augmented generation" "context window" | RAG as context management | Medium |
| "AI agent" "memory" architecture | Persistent context patterns | Medium |
| middleware pipeline "plugin architecture" patterns | SE parallels | High |

### Industry/Practitioner Sources (blogs, docs, talks)

| Search Query | Target | Expected Yield |
|-------------|--------|---------------|
| "context engineering" site:anthropic.com | Anthropic's usage of the term | Low-Medium |
| "context engineering" site:openai.com | OpenAI's perspective | Low |
| "context engineering" blog | Practitioner blog posts | Medium |
| "CLAUDE.md" context loading | Claude Code-specific context management | Medium |
| "system prompt" "rules" "skills" Claude Code | Component type terminology | Medium |
| "prompt engineering is dead" context | Posts arguing for the broader framing | Medium |
| Andrej Karpathy "context engineering" | Key voice who coined/popularized the term | High |
| "context window management" best practices | Practitioner frameworks | Medium |

### Community Sources

| Search Query | Platform | Expected Yield |
|-------------|----------|---------------|
| "context engineering" | Hacker News (algolia search) | Medium |
| "context engineering" | Reddit (r/MachineLearning, r/LocalLLaMA, r/ClaudeAI) | Medium |
| "context engineering" | Twitter/X | Medium-High |
| "prompt engineering" taxonomy | Discord (Anthropic, LangChain) | Low |
| "CLAUDE.md" best practices | GitHub discussions | Medium |
| claude code plugins skills | YouTube (conference talks) | Low-Medium |

### Software Engineering Pattern Sources

| Search Query | Target | Expected Yield |
|-------------|--------|---------------|
| middleware pipeline pattern | GoF/POSA patterns | High |
| plugin architecture extensibility | SE textbooks | High |
| event-driven architecture hooks | EDA literature | High |
| dependency injection context | DI container parallels | Medium |
| "context object" pattern | Context propagation in distributed systems | Medium |

## Tool Execution Strategy

### Primary: MCP Servers (preferred — structured data, no parsing needed)

| Task | MCP Tool | Notes |
|------|----------|-------|
| **Search arXiv** | `mcp__arxiv__search_papers` | Category filtering (cs.AI, cs.CL, cs.LG), date ranges, field-specific queries (`ti:`, `au:`, `abs:`) |
| **Read arXiv papers** | `mcp__arxiv__read_paper` | Returns full paper as markdown — no PDF parsing needed |
| **Search Semantic Scholar** | `mcp__semantic-scholar__paper_relevance_search` | Filter by field of study, venue, year, min citation count. **Credentialed** (higher limits) |
| **Paper details** | `mcp__semantic-scholar__paper_details` | Get title, authors, year, abstract, citation count, fields of study |
| **Paper citations** | `mcp__semantic-scholar__paper_citations` | Who cites this paper — for building link graph (cited-by) |
| **Paper references** | `mcp__semantic-scholar__paper_references` | What this paper cites — for building link graph (cites) |
| **Find related papers** | `mcp__semantic-scholar__get_paper_recommendations_single` | Discover related work from a seed paper |
| **Author search** | `mcp__semantic-scholar__author_search` | Find papers by known experts |

**Rate limit**: Semantic Scholar = 1 request/second across all endpoints. Batch searches carefully.

### Secondary: Web Tools (for non-academic sources)

| Source | Tool | Notes |
|--------|------|-------|
| Anthropic docs | `WebFetch` or `crawl4ai` | JS-heavy docs may need crawl4ai |
| Blog posts | `WebFetch` | Direct URL fetch + markdown extraction |
| Hacker News | `WebFetch` | Algolia API: `https://hn.algolia.com/api/v1/search?query={query}&tags=story` |
| Reddit | `WebFetch` | JSON API: `https://www.reddit.com/r/{sub}/search.json?q={query}&sort=relevance` |
| Twitter/X | `WebSearch` | Search for tweets, fetch threads via WebFetch |
| YouTube | `WebSearch` | Find talks, extract descriptions |
| GitHub discussions | `WebFetch` | GitHub API or raw page fetch |

### Link Graph Construction Workflow

For each academic paper found:
1. `mcp__semantic-scholar__paper_details` → get paper_id, title, authors, year, citation count
2. `mcp__semantic-scholar__paper_references` → get outgoing references (cites)
3. `mcp__semantic-scholar__paper_citations` → get incoming citations (cited-by)
4. Cross-reference with other papers in our bibliography to build the link graph
5. Use `mcp__semantic-scholar__get_paper_recommendations_single` to discover related papers we may have missed

### Fallback: Browser-Based Research

If MCP/API access fails, use the Playwright MCP server for manual browsing:
- `mcp__plugin_playwright_playwright__browser_navigate` to open Google Scholar
- `mcp__plugin_playwright_playwright__browser_snapshot` to capture results
- Handles CAPTCHAs, JavaScript rendering, login-gated content

## Source Strategy

### Primary Sources (authoritative, first-hand)
- Anthropic Claude Code documentation (hooks, plugins, skills, rules)
- Anthropic blog posts on context engineering
- Andrej Karpathy's talks/posts on context engineering
- OpenAI function calling / tool use documentation
- LangChain/LangGraph agent architecture docs

### Peer-Reviewed Sources
- arXiv papers on in-context learning (Brown et al. 2020, Min et al. 2022)
- Survey papers on prompt engineering techniques
- Conference papers from ACL, NeurIPS, ICML on context window management

### Expert/Practitioner Sources
- Simon Willison's blog (LLM tooling)
- Lilian Weng's blog (agent architectures)
- Chip Huyen's work (ML systems design)
- Swyx (context engineering discourse)
- Riley Goodside (prompt engineering evolution)

### Community Mapping
Identify and document for each community:
- **Name**: Community name and platform
- **Size**: Approximate member/subscriber count
- **Focus**: What aspect of context engineering they discuss
- **Key threads**: Links to notable discussions
- **Active since**: When context engineering discussions started

## Deliverables

1. **Verified Annotated Bibliography** (`research/bibliography.md`)
   - 15+ entries in the format specified in the parent plan
   - Each entry verified (URL accessible, content confirmed relevant)
   - Link graph: cites/cited-by relationships mapped

2. **Community Map** (`research/communities.md`)
   - 3+ communities identified and characterized
   - Key voices/contributors named
   - Timeline of when "context engineering" emerged as a term

3. **Gap Analysis** — what our taxonomy adds that existing work doesn't cover

4. **Origin Story** — how the current component types (skills, rules, hooks, memory, tools, references) came to be, tracing the lineage from prompt engineering → context engineering

## Coverage Analysis

| Secondary Question | Source Strategy | Tool | Gap? |
|-------------------|----------------|------|------|
| Q1: Existing taxonomies | Semantic Scholar + arXiv | MCP servers (search + recommendations) | No |
| Q4: SE pattern parallels | arXiv + Semantic Scholar + WebSearch | MCP servers + WebSearch | No |
| Q5: In-context learning theory | arXiv (cs.CL, cs.LG) | `mcp__arxiv__search_papers` with category filter | No |
| Q7: Communities | HN Algolia + Reddit + Twitter + Discord | WebFetch + WebSearch | Partial — Discord may need Playwright |

### Link Graph Coverage

| Task | Tool | Gap? |
|------|------|------|
| Paper citations (who cites this) | `mcp__semantic-scholar__paper_citations` | No |
| Paper references (what this cites) | `mcp__semantic-scholar__paper_references` | No |
| Related papers discovery | `mcp__semantic-scholar__get_paper_recommendations_single` | No |
| Non-academic source links | Manual tracking during research | No — lower priority |

## Quality Criteria

- [x] 15+ sources in bibliography (19 sources: 9 academic, 10 practitioner)
- [x] All URLs verified accessible (all 19 verified 2026-03-23)
- [x] Link graph has cites/cited-by for 5+ sources (13 edges across 11 sources)
- [x] 3+ communities identified (5 communities mapped)
- [x] Origin of "context engineering" term traced (Lutke → Karpathy → community adoption, June 2025)
- [x] Gap analysis identifies at least 2 gaps our work fills (5 gaps identified)

## Follow-up Research Plans

UMAP coverage analysis (2026-03-23) identified 10 topics requiring additional research. Each has its own plan with a dedicated search-term matrix. Shared search queries between topic pairs are extracted into cross-term plans.

### Topic Plans (REVIEW tier — moderate coverage, gap-filling)

| Plan | Topic | Current Score | Target | Duration |
|------|-------|--------------|--------|----------|
| [phase-1-tool-use-mcp.md](./phase-1-tool-use-mcp.md) | Tool Use & MCP | 0.512 | READY | 45-60 min |
| [phase-1-memory-systems.md](./phase-1-memory-systems.md) | Memory Systems | 0.497 | READY | 30-45 min |
| [phase-1-rag.md](./phase-1-rag.md) | RAG | 0.466 | READY | 30-45 min |
| [phase-1-prompt-engineering.md](./phase-1-prompt-engineering.md) | Prompt Engineering | 0.437 | READY | 30-45 min |
| [phase-1-community-terminology.md](./phase-1-community-terminology.md) | Community & Terminology | 0.407 | READY | 30-45 min |

### Topic Plans (RESEARCH tier — gaps, need substantive research)

| Plan | Topic | Current Score | Target | Duration |
|------|-------|--------------|--------|----------|
| [phase-1-production-engineering.md](./phase-1-production-engineering.md) | Production Engineering | 0.327 | REVIEW+ | 45-60 min |
| [phase-1-se-patterns.md](./phase-1-se-patterns.md) | SE Patterns | 0.288 | REVIEW+ | 45-60 min |
| [phase-1-multi-agent.md](./phase-1-multi-agent.md) | Multi-Agent Systems | 0.218 | REVIEW | 30-45 min |
| [phase-1-in-context-learning.md](./phase-1-in-context-learning.md) | In-Context Learning | 0.170 | REVIEW | 30-45 min |
| [phase-1-security-control.md](./phase-1-security-control.md) | Security & Control | 0.000 | REVIEW | 45-60 min |

### Cross-Term Plans (shared search queries)

| Plan | Shared Between | Duration |
|------|---------------|----------|
| [phase-1-icl--prompt-eng.md](./phase-1-icl--prompt-eng.md) | ICL ↔ Prompt Engineering | 15-20 min |
| [phase-1-tool-use--multi-agent.md](./phase-1-tool-use--multi-agent.md) | Tool Use ↔ Multi-Agent | 15-20 min |
| [phase-1-production--se-patterns.md](./phase-1-production--se-patterns.md) | Production ↔ SE Patterns | 15-20 min |
| [phase-1-memory--rag.md](./phase-1-memory--rag.md) | Memory ↔ RAG | 15-20 min |
| [phase-1-tool-use--se-patterns.md](./phase-1-tool-use--se-patterns.md) | Tool Use ↔ SE Patterns | 15-20 min |

### Estimated Total Follow-up Duration

| Category | Plans | Duration |
|----------|-------|----------|
| REVIEW topics | 5 | 2.5-3.75 hours |
| RESEARCH topics | 5 | 3-4.5 hours |
| Cross-term searches | 5 | 1.25-1.67 hours |
| **Total** | **15** | **6.75-9.92 hours** |
