import { clsx } from "clsx";
import { SemaphoreVariant } from "./StatusBadge";

interface SemaphoreCardProps {
  variant: SemaphoreVariant;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  noPadding?: boolean;
}

const borderColors: Record<SemaphoreVariant, string> = {
  danger: "border-l-[#DC2626]",
  warning: "border-l-[#D97706]",
  info: "border-l-[#2563EB]",
  success: "border-l-[#059669]",
};

export default function SemaphoreCard({
  variant,
  children,
  onClick,
  className,
  noPadding = false,
}: SemaphoreCardProps) {
  const isClickable = Boolean(onClick);

  return (
    <div
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") onClick?.();
            }
          : undefined
      }
      className={clsx(
        "bg-white rounded-lg border-l-4 shadow-card",
        borderColors[variant],
        !noPadding && "p-4",
        isClickable &&
          "cursor-pointer transition-shadow duration-150 hover:shadow-elevated active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#1A56DB]",
        className
      )}
    >
      {children}
    </div>
  );
}
