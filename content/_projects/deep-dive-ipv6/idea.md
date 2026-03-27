---
id: "d29f4a83-6c17-4e5b-b3d1-8a7e5f2c9014"
type: idea
status: draft
created: "2026-03-15T00:00:00Z"
updated: "2026-03-15T00:00:00Z"
---

## Concept

A deep-dive into IPv6 — the protocol that's been "replacing" IPv4 for over two decades. Covers the header format and why it's simpler than IPv4 (no checksum, no fragmentation at routers, fixed 40-byte header), the address architecture (link-local, global unicast, multicast, the death of broadcast), stateless address autoconfiguration (SLAAC) and how it eliminates DHCP for basic scenarios, Neighbor Discovery Protocol (NDP) as the replacement for ARP, the dual-stack and transition mechanisms that have kept IPv4 alive (6to4, Teredo, NAT64/DNS64, 464XLAT), and the real-world deployment picture — why adoption took so long, where it stands today, and what's actually different when you operate an IPv6 network. Protocol-first approach: each feature is explained through the packet format and on-the-wire behavior, not just the RFC abstract.

## Target Audience

Network engineers, backend developers, and infrastructure/platform engineers who work with networking daily but whose IPv6 knowledge is limited to "it has longer addresses." Developers who configure security groups, write socket code, or debug connectivity issues but have never thought about why IPv6 doesn't need NAT, how SLAAC works, or what a link-local address actually is. Also appeals to anyone studying for network certifications or building IPv6-capable services. Comfortable with TCP/IP fundamentals and IPv4, willing to read packet captures inline.

## Problem/Need

IPv6 has been an RFC since 1998 and is now carried by ~45% of Google's traffic, yet most engineers' understanding stops at "128-bit addresses." The protocol made fundamental design decisions that differ from IPv4 in ways that affect everyday operations — no NAT means end-to-end connectivity is back, no broadcast means multicast-based discovery, no router fragmentation means path MTU discovery matters, and SLAAC means hosts can self-configure without a DHCP server. These aren't just trivia — they change how you design networks, write firewall rules, and debug connectivity. Most IPv6 educational content either reads like an RFC summary or focuses on address notation. There's a gap for a deep-dive that explains *why* IPv6 was designed the way it was, what problems each decision solves, and what new operational realities it creates.

## Unique Angle

- **Header-first** — starts with the IPv6 header format side-by-side with IPv4, showing exactly what was removed and why (no checksum → routers are faster, no fragmentation fields → endpoints handle MTU)
- **Address architecture as design philosophy** — explains the address space not as "bigger numbers" but as a deliberate restructuring (scoped addresses, interface identifiers, no broadcast)
- **SLAAC walkthrough** — traces the complete autoconfiguration sequence from link-local generation through Router Solicitation/Advertisement to global address assignment, showing every packet
- **NDP deep-dive** — explains Neighbor Discovery as IPv6's replacement for ARP, ICMP Router Discovery, and ICMP Redirect, unified into one protocol
- **Transition mechanism autopsy** — examines why the "just deploy IPv6" vision failed and how the actual transition played out (dual-stack everywhere, NAT64 at the edge, carrier-grade NAT extending IPv4's life)
- **Operational reality check** — covers what actually changes when you run IPv6: firewall rules (no implicit NAT security), DNS (AAAA records, happy eyeballs), monitoring (longer addresses break fixed-width dashboards), and security (NDP spoofing replaces ARP spoofing)

## Scope

**Included**: IPv6 header format (fixed header + extension headers), address types and scoping (link-local `fe80::/10`, global unicast `2000::/3`, unique local `fc00::/7`, multicast `ff00::/8`, loopback, unspecified), address notation and `::` compression, SLAAC (RS/RA, interface identifier generation, privacy extensions RFC 4941), DHCPv6 and when you still need it (stateful vs stateless), Neighbor Discovery Protocol (NS/NA, RS/RA, redirect, DAD), ICMPv6 (error messages, informational messages, NDP integration), path MTU discovery (no router fragmentation), flow labels and traffic class, dual-stack operation, transition mechanisms overview (NAT64/DNS64, 464XLAT, MAP-E/MAP-T), IPv6 security considerations (NDP spoofing, extension header attacks, RA guard), current deployment status and adoption drivers

**Excluded**: Detailed BGP/OSPF/IS-IS IPv6 routing protocol specifics (routing deep-dive territory), IPsec (originally mandatory in IPv6, now optional — separate topic), Mobile IPv6 (MIPv6), IPv6 over Low-Power Wireless (6LoWPAN/Thread — IoT-specific), detailed carrier/ISP deployment architecture, SRv6 (Segment Routing over IPv6 — advanced topic), IPv6 socket programming API details (application-level topic)

## Research Needs

- Review IPv6 header format in detail (RFC 8200, successor to RFC 2460)
- Study SLAAC implementation flow (RFC 4862) and privacy extensions (RFC 4941, RFC 8981)
- Map the complete NDP message set and state machine (RFC 4861)
- Research ICMPv6 message types and their roles (RFC 4443)
- Study extension header chain and processing rules (RFC 8200 Section 4)
- Review transition mechanisms: NAT64 (RFC 6146), DNS64 (RFC 6147), 464XLAT (RFC 6877)
- Gather current IPv6 adoption statistics (Google, APNIC, Akamai dashboards)
- Research real-world deployment patterns and operational lessons (dual-stack, IPv6-only with NAT64)
- Capture packet traces for SLAAC, NDP, and basic IPv6 communication for inline examples
- Review IPv6 security considerations (RFC 7123 for NDP threats, RA Guard RFC 6105)

## Estimated Effort

- Research: 5-7 hours (RFC review, adoption data, transition mechanism analysis)
- Hands-on lab: 3-4 hours (packet captures for SLAAC/NDP sequences, dual-stack and NAT64 demos)
- Writing: 8-10 hours (4000-5000 word deep-dive with header diagrams, packet traces, and address examples)
- Diagrams: 3-4 hours (header format comparison, SLAAC sequence, NDP message flow, address architecture map)
- Review/revision: 2-3 hours
- Total: ~21-28 hours across multiple sessions
