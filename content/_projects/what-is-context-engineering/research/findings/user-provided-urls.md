# User-Provided URL Evaluation

Evaluated: 2026-03-23
Evaluator: Claude (automated)
Context: Bibliography has 74 entries (BIB-001 to BIB-075) across 12 topics.

---

### [URL-1] Context Engineering: The Future of AI Systems (MadAppGang)

- **URL**: https://madappgang.com/blog/context-engineering-the-future-of-ai-systems/
- **Author**: Jack Rudenko, CTO of MadAppGang
- **Date**: ~2025 (no exact date published)
- **Fetched**: yes
- **Topics**: CE Definition, Production Engineering, Community & Terminology
- **Quality**: secondary synthesis / derivative
- **Recommendation**: SKIP
- **Reason**: This is a synthesis blog post that repackages concepts from sources we already have (Philipp Schmid [BIB-015], LangChain [BIB-014], Simon Willison [BIB-012]). Its seven-component framework mirrors Schmid's nearly identically. The five-level maturity model is original but not substantiated with data or citations. No academic or primary sources cited; it is a marketing-adjacent thought piece from a software agency.
- **Overlaps with**: BIB-015 (Schmid's 7 components), BIB-014 (LangChain framework), BIB-012 (Willison commentary)

---

### [URL-2] Context Engineering Strategies for Production AI Agents (ZenML LLMOps Database)

- **URL**: https://www.zenml.io/llmops-database/context-engineering-strategies-for-production-ai-agents
- **Author**: ZenML (curated summary of Manus blog)
- **Date**: 2025
- **Fetched**: yes
- **Topics**: Production Engineering, Agent Architecture
- **Quality**: derivative (curated summary of another source)
- **Recommendation**: SKIP
- **Reason**: This is ZenML's LLMOps Database entry that summarizes and repackages the original Manus blog post by Yichao 'Peak' Ji, which we already have as BIB-017. The page explicitly links to the original source at manus.im. While ZenML adds a "Critical Assessment" section, the technical content is entirely derived from BIB-017 with no new data, frameworks, or insights. It is a curated database entry, not original work.
- **Overlaps with**: BIB-017 (Manus original blog — direct derivative)

---

### [URL-3] Context Engineering for AI Agents: Key Lessons from Manus (dev.to)

- **URL**: https://dev.to/contextspace_/context-engineering-for-ai-agents-key-lessons-from-manus-3f83
- **Author**: ContextSpace (dev.to account)
- **Date**: 2025-07-26
- **Fetched**: yes
- **Topics**: Production Engineering, Agent Architecture
- **Quality**: derivative (summary/restatement)
- **Recommendation**: SKIP
- **Reason**: Confirmed derivative. This is a structured summary of the original Manus blog post (BIB-017) by Yichao 'Peak' Ji, explicitly crediting and linking to the original. No new insights, analysis, or independent contributions are present. The same key lessons (KV-cache optimization, tool masking, file system as memory, task recitation, error preservation) are restated without original commentary.
- **Overlaps with**: BIB-017 (Manus original blog — direct restatement)

---

### [URL-4] 2025 Was Agents. 2026 Is Agent Harnesses. (Medium — Aakash Gupta)

- **URL**: https://aakashgupta.medium.com/2025-was-agents-2026-is-agent-harnesses-heres-why-that-changes-everything-073e9877655e
- **Author**: Aakash Gupta
- **Date**: 2026-01-07
- **Fetched**: yes
- **Topics**: Agent Architecture, Production Engineering, Community & Terminology
- **Quality**: secondary synthesis with an original conceptual contribution
- **Recommendation**: INCLUDE
- **Reason**: Introduces the "agent harness" concept — a distinct framing that separates the model (engine) from the orchestration layer (harness) as the primary competitive moat. This framing is not present in our existing sources and provides a useful conceptual lens for the bibliography's agent architecture and production engineering coverage. Cites concrete examples: Manus (5 harness rewrites), LangChain (4 Deep Research re-architectures), Vercel (80% tool reduction improving results), and Claude Code as the exemplar of harness > model. While it synthesizes from known sources, the "harness" abstraction is a genuinely additive conceptual contribution.
- **Summary**: Argues that 2026's competitive advantage lies in "agent harnesses" — the orchestration layer wrapping LLMs that handles human approvals, sub-agent coordination, filesystem access, lifecycle hooks, and context management. The model is commodity; the harness is moat. Uses Claude Code as the primary example: same Claude model, but Claude Code's harness (context engineering, tool orchestration, planning) is what differentiates it. Proposes a concrete taxonomy of harness components.
- **Overlaps with**: BIB-017 (Manus — cited as example), BIB-014 (LangChain — cited as example), BIB-013 (Anthropic CE — related framing)

---

### [URL-5] How to Build AI Agents From Scratch (Medium — Aakash Gupta)

- **URL**: https://aakashgupta.medium.com/how-to-build-ai-agents-from-scratch-even-if-youve-never-coded-one-before-eb0bf45d7648
- **Author**: Aakash Gupta
- **Date**: 2025-10-26
- **Fetched**: yes
- **Topics**: Agent Architecture
- **Quality**: derivative / tutorial
- **Recommendation**: SKIP
- **Reason**: This is a beginner-oriented tutorial on building AI agents using the ReAct framework. It covers standard concepts (ReAct loop, tool calling, scoping) that are well-covered by existing sources including BIB-016 (Lilian Weng's foundational agent taxonomy) and BIB-013 (Anthropic's CE guide). No original frameworks, data, or unique perspectives are introduced. The 8-step guide is pedagogical, not analytical.
- **Overlaps with**: BIB-016 (Weng — agent architecture formula), BIB-013 (Anthropic — agent CE framework)

---

### [URL-6] The Man Who Built Claude Code Just Said PMs Are the Future of Software (Medium — Aakash Gupta)

- **URL**: https://aakashgupta.medium.com/the-man-who-built-claude-code-just-said-pms-are-the-future-of-software-8c6083a77c38
- **Author**: Aakash Gupta
- **Date**: 2026-02-21
- **Fetched**: partial (member-only paywall after ~500 words)
- **Topics**: Agent Architecture, Community & Terminology
- **Quality**: secondary synthesis (commentary on Boris Cherny's statements)
- **Recommendation**: SKIP
- **Reason**: Behind Medium's member paywall — only the introductory section was accessible. The visible portion discusses Boris Cherny (Claude Code lead) running 10-15 Claude sessions simultaneously and framing AI as "compute you schedule." While the subject matter is relevant (Claude Code architecture philosophy), this is Gupta's commentary on someone else's public statements (YC podcast), not a primary source. The original podcast/interview would be a better primary source if needed.
- **Overlaps with**: BIB-013 (Anthropic CE blog), BIB-019 (Anthropic context management)

---

### [URL-7] Awesome Agent Learning (GitHub — artnitolog)

- **URL**: https://github.com/artnitolog/awesome-agent-learning
- **Author**: Ruslan Vasilev (@artnitolog)
- **Date**: actively maintained, 27 commits
- **Fetched**: yes
- **Topics**: Agent Architecture (meta-resource)
- **Quality**: curated link collection
- **Recommendation**: SKIP
- **Reason**: This is an "awesome list" — a curated collection of 31 learning resources organized into 5 categories (Foundational Courses, Conceptual Guides, Framework Tutorials, Evaluation Benchmarks, Related Resources). While well-organized, it is a link aggregator, not a substantive source. Bibliographies track primary and secondary analytical sources, not meta-collections of links. Its resources likely overlap with sources we already have.
- **Overlaps with**: general overlap with multiple existing entries (agent architecture sources)

---

### [URL-8] 9 RAG Architectures Every AI Developer Must Know (Medium — Divy Yadav)

- **URL**: https://yadavdivy296.medium.com/rag-architectures-every-ai-developer-must-know-a-complete-guide-f3524ee68b9c
- **Author**: Divy Yadav (published in Towards AI)
- **Date**: 2025-12-19
- **Fetched**: partial (member-only paywall after introduction)
- **Topics**: RAG
- **Quality**: could not fully assess (paywalled)
- **Recommendation**: SKIP
- **Reason**: Behind Medium's member paywall — only the title, subtitle ("Architectures beyond Naive RAG to build reliable production AI Systems"), and introductory paragraph were accessible. The visible content presents standard RAG motivation (grounding, hallucination prevention) without novel framing. We already have comprehensive RAG coverage: BIB-009 (Agentic RAG survey, 231 citations), BIB-050 (Engineering the RAG Stack — systematic review), BIB-051 (chunking strategies), BIB-054 (RAG-to-context evolution), and BIB-055/056 (RAG vs CE framing). A listicle titled "9 RAG Architectures" is unlikely to exceed the depth of these existing sources.
- **Overlaps with**: BIB-009 (Agentic RAG survey), BIB-050 (RAG Stack review), BIB-054 (RAGFlow review)

---

## Summary

| # | Title | Recommendation | Topic | Reason |
|---|-------|---------------|-------|--------|
| 1 | Context Engineering: The Future of AI Systems (MadAppGang) | SKIP | CE Definition | Derivative synthesis of Schmid, LangChain, Willison; no original data |
| 2 | Context Engineering Strategies for Production AI Agents (ZenML) | SKIP | Production Engineering | Direct derivative of BIB-017 (Manus blog) |
| 3 | Context Engineering for AI Agents: Key Lessons from Manus (dev.to) | SKIP | Production Engineering | Direct restatement of BIB-017 (Manus blog) |
| 4 | 2025 Was Agents. 2026 Is Agent Harnesses. (Aakash Gupta) | **INCLUDE** | Agent Architecture, Production Engineering | Original "agent harness" concept; model-as-commodity / harness-as-moat framing |
| 5 | How to Build AI Agents From Scratch (Aakash Gupta) | SKIP | Agent Architecture | Beginner tutorial; standard ReAct concepts already covered |
| 6 | The Man Who Built Claude Code (Aakash Gupta) | SKIP | Agent Architecture | Paywalled; secondary commentary on Boris Cherny's public statements |
| 7 | Awesome Agent Learning (GitHub) | SKIP | Agent Architecture | Curated link list, not analytical source |
| 8 | 9 RAG Architectures (Divy Yadav) | SKIP | RAG | Paywalled; RAG already well-covered by 5+ existing sources |

**Result**: 1 of 8 URLs recommended for inclusion (URL-4).

If URL-4 is added, the suggested entry ID would be BIB-076 under the "Community & Terminology" or "Agent Architecture" topic heading.
