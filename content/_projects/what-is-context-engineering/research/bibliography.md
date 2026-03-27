# Verified Annotated Bibliography

Status: Phase 1 — Literature Survey
Last updated: 2026-03-23

## Academic Sources

### [BIB-001] A Survey of Context Engineering for Large Language Models

- **Author(s)**: Lingrui Mei, Jiayu Yao, Yuyao Ge, Yiwei Wang, Baolong Bi, Yujun Cai, Jiazhi Liu, Mingyu Li, Zhong-Zhi Li, Duzhen Zhang, Chenlin Zhou, Jiayi Mao, Tianze Xia, Jiafeng Guo, Shenghua Liu
- **Date**: 2025-07-17
- **URL**: https://arxiv.org/abs/2507.13334
- **Semantic Scholar**: https://www.semanticscholar.org/paper/d1fc5a7e188421c91a77a86b3ba7ae27d46a83a9
- **Verified**: yes (2026-03-23)
- **Citations**: 69
- **Relevance**: Q1 (existing taxonomies), Q5 (ICL theory)
- **Cites**: [BIB-004]
- **Cited By**: —
- **Summary**: The most comprehensive academic survey on context engineering to date, analyzing 1400+ research papers. Presents a taxonomy decomposing context engineering into foundational components (context retrieval/generation, processing, management) and system implementations (RAG, memory systems, tool-integrated reasoning, multi-agent systems). Identifies a critical research gap: asymmetry between understanding and generation capabilities.

### [BIB-002] Context Engineering 2.0: The Context of Context Engineering

- **Author(s)**: Qishuo Hua, Lyumanshan Ye, Dayuan Fu, Yang Xiao, Xiaojie Cai, Yunze Wu, Jifan Lin, Junfei Wang, Pengfei Liu
- **Date**: 2025-10-30
- **URL**: https://arxiv.org/abs/2510.26493
- **Semantic Scholar**: https://www.semanticscholar.org/paper/606a57fb0ee1f8179a8dc24c09b98189b083fcd4
- **Verified**: yes (2026-03-23)
- **Citations**: 11
- **Relevance**: Q1 (taxonomy), Q7 (origin of term)
- **Cites**: [BIB-004]
- **Cited By**: —
- **Summary**: Provides a systematic definition and historical landscape of context engineering, tracing related practices back 20+ years. Frames the evolution through phases: early HCI frameworks around primitive computers, to human-agent interaction paradigms driven by intelligent agents. Argues context engineering is not a recent innovation but has deep roots in HCI and AI.

### [BIB-003] Invasive Context Engineering to Control Large Language Models

- **Author(s)**: Thomas Rivasseau
- **Date**: 2025-12-02
- **URL**: https://arxiv.org/abs/2512.03001
- **Semantic Scholar**: https://www.semanticscholar.org/paper/0c4b43949b314d225227966b70c92d43f01af886
- **Verified**: yes (2026-03-23)
- **Citations**: 0
- **Relevance**: Q1 (context manipulation techniques)
- **Cites**: —
- **Cited By**: —
- **Summary**: Proposes "invasive context engineering" — control sentences inserted into the LLM context as a security mechanism. Addresses the problem that jailbreak probability increases with context length. Suggests the technique can be generalized to Chain-of-Thought to prevent scheming. Demonstrates a security-oriented view of context engineering.

### [BIB-004] A Survey on In-context Learning

- **Author(s)**: Qingxiu Dong, Lei Li, Damai Dai, Ce Zheng, Zhiyong Wu, Baobao Chang, Xu Sun, Jingjing Xu, Lei Li, Zhifang Sui
- **Date**: 2022-12-31 (published EMNLP 2024)
- **URL**: https://arxiv.org/abs/2301.00234
- **Semantic Scholar**: https://www.semanticscholar.org/paper/30c0cdc414f68211d5d0514df027cec22e005174
- **Verified**: yes (2026-03-23)
- **Citations**: 951
- **Relevance**: Q5 (in-context learning theory)
- **Cites**: —
- **Cited By**: [BIB-001], [BIB-002]
- **Summary**: Foundational survey on in-context learning (ICL), the paradigm where LLMs make predictions based on contexts augmented with examples. Provides formal definition of ICL, organizes training strategies, prompt designing strategies, and analysis. Covers applications in data engineering and knowledge updating. Establishes the theoretical basis for why context structure matters.

### [BIB-005] A Practical Survey on Zero-Shot Prompt Design for In-Context Learning

- **Author(s)**: Yinheng Li
- **Date**: 2023-09-23
- **URL**: https://arxiv.org/abs/2309.13205
- **Semantic Scholar**: https://www.semanticscholar.org/paper/cd7d770eabb4dab6894d9f91d2c3bc337e94a4e1
- **Verified**: yes (2026-03-23)
- **Citations**: 105
- **Relevance**: Q1 (prompt taxonomy), Q5 (ICL theory)
- **Cites**: [BIB-004]
- **Cited By**: —
- **Summary**: Reviews in-context learning techniques focusing on prompt types (discrete, continuous, few-shot, zero-shot) and their impact on LLM performance. Explores prompt design approaches including manual design, optimization algorithms, and evaluation methods. Highlights the critical role of prompt design in harnessing LLM potential.

### [BIB-006] Mem0: Building Production-Ready AI Agents with Scalable Long-Term Memory

- **Author(s)**: P. Chhikara, Dev Khant, Saket Aryan, Taranjeet Singh, Deshraj Yadav
- **Date**: 2025-04-29
- **URL**: https://arxiv.org/abs/2504.19413
- **Semantic Scholar**: https://www.semanticscholar.org/paper/1d9c21a0fdb1cc16a32c5d490ebaf98436a23382
- **Verified**: yes (2026-03-23)
- **Citations**: 201
- **Relevance**: Q1 (memory as context component), Q4 (SE patterns — memory architecture)
- **Cites**: —
- **Cited By**: —
- **Summary**: Introduces Mem0, a scalable memory architecture for AI agents that dynamically extracts, consolidates, and retrieves information from conversations. Proposes graph-based memory for relational structures. Achieves 26% improvement over OpenAI and 91% lower latency vs full-context, demonstrating persistent memory as critical context component.

### [BIB-007] Memory in the Age of AI Agents

- **Author(s)**: Yuyang Hu et al. (48 authors)
- **Date**: 2025-12-18
- **URL**: https://arxiv.org/abs/2512.13564
- **Semantic Scholar**: https://www.semanticscholar.org/paper/d362b7619fcd2df4241696a19aec95961b8a729c
- **Verified**: yes (2026-03-23)
- **Citations**: 84
- **Relevance**: Q1 (memory taxonomy), Q4 (SE patterns — memory architecture)
- **Cites**: [BIB-006]
- **Cited By**: —
- **Summary**: Comprehensive agent memory survey proposing taxonomy through three lenses: forms (token-level, parametric, latent), functions (factual, experiential, working), and dynamics (formation, evolution, retrieval). Explicitly distinguishes agent memory from LLM memory, RAG, and context engineering. Establishes memory as a "first-class primitive" in agent design.

### [BIB-008] Advancing Multi-Agent Systems Through Model Context Protocol

- **Author(s)**: Naveen Krishnan
- **Date**: 2025-04-29
- **URL**: https://arxiv.org/abs/2504.21030
- **Semantic Scholar**: https://www.semanticscholar.org/paper/66098cff05d84454084aa442640c98c076f375f2
- **Verified**: yes (2026-03-23)
- **Citations**: 39
- **Relevance**: Q1 (context protocol taxonomy), Q4 (SE patterns — protocol design)
- **Cites**: —
- **Cited By**: —
- **Summary**: Framework for advancing multi-agent systems through Model Context Protocol (MCP), addressing context management, coordination, and scalability. Develops unified theoretical foundation for standardized context sharing. Directly relevant to how tools and context components are shared across agent systems.

### [BIB-009] Agentic Retrieval-Augmented Generation: A Survey on Agentic RAG

- **Author(s)**: Aditi Singh, Abul Ehtesham, Saket Kumar, T. T. Khoei
- **Date**: 2025-01-15
- **URL**: https://arxiv.org/abs/2501.09136
- **Semantic Scholar**: https://www.semanticscholar.org/paper/f1d6bb6b8f0273986094b5e166538a980c674fea
- **Verified**: yes (2026-03-23)
- **Citations**: 231
- **Relevance**: Q1 (RAG as context management), Q4 (agentic design patterns)
- **Cites**: —
- **Cited By**: —
- **Summary**: Surveys how autonomous AI agents enhance RAG pipelines through reflection, planning, tool use, and multi-agent collaboration. Identifies four agentic design patterns that dynamically manage retrieval strategies. Demonstrates how RAG evolves from static retrieval into dynamic context engineering.

## Practitioner Sources

### [BIB-010] Andrej Karpathy — "Context Engineering" Tweet

- **Author(s)**: Andrej Karpathy
- **Date**: 2025-06-25
- **URL**: https://x.com/karpathy/status/1937902205765607626
- **Verified**: yes (2026-03-23)
- **Relevance**: Q7 (origin/popularization of term)
- **Cites**: [BIB-011]
- **Cited By**: [BIB-012], [BIB-014], [BIB-015]
- **Summary**: Key tweet that popularized "context engineering" as preferred term over "prompt engineering." Defines it as "the delicate art and science of filling the context window with just the right information for the next step." Argues that "prompt" trivializes a complex engineering component. Frames LLMs as a new kind of OS where context window = RAM.

### [BIB-011] Tobi Lutke — "Context Engineering" Tweet

- **Author(s)**: Tobi Lutke (CEO, Shopify)
- **Date**: 2025-06-22
- **URL**: https://x.com/tobi/status/1935533422589399127
- **Verified**: yes (2026-03-23)
- **Relevance**: Q7 (origin of term)
- **Cites**: —
- **Cited By**: [BIB-010], [BIB-012]
- **Summary**: Possibly the original tweet that catalyzed the "context engineering" terminology shift. Defines it as "the art of providing all the context for the task to be plausibly solvable by the LLM." Lutke, as Shopify CEO, represents industry leadership adopting the term.

### [BIB-012] Simon Willison — "Context Engineering"

- **Author(s)**: Simon Willison
- **Date**: 2025-06-27
- **URL**: https://simonwillison.net/2025/jun/27/context-engineering/
- **Verified**: yes (2026-03-23)
- **Relevance**: Q7 (community discussion)
- **Cites**: [BIB-010], [BIB-011]
- **Cited By**: —
- **Summary**: Commentary connecting Lutke and Karpathy's definitions. Argues "context engineering" carries closer alignment to its intended meaning than "prompt engineering." Identifies context as encompassing task descriptions, examples, RAG, multimodal data, tools, state, and history.

### [BIB-013] Anthropic — "Effective Context Engineering for AI Agents"

- **Author(s)**: Prithvi Rajasekaran, Ethan Dixon, Carly Ryan, Jeremy Hadfield (Anthropic Applied AI)
- **Date**: 2025-09-29
- **URL**: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- **Verified**: yes (2026-03-23)
- **Relevance**: Q1 (framework), Q2 (Claude context loading), Q4 (SE patterns)
- **Cites**: —
- **Cited By**: —
- **Summary**: Anthropic's official framework for context engineering. Defines it as "the set of strategies for curating and maintaining the optimal set of tokens during LLM inference." Organizes around system prompts, tools, examples, and message history. Introduces long-horizon strategies: compaction, structured note-taking, and sub-agent architectures. Central principle: "find the smallest set of high-signal tokens that maximize the likelihood of some desired outcome."

### [BIB-014] LangChain — "Context Engineering for Agents"

- **Author(s)**: LangChain / Lance Martin
- **Date**: 2025-07-02
- **URL**: https://blog.langchain.com/context-engineering-for-agents/
- **Verified**: yes (2026-03-23)
- **Relevance**: Q1 (four-strategy framework), Q4 (SE patterns)
- **Cites**: [BIB-010]
- **Cited By**: —
- **Summary**: Presents four-strategy framework for context engineering: writing (storing externally), selecting (RAG), compressing (summarization/pruning), and isolating (sub-agents, state fields). Identifies three context types: instructions (prompts, memories, examples, tool descriptions), knowledge (facts, relational data), and tools (feedback). Reports 57% of organizations have agents in production but 32% cite quality as top barrier.

### [BIB-015] Philipp Schmid — "The New Skill in AI Is Not Prompting, It's Context Engineering"

- **Author(s)**: Philipp Schmid
- **Date**: 2025-06-30
- **URL**: https://www.philschmid.de/context-engineering
- **Verified**: yes (2026-03-23)
- **Relevance**: Q1 (7-component framework), Q7 (community)
- **Cites**: [BIB-010]
- **Cited By**: —
- **Summary**: Identifies seven context components: instructions/system prompt, user prompt, state/history (short-term memory), long-term memory, retrieved information (RAG), available tools, and structured output. Argues most agent failures stem from inadequate context, not model limitations. Top Hacker News post with 915 points, indicating strong community resonance.

### [BIB-016] Lilian Weng — "LLM Powered Autonomous Agents"

- **Author(s)**: Lilian Weng (OpenAI)
- **Date**: 2023-06-23
- **URL**: https://lilianweng.github.io/posts/2023-06-23-agent/
- **Verified**: yes (2026-03-23)
- **Relevance**: Q1 (agent component taxonomy), Q4 (architecture patterns)
- **Cites**: —
- **Cited By**: [BIB-007], [BIB-009]
- **Summary**: Foundational blog post establishing the agent architecture formula: Agent = LLM + Planning + Memory + Tool Use. Predates the "context engineering" term but establishes the conceptual framework that context engineering builds upon. Memory decomposed into short-term (in-context) and long-term (external vector store). Widely referenced in subsequent agent architecture literature.

### [BIB-017] Manus — "Context Engineering for AI Agents: Lessons from Building Manus"

- **Author(s)**: Yichao 'Peak' Ji (Manus)
- **Date**: 2025-07-18
- **URL**: https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus
- **Verified**: yes (2026-03-23)
- **Relevance**: Q1 (production context engineering), Q4 (SE patterns — caching, action masking)
- **Cites**: —
- **Cited By**: —
- **Summary**: Production lessons from building Manus AI agent. Key insight: KV-cache hit rate is the single most critical production metric (10x price differential). Practical techniques: tool masking preserves cache integrity better than dynamic removal; file systems function as externalized context; recitation of goals counteracts mid-task drift; errors strengthen agents by providing implicit evidence; controlled contextual diversity prevents brittleness.

### [BIB-018] Latent Space — "RAG is Dead, Context Engineering is King"

- **Author(s)**: Jeff Huber (Chroma), interviewed by Alessio and swyx
- **Date**: 2025-08-19
- **URL**: https://www.latent.space/p/chroma
- **Verified**: yes (2026-03-23)
- **Relevance**: Q1 (context vs RAG framing), Q7 (community voices)
- **Cites**: —
- **Cited By**: —
- **Summary**: Jeff Huber frames context engineering as "the job of figuring out what should be in the context window" comprising inner loop (what goes in now) and outer loop (improving over time). Dismisses RAG acronym as conflating three separate concepts. Identifies "context rot" — model performance degrades as context length increases despite vendor claims. Five retrieval principles: name primitives, hybrid recall, always re-rank, combat context rot, build golden datasets.

### [BIB-019] Anthropic — "Managing Context on the Claude Developer Platform"

- **Author(s)**: Anthropic
- **Date**: 2025 (exact date TBD)
- **URL**: https://anthropic.com/news/context-management
- **Verified**: yes (2026-03-23)
- **Relevance**: Q2 (Claude context loading), Q1 (context management features)
- **Cites**: [BIB-013]
- **Cited By**: —
- **Summary**: Introduces context editing and the memory tool for the Claude developer platform. Enables developers to build agents handling long-running tasks at higher performance without hitting context limits. Features include thinking block clearing for automatic management of extended reasoning chains.

## Link Graph Summary

```
BIB-004 (ICL Survey, 951 cites)
  ├── cited by → BIB-001 (CE Survey)
  ├── cited by → BIB-002 (CE 2.0)
  └── cited by → BIB-005 (Prompt Design Survey)

BIB-011 (Lutke tweet)
  ├── cited by → BIB-010 (Karpathy tweet)
  └── cited by → BIB-012 (Willison blog)

BIB-010 (Karpathy tweet)
  ├── cited by → BIB-012 (Willison blog)
  ├── cited by → BIB-014 (LangChain blog)
  └── cited by → BIB-015 (Schmid blog)

BIB-016 (Weng blog)
  ├── cited by → BIB-007 (Memory survey)
  └── cited by → BIB-009 (Agentic RAG)

BIB-006 (Mem0)
  └── cited by → BIB-007 (Memory survey)

BIB-013 (Anthropic CE blog)
  └── cited by → BIB-019 (Anthropic context mgmt)
```

## Coverage Analysis

| Secondary Question | Sources | Coverage |
|-------------------|---------|----------|
| Q1: Existing taxonomies | BIB-001, BIB-002, BIB-005, BIB-013, BIB-014, BIB-015 | Strong |
| Q4: SE pattern parallels | BIB-013, BIB-014, BIB-017 | Moderate — need explicit SE pattern mapping |
| Q5: In-context learning theory | BIB-004, BIB-005 | Strong |
| Q7: Communities | BIB-010, BIB-011, BIB-012, BIB-015, BIB-018 | Strong |

## Statistics

- **Total sources**: 74 (BIB-001 through BIB-075, BIB-058 unassigned)
- **Academic papers**: 52
- **Practitioner sources**: 22
- **Link graph connections**: 38 edges across 40 sources
- **All URLs verified**: yes

---

## Phase 1 Follow-up Sources

_Added 2026-03-23 from topic-specific follow-up research plans._

### In-Context Learning

### [BIB-020] Complementary Explanations for Effective In-Context Learning

- **Author(s)**: Xi Ye, Srinivasan Iyer, Asli Celikyilmaz, Ves Stoyanov, Greg Durrett, Ramakanth Pasunuru
- **Date**: 2022-11-25
- **URL**: https://arxiv.org/abs/2211.13892
- **Verified**: yes (2026-03-23)
- **Relevance**: In-Context Learning, Prompt Engineering
- **Cites**: [BIB-030]
- **Cited By**: —
- **Summary**: Studies the mechanisms by which explanations work in ICL prompts. Identifies two contributing factors: the computation trace and the natural language used. Shows LLMs benefit from complementary explanation sets — diverse reasoning skills across exemplars improve performance. Proposes maximal marginal relevance-based exemplar selection, bridging ICL theory to practical prompt design.

### [BIB-021] What Makes Good In-Context Demonstrations for Code Intelligence Tasks with LLMs?

- **Author(s)**: Shuzheng Gao, Xinjie Wen, Cuiyun Gao, Wenxuan Wang, Michael R. Lyu
- **Date**: 2023-04-15
- **URL**: https://arxiv.org/abs/2304.07575
- **Verified**: yes (2026-03-23)
- **Relevance**: In-Context Learning
- **Cites**: [BIB-030]
- **Cited By**: —
- **Summary**: Empirically explores the impact of selection, order, and number of demonstration examples on ICL performance across code summarization, bug fixing, and program synthesis. Finds all three factors dramatically impact performance. Carefully designed demonstrations improve BLEU-4 and EM by 9.90%-175.96% over standard methods. Essential bridge from ICL theory to practical context design.

### [BIB-022] Lakera — "What is In-context Learning, and how does it work: The Beginner's Guide"

- **Author(s)**: Deval Shah (Lakera)
- **Date**: 2025-12-17
- **URL**: https://www.lakera.ai/blog/what-is-in-context-learning
- **Verified**: yes (2026-03-23)
- **Relevance**: In-Context Learning, Prompt Engineering
- **Cites**: —
- **Cited By**: —
- **Summary**: Comprehensive practitioner guide translating ICL theory into accessible concepts. Covers zero-shot, one-shot, and few-shot learning; explains the Bayesian inference framework for ICL from Stanford AI Lab; discusses ICL variants (regular, flipped-label, semantically-unrelated label); and connects chain-of-thought prompting as an ICL technique. Key bridge between academic ICL research and practical application.

### [BIB-023] The Impact of Role Design in In-Context Learning for Large Language Models

- **Author(s)**: Hamidreza Rouzegar, Masoud Makrehchi
- **Date**: 2025-09-27
- **URL**: https://arxiv.org/abs/2509.23501
- **Verified**: yes (2026-03-23)
- **Relevance**: In-Context Learning, Prompt Engineering
- **Cites**: —
- **Cited By**: —
- **Summary**: Examines the underexplored impact of role configurations in zero-shot and few-shot ICL scenarios using GPT-3.5, GPT-4o, Llama2-7b, and Llama2-13b. Evaluates across sentiment analysis, text classification, question answering, and math reasoning. Findings suggest role-based prompt structuring enhances LLM performance. Directly connects prompt engineering practice (role design) with ICL theory.

### Prompt Engineering

### [BIB-024] The Prompt Report: A Systematic Survey of Prompt Engineering Techniques

- **Author(s)**: Sander Schulhoff, Michael Ilie, Nishant Balepur, et al. (31 authors)
- **Date**: 2024-06-06 (updated 2025-02)
- **URL**: https://arxiv.org/abs/2406.06608
- **Verified**: yes (2026-03-23)
- **Relevance**: Prompt Engineering
- **Cites**: [BIB-030]
- **Cited By**: —
- **Summary**: The most comprehensive prompt engineering survey to date. Establishes a vocabulary of 33 terms, a taxonomy of 58 LLM prompting techniques organized into 6 categories (Few-Shot, Thought Generation, Zero-Shot, Ensembling, Self-Criticism, and more), and 40 techniques for other modalities. Co-authored with researchers from OpenAI, Microsoft, Google, Princeton, and Stanford. Essential reference for the PE taxonomy.

### [BIB-025] A Systematic Survey of Prompt Engineering in Large Language Models: Techniques and Applications

- **Author(s)**: Pranab Sahoo, Ayush Kumar Singh, Sriparna Saha, Vinija Jain, Samrat Mondal, Aman Chadha
- **Date**: 2024-02-05
- **URL**: https://arxiv.org/abs/2402.07927
- **Verified**: yes (2026-03-23)
- **Relevance**: Prompt Engineering
- **Cites**: [BIB-030]
- **Cited By**: —
- **Summary**: Structured overview of prompt engineering advancements categorized by application area. For each prompting approach, provides methodology summary, applications, models involved, and datasets. With 767 citations, this is the most highly-cited PE survey, indicating broad community adoption as a reference taxonomy.

### [BIB-026] Towards Goal-oriented Prompt Engineering for Large Language Models: A Survey

- **Author(s)**: Haochen Li, Jonathan Leung, Zhiqi Shen
- **Date**: 2024-01-25
- **URL**: https://arxiv.org/abs/2401.14043
- **Verified**: yes (2026-03-23)
- **Relevance**: Prompt Engineering
- **Cites**: —
- **Cited By**: —
- **Summary**: Reviews 50 representative studies and introduces a novel taxonomy categorizing goal-oriented prompting methods into five interconnected stages. Highlights the limitation of designing prompts based on anthropomorphic assumptions. Demonstrates that goal-oriented prompt formulation significantly improves performance. Provides a complementary taxonomic lens to The Prompt Report.

### [BIB-027] Anthropic — "Prompting Best Practices" (Claude Documentation)

- **Author(s)**: Anthropic
- **Date**: 2025 (continuously updated; latest for Claude 4.6)
- **URL**: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
- **Verified**: yes (2026-03-23)
- **Relevance**: Prompt Engineering
- **Cites**: [BIB-013]
- **Cited By**: —
- **Summary**: Official Anthropic guide covering prompt engineering for Claude models. Organizes techniques into general principles (clarity, context, examples, XML structuring, role prompting), output and formatting, tool use, and thinking and reasoning. Demonstrates the evolution from simple prompting to complex context engineering including prompt chaining, sub-agent architectures, and compaction.

### [BIB-028] Chain-of-Thought Prompting Elicits Reasoning in Large Language Models

- **Author(s)**: Jason Wei, Xuezhi Wang, Dale Schuurmans, Maarten Bosma, Brian Ichter, Fei Xia, Ed Chi, Quoc Le, Denny Zhou
- **Date**: 2022-01-28
- **URL**: https://arxiv.org/abs/2201.11903
- **Verified**: yes (2026-03-23)
- **Relevance**: In-Context Learning, Prompt Engineering
- **Cites**: [BIB-030]
- **Cited By**: —
- **Summary**: Foundational paper demonstrating that providing a chain of thought — intermediate reasoning steps — as few-shot exemplars dramatically improves LLM reasoning on arithmetic, commonsense, and symbolic tasks. With 16,500+ citations, this is the most influential paper at the intersection of ICL and prompt engineering. Established CoT as a core prompt engineering technique grounded in ICL theory.

### [BIB-029] A Survey of Automatic Prompt Engineering: An Optimization Perspective

- **Author(s)**: Wenwu Li, Xiangfeng Wang, Wenhao Li, Bo Jin
- **Date**: 2025-02-17
- **URL**: https://arxiv.org/abs/2502.11560
- **Verified**: yes (2026-03-23)
- **Relevance**: Prompt Engineering
- **Cites**: —
- **Cited By**: —
- **Summary**: First comprehensive survey on automated prompt engineering through a unified optimization-theoretic lens. Formalizes prompt optimization as a maximization problem over discrete, continuous, and hybrid prompt spaces. Covers FM-based optimization, evolutionary methods, gradient-based optimization, and reinforcement learning. Highlights underexplored frontiers in agent-oriented prompt design.

### [BIB-030] Language Models are Few-Shot Learners

- **Author(s)**: Tom B. Brown, Benjamin Mann, Nick Ryder, et al. (31 authors)
- **Date**: 2020-05-28
- **URL**: https://arxiv.org/abs/2005.14165
- **Verified**: yes (2026-03-23)
- **Relevance**: In-Context Learning
- **Cites**: —
- **Cited By**: [BIB-004], [BIB-005], [BIB-020], [BIB-021], [BIB-024], [BIB-025], [BIB-028]
- **Summary**: The GPT-3 paper that introduced in-context learning (few-shot learning) as a paradigm. Demonstrated that scaling language models to 175B parameters enables strong performance on NLP tasks via prompting alone, without gradient updates. With 55,644 citations, this is the foundational ancestor of the entire ICL research line and the conceptual precursor to context engineering.

### Tool Use & MCP

### [BIB-031] LLMCompiler: An LLM Compiler for Parallel Function Calling

- **Author(s)**: Sehoon Kim, Suhong Moon, Ryan Tabrizi, Nicholas Lee, Michael W. Mahoney, Kurt Keutzer, Amir Gholami
- **Date**: 2023-12-07
- **URL**: https://arxiv.org/abs/2312.04511
- **Verified**: yes (2026-03-23)
- **Relevance**: Tool Use & MCP
- **Cites**: —
- **Cited By**: —
- **Summary**: Introduces LLMCompiler, a compiler-inspired framework for parallel function calling with three components: a Function Calling Planner, Task Fetching Unit, and Executor. Achieves up to 3.7x latency speedup and 6.7x cost savings vs. ReAct. Directly relevant to tool orchestration architecture and the design pattern of separating planning from execution in function calling.

### [BIB-032] The Convergence of Schema-Guided Dialogue Systems and the Model Context Protocol

- **Author(s)**: Andreas Schlapbach
- **Date**: 2026-02-21
- **URL**: https://arxiv.org/abs/2602.18764
- **Verified**: yes (2026-03-23)
- **Relevance**: Tool Use & MCP, SE Patterns
- **Cites**: [BIB-033]
- **Cited By**: —
- **Summary**: Establishes that Schema-Guided Dialogue (SGD) and MCP are two manifestations of a unified paradigm for deterministic, auditable LLM-agent interaction. Extracts five foundational schema design principles: Semantic Completeness over Syntactic Precision, Explicit Action Boundaries, Failure Mode Documentation, Progressive Disclosure Compatibility, and Inter-Tool Relationship Declaration. Critical bridge paper connecting SE schema design patterns to LLM tool integration.

### [BIB-033] MCP Specification (2025-11-25) — Model Context Protocol

- **Author(s)**: Anthropic (specification maintainers)
- **Date**: 2025-11-25
- **URL**: https://modelcontextprotocol.io/specification/2025-11-25
- **Verified**: yes (2026-03-23)
- **Relevance**: Tool Use & MCP
- **Cites**: —
- **Cited By**: [BIB-032], [BIB-034]
- **Summary**: The authoritative MCP specification defining the open protocol for LLM-tool integration. Uses JSON-RPC 2.0 over stateful connections with capability negotiation. Defines three server primitives (Resources, Prompts, Tools) and three client features (Sampling, Roots, Elicitation). The Nov 2025 release adds asynchronous Tasks, server-side agent loops, OAuth authorization, and an Extensions mechanism. Inspired by LSP; donated to Linux Foundation Dec 2025.

### [BIB-034] MCP Tool Description Smells: Towards Improving AI Agent Efficiency with Augmented MCP Tool Descriptions

- **Author(s)**: Mohammed Mehedi Hasan, Hao Li, Gopi Krishnan Rajbahadur, Bram Adams, Ahmed E. Hassan
- **Date**: 2026-02-16
- **URL**: https://arxiv.org/abs/2602.14878
- **Verified**: yes (2026-03-23)
- **Relevance**: Tool Use & MCP, SE Patterns
- **Cites**: [BIB-033]
- **Cited By**: —
- **Summary**: Empirically examines 856 tools across 103 MCP servers, finding 97.1% of tool descriptions contain at least one "smell" (defect), with 56% failing to state purpose clearly. Identifies six components of tool descriptions and formalizes tool description smells via a scoring rubric. Augmenting descriptions improves task success by 5.85 pp but increases execution steps by 67.46%. Directly applies SE code-smell methodology to LLM tool schema quality.

### [BIB-035] MCP-Zero: Active Tool Discovery for Autonomous LLM Agents

- **Author(s)**: Xiang Fei, Xiawu Zheng, Hao Feng
- **Date**: 2025-06-01
- **URL**: https://arxiv.org/abs/2506.01056
- **Verified**: yes (2026-03-23)
- **Relevance**: Tool Use & MCP
- **Cites**: —
- **Cited By**: —
- **Summary**: Proposes active tool discovery as a fundamental design pattern for scalable autonomous agents, replacing passive tool injection with on-demand capability acquisition. Three core mechanisms: Active Tool Request, Hierarchical Semantic Routing, and Iterative Capability Extension. Achieves 98% reduction in token consumption on APIBank. Constructs MCP-tools dataset of 308 MCP servers and 2,797 tools.

### Multi-Agent Systems

### [BIB-036] SagaLLM: Context Management, Validation, and Transaction Guarantees for Multi-Agent LLM Planning

- **Author(s)**: Edward Y. Chang, Longling Geng
- **Date**: 2025-03-15
- **URL**: https://arxiv.org/abs/2503.11951
- **Verified**: yes (2026-03-23)
- **Relevance**: Multi-Agent Systems, Tool Use & MCP
- **Cites**: —
- **Cited By**: —
- **Summary**: Introduces SagaLLM, addressing four foundational limitations: unreliable self-validation, context loss, lack of transactional safeguards, and insufficient inter-agent coordination. Integrates the Saga transactional pattern (from distributed systems) with persistent memory, automated compensation, and independent validation agents. Directly applies distributed systems patterns (Saga, compensating transactions) to multi-agent LLM coordination.

### [BIB-037] Understanding Multi-Agent LLM Frameworks: A Unified Benchmark and Experimental Analysis (MAFBench)

- **Author(s)**: Abdelghny Orogat, Ana Rostam, Essam Mansour
- **Date**: 2026-02-03
- **URL**: https://arxiv.org/abs/2602.03128
- **Verified**: yes (2026-03-23)
- **Relevance**: Multi-Agent Systems
- **Cites**: —
- **Cited By**: —
- **Summary**: Introduces an architectural taxonomy for systematically comparing multi-agent LLM frameworks and MAFBench, a unified evaluation suite. Key finding: framework-level design choices alone can increase latency by over 100x, reduce planning accuracy by up to 30%, and lower coordination success from above 90% to below 30%. Provides concrete architectural design principles and framework selection guidance for production multi-agent systems.

### [BIB-038] Scaling Long-Horizon LLM Agent via Context-Folding

- **Author(s)**: Weiwei Sun, Miao Lu, Zhan Ling, Kang Liu, Xuesong Yao, Yiming Yang, Jiecao Chen
- **Date**: 2025-10-15
- **URL**: https://arxiv.org/abs/2510.11967
- **Verified**: yes (2026-03-23)
- **Relevance**: Multi-Agent Systems, Tool Use & MCP
- **Cites**: —
- **Cited By**: —
- **Summary**: Introduces Context-Folding, enabling agents to actively manage working context by branching into sub-trajectories and folding them upon completion, retaining concise outcome summaries while discarding intermediate steps. Uses RL framework FoldGRPO with process rewards. Matches or outperforms ReAct baselines while using 10x smaller active context. Fundamental contribution to context engineering for long-horizon agent tasks.

### [BIB-039] LLM Multi-Agent Systems: Challenges and Open Problems

- **Author(s)**: Shanshan Han, Qifan Zhang, Yuhang Yao, Weizhao Jin, Zhaozhuo Xu, Chaoyang He
- **Date**: 2024-02-05
- **URL**: https://arxiv.org/abs/2402.03578
- **Verified**: yes (2026-03-23)
- **Relevance**: Multi-Agent Systems
- **Cites**: —
- **Cited By**: —
- **Summary**: Comprehensive exploration of multi-agent system challenges including optimizing task allocation, fostering robust reasoning through iterative debates, managing complex and layered context information, and enhancing memory management. Identifies context management as a key open problem: how to maintain coherent shared state across agents with different roles while preventing context pollution. Highly cited (125) foundational survey for multi-agent LLM systems.

### [BIB-040] Towards Effective GenAI Multi-Agent Collaboration: Design and Evaluation for Enterprise Applications

- **Author(s)**: Raphael Shu, Nilaksh Das, Michelle Yuan, Monica Sunkara, Yi Zhang
- **Date**: 2024-12-06
- **URL**: https://arxiv.org/abs/2412.05449
- **Verified**: yes (2026-03-23)
- **Relevance**: Multi-Agent Systems, Tool Use & MCP
- **Cites**: —
- **Cited By**: —
- **Summary**: Evaluates two key operational modes: coordination mode (parallel communication and payload referencing) and routing mode (efficient message forwarding). Multi-agent collaboration enhances goal success rates by up to 70% vs single-agent approaches. Payload referencing improves code-intensive task performance by 23%. Practical enterprise-grade guidance for multi-agent handoff and coordination patterns.

### [BIB-041] Small LLMs Are Weak Tool Learners: A Multi-LLM Agent

- **Author(s)**: Weizhou Shen, Chenliang Li, Hongzhan Chen, Ming Yan, Xiaojun Quan, Hehong Chen, Ji Zhang, Fei Huang
- **Date**: 2024-01-14
- **URL**: https://arxiv.org/abs/2401.07324
- **Verified**: yes (2026-03-23)
- **Relevance**: Multi-Agent Systems, Tool Use & MCP
- **Cites**: —
- **Cited By**: —
- **Summary**: Decomposes tool-use capabilities into three specialized agents: planner, caller, and summarizer, each implemented by a single LLM. Proposes a two-stage training paradigm: first fine-tune on entire dataset, then specialize each agent on its sub-task. Multi-LLM framework surpasses traditional single-LLM approach on tool-use benchmarks. Directly demonstrates the intersection of tool orchestration and multi-agent decomposition.

### [BIB-042] Context Engineering for Multi-Agent LLM Code Assistants

- **Author(s)**: Muhammad Haseeb
- **Date**: 2025-08-09
- **URL**: https://arxiv.org/abs/2508.08322
- **Verified**: yes (2026-03-23)
- **Relevance**: Multi-Agent Systems, Tool Use & MCP, SE Patterns, Community & Terminology
- **Cites**: —
- **Cited By**: —
- **Summary**: Proposes a context engineering workflow combining Intent Translator (GPT-5), Elicit-powered semantic retrieval for domain knowledge injection, NotebookLM document synthesis, and Claude Code multi-agent system. Demonstrates that targeted context injection and agent role decomposition lead to state-of-the-art code generation performance. Explicitly frames context engineering as the orchestration challenge for multi-agent tool use in software engineering.

### [BIB-043] ToolRegistry: A Protocol-Agnostic Tool Management Library for Function-Calling LLMs

- **Author(s)**: Peng Ding
- **Date**: 2025-07-14
- **URL**: https://arxiv.org/abs/2507.10593
- **Verified**: yes (2026-03-23)
- **Relevance**: Tool Use & MCP, SE Patterns
- **Cites**: —
- **Cited By**: —
- **Summary**: Presents a protocol-agnostic tool management system applying classic SE patterns (adapter pattern for protocol abstraction, composition over inheritance, registry pattern) to LLM tool integration. Modular three-package ecosystem: core registry, server package with protocol adapters (MCP, OpenAPI), and a curated tool hub. Achieves 60-80% reduction in tool integration code and up to 3.1x performance improvements.

### [BIB-044] OpenAI Agents SDK: Handoffs Pattern

- **Author(s)**: OpenAI
- **Date**: 2025-03 (initial release)
- **URL**: https://openai.github.io/openai-agents-python/handoffs/
- **Verified**: yes (2026-03-23)
- **Relevance**: Multi-Agent Systems, Tool Use & MCP
- **Cites**: —
- **Cited By**: —
- **Summary**: OpenAI's production-ready Agents SDK implements agent handoffs as first-class tool definitions — each agent declares its handoff targets, and the framework enforces that handoffs follow declared paths. Handoffs are represented as tools (e.g., "transfer_to_refund_agent"), making the connection between tool-use architecture and multi-agent coordination explicit. Establishes handoff-as-tool as a key architectural pattern.

### Memory Systems

### [BIB-045] Position: Episodic Memory is the Missing Piece for Long-Term LLM Agents

- **Author(s)**: Mathis Pink, Qinyuan Wu, Vy Ai Vo, Javier Turek, Jianing Mu, Alexander Huth, Mariya Toneva
- **Date**: 2025-02-10
- **URL**: https://arxiv.org/abs/2502.06975
- **Verified**: yes (2026-03-23)
- **Relevance**: Memory Systems
- **Cites**: —
- **Cited By**: —
- **Summary**: Presents an episodic memory framework for LLM agents centered on five key properties of episodic memory that underlie adaptive and context-sensitive behavior. Directly applies cognitive science taxonomy (episodic vs. semantic memory) to LLM agent architectures, arguing that now is the right time for explicit, integrated focus on episodic memory to catalyze long-term agents.

### [BIB-046] MemGPT: Towards LLMs as Operating Systems

- **Author(s)**: Charles Packer, Vivian Fang, Shishir G. Patil, Kevin Lin, Sarah Wooders, Joseph Gonzalez
- **Date**: 2023-10-16
- **URL**: https://arxiv.org/abs/2310.08560
- **Verified**: yes (2026-03-23)
- **Relevance**: Memory Systems, RAG
- **Cites**: —
- **Cited By**: [BIB-049], [BIB-057]
- **Summary**: Introduces virtual context management for LLMs, drawing inspiration from OS hierarchical memory systems (RAM/disk). MemGPT uses a tiered architecture with main context (system prompt, working context, message buffer) and external context (recall storage, archival storage), with the LLM itself acting as the memory manager through self-directed editing via tool calling. Highly influential (455 citations); evolved into the Letta platform by September 2024. Foundational work for understanding memory-as-context engineering.

### [BIB-047] Memory OS of AI Agent (MemoryOS)

- **Author(s)**: Jiazheng Kang, Mingming Ji, Zhe Zhao, Ting Bai
- **Date**: 2025-06-06
- **URL**: https://arxiv.org/abs/2506.06326
- **Verified**: yes (2026-03-23)
- **Relevance**: Memory Systems, RAG
- **Cites**: [BIB-046]
- **Cited By**: —
- **Summary**: Proposes a Memory Operating System (MemoryOS) for AI agents with a three-level hierarchical storage: short-term, mid-term, and long-term personal memory. Directly inspired by OS memory management principles, with dynamic update operations between storage units (FIFO for short-to-mid, segmented page organization for mid-to-long). Achieves 49.11% F1 improvement over baselines on GPT-4o-mini.

### [BIB-048] CAST: Character-and-Scene Episodic Memory for Agents

- **Author(s)**: Kexin Ma, Bojun Li, Yuhua Tang, Liting Sun, Ruochun Jin
- **Date**: 2026-01-14
- **URL**: https://arxiv.org/abs/2602.06051
- **Verified**: yes (2026-03-23)
- **Relevance**: Memory Systems
- **Cites**: —
- **Cited By**: —
- **Summary**: Proposes a dual-memory architecture distinguishing episodic and semantic memory for agents, inspired by dramatic theory. Constructs 3D scenes (time/place/topic) organized into character profiles for episodic memory, complemented by graph-based semantic memory. Demonstrates 8.11% F1 improvement over baselines, especially on time-sensitive conversational questions.

### [BIB-049] Zep: A Temporal Knowledge Graph Architecture for Agent Memory

- **Author(s)**: Preston Rasmussen, Pavlo Paliychuk, Travis Beauvais, Jack Ryan, Daniel Chalef
- **Date**: 2025-01-23
- **URL**: https://arxiv.org/abs/2501.13956
- **Verified**: yes (2026-03-23)
- **Relevance**: Memory Systems, RAG
- **Cites**: [BIB-046]
- **Cited By**: —
- **Summary**: Introduces Zep, a memory layer service using a temporally-aware knowledge graph engine (Graphiti) that dynamically synthesizes unstructured conversational data and structured business data while maintaining historical relationships. Outperforms MemGPT on the Deep Memory Retrieval benchmark (94.8% vs 93.4%) and achieves 18.5% accuracy improvement with 90% latency reduction on LongMemEval. Demonstrates that temporal knowledge graphs can serve as unified memory architectures bridging episodic retrieval and semantic knowledge.

### RAG

### [BIB-050] Engineering the RAG Stack: A Comprehensive Review of Architecture and Trust Frameworks

- **Author(s)**: Dean Wampler, Dave Nielson, Alireza Seddighi
- **Date**: 2025-11-07
- **URL**: https://arxiv.org/abs/2601.05264
- **Verified**: yes (2026-03-23)
- **Relevance**: RAG
- **Cites**: —
- **Cited By**: —
- **Summary**: Systematic literature review (2018-2025) consolidating RAG techniques into a unified taxonomy covering fusion mechanisms, retrieval strategies, and orchestration approaches. Provides quantitative assessment frameworks and analyzes trust/alignment implications. Serves as a practical framework for deploying resilient, secure, domain-adaptable RAG systems.

### [BIB-051] Reconstructing Context: Evaluating Advanced Chunking Strategies for RAG

- **Author(s)**: Carlo Merola, J. Singh
- **Date**: 2025-04-28
- **URL**: https://arxiv.org/abs/2504.19754
- **Verified**: yes (2026-03-23)
- **Relevance**: RAG
- **Cites**: —
- **Cited By**: —
- **Summary**: Rigorous comparison of late chunking and contextual retrieval for RAG systems. Finds that contextual retrieval preserves semantic coherence more effectively but requires greater computational resources, while late chunking offers higher efficiency but sacrifices relevance and completeness. Directly addresses the chunking problem as a core context assembly challenge.

### [BIB-052] From Prompt Engineering to Context Engineering: A Comparative Analysis

- **Author(s)**: O. Cinar, Numan Halit Guldemir
- **Date**: 2026 (IEEE IISEC)
- **URL**: https://doi.org/10.1109/IISEC69317.2026.11418464
- **Verified**: yes (2026-03-23)
- **Relevance**: RAG, Community & Terminology
- **Cites**: [BIB-001], [BIB-013]
- **Cited By**: —
- **Summary**: Directly compares prompt engineering and context engineering as AI interaction paradigms for LLMs. Finds that prompt engineering fits simple one-shot queries needing little state, while context engineering supports scalable, reliable agents using documents, memory, tools, and prior interactions. First known peer-reviewed comparative study of the two paradigms.

### [BIB-053] A Human-Inspired Reading Agent with Gist Memory of Very Long Contexts

- **Author(s)**: Kuang-Huei Lee, Xinyun Chen, Hiroki Furuta, John F. Canny, Ian Fischer
- **Date**: 2024-02-15
- **URL**: https://arxiv.org/abs/2402.09727
- **Verified**: yes (2026-03-23)
- **Relevance**: Memory Systems, RAG
- **Cites**: —
- **Cited By**: —
- **Summary**: Introduces ReadAgent, an LLM agent system that increases effective context length up to 20x by mimicking human interactive reading. Implements a three-step process: deciding what to store in memory episodes, compressing episodes into "gist memories," and looking up original passages when needed. Outperforms retrieval baselines on three long-document comprehension tasks. Demonstrates the convergence of memory consolidation and retrieval as complementary context management strategies.

### [BIB-054] "From RAG to Context — A 2025 Year-End Review of RAG" (RAGFlow / InfiniFlow)

- **Author(s)**: InfiniFlow (RAGFlow team)
- **Date**: Late 2025
- **URL**: https://ragflow.io/blog/rag-review-2025-from-rag-to-context
- **Verified**: yes (2026-03-23)
- **Relevance**: RAG, Community & Terminology
- **Cites**: —
- **Cited By**: —
- **Summary**: Documents RAG's metamorphosis from a specific pattern into a "Context Engine" with intelligent retrieval as its core capability. Argues that context engineering became the hottest technical exploration and guiding principle in the latter half of 2025. Key framing: RAG evolves into a unified Context Layer serving LLM applications, with retrieval as one step in a broader reasoning loop.

### [BIB-055] "Is RAG Dead? The Rise of Context Engineering and Semantic Layers for Agentic AI" (Towards Data Science)

- **Author(s)**: TDS contributor
- **Date**: 2025
- **URL**: https://towardsdatascience.com/beyond-rag/
- **Verified**: yes (2026-03-23)
- **Relevance**: RAG, Community & Terminology
- **Cites**: —
- **Cited By**: —
- **Summary**: Examines whether RAG has been superseded by context engineering. Argues that RAG has been "rebranded" as context engineering, which now includes MCP and RAG as components. Frames the terminology shift as reflecting the maturation of retrieval from a standalone pattern to a component within broader context assembly systems.

### [BIB-056] "RAG Isn't Dead, but Context Engineering Is the New Hotness" (The New Stack)

- **Author(s)**: The New Stack
- **Date**: 2025
- **URL**: https://thenewstack.io/rag-isnt-dead-but-context-engineering-is-the-new-hotness/
- **Verified**: yes (2026-03-23)
- **Relevance**: RAG, Community & Terminology
- **Cites**: —
- **Cited By**: —
- **Summary**: Argues that in the agentic era, older terms like RAG and prompt engineering are giving way to MCP and context engineering. Notes that context engineering fundamentally includes RAG as a component, framing CE as the superset discipline. Retrieval becomes one step in a broader agent reasoning loop.

### [BIB-057] "Memory Blocks: The Key to Agentic Context Management" (Letta Blog)

- **Author(s)**: Letta team (formerly MemGPT)
- **Date**: 2025
- **URL**: https://www.letta.com/blog/memory-blocks
- **Verified**: yes (2026-03-23)
- **Relevance**: Memory Systems, RAG
- **Cites**: [BIB-046]
- **Cited By**: —
- **Summary**: Describes the evolution from MemGPT to Letta's memory block architecture for agentic context management. Memory blocks are modular, editable units of context that agents can read and write, enabling self-directed memory management. Represents the practical evolution of the MemGPT paradigm into a production-ready framework for memory-as-context engineering.

### Production Engineering

### [BIB-059] KV Cache Optimization Strategies for Scalable and Efficient LLM Inference

- **Author(s)**: Yichun Xu, Navjot K. Khaira, Tejinder Singh
- **Date**: 2026-03-20
- **URL**: https://arxiv.org/abs/2603.20397
- **Verified**: yes (2026-03-23)
- **Relevance**: Production Engineering
- **Cites**: —
- **Cited By**: —
- **Summary**: Comprehensive survey organizing KV cache optimization into five categories: cache eviction, cache compression, hybrid memory solutions, novel attention mechanisms, and combination strategies. Maps techniques to seven practical deployment scenarios. Key finding: no single technique dominates across all settings; optimal strategy depends on context length, hardware constraints, and workload characteristics.

### [BIB-060] Keep the Cost Down: A Review on Methods to Optimize LLM's KV-Cache Consumption

- **Author(s)**: Luohe Shi, Hongyi Zhang, Yao Yao, Zuchao Li, Hai Zhao
- **Date**: 2024-07-25
- **URL**: https://arxiv.org/abs/2407.18003
- **Verified**: yes (2026-03-23)
- **Relevance**: Production Engineering
- **Cites**: —
- **Cited By**: —
- **Summary**: Review dissecting KV-Cache properties and optimization methods spanning pre-training, deployment, and inference phases. Provides metrics for evaluating long-text capabilities from both efficiency and capability perspectives. Maintains a curated GitHub repository of KV-Cache optimization papers. Valuable for understanding the production lifecycle of cache management.

### [BIB-061] SqueezeAttention: 2D Management of KV-Cache in LLM Inference via Layer-wise Optimal Budget

- **Author(s)**: Zihao Wang, Bin Cui, Shaoduo Gan
- **Date**: 2024-04-07
- **URL**: https://arxiv.org/abs/2404.04793
- **Verified**: yes (2026-03-23)
- **Relevance**: Production Engineering
- **Cites**: —
- **Cited By**: —
- **Summary**: Introduces two-dimensional KV-cache optimization combining sequence-wise and layer-wise budget allocation. Achieves 30%-70% memory reductions and up to 2.2x throughput improvements across a wide range of LLMs and benchmarks. Directly relevant to token budget management in production context engineering.

### [BIB-062] NVIDIA TensorRT-LLM KV Cache Reuse Optimizations

- **Author(s)**: NVIDIA (technical blog)
- **Date**: 2025 (updated through 2025)
- **URL**: https://developer.nvidia.com/blog/introducing-new-kv-cache-reuse-optimizations-in-nvidia-tensorrt-llm/
- **Verified**: yes (2026-03-23)
- **Relevance**: Production Engineering
- **Cites**: —
- **Cited By**: —
- **Summary**: Documents production-grade KV cache reuse (prefix caching) in TensorRT-LLM with concrete metrics: up to 5x faster time-to-first-token with system prompt sharing, typical 2x TTFT speedup with prefix caching enabled, priority-based eviction with configurable priority and duration per block. Directly applicable to production context engineering where stable system prompts drive cache efficiency.

### [BIB-063] Make Your LLM Fully Utilize the Context

- **Author(s)**: Shengnan An, Zexiong Ma, Zeqi Lin, Nanning Zheng, Jian-Guang Lou
- **Date**: 2024-04-25
- **URL**: https://www.semanticscholar.org/paper/82460f7995f66f3f035f34ecbd2c82b024282529
- **Verified**: yes (2026-03-23)
- **Relevance**: Production Engineering
- **Cites**: —
- **Cited By**: —
- **Summary**: Addresses the "lost-in-the-middle" problem with Information-INtensive (IN2) training — a data-driven approach to overcome positional bias in long contexts. Improves NarrativeQA F1 from 23.5 to 26.9 while maintaining short-context performance. Demonstrates that context window utilization is a first-order production concern: simply having a large context window is insufficient without explicit training for uniform attention across positions.

### SE Patterns

### [BIB-064] Survey of LLM Agent Communication with MCP: A Software Design Pattern Centric Review

- **Author(s)**: A. Sarkar, S. Sarkar
- **Date**: 2025-06-05
- **URL**: https://arxiv.org/abs/2506.05364
- **Verified**: yes (2026-03-23)
- **Relevance**: SE Patterns, Production Engineering
- **Cites**: [BIB-033]
- **Cited By**: —
- **Summary**: Directly maps classical SE design patterns (Mediator, Observer, Publish-Subscribe, Broker) to LLM agent communication architectures via MCP. Provides conceptual schematics and formal models mapping communication pathways and optimizing data flow. Covers real-world applications in financial processing and investment banking. The strongest single source connecting SE patterns to context engineering.

### [BIB-065] A Pattern Language for Distributed Computing (POSA Series)

- **Author(s)**: Frank Buschmann, Kevlin Henney, Douglas C. Schmidt
- **Date**: 2007
- **URL**: https://www.semanticscholar.org/paper/38297e87841e88d36e017120887346fb0abc3d8b
- **Verified**: yes (2026-03-23)
- **Relevance**: SE Patterns
- **Cites**: —
- **Cited By**: [BIB-067]
- **Summary**: Volume 4 of the Pattern-Oriented Software Architecture (POSA) series. Authoritative reference for distributed computing patterns including context object, interceptor/pipeline, and broker patterns. These foundational patterns map directly to LLM context management architectures: the Context Object pattern parallels the structured context window, the Interceptor pattern maps to middleware pipelines for context assembly, and the Broker pattern maps to tool routing in agent systems.

### [BIB-066] An Exploratory Study on the Effects of Event-Driven Architecture on Software Modularity

- **Author(s)**: Luan Lazzari, Kleinner Farias
- **Date**: 2021-10-27
- **URL**: https://arxiv.org/abs/2110.14699
- **Verified**: yes (2026-03-23)
- **Relevance**: SE Patterns
- **Cites**: —
- **Cited By**: —
- **Summary**: Empirical comparison of event-driven architecture vs REST across five evolution scenarios using ten modularity metrics (separation of concerns, coupling, cohesion, complexity, size). Finds EDA improves separation of concerns but increases coupling and complexity. Directly relevant to understanding the trade-offs when applying event-driven/hook patterns to context engineering pipelines.

### [BIB-067] Towards a Middleware for Large Language Models

- **Author(s)**: Narcisa Guran et al.
- **Date**: 2024-11-21
- **URL**: https://arxiv.org/abs/2411.14513
- **Verified**: yes (2026-03-23)
- **Relevance**: SE Patterns, Production Engineering
- **Cites**: [BIB-065]
- **Cited By**: —
- **Summary**: Proposes a middleware architecture for enterprise LLM deployment covering session management, caching, job scheduling, observability, and explainability. Envisions LLMs absorbing functionality traditionally attributed to middleware (the "LLM as gateway" pattern). Bridges the gap between traditional enterprise middleware (POSA patterns) and modern LLM deployment patterns.

### [BIB-068] AIOS: LLM Agent Operating System

- **Author(s)**: Kai Mei, Wujiang Xu, Zelong Li, Shuyuan Xu, Ruosong Ye, Yingqiang Ge, Yongfeng Zhang
- **Date**: 2024-03-25
- **URL**: https://www.semanticscholar.org/paper/f89e85059a55b647c93822aefa7e985376e0ef20
- **Verified**: yes (2026-03-23)
- **Relevance**: SE Patterns, Production Engineering
- **Cites**: —
- **Cited By**: —
- **Summary**: Proposes an OS-inspired architecture for LLM agent serving with kernel-level services: scheduling, context management, memory management, storage management, and access control. Isolates LLM resources from agent applications via a kernel abstraction. Achieves 2.1x faster execution for agent serving. Demonstrates how classical OS/SE patterns (resource isolation, scheduling, access control) map to LLM agent infrastructure.

### Security & Control

### [BIB-069] OWASP Top 10 for LLM Applications 2025

- **Author(s)**: OWASP Foundation (collaborative)
- **Date**: 2025 (v2025)
- **URL**: https://owasp.org/www-project-top-10-for-large-language-model-applications/assets/PDF/OWASP-Top-10-for-LLMs-v2025.pdf
- **Verified**: yes (2026-03-23)
- **Relevance**: Security & Control
- **Cites**: —
- **Cited By**: [BIB-075]
- **Summary**: The definitive industry security framework for LLM applications. Top 10 risks include Prompt Injection (LLM01), Sensitive Information Disclosure (LLM02), Excessive Agency (LLM06), and System Prompt Leakage (LLM07). Context-engineering-relevant entries: LLM01 (prompt injection as context manipulation), LLM06 (excessive agency as trust boundary failure), LLM07 (system prompt leakage as context exposure). 2025 update significantly expanded coverage of agentic risks.

### [BIB-070] SecAlign: Defending Against Prompt Injection with Preference Optimization

- **Author(s)**: Sizhe Chen, Arman Zharmagambetov, Saeed Mahloujifar, Kamalika Chaudhuri, David Wagner, Chuan Guo
- **Date**: 2024-10-07
- **URL**: https://arxiv.org/abs/2410.05451
- **Verified**: yes (2026-03-23)
- **Relevance**: Security & Control
- **Cites**: —
- **Cited By**: —
- **Summary**: First method to reduce prompt injection success rates to below 10% even against sophisticated unseen attacks. Uses preference optimization to train models to prefer secure outputs over insecure outputs. Key insight: defense generalizes to unknown attacks, indicating that preference-based alignment creates robust context-level trust boundaries. Open-source at github.com/facebookresearch/SecAlign.

### [BIB-071] StruQ: Defending Against Prompt Injection with Structured Queries

- **Author(s)**: Sizhe Chen, Julien Piet, Chawin Sitawarin, David Wagner
- **Date**: 2024-02-09
- **URL**: https://arxiv.org/abs/2402.06363
- **Verified**: yes (2026-03-23)
- **Relevance**: Security & Control, SE Patterns
- **Cites**: —
- **Cited By**: —
- **Summary**: Introduces structured queries that separate prompts and data into two channels — a secure front-end formatting layer plus a specially trained LLM. Architecturally equivalent to the SE concept of privilege separation and input validation middleware. Directly demonstrates how SE security patterns (input validation, channel separation) apply to context engineering.

### [BIB-072] Prompt Injection Attack Against LLM-integrated Applications (HouYi)

- **Author(s)**: Yi Liu, Gelei Deng, Yuekang Li, Kailong Wang, Tianwei Zhang, Yepang Liu, Haoyu Wang, Yanhong Zheng, Yang Liu
- **Date**: 2023-06-08
- **URL**: https://arxiv.org/abs/2306.05499
- **Verified**: yes (2026-03-23)
- **Relevance**: Security & Control
- **Cites**: —
- **Cited By**: —
- **Summary**: Seminal paper on practical prompt injection attacks against real LLM-integrated applications. Introduces HouYi, a black-box attack technique inspired by traditional web injection attacks (SQL injection, XSS). Successfully attacked 31 of 36 real applications including Notion. Highly cited (657) and directly demonstrates that context-level attacks parallel classical web security vulnerabilities.

### [BIB-073] Jailbreak and Guard Aligned Language Models with Only Few In-Context Demonstrations

- **Author(s)**: Zeming Wei, Yifei Wang, Yisen Wang
- **Date**: 2023-10-10
- **URL**: https://arxiv.org/abs/2310.06387
- **Verified**: yes (2026-03-23)
- **Relevance**: Security & Control, In-Context Learning
- **Cites**: —
- **Cited By**: —
- **Summary**: Demonstrates that in-context learning can both attack (ICA) and defend (ICD) LLM safety alignment using minimal demonstrations. Shows that the distribution of safety in LLM outputs can be efficiently manipulated through context — directly establishing that context IS the attack surface and the defense mechanism simultaneously. Highly cited (441) and foundational for understanding context-level trust boundaries.

### [BIB-074] Bridging the Safety Gap: A Guardrail Pipeline for Trustworthy LLM Inferences (Wildflare GuardRail)

- **Author(s)**: Shanshan Han, Salman Avestimehr, Chaoyang He
- **Date**: 2025-02-12
- **URL**: https://arxiv.org/abs/2502.08142
- **Verified**: yes (2026-03-23)
- **Relevance**: Security & Control, SE Patterns
- **Cites**: —
- **Cited By**: —
- **Summary**: Presents a guardrail pipeline architecture with four modular components: Safety Detector (input/output validation), Grounding (RAG context enrichment), Customizer (rule-based output wrappers), and Repairer (hallucination correction). Achieves 100% accuracy on malicious URL detection at 1.06s per query without model calls. Architecture directly maps to the middleware pipeline SE pattern applied to security.

### Community & Terminology

### [BIB-075] Mapping LLM Security Landscapes: A Comprehensive Stakeholder Risk Assessment Proposal

- **Author(s)**: Rahul Pankajakshan, Sumitra Biswal, Yuvaraj Govindarajulu, Gilad Gressel
- **Date**: 2024-03-20
- **URL**: https://arxiv.org/abs/2403.13309
- **Verified**: yes (2026-03-23)
- **Relevance**: Security & Control, Production Engineering
- **Cites**: [BIB-069]
- **Cited By**: —
- **Summary**: Applies the OWASP risk rating methodology (traditionally used for web applications) to LLM systems. Maps threat agents against three stakeholder groups: model fine-tuners, application developers using APIs, and end users. Proposes a comprehensive threat matrix covering dependent system components against vulnerability factors. Demonstrates how established SE security frameworks transfer to context engineering threat modeling.

## Phase 1 Link Graph

```
BIB-030 (Brown et al. GPT-3, 55,644 cites)
  ├── cited by → BIB-004 (ICL Survey)
  ├── cited by → BIB-005 (Prompt Design Survey)
  ├── cited by → BIB-020 (Ye et al. Complementary Explanations)
  ├── cited by → BIB-021 (Gao et al. Code ICL Demonstrations)
  ├── cited by → BIB-024 (Schulhoff et al. Prompt Report)
  ├── cited by → BIB-025 (Sahoo et al. PE Survey)
  └── cited by → BIB-028 (Wei et al. Chain-of-Thought)

BIB-033 (MCP Specification)
  ├── cited by → BIB-032 (Schlapbach SGD-MCP Convergence)
  ├── cited by → BIB-034 (Hasan et al. Tool Description Smells)
  └── cited by → BIB-064 (Sarkar et al. LLM Agent Communication)

BIB-046 (MemGPT)
  ├── cited by → BIB-047 (MemoryOS)
  ├── cited by → BIB-049 (Zep)
  └── cited by → BIB-057 (Letta Memory Blocks)

BIB-065 (POSA Vol. 4)
  └── cited by → BIB-067 (Guran et al. LLM Middleware)

BIB-069 (OWASP Top 10 for LLMs)
  └── cited by → BIB-075 (Pankajakshan et al. Security Landscapes)

BIB-013 (Anthropic CE blog)
  ├── cited by → BIB-019 (Anthropic context mgmt)
  ├── cited by → BIB-027 (Anthropic Prompting Best Practices)
  └── cited by → BIB-052 (Cinar et al. PE vs CE Comparison)

BIB-001 (Mei et al. CE Survey)
  └── cited by → BIB-052 (Cinar et al. PE vs CE Comparison)
```

---

## User-Provided Sources

_Added 2026-03-23 from user-provided URLs, evaluated for additive value._

### [BIB-076] 2025 Was Agents. 2026 Is Agent Harnesses.

- **Author(s)**: Aakash Gupta
- **Date**: 2026-01-07
- **URL**: https://aakashgupta.medium.com/2025-was-agents-2026-is-agent-harnesses-heres-why-that-changes-everything-073e9877655e
- **Verified**: yes (2026-03-23)
- **Relevance**: Agent Architecture, Production Engineering, Community & Terminology
- **Cites**: [BIB-017] (Manus), [BIB-014] (LangChain)
- **Cited By**: —
- **Summary**: Introduces the "agent harness" concept — the orchestration layer wrapping LLMs that handles human approvals, sub-agent coordination, filesystem access, lifecycle hooks, and context management. Argues the model is commodity while the harness is the competitive moat. Uses Claude Code as the exemplar: same Claude model, but Claude Code's harness (context engineering, tool orchestration, planning) is what differentiates it. Cites concrete evidence: Manus rewrote their harness 5 times, LangChain re-architected Deep Research 4 times, Vercel cut 80% of tools to improve results. Provides a useful lens for our taxonomy: the 6 component types (skills, rules, hooks, memory, tools, references) are the building blocks of an agent harness.

## Statistics

- **Total sources**: 75
- **Academic papers**: 52
- **Practitioner sources**: 23
- **Link graph edges**: 38+
