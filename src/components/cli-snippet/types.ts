export interface TokenMeta {
  /** 1-based line number (from data-line) */
  line: number;
  /** Character offset from line start (from data-col) */
  charStart: number;
  /** charStart + element.textContent.length */
  charEnd: number;
  /** Deepest TextMate scope (from data-scope, null if not present) */
  scope: string | null;
  /** element.textContent (decoded, safe for character counting) */
  text: string;
  /** Direct DOM reference to the token <span> */
  element: HTMLSpanElement;
}

export interface TokenMap {
  /** Tokens grouped by line index (0-based array, each entry is tokens for that line) */
  lines: TokenMeta[][];
  /** Line-level <span class="line"> elements */
  lineElements: HTMLElement[];
  /** Flat list of all tokens in document order */
  allTokens: TokenMeta[];
}

export interface CLISnippetCoreProps {
  /** Pre-rendered Shiki HTML (production path) */
  html?: string;
  /** Raw code text (dev-mode path — triggers runtime Shiki) */
  code?: string;
  /** Language identifier (required if code provided) */
  lang?: string;

  /** Window title bar text */
  title?: string;
  /** Show Carbon-style window chrome (default: true) */
  chrome?: boolean;
  /** Show line numbers (default: true) */
  showLineNumbers?: boolean;
  /** Show markdown copy button (default: true) */
  showCopy?: boolean;

  className?: string;
  /** Render prop for feature components (receives tokenMap) */
  children?: (tokenMap: TokenMap | null) => React.ReactNode;
}
