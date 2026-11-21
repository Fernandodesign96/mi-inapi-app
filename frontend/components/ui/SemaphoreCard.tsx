import { clsx } from "clsx";

export type Urgency = "danger" | "warning" | "info" | "success" | "neutral";

interface SemaphoreCardProps {
  children: React.ReactNode;
  urgency?: Urgency;
  className?: string;
  onClick?: () => void;
}

const variantStyles: Record<Urgency, { border: string; mesh: string }> = {
  danger: {
    border: "border-l-danger",
    mesh: "ui-card-mesh ui-card-mesh-danger",
  },
  warning: {
    border: "border-l-warning",
    mesh: "ui-card-mesh ui-card-mesh-warning",
  },
  info: {
    border: "border-l-info",
    mesh: "ui-card-mesh ui-card-mesh-info",
  },
  success: {
    border: "border-l-success",
    mesh: "ui-card-mesh ui-card-mesh-success",
  },
  neutral: {
    border: "border-l-border",
    mesh: "ui-card-mesh",
  },
};

export default function SemaphoreCard({
  children,
  urgency = "neutral",
  className,
  onClick,
}: SemaphoreCardProps) {
  const styles = variantStyles[urgency];
  const customBg = className?.includes("bg-");

  return (
    <div
      onClick={onClick}
      className={clsx(
        "rounded-xl border-l-[3px] transition-card",
        styles.border,
        !customBg && styles.mesh,
        onClick && "cursor-pointer hover:shadow-elevated active:scale-[0.99]",
        className
      )}
    >
      <div className="relative p-5">{children}</div>
    </div>
  );
}
