import { extractMeta, extractFavicon } from "./og-fetch";

describe("og-fetch", () => {
  describe("extractMeta", () => {
    it("should extract property before content", () => {
      const html = `<meta property="og:title" content="Hello World">`;
      expect(extractMeta(html, "og:title")).toBe("Hello World");
    });

    it("should extract content before property", () => {
      const html = `<meta content="Hello World" property="og:title">`;
      expect(extractMeta(html, "og:title")).toBe("Hello World");
    });

    it("should extract name attribute", () => {
      const html = `<meta name="og:description" content="A description">`;
      expect(extractMeta(html, "og:description")).toBe("A description");
    });

    it("should extract name with reversed order", () => {
      const html = `<meta content="A description" name="og:description">`;
      expect(extractMeta(html, "og:description")).toBe("A description");
    });

    it("should return null when not found", () => {
      const html = `<html><head><title>Test</title></head></html>`;
      expect(extractMeta(html, "og:title")).toBeNull();
    });

    it("should handle single quotes", () => {
      const html = `<meta property='og:title' content='Single Quoted'>`;
      expect(extractMeta(html, "og:title")).toBe("Single Quoted");
    });

    it("should be case-insensitive on tag", () => {
      const html = `<META PROPERTY="og:title" CONTENT="Upper Case">`;
      expect(extractMeta(html, "og:title")).toBe("Upper Case");
    });

    it("should handle extra attributes", () => {
      const html = `<meta charset="utf-8" property="og:title" content="With Extra" data-foo="bar">`;
      expect(extractMeta(html, "og:title")).toBe("With Extra");
    });

    it("should extract og:image", () => {
      const html = `<meta property="og:image" content="https://example.com/img.png">`;
      expect(extractMeta(html, "og:image")).toBe(
        "https://example.com/img.png"
      );
    });

    it("should handle empty content", () => {
      const html = `<meta property="og:title" content="">`;
      // Empty string doesn't match [^"']+ (requires at least 1 char)
      expect(extractMeta(html, "og:title")).toBeNull();
    });
  });

  describe("extractFavicon", () => {
    it("should extract link rel icon href", () => {
      const html = `<link rel="icon" href="/favicon.ico">`;
      const result = extractFavicon(html, "https://example.com");
      expect(result).toBe("https://example.com/favicon.ico");
    });

    it("should extract link rel shortcut icon", () => {
      const html = `<link rel="shortcut icon" href="/img/fav.png">`;
      const result = extractFavicon(html, "https://example.com");
      expect(result).toBe("https://example.com/img/fav.png");
    });

    it("should handle reversed href/rel order", () => {
      const html = `<link href="/icon.svg" rel="icon">`;
      const result = extractFavicon(html, "https://example.com");
      expect(result).toBe("https://example.com/icon.svg");
    });

    it("should handle absolute favicon URLs", () => {
      const html = `<link rel="icon" href="https://cdn.example.com/fav.ico">`;
      const result = extractFavicon(html, "https://example.com");
      expect(result).toBe("https://cdn.example.com/fav.ico");
    });

    it("should fall back to Google favicon service", () => {
      const html = `<html><head><title>No Favicon</title></head></html>`;
      const result = extractFavicon(html, "https://example.com");
      expect(result).toContain("google.com/s2/favicons");
      expect(result).toContain("example.com");
    });

    it("should include size param in Google fallback", () => {
      const html = `<html></html>`;
      const result = extractFavicon(html, "https://test.org");
      expect(result).toContain("sz=32");
    });
  });
});
