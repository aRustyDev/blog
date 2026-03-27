---
id: "l2c3d4e5-2222-4lll-m222-222222222201"
type: idea
status: draft
created: "2026-03-16T00:00:00Z"
updated: "2026-03-16T00:00:00Z"
---

## Concept

A project-oriented deep-dive on adding semantic search capabilities to an ADR (Architecture Decision Record) CLI tool — an open-source contribution that replaces keyword/grep-based discovery with embedding-powered conceptual search. Covers the ADR discovery problem (teams accumulate 10s-100s of ADRs but "Why did we choose microservices?" doesn't match an ADR titled "Service Architecture Decision"), the semantic search implementation (ADR parsing into sections, embedding strategy with whole-document vs section-level vs hierarchical, vector storage with SQLite or similar, query processing with similarity search and re-ranking), integration with the existing ADR CLI (new `adr search` command, index management, configuration), preliminary evaluation (precision@k, recall, MRR comparing keyword vs title-match vs semantic), and the broader ADR tooling vision (distributed stores, GitConfig-style scoping, ADRs as context for AI assistants). Contribution-first approach: this is an open-source feature contribution developed in collaboration with the tool's maintainer, not a solo project.

## Target Audience

Software architects and tech leads who maintain ADR collections, engineering teams adopting ADRs who need better discovery, developer experience engineers building internal tooling, open-source contributors interested in ADR tooling, context engineering practitioners who see ADRs as a form of persistent architectural context, developers frustrated with grep-based search across decision documentation.

## Problem/Need

Teams that adopt Architecture Decision Records face a growing discovery problem: as the ADR corpus grows beyond ~20 records, finding the relevant decision for a current question becomes difficult. Keyword search (grep, filename matching) fails for conceptual queries — searching for "database choice" won't find an ADR titled "0015-persistence-layer-selection.md" that discusses PostgreSQL vs DynamoDB. New team members don't know what decisions exist. Experienced members forget where specific rationale was documented. The result is that decisions are re-litigated, context is lost despite being recorded, and the investment in writing ADRs doesn't pay off in decision reuse. Semantic search — matching by meaning rather than exact keywords — directly addresses this by understanding that "Why did we choose microservices?" is conceptually related to an ADR about service architecture even when no keywords overlap.

## Unique Angle

- **Contribution-first** — frames the work as an open-source collaboration with the ADR CLI maintainer, showing the feature proposal, PR process, and integration challenges
- **ADR-specific embedding strategy** — explores whether to embed whole documents, individual sections (context, decision, consequences), or both, with rationale for the chosen approach
- **Practical evaluation** — compares semantic search against keyword and title-match baselines using precision@k, recall, and MRR on a real ADR corpus
- **ADR as context engineering** — connects ADR discovery to the broader idea that architectural decisions are a form of persistent context that should be queryable by AI assistants and humans alike
- **Beyond search** — positions semantic search within a larger vision for ADR tooling: distributed stores, organizational scoping, database backends, relationship visualization
- **Implementation-oriented** — includes actual code (embedding generation, query processing) that readers can adapt for their own ADR tooling

## Scope

**Included**: The ADR discovery problem and why keyword search fails, semantic search fundamentals (embeddings, similarity search, advantages over keyword), implementation architecture (parse → embed → index → query → rank → return), ADR parsing into structured sections, embedding strategy comparison (whole-document vs section vs hierarchical), vector storage choices and portability, query processing pipeline, ADR CLI integration (command interface, index management, configuration, embedding model selection), evaluation methodology and preliminary results (keyword vs title-match vs semantic on real corpus), performance characteristics (index build time, query latency, storage), broader ADR tooling vision, collaboration with open-source maintainer, explicit limitations

**Excluded**: Comprehensive RAG system design (this is search, not generation), detailed embedding model comparison/benchmarking, production deployment of vector databases at scale, LLM-augmented ADR generation/summarization, detailed ADR methodology guidance (covered by Nygard and others), legal/licensing considerations for embedding models, multi-language ADR support

## Research Needs

- Review ADR methodology literature (Michael Nygard, adr-tools, log4brains)
- Survey semantic search approaches for documentation
- Evaluate embedding models for ADR-length technical documents
- Design and implement the ADR parsing and embedding pipeline
- Build evaluation corpus with ground-truth relevance judgments
- Measure search quality (precision@k, recall, MRR) against keyword baseline
- Profile performance (indexing time, query latency, storage overhead)
- Coordinate with ADR CLI maintainer on feature design and integration
- Review RAG and documentation search prior work

## Estimated Effort

- Research: 4-6 hours (ADR methodology, semantic search approaches, embedding model selection)
- Implementation: 10-14 hours (ADR parser, embedding pipeline, vector store integration, CLI commands, index management)
- Evaluation: 4-6 hours (corpus preparation, ground truth annotation, baseline comparison, metrics collection)
- Writing: 4-6 hours (2000-2500 word implementation post with code examples and evaluation results)
- Visuals: 2-3 hours (architecture diagram, query flow, results comparison table)
- Review: 1-2 hours (technical accuracy, open-source contribution framing)
- Total: ~25-37 hours across implementation and writing phases
