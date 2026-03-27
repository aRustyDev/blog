/**
 * Dev-mode theme profiles for CLISnippet Interactive.
 *
 * In production, syntax colors come from build-time Shiki dual themes
 * (github-light / github-dark) via CSS variables. These profiles are
 * only used in dev mode for live theme iteration.
 *
 * Profile switching is pure CSS: set a `data-profile` attribute on the
 * component wrapper, and CSS variable overrides apply.
 */

export interface ThemeProfile {
  name: string;
  label: string;
  variables: Record<string, string>;
}

export const defaultProfiles: ThemeProfile[] = [
  {
    name: "default",
    label: "Default",
    variables: {}, // Uses Shiki's built-in github-light/dark
  },
  {
    name: "high-contrast",
    label: "High Contrast",
    variables: {
      "--shiki-light": "#000000",
      "--shiki-dark": "#ffffff",
      "--shiki-light-bg": "#ffffff",
      "--shiki-dark-bg": "#000000",
    },
  },
];
