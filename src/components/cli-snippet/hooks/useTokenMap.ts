import { useEffect, useState, type RefObject } from "react";
import type { TokenMap, TokenMeta } from "../types";

/**
 * Parses pre-rendered Shiki HTML from the DOM and builds a structured TokenMap.
 *
 * Re-parses whenever `htmlKey` changes (handles dev-mode async Shiki load
 * where runtimeHtml starts null and is set after highlighter initializes).
 *
 * @param containerRef - Ref to the DOM element containing the Shiki HTML
 * @param htmlKey - The HTML string (or hash) — triggers re-parse on change
 */
export function useTokenMap(
  containerRef: RefObject<HTMLElement | null>,
  htmlKey: string | null
): TokenMap | null {
  const [tokenMap, setTokenMap] = useState<TokenMap | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !htmlKey) {
      setTokenMap(null);
      return;
    }

    // Wait one frame for dangerouslySetInnerHTML to flush
    requestAnimationFrame(() => {
      const lineElements: HTMLElement[] = Array.from(
        container.querySelectorAll<HTMLElement>(".line")
      );

      const lines: TokenMeta[][] = [];
      const allTokens: TokenMeta[] = [];

      for (const lineEl of lineElements) {
        const lineTokens: TokenMeta[] = [];
        const tokenSpans = lineEl.querySelectorAll<HTMLSpanElement>(
          "[data-line]"
        );

        for (const span of tokenSpans) {
          const line = parseInt(span.dataset.line ?? "0", 10);
          const charStart = parseInt(span.dataset.col ?? "0", 10);
          const text = span.textContent ?? "";
          const charEnd = charStart + text.length;
          const scope = span.dataset.scope ?? null;

          const meta: TokenMeta = {
            line,
            charStart,
            charEnd,
            scope,
            text,
            element: span,
          };

          lineTokens.push(meta);
          allTokens.push(meta);
        }

        lines.push(lineTokens);
      }

      setTokenMap({ lines, lineElements, allTokens });
    });
  }, [htmlKey]);

  return tokenMap;
}
