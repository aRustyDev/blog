# Deep Dive: TLS

> From ClientHello to encrypted bytes — understanding the handshake that secures the internet.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A deep-dive into TLS covering the 1.3 handshake message by message, the cryptographic primitives it orchestrates (ECDHE, AES-GCM, HKDF, digital signatures), certificate chain trust establishment, the 1.2-to-1.3 evolution and its security motivations, and production operations (certificate management, OCSP, 0-RTT tradeoffs, mTLS). Handshake-first approach: each cryptographic concept is introduced at the point in the protocol where it's needed. Includes annotated packet captures and attacker model analysis.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Source material: `content/.todo/deep-dives/tls-deep-dive.mdx` (empty stub — to be removed once idea is approved)
- May decompose into 2-3 posts: handshake + crypto fundamentals, certificate trust chain, and production operations
- Packet captures with SSLKEYLOGFILE are essential for showing decrypted handshake
- Historical vulnerabilities (BEAST, CRIME, Logjam) serve as motivation for design decisions, not exploitation walkthroughs
