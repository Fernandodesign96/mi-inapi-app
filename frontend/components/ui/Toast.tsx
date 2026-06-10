"use client";

import { clsx } from "clsx";
import { useEffect } from "react";
import { CheckCircle, XCircle, Info, LucideIcon } from "lucide-react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  onDismiss: () => void;
}

const config: Record<
  string,
  { bg: string; text: string; icon: LucideIcon; iconClass: string }
> = {
  success: {
    bg: "bg-success-bg",
    text: "text-foreground",
    icon: CheckCircle,
    iconClass: "text-success",
  },
  error: {
    bg: "bg-danger-bg",
    text: "text-foreground",
    icon: XCircle,
    iconClass: "text-danger",
  },
  info: {
    bg: "bg-info-bg",
    text: "text-foreground",
    icon: Info,
    iconClass: "text-info",
  },
};

export default function Toast({ message, type = "success", onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 2500);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const { bg, text, icon: Icon, iconClass } = config[type];

  return (
    <div className={clsx(
      "fixed z-60 left-1/2 -translate-x-1/2 w-full px-4",
      "bottom-[calc(64px+16px+env(safe-area-inset-bottom))]",
      "max-w-[390px]"
    )}>
      <div
        className={clsx(
          "toast-enter flex items-center gap-[10px] w-full p-4 rounded-md shadow-lg",
          bg,
          text
        )}
      >
        <Icon size={18} className={iconClass} strokeWidth={2.5} />
        <p className="text-body-sm font-sans font-medium">{message}</p>
      </div>
    </div>
  );
}
