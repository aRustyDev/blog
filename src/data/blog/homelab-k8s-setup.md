---
title: "Building a Homelab Kubernetes Cluster"
description: "Documenting my homelab k8s setup - hardware choices, networking, and lessons learned from running production-style infrastructure at home."
pubDatetime: 2024-04-10T00:00:00Z
featured: false
draft: false
tags:
  - kubernetes
  - homelab
  - infrastructure
  - networking
  - devops
---

Running Kubernetes at home started as a way to learn the platform without cloud bills. Three iterations later, it's become genuinely useful for self-hosting services and testing deployments before they hit production.

## Hardware Evolution

**Iteration 1**: Raspberry Pi 4 cluster (3 nodes)
- Cheap, quiet, low power
- ARM architecture caused constant compatibility issues
- 4GB RAM per node was painfully limiting

**Iteration 2**: Used Dell Optiplex micro PCs
- x86_64, 16GB RAM each, way more practical
- eBay finds for ~$100-150 each
- Power draw still reasonable (~30W per node)

**Iteration 3** (current): Mixed cluster
- 3x Optiplex nodes for control plane + workloads
- 1x larger workstation node for memory-heavy workloads
- Total: ~24 cores, 96GB RAM across the cluster

## Network Architecture

The network setup went through similar iterations. What worked:

```
ISP Router (bridge mode)
    |
pfSense Box (routing, firewall, DNS)
    |
Managed Switch (VLANs)
    |
├── VLAN 10: Management (iDRAC, switch mgmt)
├── VLAN 20: Kubernetes nodes
├── VLAN 30: Services (exposed to home network)
└── VLAN 40: IoT isolation
```

Key decisions:
- **MetalLB** for load balancing - simple L2 mode works fine for homelab
- **Cilium** as CNI - eBPF-based, good observability, replaces kube-proxy
- **External DNS + Pi-hole** - internal DNS for services

## Storage

Storage in homelab k8s is always the hard part. Options I've tried:

- **Local path provisioner**: Simple, but no HA
- **Longhorn**: Works, but overhead on small clusters
- **NFS**: Current choice for most workloads

For databases needing fast storage, I use local NVMe with `nodeAffinity` to pin pods. Not cloud-native, but it works.

## What's Running

Current workloads:
- **Gitea** - Git hosting
- **Drone CI** - Build pipelines
- **Prometheus + Grafana** - Monitoring
- **Loki** - Log aggregation
- **Vault** - Secrets management
- **Paperless-ngx** - Document management
- Various personal projects for testing

## Lessons Learned

**Start simple**: My first attempt had Ceph, Istio, and a dozen operators. It was impossible to debug. Strip it down to essentials first.

**GitOps from day one**: ArgoCD or Flux. Managing a cluster with `kubectl apply` quickly becomes chaos.

**Backup your etcd**: Lost a cluster once because I didn't. Never again.

**Monitoring isn't optional**: You can't fix what you can't see. Prometheus + Grafana is the minimum.

**Power matters**: When your cluster draws 200W 24/7, the electricity bill adds up. Efficient hardware pays for itself.

## Is It Worth It?

For learning, absolutely. Nothing teaches you Kubernetes like running it yourself and fixing it when it breaks at 2 AM.

For practical self-hosting, it depends. A single Docker host with Compose is simpler for most use cases. Kubernetes makes sense when you actually need its features - rolling updates, scaling, multi-node redundancy.

I'd do it again, but I'd skip the Pi cluster phase.
