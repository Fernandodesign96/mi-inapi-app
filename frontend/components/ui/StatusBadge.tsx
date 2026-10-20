"use client";

import { cn } from "@/lib/utils";
import { AlertTriangle, AlertCircle, RefreshCw, CheckCircle, LucideIcon } from "lucide-react";

export type BadgeVariant = "danger" | "warning" | "info" | "success" | "neutral";

interface StatusBadgeProps {
  variant: BadgeVariant;
  label: string;
  showIcon?: boolean;
}

const variantConfig: Record<BadgeVariant, { bg: string; text: string; icon: LucideIcon }> = {
  danger: {
    bg: "bg-danger-bg",
    text: "text-danger",
    icon: AlertTriangle,
  },
  warning: {
    bg: "bg-warning-bg",
    text: "text-warning",
    icon: AlertCircle,
  },
  info: {
    bg: "bg-info-bg",
    text: "text-info",
    icon: RefreshCw,
  },
  success: {
    bg: "bg-success-bg",
    text: "text-success",
    icon: CheckCircle,
  },
  neutral: {
    bg: "bg-surface-elevated",
    text: "text-muted",
    icon: AlertCircle,
  },
};

export default function StatusBadge({
  variant,
  label,
  showIcon = true,
}: StatusBadgeProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 px-[10px] py-[2px] rounded-full min-h-[29px] touch-target-chip",
        "text-[12px] leading-[1.5] font-bold tracking-normal normal-case",
        config.bg,
        config.text
      )}
    >
      {showIcon && <Icon size={14} strokeWidth={2.5} />}
      <span>{label}</span>
    </div>
  );
}