"use client";

const COLOR_KEY = "shadcn-theme";
const ACCENT_KEY = "shadcn-accent";

export const COLOR_CLASSES = [
  "neutral",
  "stone",
  "zinc",
  "gray",
  "slate",
] as const;

export const ACCENT_CLASSES = [
  "default",
  "red",
  "rose",
  "orange",
  "green",
  "blue",
  "yellow",
  "violet",
] as const;

function root() {
  return typeof document !== "undefined" ? document.documentElement : null;
}

export function applyColorClass(name?: string | null) {
  const el = root();
  if (!el || !name) return;
  // remove any existing theme classes then add the new one
  COLOR_CLASSES.forEach((c) => el.classList.remove(c));
  el.classList.add(name);
  try {
    localStorage.setItem(COLOR_KEY, name);
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

export function initColorAndAccent() {
  if (typeof window === "undefined") return;
  try {
    const t = localStorage.getItem(COLOR_KEY);
    const a = localStorage.getItem(ACCENT_KEY);
    if (t) applyColorClass(t);
    if (a) applyAccentClass(a);
  } catch (e) {
    // ignore
  }
}

export function clearColorAndAccent() {
  const el = root();
  if (!el) return;
  COLOR_CLASSES.forEach((c) => el.classList.remove(c));
  ACCENT_CLASSES.forEach((c) => el.classList.remove(c));
  try {
    localStorage.removeItem(COLOR_KEY);
    localStorage.removeItem(ACCENT_KEY);
  } catch (e) {}
}

const colorManager = {
  applyColorClass,
  applyAccentClass,
  initColorAndAccent,
  clearColorAndAccent,
};

export default colorManager;
