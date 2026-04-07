import { clsx } from "clsx";
import CTAButton from "./CTAButton";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
  className?: string;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center text-center px-6 py-12",
        className
      )}
    >
      {/* Icon wrapper */}
      <div className="w-16 h-16 rounded-full bg-[#F3F4F6] flex items-center justify-center mb-4 text-[#9CA3AF]">
        {icon}
      </div>

      <h3 className="text-[17px] font-semibold text-[#111827] mb-2">{title}</h3>
      <p className="text-[14px] text-[#4B5563] leading-relaxed max-w-[260px]">
        {description}
      </p>

      {action && (
        <div className="mt-6">
          <CTAButton
            variant="outline"
            label={action.label}
            onClick={action.onClick}
          />
        </div>
      )}
    </div>
  );
}
