---
id: "f487d7fa-6fe5-4772-97c2-7c660039c831"
type: idea
status: draft
created: "2026-03-15T00:00:00Z"
updated: "2026-03-15T00:00:00Z"
---

## Concept

Document the journey of designing and taping out a custom ASIC — from zero experience to a fabricated chip. This is a multi-post project covering the full pipeline: HDL design, simulation, synthesis, place-and-route, DRC/LVS, and tapeout via an open-source shuttle (e.g., Efabless/Google shuttle with SkyWater 130nm PDK). Two complementary angles: a "zero to ASIC" educational series explaining the process, and a "my first ASIC" narrative documenting the personal experience of going through it.

## Target Audience

Software engineers and hardware-curious developers who want to understand how chips are made but have never done it. Also appeals to CS students, embedded engineers, and hobbyists interested in the democratization of chip design through open-source tools (OpenLane, Yosys, Magic, KLayout). Comfortable with code but may not know Verilog or VLSI concepts.

## Problem/Need

Custom chip design has historically been gated behind expensive EDA tools and proprietary PDKs. Open-source shuttles (Efabless, TinyTapeout) have lowered the barrier dramatically, but most documentation is either academic (assumes VLSI background) or too shallow (just "run the script"). There's a gap for content that walks through the full pipeline with a software engineer's perspective — explaining the *why* alongside the *how*, with honest accounts of what's confusing and where things go wrong.

## Unique Angle

- **Dual structure**: "Zero to ASIC" (educational, explains concepts) + "My First ASIC" (narrative, documents the journey) — readers can follow the theory or the story or both
- Software engineer's perspective — explains VLSI concepts in terms familiar to software developers (synthesis ≈ compilation, place-and-route ≈ linking/layout, DRC ≈ linting)
- Hands-on with open-source tooling: OpenLane 2, Yosys, Magic, KLayout, SkyWater 130nm PDK
- Covers the full pipeline end-to-end, not just one step
- Honest about the learning curve — what's hard, what's confusing, what resources actually helped

## Scope

**Included**: HDL design (Verilog/SystemVerilog basics), simulation (cocotb, iverilog), synthesis (Yosys), place-and-route (OpenLane), DRC/LVS (Magic), tapeout submission (Efabless), open-source PDK (SkyWater 130nm), the design-to-GDS pipeline, practical tooling setup

**Excluded**: Analog/mixed-signal design, advanced VLSI optimization, FPGA-specific content (separate topic), closed-source EDA tools (Cadence, Synopsys), chip packaging and board design (downstream topics)

## Research Needs

- Review Efabless shuttle process and current submission requirements
- Review SkyWater 130nm PDK documentation and design rules
- Survey OpenLane 2 documentation and tutorials
- Review TinyTapeout as an alternative/complementary path
- Gather existing "first ASIC" blog posts and identify gaps in coverage
- Learn/review Verilog basics and cocotb testing framework
- Understand the GDS-II format and what the final deliverable looks like
- Map the full design pipeline: RTL → synthesis → floorplan → placement → CTS → routing → signoff

## Estimated Effort

- Research: 8-12 hours (tooling setup, PDK review, pipeline understanding)
- Hands-on: 20-40 hours (actually designing and taping out a simple ASIC — this is the project itself)
- Writing: 10-15 hours (multiple posts, 2000-3000 words each)
- Diagrams: 4-6 hours (pipeline diagrams, layout screenshots, tool flow)
- Review/revision: 3-5 hours
- Total: ~45-78 hours across many sessions (this is a large project with a real hardware deliverable)
