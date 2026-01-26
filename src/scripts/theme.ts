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

function setThemeFeature(): void {
  reflectPreference();

  // Wire up theme button to BrandTheme.toggle()
  document.querySelector("#theme-btn")?.addEventListener("click", () => {
    if (window.BrandTheme) {
      window.BrandTheme.toggle();
    }
    reflectPreference();
  });
}

// Set up theme features after page load
setThemeFeature();

// Runs on view transitions navigation
document.addEventListener("astro:after-swap", setThemeFeature);

// Set theme-color value before page transition
document.addEventListener("astro:before-swap", event => {
  const astroEvent = event;
  const bgColor = document
    .querySelector("meta[name='theme-color']")
    ?.getAttribute("content");

  if (bgColor) {
    (astroEvent as any).newDocument
      .querySelector("meta[name='theme-color']")
      ?.setAttribute("content", bgColor);
  }
});

// Sync with system preference changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => {
    // BrandTheme handles auto mode internally, just update UI
    reflectPreference();
  });
