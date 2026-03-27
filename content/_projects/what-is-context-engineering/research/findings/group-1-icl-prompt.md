# Group 1 Findings: In-Context Learning & Prompt Engineering

**Executed**: 2026-03-23
**Plans covered**: phase-1-in-context-learning.md, phase-1-prompt-engineering.md, phase-1-icl--prompt-eng.md
**Search queries executed**: 11 (6 academic, 4 practitioner, 1 verification)
**Entries selected**: 11

---

## In-Context Learning Sources

### [G1-001] A Survey on In-context Learning

- **Author(s)**: Qingxiu Dong, Lei Li, Damai Dai, Ce Zheng, Zhiyong Wu, Baobao Chang, Xu Sun, Jingjing Xu, Lei Li, Zhifang Sui
- **Date**: 2022-12-31 (published EMNLP 2024)
- **URL**: https://arxiv.org/abs/2301.00234
- **Verified**: yes (2026-03-23)
- **Citations**: 951
- **Topics**: In-Context Learning
- **Cites**: —
- **Plan(s)**: phase-1-in-context-learning.md, phase-1-icl--prompt-eng.md
- **Note**: Already in bibliography as BIB-004. Listed here for completeness and cross-referencing. Foundational ICL survey providing formal definition, training strategies, prompt designing strategies, and application scenarios. Establishes the theoretical basis for why context structure matters.

### [G1-002] Complementary Explanations for Effective In-Context Learning

- **Author(s)**: Xi Ye, Srinivasan Iyer, Asli Celikyilmaz, Ves Stoyanov, Greg Durrett, Ramakanth Pasunuru
- **Date**: 2022-11-25
- **URL**: https://arxiv.org/abs/2211.13892
- **Verified**: yes (2026-03-23)
- **Citations**: est. 100+ (ACL 2023 venue paper)
- **Topics**: In-Context Learning, Prompt Engineering, Demonstration Selection
- **Cites**: —
- **Plan(s)**: phase-1-in-context-learning.md, phase-1-icl--prompt-eng.md
- **Summary**: Studies the mechanisms by which explanations work in ICL prompts. Identifies two contributing factors: the computation trace (how the solution is decomposed) and the natural language used. Shows LLMs benefit from complementary explanation sets -- diverse reasoning skills across exemplars improve performance. Proposes maximal marginal relevance-based exemplar selection. Directly bridges ICL theory to practical prompt design by showing *why* diverse examples matter.

### [G1-003] What Makes Good In-Context Demonstrations for Code Intelligence Tasks with LLMs?

- **Author(s)**: Shuzheng Gao, Xinjie Wen, Cuiyun Gao, Wenxuan Wang, Michael R. Lyu
- **Date**: 2023-04-15
- **URL**: https://arxiv.org/abs/2304.07575
- **Verified**: yes (2026-03-23)
- **Citations**: 133
- **Topics**: In-Context Learning, Demonstration Selection, Example Ordering
- **Cites**: —
- **Plan(s)**: phase-1-in-context-learning.md, phase-1-icl--prompt-eng.md
- **Summary**: Empirically explores the impact of three key factors on ICL performance: selection, order, and number of demonstration examples. Tested across code summarization, bug fixing, and program synthesis. Finds all three factors dramatically impact performance. Provides actionable takeaways: carefully designed demonstrations based on their findings improve BLEU-4, EM by 9.90%-175.96% over standard methods. Essential bridge from ICL theory to practical context design.

### [G1-004] Lakera -- "What is In-context Learning, and how does it work: The Beginner's Guide"

- **Author(s)**: Deval Shah (Lakera)
- **Date**: 2025-12-17
- **URL**: https://www.lakera.ai/blog/what-is-in-context-learning
- **Verified**: yes (2026-03-23)
- **Citations**: N/A (practitioner)
- **Topics**: In-Context Learning, Prompt Engineering
- **Cites**: —
- **Plan(s)**: phase-1-in-context-learning.md (practitioner)
- **Summary**: Comprehensive practitioner guide that translates ICL theory into accessible concepts. Covers zero-shot, one-shot, and few-shot learning approaches; explains the Bayesian inference framework for ICL from Stanford AI Lab; discusses ICL variants (regular, flipped-label, semantically-unrelated label); and connects chain-of-thought prompting as an ICL technique. Key bridge between academic ICL research and practical application. Emphasizes that ICL operates without parameter updates, making it ideal for deployment as a service.

### [G1-005] The Impact of Role Design in In-Context Learning for Large Language Models

- **Author(s)**: Hamidreza Rouzegar, Masoud Makrehchi
- **Date**: 2025-09-27
- **URL**: https://arxiv.org/abs/2509.23501
- **Verified**: yes (2026-03-23)
- **Citations**: est. <20 (recent)
- **Topics**: In-Context Learning, Prompt Engineering, Role Prompting
- **Cites**: —
- **Plan(s)**: phase-1-icl--prompt-eng.md
- **Summary**: Examines the underexplored impact of role configurations in zero-shot and few-shot ICL scenarios using GPT-3.5, GPT-4o, Llama2-7b, and Llama2-13b. Evaluates across sentiment analysis, text classification, question answering, and math reasoning. Findings suggest role-based prompt structuring enhances LLM performance. Directly connects prompt engineering practice (role design) with ICL theory.

---

## Prompt Engineering Sources

### [G1-006] The Prompt Report: A Systematic Survey of Prompt Engineering Techniques

- **Author(s)**: Sander Schulhoff, Michael Ilie, Nishant Balepur, et al. (31 authors, including affiliations with OpenAI, Microsoft, Google, Princeton, Stanford)
- **Date**: 2024-06-06 (updated 2025-02)
- **URL**: https://arxiv.org/abs/2406.06608
- **Verified**: yes (2026-03-23)
- **Citations**: 122
- **Topics**: Prompt Engineering, Taxonomy
- **Cites**: —
- **Plan(s)**: phase-1-prompt-engineering.md
- **Summary**: The most comprehensive prompt engineering survey to date. Establishes a vocabulary of 33 terms, a taxonomy of 58 LLM prompting techniques organized into 6 categories (Few-Shot, Thought Generation, Zero-Shot, Ensembling, Self-Criticism, and more), and 40 techniques for other modalities. Provides best practices for prompting SOTA LLMs. Meta-analysis of the entire literature on natural language prefix-prompting. Co-authored with researchers from leading institutions. Essential reference for the PE taxonomy.

### [G1-007] A Systematic Survey of Prompt Engineering in Large Language Models: Techniques and Applications

- **Author(s)**: Pranab Sahoo, Ayush Kumar Singh, Sriparna Saha, Vinija Jain, Samrat Mondal, Aman Chadha
- **Date**: 2024-02-05
- **URL**: https://arxiv.org/abs/2402.07927
- **Verified**: yes (2026-03-23)
- **Citations**: 767
- **Topics**: Prompt Engineering, Taxonomy
- **Cites**: —
- **Plan(s)**: phase-1-prompt-engineering.md
- **Summary**: Structured overview of prompt engineering advancements categorized by application area. For each prompting approach, provides methodology summary, applications, models involved, and datasets. Includes taxonomy diagram and table summarizing datasets, models, and critical points. Addresses the gap in systematic organization of PE methods. With 767 citations, this is the most highly-cited PE survey, indicating broad community adoption.

### [G1-008] Towards Goal-oriented Prompt Engineering for Large Language Models: A Survey

- **Author(s)**: Haochen Li, Jonathan Leung, Zhiqi Shen
- **Date**: 2024-01-25
- **URL**: https://arxiv.org/abs/2401.14043
- **Verified**: yes (2026-03-23)
- **Citations**: est. 50+ (2024 survey)
- **Topics**: Prompt Engineering, Taxonomy
- **Cites**: —
- **Plan(s)**: phase-1-prompt-engineering.md
- **Summary**: Reviews 50 representative studies and introduces a novel taxonomy that categorizes goal-oriented prompting methods into five interconnected stages. Highlights the limitation of designing prompts based on anthropomorphic assumptions (expecting LLMs to think like humans). Demonstrates that goal-oriented prompt formulation, which guides LLMs to follow established human logical thinking, significantly improves performance. Provides four future directions. Offers a complementary taxonomic lens to The Prompt Report.

### [G1-009] Anthropic -- "Prompting Best Practices" (Claude Documentation)

- **Author(s)**: Anthropic
- **Date**: 2025 (continuously updated; latest for Claude 4.6)
- **URL**: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
- **Verified**: yes (2026-03-23)
- **Citations**: N/A (practitioner)
- **Topics**: Prompt Engineering, System Prompt Design
- **Cites**: —
- **Plan(s)**: phase-1-prompt-engineering.md (practitioner)
- **Summary**: Official Anthropic guide covering prompt engineering for Claude models. Organizes techniques into: General principles (clarity, context, examples, XML structuring, role prompting, long context handling), Output and formatting (verbosity control, format steering, LaTeX), Tool use (explicit instruction, parallel calling), and Thinking and reasoning (extended/adaptive thinking). Provides concrete code examples and anti-patterns. Key practitioner resource showing the PE taxonomy from a platform provider perspective. Demonstrates the evolution from simple prompting to complex context engineering (prompt chaining, sub-agent architectures, compaction).

---

## Chain-of-Thought (Cross-term: ICL + Prompt Eng)

### [G1-010] Chain-of-Thought Prompting Elicits Reasoning in Large Language Models

- **Author(s)**: Jason Wei, Xuezhi Wang, Dale Schuurmans, Maarten Bosma, Brian Ichter, Fei Xia, Ed Chi, Quoc Le, Denny Zhou
- **Date**: 2022-01-28
- **URL**: https://arxiv.org/abs/2201.11903
- **Verified**: yes (2026-03-23)
- **Citations**: 16,531
- **Topics**: In-Context Learning, Prompt Engineering, Chain-of-Thought
- **Cites**: —
- **Plan(s)**: phase-1-icl--prompt-eng.md
- **Summary**: Foundational paper demonstrating that providing a chain of thought -- intermediate reasoning steps -- as few-shot exemplars dramatically improves LLM reasoning on arithmetic, commonsense, and symbolic tasks. Shows reasoning abilities emerge naturally in sufficiently large models via this simple prompting method. With 16,500+ citations, this is the most influential paper at the intersection of ICL and prompt engineering. Established CoT as a core prompt engineering technique grounded in ICL theory.

### [G1-011] A Survey of Automatic Prompt Engineering: An Optimization Perspective

- **Author(s)**: Wenwu Li, Xiangfeng Wang, Wenhao Li, Bo Jin
- **Date**: 2025-02-17
- **URL**: https://arxiv.org/abs/2502.11560
- **Verified**: yes (2026-03-23)
- **Citations**: 42
- **Topics**: Prompt Engineering, Automatic Prompt Optimization
- **Cites**: —
- **Plan(s)**: phase-1-prompt-engineering.md
- **Summary**: First comprehensive survey on automated prompt engineering through a unified optimization-theoretic lens. Formalizes prompt optimization as a maximization problem over discrete, continuous, and hybrid prompt spaces. Organizes methods by optimization variables (instructions, soft prompts, exemplars), task-specific objectives, and computational frameworks. Covers FM-based optimization, evolutionary methods, gradient-based optimization, and reinforcement learning. Bridges theoretical formulation with practical implementations across text, vision, and multimodal domains. Highlights underexplored frontiers in agent-oriented prompt design.

---

## Brown et al. GPT-3 (Verification Only -- Already in Bibliography Scope)

**Paper**: "Language Models are Few-Shot Learners"
- **Author(s)**: Tom B. Brown, Benjamin Mann, Nick Ryder, et al. (31 authors)
- **Date**: 2020-05-28
- **Semantic Scholar ID**: 90abbc2cf38462b954ae1b772fac9532e2ccd8b0
- **arXiv ID**: 2005.14165
- **CorpusId**: 218971783
- **Citations**: 55,644 (as of 2026-03-23)
- **Note**: Not added to bibliography as a new entry. This paper introduced ICL (few-shot learning) as a paradigm with GPT-3. It is the foundational ancestor of BIB-004 (ICL Survey) and the entire ICL research line. Confirmed citation count for link graph purposes. If added to bibliography, it would connect as: cites nothing in our bibliography; cited by BIB-004, BIB-005, G1-002, G1-003, G1-006, G1-007, G1-010.

---

## Plan Coverage Summary

| Plan | Required | Found | Entries |
|------|----------|-------|---------|
| phase-1-in-context-learning.md | 3+ (2 practitioner) | 4 (1 practitioner) | G1-001, G1-002, G1-003, G1-004 |
| phase-1-prompt-engineering.md | 3+ primary | 5 (1 practitioner) | G1-006, G1-007, G1-008, G1-009, G1-011 |
| phase-1-icl--prompt-eng.md | cross-term | 4 | G1-002, G1-003, G1-005, G1-010 |

### Notes on Gaps

- **ICL practitioner sources**: Only 1 strong practitioner source found (G1-004, Lakera). The ICL-to-practice bridge remains thin in practitioner literature. Most practical ICL content is embedded within broader prompt engineering guides rather than standalone ICL guides. The Anthropic docs (G1-009) do cover ICL concepts (examples, few-shot) but frame them as prompt engineering techniques rather than ICL specifically.
- **G1-001 is a duplicate of BIB-004**: Included for cross-referencing only. Do not add to bibliography again.
- **Brown et al.**: Verified with 55,644 citations. Not added as new entry per instructions, but link graph edges confirmed.

### Selection Criteria Applied

- Prioritized sources with PRIMARY focus on ICL mechanisms or PE taxonomies
- For ICL: preferred sources bridging theory to practical context design (G1-002, G1-003, G1-004)
- For PE: preferred comprehensive surveys/taxonomy papers (G1-006, G1-007, G1-008) over application-specific papers
- Skipped papers that only tangentially mention topics (filtered out: Mamba survey, Federated Analytics, seismic processing, crypto sentiment, log parsing, and other domain-specific applications of ICL/PE)
- All arXiv URLs verified accessible
- Anthropic docs URL verified via crawl
