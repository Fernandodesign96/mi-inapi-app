"use client";

import { Home, FileText, Bell, FolderOpen, User, Library, HelpCircle } from "lucide-react";
import { clsx } from "clsx";
import { useAppStore } from "@/lib/store";
import { useRouter, usePathname } from "next/navigation";

export type NavTab =
  | "inicio"
  | "solicitudes"
  | "notificaciones"
  | "certificados"
  | "perfil"
  | "biblioteca"
  | "soporte";

interface NavItem {
  id: NavTab;
  label: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  path: string;
}

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { userState } = useAppStore();

  const getNavItems = (): NavItem[] => {
    if (userState === "new") {
      return [
        { id: "inicio",         label: "Inicio",         icon: Home,        path: "/inicio" },
        { id: "biblioteca",     label: "Biblioteca",     icon: Library,     path: "/biblioteca" },
        { id: "notificaciones", label: "Notificaciones", icon: Bell,        path: "/notificaciones" },
        { id: "soporte",        label: "Contacto",       icon: HelpCircle,  path: "/soporte" },
        { id: "perfil",         label: "Perfil",         icon: User,        path: "/perfil" },
      ];
    }

    if (userState === "active-no-urgent") {
      return [
        { id: "inicio",         label: "Inicio",         icon: Home,        path: "/inicio" },
        { id: "solicitudes",    label: "Solicitudes",    icon: FileText,    path: "/solicitudes" },
        { id: "notificaciones", label: "Notificaciones", icon: Bell,        path: "/notificaciones" },
        { id: "soporte",        label: "Contacto",       icon: HelpCircle,  path: "/soporte" },
        { id: "perfil",         label: "Perfil",         icon: User,        path: "/perfil" },
      ];
    }

    // active-urgent
    return [
      { id: "inicio",         label: "Inicio",         icon: Home,        path: "/inicio" },
      { id: "solicitudes",    label: "Solicitudes",    icon: FileText,    path: "/solicitudes" },
      { id: "notificaciones", label: "Notificaciones", icon: Bell,        path: "/notificaciones" },
      { id: "certificados",   label: "Certificados",   icon: FolderOpen,  path: "/certificados" },
      { id: "perfil",         label: "Perfil",         icon: User,        path: "/perfil" },
    ];
  };

  const navItems = getNavItems();

  return (
    <nav
      role="navigation"
      aria-label="Navegación principal"
      className={clsx(
        "bottom-nav-shell fixed bottom-0 inset-x-0 w-full z-[100]",
        "pb-[env(safe-area-inset-bottom)]"
      )}
    >
      <div className="flex items-stretch h-bottomnav w-full max-w-gob-xl mx-auto bg-surface">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => router.push(item.path)}
              aria-current={isActive ? "page" : undefined}
              aria-label={item.label}
              className={clsx(
                "relative flex flex-col items-center justify-center flex-1",
                "min-w-[48px] min-h-[44px] px-1 outline-none",
                // Focus ring visible
                "focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-inset rounded-md",
                // Hover background — solo cuando no está activo
                !isActive && "hover:bg-surface-elevated active:bg-surface-elevated",
                // Transición suave
                "transition-colors duration-150"
              )}
            >
              {/* Píldora indicadora activo */}
              {isActive && (
                <span
                  className="absolute top-0 left-1/2 -translate-x-1/2 h-[3px] w-8 rounded-b-full bg-primary"
                  aria-hidden
                />
              )}

              {/* Contenedor del icono con fondo activo */}
              <div
                className={clsx(
                  "flex items-center justify-center rounded-xl transition-all duration-150",
                  isActive
                    ? "w-12 h-7 bg-primary/10"
                    : "w-10 h-6"
                )}
                aria-hidden
              >
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={clsx(
                    "transition-colors duration-150",
                    isActive ? "text-primary" : "text-muted"
                  )}
                />
              </div>

              {/* Etiqueta */}
              <span
                className={clsx(
                  "mt-0.5 leading-none transition-colors duration-150",
                  "text-[10px] font-sans tracking-wide",
                  isActive
                    ? "font-bold text-primary"
                    : "font-medium text-muted"
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
