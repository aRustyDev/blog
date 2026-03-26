import brandsData from "@/data/brands.json";

interface BrandEntry {
  name: string;
  color: string;
}

const brands = brandsData as Record<string, BrandEntry>;

/**
 * Look up a brand color by domain from brands.json.
 * Returns the hex color string or null if the domain is not in the database.
 */
export function getBrandColor(domain: string): string | null {
  return brands[domain]?.color ?? null;
}

/**
 * Extract `<meta name="theme-color" content="...">` from raw HTML.
 * Handles both attribute orderings and both single/double quotes.
 * Returns the color value or null if not found.
 */
export function extractThemeColor(html: string): string | null {
  const patterns = [
    /<meta[^>]+name=["']theme-color["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']theme-color["']/i,
  ];

  for (const re of patterns) {
    const match = html.match(re);
    if (match?.[1]) return match[1];
  }
  return null;
}
