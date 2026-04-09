"use client";

import { clsx } from "clsx";
import { useEffect } from "react";
import { CheckCircle, XCircle, Info, LucideIcon } from "lucide-react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  onDismiss: () => void;
}

const config: Record<string, { bg: string; text: string; icon: LucideIcon; iconColor: string }> = {
  success: {
    bg: "bg-[#D1FAE5]",
    text: "text-[#065F46]",
    icon: CheckCircle,
    iconColor: "#059669",
  },
  error: {
    bg: "bg-[#FEE2E2]",
    text: "text-[#991B1B]",
    icon: XCircle,
    iconColor: "#DC2626",
  },
  info: {
    bg: "bg-[#DBEAFE]",
    text: "text-[#1E40AF]",
    icon: Info,
    iconColor: "#2563EB",
  },
};

export default function Toast({ message, type = "success", onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 2500);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const { bg, text, icon: Icon, iconColor } = config[type];

  return (
    <div className={clsx(
      "fixed z-60 left-1/2 -translate-x-1/2 w-full px-4",
      "bottom-[calc(64px+16px+env(safe-area-inset-bottom))]",
      "max-w-[390px]"
    )}>
      <div className={clsx(
        "toast-enter flex items-center gap-[10px] w-full p-4 rounded-[12px] shadow-lg",
        bg,
        text
      )}>
        <Icon size={18} color={iconColor} strokeWidth={2.5} />
        <p className="text-[14px] font-sans font-medium">{message}</p>
      </div>
    </div>
  );
}
