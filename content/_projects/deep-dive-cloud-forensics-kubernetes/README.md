# Deep Dive: Cloud Forensics — Kubernetes

> From API audit logs to etcd snapshots — investigating incidents at the orchestration layer.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A deep-dive into Kubernetes forensics covering API server audit log analysis, etcd snapshot forensics for cluster state reconstruction, RBAC temporal analysis, service account token investigation, attack path reconstruction through control plane telemetry, and evidence-preserving incident response techniques. Control-plane-first approach: every investigation starts at the API server audit log and works outward to node and container artifacts. Includes end-to-end attack scenario walkthroughs with forensic indicator mapping.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Source material: `content/.todo/dfir/k8s-forensics.mdx` (empty stub — to be removed once idea is approved)
- Sibling project: deep-dive-cloud-forensics-containers (container-level forensics)
- May decompose into 2-3 posts: API audit log mastery + etcd forensics, attack path reconstruction, and evidence-preserving incident response
- Lab requires cluster with full audit logging enabled (kind/k3s suitable)
- MITRE ATT&CK Kubernetes matrix provides attack pattern framework
- Educational/DFIR context — defensive incident response focused
