"use client";

import { useRouter } from "next/navigation";
import TopBar from "@/components/ui/TopBar";
import { FileText, ChevronDown } from "lucide-react";
import SemaphoreCard from "@/components/ui/SemaphoreCard";
import StepperProgress from "@/components/ui/StepperProgress";
import StatusBadge from "@/components/ui/StatusBadge";
import AccionRequeridaDetalle from "@/components/ui/AccionRequeridaDetalle";
import { Solicitud } from "@/lib/mockData";
import {
  estadoCiudadano,
  etapaCiudadanaFromSolicitud,
  etiquetaNumeroExpediente,
  getStepStatesForSolicitud,
  tipoDerechoLabel,
} from "@/lib/etapasMiInapi";
import { badgeLabelForSolicitud } from "@/lib/tramitePresentacion";
import TramiteCopyStack from "@/components/ui/TramiteCopyStack";
import { InfoGroups } from "@/components/ui/InfoGroups";
import { clsx } from "clsx";

export default function SolicitudDetalleClient({ solicitud }: { solicitud: Solicitud }) {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar
        variant="detail"
        detailTitle={solicitud.nombre}
        detailSubtitle={etiquetaNumeroExpediente(solicitud)}
        onBack={() => router.back()}
      />

      <div className="flex-1 overflow-y-auto pb-10 screen-enter">
        <div className="px-6 py-6 space-y-6">
          <section className="space-y-3">
            <p className="text-label text-muted">ESTADO ACTUAL</p>

            <SemaphoreCard urgency={solicitud.urgency}>
              <div className="space-y-4">
                <div className="space-y-3">
                  <StatusBadge
                    variant={solicitud.urgency === "neutral" ? "neutral" : solicitud.urgency}
                    label={badgeLabelForSolicitud(solicitud, "detail")}
                    showIcon={
                      solicitud.urgency === "danger" || solicitud.urgency === "warning"
                    }
                  />
                  <h2 className="text-h3 font-extrabold text-foreground leading-tight">
                    {solicitud.nombre}
                  </h2>
                  <TramiteCopyStack
                    solicitud={solicitud}
                    order="inicio"
                    showTipo
                  />
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
            <details className="group bg-background rounded-md border border-border shadow-sm overflow-hidden">
              <summary
                className={clsx(
                  "flex cursor-pointer list-none items-center justify-between gap-3",
                  "px-4 py-3 bg-background min-h-[44px]",
                  "hover:bg-background/80 transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-inset",
                  "[&::-webkit-details-marker]:hidden"
                )}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <FileText size={16} className="text-primary shrink-0" aria-hidden />
                  <div className="min-w-0">
                    <p className="text-[14px] font-bold text-foreground">
                      Notificación Oficial INAPI
                    </p>
                    <p className="text-[12px] font-medium text-foreground/70 truncate">
                      {etapaCiudadanaFromSolicitud(solicitud)}
                    </p>
                  </div>
                </div>
                <ChevronDown
                  size={18}
                  className="shrink-0 text-muted transition-transform duration-200 group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <div className="p-3 border-t border-border">
                <InfoGroups
                  groups={[
                    {
                      title: "Expediente",
                      rows: [
                        { label: "Número de solicitud", value: solicitud.id, mono: true },
                        { label: "Denominación", value: solicitud.nombre },
                        {
                          label: "Clasificación de Niza",
                          value: solicitud.nizaClass
                            ? `Clase ${solicitud.nizaClass}`
                            : "—",
                        },
                        {
                          label: "Tipo de derecho",
                          value: tipoDerechoLabel(solicitud.tipo),
                        },
                        {
                          label: "Solicitante",
                          value: solicitud.solicitante ?? "—",
                        },
                        {
                          label: "Representante",
                          value: solicitud.representante ?? "—",
                        },
                      ],
                    },
                    {
                      title: "Situación",
                      rows: [
                        {
                          label: "Etapa",
                          value: etapaCiudadanaFromSolicitud(solicitud),
                        },
                        {
                          label: "Estado",
                          value: estadoCiudadano(solicitud.estadoUnificado),
                        },
                        ...(solicitud.notificacion?.requerimiento
                          ? [
                              {
                                label: "Acción requerida",
                                value: solicitud.notificacion.requerimiento,
                              },
                            ]
                          : []),
                      ],
                    },
                    {
                      title: "Plazos y contacto",
                      rows: [
                        ...(solicitud.notificacion?.plazo
                          ? [
                              {
                                label: "Plazo límite",
                                value: solicitud.notificacion.plazo,
                              },
                            ]
                          : []),
                        ...(solicitud.estimacion
                          ? [
                              {
                                label: "Estimación INAPI",
                                value: solicitud.estimacion,
                              },
                            ]
                          : []),
                        ...(solicitud.notificacion?.contacto
                          ? [
                              {
                                label: "Contacto",
                                value: solicitud.notificacion.contacto,
                              },
                            ]
                          : []),
                        {
                          label: "Fecha de presentación",
                          value: solicitud.fechaPresentacion ?? "—",
                        },
                        ...(solicitud.accionRequeridaDetalle?.referencia
                          ? [
                              {
                                label: "Referencia",
                                value: solicitud.accionRequeridaDetalle.referencia,
                              },
                            ]
                          : []),
                      ],
                    },
                  ]}
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
