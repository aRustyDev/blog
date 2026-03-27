import { extractMeta, extractFavicon } from "./og-fetch";
import { extractThemeColor, getBrandColor } from "./brands";

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

describe("extractThemeColor", () => {
  it("should extract theme-color with name before content", () => {
    const html = `<meta name="theme-color" content="#FF5733">`;
    expect(extractThemeColor(html)).toBe("#FF5733");
  });

  it("should extract theme-color with content before name", () => {
    const html = `<meta content="#00AAFF" name="theme-color">`;
    expect(extractThemeColor(html)).toBe("#00AAFF");
  });

  it("should be case-insensitive", () => {
    const html = `<META NAME="theme-color" CONTENT="#ABC123">`;
    expect(extractThemeColor(html)).toBe("#ABC123");
  });

  it("should handle single quotes", () => {
    const html = `<meta name='theme-color' content='#DEF456'>`;
    expect(extractThemeColor(html)).toBe("#DEF456");
  });

  it("should handle extra attributes", () => {
    const html = `<meta charset="utf-8" name="theme-color" content="#123456" data-x="y">`;
    expect(extractThemeColor(html)).toBe("#123456");
  });

  it("should return null when no theme-color meta", () => {
    const html = `<html><head><meta name="viewport" content="width=device-width"></head></html>`;
    expect(extractThemeColor(html)).toBeNull();
  });

  it("should handle named colors", () => {
    const html = `<meta name="theme-color" content="tomato">`;
    expect(extractThemeColor(html)).toBe("tomato");
  });

  it("should handle rgb values", () => {
    const html = `<meta name="theme-color" content="rgb(255, 87, 51)">`;
    expect(extractThemeColor(html)).toBe("rgb(255, 87, 51)");
  });
});

describe("getBrandColor", () => {
  it("should return color for known domain", () => {
    expect(getBrandColor("github.com")).toBe("#24292F");
  });

  it("should return color for twitter.com", () => {
    expect(getBrandColor("twitter.com")).toBe("#1DA1F2");
  });

  it("should return color for x.com", () => {
    expect(getBrandColor("x.com")).toBe("#1DA1F2");
  });

  it("should return color for anthropic.com", () => {
    expect(getBrandColor("anthropic.com")).toBe("#D97757");
  });

  it("should return color for arxiv.org", () => {
    expect(getBrandColor("arxiv.org")).toBe("#B31B1B");
  });

  it("should return color for docs.astro.build", () => {
    expect(getBrandColor("docs.astro.build")).toBe("#BC52EE");
  });

  it("should return null for unknown domain", () => {
    expect(getBrandColor("unknown-site.example.com")).toBeNull();
  });

  it("should return null for empty string", () => {
    expect(getBrandColor("")).toBeNull();
  });
});
