import { clsx } from "clsx";
import CTAButton from "./CTAButton";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
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
      {/* Icon wrapper */}
      <div className="w-[64px] h-[64px] rounded-full bg-[#F3F4F6] flex items-center justify-center text-[#9CA3AF]">
        <Icon size={32} strokeWidth={2} />
      </div>

      <h3 className="text-h3 text-[#111827] mt-[16px]">{title}</h3>
      <p className="text-body-sm text-[#4B5563] mt-[8px] max-w-[280px]">
        {description}
      </p>

      {action && (
        <div className="mt-[20px]">
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
