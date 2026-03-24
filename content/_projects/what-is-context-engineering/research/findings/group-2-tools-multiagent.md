# Group 2: Tool Use, MCP, Multi-Agent, and SE Patterns

> Generated: 2026-03-23
> Search queries executed: 12 (4 arXiv, 3 Semantic Scholar, 4 WebSearch, 1 WebFetch)
> Plans covered: phase-1-tool-use-mcp, phase-1-multi-agent, phase-1-tool-use--multi-agent, phase-1-tool-use--se-patterns

---

## Tool Use & MCP

### [G2-001] LLMCompiler: An LLM Compiler for Parallel Function Calling

- **Author(s)**: Sehoon Kim, Suhong Moon, Ryan Tabrizi, Nicholas Lee, Michael W. Mahoney, Kurt Keutzer, Amir Gholami
- **Date**: 2023-12-07
- **URL**: https://arxiv.org/abs/2312.04511
- **Verified**: yes (2026-03-23)
- **Citations**: high (seminal work on parallel tool orchestration)
- **Topics**: Tool Use & MCP
- **Plans**: phase-1-tool-use-mcp
- **Summary**: Introduces LLMCompiler, a compiler-inspired framework for parallel function calling with three components: a Function Calling Planner, Task Fetching Unit, and Executor. Achieves up to 3.7x latency speedup and 6.7x cost savings vs. ReAct. Directly relevant to tool orchestration architecture and the design pattern of separating planning from execution in function calling.

### [G2-002] The Convergence of Schema-Guided Dialogue Systems and the Model Context Protocol

- **Author(s)**: Andreas Schlapbach
- **Date**: 2026-02-21
- **URL**: https://arxiv.org/abs/2602.18764
- **Verified**: yes (2026-03-23)
- **Citations**: N/A (recent)
- **Topics**: Tool Use & MCP, SE Patterns
- **Plans**: phase-1-tool-use-mcp, phase-1-tool-use--se-patterns
- **Summary**: Establishes that Schema-Guided Dialogue (SGD) and MCP are two manifestations of a unified paradigm for deterministic, auditable LLM-agent interaction. Extracts five foundational schema design principles: Semantic Completeness over Syntactic Precision, Explicit Action Boundaries, Failure Mode Documentation, Progressive Disclosure Compatibility, and Inter-Tool Relationship Declaration. Critical bridge paper connecting SE schema design patterns to LLM tool integration.

### [G2-003] MCP Specification (2025-11-25) -- Model Context Protocol

- **Author(s)**: Anthropic (specification maintainers)
- **Date**: 2025-11-25
- **URL**: https://modelcontextprotocol.io/specification/2025-11-25
- **Verified**: yes (2026-03-23)
- **Citations**: N/A (protocol specification)
- **Topics**: Tool Use & MCP
- **Plans**: phase-1-tool-use-mcp
- **Summary**: The authoritative MCP specification defining the open protocol for LLM-tool integration. Uses JSON-RPC 2.0 over stateful connections with capability negotiation. Defines three server primitives (Resources, Prompts, Tools) and three client features (Sampling, Roots, Elicitation). The Nov 2025 release adds asynchronous Tasks, server-side agent loops, OAuth authorization, and an Extensions mechanism. Inspired by Language Server Protocol (LSP). Donated to Linux Foundation Dec 2025.

### [G2-004] MCP Tool Description Smells: Towards Improving AI Agent Efficiency with Augmented MCP Tool Descriptions

- **Author(s)**: Mohammed Mehedi Hasan, Hao Li, Gopi Krishnan Rajbahadur, Bram Adams, Ahmed E. Hassan
- **Date**: 2026-02-16
- **URL**: https://arxiv.org/abs/2602.14878
- **Verified**: yes (2026-03-23)
- **Citations**: N/A (recent)
- **Topics**: Tool Use & MCP, SE Patterns
- **Plans**: phase-1-tool-use-mcp, phase-1-tool-use--se-patterns
- **Summary**: Empirically examines 856 tools across 103 MCP servers, finding 97.1% of tool descriptions contain at least one "smell" (defect), with 56% failing to state purpose clearly. Identifies six components of tool descriptions and formalizes tool description smells via a scoring rubric. Augmenting descriptions improves task success by 5.85 pp but increases execution steps by 67.46%. Directly applies SE code-smell methodology to LLM tool schema quality.

### [G2-005] MCP-Zero: Active Tool Discovery for Autonomous LLM Agents

- **Author(s)**: Xiang Fei, Xiawu Zheng, Hao Feng
- **Date**: 2025-06-01
- **URL**: https://arxiv.org/abs/2506.01056
- **Verified**: yes (2026-03-23)
- **Citations**: 20
- **Topics**: Tool Use & MCP
- **Plans**: phase-1-tool-use-mcp
- **Summary**: Proposes active tool discovery as a fundamental design pattern for scalable autonomous agents, replacing passive tool injection with on-demand capability acquisition. Three core mechanisms: Active Tool Request, Hierarchical Semantic Routing, and Iterative Capability Extension. Achieves 98% reduction in token consumption on APIBank. Constructs MCP-tools dataset of 308 MCP servers and 2,797 tools. Establishes the pattern of agents as active tool discoverers rather than passive selectors.

---

## Multi-Agent Context Management

### [G2-006] SagaLLM: Context Management, Validation, and Transaction Guarantees for Multi-Agent LLM Planning

- **Author(s)**: Edward Y. Chang, Longling Geng
- **Date**: 2025-03-15
- **URL**: https://arxiv.org/abs/2503.11951
- **Verified**: yes (2026-03-23)
- **Citations**: 24
- **Topics**: Multi-Agent, Tool Use & MCP
- **Plans**: phase-1-multi-agent, phase-1-tool-use--multi-agent
- **Summary**: Introduces SagaLLM, addressing four foundational limitations: unreliable self-validation, context loss, lack of transactional safeguards, and insufficient inter-agent coordination. Integrates the Saga transactional pattern (from distributed systems) with persistent memory, automated compensation, and independent validation agents. Uses modular checkpointing and compensable execution for workflow-wide consistency. Directly applies distributed systems patterns (Saga, compensating transactions) to multi-agent LLM coordination.

### [G2-007] Understanding Multi-Agent LLM Frameworks: A Unified Benchmark and Experimental Analysis (MAFBench)

- **Author(s)**: Abdelghny Orogat, Ana Rostam, Essam Mansour
- **Date**: 2026-02-03
- **URL**: https://arxiv.org/abs/2602.03128
- **Verified**: yes (2026-03-23)
- **Citations**: N/A (recent)
- **Topics**: Multi-Agent
- **Plans**: phase-1-multi-agent
- **Summary**: Introduces an architectural taxonomy for systematically comparing multi-agent LLM frameworks and MAFBench, a unified evaluation suite. Key finding: framework-level design choices alone can increase latency by over 100x, reduce planning accuracy by up to 30%, and lower coordination success from above 90% to below 30%. Provides concrete architectural design principles and framework selection guidance for production multi-agent systems.

### [G2-008] Scaling Long-Horizon LLM Agent via Context-Folding

- **Author(s)**: Weiwei Sun, Miao Lu, Zhan Ling, Kang Liu, Xuesong Yao, Yiming Yang, Jiecao Chen
- **Date**: 2025-10-15
- **URL**: https://arxiv.org/abs/2510.11967
- **Verified**: yes (2026-03-23)
- **Citations**: 35
- **Topics**: Multi-Agent, Tool Use & MCP
- **Plans**: phase-1-multi-agent, phase-1-tool-use--multi-agent
- **Summary**: Introduces Context-Folding, enabling agents to actively manage working context by branching into sub-trajectories and folding them upon completion, retaining concise outcome summaries while discarding intermediate steps. Uses RL framework FoldGRPO with process rewards for effective task decomposition and context management. Matches or outperforms ReAct baselines while using 10x smaller active context. Fundamental contribution to context engineering for long-horizon agent tasks.

### [G2-009] LLM Multi-Agent Systems: Challenges and Open Problems

- **Author(s)**: Shanshan Han, Qifan Zhang, Yuhang Yao, Weizhao Jin, Zhaozhuo Xu, Chaoyang He
- **Date**: 2024-02-05
- **URL**: https://arxiv.org/abs/2402.03578
- **Verified**: yes (2026-03-23)
- **Citations**: 125
- **Topics**: Multi-Agent
- **Plans**: phase-1-multi-agent
- **Summary**: Comprehensive exploration of multi-agent system challenges including optimizing task allocation, fostering robust reasoning through iterative debates, managing complex and layered context information, and enhancing memory management. Identifies context management as a key open problem: how to maintain coherent shared state across agents with different roles while preventing context pollution. Highly cited foundational survey for multi-agent LLM systems.

### [G2-010] Towards Effective GenAI Multi-Agent Collaboration: Design and Evaluation for Enterprise Applications

- **Author(s)**: Raphael Shu, Nilaksh Das, Michelle Yuan, Monica Sunkara, Yi Zhang
- **Date**: 2024-12-06
- **URL**: https://arxiv.org/abs/2412.05449
- **Verified**: yes (2026-03-23)
- **Citations**: N/A (enterprise-focused)
- **Topics**: Multi-Agent, Tool Use & MCP
- **Plans**: phase-1-multi-agent, phase-1-tool-use--multi-agent
- **Summary**: Evaluates two key operational modes: coordination mode (parallel communication and payload referencing) and routing mode (efficient message forwarding). Multi-agent collaboration enhances goal success rates by up to 70% vs single-agent approaches. Payload referencing improves code-intensive task performance by 23%. Routing mechanism reduces latency by selectively bypassing agent orchestration. Practical enterprise-grade guidance for multi-agent handoff and coordination patterns.

---

## Cross-Term: Tool Use x Multi-Agent

### [G2-011] Small LLMs Are Weak Tool Learners: A Multi-LLM Agent

- **Author(s)**: Weizhou Shen, Chenliang Li, Hongzhan Chen, Ming Yan, Xiaojun Quan, Hehong Chen, Ji Zhang, Fei Huang
- **Date**: 2024-01-14
- **URL**: https://arxiv.org/abs/2401.07324
- **Verified**: yes (2026-03-23)
- **Citations**: N/A
- **Topics**: Tool Use & MCP, Multi-Agent
- **Plans**: phase-1-tool-use--multi-agent
- **Summary**: Decomposes tool-use capabilities into three specialized agents: planner, caller, and summarizer, each implemented by a single LLM. Proposes a two-stage training paradigm: first fine-tune on entire dataset, then specialize each agent on its sub-task. Multi-LLM framework surpasses traditional single-LLM approach on tool-use benchmarks. Directly demonstrates the intersection of tool orchestration and multi-agent decomposition.

### [G2-012] Context Engineering for Multi-Agent LLM Code Assistants

- **Author(s)**: Muhammad Haseeb
- **Date**: 2025-08-09
- **URL**: https://arxiv.org/abs/2508.08322
- **Verified**: yes (2026-03-23)
- **Citations**: 3
- **Topics**: Multi-Agent, Tool Use & MCP, SE Patterns
- **Plans**: phase-1-tool-use--multi-agent, phase-1-tool-use--se-patterns
- **Summary**: Proposes a context engineering workflow combining Intent Translator (GPT-5), Elicit-powered semantic retrieval for domain knowledge injection, NotebookLM document synthesis, and Claude Code multi-agent system. Demonstrates that targeted context injection and agent role decomposition lead to state-of-the-art code generation performance. Explicitly frames context engineering as the orchestration challenge for multi-agent tool use in software engineering.

---

## Cross-Term: Tool Use x SE Patterns

### [G2-013] ToolRegistry: A Protocol-Agnostic Tool Management Library for Function-Calling LLMs

- **Author(s)**: Peng Ding
- **Date**: 2025-07-14
- **URL**: https://arxiv.org/abs/2507.10593
- **Verified**: yes (2026-03-23)
- **Citations**: 4
- **Topics**: Tool Use & MCP, SE Patterns
- **Plans**: phase-1-tool-use--se-patterns
- **Summary**: Presents a protocol-agnostic tool management system applying classic SE patterns (adapter pattern for protocol abstraction, composition over inheritance, registry pattern) to LLM tool integration. Modular three-package ecosystem: core registry, server package with protocol adapters (MCP, OpenAPI), and a curated tool hub. Achieves 60-80% reduction in tool integration code and up to 3.1x performance improvements. Directly applies dependency injection and plugin architecture patterns to LLM function calling.

### [G2-014] OpenAI Agents SDK: Handoffs Pattern (Practitioner Source)

- **Author(s)**: OpenAI
- **Date**: 2025-03 (initial release)
- **URL**: https://openai.github.io/openai-agents-python/handoffs/
- **Verified**: yes (2026-03-23)
- **Citations**: N/A (practitioner documentation)
- **Topics**: Multi-Agent, Tool Use & MCP
- **Plans**: phase-1-multi-agent, phase-1-tool-use--multi-agent
- **Summary**: OpenAI's production-ready Agents SDK implements agent handoffs as first-class tool definitions -- each agent declares its handoff targets, and the framework enforces that handoffs follow declared paths. Handoffs are represented as tools (e.g., "transfer_to_refund_agent"), making the connection between tool-use architecture and multi-agent coordination explicit. Context transfer requires conversation history validity, with LLMs expecting tool calls paired with responses. Establishes handoff-as-tool as a key architectural pattern.

---

## Summary Statistics

| Plan | Entries | IDs |
|------|---------|-----|
| phase-1-tool-use-mcp | 7 | G2-001, G2-002, G2-003, G2-004, G2-005, G2-006, G2-008 |
| phase-1-multi-agent | 7 | G2-006, G2-007, G2-008, G2-009, G2-010, G2-012, G2-014 |
| phase-1-tool-use--multi-agent | 6 | G2-006, G2-008, G2-010, G2-011, G2-012, G2-014 |
| phase-1-tool-use--se-patterns | 4 | G2-002, G2-004, G2-012, G2-013 |

**Total unique entries**: 14
**All four plans meet the 4+ source minimum**: yes
