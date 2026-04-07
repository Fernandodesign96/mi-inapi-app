"use client";

import { clsx } from "clsx";

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
  return (
    <div
      role="tablist"
      className={clsx(
        "flex items-center gap-2 overflow-x-auto hide-scrollbar py-1",
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
              "flex-shrink-0 rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#1A56DB]",
              isActive
                ? "bg-[#1A56DB] text-white font-semibold"
                : "bg-[#F3F4F6] text-[#4B5563] border border-[#E5E7EB] hover:bg-[#E5E7EB]"
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
