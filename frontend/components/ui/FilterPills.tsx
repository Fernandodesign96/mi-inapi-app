"use client";

import { clsx } from "clsx";
import { useRef } from "react";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterPillsProps {
  options: FilterOption[];
  activeValue: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function FilterPills({
  options,
  activeValue,
  onChange,
  className,
}: FilterPillsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: React.WheelEvent) => {
    if (scrollRef.current) {
      // Translate vertical wheel move to horizontal scroll
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <div
      ref={scrollRef}
      role="tablist"
      onWheel={handleWheel}
      className={clsx(
        "flex items-center gap-2 overflow-x-auto hide-scrollbar py-[2px] select-none touch-pan-x",
        className
      )}
    >
      {options.map((opt) => {
        const isActive = opt.value === activeValue;
        return (
          <button
            key={opt.value}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(opt.value)}
            className={clsx(
              "flex-shrink-0 min-h-[36px] px-4 py-[6px] rounded-full text-body-sm font-sans transition-all duration-150 outline-none",
              "focus-visible:ring-2 focus-visible:ring-focus",
              isActive
                ? "bg-primary text-primary-foreground font-semibold"
                : "bg-surface-elevated text-muted-secondary border border-border font-medium hover:bg-border"
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
