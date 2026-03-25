import {
  useRef,
  useState,
  useEffect,
  useCallback,
  type FC,
} from "react";
import { useTokenMap } from "./hooks/useTokenMap";
import type { CLISnippetCoreProps } from "./types";

/**
 * Shared core for CLISnippet interactive components.
 * Provides Carbon-style chrome, hybrid Shiki rendering, markdown copy,
 * and useTokenMap for downstream feature components.
 *
 * Security: html prop MUST only receive codeToHtml() output.
 * Never pass external/user HTML into dangerouslySetInnerHTML.
 */
const CLISnippetCore: FC<CLISnippetCoreProps> = ({
  html,
  code,
  lang,
  title,
  chrome = true,
  showLineNumbers = true,
  showCopy = true,
  className,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [runtimeHtml, setRuntimeHtml] = useState<string | null>(null);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">(
    "idle"
  );

  // Dev mode: lazy-load Shiki and highlight at runtime
  useEffect(() => {
    if (code && !html && lang) {
      import("@/utils/shiki").then(async ({ getHighlighter }) => {
        try {
          const h = await getHighlighter();
          const result = h.codeToHtml(code, {
            lang,
            themes: { light: "github-light", dark: "github-dark" },
            defaultColor: false,
          });
          setRuntimeHtml(result);
        } catch (err) {
          console.warn("CLISnippetCore: Shiki highlighting failed", err);
          setRuntimeHtml(null);
        }
      });
    }
  }, [code, lang, html]);

  const displayHtml = html ?? runtimeHtml;
  const tokenMap = useTokenMap(containerRef, displayHtml);

  // Extract raw code text for copy
  const getRawCode = useCallback((): string => {
    if (code) return code;
    if (containerRef.current) {
      return containerRef.current.textContent ?? "";
    }
    return "";
  }, [code]);

  const handleCopy = useCallback(async () => {
    const raw = getRawCode();
    const markdown = `\`\`\`${lang ?? ""}\n${raw}\n\`\`\``;

    try {
      await navigator.clipboard.writeText(markdown);
      setCopyState("copied");
    } catch {
      // Fallback for non-secure contexts (LAN dev via HTTP)
      try {
        const textarea = document.createElement("textarea");
        textarea.value = markdown;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopyState("copied");
      } catch {
        setCopyState("error");
      }
    }

    setTimeout(() => setCopyState("idle"), 2000);
  }, [getRawCode, lang]);

  // Loading state
  if (!displayHtml && !code) {
    return (
      <div className={`cli-snippet-interactive ${className ?? ""}`}>
        <div className="cli-snippet-skeleton" />
      </div>
    );
  }

  // Error fallback (code provided but Shiki failed)
  if (!displayHtml && code) {
    return (
      <div className={`cli-snippet-interactive ${className ?? ""}`}>
        {chrome && (
          <div className="cli-snippet-chrome">
            <span className="cli-snippet-dots" aria-hidden="true">
              ● ● ●
            </span>
            {title && <span className="cli-snippet-title">{title}</span>}
          </div>
        )}
        <pre className="cli-snippet-fallback">
          <code>{code}</code>
        </pre>
      </div>
    );
  }

  return (
    <div className={`cli-snippet-interactive ${className ?? ""}`}>
      {chrome && (
        <div className="cli-snippet-chrome">
          <span className="cli-snippet-dots" aria-hidden="true">
            ● ● ●
          </span>
          {title && <span className="cli-snippet-title">{title}</span>}
          <div className="cli-snippet-chrome-spacer" />
          {showCopy && (
            <button
              className="cli-snippet-copy"
              onClick={handleCopy}
              aria-label="Copy code as markdown"
              type="button"
            >
              {copyState === "copied" ? (
                <span className="cli-snippet-copy-success">Copied!</span>
              ) : copyState === "error" ? (
                <span className="cli-snippet-copy-error">Failed</span>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}
            </button>
          )}
        </div>
      )}
      <div
        className={`cli-snippet-code${showLineNumbers ? " line-numbers" : ""}`}
      >
        <div
          ref={containerRef}
          dangerouslySetInnerHTML={{ __html: displayHtml ?? "" }}
        />
        {/* Feature components (fold gutter, animation controls) */}
        {typeof children === "function" ? children(tokenMap) : children}
      </div>
    </div>
  );
};

export default CLISnippetCore;
