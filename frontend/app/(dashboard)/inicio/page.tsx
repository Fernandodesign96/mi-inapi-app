"use client";

import { useState, useEffect } from "react";
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
import StepperProgress, { getStepStates } from "@/components/ui/StepperProgress";
import StatusBadge from "@/components/ui/StatusBadge";
import CTAButton from "@/components/ui/CTAButton";
import SkeletonCard from "@/components/ui/SkeletonCard";
import { useAppStore } from "@/lib/store";
import { mockUser, mockTramitesUrgent, mockTramitesNoUrgent, mockSummaryUrgent, mockSummaryNoUrgent } from "@/lib/mockData";
import { clsx } from "clsx";
import React from "react";

export default function InicioPage() {
  const router = useRouter();
  const { userState } = useAppStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const currentTramites = userState === 'active-no-urgent' ? mockTramitesNoUrgent : mockTramitesUrgent;
  const currentSummary = userState === 'active-no-urgent' ? mockSummaryNoUrgent : mockSummaryUrgent;

  const urgentSolicitud = currentTramites.find(s => s.estado === "ACCION_REQUERIDA");
  const recentSolicitud = userState === 'active-no-urgent' ? currentTramites[0] : currentTramites.find(s => s.estado === "EN_REVISION" || s.estado === "PUBLICACION");

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar variant="home" />

      <div className="px-6 pt-6 pb-safe-bottomnav flex flex-col space-y-6 screen-enter">
        {/* GREETING */}
        <div className="space-y-1">
          <h1 className="text-display text-foreground">
            Hola, {mockUser.name.split(' ')[0]} 👋
          </h1>
          <p className="text-body-sm text-muted-secondary">
            {userState === 'new' ? 'Bienvenido a MiINAPI' : 'Tienes novedades en tus trámites'}
          </p>
        </div>

        {/* LOADING STATE - SKELETONS */}
        {isLoading ? (
          <div className="space-y-6">
            <SkeletonCard />
            <div className="flex gap-2">
              <div className="flex-1 h-16 bg-surface rounded-lg border border-border skeleton" />
              <div className="flex-1 h-16 bg-surface rounded-lg border border-border skeleton" />
              <div className="flex-1 h-16 bg-surface rounded-lg border border-border skeleton" />
            </div>
          </div>
        ) : (
          <>
            {/* STATE A: NEW USER */}
            {userState === 'new' && (
              <div className="space-y-6">
                <SemaphoreCard urgency="info">
                  <p className="text-body-sm text-primary-dark leading-relaxed">
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
                  <h2 className="text-label text-muted mb-4">MIENTRAS TANTO, EXPLORA</h2>
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
                    <h2 className="text-h2 text-foreground mb-1">
                      {urgentSolicitud?.accion || "Cargar documento"}
                    </h2>
                    <p className="text-mono text-muted-secondary mb-4">
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
                    <h2 className="text-h2 text-foreground mb-1">
                      {recentSolicitud?.nombre}
                    </h2>
                    <p className="text-mono text-muted-secondary mb-4">
                      #{recentSolicitud?.id} · Marca Comercial
                    </p>
                    <StepperProgress 
                      stepStates={getStepStates(recentSolicitud?.estado || 'EN_REVISION')} 
                      urgency="info"
                    />
                    <div className="mt-4 p-3 bg-info-bg rounded-md border border-primary-light">
                      <p className="text-body-xs text-primary-dark">
                        Esperando fin del período de oposición (30 días).
                      </p>
                    </div>
                  </SemaphoreCard>
                )}

                {/* SUMMARY ROW */}
                <div className="flex gap-2">
                  <SummaryCard 
                    count={currentSummary.enProceso} 
                    label="EN PROCESO" 
                    variant="info" 
                  />
                  <SummaryCard 
                    count={currentSummary.accionRequerida} 
                    label="ACCIÓN REQ." 
                    variant={currentSummary.accionRequerida > 0 ? "danger" : "neutral"} 
                    icon={currentSummary.accionRequerida > 0 ? AlertCircle : undefined}
                  />
                  <SummaryCard 
                    count={currentSummary.finalizadas} 
                    label="FINALIZADAS" 
                    variant={currentSummary.finalizadas > 0 ? "success" : "neutral"} 
                    icon={currentSummary.finalizadas > 0 ? CheckCircle2 : undefined}
                  />
                </div>

                <button 
                  onClick={() => router.push('/solicitudes')}
                  className="w-full text-center py-1 text-body-sm font-semibold text-primary flex items-center justify-center gap-1 hover:underline"
                >
                  Ver todas mis solicitudes <ChevronRight size={16} />
                </button>

                {/* QUICK ACCESS ROW */}
                <div className="pt-4 border-t border-border">
                  <div className="flex gap-2 text-center">
                    <QuickAccessGhost 
                      icon={Book} 
                      label="Biblioteca" 
                      onClick={() => router.push('/biblioteca')} 
                    />
                    {userState !== 'active-no-urgent' && (
                      <QuickAccessGhost 
                        icon={FileText} 
                        label="Certificados" 
                        onClick={() => router.push('/certificados')} 
                      />
                    )}
                    <QuickAccessGhost 
                      icon={HelpCircle} 
                      label="Soporte" 
                      onClick={() => router.push('/soporte')} 
                    />
                  </div>
                </div>
              </div>
            )}
          </>
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
    info: "text-foreground bg-surface",
    danger: "text-danger bg-danger-bg border-danger",
    success: "text-success bg-success-bg border-success",
    neutral: "text-muted bg-background border-border",
  };

  return (
    <div className={clsx(
      "flex-1 flex flex-col items-center justify-center p-3 rounded-lg border border-border shadow-card",
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
      className="flex flex-col items-center justify-center gap-2 p-4 bg-surface border border-border rounded-lg shadow-sm hover:shadow-md active:bg-background transition-all"
    >
      <div className="w-10 h-10 rounded-full bg-info-bg flex items-center justify-center text-primary">
        <Icon size={24} />
      </div>
      <span className="text-body-sm font-semibold text-foreground leading-tight">{label}</span>
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
      className="flex-1 flex flex-col items-center justify-center p-3 bg-surface border border-border rounded-md hover:bg-background active:bg-surface-elevated transition-colors"
    >
      <Icon size={20} className="text-primary mb-1.5" />
      <span className="text-body-xs font-medium text-muted-secondary">{label}</span>
    </button>
  );
}
