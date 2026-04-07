"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Info } from "lucide-react";
import { clsx } from "clsx";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
  type: ToastType;
  message: string;
  duration?: number;
  onDismiss?: () => void;
}

const toastStyles: Record<ToastType, { bg: string; text: string; Icon: React.ComponentType<{ size?: number }> }> = {
  success: { bg: "bg-[#D1FAE5] border-[#059669]", text: "text-[#065F46]", Icon: CheckCircle },
  error: { bg: "bg-[#FEE2E2] border-[#DC2626]", text: "text-[#991B1B]", Icon: XCircle },
  info: { bg: "bg-[#DBEAFE] border-[#2563EB]", text: "text-[#1E40AF]", Icon: Info },
};

export function Toast({ type, message, duration = 2500, onDismiss }: ToastProps) {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const { bg, text, Icon } = toastStyles[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => {
        setVisible(false);
        onDismiss?.();
      }, 200);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={clsx(
        "fixed left-4 right-4 mx-auto max-w-[358px] z-50 rounded-xl border p-3 flex items-center gap-3 shadow-modal",
        "bottom-[84px]",
        bg,
        exiting ? "toast-exit" : "toast-enter"
      )}
    >
      <Icon size={18} className={text as any} />
      <p className={clsx("text-[14px] font-medium", text)}>{message}</p>
    </div>
  );
}

// Hook para gestionar toasts fácilmente
export function useToast() {
  const [toast, setToast] = useState<{ type: ToastType; message: string } | null>(null);

  const showToast = (type: ToastType, message: string) => {
    setToast({ type, message });
  };

  const dismissToast = () => setToast(null);

  return { toast, showToast, dismissToast };
}
