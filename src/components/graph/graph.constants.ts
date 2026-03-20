// src/components/graph/graph.constants.ts
// Browser-only module — uses document, getComputedStyle
// NEVER import this from build-graph.ts or other Node.js scripts

/** Resolve a CSS custom property to a computed hex value */
export function resolveThemeColor(varName: string, fallback: string): string {
  try {
    const val = getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim();
    return val || fallback;
  } catch {
    return fallback;
  }
}

/** Lighten or darken a hex color by an amount (+lighter, -darker) */
export function adjustColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, Math.max(0, ((num >> 16) & 0xff) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0xff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

/** Get a slightly offset background for the sigma canvas */
export function getSigmaBackground(): string {
  const bg = resolveThemeColor("--background", "#0d1117");
  // Guard against non-hex values (e.g., CSS var() not yet resolved)
  if (!bg.startsWith("#") || bg.length < 7) return "#191f27"; // safe dark fallback
  const num = parseInt(bg.replace("#", ""), 16);
  if (isNaN(num)) return "#191f27";
  const lum =
    ((num >> 16) & 0xff) * 0.299 +
    ((num >> 8) & 0xff) * 0.587 +
    (num & 0xff) * 0.114;
  return adjustColor(bg, lum > 128 ? -12 : 12);
}

/** Guard: ensure a value is a valid 6-digit hex before appending alpha */
function ensureHex(value: string, fallback: string): string {
  if (value.startsWith("#") && value.length >= 7) return value.slice(0, 7);
  return fallback;
}

/** Resolve all dim colors at once (call once per theme change, not per frame).
 *  All values are 8-digit hex (#RRGGBBAA) safe for sigma WebGL. */
export interface DimColors {
  nodeFiltered: string; // very dim — filtered out
  nodeDimmed: string; // medium dim — not in hover neighborhood
  edgeFiltered: string; // very dim edge
  edgeDimmed: string; // medium dim edge
}

export function resolveDimColors(): DimColors {
  const border = ensureHex(resolveThemeColor("--border", "#30363d"), "#30363d");
  return {
    nodeFiltered: border + "15",
    nodeDimmed: border + "40",
    edgeFiltered: border + "08",
    edgeDimmed: border + "20",
  };
}

/** Resolve a theme color with hex guard — safe for sigma WebGL alpha append */
export function resolveHexColor(varName: string, fallback: string): string {
  return ensureHex(resolveThemeColor(varName, fallback), fallback);
}

/** Shared mutable ref for cached dim colors — updated by ThemeObserver, read by FilterController and GraphSearch.
 *  Initialized with hardcoded fallbacks (not DOM-resolved) to be SSR-safe.
 *  ThemeObserver calls resolveDimColors() on first frame to populate with live values. */
export const dimColorsRef: { current: DimColors } = {
  current: {
    nodeFiltered: "#30363d15",
    nodeDimmed: "#30363d40",
    edgeFiltered: "#30363d08",
    edgeDimmed: "#30363d20",
  },
};
