---
id: "j0a1b2c3-0000-4jjj-k000-000000000001"
type: idea
status: draft
created: "2026-03-16T00:00:00Z"
updated: "2026-03-16T00:00:00Z"
---

## Concept

A practitioner-oriented taxonomy of LLM backdoor attacks — maliciously embedded behaviors triggered by specific inputs that are distinct from prompt injection (backdoors are in the model, not the input) and jailbreaking (backdoors are intentional, not discovered). The post frames LLM backdoors as a survey/taxonomy, adapting research for security practitioners: "Literature shows X, we categorize as Y, implications are Z." It covers the full LLM pipeline as attack surface (pre-training, fine-tuning, RLHF, deployment), threat actor models (external, supply chain, insider, state-level), and a three-axis taxonomy organized by trigger type (textual, semantic, syntactic, multi-modal), injection method (data poisoning, model manipulation, fine-tuning attacks, RLHF manipulation), and impact (output manipulation, information leakage, capability elicitation, denial of service). Also covers notable research (BadNets, TrojanNN, sleeper agents, LLM-specific papers), real-world incidents and near-misses, detection approaches (input-based, output-based, model-based, provenance-based with effectiveness matrix), mitigation and defense (preventive, detective, responsive controls), and actionable practitioner recommendations segmented by role (security teams, ML teams, organizations). Taxonomy-first approach: provides a structured framework for threat modeling LLM backdoors, organizing fragmented research into an actionable mental model.

## Target Audience

Security practitioners and CISOs assessing LLM risks, red team operators evaluating AI attack surfaces, ML engineers responsible for model security, incident response teams preparing for AI-specific threats, security researchers bridging traditional security and ML security, and anyone including LLMs in their threat models.

## Problem/Need

LLM backdoors represent an emerging threat class that falls between traditional security (which doesn't cover model internals) and ML security research (which doesn't speak to practitioners). Security teams need actionable frameworks: What are the attack vectors? How do we detect them? What do we do when we find one? Current research is fragmented across ML conferences and doesn't translate to security operations. Meanwhile, organizations are deploying LLMs at scale, often using third-party models with limited provenance. The gap between "this is theoretically possible" and "here's how to defend against it" needs bridging.

## Unique Angle

- **Taxonomy-first** — structured framework, not a list of attacks
- **Security practitioner audience** — translates ML research for security operations
- **Three-axis classification** (trigger x injection x impact) enables systematic threat modeling
- **Pipeline-mapped attack surfaces** — shows exactly where each attack type applies
- **Detection effectiveness matrix** — honest about what current detection can and can't find
- **Explicit about the real-world evidence gap** — most research is lab-based, confirmed wild attacks are undocumented
- **Connects to OWASP LLM Top 10** for organizational context
- **Actionable recommendations segmented by role** (security team, ML team, organization)

## Scope

**Included**: LLM backdoor definition and distinction from prompt injection/jailbreaking, full pipeline attack surface mapping, threat actor models, trigger type taxonomy (textual, semantic, syntactic, multi-modal), injection method taxonomy (data poisoning, model manipulation, fine-tuning, RLHF), impact taxonomy (output manipulation, information leakage, capability elicitation, DoS), notable research survey (BadNets, TrojanNN, LLM-specific work, sleeper agents), real-world incidents and near-misses, detection approaches with effectiveness matrix, defense and mitigation controls, practitioner recommendations by role, explicit limitations and knowledge gaps, open questions

**Excluded**: Prompt injection (different threat class), jailbreaking techniques, detailed ML training procedures, model architecture internals beyond what's needed for understanding attacks, specific vendor security assessments, classified or non-public threat intelligence, multi-modal backdoors in depth (briefly covered), comprehensive defense implementation guides, legal and regulatory analysis

## Research Needs

- Systematic literature review of LLM backdoor papers (BadNets, TrojanNN, LLM-specific work, sleeper agents research)
- Review OWASP LLM Top 10 and related frameworks
- Survey detection tools and techniques from academic and industry sources
- Document real-world incidents or near-misses (Hugging Face supply chain concerns, etc.)
- Review defense papers and practitioner guidance
- Consult Zotero for reference management and IEEE/ACM citation format
- Cross-reference with existing security taxonomy frameworks (MITRE ATT&CK for AI if applicable)

## Estimated Effort

- Research: 8-12 hours (literature review, taxonomy synthesis, incident documentation)
- Writing: 6-8 hours (3000-4000 word taxonomy with tables and matrices)
- Visuals: 3-4 hours (pipeline diagram, taxonomy tree, attack surface mapping, detection matrix, defense coverage matrix)
- Review/revision: 2-3 hours (technical accuracy, practitioner accessibility)
- Total: ~19-27 hours across multiple sessions
