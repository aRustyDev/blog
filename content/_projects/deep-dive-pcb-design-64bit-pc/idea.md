---
id: "b2c3d4e5-2222-4bbb-c222-222222222205"
type: idea
status: draft
created: "2026-03-16T00:00:00Z"
updated: "2026-03-16T00:00:00Z"
---

## Concept

A build log designing a 64-bit computer PCB — the ultimate challenge, likely ARM64 or RISC-V 64. Covers BGA packaging (ball grid array soldering, escape routing, pad design, X-ray inspection), controlled impedance (impedance-matched trace design, differential pairs, length matching to picosecond tolerances), DDR4/5 routing (higher-speed memory interfaces pushing the limits of hobbyist PCB fabrication), high-speed differential pairs (USB 3.x, PCIe, HDMI — multi-gigabit signaling on a PCB), power integrity (power distribution network analysis, decoupling hierarchy, voltage regulator module design, IR drop), thermal management (thermal via arrays, heatsink mounting, copper pours for heat spreading, airflow considerations), multi-layer stackup design (8+ layers, blind and buried vias, impedance planning across the full stackup), and why this is at the edge of what's achievable without professional EE resources. Limits-first approach: explores what's actually possible for a determined individual and where the practical boundaries lie.

## Target Audience

Advanced hardware engineers and PCB designers who want to push the absolute limits of hobbyist capability. PCB design enthusiasts who want to understand what professional-grade high-speed digital design involves. Engineers considering whether to design custom 64-bit hardware for a product or project. Anyone following the PCB series who wants to see where the journey ultimately leads. Deep understanding of multi-layer PCB design, signal integrity fundamentals, and DDR memory — completion of the 32-bit build log or equivalent experience is assumed.

## Problem/Need

Designing a 64-bit computer PCB represents the frontier of what an individual can achieve without a full engineering team and professional-grade tools. The challenges are qualitatively different from anything below: BGA packages require precise escape routing and potentially X-ray inspection, DDR4/5 has timing tolerances measured in picoseconds, high-speed interfaces like USB 3.x and PCIe demand controlled impedance differential pairs, and the power delivery network must supply tens of amps at sub-volt tolerances. Most resources on 64-bit PCB design are either professional training courses (expensive, assume team context) or reference designs (complex, no design rationale). There's a gap for an honest exploration of what's achievable: what tools and skills are required, where the practical limits are, what workarounds exist, and how to decide whether a 64-bit custom board is the right approach vs using an off-the-shelf SoM (System on Module). This build log serves as both an aspirational endpoint for the series and a practical guide to making the go/no-go decision.

## Unique Angle

- **Limits-first** — frames the entire project around the question "what's actually possible for a determined individual?" — honestly exploring the boundaries of hobbyist capability rather than pretending everything is achievable with enough enthusiasm
- **BGA as the gatekeeper** — treats BGA packaging as the defining challenge: escape routing, via-in-pad, reflow profiles, inspection challenges, and the equipment/skill investment required
- **DDR4/5 at the edge** — pushes DDR routing to its practical limits, covering the jump from DDR3 to DDR4/5 in terms of speed, routing constraints, and whether hobbyist PCB fabrication can meet the tolerances
- **Multi-gigabit interfaces** — covers USB 3.x, PCIe, and HDMI as high-speed differential pair design challenges, each with unique routing and impedance requirements
- **Power integrity as a discipline** — introduces power distribution network (PDN) analysis as a serious engineering practice: impedance targets, decoupling hierarchy, plane resonance, and IR drop across the board
- **SoM vs custom trade-off** — provides an honest analysis of when to design a custom 64-bit board vs using a System on Module (Raspberry Pi CM4, NVIDIA Jetson, etc.), which may be the most valuable practical advice in the entire series
- **8+ layer PCB design** — covers the realities of 8-layer (or more) board design: cost, fabrication constraints, blind/buried vias, and the stackup engineering required

## Scope

**Included**: Processor selection (ARM64: Cortex-A72/A76 class SoCs, Rockchip RK3588, NXP i.MX8; RISC-V 64: StarFive JH7110, SiFive; SoM vs custom decision framework: when each makes sense, cost analysis, time-to-market), BGA design (BGA package overview: pitch, ball count, thermal pad; escape routing: dog-bone via pattern, via-in-pad with capping, fanout strategies; BGA land pattern design: NSMD vs SMD pads, solder mask considerations; assembly: reflow profile, BGA rework stations, X-ray inspection), DDR4/DDR5 memory (speed classes and timing requirements, fly-by vs T-topology routing, write leveling and read leveling, per-bit-deskew, routing length matching with picosecond tolerances, via count minimization, reference plane continuity, DDR4 vs DDR5 topology differences), high-speed differential interfaces (USB 3.x: 5-10 Gbps differential routing, impedance targets, AC coupling, connector design; PCIe: lane routing, reference clock, connector/edge finger design; HDMI: TMDS differential pairs, impedance requirements; general: differential pair routing rules, length matching, via transitions, connector launch design), power integrity (power distribution network design: target impedance, frequency-domain analysis concepts; decoupling hierarchy: bulk, mid-frequency, high-frequency capacitors; voltage regulator placement and output filtering; power plane design: split planes, plane stitching, current return paths; thermal considerations in power delivery; power sequencing for complex SoCs), multi-layer stackup (8-layer stackup design: SIG-GND-SIG-PWR-GND-SIG-GND-SIG and variations; 10-layer considerations; blind and buried vias: types, cost implications, design rules; impedance planning: single-ended and differential targets per layer; HDI awareness: when microvias become necessary), thermal management (thermal simulation basics, thermal via arrays under BGA, heatsink mounting design, copper pours for heat spreading, airflow considerations for passive/active cooling, thermal pad connection to internal planes), manufacturing at scale (8+ layer board fabrication: pricing, lead times, minimum orders; impedance-controlled fabrication: specifications and tolerances; BGA assembly: paste stencil design, reflow oven requirements, inspection options; prototype vs production considerations), practical limits assessment (honest evaluation of hobbyist vs professional boundaries, required equipment investment, skill progression path, when to use a SoM instead, cost-benefit analysis of custom 64-bit board)

**Excluded**: Custom silicon design, FPGA fabric design, 5G/mmWave RF design, data center board design, server-class multi-socket designs, DDR5 registered DIMMs, CXL interfaces, optical interconnects, production volume manufacturing and DFM optimization, formal EMC pre-compliance (awareness only), detailed BIOS/UEFI firmware development

## Research Needs

- Survey available 64-bit ARM and RISC-V SoC options accessible to individuals (not under NDA)
- Study reference designs from SoC vendors for 64-bit layout guidance
- Research DDR4 and DDR5 routing guidelines from JEDEC and memory manufacturers
- Evaluate 8+ layer PCB fabrication pricing and capabilities at prototype quantities
- Study BGA escape routing techniques and via-in-pad fabrication requirements
- Research high-speed differential pair routing best practices for USB 3.x, PCIe, HDMI
- Evaluate SoM options (CM4, Jetson, etc.) for honest comparison with custom design
- Study power distribution network analysis tools and techniques
- Research thermal management solutions for high-power SoCs on custom boards
- Compile equipment requirements and costs for BGA assembly and inspection

## Estimated Effort

- Research: 8-10 hours (SoC options, DDR4/5 routing, BGA design, high-speed interfaces, power integrity)
- Writing: 9-13 hours (7000-10000 word build log covering the most advanced PCB design challenges)
- Diagrams/screenshots: 5-7 hours (stackup diagrams, BGA escape routing, DDR routing, power distribution, differential pair illustrations)
- Build and test: 6-8 hours (complex assembly, bring-up, high-speed debugging)
- Review/revision: 2-3 hours
- Total: ~25-35 hours across multiple sessions
