"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { BadgeVariant as SemaphoreVariant } from "./StatusBadge";

const variantStyles: Record<SemaphoreVariant, { border: string; bg: string }> = {
  danger: {
    border: "border-l-danger",
    bg: "bg-gradient-to-r from-danger-bg to-surface",
  },
  warning: {
    border: "border-l-warning",
    bg: "bg-gradient-to-r from-warning-bg to-surface",
  },
  info: {
    border: "border-l-info",
    bg: "bg-gradient-to-r from-info-bg to-surface",
  },
  success: {
    border: "border-l-success",
    bg: "bg-gradient-to-r from-success-bg to-surface",
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
      className={cn(
        "rounded-lg border-l-4 shadow-card transition-card overflow-hidden",
        styles.border,
        styles.bg,
        className
      )}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className={cn(
          "w-full text-left p-4 outline-none",
          "hover:bg-surface/50 transition-colors min-h-[44px]",
          "focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-inset"
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">{header}</div>
          <div
            className={cn(
              "mt-1 w-6 h-6 flex items-center justify-center rounded-full bg-foreground/5 text-muted transition-transform duration-250",
              isOpen && "rotate-180"
            )}
          >
            <ChevronDown size={18} strokeWidth={2.5} />
          </div>
        </div>

        {!isOpen && preview && (
          <p className="text-body-sm text-muted-secondary mt-2 line-clamp-2 leading-relaxed">
            {preview}
          </p>
        )}
      </button>

      <div
        className={cn(
          "mx-4 border-t border-border transition-opacity duration-200",
          isOpen ? "opacity-100" : "opacity-0"
        )}
      />

      <div
        className={cn(
          "transition-all duration-250 ease-in-out overflow-hidden",
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="p-4 pt-2">{content}</div>
      </div>
    </div>
  );
}