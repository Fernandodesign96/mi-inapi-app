"use client";

import { Home, FileText, Bell, FolderOpen, User, Library, HelpCircle } from "lucide-react";
import { clsx } from "clsx";
import { useAppStore } from "@/lib/store";
import { useRouter, usePathname } from "next/navigation";

export type NavTab = "inicio" | "solicitudes" | "notificaciones" | "certificados" | "perfil" | "biblioteca" | "soporte";

interface NavItem {
  id: NavTab;
  label: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  path: string;
}

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { userState } = useAppStore();

  const getNavItems = (): NavItem[] => {
    if (userState === 'new') {
      return [
        { id: "inicio", label: "Inicio", icon: Home, path: "/inicio" },
        { id: "biblioteca", label: "Biblioteca", icon: Library, path: "/biblioteca" },
        { id: "notificaciones", label: "Notificaciones", icon: Bell, path: "/notificaciones" },
        { id: "soporte", label: "Soporte", icon: HelpCircle, path: "/soporte" },
        { id: "perfil", label: "Perfil", icon: User, path: "/perfil" },
      ];
    }
    
    if (userState === 'active-no-urgent') {
      return [
        { id: "inicio", label: "Inicio", icon: Home, path: "/inicio" },
        { id: "solicitudes", label: "Solicitudes", icon: FileText, path: "/solicitudes" },
        { id: "notificaciones", label: "Notificaciones", icon: Bell, path: "/notificaciones" },
        { id: "soporte", label: "Soporte", icon: HelpCircle, path: "/soporte" },
        { id: "perfil", label: "Perfil", icon: User, path: "/perfil" },
      ];
    }

    // active-urgent
    return [
      { id: "inicio", label: "Inicio", icon: Home, path: "/inicio" },
      { id: "solicitudes", label: "Solicitudes", icon: FileText, path: "/solicitudes" },
      { id: "notificaciones", label: "Notificaciones", icon: Bell, path: "/notificaciones" },
      { id: "certificados", label: "Certificados", icon: FolderOpen, path: "/certificados" },
      { id: "perfil", label: "Perfil", icon: User, path: "/perfil" },
    ];
  };

  const navItems = getNavItems();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <nav
      role="navigation"
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-[#E5E7EB] safe-bottom z-50 h-[64px]"
    >
      <div className="flex items-center h-full">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.path)}
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
