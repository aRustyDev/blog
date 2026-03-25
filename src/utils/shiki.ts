import { createHighlighter, type Highlighter } from "shiki";

/**
 * Module-level cached Shiki highlighter singleton.
 * `??=` ensures createHighlighter() is called exactly once per build process
 * regardless of how many CodeBlock/CLISnippet instances are rendered.
 */
let highlighterPromise: Promise<Highlighter> | null = null;

export function getHighlighter(): Promise<Highlighter> {
  return (highlighterPromise ??= createHighlighter({
    themes: ["github-light", "github-dark"],
    langs: [
      "typescript",
      "javascript",
      "json",
      "yaml",
      "bash",
      "markdown",
      "css",
      "html",
      "python",
      "go",
      "rust",
      "toml",
      "jsonc",
    ],
  }));
}
