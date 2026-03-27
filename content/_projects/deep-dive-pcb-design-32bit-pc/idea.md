---
id: "b2c3d4e5-2222-4bbb-c222-222222222204"
type: idea
status: draft
created: "2026-03-16T00:00:00Z"
updated: "2026-03-16T00:00:00Z"
---

## Concept

A build log designing a 32-bit computer PCB — ARM or RISC-V based, bridging retro and modern. Covers SoC vs discrete design decisions (when to use an application processor vs discrete components, the tradeoffs of integration), DDR memory interfacing challenges (DDR2/DDR3 routing requirements, length matching, termination), high-speed signal integrity (transmission line effects, impedance control, crosstalk, return paths), multi-layer PCB design (4-layer and 6-layer stackups, power/ground plane design, signal layer allocation), boot firmware (bootloader chain, device tree, bringing up a custom board), and the point where hobby meets professional EE — where PCB design gets serious about signal integrity and layer stackups. Complexity-first approach: 32-bit is where the rules change and amateur techniques start to fail.

## Target Audience

Ambitious hardware hackers who want to push beyond hobby-level PCB design into professional territory. EE students who want practical experience with high-speed digital design. RISC-V enthusiasts who want to build their own RISC-V SBC from scratch. Makers who have completed simpler PCB projects and want a serious challenge. Anyone who completed the 16-bit build and wants to understand why modern hardware requires such different design techniques. Comfortable with multi-layer PCB concepts, willing to learn signal integrity fundamentals, prepared for a significant time investment.

## Problem/Need

The jump from 16-bit to 32-bit computing isn't just wider buses — it's a fundamental shift in PCB design methodology. Clock speeds that require controlled impedance, DDR memory that demands precise length matching, and processors that need multi-layer boards with proper power delivery make this a qualitatively different challenge. Most hobbyists hit a wall here because the techniques that worked for 8-bit and 16-bit projects (2-layer boards, manual routing, ignoring impedance) simply don't work at 32-bit speeds. Professional PCB design education is expensive and assumes a full EE background. Open-source SBC designs (like BeagleBone) exist but are complex enough that learning from them without guidance is impractical. There's a gap for a build log that bridges the hobby-professional divide, explaining why signal integrity matters now, how to design a proper layer stackup, and what changes when you move from through-hole to BGA or QFP processors.

## Unique Angle

- **Complexity-first** — frames 32-bit as the inflection point where PCB design transitions from hobby to engineering discipline, explicitly calling out which rules change and why amateur techniques fail at these speeds
- **SoC vs discrete** — provides a genuine engineering analysis of when to use an application processor (ARM Cortex-A, RISC-V) vs discrete components, and what each choice means for PCB complexity
- **DDR memory as the defining challenge** — treats DDR routing as the central PCB design challenge of a 32-bit system, covering length matching, differential pairs, termination, and decoupling in detail
- **Signal integrity introduction** — provides a practical introduction to signal integrity: transmission line effects, impedance control, return paths, crosstalk — the concepts that separate working boards from non-working boards at these speeds
- **Multi-layer stackup design** — explains 4-layer and 6-layer PCB stackups as engineering decisions: which layers carry signals, which carry power/ground, how the stackup affects impedance and EMI
- **Boot firmware reality** — covers the often-overlooked challenge of bringing up a custom 32-bit board: bootloader chain, device tree configuration, serial console debugging, and the firmware development that makes hardware useful

## Scope

**Included**: Processor selection (ARM Cortex-A series: A7, A53 — availability, reference designs, documentation; RISC-V options: Allwinner D1, StarFive JH7110 — open ISA appeal, ecosystem maturity; SoC evaluation criteria: documentation quality, reference designs, community support, BGA vs QFP packaging), DDR memory design (DDR3/DDR3L as practical target: lower speed than DDR4/5 but still demanding; routing requirements: differential clock, data byte groups, address/command; length matching: intra-group and inter-group tolerances; termination: ODT, external termination; decoupling: bulk and per-pin; PCB stackup requirements for DDR), high-speed signal integrity (transmission line theory basics: when traces become transmission lines, characteristic impedance; impedance control: trace width, dielectric thickness, reference planes; return paths: why ground planes matter, via transitions; crosstalk: spacing, guard traces, layer assignment; signal integrity simulation tools overview), multi-layer PCB design (4-layer stackup: SIG-GND-PWR-SIG, cost-effective for many designs; 6-layer stackup: SIG-GND-SIG-SIG-PWR-SIG, better for DDR routing; power plane design: split planes, power integrity, decoupling strategy; via design: via impedance, via stubs, back-drilling awareness), power supply design (PMIC or discrete regulators, multiple voltage rails: core, I/O, DDR, power sequencing requirements, current estimation, thermal management), boot firmware (boot ROM, SPL/U-Boot chain, device tree basics, serial console as first debug output, JTAG for hardware debugging), peripheral interfaces (USB, Ethernet RMII/RGMII, SD card, SPI flash for boot, HDMI/display output considerations), PCB layout methodology (placement-driven design, escape routing from BGA/QFP, critical signal routing priority, power distribution network, thermal pad and via design), manufacturing considerations (minimum 4-layer board, impedance-controlled fabrication, assembly with fine-pitch components, reflow requirements, BGA inspection challenges)

**Excluded**: Custom silicon/ASIC design, GPU implementation, PCIe interface design (too complex for this scope), DDR4/DDR5 (DDR3 is complex enough for learning), wireless radio design (Wi-Fi, Bluetooth — separate RF domain), production-ready design (prototype/learning focus), detailed Linux kernel porting (boot firmware only), FPGA-based SoC designs, camera interfaces (MIPI CSI), display interfaces in depth (MIPI DSI)

## Research Needs

- Evaluate available ARM Cortex-A and RISC-V SoC options for hobbyist-accessible designs
- Study reference designs from SoC manufacturers for layout guidance
- Research DDR3 routing guidelines from memory manufacturers (Micron, ISSI)
- Study impedance calculation tools and stackup design resources
- Review open-source SBC designs (BeagleBone, MangoPi, StarFive VisionFive) for layout techniques
- Research power management IC options for multi-rail SoC power supplies
- Study U-Boot and device tree configuration for custom boards
- Compile signal integrity learning resources and simulation tool options
- Research impedance-controlled PCB fabrication pricing and capabilities at prototype quantities

## Estimated Effort

- Research: 7-9 hours (SoC selection, DDR routing, signal integrity, reference designs, boot firmware)
- Writing: 8-12 hours (6000-9000 word build log covering the professional-level design challenges)
- Diagrams/screenshots: 5-6 hours (stackup diagrams, DDR routing examples, impedance illustrations, block diagrams)
- Build and test: 5-7 hours (assembly, bring-up, debugging with JTAG/serial)
- Review/revision: 2-3 hours
- Total: ~22-30 hours across multiple sessions
