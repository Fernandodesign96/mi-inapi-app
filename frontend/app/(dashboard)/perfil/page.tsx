"use client";

import { User, Settings, LogOut, FileText, HelpCircle } from "lucide-react";
import TopBar from "@/components/ui/TopBar";
import Link from 'next/link';

export default function PerfilPage() {
  return (
    <>
      <TopBar variant="home" title="Mi Perfil" />

      <div className="px-4 pt-4 pb-6 space-y-5">
        {/* Avatar */}
        <div className="flex flex-col items-center py-6 gap-3">
          <div className="w-20 h-20 rounded-full bg-[#1E3A8A] flex items-center justify-center">
            <span className="text-[28px] font-bold text-white">JD</span>
          </div>
          <div className="text-center">
            <p className="text-[18px] font-bold text-[#111827]">Juan Díaz</p>
            <p className="text-[13px] text-[#9CA3AF] font-mono">12.345.678-9</p>
            <p className="text-[13px] text-[#4B5563]">juan.diaz@empresa.cl</p>
          </div>
        </div>

        {/* Menu items */}
        <div className="bg-white rounded-lg shadow-card divide-y divide-[#F3F4F6] overflow-hidden">
          {[
            { icon: FileText, label: "Mis Certificados", href: "/certificados" },
            { icon: HelpCircle, label: "Soporte e Historial", href: "/soporte" },
            { icon: Settings, label: "Configuración", href: "#" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3.5 hover:bg-[#F9FAFB] transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#1A56DB]"
              >
                <Icon size={20} color="#4B5563" />
                <span className="text-[15px] text-[#111827] font-medium">{item.label}</span>
                <span className="ml-auto text-[#9CA3AF] text-[18px]">›</span>
              </Link>
            );
          })}
        </div>

        {/* Logout */}
        <Link
          href="/login"
          className="flex items-center justify-center gap-2 w-full h-12 rounded-full border border-[#E5E7EB] text-[#DC2626] text-[15px] font-semibold hover:bg-[#FEE2E2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
        >
          <LogOut size={18} />
          Cerrar Sesión
        </Link>

        <p className="text-center text-[11px] text-[#9CA3AF]">
          MiINAPI v0.1.0-mvp · INAPI © 2026
        </p>
      </div>
    </>
  );
}
