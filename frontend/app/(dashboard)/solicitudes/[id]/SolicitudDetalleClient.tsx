"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  FileText,
  AlertCircle,
  CheckCircle2,
  Info,
  Download,
  Tag,
  User,
  Users,
  Hash,
  Layers,
  DollarSign
} from "lucide-react";
import SemaphoreCard from "@/components/ui/SemaphoreCard";
import StepperProgress, { getStepStates } from "@/components/ui/StepperProgress";
import StatusBadge from "@/components/ui/StatusBadge";
import CTAButton from "@/components/ui/CTAButton";
import { Solicitud } from "@/lib/mockData";
import { clsx } from "clsx";

const getBadgeLabel = (urgency: string, etapa?: string) => {
  if (urgency === 'danger') return 'Acción urgente';
  if (urgency === 'warning') {
    return etapa?.toLowerCase().includes('fondo') ? 'Corrección de Fondo' : 'Corrección de Forma';
  }
  if (urgency === 'info') return 'En revisión';
  if (urgency === 'success') return 'Finalizada';
  return 'En revisión';
};

const getUrgencyIcon = (urgency: string) => {
  if (urgency === 'danger') return <AlertCircle size={18} className="text-[#DC2626]" />;
  if (urgency === 'warning') return <AlertCircle size={18} className="text-[#D97706]" />;
  if (urgency === 'success') return <CheckCircle2 size={18} className="text-[#059669]" />;
  return <Info size={18} className="text-[#2563EB]" />;
};

export default function SolicitudDetalleClient({ solicitud }: { solicitud: Solicitud }) {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
      {/* TopBar */}
      <header className="h-[56px] border-b border-[#E5E7EB] flex items-center px-4 sticky top-0 bg-white z-40">
        <button onClick={() => router.back()} className="p-2 -ml-2 text-[#111827]">
          <ArrowLeft size={24} />
        </button>
        <div className="ml-2 flex-1 min-w-0">
          <span className="text-[17px] font-bold text-[#111827] truncate block">{solicitud.nombre}</span>
          <span className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider">#{solicitud.id}</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto pb-10 screen-enter">
        <div className="px-6 py-6 space-y-6">

          {/* ── SECCIÓN 1: ESTADO ACTUAL ── */}
          <section className="space-y-3">
            <p className="text-label text-[#9CA3AF]">ESTADO ACTUAL</p>

            <SemaphoreCard urgency={solicitud.urgency as "danger" | "warning" | "info" | "success"}>
              <div className="space-y-4">
                <div className="flex justify-between items-start gap-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      {getUrgencyIcon(solicitud.urgency)}
                      <StatusBadge
                        variant={solicitud.urgency as "danger" | "warning" | "info" | "success"}
                        label={getBadgeLabel(solicitud.urgency, solicitud.etapaLabel)}
                        showIcon={solicitud.urgency === "danger" || solicitud.urgency === "warning"}
                      />
                    </div>
                    <h2 className="text-[18px] font-extrabold text-[#111827] leading-tight">
                      {solicitud.nombre}
                    </h2>
                    <p className="text-body-xs text-[#6B7280]">{solicitud.etapaLabel ?? solicitud.etapa}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center text-[#1A56DB] shadow-sm shrink-0">
                    <FileText size={22} />
                  </div>
                </div>

                <StepperProgress
                  stepStates={getStepStates(solicitud.estado)}
                  urgency={solicitud.urgency as "danger" | "warning" | "info" | "success"}
                />
              </div>
            </SemaphoreCard>
          </section>

          {/* ── SECCIÓN 2: NOTIFICACIÓN OFICIAL ── */}
          <section className="space-y-3">
            <p className="text-label text-[#9CA3AF]">NOTIFICACIÓN INAPI</p>
            <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
              {/* Encabezado del bloque de notificación */}
              <div className="px-4 py-3 bg-[#F8FAFC] border-b border-[#E5E7EB] flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#DBEAFE] flex items-center justify-center text-[#1A56DB] shrink-0">
                  <FileText size={14} />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-[#1A56DB]">Notificación Oficial INAPI</p>
                  <p className="text-[10px] text-[#9CA3AF]">Información equivalente al correo oficial enviado al solicitante</p>
                </div>
              </div>

              {/* Filas de datos */}
              <div className="divide-y divide-[#F3F4F6]">
                <InfoRow icon={Tag} label="Categoría" value="Marca" />
                <InfoRow icon={Hash} label="Nombre (Denominación)" value={solicitud.nombre} />
                <InfoRow icon={Layers} label="Clasificación de Niza" value={solicitud.nizaClass ? `Clase ${solicitud.nizaClass}` : "—"} />
                <InfoRow icon={User} label="Solicitante" value={solicitud.solicitante ?? "Juan Díaz"} />
                <InfoRow icon={Users} label="Representante" value={solicitud.representante ?? "Juan Díaz"} />
                <InfoRow icon={DollarSign} label="Tasa (UTM)" value={solicitud.tasa ?? "—"} />
                <InfoRow
                  icon={Info}
                  label="Etapa de la solicitud"
                  value={solicitud.etapaLabel ?? solicitud.etapa}
                  highlight
                />
              </div>
            </div>
          </section>

          {/* ── SECCIÓN 3: ACCIÓN REQUERIDA ── */}
          {(solicitud.estado === "ACCION_REQUERIDA" || solicitud.notificacion) && (
            <section className="space-y-3">
              <p className="text-label text-[#9CA3AF]">ACCIÓN REQUERIDA</p>
              <SemaphoreCard urgency={solicitud.urgency === "danger" ? "danger" : "warning"}>
                <div className="flex gap-3">
                  <AlertCircle size={20} className={clsx(
                    "shrink-0 mt-0.5",
                    solicitud.urgency === "danger" ? "text-[#DC2626]" : "text-[#D97706]"
                  )} />
                  <div className="space-y-4 flex-1">
                    <div className="space-y-1">
                      <h4 className="text-[14px] font-bold text-[#111827]">{solicitud.accion ?? "Acción pendiente"}</h4>
                      {solicitud.notificacion && (
                        <div className="space-y-1.5 pt-2 text-body-xs text-[#6B7280]">
                          <p><span className="font-semibold text-[#374151]">Requerimiento:</span> {solicitud.notificacion.requerimiento}</p>
                          <p><span className="font-semibold text-[#374151]">Plazo límite:</span> <span className={clsx("font-bold", solicitud.urgency === "danger" ? "text-[#DC2626]" : "text-[#D97706]")}>{solicitud.notificacion.plazo}</span></p>
                          <p><span className="font-semibold text-[#374151]">Contacto:</span> {solicitud.notificacion.contacto}</p>
                        </div>
                      )}
                    </div>
                    <CTAButton
                      label="Gestionar en Notificaciones"
                      variant={solicitud.urgency === "danger" ? "danger" : "warning"}
                      fullWidth
                      size="sm"
                      onClick={() => router.push('/notificaciones')}
                    />
                  </div>
                </div>
              </SemaphoreCard>
            </section>
          )}

          {/* ── DOCUMENTOS GENERADOS ── */}
          <section className="space-y-3 pt-2">
            <p className="text-label text-[#9CA3AF]">DOCUMENTOS GENERADOS</p>
            <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-sm">
              <DocRow title="Formulario Solicitud F-01" date="15 ENE 2024" />
              <DocRow title="Resolución de Aceptación" date="02 FEB 2024" />
              <DocRow title="Publicación Diario Oficial" date="10 MAR 2024" isLast />
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

/* ─── Sub-components ─── */

function InfoRow({
  icon: Icon,
  label,
  value,
  highlight
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className={clsx(
      "flex items-center justify-between px-4 py-3 gap-3",
      highlight && "bg-[#FFFBEB]"
    )}>
      <div className="flex items-center gap-2.5 min-w-0">
        <Icon size={14} className={clsx("shrink-0", highlight ? "text-[#D97706]" : "text-[#9CA3AF]")} />
        <span className="text-[12px] font-medium text-[#6B7280] truncate">{label}</span>
      </div>
      <span className={clsx(
        "text-[13px] font-bold shrink-0 text-right max-w-[55%] truncate",
        highlight ? "text-[#92400E]" : "text-[#111827]"
      )}>{value}</span>
    </div>
  );
}

function DocRow({ title, date, isLast }: { title: string; date: string; isLast?: boolean }) {
  return (
    <div className={clsx(
      "flex items-center justify-between p-4 hover:bg-[#F9FAFB] active:bg-[#F3F4F6] transition-colors",
      !isLast && "border-b border-[#E5E7EB]"
    )}>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center shrink-0">
          <FileText size={18} />
        </div>
        <div className="min-w-0">
          <p className="text-[13px] font-bold text-[#111827] truncate">{title}</p>
          <p className="text-[11px] text-[#6B7280]">{date} · PDF</p>
        </div>
      </div>
      <Download size={18} className="text-[#D1D5DB]" />
    </div>
  );
}
