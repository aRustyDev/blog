# Deep Dive: Indirect Prompt Injection via Email Summarization

> When reading your email becomes an attack vector — passive prompt injection through AI summarization.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

An original security research deep-dive on indirect prompt injection via email summarization features. Documents a passive attack vector where malicious instructions embedded in emails are executed by LLM-powered summarization (Microsoft Copilot, Google Workspace AI) without victim interaction. Evidence-first approach: includes experimental methodology, payload design, success/failure rates, negative results, and responsible disclosure framing. Provides mitigation recommendations for vendors, security teams, and end users.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Original security research — requires careful ethical review and responsible disclosure
- Passive attack vector is the key differentiator from traditional email threats
- Must include negative results and failed payload types alongside successes
- Sanitize all payload examples — no weaponized content
- Related to LLM backdoor taxonomy project (different attack class but overlapping threat landscape)
- NOTE: when idea is approved, remove .todo/urgent/indirect-prompt-injection-email-summarization.draft.md
