---
id: "c91d35a8-7e42-4b6f-a0c3-2f8b5d1e9a74"
type: idea
status: draft
created: "2026-03-16T00:00:00Z"
updated: "2026-03-16T00:00:00Z"
---

## Concept

A dev-blog style introduction to the mechanical keyboard hobby — the "getting started" guide I wish I'd had. Covers the decision landscape a newcomer faces: form factors (full-size, TKL, 75%, 65%, 60%, 40%, split, ortholinear — what's the actual tradeoff), switch types (linear, tactile, clicky — what the feel differences mean and how to decide without buying 50 switches), keycap profiles and materials (Cherry, SA, MT3, DSA, KAT — why profile matters more than most beginners think), PCB hotswap vs soldered (and why hotswap changed the hobby), firmware (QMK, VIA, ZMK — the software side that most hardware-focused guides skip), and the "build vs buy" decision tree. Written from the perspective of a developer who went down the rabbit hole — personal experience woven into practical guidance. No-jargon-first approach: every term is explained when first used, because the keyboard community's vocabulary is one of the biggest barriers to entry.

## Target Audience

Developers, engineers, and tech professionals who are curious about mechanical keyboards but overwhelmed by the community's vocabulary and options. People who've seen cool keyboards on Reddit or at a coworker's desk and want to understand what makes them different from a normal keyboard. Anyone who's Googled "best mechanical keyboard" and found the results confusing because they didn't know what "65% hotswap with Gateron milky yellows and PBT cherry profile caps" means. Experienced typists who want to understand whether a custom keyboard would actually improve their workflow or if it's just aesthetics. No prior keyboard knowledge assumed — this is genuinely "getting started."

## Problem/Need

The mechanical keyboard hobby has an absurdly steep onboarding curve — not because the concepts are hard, but because the community communicates in dense jargon that assumes you already know the basics. A newcomer asking "what keyboard should I get?" gets answers like "65% hotswap with lubed linears, PBT cherry profile, south-facing LEDs, gasket mount" — which is effectively a foreign language. Existing "getting started" guides tend to either be surface-level ("there are three switch types: red, brown, blue") or immediately dive into enthusiast territory (lube stations, spring swaps, foam modding). There's a gap for a guide that methodically walks through each decision a newcomer faces, explains the terminology as it's introduced, gives honest opinions about what actually matters vs what's enthusiast-level optimization, and helps the reader figure out what *they* want rather than prescribing a single "best" answer. Written by a developer, for developers — with the engineering mindset of understanding tradeoffs rather than chasing hype.

## Unique Angle

- **No-jargon-first** — every keyboard term is explained when first introduced, treating the vocabulary barrier as the primary obstacle rather than assuming readers already speak keeb
- **Decision tree, not recommendation list** — instead of "buy this keyboard," walks through each decision axis (form factor, switches, keycaps, mount style, firmware) with tradeoffs, helping readers figure out what they want
- **Developer perspective** — written by and for someone who types for a living, emphasizing practical concerns: programmability (layers, macros, home row mods), split ergonomics for RSI prevention, firmware hackability (QMK/ZMK as actual software projects), and how keyboard choices affect coding workflow
- **Firmware as a first-class topic** — most getting-started guides focus entirely on hardware; this gives equal weight to QMK/VIA/ZMK because for developers, the firmware is half the value of a custom keyboard (layers, macros, per-app configs)
- **Honest cost framing** — addresses the elephant in the room: this hobby can be expensive, and clearly delineates what's "good enough" at each price tier ($50 entry, $150 solid, $300+ enthusiast) so readers can make informed budget decisions
- **Build vs buy decision tree** — honest guidance on when to build from scratch, when to buy a hotswap kit, and when to just buy a pre-built — because not everyone needs or wants to solder, and that's fine
- **Personal narrative thread** — weaves in the author's own keyboard journey as a developer, making it relatable rather than encyclopedic

## Scope

**Included**: Form factor guide (full-size/100%, TKL/80%, 75%, 65%, 60%, 40%, split, ortholinear — what you lose and gain at each size, how programmable layers compensate for fewer keys), switch types (linear: smooth press, no bump — Cherry MX Red, Gateron Yellow, popular linears; tactile: bump at actuation — Cherry MX Brown, Boba U4T, Holy Panda; clicky: bump + click — Cherry MX Blue, Box Jade; switch anatomy: housing, stem, spring, contact leaf; actuation force and travel distance; switch tester recommendation), keycap profiles and materials (Cherry profile: low, sculpted, most popular; SA: tall, sculpted, retro; MT3: tall, deep dish; DSA: uniform, flat; KAT: medium, sculpted; ABS vs PBT plastic: shine, sound, durability; doubleshot vs dye-sub legends), mounting styles simplified (tray mount, gasket mount, top mount — how mount affects typing feel and sound, why gasket mount became popular), PCB types (hotswap: swap switches without soldering; soldered: permanent but more PCB options; south-facing vs north-facing LEDs and keycap interference), firmware overview (QMK: open-source, maximum flexibility, C-based configuration; VIA: real-time GUI configuration, runs on QMK; ZMK: wireless-first, Zephyr RTOS-based; Vial: open-source VIA alternative), layers and programmability (what layers are, why they matter for small form factors, home row mods for developers, per-app macros), the build vs buy spectrum (pre-built: Keychron, HHKB, Leopold; kit: hotswap PCB + case + plate + stabs, assemble no solder; full custom: PCB + case + plate + switches + stabs + keycaps, soldering optional with hotswap), budget tiers ($50-80: entry pre-built; $100-150: quality hotswap kit or pre-built; $200-350: enthusiast kit or premium pre-built; $400+: group buy / artisan territory), stabilizer basics (what they are, why they rattle, basic tuning), where to buy (vendor overview without endorsements), community resources (r/MechanicalKeyboards, Geekhack, Discord servers, switch review databases)

**Excluded**: Advanced modding (lubing switches, spring swapping, foam modding, tape mod, PE foam — follow-up content), artisan keycaps and the collector market, group buy mechanics and drama, keyboard design and PCB design (engineering topic), detailed QMK/ZMK firmware development (coding topic for follow-up), acoustic tuning and sound profiles in detail, vintage keyboards (Model M, Model F — separate nostalgia piece), ergonomic keyboard deep-dive (Ergodox, Dactyl, Corne — separate post), specific product reviews, switch ranking/tier lists

## Research Needs

- Survey current entry-level keyboard recommendations (Keychron Q/V series, GMMK, Royal Kludge, etc.)
- Review current switch landscape for accessible starter recommendations per category
- Verify keycap profile availability and popular sets for newcomers
- Check QMK/VIA/ZMK current state and ease of setup for beginners
- Gather current pricing for budget tier accuracy
- Review existing "getting started" guides and YouTube content to identify gaps and differentiation
- Document personal keyboard journey for narrative thread

## Estimated Effort

- Research: 3-4 hours (current product landscape, firmware state, existing content survey, pricing verification)
- Writing: 5-7 hours (3000-4000 word dev-blog post with decision trees, terminology explanations, and personal narrative)
- Diagrams/visuals: 2-3 hours (form factor comparison, switch type visualization, keycap profile comparison, decision tree flowchart, budget tier overview)
- Review/revision: 2-3 hours (jargon check — every term must be explained, beginner accessibility validation)
- Total: ~12-17 hours across multiple sessions
