"use client";

import { ArrowLeft, Bell, Settings, Search } from "lucide-react";
import { clsx } from "clsx";

export type TopBarVariant = "home" | "section" | "detail";

interface TopBarProps {
  variant?: TopBarVariant;
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  onBell?: () => void;
  onSearch?: () => void;
  showBell?: boolean;
  showSearch?: boolean;
  showSettings?: boolean;
  notificationCount?: number;
  className?: string;
}

/** Logo cuadrado INAPI */
function INAPILogo() {
  return (
    <div className="w-7 h-7 rounded-[6px] bg-[#1E3A8A] flex items-center justify-center shrink-0">
      <span className="text-white font-bold text-sm leading-none">I</span>
    </div>
  );
}

export default function TopBar({
  variant = "home",
  title,
  subtitle,
  onBack,
  onBell,
  onSearch,
  showBell = false,
  showSearch = false,
  showSettings = false,
  notificationCount = 0,
  className,
}: TopBarProps) {
  return (
    <header
      className={clsx(
        "fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-app bg-white border-b border-[#E5E7EB] z-40",
        className
      )}
      style={{ maxWidth: "390px" }}
    >
      <div className="flex items-center h-[56px] px-4 gap-3">
        {/* Left: back arrow or logo */}
        {variant === "home" ? (
          <div className="flex items-center gap-2">
            <INAPILogo />
            <div>
              <p className="text-[16px] font-semibold text-[#111827] leading-none">
                MiINAPI
              </p>
              {subtitle && (
                <p className="text-[10px] text-[#9CA3AF] leading-none mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {onBack && (
              <button
                onClick={onBack}
                aria-label="Volver"
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#F3F4F6] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1A56DB]"
              >
                <ArrowLeft size={22} strokeWidth={2} color="#4B5563" />
              </button>
            )}
            <div>
              {title && (
                <p className="text-[17px] font-semibold text-[#111827] leading-none">
                  {title}
                </p>
              )}
              {subtitle && (
                <p className="text-[11px] text-[#9CA3AF] leading-none mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-1">
          {showSearch && (
            <button
              onClick={onSearch}
              aria-label="Buscar"
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#F3F4F6] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1A56DB]"
            >
              <Search size={20} strokeWidth={2} color="#4B5563" />
            </button>
          )}
          {showSettings && (
            <button
              aria-label="Configuración"
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#F3F4F6] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1A56DB]"
            >
              <Settings size={20} strokeWidth={2} color="#4B5563" />
            </button>
          )}
          {showBell && (
            <button
              onClick={onBell}
              aria-label={`Notificaciones${notificationCount > 0 ? `, ${notificationCount} sin leer` : ""}`}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#F3F4F6] transition-colors relative focus:outline-none focus:ring-2 focus:ring-[#1A56DB]"
            >
              <Bell size={20} strokeWidth={2} color="#4B5563" />
              {notificationCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#DC2626]" />
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
