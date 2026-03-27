# Deep Dive: PCB Design - Custom Keyboard

> From switch matrix to USB-C to Bluetooth — designing a mechanical keyboard PCB you'll type on every day.

## Status

**Phase**: ideation
**Persona**: not set

## Overview

A build log designing a custom mechanical keyboard PCB, covering key matrix scanning, diode placement, microcontroller selection (RP2040, nRF52840), USB-C implementation, Bluetooth module integration, RGB LED driving, hot-swap socket footprints, plate/case integration, QMK/ZMK firmware considerations in PCB design, and manufacturing/assembly. Matrix-first approach: the switch matrix is the heart of every keyboard PCB, and every other design decision flows from how you scan the keys.

## Artifacts

- [Idea](./idea.md)

## Posts

| Post | Status | Link |
|------|--------|------|

## Notes

- Matrix-first framing builds the entire design outward from the switch matrix
- USB-C implementation covered with the detail keyboard designers actually need (CC resistors, ESD, enumeration)
- Bluetooth treated as a first-class design option with proper RF layout considerations
- Hot-swap socket engineering goes beyond "use Kailh sockets" to cover pad geometry and mechanical design
- RGB power distribution addressed as a real engineering problem (current calculation, voltage drop)
- Firmware-hardware co-design connects PCB decisions to QMK/ZMK requirements
- Related to existing keebs series (getting-started, corne-ish-zen) for cross-referencing
