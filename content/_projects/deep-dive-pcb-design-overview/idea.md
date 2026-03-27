---
id: "b2c3d4e5-2222-4bbb-c222-222222222201"
type: idea
status: draft
created: "2026-03-16T00:00:00Z"
updated: "2026-03-16T00:00:00Z"
---

## Concept

A deep-dive overview of PCB design — from schematic capture to board layout to manufacturing. Covers EDA tools (KiCad, Altium, Eagle), PCB fundamentals (layers, traces, vias, pads, copper pours), component selection (through-hole vs SMD, package types, sourcing and availability), design rules (clearance, trace width, annular rings, design rule checks), the manufacturing process (gerber file generation, pick-and-place, solder paste stencils, reflow soldering, wave soldering), and prototyping services (JLCPCB, PCBWay, OSH Park — pricing, lead times, capabilities). Fundamentals-first approach: understand the entire PCB design pipeline before diving into specific projects. Entry point for the PCB design series.

## Target Audience

Software engineers curious about hardware who want to understand how circuit boards are designed and manufactured. Makers who have outgrown breadboards and perfboard and want to create professional-quality PCBs. CS students interested in the hardware side of computing. Engineers who work adjacent to hardware teams and want to speak the language. Comfortable with basic electronics concepts (voltage, current, resistance), willing to learn EDA tooling and manufacturing constraints.

## Problem/Need

Most software engineers interact with hardware daily but have no understanding of how circuit boards are designed, manufactured, or why they look the way they do. The jump from breadboard prototype to PCB feels insurmountable — the tooling is complex, the terminology is specialized, and the manufacturing process is opaque. Existing PCB tutorials either focus narrowly on one tool (KiCad tutorials) or assume significant EE background. There's a gap for a structured overview that covers the entire pipeline: from schematic capture through board layout through manufacturing, explaining why each step exists and what decisions matter. Without this foundation, the project-specific build logs (8-bit PC, keyboard, etc.) lack the context readers need to follow along or adapt the designs to their own projects.

## Unique Angle

- **Fundamentals-first** — covers the entire PCB design pipeline as a coherent process rather than isolated tool tutorials, giving readers a mental model of how schematic capture, board layout, design rules, and manufacturing connect
- **EDA tool landscape** — compares KiCad (free, open-source, increasingly capable), Altium Designer (industry standard, expensive), Eagle (historically popular, now Autodesk Fusion), and others, helping readers choose the right tool for their situation
- **PCB anatomy** — demystifies layers (copper, solder mask, silkscreen, substrate), trace geometry (width, spacing, impedance), vias (through-hole, blind, buried, micro), pads and footprints, copper pours and ground planes with visual explanations
- **Design rules as engineering constraints** — explains why design rules exist (manufacturing tolerances, electrical requirements, reliability) rather than just listing numbers, so readers can reason about tradeoffs
- **Manufacturing demystified** — walks through gerber generation, PCB fabrication (etching, drilling, plating, solder mask, silkscreen), assembly (solder paste, pick-and-place, reflow), and inspection/testing, so readers understand what happens after they click "order"
- **Prototyping service comparison** — honest comparison of JLCPCB, PCBWay, OSH Park, and others based on pricing, capabilities, quality, lead times, and assembly options
- **Series entry point** — explicitly connects to the build log deep-dives (8-bit PC, 16-bit PC, 32-bit PC, 64-bit PC, custom keyboard), giving readers a roadmap based on their interests and skill level

## Scope

**Included**: EDA tool overview (KiCad: schematic editor, PCB editor, footprint libraries, 3D viewer, gerber export; Altium Designer: professional features, licensing, learning curve; Eagle/Fusion: historical significance, current state; other tools: EasyEDA, Horizon EDA), PCB fundamentals (board structure: substrate/FR4, copper layers, solder mask, silkscreen, surface finish; traces: width calculation, current carrying capacity, impedance; vias: types, when to use each, thermal relief; pads: through-hole vs SMD, footprint standards; copper pours: ground planes, power planes, thermal management; layer stackup: 2-layer, 4-layer, 6-layer, when to use each), component selection (through-hole vs SMD tradeoffs, common package types: DIP, SOIC, QFP, BGA, 0402/0603/0805 passives, sourcing: Digi-Key, Mouser, LCSC, availability and lifecycle), design rules (clearance and spacing, trace width for current and impedance, annular ring requirements, drill sizes, solder mask expansion, design rule checks in EDA tools, manufacturer-specific constraints), schematic capture (hierarchical schematics, symbol libraries, net naming, power flags, electrical rule checks), board layout process (component placement strategy, routing: manual vs autorouter, ground plane design, decoupling capacitor placement, thermal considerations, silkscreen design), manufacturing (gerber file format and generation, drill files, bill of materials, centroid/pick-and-place files, PCB fabrication process, assembly options: hand soldering, reflow, professional assembly), prototyping services (JLCPCB, PCBWay, OSH Park: capabilities, pricing, lead times, assembly services, parts sourcing), testing and debugging (visual inspection, continuity testing, power-on testing, debugging common issues)

**Excluded**: Detailed circuit design theory (covered in electronics fundamentals), specific project implementations (covered in per-project deep-dives), advanced RF/microwave PCB design, flex and rigid-flex PCB design, high-density interconnect (HDI) in depth, IC/ASIC design (separate domain), detailed signal integrity simulation, EMC compliance testing and certification, production-scale manufacturing and supply chain

## Research Needs

- Compare current KiCad (v8+) capabilities against Altium and other professional tools
- Review current pricing and capabilities of major prototyping services (JLCPCB, PCBWay, OSH Park)
- Study PCB manufacturing process details for accurate technical descriptions
- Research common beginner mistakes in PCB design and how to avoid them
- Review PCB design rule constraints across popular manufacturers
- Compile component package reference with visual examples
- Study current best practices for layer stackup design
- Research IPC standards relevant to hobbyist/prototype PCB design

## Estimated Effort

- Research: 4-5 hours (EDA tools, manufacturing processes, prototyping services, design rules)
- Writing: 5-7 hours (3500-5000 word deep-dive covering the full PCB pipeline)
- Diagrams: 3-4 hours (PCB cross-section, layer stackup, trace geometry, manufacturing flow, tool comparison)
- Review/revision: 2-3 hours
- Total: ~14-18 hours across multiple sessions
