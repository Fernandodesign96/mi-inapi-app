"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { clsx } from "clsx";

export const DASHBOARD_SCROLL_ID = "dashboard-scroll";

type ScrollToTopFabProps = {
  /** Píxeles de scroll antes de mostrar el botón. */
  threshold?: number;
  className?: string;
};

export default function ScrollToTopFab({
  threshold = 240,
  className,
}: ScrollToTopFabProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const root = document.getElementById(DASHBOARD_SCROLL_ID);
    if (!root) return;

    const onScroll = () => {
      setVisible(root.scrollTop > threshold);
    };

    onScroll();
    root.addEventListener("scroll", onScroll, { passive: true });
    return () => root.removeEventListener("scroll", onScroll);
  }, [threshold]);

  const handleClick = () => {
    const root = document.getElementById(DASHBOARD_SCROLL_ID);
    root?.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={handleClick}
      className={clsx(
        "fixed z-50 flex h-[52px] w-[52px] items-center justify-center rounded-full",
        "bg-primary text-primary-foreground shadow-elevated",
        "bottom-[calc(var(--bottomnav-height)+env(safe-area-inset-bottom)+16px)] right-4",
        "transition-all hover:bg-primary-dark active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
      aria-label="Volver al inicio de la página"
    >
      <ArrowUp size={22} strokeWidth={2.5} aria-hidden />
    </button>
  );
}
