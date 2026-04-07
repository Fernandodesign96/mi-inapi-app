"use client";

import { Loader2 } from "lucide-react";
import { clsx } from "clsx";

export type ButtonVariant =
  | "primary"
  | "danger"
  | "warning"
  | "info"
  | "success"
  | "outline"
  | "ghost";

interface CTAButtonProps {
  variant?: ButtonVariant;
  label: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  className?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-[#1A56DB] text-white hover:bg-[#1E3A8A] active:bg-[#1730A0]",
  danger: "bg-[#DC2626] text-white hover:bg-[#B91C1C] active:bg-[#991B1B]",
  warning: "bg-[#D97706] text-white hover:bg-[#B45309] active:bg-[#92400E]",
  info: "bg-[#2563EB] text-white hover:bg-[#1D4ED8] active:bg-[#1E40AF]",
  success: "bg-[#059669] text-white hover:bg-[#047857] active:bg-[#065F46]",
  outline:
    "bg-transparent text-[#1A56DB] border border-[#E5E7EB] hover:bg-[#F3F4F6] active:bg-[#E5E7EB]",
  ghost:
    "bg-transparent text-[#4B5563] hover:bg-[#F3F4F6] active:bg-[#E5E7EB]",
};

const sizeClasses: Record<string, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-12 px-6 text-[15px]",
  lg: "h-[52px] px-7 text-[15px]",
};

export default function CTAButton({
  variant = "primary",
  label,
  isLoading = false,
  isDisabled = false,
  icon,
  onClick,
  fullWidth = false,
  size = "md",
  type = "button",
  className,
}: CTAButtonProps) {
  const disabled = isDisabled || isLoading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "rounded-full font-semibold inline-flex items-center justify-center gap-2 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A56DB] active:scale-[0.98]",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        disabled && "opacity-40 cursor-not-allowed pointer-events-none",
        className
      )}
    >
      {isLoading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <>
          {icon && <span className="shrink-0">{icon}</span>}
          {label}
        </>
      )}
    </button>
  );
}
