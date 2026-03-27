import { detectBracketPairs, detectQuotePairs } from "./useCollapsing";
import type { TokenMap, TokenMeta } from "../types";

/** Helper: create a TokenMeta from text */
function tok(
  line: number,
  charStart: number,
  text: string,
  scope: string | null = null
): TokenMeta {
  return {
    line,
    charStart,
    charEnd: charStart + text.length,
    scope,
    text,
    element: document.createElement("span"),
  };
}

/** Helper: create a TokenMap from a flat list of tokens */
function makeMap(tokens: TokenMeta[]): TokenMap {
  const lineMap = new Map<number, TokenMeta[]>();
  for (const t of tokens) {
    if (!lineMap.has(t.line)) lineMap.set(t.line, []);
    lineMap.get(t.line)!.push(t);
  }

  const maxLine = Math.max(...tokens.map(t => t.line), 0);
  const lines: TokenMeta[][] = [];
  const lineElements: HTMLElement[] = [];
  for (let i = 1; i <= maxLine; i++) {
    lines.push(lineMap.get(i) ?? []);
    lineElements.push(document.createElement("span"));
  }

  return { lines, lineElements, allTokens: tokens };
}

describe("detectBracketPairs", () => {
  it("should detect simple {}", () => {
    const map = makeMap([
      tok(1, 0, "{"),
      tok(1, 2, "foo"),
      tok(1, 6, "}"),
    ]);
    const pairs = detectBracketPairs(map);
    expect(pairs).toHaveLength(1);
    expect(pairs[0].type).toBe("{}");
  });

  it("should detect []", () => {
    const map = makeMap([
      tok(1, 0, "["),
      tok(1, 1, "1"),
      tok(1, 3, "]"),
    ]);
    const pairs = detectBracketPairs(map);
    expect(pairs).toHaveLength(1);
    expect(pairs[0].type).toBe("[]");
  });

  it("should detect ()", () => {
    const map = makeMap([
      tok(1, 0, "("),
      tok(1, 1, "x"),
      tok(1, 2, ")"),
    ]);
    const pairs = detectBracketPairs(map);
    expect(pairs).toHaveLength(1);
    expect(pairs[0].type).toBe("()");
  });

  it("should detect nested { { } }", () => {
    const map = makeMap([
      tok(1, 0, "{"),
      tok(2, 0, "{"),
      tok(3, 0, "}"),
      tok(4, 0, "}"),
    ]);
    const pairs = detectBracketPairs(map);
    expect(pairs).toHaveLength(2);
    const outer = pairs.find(p => p.openLine === 1);
    const inner = pairs.find(p => p.openLine === 2);
    expect(outer).toBeDefined();
    expect(inner).toBeDefined();
    expect(outer!.depth).toBe(0);
    expect(inner!.depth).toBe(1);
  });

  it("should detect 3+ nesting { [ ( ) ] }", () => {
    const map = makeMap([
      tok(1, 0, "{"),
      tok(1, 1, "["),
      tok(1, 2, "("),
      tok(1, 3, ")"),
      tok(1, 4, "]"),
      tok(1, 5, "}"),
    ]);
    const pairs = detectBracketPairs(map);
    expect(pairs).toHaveLength(3);
    expect(pairs.map(p => p.type).sort()).toEqual(["()", "[]", "{}"]);
  });

  it("should handle mismatched { [ }", () => {
    const map = makeMap([
      tok(1, 0, "{"),
      tok(1, 1, "["),
      tok(1, 2, "}"),
    ]);
    const pairs = detectBracketPairs(map);
    // { matches }, [ is orphaned
    expect(pairs).toHaveLength(1);
    expect(pairs[0].type).toBe("{}");
  });

  it("should handle unclosed opener {", () => {
    const map = makeMap([
      tok(1, 0, "{"),
      tok(1, 2, "foo"),
    ]);
    const pairs = detectBracketPairs(map);
    expect(pairs).toHaveLength(0);
  });

  it("should handle unmatched closer }", () => {
    const map = makeMap([
      tok(1, 0, "foo"),
      tok(1, 4, "}"),
    ]);
    const pairs = detectBracketPairs(map);
    expect(pairs).toHaveLength(0);
  });

  it("should skip brackets inside strings", () => {
    const map = makeMap([
      tok(1, 0, "{", "string.quoted.double.ts"),
      tok(1, 1, "text"),
      tok(1, 5, "}", "string.quoted.double.ts"),
    ]);
    const pairs = detectBracketPairs(map);
    expect(pairs).toHaveLength(0);
  });

  it("should skip brackets inside comments", () => {
    const map = makeMap([
      tok(1, 0, "{", "comment.line.double-slash.ts"),
      tok(1, 1, "comment"),
      tok(1, 8, "}", "comment.line.double-slash.ts"),
    ]);
    const pairs = detectBracketPairs(map);
    expect(pairs).toHaveLength(0);
  });

  it("should detect adjacent {}{}", () => {
    const map = makeMap([
      tok(1, 0, "{"),
      tok(1, 1, "}"),
      tok(1, 2, "{"),
      tok(1, 3, "}"),
    ]);
    const pairs = detectBracketPairs(map);
    expect(pairs).toHaveLength(2);
  });

  it("should detect multi-line pair", () => {
    const map = makeMap([
      tok(1, 0, "{"),
      tok(2, 0, "foo"),
      tok(3, 0, "}"),
    ]);
    const pairs = detectBracketPairs(map);
    expect(pairs).toHaveLength(1);
    expect(pairs[0].openLine).toBe(1);
    expect(pairs[0].closeLine).toBe(3);
  });

  it("should ignore multi-char tokens", () => {
    const map = makeMap([
      tok(1, 0, "=>"),
      tok(1, 3, "{}"),
    ]);
    const pairs = detectBracketPairs(map);
    // "=>" is 2 chars, "{}" is 2 chars — both skipped (text.trim().length !== 1)
    expect(pairs).toHaveLength(0);
  });

  it("should handle empty TokenMap", () => {
    const map = makeMap([]);
    const pairs = detectBracketPairs(map);
    expect(pairs).toHaveLength(0);
  });
});

describe("detectQuotePairs", () => {
  it("should detect double-quoted strings via scope", () => {
    const map = makeMap([
      tok(1, 0, '"', "punctuation.definition.string.begin.ts"),
      tok(1, 1, "hello", "string.quoted.double.ts"),
      tok(1, 6, '"', "punctuation.definition.string.end.ts"),
    ]);
    const pairs = detectQuotePairs(map);
    expect(pairs).toHaveLength(1);
    expect(pairs[0].type).toBe('""');
  });

  it("should detect single-quoted strings via scope", () => {
    const map = makeMap([
      tok(1, 0, "'", "punctuation.definition.string.begin.ts"),
      tok(1, 1, "hello", "string.quoted.single.ts"),
      tok(1, 6, "'", "punctuation.definition.string.end.ts"),
    ]);
    const pairs = detectQuotePairs(map);
    expect(pairs).toHaveLength(1);
    expect(pairs[0].type).toBe("''");
  });

  it("should not falsely pair adjacent strings", () => {
    // "hello" + "world" — should be 2 pairs, not 1
    const map = makeMap([
      tok(1, 0, '"', "punctuation.definition.string.begin.ts"),
      tok(1, 1, "hello", "string.quoted.double.ts"),
      tok(1, 6, '"', "punctuation.definition.string.end.ts"),
      tok(1, 7, " + ", null),
      tok(1, 10, '"', "punctuation.definition.string.begin.ts"),
      tok(1, 11, "world", "string.quoted.double.ts"),
      tok(1, 16, '"', "punctuation.definition.string.end.ts"),
    ]);
    const pairs = detectQuotePairs(map);
    expect(pairs).toHaveLength(2);
  });

  it("should not detect template literals", () => {
    const map = makeMap([
      tok(1, 0, "`", "punctuation.definition.string.template.begin.ts"),
      tok(1, 1, "hello", "string.template.ts"),
      tok(1, 6, "`", "punctuation.definition.string.template.end.ts"),
    ]);
    const pairs = detectQuotePairs(map);
    expect(pairs).toHaveLength(0);
  });

  it("should handle tokens without scope", () => {
    const map = makeMap([
      tok(1, 0, "const"),
      tok(1, 6, "x"),
    ]);
    const pairs = detectQuotePairs(map);
    expect(pairs).toHaveLength(0);
  });
});
