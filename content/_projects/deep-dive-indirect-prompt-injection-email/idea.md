---
id: "m3d4e5f6-3333-4mmm-n333-333333333301"
type: idea
status: draft
created: "2026-03-16T00:00:00Z"
updated: "2026-03-16T00:00:00Z"
---

## Concept

An original security research deep-dive on indirect prompt injection via email summarization — a passive attack vector where malicious instructions embedded in emails are executed by LLM-powered summarization features (Microsoft Copilot, Google Workspace AI, etc.) without the victim ever clicking, opening, or interacting with the malicious content. Covers the threat model (attacker sends email → target inbox → summarization feature reads email → LLM executes embedded instructions → data exfiltration or action execution), payload design (plain text instructions, encoded/obfuscated variants, context manipulation, role assumption), experimental methodology (controlled environment, multiple payload types, success criteria, trial structure), results with success rates by payload type, analysis of why these attacks work (lack of input/output separation, trust assumptions about email content), comparison to direct prompt injection, broader implications for document summarization contexts (PDFs, web pages, chat histories), and mitigation recommendations for vendors, enterprise security teams, and end users. Evidence-first approach: hypothesis-driven framing with explicit methodology, reproducible steps, and conservative claims bounded by actual experimental evidence.

## Target Audience

Security researchers studying LLM vulnerabilities, red team operators assessing AI-integrated enterprise tools, enterprise security teams evaluating Microsoft Copilot/Google Workspace AI risks, CISOs making deployment decisions about AI summarization features, AI safety researchers studying indirect prompt injection as an attack class, email security vendors building detection for LLM-targeting payloads, blue team analysts who need to understand what to monitor for.

## Problem/Need

Email summarization features powered by LLMs are being deployed at enterprise scale (Microsoft 365 Copilot, Google Workspace AI), creating a new attack surface where email content — traditionally treated as data — becomes instructions executed by an LLM. This is a "confused deputy" problem: the summarization system treats attacker-controlled email content with the same trust as system instructions. The attack is particularly dangerous because it's passive (victim doesn't need to interact with the malicious email), scalable (one email to thousands of targets), and exploits a trust boundary violation that most security teams aren't monitoring for. Current enterprise email security focuses on phishing links, malicious attachments, and social engineering — not on instruction injection targeting AI features processing the email content. There's a gap between the rapid deployment of email summarization features and the security community's understanding of the new attack surface they create.

## Unique Angle

- **Evidence-first** — original research with actual experimental results, not theoretical speculation about what might be possible
- **Passive attack vector emphasis** — highlights that the victim never needs to click, open, or interact with the malicious email, which is a fundamental shift from traditional email attacks
- **Methodology rigor** — detailed experimental setup, payload design variations, success criteria, trial structure, and negative results, enabling reproducibility
- **Negative results included** — documents what didn't work (payload types that failed, apparent mitigations that blocked attacks) alongside successes
- **Practitioner-oriented mitigations** — recommendations segmented by audience: platform vendors (input sanitization, instruction detection), enterprise security teams (monitoring, configuration hardening), end users (risk awareness, feature controls)
- **Broader implications mapped** — extends findings beyond email to other document summarization contexts (PDFs, web pages, chat histories, code comments)
- **Responsible disclosure framing** — explicit about ethical constraints, what was not tested, disclosure timeline, and responsible research practices
- **Comparison to direct prompt injection** — clearly positions this within the existing prompt injection taxonomy and explains why indirect injection is harder to detect

## Scope

**Included**: Indirect prompt injection definition and distinction from direct injection, the confused deputy problem in LLM applications, email summarization architecture (retrieve → embed → generate), threat model (attacker capabilities, goals, assumptions), experimental setup (platform, configuration, isolation), payload design and variations (plain text, encoded, context manipulation, role assumption, controls), success criteria and observable indicators, results with success rates by payload type, example successful attack walkthrough (sanitized), negative results and failure modes, analysis of why attacks work, comparison to direct prompt injection, broader document summarization implications, mitigation recommendations by audience, explicit limitations (scope, methodology, ethics), open questions, responsible disclosure context

**Excluded**: Exploitation tooling or weaponized payloads, testing on production systems without authorization, attacks against platforms not explicitly authorized for testing, detailed internal architecture of specific vendor LLM pipelines (black-box research), comprehensive multi-platform comparison, long-term vendor response tracking, legal analysis of AI security research, detailed email security product evaluations, prompt injection taxonomy beyond what's needed for context

## Research Needs

- Review prior prompt injection literature (Greshake et al., Perez & Ribeiro, OWASP LLM Top 10)
- Design experimental methodology with appropriate ethical boundaries
- Set up controlled test environment with authorized platform access
- Design payload variations (plain text, encoded, context manipulation, role assumption)
- Execute trials with systematic data collection
- Analyze success/failure rates and identify patterns
- Document negative results and apparent mitigations
- Prepare responsible disclosure if novel vulnerabilities confirmed
- Review Microsoft Copilot/Google Workspace AI security documentation
- Consult with security research ethics guidelines

## Estimated Effort

- Research/literature review: 4-6 hours (prompt injection papers, platform documentation, prior work)
- Experimental setup: 4-6 hours (environment configuration, payload design, trial structure)
- Experimentation: 6-10 hours (running trials, data collection, varying payload types, measuring results)
- Analysis: 3-4 hours (success rate analysis, failure mode identification, broader implications)
- Writing: 5-7 hours (2500-3000 word research paper with sanitized examples and methodology)
- Visuals: 2-3 hours (attack flow diagram, payload structure, success rate data, comparison diagram)
- Review: 2-3 hours (security accuracy, responsible disclosure compliance, ethical review)
- Total: ~26-39 hours across research, experimentation, and writing phases
