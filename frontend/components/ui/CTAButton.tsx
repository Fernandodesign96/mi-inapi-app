"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

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
  primary: "bg-primary text-primary-foreground hover:bg-primary-dark",
  "primary-dark": "bg-primary-dark text-primary-foreground hover:opacity-90",
  danger: "bg-danger text-white hover:opacity-90",
  warning: "bg-warning text-white hover:opacity-90",
  info: "bg-info text-white hover:opacity-90",
  success: "bg-success text-white hover:opacity-90",
  outline:
    "bg-transparent border-2 border-border text-primary hover:border-primary",
  ghost: "bg-transparent text-muted-secondary hover:bg-surface-elevated",
};

const sizeClasses: Record<string, string> = {
  sm: "px-4 py-2 text-body-sm min-h-[36px]",
  md: "px-6 py-3 text-btn min-h-[48px]",
  lg: "px-7 py-3.5 text-btn min-h-[52px]",
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
      className={cn(
        "font-sans font-semibold inline-flex items-center justify-center gap-2 transition-all duration-150",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-focus active:scale-[0.98]",
        !className?.includes("rounded-") && "rounded-md",
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