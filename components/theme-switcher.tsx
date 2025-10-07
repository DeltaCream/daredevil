// components/ThemeSwitcher.tsx
import React, { useEffect, useState, useRef } from "react";

/**
 * Compact OKLCH maps for light/dark theme bases and accent colors.
 *
 * NOTE: values use the same format as your globals.css (oklch(L C H)).
 * L (0..1), C (~0..0.37 typical), H (deg).
 */

// Light variants (compact)
const THEMES_LIGHT: Record<string, Record<string, string>> = {
  neutral: {
    "--radius": "0.625rem",
    "--background": "oklch(1 0 0)",
    "--foreground": "oklch(0.129 0.042 264.695)",
    "--card": "oklch(1 0 0)",
    "--card-foreground": "oklch(0.129 0.042 264.695)",
    "--popover": "oklch(1 0 0)",
    "--popover-foreground": "oklch(0.129 0.042 264.695)",
    "--secondary": "oklch(0.968 0.007 247.896)",
    "--secondary-foreground": "oklch(0.208 0.042 265.755)",
    "--muted": "oklch(0.968 0.007 247.896)",
    "--muted-foreground": "oklch(0.554 0.046 257.417)",
    "--accent": "oklch(0.968 0.007 247.896)",
    "--accent-foreground": "oklch(0.208 0.042 265.755)",
    "--destructive": "oklch(0.577 0.245 27.325)",
    "--border": "oklch(0.929 0.013 255.508)",
    "--input": "oklch(0.929 0.013 255.508)",
    "--chart-1": "oklch(0.646 0.222 41.116)",
    "--chart-2": "oklch(0.6 0.118 184.704)",
    "--chart-3": "oklch(0.398 0.07 227.392)",
    "--chart-4": "oklch(0.828 0.189 84.429)",
    "--chart-5": "oklch(0.769 0.188 70.08)",
    "--sidebar": "oklch(0.984 0.003 247.858)",
    "--sidebar-foreground": "oklch(0.129 0.042 264.695)",
    "--sidebar-accent": "oklch(0.968 0.007 247.896)",
    "--sidebar-accent-foreground": "oklch(0.208 0.042 265.755)",
    "--sidebar-border": "oklch(0.929 0.013 255.508)"
  },
  stone: {
    "--radius": "0.625rem",
    "--background": "oklch(1 0 0)",
    "--foreground": "oklch(0.129 0.042 264.695)",
    "--card": "oklch(1 0 0)",
    "--card-foreground": "oklch(0.129 0.042 264.695)",
    "--popover": "oklch(1 0 0)",
    "--popover-foreground": "oklch(0.129 0.042 264.695)",
    "--secondary": "oklch(0.968 0.007 247.896)",
    "--secondary-foreground": "oklch(0.208 0.042 265.755)",
    "--muted": "oklch(0.968 0.007 247.896)",
    "--muted-foreground": "oklch(0.554 0.046 257.417)",
    "--accent": "oklch(0.968 0.007 247.896)",
    "--accent-foreground": "oklch(0.208 0.042 265.755)",
    "--destructive": "oklch(0.577 0.245 27.325)",
    "--border": "oklch(0.929 0.013 255.508)",
    "--input": "oklch(0.929 0.013 255.508)",
    "--chart-1": "oklch(0.646 0.222 41.116)",
    "--chart-2": "oklch(0.6 0.118 184.704)",
    "--chart-3": "oklch(0.398 0.07 227.392)",
    "--chart-4": "oklch(0.828 0.189 84.429)",
    "--chart-5": "oklch(0.769 0.188 70.08)",
    "--sidebar": "oklch(0.984 0.003 247.858)",
    "--sidebar-foreground": "oklch(0.129 0.042 264.695)",
    "--sidebar-accent": "oklch(0.968 0.007 247.896)",
    "--sidebar-accent-foreground": "oklch(0.208 0.042 265.755)",
    "--sidebar-border": "oklch(0.929 0.013 255.508)"
  },
  zinc: {
    "--radius": "0.625rem",
    "--background": "oklch(1 0 0)",
    "--foreground": "oklch(0.129 0.042 264.695)",
    "--card": "oklch(1 0 0)",
    "--card-foreground": "oklch(0.129 0.042 264.695)",
    "--popover": "oklch(1 0 0)",
    "--popover-foreground": "oklch(0.129 0.042 264.695)",
    "--secondary": "oklch(0.968 0.007 247.896)",
    "--secondary-foreground": "oklch(0.208 0.042 265.755)",
    "--muted": "oklch(0.968 0.007 247.896)",
    "--muted-foreground": "oklch(0.554 0.046 257.417)",
    "--accent": "oklch(0.968 0.007 247.896)",
    "--accent-foreground": "oklch(0.208 0.042 265.755)",
    "--destructive": "oklch(0.577 0.245 27.325)",
    "--border": "oklch(0.929 0.013 255.508)",
    "--input": "oklch(0.929 0.013 255.508)",
    "--chart-1": "oklch(0.646 0.222 41.116)",
    "--chart-2": "oklch(0.6 0.118 184.704)",
    "--chart-3": "oklch(0.398 0.07 227.392)",
    "--chart-4": "oklch(0.828 0.189 84.429)",
    "--chart-5": "oklch(0.769 0.188 70.08)",
    "--sidebar": "oklch(0.984 0.003 247.858)",
    "--sidebar-foreground": "oklch(0.129 0.042 264.695)",
    "--sidebar-accent": "oklch(0.968 0.007 247.896)",
    "--sidebar-accent-foreground": "oklch(0.208 0.042 265.755)",
    "--sidebar-border": "oklch(0.929 0.013 255.508)"
  },
  grey: {
    "--radius": "0.625rem",
    "--background": "oklch(1 0 0)",
    "--foreground": "oklch(0.129 0.042 264.695)",
    "--card": "oklch(1 0 0)",
    "--card-foreground": "oklch(0.129 0.042 264.695)",
    "--popover": "oklch(1 0 0)",
    "--popover-foreground": "oklch(0.129 0.042 264.695)",
    "--secondary": "oklch(0.968 0.007 247.896)",
    "--secondary-foreground": "oklch(0.208 0.042 265.755)",
    "--muted": "oklch(0.968 0.007 247.896)",
    "--muted-foreground": "oklch(0.554 0.046 257.417)",
    "--accent": "oklch(0.968 0.007 247.896)",
    "--accent-foreground": "oklch(0.208 0.042 265.755)",
    "--destructive": "oklch(0.577 0.245 27.325)",
    "--border": "oklch(0.929 0.013 255.508)",
    "--input": "oklch(0.929 0.013 255.508)",
    "--chart-1": "oklch(0.646 0.222 41.116)",
    "--chart-2": "oklch(0.6 0.118 184.704)",
    "--chart-3": "oklch(0.398 0.07 227.392)",
    "--chart-4": "oklch(0.828 0.189 84.429)",
    "--chart-5": "oklch(0.769 0.188 70.08)",
    "--sidebar": "oklch(0.984 0.003 247.858)",
    "--sidebar-foreground": "oklch(0.129 0.042 264.695)",
    "--sidebar-accent": "oklch(0.968 0.007 247.896)",
    "--sidebar-accent-foreground": "oklch(0.208 0.042 265.755)",
    "--sidebar-border": "oklch(0.929 0.013 255.508)"
  },
  slate: {
    "--radius": "0.625rem",
    "--background": "oklch(1 0 0)",
    "--foreground": "oklch(0.129 0.042 264.695)",
    "--card": "oklch(1 0 0)",
    "--card-foreground": "oklch(0.129 0.042 264.695)",
    "--popover": "oklch(1 0 0)",
    "--popover-foreground": "oklch(0.129 0.042 264.695)",
    "--secondary": "oklch(0.968 0.007 247.896)",
    "--secondary-foreground": "oklch(0.208 0.042 265.755)",
    "--muted": "oklch(0.968 0.007 247.896)",
    "--muted-foreground": "oklch(0.554 0.046 257.417)",
    "--accent": "oklch(0.968 0.007 247.896)",
    "--accent-foreground": "oklch(0.208 0.042 265.755)",
    "--destructive": "oklch(0.577 0.245 27.325)",
    "--border": "oklch(0.929 0.013 255.508)",
    "--input": "oklch(0.929 0.013 255.508)",
    "--chart-1": "oklch(0.646 0.222 41.116)",
    "--chart-2": "oklch(0.6 0.118 184.704)",
    "--chart-3": "oklch(0.398 0.07 227.392)",
    "--chart-4": "oklch(0.828 0.189 84.429)",
    "--chart-5": "oklch(0.769 0.188 70.08)",
    "--sidebar": "oklch(0.984 0.003 247.858)",
    "--sidebar-foreground": "oklch(0.129 0.042 264.695)",
    "--sidebar-accent": "oklch(0.968 0.007 247.896)",
    "--sidebar-accent-foreground": "oklch(0.208 0.042 265.755)",
    "--sidebar-border": "oklch(0.929 0.013 255.508)"
  }
};

// Dark variants (compact)
const THEMES_DARK: Record<string, Record<string, string>> = {
  neutral: {
    "--radius": "0.625rem",
    "--background": "oklch(1 0 0)",
    "--foreground": "oklch(0.129 0.042 264.695)",
    "--card": "oklch(1 0 0)",
    "--card-foreground": "oklch(0.129 0.042 264.695)",
    "--popover": "oklch(1 0 0)",
    "--popover-foreground": "oklch(0.129 0.042 264.695)",
    "--secondary": "oklch(0.968 0.007 247.896)",
    "--secondary-foreground": "oklch(0.208 0.042 265.755)",
    "--muted": "oklch(0.968 0.007 247.896)",
    "--muted-foreground": "oklch(0.554 0.046 257.417)",
    "--accent": "oklch(0.968 0.007 247.896)",
    "--accent-foreground": "oklch(0.208 0.042 265.755)",
    "--destructive": "oklch(0.577 0.245 27.325)",
    "--border": "oklch(0.929 0.013 255.508)",
    "--input": "oklch(0.929 0.013 255.508)",
    "--chart-1": "oklch(0.646 0.222 41.116)",
    "--chart-2": "oklch(0.6 0.118 184.704)",
    "--chart-3": "oklch(0.398 0.07 227.392)",
    "--chart-4": "oklch(0.828 0.189 84.429)",
    "--chart-5": "oklch(0.769 0.188 70.08)",
    "--sidebar": "oklch(0.984 0.003 247.858)",
    "--sidebar-foreground": "oklch(0.129 0.042 264.695)",
    "--sidebar-accent": "oklch(0.968 0.007 247.896)",
    "--sidebar-accent-foreground": "oklch(0.208 0.042 265.755)",
    "--sidebar-border": "oklch(0.929 0.013 255.508)"
  },
  stone: {
    "--radius": "0.625rem",
    "--background": "oklch(1 0 0)",
    "--foreground": "oklch(0.129 0.042 264.695)",
    "--card": "oklch(1 0 0)",
    "--card-foreground": "oklch(0.129 0.042 264.695)",
    "--popover": "oklch(1 0 0)",
    "--popover-foreground": "oklch(0.129 0.042 264.695)",
    "--secondary": "oklch(0.968 0.007 247.896)",
    "--secondary-foreground": "oklch(0.208 0.042 265.755)",
    "--muted": "oklch(0.968 0.007 247.896)",
    "--muted-foreground": "oklch(0.554 0.046 257.417)",
    "--accent": "oklch(0.968 0.007 247.896)",
    "--accent-foreground": "oklch(0.208 0.042 265.755)",
    "--destructive": "oklch(0.577 0.245 27.325)",
    "--border": "oklch(0.929 0.013 255.508)",
    "--input": "oklch(0.929 0.013 255.508)",
    "--chart-1": "oklch(0.646 0.222 41.116)",
    "--chart-2": "oklch(0.6 0.118 184.704)",
    "--chart-3": "oklch(0.398 0.07 227.392)",
    "--chart-4": "oklch(0.828 0.189 84.429)",
    "--chart-5": "oklch(0.769 0.188 70.08)",
    "--sidebar": "oklch(0.984 0.003 247.858)",
    "--sidebar-foreground": "oklch(0.129 0.042 264.695)",
    "--sidebar-accent": "oklch(0.968 0.007 247.896)",
    "--sidebar-accent-foreground": "oklch(0.208 0.042 265.755)",
    "--sidebar-border": "oklch(0.929 0.013 255.508)"
  },
  zinc: {
    "--radius": "0.625rem",
    "--background": "oklch(1 0 0)",
    "--foreground": "oklch(0.129 0.042 264.695)",
    "--card": "oklch(1 0 0)",
    "--card-foreground": "oklch(0.129 0.042 264.695)",
    "--popover": "oklch(1 0 0)",
    "--popover-foreground": "oklch(0.129 0.042 264.695)",
    "--secondary": "oklch(0.968 0.007 247.896)",
    "--secondary-foreground": "oklch(0.208 0.042 265.755)",
    "--muted": "oklch(0.968 0.007 247.896)",
    "--muted-foreground": "oklch(0.554 0.046 257.417)",
    "--accent": "oklch(0.968 0.007 247.896)",
    "--accent-foreground": "oklch(0.208 0.042 265.755)",
    "--destructive": "oklch(0.577 0.245 27.325)",
    "--border": "oklch(0.929 0.013 255.508)",
    "--input": "oklch(0.929 0.013 255.508)",
    "--chart-1": "oklch(0.646 0.222 41.116)",
    "--chart-2": "oklch(0.6 0.118 184.704)",
    "--chart-3": "oklch(0.398 0.07 227.392)",
    "--chart-4": "oklch(0.828 0.189 84.429)",
    "--chart-5": "oklch(0.769 0.188 70.08)",
    "--sidebar": "oklch(0.984 0.003 247.858)",
    "--sidebar-foreground": "oklch(0.129 0.042 264.695)",
    "--sidebar-accent": "oklch(0.968 0.007 247.896)",
    "--sidebar-accent-foreground": "oklch(0.208 0.042 265.755)",
    "--sidebar-border": "oklch(0.929 0.013 255.508)"
  },
  grey: {
    "--radius": "0.625rem",
    "--background": "oklch(1 0 0)",
    "--foreground": "oklch(0.129 0.042 264.695)",
    "--card": "oklch(1 0 0)",
    "--card-foreground": "oklch(0.129 0.042 264.695)",
    "--popover": "oklch(1 0 0)",
    "--popover-foreground": "oklch(0.129 0.042 264.695)",
    "--secondary": "oklch(0.968 0.007 247.896)",
    "--secondary-foreground": "oklch(0.208 0.042 265.755)",
    "--muted": "oklch(0.968 0.007 247.896)",
    "--muted-foreground": "oklch(0.554 0.046 257.417)",
    "--accent": "oklch(0.968 0.007 247.896)",
    "--accent-foreground": "oklch(0.208 0.042 265.755)",
    "--destructive": "oklch(0.577 0.245 27.325)",
    "--border": "oklch(0.929 0.013 255.508)",
    "--input": "oklch(0.929 0.013 255.508)",
    "--chart-1": "oklch(0.646 0.222 41.116)",
    "--chart-2": "oklch(0.6 0.118 184.704)",
    "--chart-3": "oklch(0.398 0.07 227.392)",
    "--chart-4": "oklch(0.828 0.189 84.429)",
    "--chart-5": "oklch(0.769 0.188 70.08)",
    "--sidebar": "oklch(0.984 0.003 247.858)",
    "--sidebar-foreground": "oklch(0.129 0.042 264.695)",
    "--sidebar-accent": "oklch(0.968 0.007 247.896)",
    "--sidebar-accent-foreground": "oklch(0.208 0.042 265.755)",
    "--sidebar-border": "oklch(0.929 0.013 255.508)"
  },
  slate: {
    "--radius": "0.625rem",
    "--background": "oklch(1 0 0)",
    "--foreground": "oklch(0.129 0.042 264.695)",
    "--card": "oklch(1 0 0)",
    "--card-foreground": "oklch(0.129 0.042 264.695)",
    "--popover": "oklch(1 0 0)",
    "--popover-foreground": "oklch(0.129 0.042 264.695)",
    "--secondary": "oklch(0.968 0.007 247.896)",
    "--secondary-foreground": "oklch(0.208 0.042 265.755)",
    "--muted": "oklch(0.968 0.007 247.896)",
    "--muted-foreground": "oklch(0.554 0.046 257.417)",
    "--accent": "oklch(0.968 0.007 247.896)",
    "--accent-foreground": "oklch(0.208 0.042 265.755)",
    "--destructive": "oklch(0.577 0.245 27.325)",
    "--border": "oklch(0.929 0.013 255.508)",
    "--input": "oklch(0.929 0.013 255.508)",
    "--chart-1": "oklch(0.646 0.222 41.116)",
    "--chart-2": "oklch(0.6 0.118 184.704)",
    "--chart-3": "oklch(0.398 0.07 227.392)",
    "--chart-4": "oklch(0.828 0.189 84.429)",
    "--chart-5": "oklch(0.769 0.188 70.08)",
    "--sidebar": "oklch(0.984 0.003 247.858)",
    "--sidebar-foreground": "oklch(0.129 0.042 264.695)",
    "--sidebar-accent": "oklch(0.968 0.007 247.896)",
    "--sidebar-accent-foreground": "oklch(0.208 0.042 265.755)",
    "--sidebar-border": "oklch(0.929 0.013 255.508)"
  }
};

// Accent color tokens (primary, primary-foreground, ring, sidebar-primary, sidebar-primary-foreground, sidebar-ring)
const ACCENTS_LIGHT: Record<string, Record<string, string>> = {
  red: {
    "--primary": "oklch(0.637 0.237 25.331)",
    "--primary-foreground": "oklch(0.971 0.013 17.38)",
    "--ring": "oklch(0.637 0.237 25.331)",
    "--sidebar-primary": "oklch(0.637 0.237 25.331)",
    "--sidebar-primary-foreground": "oklch(0.971 0.013 17.38)",
    "--sidebar-ring": "oklch(0.637 0.237 25.331)"
  },
  rose: {
    "--primary": "oklch(0.623 0.214 259.815)",
    "--primary-foreground": "oklch(0.97 0.014 254.604)",
    "--ring": "oklch(0.623 0.214 259.815)",
    "--sidebar-primary": "oklch(0.623 0.214 259.815)",
    "--sidebar-primary-foreground": "oklch(0.97 0.014 254.604)",
    "--sidebar-ring": "oklch(0.623 0.214 259.815)"
  },
  yellow: {
    "--primary": "oklch(0.623 0.214 259.815)",
    "--primary-foreground": "oklch(0.97 0.014 254.604)",
    "--ring": "oklch(0.623 0.214 259.815)",
    "--sidebar-primary": "oklch(0.623 0.214 259.815)",
    "--sidebar-primary-foreground": "oklch(0.97 0.014 254.604)",
    "--sidebar-ring": "oklch(0.623 0.214 259.815)"
  },
  orange: {
    "--primary": "oklch(0.623 0.214 259.815)",
    "--primary-foreground": "oklch(0.97 0.014 254.604)",
    "--ring": "oklch(0.623 0.214 259.815)",
    "--sidebar-primary": "oklch(0.623 0.214 259.815)",
    "--sidebar-primary-foreground": "oklch(0.97 0.014 254.604)",
    "--sidebar-ring": "oklch(0.623 0.214 259.815)"
  },
  green: {
    "--primary": "oklch(0.623 0.214 259.815)",
    "--primary-foreground": "oklch(0.97 0.014 254.604)",
    "--ring": "oklch(0.623 0.214 259.815)",
    "--sidebar-primary": "oklch(0.623 0.214 259.815)",
    "--sidebar-primary-foreground": "oklch(0.97 0.014 254.604)",
    "--sidebar-ring": "oklch(0.623 0.214 259.815)"
  },
  blue: {
    "--primary": "oklch(0.623 0.214 259.815)",
    "--primary-foreground": "oklch(0.97 0.014 254.604)",
    "--ring": "oklch(0.623 0.214 259.815)",
    "--sidebar-primary": "oklch(0.623 0.214 259.815)",
    "--sidebar-primary-foreground": "oklch(0.97 0.014 254.604)",
    "--sidebar-ring": "oklch(0.623 0.214 259.815)"
  },
  violet: {
    "--primary": "oklch(0.623 0.214 259.815)",
    "--primary-foreground": "oklch(0.97 0.014 254.604)",
    "--ring": "oklch(0.623 0.214 259.815)",
    "--sidebar-primary": "oklch(0.623 0.214 259.815)",
    "--sidebar-primary-foreground": "oklch(0.97 0.014 254.604)",
    "--sidebar-ring": "oklch(0.623 0.214 259.815)"
  }
};

const ACCENTS_DARK: Record<string, Record<string, string>> = {
  red: {
    "--primary": "oklch(0.637 0.237 25.331)",
    "--primary-foreground": "oklch(0.971 0.013 17.38)",
    "--ring": "oklch(0.637 0.237 25.331)",
    "--sidebar-primary": "oklch(0.637 0.237 25.331)",
    "--sidebar-primary-foreground": "oklch(0.971 0.013 17.38)",
    "--sidebar-ring": "oklch(0.637 0.237 25.331)"
  },
  rose: {
    "--primary": "oklch(0.623 0.214 259.815)",
    "--primary-foreground": "oklch(0.97 0.014 254.604)",
    "--ring": "oklch(0.623 0.214 259.815)",
    "--sidebar-primary": "oklch(0.623 0.214 259.815)",
    "--sidebar-primary-foreground": "oklch(0.97 0.014 254.604)",
    "--sidebar-ring": "oklch(0.623 0.214 259.815)"
  },
  yellow: {
    "--primary": "oklch(0.623 0.214 259.815)",
    "--primary-foreground": "oklch(0.97 0.014 254.604)",
    "--ring": "oklch(0.623 0.214 259.815)",
    "--sidebar-primary": "oklch(0.623 0.214 259.815)",
    "--sidebar-primary-foreground": "oklch(0.97 0.014 254.604)",
    "--sidebar-ring": "oklch(0.623 0.214 259.815)"
  },
  orange: {
    "--primary": "oklch(0.623 0.214 259.815)",
    "--primary-foreground": "oklch(0.97 0.014 254.604)",
    "--ring": "oklch(0.623 0.214 259.815)",
    "--sidebar-primary": "oklch(0.623 0.214 259.815)",
    "--sidebar-primary-foreground": "oklch(0.97 0.014 254.604)",
    "--sidebar-ring": "oklch(0.623 0.214 259.815)"
  },
  green: {
    "--primary": "oklch(0.623 0.214 259.815)",
    "--primary-foreground": "oklch(0.97 0.014 254.604)",
    "--ring": "oklch(0.623 0.214 259.815)",
    "--sidebar-primary": "oklch(0.623 0.214 259.815)",
    "--sidebar-primary-foreground": "oklch(0.97 0.014 254.604)",
    "--sidebar-ring": "oklch(0.623 0.214 259.815)"
  },
  blue: {
    "--primary": "oklch(0.623 0.214 259.815)",
    "--primary-foreground": "oklch(0.97 0.014 254.604)",
    "--ring": "oklch(0.623 0.214 259.815)",
    "--sidebar-primary": "oklch(0.623 0.214 259.815)",
    "--sidebar-primary-foreground": "oklch(0.97 0.014 254.604)",
    "--sidebar-ring": "oklch(0.623 0.214 259.815)"
  },
  violet: {
    "--primary": "oklch(0.623 0.214 259.815)",
    "--primary-foreground": "oklch(0.97 0.014 254.604)",
    "--ring": "oklch(0.623 0.214 259.815)",
    "--sidebar-primary": "oklch(0.623 0.214 259.815)",
    "--sidebar-primary-foreground": "oklch(0.97 0.014 254.604)",
    "--sidebar-ring": "oklch(0.623 0.214 259.815)"
  }
};

const THEMES = Object.keys(THEMES_LIGHT);
const COLORS = Object.keys(ACCENTS_LIGHT);

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<string>(() => {
    try { return localStorage.getItem("siteTheme") || "slate"; } catch { return "slate"; }
  });
  const [accent, setAccent] = useState<string>(() => {
    try { return localStorage.getItem("siteAccent") || "blue"; } catch { return "blue"; }
  });
  const observerRef = useRef<MutationObserver | null>(null);

  // function to apply theme tokens (chooses light/dark variant depending on .dark)
  function applyThemeAndAccent(themeName: string, accentName: string) {
    const root = document.documentElement;
    const isDark = root.classList.contains("dark");

    const baseMap = isDark ? THEMES_DARK[themeName] ?? THEMES_DARK.slate : THEMES_LIGHT[themeName] ?? THEMES_LIGHT.slate;
    const accentMap = isDark? ACCENTS_DARK[accentName] ?? ACCENTS_DARK.blue : ACCENTS_LIGHT[accentName] ?? ACCENTS_LIGHT.blue;

    // apply base tokens
    Object.entries(baseMap).forEach(([k, v]) => root.style.setProperty(k, v));
    // apply accent tokens (override where needed)
    Object.entries(accentMap).forEach(([k, v]) => root.style.setProperty(k, v));

    // also keep data attrs for CSS hooks if needed
    root.setAttribute("data-theme", themeName);
    root.setAttribute("data-accent", accentName);
  }

  // reapply when theme/accent state changes
  useEffect(() => {
    try {
      localStorage.setItem("siteTheme", theme);
      localStorage.setItem("siteAccent", accent);
    } catch {}
    applyThemeAndAccent(theme, accent);
  }, [theme, accent]);

  // observe html.classList changes so toggling .dark externally updates tokens
  useEffect(() => {
    const root = document.documentElement;
    if (!("MutationObserver" in window)) return;

    const mo = new MutationObserver(() => {
      applyThemeAndAccent(theme, accent);
    });
    mo.observe(root, { attributes: true, attributeFilter: ["class"] });
    observerRef.current = mo;
    return () => mo.disconnect();
  }, [theme, accent]);

  return (
    <div className="flex gap-4 items-center">
      <label className="flex flex-col">
        <span className="text-sm font-medium mb-1">Theme</span>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="rounded-md p-2 border"
        >
          {THEMES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </label>

      <label className="flex flex-col">
        <span className="text-sm font-medium mb-1">Accent</span>
        <select
          value={accent}
          onChange={(e) => setAccent(e.target.value)}
          className="rounded-md p-2 border"
        >
          {COLORS.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </label>
    </div>
  );
}
