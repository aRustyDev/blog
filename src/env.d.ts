interface BrandThemeAPI {
  init: (config: string | object) => void;
  theme: (name: string) => boolean;
  mode: (mode: string) => boolean;
  toggle: () => void;
  getTheme: () => string;
  getMode: () => string;
  getEffectiveMode: () => string;
  themes: string[];
}

interface Window {
  BrandTheme?: BrandThemeAPI;
  theme?: {
    themeValue: string;
    setPreference: () => void;
    reflectPreference: () => void;
    getTheme: () => string;
    setTheme: (val: string) => void;
  };
}
