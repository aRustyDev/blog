---
id: "e83b14d7-5f29-4a6c-8d02-1c9a7b3e6f50"
type: idea
status: draft
created: "2026-03-15T00:00:00Z"
updated: "2026-03-15T00:00:00Z"
---

## Concept

A deep-dive into TLS — the protocol that secures virtually all internet communication. Covers the TLS 1.3 handshake byte-by-byte (ClientHello, ServerHello, key exchange, finished), the cryptographic primitives it orchestrates (ECDHE for key exchange, AES-GCM/ChaCha20 for symmetric encryption, HKDF for key derivation, digital signatures for authentication), the certificate chain and how trust is established (CA hierarchy, certificate validation, certificate transparency), what changed from TLS 1.2 to 1.3 and why (removed RSA key exchange, mandatory forward secrecy, 1-RTT handshake, encrypted extensions), and the operational realities of running TLS in production (certificate management, OCSP stapling, cipher suite configuration, 0-RTT resumption tradeoffs). Handshake-first approach: each cryptographic concept is introduced at the point in the handshake where it's needed, not as abstract theory.

## Target Audience

Backend engineers, DevOps/platform engineers, and security-conscious developers who configure TLS daily (nginx configs, certificate rotation, cipher suites) but don't understand what happens between ClientHello and the first encrypted byte. Developers who've seen "TLS handshake failed" errors and want to know what actually failed. Also appeals to engineers preparing for security certifications or building systems that need mutual TLS (mTLS). Comfortable with networking fundamentals (TCP, HTTP), willing to look at packet captures and basic cryptographic operations inline.

## Problem/Need

TLS is the most widely deployed security protocol on the internet — every HTTPS request, every API call, every database connection depends on it — yet most engineers treat it as a black box between "get a certificate" and "it's encrypted now." When something breaks (certificate validation failures, handshake timeouts, cipher mismatch errors), debugging requires understanding what the handshake actually does. The cryptographic concepts (key exchange, forward secrecy, certificate chains) are well-documented individually, but there's a gap for a deep-dive that follows the actual protocol flow: here's the ClientHello, here's what the server does with it, here's where the key material comes from, here's when encryption starts, and here's what each step prevents an attacker from doing.

## Unique Angle

- **Handshake-first** — follows the TLS 1.3 handshake message by message, introducing each cryptographic concept exactly when the protocol needs it (ECDHE at key exchange, HKDF at key derivation, certificates at authentication)
- **Byte-level visibility** — shows actual handshake bytes from packet captures, annotated field by field, so readers see what's on the wire, not just diagrams
- **Attacker model throughout** — each protocol step is paired with the attack it prevents (passive eavesdropping → encryption, replay → nonces, MITM → certificates, future compromise → forward secrecy)
- **1.2 → 1.3 evolution** — explains what TLS 1.3 removed and why, framed as "here's the attack or performance problem that motivated the change" (RSA key exchange → no forward secrecy, 2-RTT → latency, ChangeCipherSpec → unnecessary complexity)
- **Certificate chain walkthrough** — traces trust from a leaf certificate up through intermediates to a root CA, explaining what each signature proves and how certificate transparency fits in
- **Production operations lens** — covers the operational decisions engineers actually face: Let's Encrypt vs commercial CAs, OCSP stapling vs CRL, 0-RTT resumption risks (replay attacks), mTLS for service-to-service auth, and how to read `openssl s_client` output

## Scope

**Included**: TLS 1.3 handshake flow (full handshake and PSK resumption), ClientHello/ServerHello structure and fields, key exchange (ECDHE with X25519 and P-256), key derivation (HKDF-Extract, HKDF-Expand, traffic key schedule), symmetric encryption (AES-128-GCM, AES-256-GCM, ChaCha20-Poly1305), digital signatures for authentication (RSA-PSS, ECDSA, Ed25519), certificate chain validation (path building, signature verification, revocation checking), certificate transparency (SCTs, CT logs), TLS 1.2 vs 1.3 comparison (removed features: RSA key exchange, CBC mode ciphers, compression, renegotiation), 0-RTT early data (benefits, replay risks, when to use), session resumption (PSK-based in 1.3), ALPN and SNI extensions, OCSP stapling, mTLS basics, common debugging with `openssl s_client` and Wireshark

**Excluded**: Detailed elliptic curve mathematics (referenced, not derived), TLS 1.0/1.1 (deprecated, not covered), DTLS (datagram TLS — separate protocol), SSL history (brief mention only), implementation-specific vulnerabilities (Heartbleed, POODLE — mentioned as motivation but not exploitation walkthroughs), QUIC/TLS integration (QUIC deep-dive territory), certificate authority operations (how to run a CA), HSM integration, specific web server configuration guides (nginx/Apache/Caddy — operational notes only)

## Research Needs

- Review TLS 1.3 specification in detail (RFC 8446)
- Study the key schedule and HKDF derivation chain (handshake keys → application keys → resumption keys)
- Map the complete handshake message flow including encrypted extensions
- Research ECDHE key exchange with X25519 (RFC 7748) at a level suitable for explanation without full EC math
- Study certificate validation path building (RFC 5280) and certificate transparency (RFC 6962)
- Capture annotated TLS 1.3 handshake packet traces (Wireshark with SSLKEYLOGFILE for decryption)
- Review 0-RTT replay attack scenarios and mitigation strategies
- Gather 3-4 notable TLS vulnerabilities as motivation for protocol design decisions (BEAST, CRIME, Logjam, DROWN)
- Research current cipher suite recommendations (Mozilla's modern/intermediate/old configurations)
- Review `openssl s_client` usage patterns for the debugging section

## Estimated Effort

- Research: 6-8 hours (RFC 8446, key schedule, certificate validation, historical vulnerabilities)
- Hands-on lab: 3-5 hours (packet captures of TLS 1.3 handshakes, openssl demos, mTLS setup, 0-RTT demonstration)
- Writing: 9-12 hours (4500-5500 word deep-dive with annotated packet captures, handshake diagrams, and crypto operation illustrations)
- Diagrams: 3-5 hours (handshake message flow, key schedule derivation tree, certificate chain trust path, 1.2 vs 1.3 comparison)
- Review/revision: 2-3 hours
- Total: ~23-33 hours across multiple sessions
