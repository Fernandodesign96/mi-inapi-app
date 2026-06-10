"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";
import { useThemeStore } from "@/lib/themeStore";

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme, hydrate } = useThemeStore();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Activar modo día" : "Activar modo noche"}
      aria-pressed={isDark}
      className={
        className ??
        "w-11 h-11 flex items-center justify-center cursor-pointer text-muted-secondary hover:text-foreground active:opacity-60 transition-colors focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm touch-target"
      }
    >
      {isDark ? <Sun size={22} strokeWidth={2} /> : <Moon size={22} strokeWidth={2} />}
    </button>
  );
}