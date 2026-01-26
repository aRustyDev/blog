---
title: "eBPF for Observability: A Practical Introduction"
description: "Getting started with eBPF-based observability tools - from understanding the basics to deploying in production."
pubDatetime: 2024-07-22T00:00:00Z
featured: true
draft: false
tags:
  - ebpf
  - linux
  - observability
  - performance
  - kernel
---

eBPF has been the most exciting development in Linux observability in years. The ability to run sandboxed programs in kernel space without loading custom modules opens up possibilities that weren't practical before. Here's what I've learned getting it into production.

## What Makes eBPF Different

Traditional observability relies on applications emitting telemetry - logs, metrics, traces. The application decides what to expose, and you hope it's enough.

eBPF flips this. Instead of asking applications what they're doing, you observe them from the kernel's perspective. Every syscall, every network packet, every file operation - visible without application changes.

```
Application Layer:  "I made an HTTP request"
eBPF View:          socket() -> connect() -> write() -> read() -> close()
                    with timing, sizes, and return codes for each
```

## The Tooling Landscape

The ecosystem is maturing but still fragmented:

- **bpftrace** - One-liners and quick investigations. Think awk for kernel tracing.
- **libbpf** - The C library for serious eBPF development.
- **aya** - Rust bindings for eBPF. My current preference.
- **cilium/ebpf** - Go library, good if you're in that ecosystem.

For production observability:
- **Pixie** - Full auto-instrumentation platform
- **Parca** - Continuous profiling with eBPF
- **Tetragon** - Security observability from Cilium

## A Simple Example

Let's trace all TCP connections with bpftrace:

```bash
#!/usr/bin/env bpftrace

tracepoint:syscalls:sys_enter_connect
/args->uservaddr->sa_family == AF_INET/
{
    $addr = (struct sockaddr_in *)args->uservaddr;
    printf("%s -> %s:%d\n",
        comm,
        ntop($addr->sin_addr.s_addr),
        ntohs($addr->sin_port));
}
```

Run it, and you see every outbound TCP connection:

```
curl -> 142.250.80.100:443
postgres -> 10.0.0.5:5432
prometheus -> 10.0.0.10:9090
```

No application changes. No sidecars. Just visibility.

## Production Considerations

Before deploying eBPF-based observability:

**Kernel Version**: You need Linux 4.x minimum, but 5.x+ is where the good stuff lives. BPF CO-RE (Compile Once, Run Everywhere) requires 5.2+.

**Overhead**: eBPF is efficient, but not free. Tracing every syscall on a busy system adds up. Be selective about what you trace in production.

**Security**: eBPF programs run in kernel space with elevated privileges. The verifier prevents obviously dangerous code, but you still need to trust your eBPF programs.

**Maintenance**: The eBPF ecosystem moves fast. Kernel updates can break probes. Plan for ongoing maintenance.

## Where to Start

If you're new to eBPF:

1. Install `bpftrace` and work through the [one-liner tutorial](https://github.com/bpftrace/bpftrace/blob/master/docs/tutorial_one_liners.md)
2. Read Brendan Gregg's [BPF Performance Tools](https://www.brendangregg.com/bpf-performance-tools-book.html)
3. Try [libbpf-bootstrap](https://github.com/libbpf/libbpf-bootstrap) for writing actual programs
4. Evaluate Pixie or similar for production observability without writing custom probes

eBPF isn't a silver bullet, but it fills gaps that were previously impossible to address. Understanding it is becoming essential for anyone working on Linux infrastructure.
