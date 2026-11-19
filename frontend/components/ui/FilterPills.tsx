"use client";

import { clsx } from "clsx";
import useEmblaCarousel from "embla-carousel-react";

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
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  return (
    <div
      ref={emblaRef}
      role="tablist"
      className={clsx("overflow-hidden py-[2px] select-none", className)}
    >
      <div className="flex items-center gap-2">
        {options.map((opt) => {
          const isActive = opt.value === activeValue;
          return (
            <button
              key={opt.value}
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(opt.value)}
              className={clsx(
                "flex-shrink-0 min-h-[29px] px-4 py-[6px] rounded-full text-body-sm font-sans transition-all duration-150 outline-none touch-target-chip",
                "focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background",
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
    </div>
  );
}
