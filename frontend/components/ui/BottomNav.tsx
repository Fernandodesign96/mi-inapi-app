"use client";

import { Home, FileText, Plus, GraduationCap, User } from "lucide-react";
import { clsx } from "clsx";

export type NavTab = "inicio" | "solicitudes" | "nuevo" | "academia" | "perfil";

interface BottomNavProps {
  activeTab: NavTab;
  onNavigate: (tab: NavTab) => void;
}

const navItems: {
  id: NavTab;
  label: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
}[] = [
  { id: "inicio", label: "Inicio", icon: Home },
  { id: "solicitudes", label: "Solicitudes", icon: FileText },
  { id: "nuevo", label: "", icon: Plus },
  { id: "academia", label: "Academia", icon: GraduationCap },
  { id: "perfil", label: "Perfil", icon: User },
];

export default function BottomNav({ activeTab, onNavigate }: BottomNavProps) {
  return (
    <nav
      role="navigation"
      aria-label="Navegación principal"
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-app bg-white border-t border-[#E5E7EB] safe-bottom z-50"
      style={{ maxWidth: "390px" }}
    >
      <div className="flex items-center justify-around h-[64px] px-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const isFab = item.id === "nuevo";
          const Icon = item.icon;

          if (isFab) {
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                aria-label="Nueva solicitud"
                className="w-14 h-14 rounded-full bg-[#7C3AED] flex items-center justify-center shadow-fab -mt-5 transition-transform duration-100 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:ring-offset-2"
              >
                <Plus size={26} strokeWidth={2.5} color="white" />
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              aria-current={isActive ? "page" : undefined}
              aria-label={item.label}
              className={clsx(
                "flex flex-col items-center gap-0.5 flex-1 py-2 min-w-0 transition-colors duration-150 focus:outline-none",
                isActive ? "text-[#1A56DB]" : "text-[#9CA3AF]"
              )}
            >
              <Icon
                size={24}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span
                className={clsx(
                  "text-[10px] leading-none truncate",
                  isActive ? "font-semibold" : "font-normal"
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
