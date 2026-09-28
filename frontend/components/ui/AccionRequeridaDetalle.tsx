"use client";

import { useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Download,
  FileText,
  Info,
  RefreshCw,
} from "lucide-react";
import SemaphoreCard from "@/components/ui/SemaphoreCard";
import StatusBadge from "@/components/ui/StatusBadge";
import CTAButton from "@/components/ui/CTAButton";
import Toast from "@/components/ui/Toast";
import { Solicitud } from "@/lib/mockData";
import {
  LABEL_DESCARGAR_REGISTRO_MARCA,
  puedeDescargarRegistroMarca,
  simularDescargaRegistroMarca,
} from "@/lib/solicitudActions";
import { clsx } from "clsx";

interface AccionRequeridaDetalleProps {
  solicitud: Solicitud;
}

type CardUrgency = "danger" | "warning" | "info" | "success";

function esModoAccion(solicitud: Solicitud): boolean {
  if (solicitud.urgency === "info" || solicitud.urgency === "success") {
    return false;
  }
  return Boolean(
    solicitud.accion ||
      solicitud.estado === "ACCION_REQUERIDA" ||
      solicitud.notificacion
  );
}

function tituloSeccion(): string {
  return "ACCIÓN REQUERIDA";
}

function badgeInformativo(urgency: CardUrgency): string {
  if (urgency === "success") return "Finalizada";
  return "En revisión";
}

function explicacionPorDefecto(solicitud: Solicitud): string {
  if (solicitud.urgency === "success") {
    return `La solicitud ${solicitud.nombre} se encuentra en etapa «${solicitud.etapaLabel ?? solicitud.etapa}». Puedes consultar certificados y antecedentes desde MiINAPI.`;
  }
  return `La solicitud ${solicitud.nombre} está en «${solicitud.etapaLabel ?? solicitud.etapa}». INAPI está procesando tu trámite; te notificaremos si necesitas realizar alguna gestión.`;
}

export default function AccionRequeridaDetalle({
  solicitud,
}: AccionRequeridaDetalleProps) {
  const [descargando, setDescargando] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const modoAccion = esModoAccion(solicitud);
  const mostrarDescarga = puedeDescargarRegistroMarca(solicitud);
  const cardUrgency = solicitud.urgency as CardUrgency;
  const detalle = solicitud.accionRequeridaDetalle;
  const notif = solicitud.notificacion;

  const tituloPrincipal =
    solicitud.accion ??
    notif?.requerimiento ??
    solicitud.etapaLabel ??
    "Estado actual del trámite";

  const explicacion =
    detalle?.explicacionClara ?? explicacionPorDefecto(solicitud);

  const filasEstado: { label: string; value: string; highlight?: boolean }[] =
    [];
  if (notif?.etapa || solicitud.etapaLabel) {
    filasEstado.push({
      label: "Etapa actual",
      value: notif?.etapa ?? solicitud.etapaLabel ?? solicitud.etapa,
    });
  }
  filasEstado.push({ label: "N° Solicitud", value: solicitud.id });
  filasEstado.push({
    label: "Tipo de derecho",
    value:
      solicitud.tipo === "marca"
        ? "Marca comercial"
        : solicitud.tipo === "patente"
          ? "Patente"
          : "Diseño industrial",
  });
  if (notif?.requerimiento) {
    filasEstado.push({
      label: modoAccion ? "Requerimiento" : "Situación actual",
      value: notif.requerimiento,
    });
  }
  if (notif?.plazo) {
    filasEstado.push({
      label: modoAccion ? "Plazo límite" : "Plazo o estimación",
      value: notif.plazo,
      highlight: modoAccion,
    });
  }
  if (solicitud.estimacion) {
    filasEstado.push({
      label: "Estimación INAPI",
      value: solicitud.estimacion,
    });
  }
  if (notif?.contacto) {
    filasEstado.push({ label: "Contacto", value: notif.contacto });
  }
  if (detalle?.referencia) {
    filasEstado.push({ label: "Referencia", value: detalle.referencia });
  }

  const accentBorder = {
    danger: "border-danger/50",
    warning: "border-warning/50",
    info: "border-info/50",
    success: "border-success/50",
  }[cardUrgency];

  const pasosTitulo = modoAccion
    ? "Qué debes hacer ahora"
    : "Qué ocurre a continuación";

  const pasosSubtitulo = modoAccion ? "Tu próximo paso" : "Seguimiento";

  const tituloDetalleDesplegable = modoAccion
    ? "Detalle de la notificación"
    : "Detalle del estado del trámite";

  const resumenDetalle =
    notif?.etapa ??
    solicitud.etapaLabel ??
    filasEstado.find((r) => r.label === "Etapa actual")?.value;

  const handleDescarga = async () => {
    setDescargando(true);
    try {
      await simularDescargaRegistroMarca(solicitud.id);
      setToast({
        message: "PDF del registro de la marca descargado correctamente.",
        type: "success",
      });
    } catch {
      setToast({
        message: "No fue posible descargar el archivo. Intenta nuevamente.",
        type: "error",
      });
    } finally {
      setDescargando(false);
    }
  };

  return (
    <section className="space-y-3" aria-labelledby="accion-requerida-heading">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDismiss={() => setToast(null)}
        />
      )}
      <p id="accion-requerida-heading" className="text-label text-muted">
        {tituloSeccion()}
      </p>

      <SemaphoreCard urgency={cardUrgency}>
        <div className="space-y-5">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <StatusBadge
                variant={cardUrgency}
                label={
                  modoAccion
                    ? cardUrgency === "danger"
                      ? "Acción urgente"
                      : "Corrección requerida"
                    : badgeInformativo(cardUrgency)
                }
                showIcon={modoAccion || cardUrgency === "success"}
              />
              {modoAccion && notif?.plazo && (
                <div
                  className={clsx(
                    "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-body-xs font-bold text-white",
                    cardUrgency === "danger" ? "bg-danger" : "bg-warning"
                  )}
                >
                  <AlertCircle size={14} strokeWidth={2.5} aria-hidden />
                  Plazo: {notif.plazo}
                </div>
              )}
            </div>

            <h3 className="text-h3 font-extrabold text-foreground leading-tight">
              {tituloPrincipal}
            </h3>

            <p
              className={clsx(
                "text-body-sm text-muted-secondary leading-relaxed border-l-4 pl-3",
                accentBorder
              )}
            >
              {explicacion}
            </p>
          </div>

          {filasEstado.length > 0 && (
            <details
              className={clsx(
                "group rounded-lg border border-border border-l-4 overflow-hidden bg-surface",
                cardUrgency === "danger" && "border-l-danger",
                cardUrgency === "warning" && "border-l-warning",
                cardUrgency === "info" && "border-l-info",
                cardUrgency === "success" && "border-l-success"
              )}
            >
              <summary
                className={clsx(
                  "flex cursor-pointer list-none items-center justify-between gap-3",
                  "px-4 py-3 min-h-[44px] bg-surface-elevated",
                  "text-body-xs font-bold text-muted uppercase tracking-wide",
                  "hover:bg-surface-elevated/80 transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-inset",
                  "[&::-webkit-details-marker]:hidden"
                )}
              >
                <span className="flex flex-col items-start gap-0.5 normal-case sm:flex-row sm:items-center sm:gap-2">
                  <span>{tituloDetalleDesplegable}</span>
                  {resumenDetalle && (
                    <span
                      className="text-body-xs font-medium text-muted-secondary line-clamp-1 group-open:hidden"
                      aria-hidden
                    >
                      · {resumenDetalle}
                    </span>
                  )}
                </span>
                <ChevronDown
                  size={18}
                  strokeWidth={2.5}
                  className="shrink-0 text-muted transition-transform duration-200 group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <dl className="divide-y divide-border border-t border-border">
                {filasEstado.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-1 gap-0.5 px-4 py-2.5 sm:grid-cols-[minmax(0,38%)_1fr]"
                  >
                    <dt className="text-body-xs font-semibold text-muted-secondary">
                      {row.label}
                    </dt>
                    <dd
                      className={clsx(
                        "text-body-sm font-medium",
                        row.highlight
                          ? cardUrgency === "danger"
                            ? "text-danger font-bold"
                            : cardUrgency === "warning"
                              ? "text-warning font-bold"
                              : cardUrgency === "info"
                                ? "text-info font-bold"
                                : "text-success font-bold"
                          : "text-foreground"
                      )}
                    >
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </details>
          )}

          {detalle?.pasos && detalle.pasos.length > 0 && (
            <div
              className={clsx(
                "rounded-lg border-2 p-4 shadow-card",
                cardUrgency === "danger" && "border-danger/40 bg-surface",
                cardUrgency === "warning" && "border-warning/40 bg-surface",
                cardUrgency === "info" && "border-info/40 bg-surface",
                cardUrgency === "success" && "border-success/40 bg-surface"
              )}
            >
              <div className="flex items-center gap-2 mb-4">
                <div
                  className={clsx(
                    "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-white",
                    cardUrgency === "danger" && "bg-danger",
                    cardUrgency === "warning" && "bg-warning",
                    cardUrgency === "info" && "bg-info",
                    cardUrgency === "success" && "bg-success"
                  )}
                >
                  {modoAccion ? (
                    <ClipboardList size={20} strokeWidth={2} aria-hidden />
                  ) : cardUrgency === "success" ? (
                    <CheckCircle2 size={20} strokeWidth={2} aria-hidden />
                  ) : (
                    <RefreshCw size={20} strokeWidth={2} aria-hidden />
                  )}
                </div>
                <div>
                  <p className="text-label text-muted">{pasosSubtitulo}</p>
                  <p className="text-h4 font-bold text-foreground">
                    {pasosTitulo}
                  </p>
                </div>
              </div>

              <ol className="space-y-3">
                {detalle.pasos.map((paso, index) => (
                  <li key={paso} className="flex gap-3 items-start">
                    <span
                      className={clsx(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-body-xs font-bold text-white",
                        cardUrgency === "danger" && "bg-danger",
                        cardUrgency === "warning" && "bg-warning",
                        cardUrgency === "info" && "bg-info",
                        cardUrgency === "success" && "bg-success"
                      )}
                      aria-hidden
                    >
                      {index + 1}
                    </span>
                    <p className="text-body-sm font-medium text-foreground leading-relaxed pt-0.5">
                      {paso}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {modoAccion && detalle?.documentos && detalle.documentos.length > 0 && (
            <div className="rounded-lg border border-border bg-surface-elevated/60 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-primary shrink-0" aria-hidden />
                <p className="text-h4 font-bold text-foreground">
                  Antecedentes a preparar
                </p>
              </div>
              <ul className="space-y-2">
                {detalle.documentos.map((doc) => (
                  <li
                    key={doc}
                    className="flex gap-2.5 text-body-sm text-foreground leading-snug"
                  >
                    <span
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary"
                      aria-hidden
                    />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {modoAccion && detalle?.consecuencia && (
            <div className="rounded-md border border-danger/25 bg-danger-bg/80 px-4 py-3 flex gap-3">
              <AlertCircle
                size={18}
                className="text-danger shrink-0 mt-0.5"
                aria-hidden
              />
              <div>
                <p className="text-body-xs font-bold text-danger uppercase tracking-wide mb-1">
                  Si no actúas a tiempo
                </p>
                <p className="text-body-sm text-foreground leading-relaxed">
                  {detalle.consecuencia}
                </p>
              </div>
            </div>
          )}

          {modoAccion && detalle?.canalPresentacion && (
            <div className="rounded-md border border-border bg-background/50 px-4 py-3 flex gap-3">
              <Info size={18} className="text-muted shrink-0 mt-0.5" aria-hidden />
              <div>
                <p className="text-body-xs font-bold text-muted uppercase mb-1">
                  Dónde presentar
                </p>
                <p className="text-body-sm text-foreground leading-relaxed">
                  {detalle.canalPresentacion}
                </p>
              </div>
            </div>
          )}

          {mostrarDescarga && (
            <CTAButton
              label={LABEL_DESCARGAR_REGISTRO_MARCA}
              variant="success"
              fullWidth
              size="md"
              isLoading={descargando}
              icon={<Download size={18} />}
              onClick={handleDescarga}
            />
          )}
        </div>
      </SemaphoreCard>
    </section>
  );
}
