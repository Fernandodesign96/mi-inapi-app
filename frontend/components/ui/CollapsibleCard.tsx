"use client";

import { ChevronDown } from "lucide-react";
import { clsx } from "clsx";
import { BadgeVariant as SemaphoreVariant } from "./StatusBadge";

const variantStyles: Record<SemaphoreVariant, { border: string; bg: string }> = {
  danger: {
    border: "border-l-[#DC2626]",
    bg: "bg-[linear-gradient(to_right,#FFF5F5_0%,#FFFFFF_40%)]",
  },
  warning: {
    border: "border-l-[#D97706]",
    bg: "bg-[linear-gradient(to_right,#FFFBEB_0%,#FFFFFF_40%)]",
  },
  info: {
    border: "border-l-[#2563EB]",
    bg: "bg-[linear-gradient(to_right,#EFF6FF_0%,#FFFFFF_40%)]",
  },
  success: {
    border: "border-l-[#059669]",
    bg: "bg-[linear-gradient(to_right,#F0FDF4_0%,#FFFFFF_40%)]",
  },
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
  const styles = variantStyles[variant];

  return (
    <div
      className={clsx(
        "rounded-[14px] border-l-4 shadow-card transition-card overflow-hidden",
        styles.border,
        styles.bg,
        className
      )}
    >
      {/* Header — always visible */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className={clsx(
          "w-full text-left p-4 outline-none",
          "hover:bg-white/50 transition-colors"
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">{header}</div>
          <div className={clsx(
            "mt-1 w-6 h-6 flex items-center justify-center rounded-full bg-black/5 text-[#9CA3AF] transition-transform duration-250",
            isOpen && "rotate-180"
          )}>
            <ChevronDown size={18} strokeWidth={2.5} />
          </div>
        </div>

        {/* Preview — only when collapsed */}
        {!isOpen && preview && (
          <p className="text-body-sm text-[#4B5563] mt-2 line-clamp-2 leading-relaxed">
            {preview}
          </p>
        )}
      </button>

      {/* Separator inside */}
      <div className={clsx(
        "mx-4 border-t border-[#E5E7EB] transition-opacity duration-200",
        isOpen ? "opacity-100" : "opacity-0"
      )} />

      {/* Collapsible content */}
      <div
        className={clsx(
          "transition-all duration-250 ease-in-out overflow-hidden",
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="p-4 pt-2">{content}</div>
      </div>
    </div>
  );
}
