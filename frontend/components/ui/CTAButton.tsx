"use client";

import { Loader2 } from "lucide-react";
import { clsx } from "clsx";

export type ButtonVariant =
  | "primary"
  | "primary-dark"
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
  id?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-[#1A56DB] text-white hover:bg-[#1E3A8A]",
  "primary-dark": "bg-[#1E3A8A] text-white opacity-100 hover:opacity-90",
  danger: "bg-[#DC2626] text-white hover:bg-[#B91C1C]",
  warning: "bg-[#D97706] text-white hover:bg-[#B45309]",
  info: "bg-[#2563EB] text-white hover:bg-[#1D4ED8]",
  success: "bg-[#059669] text-white hover:bg-[#047857]",
  outline: "bg-transparent border-2 border-[#E5E7EB] text-[#1A56DB] hover:border-[#1A56DB]",
  ghost: "bg-transparent text-[#4B5563] hover:bg-[#F3F4F6]",
};

const sizeClasses: Record<string, string> = {
  sm: "px-4 py-2 text-[14px] min-h-[36px]",
  md: "px-6 py-3 text-[15px] min-h-[48px]",
  lg: "px-7 py-3.5 text-[15px] min-h-[52px]",
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
  id,
}: CTAButtonProps) {
  const disabled = isDisabled || isLoading;

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "font-sans font-semibold inline-flex items-center justify-center gap-2 transition-all duration-150",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A56DB] active:scale-[0.98]",
        !className?.includes("rounded-") && "rounded-xl",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        disabled && "opacity-40 cursor-not-allowed",
        isLoading && variant === "primary-dark" && "opacity-70",
        className
      )}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <Loader2 size={18} className="animate-spin" />
          {variant === "primary-dark" && <span>Descargando...</span>}
        </div>
      ) : (
        <>
          {icon && <span className="shrink-0">{icon}</span>}
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
