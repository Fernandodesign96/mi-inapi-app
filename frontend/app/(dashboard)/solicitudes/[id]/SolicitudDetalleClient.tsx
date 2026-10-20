"use client";

import { useRouter } from "next/navigation";
import TopBar from "@/components/ui/TopBar";
import {
  FileText,
  AlertCircle,
  CheckCircle2,
  Info,
  ChevronDown,
} from "lucide-react";
import SemaphoreCard from "@/components/ui/SemaphoreCard";
import StepperProgress from "@/components/ui/StepperProgress";
import StatusBadge from "@/components/ui/StatusBadge";
import AccionRequeridaDetalle from "@/components/ui/AccionRequeridaDetalle";
import { Solicitud } from "@/lib/mockData";
import { getStepStatesForSolicitud } from "@/lib/etapasMiInapi";
import { badgeLabelForSolicitud } from "@/lib/tramitePresentacion";
import { clsx } from "clsx";

const getUrgencyIcon = (urgency: string) => {
  if (urgency === "danger") return <AlertCircle size={18} className="text-danger" />;
  if (urgency === "warning") return <AlertCircle size={18} className="text-warning" />;
  if (urgency === "success") return <CheckCircle2 size={18} className="text-success" />;
  if (urgency === "neutral") return <Info size={18} className="text-muted" />;
  return <Info size={18} className="text-info" />;
};

export default function SolicitudDetalleClient({ solicitud }: { solicitud: Solicitud }) {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar
        variant="detail"
        detailTitle={solicitud.nombre}
        detailSubtitle={`#${solicitud.id}`}
        onBack={() => router.back()}
      />

      <div className="flex-1 overflow-y-auto pb-10 screen-enter">
        <div className="px-6 py-6 space-y-6">
          <section className="space-y-3">
            <p className="text-label text-muted">ESTADO ACTUAL</p>

            <SemaphoreCard urgency={solicitud.urgency}>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    {getUrgencyIcon(solicitud.urgency)}
                    <StatusBadge
                      variant={solicitud.urgency === "neutral" ? "neutral" : solicitud.urgency}
                      label={badgeLabelForSolicitud(solicitud)}
                      showIcon={
                        solicitud.urgency === "danger" || solicitud.urgency === "warning"
                      }
                    />
                  </div>
                  <h2 className="text-h3 font-extrabold text-foreground leading-tight">
                    {solicitud.nombre}
                  </h2>
                  <p className="text-body-xs text-muted-secondary">
                    {solicitud.statusIpas ?? solicitud.etapaLabel ?? solicitud.etapa}
                  </p>
                </div>

                <StepperProgress
                  stepStates={getStepStatesForSolicitud(solicitud)}
                  urgency={solicitud.urgency}
                />
              </div>
            </SemaphoreCard>
          </section>

          <section className="space-y-3">
            <p className="text-label text-muted">NOTIFICACIÓN INAPI</p>
            <details className="group bg-surface rounded-lg border border-border shadow-sm overflow-hidden">
              <summary
                className={clsx(
                  "flex cursor-pointer list-none items-center justify-between gap-3",
                  "px-4 py-3 bg-surface-elevated min-h-[44px]",
                  "hover:bg-surface-elevated/80 transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-inset",
                  "[&::-webkit-details-marker]:hidden"
                )}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-primary-light flex items-center justify-center text-primary shrink-0">
                    <FileText size={14} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-body-xs font-bold text-primary">
                      Notificación Oficial INAPI
                    </p>
                    <p className="text-body-xs text-muted truncate">
                      {solicitud.statusIpas ??
                        "Datos equivalentes al correo oficial del expediente"}
                    </p>
                  </div>
                </div>
                <ChevronDown
                  size={18}
                  className="shrink-0 text-muted transition-transform duration-200 group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <div className="divide-y divide-border border-t border-border">
                <InfoRow label="Categoría" value={solicitud.categoria ?? "Marca"} />
                <InfoRow label="Nombre (Denominación)" value={solicitud.nombre} />
                <InfoRow
                  label="Clasificación de Niza"
                  value={solicitud.nizaClass ? `Clase ${solicitud.nizaClass}` : "—"}
                />
                <InfoRow
                  label="Solicitante"
                  value={solicitud.solicitante ?? "—"}
                />
                <InfoRow
                  label="Representante"
                  value={solicitud.representante ?? "—"}
                />
                <InfoRow label="Tasa (UTM)" value={solicitud.tasa ?? "—"} />
                <InfoRow
                  label="Estado unificado"
                  value={solicitud.estadoUnificado ?? badgeLabelForSolicitud(solicitud)}
                />
                <InfoRow
                  label="Estado IPAS"
                  value={solicitud.statusIpas ?? solicitud.etapaLabel ?? "—"}
                />
                <InfoRow
                  label="Fecha de presentación"
                  value={solicitud.fechaPresentacion ?? "—"}
                />
              </div>
            </details>
          </section>

          <AccionRequeridaDetalle solicitud={solicitud} />

          <section className="space-y-3 pt-2">
            <p className="text-label text-muted">DOCUMENTOS GENERADOS</p>
            <div className="bg-surface rounded-lg border border-border overflow-hidden shadow-sm">
              {solicitud.estadoUnificado === "Registrada" ? (
                <DocRow
                  title="Certificado de registro de marca (PDF)"
                  date="15 MAR 2026"
                  isLast
                />
              ) : (
                <>
                  <DocRow title="Formulario Solicitud F-01" date="15 ENE 2024" />
                  <DocRow title="Resolución de Aceptación" date="02 FEB 2024" />
                  <DocRow
                    title="Publicación Diario Oficial"
                    date="10 MAR 2024"
                    isLast
                  />
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between px-4 py-3 gap-4">
      <span className="text-body-xs font-medium text-muted-secondary shrink-0 pt-0.5">
        {label}
      </span>
      <span className="text-body-sm font-bold text-foreground text-right max-w-[60%] leading-snug">
        {value}
      </span>
    </div>
  );
}

function DocRow({ title, date, isLast }: { title: string; date: string; isLast?: boolean }) {
  return (
    <div
      className={clsx(
        "flex items-center justify-between p-4 hover:bg-background active:bg-surface-elevated transition-colors",
        !isLast && "border-b border-border"
      )}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-danger-bg text-danger flex items-center justify-center shrink-0">
          <FileText size={18} />
        </div>
        <div className="min-w-0">
          <p className="text-body-sm font-bold text-foreground truncate">{title}</p>
          <p className="text-body-xs text-muted-secondary">{date} · PDF</p>
        </div>
      </div>
      <FileText size={18} className="text-muted" aria-hidden />
    </div>
  );
}
