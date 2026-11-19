"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BadgeVariant as SemaphoreVariant } from "./StatusBadge";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const variantStyles: Record<SemaphoreVariant, { border: string; bg: string }> = {
  danger: {
    border: "border-l-danger",
    bg: "bg-gradient-to-r from-danger-bg/90 to-surface",
  },
  warning: {
    border: "border-l-warning",
    bg: "bg-gradient-to-r from-warning-bg/90 to-surface",
  },
  info: {
    border: "border-l-info",
    bg: "bg-gradient-to-r from-info-bg/80 to-surface",
  },
  success: {
    border: "border-l-success",
    bg: "bg-gradient-to-r from-success-bg/80 to-surface",
  },
  neutral: {
    border: "border-l-border",
    bg: "bg-surface",
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
  const reduced = usePrefersReducedMotion();

  return (
    <div
      className={cn(
        "rounded-2xl border-l-[3px] shadow-card transition-card overflow-hidden",
        styles.border,
        styles.bg,
        className
      )}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className={cn(
          "w-full text-left p-5 outline-none",
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
          <p className="text-[13px] text-muted-secondary mt-2 line-clamp-2 leading-relaxed">
            {preview}
          </p>
        )}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.22, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="mx-5 border-t border-border" />
            <div className="p-5 pt-3">{content}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
