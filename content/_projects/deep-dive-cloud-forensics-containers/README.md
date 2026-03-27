# Deep Dive: Cloud Forensics — Containers

> From overlay diffs to audit logs — investigating security incidents in environments designed to be disposable.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A deep-dive into container forensics covering overlay filesystem mechanics, container runtime architecture, live acquisition techniques for ephemeral workloads, Kubernetes-specific forensic artifacts (API audit logs, etcd state, RBAC analysis), runtime security tools as forensic evidence sources (Falco, Tracee, Tetragon), and evidence preservation patterns. Ephemeral-first approach: every technique is framed around the core challenge that containers are designed to be destroyed and replaced.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Source material: `content/.todo/dfir/container-forensics.mdx` (empty stub — to be removed once idea is approved)
- May decompose into 2-3 posts: container runtime forensics (overlay, acquisition), Kubernetes forensics (audit logs, RBAC, etcd), and detection-to-forensics pipeline (runtime tools, automation)
- Hands-on lab with intentionally compromised container is essential
- MITRE ATT&CK Container Matrix provides framework for attack pattern coverage
- Educational/DFIR context — defensive incident response focused
