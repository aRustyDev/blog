import type { ShikiTransformer } from "shiki";

/**
 * Custom Shiki transformer that injects metadata attributes onto token spans.
 * Used at build time in Astro wrappers for CLISnippet interactive components.
 *
 * Injects:
 * - `data-line` — 1-based line number
 * - `data-col`  — 0-based character offset within line (cumulative token.content.length)
 * - `data-scope` (opt-in) — deepest TextMate scope name (e.g., "storage.type.ts")
 *
 * The `span` hook's 5th argument is the raw ThemedToken with scope data
 * (when `includeExplanation` is enabled on the highlighter call).
 */
export function transformerTokenMetadata(options?: {
  /** Include TextMate scope as data-scope. Required for CLISnippetCollapsible (quote detection). */
  includeScope?: boolean;
}): ShikiTransformer {
  return {
    name: "token-metadata",
    span(node, line, col, _lineEl, token) {
      node.properties["data-line"] = String(line);
      node.properties["data-col"] = String(col);

      if (options?.includeScope) {
        const scope = token.explanation?.[0]?.scopes?.at(-1)?.scopeName;
        if (scope) {
          node.properties["data-scope"] = scope;
        }
      }
    },
  };
}
