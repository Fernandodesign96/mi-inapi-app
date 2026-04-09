"use client";

import { useRouter } from "next/navigation";
import { 
  ExternalLink, 
  Book, 
  HelpCircle, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight
} from "lucide-react";
import TopBar from "@/components/ui/TopBar";
import SemaphoreCard from "@/components/ui/SemaphoreCard";
import StepperProgress from "@/components/ui/StepperProgress";
import StatusBadge from "@/components/ui/StatusBadge";
import CTAButton from "@/components/ui/CTAButton";
import { useAppStore } from "@/lib/store";
import { mockUser, mockSolicitudes } from "@/lib/mockData";
import { clsx } from "clsx";
import React from "react";

export default function InicioPage() {
  const router = useRouter();
  const { userState } = useAppStore();

  const urgentSolicitud = mockSolicitudes.find(s => s.estado === "ACCION_REQUERIDA");
  const recentSolicitud = mockSolicitudes[1]; // Aura Cosmetics

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
      <TopBar variant="home" />

      <div className="px-6 pt-6 pb-24 flex flex-col space-y-6 screen-enter">
        {/* GREETING */}
        <div className="space-y-1">
          <h1 className="text-display text-[#111827]">
            Hola, {mockUser.name.split(' ')[0]} 👋
          </h1>
          <p className="text-body-sm text-[#4B5563]">
            {userState === 'new' ? 'Bienvenido a MiINAPI' : 'Tienes novedades en tus trámites'}
          </p>
        </div>

        {/* STATE A: NEW USER */}
        {userState === 'new' && (
          <div className="space-y-6">
            <SemaphoreCard urgency="info">
              <p className="text-body-sm text-[#1E40AF] leading-relaxed">
                Aquí verás el estado de tus solicitudes de marcas, patentes y diseños 
                en tiempo real. Cuando ingreses una solicitud en el portal de INAPI, 
                aparecerá aquí automáticamente.
              </p>
            </SemaphoreCard>

            <CTAButton 
              label="Ir al portal de solicitudes INAPI"
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => window.open('https://www.inapi.cl', '_blank')}
              icon={<ExternalLink size={18} />}
            />

            <div className="pt-2">
              <h2 className="text-label text-[#9CA3AF] mb-4">MIENTRAS TANTO, EXPLORA</h2>
              <div className="grid grid-cols-2 gap-3">
                <QuickAccessCard 
                  icon={Book} 
                  label="Biblioteca de Recursos" 
                  onClick={() => router.push('/biblioteca')} 
                />
                <QuickAccessCard 
                  icon={HelpCircle} 
                  label="Soporte e Historial" 
                  onClick={() => router.push('/soporte')} 
                />
              </div>
            </div>
          </div>
        )}

        {/* STATE B & C: ACTIVE USERS */}
        {(userState === 'active-urgent' || userState === 'active-no-urgent') && (
          <div className="space-y-6">
            {/* HERO CARD */}
            {userState === 'active-urgent' ? (
              <SemaphoreCard urgency="danger">
                <div className="flex justify-between items-center mb-3">
                  <StatusBadge variant="danger" label="ACCIÓN REQUERIDA" showIcon />
                  <span className="text-timestamp">Hace 10 min</span>
                </div>
                <h2 className="text-h2 text-[#111827] mb-1">
                  {urgentSolicitud?.accion || "Cargar documento"}
                </h2>
                <p className="text-mono text-[#4B5563] mb-4">
                  #{urgentSolicitud?.id} · {urgentSolicitud?.tipo === 'marca' ? 'Marca Comercial' : 'Patente'}
                </p>
                <CTAButton 
                  label="Ir a la notificación"
                  variant="danger"
                  fullWidth
                  onClick={() => router.push('/notificaciones')}
                  icon={<ChevronRight size={18} />}
                />
              </SemaphoreCard>
            ) : (
              <SemaphoreCard urgency="info">
                <div className="flex justify-between items-center mb-3">
                  <StatusBadge variant="info" label="EN REVISIÓN" />
                  <span className="text-timestamp">Actualizado hoy</span>
                </div>
                <h2 className="text-h2 text-[#111827] mb-1">
                  {recentSolicitud?.nombre}
                </h2>
                <p className="text-mono text-[#4B5563] mb-4">
                  #{recentSolicitud?.id} · Marca Comercial
                </p>
                <StepperProgress 
                  stepStates={['completed', 'completed', 'current']} 
                  urgency="info"
                />
                <div className="mt-4 p-3 bg-[#EFF6FF] rounded-[10px] border border-[#DBEAFE]">
                  <p className="text-body-xs text-[#1E40AF]">
                    Esperando fin del período de oposición (30 días).
                  </p>
                </div>
              </SemaphoreCard>
            )}

            {/* SUMMARY ROW */}
            <div className="flex gap-2">
              <SummaryCard 
                count={3} 
                label="EN PROCESO" 
                variant="info" 
              />
              <SummaryCard 
                count={userState === 'active-urgent' ? 1 : 0} 
                label="REQUERIDO" 
                variant={userState === 'active-urgent' ? "danger" : "neutral"} 
                icon={userState === 'active-urgent' ? AlertCircle : undefined}
              />
              <SummaryCard 
                count={45} 
                label="FINALIZADOS" 
                variant="success" 
                icon={CheckCircle2}
              />
            </div>

            <button 
              onClick={() => router.push('/solicitudes')}
              className="w-full text-center py-1 text-body-sm font-semibold text-[#1A56DB] flex items-center justify-center gap-1 hover:underline"
            >
              Ver todas mis solicitudes <ChevronRight size={16} />
            </button>

            {/* QUICK ACCESS ROW */}
            <div className="pt-4 border-t border-[#E5E7EB]">
              <div className="flex gap-2 text-center">
                <QuickAccessGhost 
                  icon={Book} 
                  label="Biblioteca" 
                  onClick={() => router.push('/biblioteca')} 
                />
                <QuickAccessGhost 
                  icon={FileText} 
                  label="Certificados" 
                  onClick={() => router.push('/certificados')} 
                />
                <QuickAccessGhost 
                  icon={HelpCircle} 
                  label="Soporte" 
                  onClick={() => router.push('/soporte')} 
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryCard({ 
  count, 
  label, 
  variant, 
  icon: Icon 
}: { 
  count: number; 
  label: string; 
  variant: "info" | "danger" | "success" | "neutral"; 
  icon?: React.ElementType;
}) {
  const styles = {
    info: "text-[#2563EB] bg-white",
    danger: "text-[#DC2626] bg-[#FEF2F2] border-[#FEE2E2]",
    success: "text-[#059669] bg-white",
    neutral: "text-[#9CA3AF] bg-white opacity-50",
  };

  return (
    <div className={clsx(
      "flex-1 flex flex-col items-center justify-center p-3 rounded-lg border border-[#E5E7EB] shadow-card",
      styles[variant]
    )}>
      <div className="flex items-center gap-1 mb-1">
        <span className="text-[28px] font-sans font-extrabold leading-none">{count}</span>
        {Icon && <Icon size={14} strokeWidth={3} />}
      </div>
      <span className="text-[9px] font-bold uppercase tracking-wider text-center">{label}</span>
    </div>
  );
}

function QuickAccessCard({ 
  icon: Icon, 
  label, 
  onClick 
}: { 
  icon: React.ElementType; 
  label: string; 
  onClick: () => void;
}) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-[#E5E7EB] rounded-[14px] shadow-sm hover:shadow-md active:bg-[#F9FAFB] transition-all"
    >
      <div className="w-10 h-10 rounded-full bg-[#EFF6FF] flex items-center justify-center text-[#1A56DB]">
        <Icon size={24} />
      </div>
      <span className="text-[13px] font-semibold text-[#111827] leading-tight">{label}</span>
    </button>
  );
}

function QuickAccessGhost({ 
  icon: Icon, 
  label, 
  onClick 
}: { 
  icon: React.ElementType; 
  label: string; 
  onClick: () => void;
}) {
  return (
    <button 
      onClick={onClick}
      className="flex-1 flex flex-col items-center justify-center p-3 bg-white border border-[#E5E7EB] rounded-[10px] hover:bg-[#F9FAFB] active:bg-[#F3F4F6] transition-colors"
    >
      <Icon size={20} className="text-[#1A56DB] mb-1.5" />
      <span className="text-body-xs font-medium text-[#4B5563]">{label}</span>
    </button>
  );
}
