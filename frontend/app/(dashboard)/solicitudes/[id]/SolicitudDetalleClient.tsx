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
  DollarSign,
} from "lucide-react";
import SemaphoreCard from "@/components/ui/SemaphoreCard";
import StepperProgress, { getStepStates } from "@/components/ui/StepperProgress";
import StatusBadge from "@/components/ui/StatusBadge";
import CTAButton from "@/components/ui/CTAButton";
import { Solicitud } from "@/lib/mockData";
import { clsx } from "clsx";

const getBadgeLabel = (urgency: string, etapa?: string) => {
  if (urgency === "danger") return "Acción urgente";
  if (urgency === "warning") {
    return etapa?.toLowerCase().includes("fondo")
      ? "Corrección de Fondo"
      : "Corrección de Forma";
  }
  if (urgency === "info") return "En revisión";
  if (urgency === "success") return "Finalizada";
  return "En revisión";
};

const getUrgencyIcon = (urgency: string) => {
  if (urgency === "danger") return <AlertCircle size={18} className="text-danger" />;
  if (urgency === "warning") return <AlertCircle size={18} className="text-warning" />;
  if (urgency === "success") return <CheckCircle2 size={18} className="text-success" />;
  return <Info size={18} className="text-info" />;
};

export default function SolicitudDetalleClient({ solicitud }: { solicitud: Solicitud }) {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="h-topbar border-b border-border flex items-center px-4 sticky top-0 bg-surface z-40">
        <button onClick={() => router.back()} className="p-2 -ml-2 text-foreground">
          <ArrowLeft size={24} />
        </button>
        <div className="ml-2 flex-1 min-w-0">
          <span className="text-h4 font-bold text-foreground truncate block">
            {solicitud.nombre}
          </span>
          <span className="text-body-xs font-bold text-muted uppercase tracking-wider">
            #{solicitud.id}
          </span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto pb-10 screen-enter">
        <div className="px-6 py-6 space-y-6">
          <section className="space-y-3">
            <p className="text-label text-muted">ESTADO ACTUAL</p>

            <SemaphoreCard urgency={solicitud.urgency as "danger" | "warning" | "info" | "success"}>
              <div className="space-y-4">
                <div className="flex justify-between items-start gap-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      {getUrgencyIcon(solicitud.urgency)}
                      <StatusBadge
                        variant={solicitud.urgency as "danger" | "warning" | "info" | "success"}
                        label={getBadgeLabel(solicitud.urgency, solicitud.etapaLabel)}
                        showIcon={
                          solicitud.urgency === "danger" || solicitud.urgency === "warning"
                        }
                      />
                    </div>
                    <h2 className="text-h3 font-extrabold text-foreground leading-tight">
                      {solicitud.nombre}
                    </h2>
                    <p className="text-body-xs text-muted-secondary">
                      {solicitud.etapaLabel ?? solicitud.etapa}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-surface border border-border flex items-center justify-center text-primary shadow-sm shrink-0">
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

          <section className="space-y-3">
            <p className="text-label text-muted">NOTIFICACIÓN INAPI</p>
            <div className="bg-surface rounded-lg border border-border shadow-sm overflow-hidden">
              <div className="px-4 py-3 bg-surface-elevated border-b border-border flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-primary-light flex items-center justify-center text-primary shrink-0">
                  <FileText size={14} />
                </div>
                <div>
                  <p className="text-body-xs font-bold text-primary">Notificación Oficial INAPI</p>
                  <p className="text-body-xs text-muted">
                    Información equivalente al correo oficial enviado al solicitante
                  </p>
                </div>
              </div>

              <div className="divide-y divide-surface-elevated">
                <InfoRow icon={Tag} label="Categoría" value="Marca" />
                <InfoRow icon={Hash} label="Nombre (Denominación)" value={solicitud.nombre} />
                <InfoRow
                  icon={Layers}
                  label="Clasificación de Niza"
                  value={solicitud.nizaClass ? `Clase ${solicitud.nizaClass}` : "—"}
                />
                <InfoRow
                  icon={User}
                  label="Solicitante"
                  value={solicitud.solicitante ?? "Juan Díaz"}
                />
                <InfoRow
                  icon={Users}
                  label="Representante"
                  value={solicitud.representante ?? "Juan Díaz"}
                />
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

          {(solicitud.estado === "ACCION_REQUERIDA" || solicitud.notificacion) && (
            <section className="space-y-3">
              <p className="text-label text-muted">ACCIÓN REQUERIDA</p>
              <SemaphoreCard urgency={solicitud.urgency === "danger" ? "danger" : "warning"}>
                <div className="flex gap-3">
                  <AlertCircle
                    size={20}
                    className={clsx(
                      "shrink-0 mt-0.5",
                      solicitud.urgency === "danger" ? "text-danger" : "text-warning"
                    )}
                  />
                  <div className="space-y-4 flex-1">
                    <div className="space-y-1">
                      <h4 className="text-body-sm font-bold text-foreground">
                        {solicitud.accion ?? "Acción pendiente"}
                      </h4>
                      {solicitud.notificacion && (
                        <div className="space-y-1.5 pt-2 text-body-xs text-muted-secondary">
                          <p>
                            <span className="font-semibold text-foreground">Requerimiento:</span>{" "}
                            {solicitud.notificacion.requerimiento}
                          </p>
                          <p>
                            <span className="font-semibold text-foreground">Plazo límite:</span>{" "}
                            <span
                              className={clsx(
                                "font-bold",
                                solicitud.urgency === "danger" ? "text-danger" : "text-warning"
                              )}
                            >
                              {solicitud.notificacion.plazo}
                            </span>
                          </p>
                          <p>
                            <span className="font-semibold text-foreground">Contacto:</span>{" "}
                            {solicitud.notificacion.contacto}
                          </p>
                        </div>
                      )}
                    </div>
                    <CTAButton
                      label="Gestionar en Notificaciones"
                      variant={solicitud.urgency === "danger" ? "danger" : "warning"}
                      fullWidth
                      size="sm"
                      onClick={() => router.push("/notificaciones")}
                    />
                  </div>
                </div>
              </SemaphoreCard>
            </section>
          )}

          <section className="space-y-3 pt-2">
            <p className="text-label text-muted">DOCUMENTOS GENERADOS</p>
            <div className="bg-surface rounded-lg border border-border overflow-hidden shadow-sm">
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

function InfoRow({
  icon: Icon,
  label,
  value,
  highlight,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={clsx(
        "flex items-center justify-between px-4 py-3 gap-3",
        highlight && "bg-warning-bg"
      )}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <Icon
          size={14}
          className={clsx("shrink-0", highlight ? "text-warning" : "text-muted")}
        />
        <span className="text-body-xs font-medium text-muted-secondary truncate">{label}</span>
      </div>
      <span
        className={clsx(
          "text-body-sm font-bold shrink-0 text-right max-w-[55%] truncate",
          highlight ? "text-warning" : "text-foreground"
        )}
      >
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
      <Download size={18} className="text-muted" />
    </div>
  );
}
