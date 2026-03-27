---
id: "b83d14e7-6c52-4a9f-a1b0-3f8e2d7c5a96"
type: idea
status: draft
created: "2026-03-16T00:00:00Z"
updated: "2026-03-16T00:00:00Z"
---

## Concept

An ELI5 (Explain Like I'm 5) introduction to injection-based attacks — the entire family of vulnerabilities where an attacker tricks a system into treating user-supplied data as executable instructions. Covers the unifying pattern behind all injection attacks (mixing data and code in the same channel), then walks through the major injection types with simple, visual examples: SQL injection (sneaking commands into database queries), Cross-Site Scripting/XSS (injecting JavaScript into web pages other people view), command injection (tricking a server into running shell commands), LDAP injection, template injection (SSTI), header injection, and prompt injection (the newest member of the family). Each attack is explained through the same mental model: there's a template with a hole for user data, and the attacker puts instructions where data was expected. Analogy-first approach: uses everyday analogies (mad libs, filling out forms, ordering at a restaurant) to build intuition before showing any code.

## Target Audience

Junior developers and coding bootcamp graduates who are building web applications but haven't studied security. Computer science students encountering application security for the first time. Non-technical stakeholders (product managers, team leads) who need to understand what "SQL injection" means when it shows up in a security audit or penetration test report. Career-changers into software engineering who need foundational security knowledge. Anyone who's heard "injection attack" and wants to understand the concept without drowning in technical detail. No programming experience assumed for the core explanations — code examples are supplementary, not required for understanding.

## Problem/Need

Injection attacks have been the #1 web application vulnerability for over a decade (OWASP Top 10), yet many developers don't understand the fundamental pattern. They memorize "use parameterized queries" without understanding *why* — that it separates the code channel from the data channel. This means they prevent SQL injection but fall for command injection, or prevent XSS but miss template injection, because they don't see that it's the same underlying mistake. Most injection attack educational content is either too technical (shows exploit payloads without explaining the underlying concept) or too shallow ("injection is bad, use prepared statements"). There's a gap for an ELI5 explanation that builds the mental model — data vs code confusion — and then shows how that single pattern manifests across SQL, HTML/JS, shell commands, LDAP, templates, HTTP headers, and even LLM prompts.

## Unique Angle

- **One pattern, many faces** — frames all injection attacks as the same fundamental mistake (mixing data and code in a single channel), then shows how that pattern appears in SQL, HTML, shell, LDAP, templates, headers, and prompts — readers learn to recognize injection anywhere, not just memorize individual attack types
- **The mad libs analogy** — introduces injection through the "mad libs" metaphor: a sentence with blanks (the template), expected fill-ins (user data), and what happens when someone writes an entirely new sentence instead of a single word (the injection) — instantly graspable without any technical background
- **Before/after visualization** — for each injection type, shows the intended query/command/page as the developer expected it, then the same construct with injected input, visually highlighting where the attacker's instructions appear — making the attack visible rather than abstract
- **The defense is always the same** — after showing that the attack pattern is universal, shows that the defense pattern is also universal: separate the code channel from the data channel (parameterized queries, output encoding, safe APIs, structured prompts) — one principle, applied everywhere
- **Prompt injection as the newest member** — includes prompt injection (for LLMs) as the latest manifestation of the same pattern, showing how "system prompt + user input" has the same data/code confusion as "SQL query + user input" — making the topic immediately contemporary
- **No exploit payloads** — deliberately avoids the "here's how to hack" framing; instead explains the vulnerability pattern so developers recognize and prevent it — educational/defensive context throughout

## Scope

**Included**: The unifying injection pattern (data/code confusion in a shared channel), SQL injection (string concatenation in queries, the `' OR 1=1 --` archetype explained through mad libs, parameterized queries as the fix, brief ORM note), Cross-Site Scripting/XSS (reflected and stored, user input rendered as HTML/JS, output encoding/escaping as the fix, Content-Security-Policy mention), command injection (user input in shell commands, `; rm -rf /` archetype, safe subprocess APIs as the fix), LDAP injection (search filter manipulation, brief and analogous to SQL), Server-Side Template Injection/SSTI (user input in template engines like Jinja2/Handlebars, template sandbox as the fix), HTTP header injection/CRLF injection (newlines in header values, response splitting), prompt injection (user input in LLM prompts, system/user message boundary, the unsolved problem), the universal defense principle (separate code from data: parameterized queries, output encoding, safe APIs, structured formats), real-world impact examples (without exploitation details — just "this is what happened" for motivation)

**Excluded**: Detailed exploitation techniques and payloads (offensive security — this is ELI5, not a pentesting guide), advanced SQL injection (blind, time-based, out-of-band — deep-dive territory), DOM-based XSS in detail (specialized), deserialization attacks (related but different pattern — code in data objects), XXE/XML injection (specialized), buffer overflow / memory corruption (different vulnerability class entirely), detailed WAF bypass techniques, specific framework security configurations, penetration testing methodology

## Research Needs

- Review OWASP Top 10 current ranking and injection category scope
- Gather 3-4 real-world injection incident summaries for impact motivation (without exploit details)
- Verify mad libs / analogy approach resonates with non-technical readers (informal testing)
- Review current prompt injection research for accurate framing of the newest injection type
- Study existing ELI5 security content to avoid retreading and identify differentiation
- Create simple, visual before/after examples for each injection type
- Review parameterized query syntax across common languages (Python, JavaScript, Java, Go) for supplementary code examples
- Verify OWASP's current recommended mitigations for each injection type

## Estimated Effort

- Research: 3-4 hours (OWASP review, incident summaries, prompt injection state-of-art, existing ELI5 content survey)
- Writing: 5-7 hours (2500-3500 word ELI5 post with analogies, before/after visualizations, and supplementary code examples)
- Diagrams/visuals: 3-4 hours (mad libs template visualization, before/after injection diagrams for each type, the universal pattern diagram, defense principle visualization)
- Review/revision: 2-3 hours (critical for ELI5 — must be accessible to non-technical readers while remaining technically accurate)
- Total: ~13-18 hours across multiple sessions
