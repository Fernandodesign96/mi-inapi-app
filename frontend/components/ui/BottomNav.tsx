"use client";

import { Home, FileText, Bell, FolderOpen, User } from "lucide-react";
import { clsx } from "clsx";

export type NavTab = "inicio" | "solicitudes" | "notificaciones" | "certificados" | "perfil";

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
  { id: "notificaciones", label: "Notificaciones", icon: Bell },
  { id: "certificados", label: "Certificados", icon: FolderOpen },
  { id: "perfil", label: "Perfil", icon: User },
];

export default function BottomNav({ activeTab, onNavigate }: BottomNavProps) {
  return (
    <nav
      role="navigation"
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-[#E5E7EB] safe-bottom z-50 h-[64px]"
    >
      <div className="flex items-center h-full">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              aria-current={isActive ? "page" : undefined}
              className={clsx(
                "flex flex-col items-center justify-center flex-1 h-full min-w-[48px] outline-none transition-colors duration-150",
                isActive ? "text-[#1A56DB]" : "text-[#9CA3AF]"
              )}
            >
              <div className="flex flex-col items-center gap-[2px]">
                <Icon
                  size={24}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span
                  className={clsx(
                    "text-[10px] font-sans",
                    isActive ? "font-semibold" : "font-normal"
                  )}
                >
                  {item.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
