import { type FC } from "react";
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
