// Theme management using BrandTheme CDN
// See: https://brand.arusty.dev/assets/js/theme-switcher.js
// Types defined in src/env.d.ts

function getEffectiveMode(): string {
  if (window.BrandTheme) {
    return window.BrandTheme.getEffectiveMode();
  }
  // Fallback if BrandTheme not loaded
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function reflectPreference(): void {
  const mode = getEffectiveMode();

  // Update aria-label on theme button
  document.querySelector("#theme-btn")?.setAttribute("aria-label", mode);

  // Update window.theme for compatibility
  if (window.theme) {
    window.theme.themeValue = mode;
  }

  // Update meta theme-color
  const body = document.body;
  if (body) {
    const computedStyles = window.getComputedStyle(body);
    const bgColor = computedStyles.backgroundColor;
    document
      .querySelector("meta[name='theme-color']")
      ?.setAttribute("content", bgColor);
  }
}

function setPreference(): void {
  reflectPreference();
}

// Update the global theme API
// Extend window.theme with functions (Layout.astro creates the base object)
// setPreference/reflectPreference are exposed for potential external use
if (window.theme) {
  window.theme.setPreference = setPreference;
  window.theme.reflectPreference = reflectPreference;
} else {
  window.theme = {
    themeValue: getEffectiveMode(),
    setPreference,
    reflectPreference,
    getTheme: () => getEffectiveMode(),
    setTheme: (val: string) => {
      if (window.BrandTheme) {
        window.BrandTheme.mode(val);
      }
    },
  };
}

// Ensure theme is reflected
reflectPreference();

// Named handler so we can remove before re-adding (prevents accumulation)
function handleThemeToggle(): void {
  if (window.BrandTheme) {
    window.BrandTheme.toggle();
  }
  reflectPreference();
}

function setThemeFeature(): void {
  reflectPreference();

  // Remove previous listener before adding (prevents accumulation on view transitions)
  const btn = document.querySelector("#theme-btn");
  if (btn) {
    btn.removeEventListener("click", handleThemeToggle);
    btn.addEventListener("click", handleThemeToggle);
  }
}

// Set up theme features after page load
setThemeFeature();

// Store the current theme mode before any swap happens
let _savedMode: string | null = null;

// Capture theme state BEFORE swap — this runs before inline scripts in the new doc
document.addEventListener("astro:before-swap", event => {
  // Save the current effective mode
  _savedMode = window.BrandTheme
    ? window.BrandTheme.getEffectiveMode()
    : document.documentElement.getAttribute("data-theme");



  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Astro transition event lacks newDocument type
  const newDoc = (event as any).newDocument as Document;

  // Stamp the new document's <html> with current theme
  if (_savedMode) {
    newDoc.documentElement.setAttribute("data-theme", _savedMode);
  }

  // Preserve meta theme-color
  const bgColor = document
    .querySelector("meta[name='theme-color']")
    ?.getAttribute("content");
  if (bgColor) {
    newDoc
      .querySelector("meta[name='theme-color']")
      ?.setAttribute("content", bgColor);
  }
});

// After swap: the new doc is live.
document.addEventListener("astro:after-swap", () => {
  if (_savedMode) {
    // Force the correct mode on both DOM and BrandTheme
    document.documentElement.setAttribute("data-theme", _savedMode);
    if (window.BrandTheme) {
      window.BrandTheme.mode(_savedMode);
    }
  }
  setThemeFeature();
});

// Sync with system preference changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => {
    // BrandTheme handles auto mode internally, just update UI
    reflectPreference();
  });
