import { transformerTokenMetadata } from "./shiki-transformer";

// Minimal HAST node mock
function createMockNode() {
  return {
    type: "element" as const,
    tagName: "span",
    properties: {} as Record<string, string>,
    children: [],
  };
}

// Minimal token mock
function createMockToken(opts?: {
  explanation?: Array<{
    content: string;
    scopes: Array<{ scopeName: string }>;
  }>;
}) {
  return {
    content: "const",
    offset: 0,
    color: "#D73A49",
    explanation: opts?.explanation,
  };
}

describe("transformerTokenMetadata", () => {
  describe("without includeScope", () => {
    const transformer = transformerTokenMetadata();

    it("should inject data-line and data-col", () => {
      const node = createMockNode();
      const token = createMockToken();
      const lineEl = createMockNode();

      transformer.span!(node as any, 3, 7, lineEl as any, token as any);

      expect(node.properties["data-line"]).toBe("3");
      expect(node.properties["data-col"]).toBe("7");
    });

    it("should NOT inject data-scope", () => {
      const node = createMockNode();
      const token = createMockToken({
        explanation: [
          {
            content: "const",
            scopes: [
              { scopeName: "source.ts" },
              { scopeName: "storage.type.ts" },
            ],
          },
        ],
      });
      const lineEl = createMockNode();

      transformer.span!(node as any, 1, 0, lineEl as any, token as any);

      expect(node.properties["data-scope"]).toBeUndefined();
    });
  });

  describe("with includeScope: true", () => {
    const transformer = transformerTokenMetadata({ includeScope: true });

    it("should inject data-scope with deepest scope", () => {
      const node = createMockNode();
      const token = createMockToken({
        explanation: [
          {
            content: "const",
            scopes: [
              { scopeName: "source.ts" },
              { scopeName: "meta.var.expr.ts" },
              { scopeName: "storage.type.ts" },
            ],
          },
        ],
      });
      const lineEl = createMockNode();

      transformer.span!(node as any, 1, 0, lineEl as any, token as any);

      expect(node.properties["data-scope"]).toBe("storage.type.ts");
    });

    it("should handle token without explanation gracefully", () => {
      const node = createMockNode();
      const token = createMockToken(); // no explanation
      const lineEl = createMockNode();

      transformer.span!(node as any, 1, 0, lineEl as any, token as any);

      expect(node.properties["data-scope"]).toBeUndefined();
      expect(node.properties["data-line"]).toBe("1");
    });

    it("should handle empty scopes array", () => {
      const node = createMockNode();
      const token = createMockToken({
        explanation: [{ content: "x", scopes: [] }],
      });
      const lineEl = createMockNode();

      transformer.span!(node as any, 1, 0, lineEl as any, token as any);

      expect(node.properties["data-scope"]).toBeUndefined();
    });
  });
});
