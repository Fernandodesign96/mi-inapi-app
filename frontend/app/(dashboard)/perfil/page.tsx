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
  CreditCard,
} from "lucide-react";
import TopBar from "@/components/ui/TopBar";
import { mockUser } from "@/lib/mockData";
import { clsx } from "clsx";
import { phase2HiddenClass } from "@/lib/featureFlags";

export default function PerfilPage() {
  const router = useRouter();

  const toolGroup = [
    {
      id: "chat",
      title: "Chat Inteligente",
      subtitle: "Asistente Virtual MiINAPI",
      icon: <MessageSquare size={20} />,
      color: "bg-accent-light text-accent",
      href: "/chat",
      phase2: true,
    },
    {
      id: "biblioteca",
      title: "Biblioteca Digital",
      subtitle: "Manuales y Guías Oficiales",
      icon: <Book size={20} />,
      color: "bg-info-bg text-primary",
      href: "/biblioteca",
    },
    {
      id: "diario-oficial",
      title: "Diario Oficial",
      subtitle: "Publicaciones de marcas y patentes",
      icon: <Newspaper size={20} />,
      color: "bg-warning-bg text-warning",
      href: "/diario-oficial",
      phase2: true,
    },
    {
      id: "soporte",
      title: "Contacto",
      subtitle: "Métodos de contacto con INAPI",
      icon: <HelpCircle size={20} />,
      color: "bg-success-bg text-success",
      href: "/soporte",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar variant="section" title="Mi Perfil" />

      <div className="flex-1 overflow-y-auto pb-safe-bottomnav screen-enter">
        <div className="px-6 pt-6 space-y-8">
          <div className="bg-surface rounded-xl border-[1.5px] border-border p-5 flex items-center gap-4 shadow-card">
            <div className="w-16 h-16 rounded-full bg-primary-dark text-white flex items-center justify-center text-[22px] font-extrabold shrink-0">
              {mockUser.initials}
            </div>
            <div className="min-w-0">
              <h2 className="text-h3 font-bold text-foreground truncate">{mockUser.name}</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-mono text-body-sm text-muted-secondary">{mockUser.rut}</span>
                <span className="w-1 h-1 rounded-full bg-border-strong" />
                <span className="text-body-xs text-primary font-semibold">Usuario Verificado</span>
              </div>
              <p className="text-body-xs text-muted-secondary truncate mt-1">{mockUser.email}</p>
            </div>
          </div>

          <section className="space-y-3">
            <p className="text-label text-muted px-1">HERRAMIENTAS Y RECURSOS</p>
            <div className="bg-surface rounded-lg border border-border overflow-hidden shadow-sm">
              {toolGroup.map((tool, idx) => (
                <button
                  key={tool.id}
                  onClick={() => router.push(tool.href)}
                  className={clsx(
                    "w-full flex items-center justify-between p-4 hover:bg-background active:bg-surface-elevated transition-colors",
                    idx !== toolGroup.length - 1 && "border-b border-border",
                    tool.phase2 && phase2HiddenClass()
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={clsx(
                        "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                        tool.color
                      )}
                    >
                      {tool.icon}
                    </div>
                    <div className="text-left">
                      <p className="text-h4 font-bold text-foreground">{tool.title}</p>
                      <p className="text-body-xs text-muted-secondary">{tool.subtitle}</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-muted" />
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <p className="text-label text-muted px-1">CONFIGURACIÓN DE CUENTA</p>
            <div className="bg-surface rounded-lg border border-border overflow-hidden shadow-sm">
              <AccountItem icon={<Bell size={20} />} label="Notificaciones Push" />
              <AccountItem icon={<ShieldCheck size={20} />} label="Privacidad y Datos" />
              <AccountItem icon={<Lock size={20} />} label="Seguridad" />
              <div className={phase2HiddenClass()}>
                <AccountItem icon={<CreditCard size={20} />} label="Métodos de Pago" />
              </div>
              <button
                onClick={() => {
                  document.cookie =
                    "miinapi-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                  router.push("/login");
                }}
                className="w-full flex items-center gap-4 p-4 hover:bg-danger-bg active:bg-danger-bg transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-danger-bg text-danger flex items-center justify-center shrink-0">
                  <LogOut size={20} />
                </div>
                <span className="text-h4 font-bold text-danger">Cerrar Sesión</span>
              </button>
            </div>
          </section>

          <div className="text-center pb-8">
            <p className="text-body-xs font-medium text-muted">MiINAPI v3.2.0 (Build 2026.04)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AccountItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="w-full flex items-center justify-between p-4 hover:bg-background active:bg-surface-elevated transition-colors border-b border-border">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-background text-muted-secondary flex items-center justify-center shrink-0">
          {icon}
        </div>
        <span className="text-h4 font-bold text-foreground">{label}</span>
      </div>
      <ChevronRight size={18} className="text-muted" />
    </button>
  );
}
