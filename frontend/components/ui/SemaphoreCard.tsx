import { clsx } from "clsx";

export type Urgency = "danger" | "warning" | "info" | "success" | "neutral";

interface SemaphoreCardProps {
  children: React.ReactNode;
  urgency?: Urgency;
  className?: string;
  onClick?: () => void;
}

const variantStyles: Record<Urgency, { border: string; bg: string }> = {
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
  neutral: {
    border: "border-l-border",
    bg: "bg-surface",
  },
};

export default function SemaphoreCard({
  children,
  urgency = "neutral",
  className,
  onClick,
}: SemaphoreCardProps) {
  const styles = variantStyles[urgency];

  return (
    <div
      onClick={onClick}
      className={clsx(
        "rounded-lg border-l-4 shadow-card transition-card",
        styles.border,
        styles.bg,
        onClick && "cursor-pointer hover:shadow-elevated active:scale-[0.99]",
        className
      )}
    >
      <div className="p-4">{children}</div>
    </div>
  );
}
