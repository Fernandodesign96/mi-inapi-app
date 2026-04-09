"use client";

import { useRouter } from "next/navigation";
import { 
  MessageSquare, 
  Book, 
  Newspaper, 
  HelpCircle, 
  Bell, 
  Lock, 
  LogOut, 
  ChevronRight,
  ShieldCheck,
  CreditCard
} from "lucide-react";
import TopBar from "@/components/ui/TopBar";
import { mockUser } from "@/lib/mockData";
import { clsx } from "clsx";

export default function PerfilPage() {
  const router = useRouter();

  const toolGroup = [
    { id: "chat", title: "Chat Inteligente", subtitle: "Asistente Virtual MiINAPI", icon: <MessageSquare size={20} />, color: "bg-[#F5F3FF] text-[#7C3AED]", href: "/chat" },
    { id: "biblioteca", title: "Biblioteca Digital", subtitle: "Manuales y Guías Oficiales", icon: <Book size={20} />, color: "bg-[#EFF6FF] text-[#1A56DB]", href: "/biblioteca" },
    { id: "diario-oficial", title: "Diario Oficial", subtitle: "Publicaciones de marcas y patentes", icon: <Newspaper size={20} />, color: "bg-[#FFF7ED] text-[#EA580C]", href: "/diario-oficial" },
    { id: "soporte", title: "Soporte e Historial", subtitle: "Tus consultas enviadas", icon: <HelpCircle size={20} />, color: "bg-[#F0FDF4] text-[#059669]", href: "/soporte" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
      <TopBar variant="section" title="Mi Perfil" />

      <div className="flex-1 overflow-y-auto pb-24 screen-enter">
        <div className="px-6 pt-6 space-y-8">
          {/* User Card */}
          <div className="bg-white rounded-xl border-[1.5px] border-[#E5E7EB] p-5 flex items-center gap-4 shadow-card">
            <div className="w-16 h-16 rounded-full bg-[#111827] text-white flex items-center justify-center text-[22px] font-extrabold shrink-0">
              {mockUser.initials}
            </div>
            <div className="min-w-0">
              <h2 className="text-[18px] font-bold text-[#111827] truncate">{mockUser.name}</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-mono text-[13px] text-[#4B5563]">{mockUser.rut}</span>
                <span className="w-1 h-1 rounded-full bg-[#D1D5DB]" />
                <span className="text-body-xs text-[#1A56DB] font-semibold">Usuario Verificado</span>
              </div>
              <p className="text-body-xs text-[#6B7280] truncate mt-1">{mockUser.email}</p>
            </div>
          </div>

          {/* Tools Group */}
          <section className="space-y-3">
            <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider px-1">HERRAMIENTAS Y RECURSOS</p>
            <div className="bg-white rounded-[14px] border border-[#E5E7EB] overflow-hidden shadow-sm">
              {toolGroup.map((tool, idx) => (
                <button
                  key={tool.id}
                  onClick={() => router.push(tool.href)}
                  className={clsx(
                    "w-full flex items-center justify-between p-4 hover:bg-[#F9FAFB] active:bg-[#F3F4F6] transition-colors",
                    idx !== toolGroup.length - 1 && "border-b border-[#E5E7EB]"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center shrink-0", tool.color)}>
                      {tool.icon}
                    </div>
                    <div className="text-left">
                      <p className="text-[15px] font-bold text-[#111827]">{tool.title}</p>
                      <p className="text-body-xs text-[#6B7280]">{tool.subtitle}</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-[#D1D5DB]" />
                </button>
              ))}
            </div>
          </section>

          {/* Account Settings */}
          <section className="space-y-3">
            <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider px-1">CONFIGURACIÓN DE CUENTA</p>
            <div className="bg-white rounded-[14px] border border-[#E5E7EB] overflow-hidden shadow-sm">
              <AccountItem icon={<Bell size={20} />} label="Notificaciones Push" />
              <AccountItem icon={<ShieldCheck size={20} />} label="Privacidad y Datos" />
              <AccountItem icon={<Lock size={20} />} label="Seguridad" />
              <AccountItem icon={<CreditCard size={20} />} label="Métodos de Pago" />
              <button 
                onClick={() => router.push('/login')}
                className="w-full flex items-center gap-4 p-4 hover:bg-[#FEF2F2] active:bg-[#FEE2E2] transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#FEF2F2] text-[#DC2626] flex items-center justify-center shrink-0">
                  <LogOut size={20} />
                </div>
                <span className="text-[15px] font-bold text-[#DC2626]">Cerrar Sesión</span>
              </button>
            </div>
          </section>

          {/* Version Info */}
          <div className="text-center pb-8">
            <p className="text-[11px] font-medium text-[#D1D5DB]">MiINAPI v3.2.0 (Build 2026.04)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AccountItem({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <button className="w-full flex items-center justify-between p-4 hover:bg-[#F9FAFB] active:bg-[#F3F4F6] transition-colors border-b border-[#E5E7EB]">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-[#F9FAFB] text-[#4B5563] flex items-center justify-center shrink-0">
          {icon}
        </div>
        <span className="text-[15px] font-bold text-[#111827]">{label}</span>
      </div>
      <ChevronRight size={18} className="text-[#D1D5DB]" />
    </button>
  );
}
