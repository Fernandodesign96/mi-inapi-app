"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import BottomNav, { NavTab } from "@/components/ui/BottomNav";

const pathToTab: Record<string, NavTab> = {
  "/inicio": "inicio",
  "/solicitudes": "solicitudes",
  "/notificaciones": "inicio",
  "/certificados": "solicitudes",
  "/soporte": "perfil",
  "/biblioteca": "academia",
  "/perfil": "perfil",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<NavTab>("inicio");

  useEffect(() => {
    const tab = pathToTab[pathname] ?? "inicio";
    setActiveTab(tab);
  }, [pathname]);

  const handleNavigate = (tab: NavTab) => {
    setActiveTab(tab);
    const routes: Record<NavTab, string> = {
      inicio: "/inicio",
      solicitudes: "/inicio",
      nuevo: "/inicio",
      academia: "/biblioteca",
      perfil: "/perfil",
    };
    router.push(routes[tab]);
  };

  return (
    <div className="min-h-dvh bg-[#F9FAFB]">
      {/* Spacer for fixed TopBar */}
      <div className="h-[56px]" />

      {/* Main content */}
      <main
        className="overflow-y-auto"
        style={{ minHeight: "calc(100dvh - 56px - 64px)" }}
      >
        {children}
      </main>

      {/* Spacer for fixed BottomNav */}
      <div className="h-[64px]" />

      <BottomNav activeTab={activeTab} onNavigate={handleNavigate} />
    </div>
  );
}
