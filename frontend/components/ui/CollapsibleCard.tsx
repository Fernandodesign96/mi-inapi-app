"use client";

import { ChevronDown } from "lucide-react";
import { clsx } from "clsx";
import { SemaphoreVariant } from "./StatusBadge";

const borderColors: Record<SemaphoreVariant, string> = {
  danger: "border-l-[#DC2626]",
  warning: "border-l-[#D97706]",
  info: "border-l-[#2563EB]",
  success: "border-l-[#059669]",
};

interface CollapsibleCardProps {
  variant: SemaphoreVariant;
  isOpen: boolean;
  onToggle: () => void;
  header: React.ReactNode;
  content: React.ReactNode;
  preview?: string;
  className?: string;
}

export default function CollapsibleCard({
  variant,
  isOpen,
  onToggle,
  header,
  content,
  preview,
  className,
}: CollapsibleCardProps) {
  return (
    <div
      className={clsx(
        "bg-white rounded-lg border-l-4 shadow-card overflow-hidden",
        borderColors[variant],
        className
      )}
    >
      {/* Header — always visible */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full text-left p-4 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#1A56DB]"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">{header}</div>
          <ChevronDown
            size={18}
            strokeWidth={2}
            color="#9CA3AF"
            className={clsx(
              "shrink-0 mt-0.5 transition-transform duration-250",
              isOpen && "rotate-180"
            )}
          />
        </div>

        {/* Preview — only when collapsed */}
        {!isOpen && preview && (
          <p className="text-[13px] text-[#9CA3AF] mt-1.5 leading-snug line-clamp-2">
            {preview}
          </p>
        )}
      </button>

      {/* Collapsible content */}
      <div
        className={clsx(
          "transition-all duration-250 ease-in-out overflow-hidden",
          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 pb-4">{content}</div>
      </div>
    </div>
  );
}
