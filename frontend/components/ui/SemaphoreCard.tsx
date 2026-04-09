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
  neutral: {
    border: "border-l-[#E5E7EB]",
    bg: "bg-[#FFFFFF]",
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
        "rounded-[14px] border-l-4 shadow-card transition-card",
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
