---
id: "b2c3d4e5-2222-4bbb-c222-222222222203"
type: idea
status: draft
created: "2026-03-16T00:00:00Z"
updated: "2026-03-16T00:00:00Z"
---

## Concept

A build log designing a 16-bit computer PCB — stepping up from 8-bit to 68000 or similar 16-bit architecture. Covers the jump in complexity (wider data and address buses, more address space requiring more complex decoding, DMA controllers for efficient data transfer), multi-board design considerations (when a single PCB isn't enough, backplane architectures, board-to-board connectors), memory management (MMU concepts, memory protection, larger address spaces), interrupt controllers (prioritized interrupt handling, vectored interrupts, interrupt acknowledge cycles), video output basics (frame buffer design, character generator, VGA timing), and the engineering tradeoffs when moving beyond hobby-scale to something approaching a real computer system. Architecture-first approach: understanding 16-bit architecture decisions reveals why personal computers evolved the way they did.

## Target Audience

Retro computing builders who have completed an 8-bit project and want a greater challenge. Hardware engineers interested in the historical evolution from 8-bit to 16-bit architectures. Anyone who completed the 8-bit PC build log and wants to level up their PCB design skills. Computer history enthusiasts who want to understand the Amiga/Atari ST/early Mac era at the hardware level. Comfortable with 8-bit computer architecture, ready to tackle wider buses and more complex timing, willing to work with mixed through-hole and SMD components.

## Problem/Need

The jump from 8-bit to 16-bit computing was one of the most significant leaps in personal computer history, but it's poorly documented from a build-your-own perspective. Most retro computing projects stop at 8-bit because the complexity increase feels overwhelming — wider buses mean more routing, more address space means more complex decoding, and peripherals like video output introduce timing-critical design challenges. Existing 16-bit homebrew projects tend to be finished products shared on forums without detailed design rationale. There's a gap for a structured build log that explains each decision point: why choose the 68000 over the 8086, how to handle a 24-bit address bus on a PCB, when to split across multiple boards, and how interrupt controllers and DMA change the PCB design equation. This project bridges the gap between the approachable 8-bit build and the professional-grade 32-bit and 64-bit challenges ahead.

## Unique Angle

- **Architecture-first** — frames the 16-bit jump through the lens of architectural decisions: wider buses, larger address spaces, DMA, and interrupt controllers, explaining why each advancement demanded new PCB design techniques
- **Complexity scaling** — explicitly compares to the 8-bit build at every stage, showing what changes when you double (or more) the bus width and what new challenges emerge
- **68000 as the exemplar** — uses the Motorola 68000 (or a modern equivalent) as the CPU choice, connecting to the Amiga, Atari ST, and early Macintosh heritage while providing a clean 32-bit-internal/16-bit-external architecture to work with
- **Multi-board design introduction** — addresses the practical reality that complex 16-bit systems may benefit from a modular approach: CPU board, memory board, I/O board connected via a backplane or board-to-board connectors
- **Video output as a design challenge** — introduces frame buffer and character generator design as the first truly timing-critical PCB challenge in the series, where signal integrity starts to matter
- **Historical context** — connects design decisions to the real computers of the 16-bit era, helping readers understand why the Amiga, Atari ST, and Macintosh made the hardware choices they did

## Scope

**Included**: CPU selection (68000 family: original 68000, 68010, 68SEC000 — pin count, bus timing, availability; comparison with 8086/80286 from a PCB perspective; why 68000's clean architecture suits a learning project), bus architecture (16-bit data bus routing, 24-bit address bus, asynchronous bus timing, bus buffering and drive strength), address decoding (24-bit address space partitioning, programmable address decoder options, ROM/RAM/IO mapping for larger memory spaces), memory system (larger SRAM arrays, DRAM introduction and refresh timing considerations, memory wait states, byte vs word access handling), DMA controller (purpose and benefits, DMA controller IC selection, bus arbitration, PCB implications of DMA), interrupt system (vectored interrupts, interrupt priority levels, interrupt acknowledge cycle, interrupt controller design), video output (character-mode display as minimum viable output, frame buffer memory, VGA timing generation, video DAC, PCB routing for video signals), I/O subsystem (enhanced UART, parallel port, SPI/I2C for modern peripherals, expansion bus design), power supply (increased current requirements, multiple voltage rails if needed, thermal considerations), PCB design evolution (4-layer board consideration, wider bus routing strategies, mixed through-hole and SMD, signal integrity basics at 8-10 MHz), multi-board design (when to split, backplane design, board-to-board connectors, signal integrity across connectors), manufacturing and assembly (mixed-technology assembly, increased BOM complexity, testing strategy for more complex system)

**Excluded**: Full operating system development (hardware focus), detailed 68000 programming (assembly reference only as needed), custom ASIC/FPGA replacements for glue logic (discrete logic focus), networking hardware, mass storage interfaces in depth (IDE/SCSI), audio subsystem, production-quality video output (basic character/framebuffer only), detailed DRAM controller design (SRAM focus with DRAM mentioned as future direction)

## Research Needs

- Evaluate 68000-family CPU availability and modern sources (68SEC000, used 68000 chips)
- Study existing homebrew 68000 computer projects (Rosco_m68k, 68 Katy, others)
- Research 4-layer PCB design considerations and cost implications for prototyping
- Study VGA timing requirements and character generator design approaches
- Review DMA controller options compatible with 68000 bus architecture
- Research multi-board interconnect options (backplane, pin headers, edge connectors)
- Study 68000 bus timing diagrams for accurate PCB timing analysis
- Compare 16-bit era computer architectures for design inspiration (Amiga, Atari ST, Mac)

## Estimated Effort

- Research: 6-8 hours (68000 architecture, reference designs, bus timing, video output, multi-board design)
- Writing: 8-11 hours (6000-8000 word build log with architecture decisions and layout details)
- Diagrams/screenshots: 4-6 hours (block diagrams, bus timing, memory map, schematic excerpts, layout views)
- Build and test: 5-7 hours (more complex assembly and debugging)
- Review/revision: 2-3 hours
- Total: ~20-28 hours across multiple sessions
