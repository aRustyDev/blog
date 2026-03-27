import { useEffect, type FC } from "react";
import CLISnippetCore from "./CLISnippetCore";
import CollapseGutter from "./CollapseGutter";
import { useCollapsing } from "./hooks/useCollapsing";
import type { CLISnippetCoreProps, TokenMap } from "./types";

export interface CLISnippetCollapsibleProps extends CLISnippetCoreProps {
  /** Enable bracket/quote collapsing (default: true) */
  collapsibleGroups?: boolean;
  /** Group types to collapse initially, e.g. ["{}", "[]"] */
  defaultCollapsed?: string[];
}

/**
 * Thin wrapper: CLISnippetCore + CollapseGutter + useCollapsing.
 *
 * Renders a Carbon-style code block with semantic fold/unfold for
 * bracket pairs ({}, [], ()) and quote pairs ("", '').
 */
const CLISnippetCollapsible: FC<CLISnippetCollapsibleProps> = ({
  collapsibleGroups = true,
  defaultCollapsed,
  ...coreProps
}) => {
  return (
    <CLISnippetCore
      {...coreProps}
      className={`cli-snippet-collapsible ${coreProps.className ?? ""}`}
    >
      {(tokenMap) =>
        collapsibleGroups && tokenMap ? (
          <CollapsibleInner
            tokenMap={tokenMap}
            defaultCollapsed={defaultCollapsed}
          />
        ) : null
      }
    </CLISnippetCore>
  );
};

interface CollapsibleInnerProps {
  tokenMap: TokenMap;
  defaultCollapsed?: string[];
}

/**
 * Inner component that consumes tokenMap and renders the gutter.
 * Separated so that useCollapsing is called inside a proper component
 * (not inside a render callback — hooks must be called at top level).
 */
const CollapsibleInner: FC<CollapsibleInnerProps> = ({
  tokenMap,
  defaultCollapsed,
}) => {
  const { pairs, togglePair, isCollapsed } = useCollapsing(tokenMap, {
    enabled: true,
    defaultCollapsed,
  });

  // Mobile bracket-tap: attach click handlers to opener bracket tokens
  // (gutter is hidden on <640px, so tokens themselves become the toggle)
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 639px)").matches;
    if (!isMobile || pairs.length === 0) return;

    const handlers = new Map<HTMLElement, () => void>();

    for (const pair of pairs) {
      if (pair.closeLine <= pair.openLine) continue; // only multi-line
      const lineTokens = tokenMap.lines[pair.openLine - 1];
      const openerToken = lineTokens?.find(
        t => t.charStart === pair.openCol
      );
      if (openerToken) {
        const handler = () => togglePair(pair.id);
        openerToken.element.addEventListener("click", handler);
        openerToken.element.style.cursor = "pointer";
        handlers.set(openerToken.element, handler);
      }
    }

    return () => {
      handlers.forEach((handler, el) => {
        el.removeEventListener("click", handler);
        el.style.cursor = "";
      });
    };
  }, [pairs, togglePair, tokenMap]);

  return (
    <CollapseGutter
      pairs={pairs}
      onToggle={togglePair}
      isCollapsed={isCollapsed}
      lineCount={tokenMap.lineElements.length}
    />
  );
};

export default CLISnippetCollapsible;
