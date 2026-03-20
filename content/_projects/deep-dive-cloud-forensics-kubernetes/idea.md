---
id: "8d4c15e7-2b69-4f3a-a8e1-c67d3f9a2b58"
type: idea
status: draft
created: "2026-03-15T00:00:00Z"
updated: "2026-03-15T00:00:00Z"
---

## Concept

A deep-dive into Kubernetes forensics — investigating security incidents at the orchestration layer where the attack surface is the API server, RBAC policies, service accounts, and cluster state rather than individual container filesystems. Covers the Kubernetes control plane as a forensic artifact source (API server audit logs, etcd snapshots, admission controller logs), the attack paths unique to Kubernetes (RBAC escalation, service account token theft, pod escape to node, secrets extraction, malicious workload deployment), reconstructing attack timelines from orchestrator telemetry (correlating API audit events with pod lifecycle, network policy changes, and RBAC modifications), the Kubernetes-specific evidence landscape (what the API server records, what kubelet preserves, what the CNI/CSI layers log), and incident response procedures for live clusters (evidence-preserving pod isolation, node cordoning, etcd snapshots, forensic workload deployment). Control-plane-first approach: every investigation technique starts at the API server audit log and works outward to node-level and container-level artifacts.

## Target Audience

Cloud security engineers and incident responders who handle Kubernetes-hosted production environments. Platform engineers responsible for cluster security who need to understand what forensic capabilities their configuration enables or disables. SOC analysts who receive alerts from Kubernetes-aware detection tools (Falco, Prisma Cloud, Aqua) and need to investigate beyond the initial alert. Security architects designing detection and response capabilities for Kubernetes platforms. Comfortable with Kubernetes concepts (pods, deployments, RBAC, service accounts), willing to read API server audit logs and etcd data inline.

## Problem/Need

Kubernetes introduces an entire orchestration layer between the attacker and the container — and most incidents involve this layer. An attacker who compromises a pod doesn't just live in that container; they enumerate service account permissions, query the API server for secrets, pivot to other namespaces, or escape to the node. Investigating these attacks requires understanding Kubernetes as a system, not just the containers it runs. But most Kubernetes security content focuses on hardening (how to prevent attacks) rather than forensics (how to investigate after they happen). When an incident occurs, responders face questions that traditional DFIR doesn't answer: How do I know which API calls the attacker made? Can I reconstruct what RBAC permissions a compromised service account had at the time of the incident (not now, after remediation)? How do I preserve evidence from a pod that the orchestrator is about to restart? There's a gap for a deep-dive that treats the Kubernetes control plane as the primary forensic artifact source and maps investigation methodology to the platform's architecture.

## Unique Angle

- **Control-plane-first** — starts investigation at the API server audit log rather than the container filesystem, because most Kubernetes attacks traverse the control plane and leave traces there
- **API audit log mastery** — deep-dives into audit policy levels (None, Metadata, Request, RequestResponse), demonstrates how to reconstruct complete attack timelines from audit events, and shows what each policy level captures vs. misses
- **etcd as forensic time machine** — explains how etcd snapshots capture the complete cluster state at a point in time, enabling reconstruction of RBAC bindings, secrets, network policies, and pod specs as they existed during an incident
- **Attack path reconstruction** — walks through 3-4 common Kubernetes attack scenarios (service account token abuse, RBAC escalation, pod escape, secrets exfiltration) end-to-end, showing exactly which audit log entries, pod events, and node-level artifacts each step generates
- **Evidence-preserving response** — demonstrates how to isolate compromised workloads without destroying evidence (network policy isolation vs. pod deletion, node cordoning, forensic sidecar injection, ephemeral debug containers)
- **RBAC temporal analysis** — shows how to determine what permissions existed at the time of an incident by combining audit logs with etcd history, since RBAC bindings may have been modified during or after the attack

## Scope

**Included**: Kubernetes API server audit logging (audit policy configuration, audit log format, audit backends: log, webhook, dynamic), audit event structure (stage, level, verb, resource, user, sourceIPs, objectRef, requestObject, responseObject), etcd forensics (snapshot creation, data extraction, key-value structure, historical state reconstruction, etcd-io/auger for decoding), RBAC forensic analysis (ClusterRole/Role bindings, service account permissions, token projection, bound service account tokens vs. legacy tokens, temporal RBAC reconstruction), service account forensics (token mounting, audience-scoped tokens, OIDC issuer, token request API), Kubernetes secrets investigation (secret access audit logging, encryption at rest configuration, secrets access patterns), pod lifecycle forensics (creation, scheduling, running, termination events, container status history, restart counts, exit codes), admission controller logs (OPA/Gatekeeper decisions, Kyverno policy reports, webhook logs), kubelet-level artifacts (pod logs, container state on node, CRI runtime events, cadvisor metrics), CNI forensics (network policy evaluation, Cilium/Calico flow logs, DNS query logs from CoreDNS), common attack patterns with forensic indicators (MITRE ATT&CK Kubernetes matrix: initial access via exposed API/dashboard, execution via pod creation, persistence via CronJob/DaemonSet, privilege escalation via RBAC, credential access via secrets/service accounts, lateral movement via network, exfiltration via pod egress), evidence preservation techniques (network policy isolation, node cordon/drain, pod snapshot via checkpoint API, etcd snapshot, volume snapshots, forensic namespace pattern), incident response playbook structure for Kubernetes

**Excluded**: Container-level filesystem forensics in depth (sibling project: deep-dive-cloud-forensics-containers), cloud provider control plane forensics (AWS EKS audit in CloudTrail, GKE audit in Cloud Audit Logs — cloud-specific, not K8s-generic), Kubernetes hardening and prevention (CIS benchmarks, pod security standards — defensive config, not forensics), managed Kubernetes service internals (EKS, GKE, AKS control plane access limitations — mentioned but not deep-dived), service mesh forensics (Istio, Linkerd mTLS and access logs — separate scope), supply chain attacks on container images (image signing, SBOM — referenced for context), Windows node forensics, Kubernetes operator/CRD-specific forensics

## Research Needs

- Study Kubernetes API server audit log format and policy configuration in depth
- Map audit event fields to investigation use cases (which fields answer which questions)
- Research etcd data model and snapshot/restore workflow for forensic use
- Study RBAC temporal reconstruction techniques (audit log correlation with binding changes)
- Review bound service account token implementation (TokenRequest API, projected volumes, expiration)
- Map MITRE ATT&CK Kubernetes matrix techniques to specific audit log patterns
- Research Kubernetes pod checkpoint API (CRI checkpoint/restore) for evidence preservation
- Study Cilium Hubble and Calico flow logs for network forensics
- Set up forensic lab environment (kind/k3s cluster with full audit logging, simulated compromise scenarios)
- Review real-world Kubernetes breach case studies (Shopify bounty reports, Tesla, various exposed dashboards)
- Research OPA/Gatekeeper and Kyverno policy report formats as forensic evidence
- Study CoreDNS query logging for DNS-based exfiltration detection

## Estimated Effort

- Research: 8-10 hours (API audit log deep study, etcd internals, RBAC token mechanics, MITRE ATT&CK mapping, case studies)
- Hands-on lab: 6-8 hours (cluster setup with audit logging, simulated attack scenarios with forensic capture, etcd snapshot analysis, audit log timeline reconstruction, network policy isolation demo)
- Writing: 10-14 hours (5000-6500 word deep-dive with audit log examples, attack timeline reconstructions, etcd data samples, and response procedure walkthroughs)
- Diagrams: 4-6 hours (Kubernetes forensic evidence map, API audit event flow, attack path diagrams with forensic indicators, evidence preservation decision tree, RBAC temporal analysis flow)
- Review/revision: 2-3 hours
- Total: ~30-41 hours across multiple sessions
