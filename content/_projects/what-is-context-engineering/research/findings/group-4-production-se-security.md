# Group 4 Findings: Production Engineering, SE Patterns, and Security & Control

> Generated: 2026-03-23
> Search queries executed: 19 (4 arXiv, 7 Semantic Scholar, 7 WebSearch, 1 WebFetch denied)
> Selection criteria: concrete metrics for Production, authoritative pattern descriptions for SE, context-level attacks/defenses for Security

---

## Production Engineering

### [G4-001] KV Cache Optimization Strategies for Scalable and Efficient LLM Inference

- **Author(s)**: Yichun Xu, Navjot K. Khaira, Tejinder Singh
- **Date**: 2026-03-20
- **URL**: https://arxiv.org/abs/2603.20397
- **Verified**: yes (2026-03-23)
- **Citations**: N/A (preprint, March 2026)
- **Topics**: Production Engineering
- **Satisfies**: phase-1-production-engineering.md
- **Summary**: Comprehensive survey organizing KV cache optimization into five categories: cache eviction, cache compression, hybrid memory solutions, novel attention mechanisms, and combination strategies. Maps techniques to seven practical deployment scenarios (long-context, high-throughput datacenter, edge devices, multi-turn conversations, accuracy-critical reasoning). Key finding: no single technique dominates across all settings; optimal strategy depends on context length, hardware constraints, and workload characteristics.

### [G4-002] Keep the Cost Down: A Review on Methods to Optimize LLM's KV-Cache Consumption

- **Author(s)**: Luohe Shi, Hongyi Zhang, Yao Yao, Zuchao Li, Hai Zhao
- **Date**: 2024-07-25
- **URL**: https://arxiv.org/abs/2407.18003
- **Verified**: yes (2026-03-23)
- **Citations**: N/A (review paper)
- **Topics**: Production Engineering
- **Satisfies**: phase-1-production-engineering.md
- **Summary**: Review dissecting KV-Cache properties and optimization methods spanning pre-training, deployment, and inference phases. Provides metrics for evaluating long-text capabilities from both efficiency and capability perspectives. Maintains a curated GitHub repository of KV-Cache optimization papers. Valuable for understanding the production lifecycle of cache management.

### [G4-003] SqueezeAttention: 2D Management of KV-Cache in LLM Inference via Layer-wise Optimal Budget

- **Author(s)**: Zihao Wang, Bin Cui, Shaoduo Gan
- **Date**: 2024-04-07
- **URL**: https://arxiv.org/abs/2404.04793
- **Verified**: yes (2026-03-23)
- **Citations**: N/A (preprint)
- **Topics**: Production Engineering
- **Satisfies**: phase-1-production-engineering.md
- **Summary**: Introduces two-dimensional KV-cache optimization combining sequence-wise and layer-wise budget allocation. Achieves 30%-70% memory reductions and up to 2.2x throughput improvements across a wide range of LLMs and benchmarks. Concrete production metrics: measures layer importance via cosine similarity of input prompt differences before/after self-attention layers. Directly relevant to token budget management in production context engineering.

### [G4-004] NVIDIA TensorRT-LLM KV Cache Reuse Optimizations

- **Author(s)**: NVIDIA (technical blog)
- **Date**: 2025 (updated through 2025)
- **URL**: https://developer.nvidia.com/blog/introducing-new-kv-cache-reuse-optimizations-in-nvidia-tensorrt-llm/
- **Verified**: yes (2026-03-23)
- **Topics**: Production Engineering
- **Satisfies**: phase-1-production-engineering.md
- **Summary**: Documents production-grade KV cache reuse (prefix caching) in TensorRT-LLM with concrete metrics: up to 5x faster time-to-first-token with system prompt sharing, typical 2x TTFT speedup with prefix caching enabled, priority-based eviction with configurable priority and duration per block, and flexible block sizing from 64 down to 2 tokens. Directly applicable to production context engineering where stable system prompts drive cache efficiency.

### [G4-005] Make Your LLM Fully Utilize the Context

- **Author(s)**: Shengnan An, Zexiong Ma, Zeqi Lin, Nanning Zheng, Jian-Guang Lou
- **Date**: 2024-04-25
- **URL**: https://www.semanticscholar.org/paper/82460f7995f66f3f035f34ecbd2c82b024282529
- **Verified**: yes (2026-03-23)
- **Citations**: 152
- **Topics**: Production Engineering
- **Satisfies**: phase-1-production-engineering.md
- **Summary**: Addresses the "lost-in-the-middle" problem with Information-INtensive (IN2) training -- a data-driven approach to overcome positional bias in long contexts. Concrete results: improves NarrativeQA F1 from 23.5 to 26.9 while maintaining short-context performance (MMLU 59.3 to 59.2). Demonstrates that context window utilization is a first-order production concern: simply having a large context window is insufficient without explicit training for uniform attention across positions.

### [G4-006] Effective Context Engineering for AI Agents (Anthropic)

- **Author(s)**: Anthropic Engineering
- **Date**: 2025-09-29
- **URL**: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- **Verified**: yes (2026-03-23)
- **Topics**: Production Engineering, SE Patterns
- **Satisfies**: phase-1-production-engineering.md, phase-1-se-patterns.md
- **Summary**: Authoritative practitioner guide from Anthropic defining context engineering as the natural progression of prompt engineering. Covers system prompt structure (XML/Markdown section separation), tool design as the contract between agents and their information/action space, and dynamic context retrieval via embedding-based pre-inference retrieval. Emphasizes token efficiency in tool returns and efficient agent behaviors. Key architectural principle: context is a finite resource that must be strategically curated at each inference step.

---

## SE Patterns

### [G4-007] Survey of LLM Agent Communication with MCP: A Software Design Pattern Centric Review

- **Author(s)**: A. Sarkar, S. Sarkar
- **Date**: 2025-06-05
- **URL**: https://arxiv.org/abs/2506.05364
- **Verified**: yes (2026-03-23)
- **Citations**: 13
- **Topics**: SE Patterns, Production Engineering
- **Satisfies**: phase-1-se-patterns.md, phase-1-production--se-patterns.md
- **Summary**: Directly maps classical SE design patterns (Mediator, Observer, Publish-Subscribe, Broker) to LLM agent communication architectures via the Model Context Protocol (MCP). Provides conceptual schematics and formal models mapping communication pathways and optimizing data flow. Explicitly bridges the SE-to-AI gap by analyzing how GoF-era patterns structure agent interactions, covering real-world applications in financial processing and investment banking. This is the strongest single source connecting SE patterns to context engineering.

### [G4-008] A Pattern Language for Distributed Computing (POSA Series)

- **Author(s)**: Frank Buschmann, Kevlin Henney, Douglas C. Schmidt
- **Date**: 2007
- **URL**: https://www.semanticscholar.org/paper/38297e87841e88d36e017120887346fb0abc3d8b
- **Verified**: yes (2026-03-23)
- **Citations**: 129
- **Topics**: SE Patterns
- **Satisfies**: phase-1-se-patterns.md
- **Summary**: Volume 4 of the Pattern-Oriented Software Architecture (POSA) series. Authoritative reference for distributed computing patterns including context object, interceptor/pipeline, and broker patterns. These foundational patterns map directly to LLM context management architectures: the Context Object pattern parallels the structured context window, the Interceptor pattern maps to middleware pipelines for context assembly, and the Broker pattern maps to tool routing in agent systems. Seminal SE reference for grounding the SE-to-CE mapping.

### [G4-009] An Exploratory Study on the Effects of Event-Driven Architecture on Software Modularity

- **Author(s)**: Luan Lazzari, Kleinner Farias
- **Date**: 2021-10-27
- **URL**: https://arxiv.org/abs/2110.14699
- **Verified**: yes (2026-03-23)
- **Citations**: N/A
- **Topics**: SE Patterns
- **Satisfies**: phase-1-se-patterns.md
- **Summary**: Empirical comparison of event-driven architecture vs REST across five evolution scenarios using ten modularity metrics (separation of concerns, coupling, cohesion, complexity, size). Finds EDA improves separation of concerns but increases coupling and complexity. Directly relevant to understanding the trade-offs when applying event-driven/hook patterns to context engineering pipelines, where hooks and callbacks assemble context from multiple sources.

### [G4-010] Towards a Middleware for Large Language Models

- **Author(s)**: Narcisa Guran et al.
- **Date**: 2024-11-21
- **URL**: https://arxiv.org/abs/2411.14513
- **Verified**: yes (2026-03-23)
- **Citations**: N/A (preprint)
- **Topics**: SE Patterns, Production Engineering
- **Satisfies**: phase-1-se-patterns.md, phase-1-production--se-patterns.md
- **Summary**: Proposes a middleware architecture for enterprise LLM deployment covering session management, caching, job scheduling, observability, and explainability. Envisions LLMs absorbing functionality traditionally attributed to middleware (the "LLM as gateway" pattern). Directly maps the classical middleware/pipeline SE pattern to LLM serving infrastructure. Bridges the gap between traditional enterprise middleware (POSA patterns) and modern LLM deployment patterns.

### [G4-011] AIOS: LLM Agent Operating System

- **Author(s)**: Kai Mei, Wujiang Xu, Zelong Li, Shuyuan Xu, Ruosong Ye, Yingqiang Ge, Yongfeng Zhang
- **Date**: 2024-03-25
- **URL**: https://www.semanticscholar.org/paper/f89e85059a55b647c93822aefa7e985376e0ef20
- **Verified**: yes (2026-03-23)
- **Citations**: 75
- **Topics**: SE Patterns, Production Engineering
- **Satisfies**: phase-1-se-patterns.md, phase-1-production--se-patterns.md
- **Summary**: Proposes an OS-inspired architecture for LLM agent serving with kernel-level services: scheduling, context management, memory management, storage management, and access control. Isolates LLM resources from agent applications via a kernel abstraction. Achieves 2.1x faster execution for agent serving. Directly demonstrates how classical OS/SE patterns (resource isolation, scheduling, access control) map to LLM agent infrastructure -- a concrete realization of SE patterns applied to production AI systems.

---

## Security & Control

### [G4-012] OWASP Top 10 for LLM Applications 2025

- **Author(s)**: OWASP Foundation (collaborative)
- **Date**: 2025 (v2025)
- **URL**: https://owasp.org/www-project-top-10-for-large-language-model-applications/assets/PDF/OWASP-Top-10-for-LLMs-v2025.pdf
- **Verified**: yes (2026-03-23)
- **Citations**: 60 (Semantic Scholar corpus ID: 265018081)
- **Topics**: Security & Control
- **Satisfies**: phase-1-security-control.md (required source)
- **Summary**: The definitive industry security framework for LLM applications. Top 10 risks: LLM01 Prompt Injection, LLM02 Sensitive Information Disclosure, LLM03 Supply Chain Vulnerabilities, LLM04 Data and Model Poisoning, LLM05 Improper Output Handling, LLM06 Excessive Agency, LLM07 System Prompt Leakage, LLM08 Vector and Embedding Weaknesses, LLM09 Misinformation, LLM10 Unbounded Consumption. Context-engineering-relevant entries: LLM01 (prompt injection as context manipulation), LLM06 (excessive agency as trust boundary failure), LLM07 (system prompt leakage as context exposure). 2025 update significantly expanded coverage of agentic risks.

### [G4-013] SecAlign: Defending Against Prompt Injection with Preference Optimization

- **Author(s)**: Sizhe Chen, Arman Zharmagambetov, Saeed Mahloujifar, Kamalika Chaudhuri, David Wagner, Chuan Guo
- **Date**: 2024-10-07
- **URL**: https://arxiv.org/abs/2410.05451
- **Verified**: yes (2026-03-23)
- **Citations**: N/A
- **Topics**: Security & Control
- **Satisfies**: phase-1-security-control.md
- **Summary**: First method to reduce prompt injection success rates to below 10% even against sophisticated unseen attacks. Uses preference optimization to train models to prefer secure outputs (responding to legitimate instructions) over insecure outputs (responding to injected instructions). Key insight: defense generalizes to unknown attacks, indicating that preference-based alignment creates robust context-level trust boundaries. Maintains model utility post-training. Open-source at github.com/facebookresearch/SecAlign.

### [G4-014] StruQ: Defending Against Prompt Injection with Structured Queries

- **Author(s)**: Sizhe Chen, Julien Piet, Chawin Sitawarin, David Wagner
- **Date**: 2024-02-09
- **URL**: https://arxiv.org/abs/2402.06363
- **Verified**: yes (2026-03-23)
- **Citations**: N/A
- **Topics**: Security & Control, SE Patterns
- **Satisfies**: phase-1-security-control.md, phase-1-se-patterns.md
- **Summary**: Introduces structured queries that separate prompts and data into two channels -- a secure front-end formatting layer plus a specially trained LLM. This is architecturally equivalent to the SE concept of privilege separation and input validation middleware. The system uses a novel fine-tuning strategy that augments instruction tuning with examples containing instructions in the data portion, training the model to ignore those. Directly demonstrates how SE security patterns (input validation, channel separation) apply to context engineering.

### [G4-015] Prompt Injection Attack Against LLM-integrated Applications (HouYi)

- **Author(s)**: Yi Liu, Gelei Deng, Yuekang Li, Kailong Wang, Tianwei Zhang, Yepang Liu, Haoyu Wang, Yanhong Zheng, Yang Liu
- **Date**: 2023-06-08
- **URL**: https://arxiv.org/abs/2306.05499
- **Verified**: yes (2026-03-23)
- **Citations**: 657
- **Topics**: Security & Control
- **Satisfies**: phase-1-security-control.md
- **Summary**: Seminal paper on practical prompt injection attacks against real LLM-integrated applications. Introduces HouYi, a black-box attack technique inspired by traditional web injection attacks (SQL injection, XSS). Compartmentalizes attacks into three elements: pre-constructed prompt, context-partition injection, and malicious payload. Successfully attacked 31 of 36 real applications including Notion. Highly cited (657) and directly demonstrates that context-level attacks parallel classical web security vulnerabilities -- strengthening the SE security pattern mapping.

### [G4-016] Jailbreak and Guard Aligned Language Models with Only Few In-Context Demonstrations

- **Author(s)**: Zeming Wei, Yifei Wang, Yisen Wang
- **Date**: 2023-10-10
- **URL**: https://arxiv.org/abs/2310.06387
- **Verified**: yes (2026-03-23)
- **Citations**: 441
- **Topics**: Security & Control
- **Satisfies**: phase-1-security-control.md
- **Summary**: Demonstrates that in-context learning (ICL) can both attack (ICA) and defend (ICD) LLM safety alignment using minimal demonstrations. Shows that the distribution of safety in LLM outputs can be efficiently manipulated through context -- directly establishing that context IS the attack surface and the defense mechanism simultaneously. Provides theoretical insights on how minimal context changes alter alignment. Highly cited (441) and foundational for understanding context-level trust boundaries.

### [G4-017] Bridging the Safety Gap: A Guardrail Pipeline for Trustworthy LLM Inferences (Wildflare GuardRail)

- **Author(s)**: Shanshan Han, Salman Avestimehr, Chaoyang He
- **Date**: 2025-02-12
- **URL**: https://arxiv.org/abs/2502.08142
- **Verified**: yes (2026-03-23)
- **Citations**: N/A (preprint)
- **Topics**: Security & Control, SE Patterns
- **Satisfies**: phase-1-security-control.md, phase-1-se-patterns.md
- **Summary**: Presents a guardrail pipeline architecture with four modular components: Safety Detector (input/output validation), Grounding (RAG context enrichment via vector DB), Customizer (lightweight rule-based output wrappers), and Repairer (hallucination correction using Safety Detector explanations). Achieves 100% accuracy on malicious URL detection at 1.06s per query without model calls. Architecture directly maps to the middleware pipeline SE pattern applied to security: each component is a composable pipeline stage with explicit input/output contracts.

---

## Cross-term (Production + SE Patterns)

### [G4-018] Mapping LLM Security Landscapes: A Comprehensive Stakeholder Risk Assessment Proposal

- **Author(s)**: Rahul Pankajakshan, Sumitra Biswal, Yuvaraj Govindarajulu, Gilad Gressel
- **Date**: 2024-03-20
- **URL**: https://arxiv.org/abs/2403.13309
- **Verified**: yes (2026-03-23)
- **Citations**: 25
- **Topics**: Security & Control, Production Engineering
- **Satisfies**: phase-1-security-control.md, phase-1-production--se-patterns.md
- **Summary**: Applies the OWASP risk rating methodology (traditionally used for web applications) to LLM systems. Maps threat agents against three stakeholder groups: model fine-tuners, application developers using APIs, and end users. Proposes a comprehensive threat matrix covering dependent system components against vulnerability factors. Bridges traditional SE security risk assessment patterns to LLM-specific deployment contexts. Directly demonstrates how established SE security frameworks transfer to context engineering threat modeling.

---

## Coverage Summary

| Plan | Target | Found | Key Entries |
|------|--------|-------|-------------|
| phase-1-production-engineering.md | 5+ sources | 6 | G4-001 through G4-006 |
| phase-1-se-patterns.md | 5+ sources | 7 | G4-006 through G4-011, G4-014, G4-017 |
| phase-1-production--se-patterns.md | Cross-term | 4 | G4-007, G4-010, G4-011, G4-018 |
| phase-1-security-control.md | 5+ sources | 7 | G4-012 through G4-018 |
| **Total unique entries** | 12-16 | **18** | |

## Notes

- The Semantic Scholar query for "dependency injection" / "inversion of control" returned no relevant CS results (matched medical/chemistry papers). The DI pattern is best sourced from Martin Fowler's canonical 2004 article (https://martinfowler.com/articles/injection.html) which should be added manually if needed.
- The "context object pattern" Semantic Scholar query similarly returned off-topic results. The authoritative source remains POSA Vol. 4 (G4-008 above) which covers the Context Object pattern in its distributed computing pattern language.
- WebFetch for the OWASP page was denied, but the OWASP Top 10 content was fully captured via WebSearch results and Semantic Scholar.
- Several entries satisfy multiple plans simultaneously, reflecting the inherently cross-cutting nature of these topics in context engineering.
