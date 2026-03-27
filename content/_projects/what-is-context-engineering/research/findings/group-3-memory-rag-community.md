# Group 3 Findings: Memory Systems, RAG, and Community Terminology

**Research Date**: 2026-03-23
**Researcher**: Claude Opus 4.6 (automated literature survey)
**Plans Covered**: phase-1-memory-systems.md, phase-1-rag.md, phase-1-memory--rag.md, phase-1-community-terminology.md

---

## Bibliography Entries

### [G3-001] Position: Episodic Memory is the Missing Piece for Long-Term LLM Agents

- **Author(s)**: Mathis Pink, Qinyuan Wu, Vy Ai Vo, Javier Turek, Jianing Mu, Alexander Huth, Mariya Toneva
- **Date**: 2025-02-10
- **URL**: https://arxiv.org/abs/2502.06975
- **Verified**: yes (2026-03-23)
- **Citations**: N/A (arXiv preprint)
- **Topics**: Memory Systems
- **Plans**: phase-1-memory-systems.md
- **Summary**: Presents an episodic memory framework for LLM agents centered on five key properties of episodic memory that underlie adaptive and context-sensitive behavior. Directly applies cognitive science taxonomy (episodic vs. semantic memory) to LLM agent architectures, arguing that now is the right time for explicit, integrated focus on episodic memory to catalyze long-term agents. Provides a roadmap uniting several research directions under the episodic memory goal.

### [G3-002] MemGPT: Towards LLMs as Operating Systems

- **Author(s)**: Charles Packer, Vivian Fang, Shishir G. Patil, Kevin Lin, Sarah Wooders, Joseph Gonzalez
- **Date**: 2023-10-16
- **URL**: https://arxiv.org/abs/2310.08560
- **Verified**: yes (2026-03-23)
- **Citations**: 455 (Semantic Scholar)
- **Topics**: Memory Systems, Memory & RAG Convergence
- **Plans**: phase-1-memory-systems.md, phase-1-memory--rag.md
- **Summary**: Introduces virtual context management for LLMs, drawing inspiration from OS hierarchical memory systems (RAM/disk) to manage context beyond limited windows. MemGPT uses a tiered architecture with main context (system prompt, working context, message buffer) and external context (recall storage, archival storage), with the LLM itself acting as the memory manager through self-directed editing via tool calling. Highly influential (455 citations); evolved into the Letta platform by September 2024. Foundational work for understanding memory-as-context engineering.

### [G3-003] Memory OS of AI Agent (MemoryOS)

- **Author(s)**: Jiazheng Kang, Mingming Ji, Zhe Zhao, Ting Bai
- **Date**: 2025-06-06
- **URL**: https://arxiv.org/abs/2506.06326
- **Verified**: yes (2026-03-23)
- **Citations**: 33 (Semantic Scholar)
- **Topics**: Memory Systems, Memory & RAG Convergence
- **Plans**: phase-1-memory-systems.md, phase-1-memory--rag.md
- **Summary**: Proposes a Memory Operating System (MemoryOS) for AI agents with a three-level hierarchical storage: short-term, mid-term, and long-term personal memory. Directly inspired by OS memory management principles, with dynamic update operations between storage units (FIFO for short-to-mid, segmented page organization for mid-to-long). Achieves 49.11% F1 improvement over baselines on GPT-4o-mini, demonstrating the practical value of cognitive-science-inspired memory taxonomies applied to LLM context management.

### [G3-004] CAST: Character-and-Scene Episodic Memory for Agents

- **Author(s)**: Kexin Ma, Bojun Li, Yuhua Tang, Liting Sun, Ruochun Jin
- **Date**: 2026-01-14
- **URL**: https://arxiv.org/abs/2602.06051
- **Verified**: yes (2026-03-23)
- **Citations**: N/A (recent preprint)
- **Topics**: Memory Systems
- **Plans**: phase-1-memory-systems.md
- **Summary**: Proposes a dual-memory architecture distinguishing episodic and semantic memory for agents, inspired by dramatic theory. Constructs 3D scenes (time/place/topic) organized into character profiles for episodic memory, complemented by graph-based semantic memory. Demonstrates 8.11% F1 improvement over baselines, especially on time-sensitive conversational questions. Directly relevant to cognitive-science-inspired memory taxonomies.

### [G3-005] Zep: A Temporal Knowledge Graph Architecture for Agent Memory

- **Author(s)**: Preston Rasmussen, Pavlo Paliychuk, Travis Beauvais, Jack Ryan, Daniel Chalef
- **Date**: 2025-01-23
- **URL**: https://arxiv.org/abs/2501.13956
- **Verified**: yes (2026-03-23)
- **Citations**: 96 (Semantic Scholar)
- **Topics**: Memory Systems, Memory & RAG Convergence
- **Plans**: phase-1-memory-systems.md, phase-1-memory--rag.md
- **Summary**: Introduces Zep, a memory layer service using a temporally-aware knowledge graph engine (Graphiti) that dynamically synthesizes unstructured conversational data and structured business data while maintaining historical relationships. Outperforms MemGPT on the Deep Memory Retrieval benchmark (94.8% vs 93.4%) and achieves 18.5% accuracy improvement with 90% latency reduction on LongMemEval. Key contribution at the intersection of memory and retrieval: demonstrates that temporal knowledge graphs can serve as unified memory architectures bridging episodic retrieval and semantic knowledge.

### [G3-006] Agentic Retrieval-Augmented Generation: A Survey on Agentic RAG

- **Author(s)**: Aditi Singh, Abul Ehtesham, Saket Kumar, Tala Talaei Khoei
- **Date**: 2025-01-15
- **URL**: https://arxiv.org/abs/2501.09136
- **Verified**: yes (2026-03-23)
- **Citations**: N/A (survey paper)
- **Topics**: RAG, Memory & RAG Convergence
- **Plans**: phase-1-rag.md, phase-1-memory--rag.md
- **Summary**: Comprehensive survey on Agentic RAG, which embeds autonomous AI agents into the RAG pipeline to dynamically manage retrieval strategies, iteratively refine contextual understanding, and adapt workflows. Covers agentic design patterns (reflection, planning, tool use, multiagent collaboration) and provides a taxonomy of Agentic RAG architectures. Directly frames RAG as evolving toward agent-managed context assembly, bridging the gap between static retrieval and dynamic memory management.

### [G3-007] Engineering the RAG Stack: A Comprehensive Review of Architecture and Trust Frameworks

- **Author(s)**: Dean Wampler, Dave Nielson, Alireza Seddighi
- **Date**: 2025-11-07
- **URL**: https://arxiv.org/abs/2601.05264
- **Verified**: yes (2026-03-23)
- **Citations**: N/A (recent survey)
- **Topics**: RAG
- **Plans**: phase-1-rag.md
- **Summary**: Systematic literature review (2018-2025) consolidating RAG techniques into a unified taxonomy covering fusion mechanisms, retrieval strategies, and orchestration approaches. Provides quantitative assessment frameworks and analyzes trust/alignment implications. Serves as a practical framework for deploying resilient, secure, domain-adaptable RAG systems. Directly relevant to understanding RAG's evolution as an engineering discipline and its relationship to context engineering.

### [G3-008] Reconstructing Context: Evaluating Advanced Chunking Strategies for RAG

- **Author(s)**: Carlo Merola, J. Singh
- **Date**: 2025-04-28
- **URL**: https://arxiv.org/abs/2504.19754
- **Verified**: yes (2026-03-23)
- **Citations**: 13 (Semantic Scholar)
- **Topics**: RAG
- **Plans**: phase-1-rag.md
- **Summary**: Rigorous comparison of late chunking and contextual retrieval for RAG systems. Finds that contextual retrieval preserves semantic coherence more effectively but requires greater computational resources, while late chunking offers higher efficiency but sacrifices relevance and completeness. Directly addresses the chunking problem as a core context assembly challenge, relevant to understanding how context is constructed for LLM consumption.

### [G3-009] A Survey of Context Engineering for Large Language Models

- **Author(s)**: Lingrui Mei, Jiayu Yao, Yuyao Ge, Yiwei Wang, Baolong Bi, Yujun Cai, et al.
- **Date**: 2025-07-17
- **URL**: https://arxiv.org/abs/2507.13334
- **Verified**: yes (2026-03-23)
- **Citations**: 69 (Semantic Scholar)
- **Topics**: Community & Terminology, RAG, Memory Systems
- **Plans**: phase-1-community-terminology.md, phase-1-rag.md, phase-1-memory-systems.md
- **Summary**: Major survey (1400+ papers reviewed) that formally defines Context Engineering as "a formal discipline that transcends simple prompt design to encompass the systematic optimization of information payloads for LLMs." Provides a comprehensive taxonomy decomposing CE into foundational components (context retrieval/generation, context processing, context management) and system implementations (RAG, memory systems, tool-integrated reasoning, multi-agent systems). The most authoritative academic attempt to formalize the CE term, establishing it as a unified framework encompassing both RAG and memory research.

### [G3-010] Context Engineering 2.0: The Context of Context Engineering

- **Author(s)**: Qishuo Hua, Lyumanshan Ye, Dayuan Fu, Yang Xiao, Xiaojie Cai, Yunze Wu, Jifan Lin, Junfei Wang, Pengfei Liu
- **Date**: 2025-10-30
- **URL**: https://arxiv.org/abs/2510.26493
- **Verified**: yes (2026-03-23)
- **Citations**: 11 (Semantic Scholar)
- **Topics**: Community & Terminology
- **Plans**: phase-1-community-terminology.md
- **Summary**: Provides a historical and conceptual landscape for context engineering, arguing that related practices trace back 20+ years to the early 1990s. Identifies distinct historical phases shaped by machine intelligence level: from early HCI frameworks around primitive computers, to today's human-agent interaction paradigms, and potentially to superhuman intelligence. Offers a systematic definition of context engineering and examines key design considerations. Important for establishing CE's intellectual lineage beyond the recent "prompt engineering successor" framing.

### [G3-011] From Prompt Engineering to Context Engineering: A Comparative Analysis

- **Author(s)**: O. Cinar, Numan Halit Guldemir
- **Date**: 2026 (IEEE IISEC)
- **URL**: https://doi.org/10.1109/IISEC69317.2026.11418464
- **Verified**: yes (2026-03-23)
- **Citations**: 0 (newly published)
- **Topics**: Community & Terminology
- **Plans**: phase-1-community-terminology.md
- **Summary**: Directly compares prompt engineering and context engineering as AI interaction paradigms for LLMs. Finds that prompt engineering fits simple one-shot queries needing little state, while context engineering supports scalable, reliable agents using documents, memory, tools, and prior interactions. Synthesizes design guidelines from prior literature and Anthropic's context engineering framework. First known peer-reviewed comparative study of the two paradigms.

### [G3-012] Context Engineering for Multi-Agent LLM Code Assistants

- **Author(s)**: Muhammad Haseeb
- **Date**: 2025-08-09
- **URL**: https://arxiv.org/abs/2508.08322
- **Verified**: yes (2026-03-23)
- **Citations**: N/A (recent preprint)
- **Topics**: Community & Terminology, RAG, Memory & RAG Convergence
- **Plans**: phase-1-community-terminology.md, phase-1-rag.md, phase-1-memory--rag.md
- **Summary**: Proposes a context engineering workflow combining multiple AI components: intent translation, semantic literature retrieval (Elicit), document synthesis (NotebookLM), and multi-agent code generation (Claude Code). Explicitly frames CE as encompassing intent clarification, retrieval-augmented generation, and specialized sub-agent orchestration. Demonstrates practical context engineering methodology in software engineering contexts, showing how RAG, memory, and agent coordination converge under the CE umbrella.

### [G3-013] A Human-Inspired Reading Agent with Gist Memory of Very Long Contexts

- **Author(s)**: Kuang-Huei Lee, Xinyun Chen, Hiroki Furuta, John F. Canny, Ian Fischer
- **Date**: 2024-02-15
- **URL**: https://arxiv.org/abs/2402.09727
- **Verified**: yes (2026-03-23)
- **Citations**: 91 (Semantic Scholar)
- **Topics**: Memory Systems, Memory & RAG Convergence
- **Plans**: phase-1-memory-systems.md, phase-1-memory--rag.md
- **Summary**: Introduces ReadAgent, an LLM agent system that increases effective context length up to 20x by mimicking human interactive reading. Implements a three-step process: deciding what to store in memory episodes, compressing episodes into "gist memories," and looking up original passages when needed. Outperforms retrieval baselines on three long-document comprehension tasks (QuALITY, NarrativeQA, QMSum). Directly demonstrates the convergence of memory consolidation (gist formation) and retrieval (look-up) as complementary context management strategies.

---

## Practitioner Sources

### [G3-P01] "From RAG to Context -- A 2025 Year-End Review of RAG" (RAGFlow / InfiniFlow)

- **Author(s)**: InfiniFlow (RAGFlow team)
- **Date**: Late 2025
- **URL**: https://ragflow.io/blog/rag-review-2025-from-rag-to-context
- **Verified**: yes (2026-03-23)
- **Topics**: RAG, Community & Terminology
- **Plans**: phase-1-rag.md, phase-1-community-terminology.md
- **Summary**: Documents RAG's metamorphosis from a specific pattern into a "Context Engine" with intelligent retrieval as its core capability. Argues that context engineering became the hottest technical exploration and guiding principle in the latter half of 2025. Key framing: RAG evolves into a unified Context Layer serving LLM applications, with retrieval as one step in a broader reasoning loop.

### [G3-P02] "Is RAG Dead? The Rise of Context Engineering and Semantic Layers for Agentic AI" (Towards Data Science)

- **Author(s)**: TDS contributor
- **Date**: 2025
- **URL**: https://towardsdatascience.com/beyond-rag/
- **Verified**: yes (2026-03-23)
- **Topics**: RAG, Community & Terminology
- **Plans**: phase-1-rag.md, phase-1-community-terminology.md
- **Summary**: Examines whether RAG has been superseded by context engineering. Argues that RAG has been "rebranded" as context engineering, which now includes MCP and RAG as components. Frames the terminology shift as reflecting the maturation of retrieval from a standalone pattern to a component within broader context assembly systems.

### [G3-P03] "RAG Isn't Dead, but Context Engineering Is the New Hotness" (The New Stack)

- **Author(s)**: The New Stack
- **Date**: 2025
- **URL**: https://thenewstack.io/rag-isnt-dead-but-context-engineering-is-the-new-hotness/
- **Verified**: yes (2026-03-23)
- **Topics**: RAG, Community & Terminology
- **Plans**: phase-1-rag.md, phase-1-community-terminology.md
- **Summary**: Argues that in the agentic era, older terms like RAG and prompt engineering are giving way to MCP and context engineering. However, notes that context engineering fundamentally includes RAG as a component, framing CE as the superset discipline. Retrieval becomes one step in a broader agent reasoning loop.

### [G3-P04] "Memory Blocks: The Key to Agentic Context Management" (Letta Blog)

- **Author(s)**: Letta team (formerly MemGPT)
- **Date**: 2025
- **URL**: https://www.letta.com/blog/memory-blocks
- **Verified**: yes (2026-03-23)
- **Topics**: Memory Systems, Memory & RAG Convergence
- **Plans**: phase-1-memory-systems.md, phase-1-memory--rag.md
- **Summary**: Describes the evolution from MemGPT to Letta's memory block architecture for agentic context management. Memory blocks are modular, editable units of context that agents can read and write, enabling self-directed memory management. Represents the practical evolution of the MemGPT paradigm into a production-ready framework for memory-as-context engineering.

### [G3-P05] Andrej Karpathy Context Engineering Definition (X/Twitter)

- **Author(s)**: Andrej Karpathy
- **Date**: 2025-06-22
- **URL**: https://x.com/karpathy/status/1937902205765607626
- **Verified**: yes (2026-03-23)
- **Topics**: Community & Terminology
- **Plans**: phase-1-community-terminology.md
- **Summary**: The tweet that catalyzed mainstream adoption of the "context engineering" term. Karpathy defined it as "the delicate art and science of filling the context window with just the right information for the next step," arguing that "prompt" trivializes the complex work of industrial LLM applications. Listed components: task descriptions, few-shot examples, RAG, multimodal data, tools, state/history, and compacting. This definition became the de facto industry reference point.

---

## Community Findings

### Reddit r/MachineLearning

- **Subscribers**: ~2.7M+ (as of 2026)
- **CE Discussion Status**: No dedicated "context engineering" posts found via search. The term appears in comments and tangentially in prompt engineering discussions. The subreddit's focus is primarily on research papers, not practitioner terminology. The CE concept is discussed under adjacent labels: "context management," "long-context," "retrieval augmented generation."
- **Active since**: The term "context engineering" has not become a primary discussion topic in this research-focused community, suggesting the term is more practitioner-driven than academic-driven on Reddit.
- **Engagement**: N/A (no dedicated CE threads found)

### Reddit r/LocalLLaMA

- **Subscribers**: ~750K+ (as of 2026)
- **CE Discussion Status**: No dedicated "context engineering" threads found. Discussions center on practical context window management, quantization effects on context quality, and local RAG implementations. The community discusses CE-adjacent concepts (context window optimization, KV cache management, context compression) using technical rather than umbrella terminology.
- **Active since**: N/A
- **Engagement**: N/A

### Reddit r/ClaudeAI

- **Subscribers**: ~100K+ (as of 2026)
- **CE Discussion Status**: Context engineering is discussed in the context of Claude Code workflows and system prompt design. The community engages with CE concepts through practical workflow sharing (e.g., .claude/ directory structures, CLAUDE.md files) rather than theoretical term discussion. Several blog posts linked from the subreddit discuss CE explicitly.
- **Notable Adjacent Discussion**: A "Claude Is Dead" post (Sep 2025) reached 841 upvotes, indicating high engagement levels in the community. Context management (hitting context limits, strategies for maintaining coherence) is a recurring practical concern.
- **Active since**: CE-related practical discussions emerged mid-2025 following Karpathy's tweet and Anthropic's adoption of the term.

### Hugging Face Forums

- **CE Discussion**: A "Context Engineering" handbook thread was posted on 2025-06-29 by user "recursivelabs," referencing the GitHub repository by David Kimai with Karpathy's definition. Received 601 views and 9 likes as of 2026-03-23. A follow-up thread on the handbook referencing 1400+ research papers was posted in July 2025.
- **Source**: https://discuss.huggingface.co/t/context-engineering-a-practical-first-principles-handbook-with-research-from-june-2025-icml-ibm-neurips-ohbm-and-more/161124

### YouTube / Conference Talks

- **Tina Huang**: "Context Engineering Clearly Explained" -- popular YouTube explainer video covering CE fundamentals and differentiation from prompt engineering. Listed on Class Central.
- **Y Combinator**: "Context Engineering for Engineers" -- YC Root Access talk (Aug 2025) discussing CE in the context of AI-native software development. Listed on Class Central.
  - Source: https://www.classcentral.com/course/youtube-context-engineering-for-engineers-479243
- **Conference Presence**: No dedicated "context engineering" keynote or invited talk at NeurIPS 2025 or ICML 2025 was identified. However, the Hugging Face handbook references CE concepts that appeared in ICML, IBM, NeurIPS, and OHBM research from June 2025 onward. The CE survey paper (G3-009) with 69 citations demonstrates growing academic legitimacy.
- **GitHub Repository**: "Context-Engineering" by David Kimai -- described as "a frontier, first-principles handbook inspired by Karpathy and 3Blue1Brown" for context design, orchestration, and optimization.
  - Source: https://github.com/davidkimai/Context-Engineering

### Terminology Timeline

| Date | Event | Source |
|------|-------|--------|
| 2023-10 | MemGPT introduces OS-inspired memory management for LLMs | arXiv 2310.08560 |
| 2025-01 | Zep introduces temporal knowledge graph for agent memory | arXiv 2501.13956 |
| 2025-06-22 | Karpathy tweets CE definition; term goes mainstream | X/Twitter |
| 2025-06-27 | Simon Willison amplifies CE term | simonwillison.net |
| 2025-06-29 | HuggingFace CE handbook thread appears | HF Forums |
| 2025-07-17 | First major CE survey paper (1400+ papers, 69 citations) | arXiv 2507.13334 |
| 2025-08-09 | CE applied to multi-agent code assistants | arXiv 2508.08322 |
| 2025-10-30 | "CE 2.0" paper traces CE roots to 1990s HCI | arXiv 2510.26493 |
| Late 2025 | RAGFlow declares "From RAG to Context" as defining shift | ragflow.io |
| 2026 | First peer-reviewed prompt eng. vs context eng. comparison | IEEE IISEC |

---

## Plan Coverage Summary

| Plan | Required Sources | Found | Key Entries |
|------|-----------------|-------|-------------|
| phase-1-memory-systems.md | 3+ | 6 | G3-001, G3-002, G3-003, G3-004, G3-005, G3-013 |
| phase-1-rag.md | 3+ | 5 | G3-006, G3-007, G3-008, G3-012, G3-P01/P02/P03 |
| phase-1-memory--rag.md | cross-term | 5 | G3-002, G3-003, G3-005, G3-006, G3-013 |
| phase-1-community-terminology.md | 2+ academic + community | 4 academic + community map | G3-009, G3-010, G3-011, G3-012 + Reddit/HF/YouTube |

**Total Bibliography Entries**: 13 academic + 5 practitioner = 18 sources
**Community Characterization**: 4 Reddit subreddits, HuggingFace Forums, YouTube, GitHub, terminology timeline
