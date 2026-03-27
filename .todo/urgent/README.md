- **Target depth:** Go narrow and deep. One well-executed post on "Semantic Testing for AI Skills" signals more expertise than five shallow tutorials.
- **Target length**: 2500-4000 words for primary posts. This allows: 
	- Problem framing (why this matters)
	- Methodology (how you approached it)
	- Implementation details (what you built)
	- Results/evaluation (what you learned)
	- Limitations and future work (intellectual honesty)
- **Scope strategy**:
	- ❌ "Everything I Know About Context Engineering" (too broad) 
	- ✅ "Semantic Testing for AI Skills: Methodology and Early Results" (focused) 
	- ❌ "LLM Security Overview" (commodity content) 
	- ✅ "Indirect Prompt Injection via Email Summarization: A Case Study" (original research)
- **Series vs. standalone**: 
	- Create a 3-4 post series on Context Engineering (your flagship)
	- Standalone deep-dives for original research (email prompt injection, memory benchmarks)
	- Avoid one-off "I learned X" posts — they don't signal research capability
- Hypothesis-driven, methodology-focused, explicit about limitations


| File                                                                           | Length    | Type                         |
| ------------------------------------------------------------------------------ | --------- | ---------------------------- |
| indirect-prompt-injection-email-summarization.draft.md<br><br><br><br><br><br> | 2500-3000 | Original Security Research   |
| semantic-testing-ai-skills.draft.md                                            | 3000-3500 | Novel Evaluation Methodology |
| benchmarking-agent-memory.draft.md                                             | 3000-4000 | Empirical Benchmark Study    |
| what-is-context-engineering.draft.md                                           | 2500-3000 | Conceptual Framework         |
| llm-backdoors-taxonomy.draft.md                                                | 3000-4000 | Survey / Taxonomy            |
| graph-memory-implementation-patterns.draft.md                                  | 2500-3000 | Technical Implementation     |
| semantic-search-adrs.draft.md                                                  | 2000-2500 | Technical Implementation     |

## Post Ideas

- Context Engineering
	- ✅ What is Context Engineering? A Taxonomy of AI Context Components
		- Depth: Conceptual
		- Length: 2500-3000 words
		- Priority: High — defines the field, shows original thinking
	- ✅ Semantic Testing for AI Skills: Beyond Unit Tests
		- Depth: Methodological
		- Length: 3000-4000 words
		- Priority: High — novel evaluation methodology
	- Atomic Context Components: Skills, Rules, and
		- Depth: Technical
		- Length: 2000-2500 words
		- Priority: Medium
	- Plugin Builder: Patterns for Reusable AI Context
		- Depth: Architectural
		- Length: 2500-3000 words
		- Priority: Medium
	- ADRs for AI Tools: Documenting Context Decisions
		- Depth: Process 
		- Length: 1500-2000 words
		- Priority: Lower
	- Progressive disclosure vs context condensing
	- Mega-skill vs Plugin architecture
- AI Agent Memory Architecture
	- ✅ Benchmarking Agent Memory: Zep vs GraphRAG vs Vector RAG
		- Depth: Empirical
		- Length: 3500-4500 words
		- Priority: High — shows research methodology with data
	- Graph-Based Memory for AI Agents: Implementation Patterns
		- Depth: Technical
		- Length: 2500-3000 words
		- Priority: Medium
	- Cross-Conversation Context: The Problem and Approaches
		- Depth: Problem-framing
		- Length: 2000-2500 words
		- Priority: Medium
- LLM Security / Conference Talk
	- LLM Backdoors: A Security Practitioner's Taxonomy
		- Depth: Survey
		- Length: 3000-4000 words
		- Priority: High — establishes domain credibility
	- ✅ Indirect Prompt Injection via Email Summarization
		- Depth: Original Research
		- Length: 2500-3000 words
		- Priority: High — your original finding
	- Agent-Based LLM Exploitation: The RCE Risk
		- Depth: Threat Modeling
		- Length: 2000-2500 words
		- Priority: Medium
- Open Source Contributions
	- Migrating MCP Servers to Streamable HTTP
		- Depth: Technical
		- Length: 2000-2500 words
		- Priority: Lower
	- Semantic Search for Architecture Decision Records
		- Depth: Technical
		- Length: 2000-2500 words
		- Priority: Lower
- AI Agent Evaluation Framework
- Job Hunting Dev Work
	- History of ATS
	- ATS under the hood
	- Reversing ATS to get the signals
	- Resume Builders Landscape; not for the Senior Engineers
	- Getting to the Goal -- Hints, Tips, & Tricks for getting your dream job
	- JD Context Baselining `Persona` + `SPEC` + `Skills Map`
	- How to Define `Tone`
	- Internals of Agent based Resume Fine-Tuning
- Model Development
	- Use-Case: CCGram
	- Use-Case: "Tautology detection"
	- Use-Case: "Anecdote detection"
	- Use-Case: "Information Depth Scoring"
	- Use-Case: "Logical Inconsistencies between two texts"
	- Use-Case: "Paraphrase Detection"
	- Use-Case: "Word 'Generic-ness' Scoring"
	- Use-Case: "Anomalous Paraphrase detection"
	- Use-Case: "Anomalous phrase detection"
- Model Research
	- SLM Resource Consumption Tuning
		- How to use SLMs for narrow scope task
		- SLMs vs \*NN
	- Category: **Emergent abilities**
- Reinforcement Learning
	- RL Agent environment for SOC triage training
	- RL Agent environment for Incident Response training
	- RL Agent environment for Vulnerability Remediation training
	- RL Agent environment for Threat Hunt training
	- Graph RL
	- RLLM