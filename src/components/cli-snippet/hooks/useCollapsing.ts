import { useState, useMemo, useEffect, useCallback } from "react";
import type { TokenMap, TokenMeta } from "../types";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type PairType = "{}" | "[]" | "()" | '""' | "''";

export interface BracketPair {
  id: string;
  type: PairType;
  openLine: number;
  openCol: number;
  closeLine: number;
  closeCol: number;
  depth: number;
  children: string[];
}

export interface CollapsingOptions {
  enabled?: boolean;
  defaultCollapsed?: string[];
}

export interface CollapsingResult {
  pairs: BracketPair[];
  togglePair: (id: string) => void;
  isCollapsed: (id: string) => boolean;
  collapsePair: (id: string) => void;
  expandPair: (id: string) => void;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const BRACKET_OPENERS: Record<string, PairType> = {
  "{": "{}",
  "[": "[]",
  "(": "()",
};

const BRACKET_CLOSERS: Record<string, PairType> = {
  "}": "{}",
  "]": "[]",
  ")": "()",
};

const INDICATOR_TEXT: Record<PairType, string> = {
  "{}": "{...}",
  "[]": "[...]",
  "()": "(...)",
  '""': '"..."',
  "''": "'...'",
};

/** Brackets inside strings or comments should be ignored */
const IGNORE_SCOPES = /^(string\.|comment\.)/;

/** Quote scope detection */
const QUOTE_SCOPE_RE = /^string\.quoted\.(double|single)\./;

/* ------------------------------------------------------------------ */
/*  Pair Detection: Brackets (stack-based character matching)          */
/* ------------------------------------------------------------------ */

interface StackEntry {
  type: PairType;
  token: TokenMeta;
  depth: number;
}

function detectBracketPairs(tokenMap: TokenMap): BracketPair[] {
  const pairs: BracketPair[] = [];
  const stack: StackEntry[] = [];
  let idCounter = 0;

  for (const token of tokenMap.allTokens) {
    const text = token.text.trim();
    if (text.length !== 1) continue;

    // Skip brackets inside strings or comments
    if (token.scope && IGNORE_SCOPES.test(token.scope)) continue;

    if (text in BRACKET_OPENERS) {
      stack.push({
        type: BRACKET_OPENERS[text],
        token,
        depth: stack.length,
      });
    } else if (text in BRACKET_CLOSERS) {
      const closerType = BRACKET_CLOSERS[text];
      // Walk stack backward to find matching opener type
      for (let i = stack.length - 1; i >= 0; i--) {
        if (stack[i].type === closerType) {
          const opener = stack[i];
          const pair: BracketPair = {
            id: `bp-${idCounter++}`,
            type: closerType,
            openLine: opener.token.line,
            openCol: opener.token.charStart,
            closeLine: token.line,
            closeCol: token.charStart,
            depth: opener.depth,
            children: [],
          };
          pairs.push(pair);
          stack.splice(i, 1);
          break;
        }
      }
      // Unmatched closers are silently skipped
    }
  }
  // Unmatched openers remain on stack and are silently dropped

  return pairs;
}

/* ------------------------------------------------------------------ */
/*  Pair Detection: Quotes (scope-based)                               */
/* ------------------------------------------------------------------ */

function detectQuotePairs(tokenMap: TokenMap): BracketPair[] {
  const pairs: BracketPair[] = [];
  let idCounter = 0;
  let currentQuoteType: "double" | "single" | null = null;
  let startToken: TokenMeta | null = null;

  for (const token of tokenMap.allTokens) {
    if (!token.scope) continue;

    const match = QUOTE_SCOPE_RE.exec(token.scope);
    if (match) {
      const quoteType = match[1] as "double" | "single";
      if (currentQuoteType === null) {
        // Start of a new quoted string
        currentQuoteType = quoteType;
        startToken = token;
      } else if (currentQuoteType === quoteType) {
        // Still inside the same string type, update end boundary
        // (continue — the end will be detected when scope transitions out)
      } else {
        // Different quote type nested or adjacent — close current, start new
        if (startToken) {
          pairs.push(makeQuotePair(startToken, token, currentQuoteType, idCounter++));
        }
        currentQuoteType = quoteType;
        startToken = token;
      }
    } else {
      // Scope transitioned out of a string
      if (currentQuoteType !== null && startToken) {
        // Find the last token that was part of this string
        const tokenIndex = tokenMap.allTokens.indexOf(token);
        const lastStringToken = tokenIndex > 0 ? tokenMap.allTokens[tokenIndex - 1] : startToken;
        pairs.push(makeQuotePair(startToken, lastStringToken, currentQuoteType, idCounter++));
        currentQuoteType = null;
        startToken = null;
      }
    }
  }

  // Handle string that extends to the end of the file
  if (currentQuoteType !== null && startToken) {
    const lastToken = tokenMap.allTokens[tokenMap.allTokens.length - 1];
    pairs.push(makeQuotePair(startToken, lastToken, currentQuoteType, idCounter++));
  }

  return pairs;
}

function makeQuotePair(
  start: TokenMeta,
  end: TokenMeta,
  quoteType: "double" | "single",
  id: number
): BracketPair {
  return {
    id: `qp-${id}`,
    type: quoteType === "double" ? '""' : "''",
    openLine: start.line,
    openCol: start.charStart,
    closeLine: end.line,
    closeCol: end.charEnd,
    depth: 0,
    children: [],
  };
}

/* ------------------------------------------------------------------ */
/*  Combined Detection + Nesting                                       */
/* ------------------------------------------------------------------ */

function detectPairs(tokenMap: TokenMap | null): BracketPair[] {
  if (!tokenMap || tokenMap.allTokens.length === 0) return [];

  const bracketPairs = detectBracketPairs(tokenMap);
  const quotePairs = detectQuotePairs(tokenMap);
  const allPairs = [...bracketPairs, ...quotePairs];

  // Build parent-child relationships based on containment
  for (const outer of allPairs) {
    for (const inner of allPairs) {
      if (outer.id === inner.id) continue;
      if (isContainedIn(inner, outer)) {
        outer.children.push(inner.id);
      }
    }
  }

  return allPairs;
}

function isContainedIn(inner: BracketPair, outer: BracketPair): boolean {
  const innerStart = inner.openLine * 10000 + inner.openCol;
  const innerEnd = inner.closeLine * 10000 + inner.closeCol;
  const outerStart = outer.openLine * 10000 + outer.openCol;
  const outerEnd = outer.closeLine * 10000 + outer.closeCol;
  return innerStart > outerStart && innerEnd < outerEnd;
}

/* ------------------------------------------------------------------ */
/*  DOM Manipulation: Collapse / Expand                                */
/* ------------------------------------------------------------------ */

function applyCollapse(pair: BracketPair, tokenMap: TokenMap): void {
  const isMultiLine = pair.closeLine > pair.openLine;

  if (isMultiLine) {
    applyMultiLineCollapse(pair, tokenMap);
  } else {
    applySingleLineCollapse(pair, tokenMap);
  }
}

function applyMultiLineCollapse(pair: BracketPair, tokenMap: TokenMap): void {
  // Hide intermediate lines (openLine+1 to closeLine-1, using 0-based indexing)
  // Also hide the closer line and move closing bracket inline
  for (let lineIdx = pair.openLine; lineIdx < pair.closeLine; lineIdx++) {
    // lineIdx is 1-based line number, lineElements is 0-based
    const lineEl = tokenMap.lineElements[lineIdx]; // line number lineIdx+1
    if (lineEl) {
      lineEl.classList.add("cli-snippet-line-hidden");
      lineEl.setAttribute("aria-hidden", "true");
    }
  }

  // Insert indicator after the opening bracket token
  const openerToken = findToken(tokenMap, pair.openLine, pair.openCol);
  if (openerToken) {
    const indicator = document.createElement("span");
    indicator.setAttribute("data-pair-indicator", pair.id);
    indicator.className = "cli-snippet-indicator";
    indicator.textContent = " " + INDICATOR_TEXT[pair.type] + " ";
    openerToken.element.after(indicator);
  }
}

function applySingleLineCollapse(pair: BracketPair, tokenMap: TokenMap): void {
  const lineIndex = pair.openLine - 1; // 0-based
  const lineTokens = tokenMap.lines[lineIndex];
  if (!lineTokens) return;

  // Hide tokens between opener and closer
  for (const token of lineTokens) {
    if (
      token.charStart > pair.openCol &&
      token.charStart < pair.closeCol
    ) {
      token.element.classList.add("cli-snippet-token-hidden");
      token.element.setAttribute("data-hidden-by", pair.id);
    }
  }

  // Insert indicator after opener
  const openerToken = findToken(tokenMap, pair.openLine, pair.openCol);
  if (openerToken) {
    const indicator = document.createElement("span");
    indicator.setAttribute("data-pair-indicator", pair.id);
    indicator.className = "cli-snippet-indicator";
    indicator.textContent = INDICATOR_TEXT[pair.type];
    openerToken.element.after(indicator);
  }
}

function applyExpand(pair: BracketPair, tokenMap: TokenMap): void {
  const isMultiLine = pair.closeLine > pair.openLine;

  // Remove indicator
  const container = tokenMap.lineElements[0]?.closest(".cli-snippet-code");
  if (container) {
    container
      .querySelectorAll(`[data-pair-indicator="${pair.id}"]`)
      .forEach(el => el.remove());
  }

  if (isMultiLine) {
    // Show hidden lines
    for (let lineIdx = pair.openLine; lineIdx < pair.closeLine; lineIdx++) {
      const lineEl = tokenMap.lineElements[lineIdx];
      if (lineEl) {
        lineEl.classList.remove("cli-snippet-line-hidden");
        lineEl.removeAttribute("aria-hidden");
      }
    }
  } else {
    // Show hidden tokens
    const container = tokenMap.lineElements[0]?.closest(".cli-snippet-code");
    if (container) {
      container
        .querySelectorAll(`[data-hidden-by="${pair.id}"]`)
        .forEach(el => {
          (el as HTMLElement).classList.remove("cli-snippet-token-hidden");
          (el as HTMLElement).removeAttribute("data-hidden-by");
        });
    }
  }
}

function findToken(
  tokenMap: TokenMap,
  line: number,
  col: number
): TokenMeta | undefined {
  const lineIndex = line - 1;
  const lineTokens = tokenMap.lines[lineIndex];
  if (!lineTokens) return undefined;
  return lineTokens.find(t => t.charStart === col);
}

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */

export function useCollapsing(
  tokenMap: TokenMap | null,
  options: CollapsingOptions = {}
): CollapsingResult {
  const { enabled = true, defaultCollapsed } = options;
  const [collapsedPairs, setCollapsedPairs] = useState<Set<string>>(new Set());
  const [initialized, setInitialized] = useState(false);

  const pairs = useMemo(() => {
    if (!enabled) return [];
    return detectPairs(tokenMap);
  }, [tokenMap, enabled]);

  // Seed initial collapsed state from defaultCollapsed prop (multi-line only)
  useEffect(() => {
    if (!enabled || initialized || pairs.length === 0) return;
    if (!defaultCollapsed || defaultCollapsed.length === 0) {
      setInitialized(true);
      return;
    }

    const initialSet = new Set<string>();
    for (const pair of pairs) {
      const isMultiLine = pair.closeLine > pair.openLine;
      if (isMultiLine && defaultCollapsed.includes(pair.type)) {
        initialSet.add(pair.id);
      }
    }

    setCollapsedPairs(initialSet);
    setInitialized(true);
  }, [pairs, defaultCollapsed, enabled, initialized]);

  // When tokenMap changes (dev theme switch), cleanup old indicators and re-apply fold state
  useEffect(() => {
    if (!tokenMap || !enabled) return;

    // Cleanup old indicators
    const container = tokenMap.lineElements[0]?.closest(".cli-snippet-code");
    if (container) {
      container
        .querySelectorAll("[data-pair-indicator]")
        .forEach(el => el.remove());
      // Also cleanup hidden classes from previous tokenMap
      container
        .querySelectorAll(".cli-snippet-line-hidden")
        .forEach(el => {
          el.classList.remove("cli-snippet-line-hidden");
          el.removeAttribute("aria-hidden");
        });
      container
        .querySelectorAll(".cli-snippet-token-hidden")
        .forEach(el => {
          el.classList.remove("cli-snippet-token-hidden");
          el.removeAttribute("data-hidden-by");
        });
    }

    // Re-apply fold state for all currently collapsed pairs
    setCollapsedPairs(prev => {
      const next = new Set<string>();
      for (const pairId of prev) {
        const pair = pairs.find(p => p.id === pairId);
        if (pair) {
          applyCollapse(pair, tokenMap);
          next.add(pairId);
        }
        // Pairs no longer in the set are silently dropped
      }
      return next;
    });
  }, [tokenMap, pairs, enabled]);

  const togglePair = useCallback(
    (id: string) => {
      if (!tokenMap) return;
      const pair = pairs.find(p => p.id === id);
      if (!pair) return;

      setCollapsedPairs(prev => {
        const next = new Set(prev);
        if (next.has(id)) {
          applyExpand(pair, tokenMap);
          next.delete(id);
        } else {
          applyCollapse(pair, tokenMap);
          next.add(id);
        }
        return next;
      });
    },
    [tokenMap, pairs]
  );

  const collapsePair = useCallback(
    (id: string) => {
      if (!tokenMap) return;
      const pair = pairs.find(p => p.id === id);
      if (!pair) return;

      setCollapsedPairs(prev => {
        if (prev.has(id)) return prev;
        const next = new Set(prev);
        applyCollapse(pair, tokenMap);
        next.add(id);
        return next;
      });
    },
    [tokenMap, pairs]
  );

  const expandPair = useCallback(
    (id: string) => {
      if (!tokenMap) return;
      const pair = pairs.find(p => p.id === id);
      if (!pair) return;

      setCollapsedPairs(prev => {
        if (!prev.has(id)) return prev;
        const next = new Set(prev);
        applyExpand(pair, tokenMap);
        next.delete(id);
        return next;
      });
    },
    [tokenMap, pairs]
  );

  const isCollapsed = useCallback(
    (id: string) => collapsedPairs.has(id),
    [collapsedPairs]
  );

  return { pairs, togglePair, isCollapsed, collapsePair, expandPair };
}
