"use client";

const THEME_KEY = "shadcn-theme";
const ACCENT_KEY = "shadcn-accent";

export const THEME_CLASSES = [
  "neutral",
  "stone",
  "zinc",
  "gray",
  "slate",
];

export const ACCENT_CLASSES = [
  "default",
  "red",
  "rose",
  "orange",
  "green",
  "blue",
  "yellow",
  "violet",
];

function root() {
  return typeof document !== "undefined" ? document.documentElement : null;
}

export function applyThemeClass(name?: string | null) {
  const el = root();
  if (!el || !name) return;
  // remove any existing theme classes then add the new one
  THEME_CLASSES.forEach((c) => el.classList.remove(c));
  el.classList.add(name);
  try {
    localStorage.setItem(THEME_KEY, name);
  } catch (e) {
    // ignore
  }
}

export function applyAccentClass(name?: string | null) {
  const el = root();
  if (!el || !name) return;
  ACCENT_CLASSES.forEach((c) => el.classList.remove(c));
  el.classList.add(name);
  try {
    localStorage.setItem(ACCENT_KEY, name);
  } catch (e) {
    // ignore
  }
}

export function initThemeAndAccent() {
  if (typeof window === "undefined") return;
  try {
    const t = localStorage.getItem(THEME_KEY);
    const a = localStorage.getItem(ACCENT_KEY);
    if (t) applyThemeClass(t);
    if (a) applyAccentClass(a);
  } catch (e) {
    // ignore
  }
}

export function clearThemeAndAccent() {
  const el = root();
  if (!el) return;
  THEME_CLASSES.forEach((c) => el.classList.remove(c));
  ACCENT_CLASSES.forEach((c) => el.classList.remove(c));
  try {
    localStorage.removeItem(THEME_KEY);
    localStorage.removeItem(ACCENT_KEY);
  } catch (e) {}
}

export default {
  applyThemeClass,
  applyAccentClass,
  initThemeAndAccent,
  clearThemeAndAccent,
};
