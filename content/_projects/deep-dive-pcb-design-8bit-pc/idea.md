---
id: "b2c3d4e5-2222-4bbb-c222-222222222202"
type: idea
status: draft
created: "2026-03-16T00:00:00Z"
updated: "2026-03-16T00:00:00Z"
---

## Concept

A build log designing an 8-bit computer on a PCB — from Ben Eater-style breadboard to a proper PCB. Covers 6502/Z80 CPU selection and tradeoffs, address decoding logic (memory maps, chip select), clock circuits (crystal oscillators, clock dividers), ROM/RAM interfacing (EEPROM, SRAM, address/data bus routing), I/O implementation (UART for serial communication, GPIO for general-purpose control), power regulation (5V supply, decoupling, power plane design), schematic design in KiCad (hierarchical sheets, bus notation, component selection), PCB layout considerations for through-hole components (DIP packages, socket placement, routing wide buses), and testing/debugging strategies (logic analyzer hookups, test points, power-on sequence). Simplicity-first approach: an 8-bit PC is complex enough to be interesting but simple enough to understand every signal on the board.

## Target Audience

Ben Eater fans who have built breadboard computers and want to take the next step to a real PCB. Retro computing enthusiasts who want to build their own 6502 or Z80 system from scratch. Hardware beginners who understand basic digital logic and are ready to learn PCB design through a concrete project. Makers who want a challenging but achievable first PCB project. Comfortable with basic digital electronics (logic gates, flip-flops, memory), familiar with the concept of a CPU executing instructions, willing to learn KiCad and PCB manufacturing workflows.

## Problem/Need

The Ben Eater breadboard computer series has inspired thousands of people to build 8-bit computers, but breadboard builds are fragile, unreliable, and impractical as permanent projects. The jump from breadboard to PCB is intimidating — translating a working breadboard circuit to a schematic, then to a PCB layout, requires skills that most breadboard builders don't have. Existing resources either focus on breadboard builds (ignoring the PCB transition) or show finished PCB designs without explaining the design process. There's a gap for a detailed build log that walks through every decision: why this CPU, how to route a data bus on a PCB, where to place decoupling caps, how to handle the clock distribution, and what changes when you move from breadboard to PCB. The 8-bit computer is the perfect starting point because the complexity is manageable — every signal is understandable, the components are through-hole (easier for beginners), and the clock speeds are low enough that signal integrity isn't a concern.

## Unique Angle

- **Simplicity-first** — frames the 8-bit PC as the ideal first PCB project: complex enough to learn real PCB design skills but simple enough that every signal on the board can be understood and traced
- **Breadboard-to-PCB transition** — explicitly addresses the gap between having a working breadboard build and designing a proper PCB, covering what changes, what stays the same, and common pitfalls in the transition
- **CPU selection rationale** — compares 6502 and Z80 architectures from a PCB design perspective (pin count, bus timing, support chip ecosystem, availability), not just a programming perspective
- **Through-hole focus** — embraces DIP packages and through-hole components as deliberate design choices for an 8-bit build, explaining when through-hole is actually the right call and how it simplifies the PCB layout
- **Complete build log** — documents the entire process from schematic capture through PCB layout through ordering, assembly, and testing, including mistakes and iterations
- **Test and debug strategy** — covers how to design for debuggability: test points on key signals, LED indicators, logic analyzer headers, and systematic power-on testing procedures

## Scope

**Included**: CPU selection (6502 vs Z80: architecture comparison for PCB design, pin count, bus timing requirements, support chip availability, sourcing considerations; WDC 65C02 or Z84C00 as modern CMOS options), clock circuit design (crystal oscillator selection, clock buffer/distribution, clock divider for peripherals, PCB layout for clean clock signals), address decoding (memory map design, address decoder using 74-series logic or GAL, chip select generation, ROM/RAM/IO address ranges), memory interfacing (EEPROM: AT28C256 or similar, programming considerations; SRAM: 62256 or similar, timing analysis; bus routing on PCB: address bus, data bus, control signals), I/O implementation (UART: 6551 ACIA or 16550, serial communication for terminal; GPIO: 6522 VIA or 8255 PPI, basic input/output), power supply (5V regulation, input protection, decoupling strategy: bulk and per-chip, power plane design on 2-layer board), schematic design in KiCad (project setup, hierarchical sheets for CPU/memory/IO/power, symbol selection and custom symbols, bus notation, net naming conventions, electrical rule checks), PCB layout (board size and mounting hole planning, component placement strategy, DIP socket placement and spacing, bus routing techniques, ground plane on bottom layer, silkscreen labeling, test point placement, connector placement), manufacturing (gerber generation, BOM preparation, ordering from JLCPCB/PCBWay, hand assembly of through-hole components, soldering tips), testing and debugging (visual inspection checklist, continuity testing, isolated power-on testing, ROM programming and first boot, logic analyzer debugging, common failure modes and solutions)

**Excluded**: Detailed CPU programming/software (this is a PCB design build log), operating system development, SMD components (through-hole focus for this project), multi-layer boards (2-layer is sufficient for 8-bit), video output implementation (keeps scope manageable), sound generation, keyboard input (UART terminal is sufficient for this build), custom case/enclosure design, FPGA-based alternatives

## Research Needs

- Compare WDC 65C02 and Z84C00 availability, pricing, and PCB design implications
- Study existing open-source 8-bit computer PCB designs for layout inspiration
- Review decoupling capacitor placement best practices for through-hole DIP designs
- Research clock distribution techniques for low-speed digital circuits
- Study KiCad hierarchical schematic best practices for computer designs
- Review bus routing techniques for wide parallel buses on 2-layer PCBs
- Compile component sourcing information (availability, pricing, recommended suppliers)
- Research logic analyzer header standards and test point best practices

## Estimated Effort

- Research: 5-7 hours (CPU selection, reference designs, component sourcing, layout techniques)
- Writing: 7-10 hours (5000-7000 word build log with detailed schematic and layout decisions)
- Diagrams/screenshots: 4-5 hours (schematic excerpts, layout screenshots, memory map, block diagram)
- Build and test: 4-6 hours (actual PCB assembly and testing for authenticity)
- Review/revision: 2-3 hours
- Total: ~18-24 hours across multiple sessions
