---
id: "b2c3d4e5-2222-4bbb-c222-222222222206"
type: idea
status: draft
created: "2026-03-16T00:00:00Z"
updated: "2026-03-16T00:00:00Z"
---

## Concept

A build log designing a custom mechanical keyboard PCB — from switch matrix design to USB-C/BLE implementation. Covers key matrix scanning (row-column matrix, ghosting prevention with diodes, scanning algorithms), diode placement (per-key diodes, orientation, SMD vs through-hole, footprint design), microcontroller selection (RP2040 for USB simplicity, nRF52840 for Bluetooth, STM32 as an alternative — each with PCB implications), USB-C implementation (connector footprint, CC resistors, ESD protection, data line routing, USB 2.0 for HID), Bluetooth module integration (nRF52840 antenna design, RF layout considerations, battery management), RGB LED driving (per-key RGB with WS2812B or IS31FL3733/IS31FL3741 I2C LED drivers, power distribution for LEDs, PWM considerations), hot-swap socket footprints (Kailh and Gateron socket compatibility, pad design, mounting stability), plate/case integration (mounting hole placement, standoff design, USB connector positioning, switch plate alignment), QMK/ZMK firmware considerations in PCB design (pin assignment for matrix, hardware features that firmware expects, debug interfaces), and manufacturing/assembly (SMD assembly services for microcontroller and diodes, hand-soldering for through-hole components, testing each key). Matrix-first approach: the switch matrix is the heart of every keyboard PCB, and every other design decision flows from how you scan the keys.

## Target Audience

Keyboard enthusiasts who have built keyboards from kits and want to design their own PCB from scratch. Makers with soldering skills who want a practical PCB project with daily-use results. QMK/ZMK users who understand firmware but want to know how the hardware underneath works. Electronics hobbyists looking for a PCB project that's complex enough to learn real skills but produces something they'll actually use. Comfortable with basic electronics and soldering, familiar with mechanical keyboard concepts (switches, keycaps, layouts), willing to learn KiCad and PCB manufacturing for a project they'll type on every day.

## Problem/Need

The custom mechanical keyboard community has an enormous ecosystem of group buys, kits, and pre-designed PCBs, but designing your own keyboard PCB remains a black art. Most keyboard PCB tutorials cover either just the matrix schematic (ignoring the MCU, USB, and PCB layout) or provide a finished design without explaining the decisions. The gap between "I can solder a kit" and "I can design my own board" is huge, and the knowledge is scattered across Discord servers, forum posts, and undocumented GitHub repos. Key questions go unanswered: How does a switch matrix actually work at the electrical level? Why do you need diodes? How do you route USB-C correctly? What are the RF layout rules for Bluetooth keyboards? How do you design for hot-swap sockets? How do you integrate RGB lighting without brownouts? A structured build log that starts from the matrix and works outward would give keyboard enthusiasts the knowledge to design boards that match their exact layout preferences, feature requirements, and aesthetic vision.

## Unique Angle

- **Matrix-first** — starts from the switch matrix as the fundamental circuit and builds everything else around it, showing how matrix size and scanning method drive MCU selection, pin assignment, diode placement, and PCB routing
- **USB-C done right** — covers USB-C implementation with the detail keyboard designers need: connector footprint selection, CC resistor configuration for device mode, ESD protection, data line impedance, and the common mistakes that cause keyboards to not enumerate
- **Bluetooth as a first-class option** — treats wireless design seriously with nRF52840 antenna layout, RF keep-out zones, battery charging circuit, and the PCB layout constraints that make or break wireless reliability
- **Hot-swap socket engineering** — goes beyond "use Kailh sockets" to cover the mechanical and electrical design: pad geometry, mounting force, copper thickness requirements, and how hot-swap changes the PCB stackup requirements
- **RGB without brownouts** — addresses per-key RGB LED power distribution as a real engineering problem: current calculation, power rail routing, voltage drop across the matrix, and how to avoid the dimming/flickering issues that plague many custom boards
- **Firmware-hardware co-design** — explicitly connects PCB design decisions to QMK/ZMK firmware requirements: which pins for the matrix, how to expose debug interfaces, hardware features that enable firmware capabilities (encoders, OLED, RGB)
- **Daily-use motivation** — the result is something you'll use every day, which provides unique motivation and a concrete feedback loop for design decisions

## Scope

**Included**: Switch matrix design (row-column scanning theory, matrix size for common layouts: 60%, 65%, 75%, TKL; N-key rollover, ghosting prevention with diodes, scanning rate and debouncing considerations), diode implementation (1N4148 through-hole vs SOD-123 SMD, per-key placement, orientation conventions, footprint design in KiCad), microcontroller selection (RP2040: dual-core ARM Cortex-M0+, native USB, abundant GPIO, low cost, excellent QMK support; nRF52840: Bluetooth 5.0, USB, ZMK support, antenna requirements, battery management; STM32F072/F303: QMK standard, USB, mature ecosystem; pin count requirements vs layout size), USB-C implementation (USB 2.0 for HID: connector footprint options, CC1/CC2 pull-down resistors for device mode, D+/D- routing with impedance matching, ESD protection IC selection, shield grounding, common enumeration issues), Bluetooth design (nRF52840 module vs bare chip, antenna: PCB trace antenna vs chip antenna vs external, RF layout: keep-out zones, ground plane under antenna, component placement constraints; battery: LiPo charging IC, battery connector, power switching between USB and battery; low-power design: sleep modes, matrix scanning power), RGB LED implementation (WS2812B addressable LEDs: single data line, power requirements 60mA per LED at max; IS31FL3733/IS31FL3741: I2C LED drivers, constant current, better power control; per-key vs underglow; power distribution: bulk capacitors, trace width for current, voltage regulator sizing, power budget calculation), hot-swap sockets (Kailh hot-swap socket footprint, Gateron alternative, pad geometry and copper requirements, mounting hole placement, PCB thickness constraints, switch plate interaction), plate and case integration (switch plate alignment with PCB, mounting hole pattern, standoff height, USB connector clearance and positioning, gasket mount considerations, PCB flex and stiffness), stabilizer mounting (PCB-mount stabilizer footprint, screw-in vs clip-in, spacing requirements), KiCad workflow (keyboard-specific KiCad libraries: ai03 footprints, keyswitches.pretty; ergogen for parametric layout; schematic organization for large matrix; routing strategy for keyboard PCBs), QMK/ZMK firmware design (matrix pin assignment strategy, encoder support, OLED connector, split keyboard considerations, bootloader access button), manufacturing and assembly (2-layer PCB sufficient for most keyboards, JLCPCB/PCBWay assembly for SMD components, hand-soldering through-hole components, testing: per-key testing with tweezers, USB enumeration verification, Bluetooth pairing test)

**Excluded**: Custom keycap design, case CAD modeling in depth (mounting holes and connector placement only), detailed firmware development (PCB design perspective only), wireless charging, trackball/trackpoint integration, display integration beyond simple OLED connector, analog hall-effect switches, optical switches, group buy/manufacturing at scale, sound dampening and acoustic design, custom USB HID descriptors

## Research Needs

- Study popular open-source keyboard PCB designs (ai03 Polaris, Corne, Sofle, Lily58) for layout patterns
- Review KiCad keyboard-specific libraries and workflows (ai03, keyswitches.pretty, ergogen)
- Research nRF52840 antenna design guidelines for keyboard form factors
- Study USB-C implementation requirements for HID devices (resistors, ESD, enumeration)
- Review hot-swap socket datasheets for accurate footprint design
- Research RGB LED power distribution best practices for large matrices (60+ LEDs)
- Study QMK and ZMK hardware requirements and pin assignment conventions
- Review Kailh/Gateron hot-swap socket specifications and PCB requirements
- Research battery management ICs for Bluetooth keyboard applications
- Study keyboard PCB manufacturing options and assembly services for mixed SMD/THT

## Estimated Effort

- Research: 5-6 hours (matrix design, USB-C, Bluetooth, hot-swap, RGB, firmware integration)
- Writing: 6-9 hours (5000-7000 word build log covering matrix through manufacturing)
- Diagrams/screenshots: 3-4 hours (matrix schematic, USB-C circuit, BLE block diagram, layout screenshots)
- Build and test: 4-5 hours (assembly, key testing, firmware flashing, daily use validation)
- Review/revision: 2-3 hours
- Total: ~16-22 hours across multiple sessions
