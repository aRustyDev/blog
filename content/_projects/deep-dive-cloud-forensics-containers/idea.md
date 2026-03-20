---
id: "3e7f92b1-8a54-4c0d-b6d3-5f1e2a9c8d47"
type: idea
status: draft
created: "2026-03-15T00:00:00Z"
updated: "2026-03-15T00:00:00Z"
---

## Concept

A deep-dive into container forensics — the discipline of investigating security incidents in containerized environments where the traditional forensic model (seize the device, image the disk) doesn't apply. Covers the container runtime architecture from a forensic perspective (overlay filesystems, namespaces, cgroups, container image layers), what evidence exists and where it lives (container filesystem diffs, runtime logs, orchestrator audit logs, node-level artifacts), acquisition techniques for ephemeral workloads (live container export, overlay filesystem capture, node disk imaging, volume snapshots, runtime socket inspection), Kubernetes-specific forensics (pod lifecycle events, API server audit logs, etcd state, RBAC analysis, network policy evaluation), and the tooling ecosystem for container incident response (docker export/commit, crictl, kubectl debug ephemeral containers, Sysdig Falco, Aqua Tracee, forensic sidecars). Ephemeral-first approach: every technique is framed around the core challenge that containers are designed to be destroyed and replaced, making evidence preservation fundamentally different from traditional DFIR.

## Target Audience

Cloud security engineers, SOC analysts, and incident responders who handle alerts from containerized production environments but whose forensic training is rooted in traditional disk/memory forensics. DevOps and platform engineers responsible for Kubernetes clusters who need to understand what evidence is available when an incident occurs. Also appeals to security architects designing incident response capabilities for container platforms and DFIR practitioners expanding into cloud-native investigation. Comfortable with Linux, Docker basics, and ideally some Kubernetes exposure, willing to work with container runtime internals and API server logs inline.

## Problem/Need

Containerized workloads are now the default deployment model for production services, but incident response playbooks haven't caught up. When a container is compromised, the traditional forensic approach fails: there's no persistent disk to image (ephemeral filesystem), the "host" is shared by dozens of other containers (multi-tenant node), and by the time you respond the container may have been killed and replaced by the orchestrator (auto-healing). Most DFIR training covers disk imaging and memory analysis for traditional hosts, leaving a gap for the container-native investigator. Engineers need to know: Where does evidence live in a containerized environment? How do you capture a running container's filesystem before it's destroyed? What do Kubernetes audit logs actually tell you? How do overlay filesystem layers help you identify what an attacker changed vs. what was in the original image? There's a need for a deep-dive that maps forensic methodology to container architecture — understanding *what* the container runtime preserves, *where* orchestrator telemetry is stored, and *how* to acquire evidence from workloads designed to be disposable.

## Unique Angle

- **Ephemeral-first framing** — starts with why traditional forensics breaks in container environments, then rebuilds the forensic model around container primitives (image layers, overlay diffs, orchestrator events)
- **Overlay filesystem forensics** — explains how overlay2/fuse-overlayfs layering works, why the upper directory contains exactly the attacker's modifications, and how to extract and analyze the diff layer independently of the base image
- **Container lifecycle evidence map** — traces evidence creation from container start through compromise to destruction, identifying what's preserved at each stage (runtime logs, overlay diff, volume data, API audit events) and what's lost
- **Kubernetes audit log deep-dive** — decodes the API server audit log format, shows how to reconstruct an attack timeline from RBAC escalation through pod creation to data exfiltration, with real log examples
- **Live acquisition techniques** — demonstrates multiple acquisition methods with tradeoffs: `docker export` (loses layer info), `docker commit` (preserves as image), `cp` from overlay path (raw filesystem), volume snapshots (persistent data), and the ephemeral debug container pattern for live investigation
- **Detection-to-forensics pipeline** — shows how runtime security tools (Falco, Tracee, Tetragon) both detect and provide forensic evidence, bridging the gap between alerting and investigation

## Scope

**Included**: Container runtime architecture for forensics (containerd, CRI-O, Docker daemon, OCI runtime spec), overlay filesystem mechanics (overlay2 layers, upper/lower/merged dirs, whiteout files, opaque directories), Linux namespaces and cgroups as isolation boundaries (PID, network, mount, user namespaces; cgroup resource tracking), container image analysis (layer inspection, manifest, config, Dockerfile reconstruction, supply chain verification with cosign/sigstore), live container acquisition (`docker export`, `docker commit`, `docker cp`, overlay directory capture, `/proc` inspection, nsenter), Kubernetes forensics (API server audit logs, etcd cluster state, pod lifecycle events, RBAC audit, service account token analysis, network policy evaluation, secrets access logging), container runtime logs (containerd events, CRI-O logs, kubelet logs), node-level forensics (container artifacts on host filesystem, /var/lib/containerd, /var/lib/docker, /var/log), volume and persistent storage forensics (PV/PVC snapshots, CSI driver logs), runtime security tools as forensic sources (Falco rules and alerts, Tracee events, Tetragon policies, eBPF-based syscall tracing), evidence preservation patterns (forensic sidecars, post-mortem hooks, automated snapshot-on-alert), common container attack patterns and their forensic indicators (cryptominer deployment, reverse shell, credential theft, lateral movement via service account)

**Excluded**: Traditional host-based disk forensics (separate discipline), memory forensics for containers (referenced but not deep-dived — complex topic), serverless/FaaS forensics (Lambda, Cloud Functions — different model), cloud provider control plane forensics (AWS CloudTrail, GCP Audit Logs — cloud forensics, not container-specific), container escape/breakout exploitation (offensive security topic, referenced for forensic indicators only), detailed Falco rule writing (tool-specific guide), Windows container forensics (Linux containers only), VM-level forensics on container host nodes (referenced for node acquisition), supply chain attack investigation in depth (referenced for image analysis context)

## Research Needs

- Review overlay2 filesystem implementation and forensic extraction techniques
- Study containerd and CRI-O runtime internals for artifact preservation
- Map Kubernetes API server audit log format and policy levels (None, Metadata, Request, RequestResponse)
- Research ephemeral debug container capabilities and limitations (kubectl debug)
- Study Falco, Tracee, and Tetragon event formats for forensic evidence correlation
- Review container attack pattern indicators (MITRE ATT&CK Container Matrix)
- Research automated evidence preservation patterns (CrowdStrike Falcon for containers, Wiz runtime, custom solutions)
- Set up forensic lab environment (Kubernetes cluster with audit logging, intentionally compromised container, Falco alerts)
- Study etcd data model for cluster state reconstruction
- Review real-world container incident case studies (Tesla cryptominer 2018, various Kubernetes compromises)
- Research /proc and /sys inspection for live container analysis

## Estimated Effort

- Research: 7-9 hours (overlay filesystem internals, Kubernetes audit logging, runtime security tool event formats, MITRE ATT&CK container matrix, case studies)
- Hands-on lab: 5-7 hours (Kubernetes cluster setup with audit logging, simulated container compromise, evidence acquisition via multiple methods, Falco/Tracee alert capture, overlay diff analysis)
- Writing: 9-12 hours (4500-6000 word deep-dive with architecture diagrams, log examples, acquisition command sequences, and attack timeline reconstruction)
- Diagrams: 4-5 hours (overlay filesystem layer diagram, container lifecycle evidence map, Kubernetes audit log flow, acquisition decision tree, detection-to-forensics pipeline)
- Review/revision: 2-3 hours
- Total: ~27-36 hours across multiple sessions
