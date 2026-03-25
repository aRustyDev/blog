export interface OGData {
  title: string;
  description: string;
  image: string;
  siteName: string;
  favicon: string;
}

/** Build-time cache — same URL fetched only once per build */
const cache = new Map<string, OGData>();

function extractMeta(html: string, property: string): string | null {
  // Handle both attribute orderings and both property/name attributes
  const patterns = [
    new RegExp(
      `<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`,
      "i"
    ),
    new RegExp(
      `<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${property}["']`,
      "i"
    ),
    new RegExp(
      `<meta[^>]+name=["']${property}["'][^>]+content=["']([^"']+)["']`,
      "i"
    ),
    new RegExp(
      `<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${property}["']`,
      "i"
    ),
  ];

  for (const re of patterns) {
    const match = html.match(re);
    if (match?.[1]) return match[1];
  }
  return null;
}

function extractFavicon(html: string, baseUrl: string): string {
  // Try <link rel="icon"> first
  const linkRe =
    /<link[^>]+rel=["'](?:shortcut )?icon["'][^>]+href=["']([^"']+)["']/i;
  const altRe =
    /<link[^>]+href=["']([^"']+)["'][^>]+rel=["'](?:shortcut )?icon["']/i;
  const match = html.match(linkRe) ?? html.match(altRe);

  if (match?.[1]) {
    const href = match[1];
    // Resolve relative URLs
    try {
      return new URL(href, baseUrl).href;
    } catch {
      return href;
    }
  }

  // Fallback: Google favicon service
  try {
    const domain = new URL(baseUrl).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
  } catch {
    return "";
  }
}

export async function fetchOGData(
  url: string,
  overrides?: Partial<OGData>
): Promise<OGData> {
  if (cache.has(url)) {
    const cached = cache.get(url)!;
    return { ...cached, ...filterDefined(overrides) };
  }

  let ogData: OGData = {
    title: "",
    description: "",
    image: "",
    siteName: "",
    favicon: "",
  };

  try {
    const hostname = new URL(url).hostname;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const rawHtml = await fetch(url, { signal: controller.signal }).then(r =>
      r.text()
    );
    clearTimeout(timeout);

    // Truncate to first 50KB — all <meta> tags are in <head>
    const html = rawHtml.slice(0, 51200);

    ogData = {
      title: extractMeta(html, "og:title") ?? "",
      description: extractMeta(html, "og:description") ?? "",
      image: extractMeta(html, "og:image") ?? "",
      siteName: extractMeta(html, "og:site_name") ?? hostname,
      favicon: extractFavicon(html, url),
    };
  } catch {
    try {
      ogData.siteName = new URL(url).hostname;
      ogData.favicon = `https://www.google.com/s2/favicons?domain=${ogData.siteName}&sz=32`;
    } catch {
      // URL parsing failed — leave defaults
    }
  }

  cache.set(url, ogData);
  return { ...ogData, ...filterDefined(overrides) };
}

function filterDefined(
  obj?: Partial<OGData>
): Partial<OGData> {
  if (!obj) return {};
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined && v !== "")
  );
}
