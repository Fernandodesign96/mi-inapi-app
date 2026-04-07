import { AlertTriangle, AlertCircle, RefreshCw, CheckCircle } from "lucide-react";
import { clsx } from "clsx";

export type SemaphoreVariant = "danger" | "warning" | "info" | "success";

interface StatusBadgeProps {
  variant: SemaphoreVariant;
  label: string;
  size?: "sm" | "md";
  showIcon?: boolean;
  className?: string;
}

const variantStyles: Record<SemaphoreVariant, string> = {
  danger: "bg-[#FEE2E2] text-[#DC2626]",
  warning: "bg-[#FEF3C7] text-[#D97706]",
  info: "bg-[#DBEAFE] text-[#2563EB]",
  success: "bg-[#D1FAE5] text-[#059669]",
};

const variantIcons: Record<SemaphoreVariant, React.ComponentType<{ size?: number; className?: string }>> = {
  danger: AlertTriangle,
  warning: AlertCircle,
  info: RefreshCw,
  success: CheckCircle,
};

export default function StatusBadge({
  variant,
  label,
  size = "sm",
  showIcon = false,
  className,
}: StatusBadgeProps) {
  const Icon = variantIcons[variant];

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full font-semibold uppercase tracking-wider",
        variantStyles[variant],
        size === "sm" ? "px-2.5 py-0.5 text-[11px]" : "px-3 py-1 text-xs",
        className
      )}
    >
      {showIcon && <Icon size={10} />}
      {label}
    </span>
  );
}
