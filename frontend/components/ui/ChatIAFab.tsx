"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { clsx } from "clsx";

interface ChatIAFabProps {
  onClick: () => void;
  className?: string;
  hasUnread?: boolean;
}

export default function ChatIAFab({ onClick, className, hasUnread = true }: ChatIAFabProps) {
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={clsx(
      "fixed z-50 transition-all duration-300",
      /* Positioning relative to the 390px frame on desktop, or simply right-4 on mobile */
      "bottom-[calc(64px+env(safe-area-inset-bottom)+16px)] right-[calc(50%-195px+16px)] max-sm:right-4",
      className
    )}>
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full right-0 mb-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="bg-[#1E3A8A] text-white text-[12px] font-medium px-2.5 py-1.5 rounded-lg whitespace-nowrap relative shadow-lg">
            Pregúntame sobre tu trámite
            {/* Arrow */}
            <div className="absolute top-full right-5 -mt-px w-2 h-2 bg-[#1E3A8A] rotate-45" />
          </div>
        </div>
      )}

      {/* FAB Button */}
      <button
        onClick={onClick}
        className={clsx(
          "w-[52px] h-[52px] bg-[#7C3AED] text-white rounded-full flex items-center justify-center transition-all shadow-fab",
          "hover:scale-105 active:scale-95"
        )}
        aria-label="Abrir Chat IA"
      >
        <div className="relative">
          <MessageCircle size={22} strokeWidth={2} />
          {hasUnread && (
            <div className="absolute -top-0.5 -right-0.5 w-[8px] h-[8px] bg-[#DC2626] rounded-full border border-white" />
          )}
        </div>
      </button>
    </div>
  );
}
