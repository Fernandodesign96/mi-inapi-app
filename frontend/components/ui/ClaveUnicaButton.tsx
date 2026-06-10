"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ClaveUnicaButtonProps {
  onClick?: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  fullWidth?: boolean;
  radius?: "sm" | "none" | "pill";
  className?: string;
  type?: "button" | "submit";
}

function ClaveUnicaIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="10" r="2.5" fill="currentColor" />
      <path
        d="M8.5 17.5c0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

const radiusClasses = {
  sm: "rounded-sm",
  none: "rounded-none",
  pill: "rounded-xl",
} as const;

export default function ClaveUnicaButton({
  onClick,
  isLoading = false,
  isDisabled = false,
  fullWidth = false,
  radius = "sm",
  className,
  type = "button",
}: ClaveUnicaButtonProps) {
  const disabled = isDisabled || isLoading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-busy={isLoading}
      className={cn(
        "inline-flex items-center justify-center gap-2 min-h-[48px] px-4 touch-target",
        "text-white text-btn font-medium transition-all duration-150",
        "bg-claveunica hover:bg-claveunica-hover",
        "focus-visible:outline-none focus-visible:bg-claveunica-focus focus-visible:ring-2 focus-visible:ring-claveunica-border focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "active:ring-2 active:ring-claveunica-border active:ring-offset-0",
        "disabled:bg-claveunica-disabled disabled:cursor-not-allowed disabled:opacity-80",
        radiusClasses[radius],
        fullWidth && "w-full",
        className
      )}
    >
      {isLoading ? (
        <Loader2 size={18} className="animate-spin shrink-0" />
      ) : (
        <ClaveUnicaIcon className="w-5 h-5 shrink-0" />
      )}
      <span className="inline-flex items-baseline">
        <span className="font-normal">Clave</span>
        <span className="font-bold">Única</span>
      </span>
    </button>
  );
}