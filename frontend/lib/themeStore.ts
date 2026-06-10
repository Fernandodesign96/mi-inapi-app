"use client";

import { create } from "zustand";

export type ThemeMode = "light" | "dark";

const STORAGE_KEY = "miinapi-theme";

interface ThemeStore {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  hydrate: () => void;
}

function applyThemeToDocument(theme: ThemeMode) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme === "dark" ? "dark" : "light";
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: "dark",

  setTheme: (theme) => {
    localStorage.setItem(STORAGE_KEY, theme);
    applyThemeToDocument(theme);
    set({ theme });
  },

  toggleTheme: () => {
    const next = get().theme === "dark" ? "light" : "dark";
    get().setTheme(next);
  },

  hydrate: () => {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    const theme = stored === "light" || stored === "dark" ? stored : "dark";
    applyThemeToDocument(theme);
    set({ theme });
  },
}));