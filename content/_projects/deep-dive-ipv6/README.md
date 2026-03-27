# Deep Dive: IPv6

> From header format to adoption reality — understanding the protocol that's been replacing IPv4 for two decades.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A deep-dive into IPv6 covering the simplified header format, address architecture (scoped addresses, no broadcast, multicast-based discovery), SLAAC autoconfiguration, Neighbor Discovery Protocol as ARP's replacement, ICMPv6 integration, and the transition mechanisms that bridged the IPv4-to-IPv6 gap. Protocol-first approach: each feature is explained through on-the-wire packet behavior and compared to its IPv4 equivalent. Includes packet captures and an operational reality check for running IPv6 in production.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Source material: `content/.todo/deep-dives/ipv6-deep-dive.mdx` (empty stub — to be removed once idea is approved)
- May decompose into 2-3 posts: protocol fundamentals (header + addressing + SLAAC/NDP) and transition/operations (NAT64, dual-stack, security, adoption)
- Packet captures are key — SLAAC and NDP sequences should be shown on the wire
- Good candidate for header format comparison diagrams (IPv4 vs IPv6 side-by-side)
