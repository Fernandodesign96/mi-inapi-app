"use client";

import { clsx } from "clsx";
import { AlertTriangle, AlertCircle, RefreshCw, CheckCircle, LucideIcon } from "lucide-react";

export type BadgeVariant = 'danger' | 'warning' | 'info' | 'success';

interface StatusBadgeProps {
  variant: BadgeVariant;
  label: string;
  showIcon?: boolean;
}

const variantConfig: Record<BadgeVariant, { bg: string; text: string; icon: LucideIcon }> = {
  danger: {
    bg: "bg-[#FEE2E2]",
    text: "text-[#DC2626]",
    icon: AlertTriangle,
  },
  warning: {
    bg: "bg-[#FEF3C7]",
    text: "text-[#D97706]",
    icon: AlertCircle,
  },
  info: {
    bg: "bg-[#DBEAFE]",
    text: "text-[#2563EB]",
    icon: RefreshCw,
  },
  success: {
    bg: "bg-[#D1FAE5]",
    text: "text-[#059669]",
    icon: CheckCircle,
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
      className={clsx(
        "inline-flex items-center gap-1 px-[10px] py-[2px] rounded-full",
        "font-sans text-[11px] font-semibold uppercase tracking-[0.05em]",
        config.bg,
        config.text
      )}
    >
      {showIcon && <Icon size={14} strokeWidth={2.5} />}
      <span>{label}</span>
    </div>
  );
}
