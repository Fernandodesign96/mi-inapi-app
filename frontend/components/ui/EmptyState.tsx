import type { ReactNode } from "react";
import { clsx } from "clsx";
import CTAButton from "./CTAButton";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: ReactNode;
  action?: { label: string; onClick: () => void };
  className?: string;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center text-center px-[24px] py-[48px]",
        className
      )}
    >
      <div className="w-[64px] h-[64px] rounded-full bg-surface-elevated flex items-center justify-center text-muted">
        <Icon size={32} strokeWidth={2} />
      </div>

      <h3 className="text-h3 text-foreground mt-4">{title}</h3>
      {description != null && description !== "" && (
        <p className="text-body-sm text-muted-secondary mt-2 max-w-[320px] leading-relaxed">
          {description}
        </p>
      )}

      {action && (
        <div className="mt-6">
          <CTAButton
            variant="outline"
            label={action.label}
            onClick={action.onClick}
            size="md"
          />
        </div>
      )}
    </div>
  );
}
