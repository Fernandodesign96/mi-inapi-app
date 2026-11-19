"use client";

import { useState } from "react";
import { AlertCircle, AlertTriangle, Download, MapPin } from "lucide-react";
import CTAButton from "@/components/ui/CTAButton";
import Toast from "@/components/ui/Toast";
import AccionTimeline from "@/components/ui/AccionTimeline";
import AvisoToast from "@/components/ui/AvisoToast";
import { Solicitud } from "@/lib/mockData";
import {
  etapaCiudadanaFromSolicitud,
  subetapaCiudadana,
} from "@/lib/etapasMiInapi";
import {
  LABEL_DESCARGAR_REGISTRO_MARCA,
  puedeDescargarRegistroMarca,
  simularDescargaRegistroMarca,
} from "@/lib/solicitudActions";

interface AccionRequeridaDetalleProps {
  solicitud: Solicitud;
}

function esModoAccion(solicitud: Solicitud): boolean {
  return (
    solicitud.estado === "ACCION_REQUERIDA" ||
    solicitud.urgency === "danger" ||
    solicitud.urgency === "warning"
  );
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
  const detalle = solicitud.accionRequeridaDetalle;

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

  if (!modoAccion && !mostrarDescarga) {
    return null;
  }

  const tituloSeccion = modoAccion ? "Acción pendiente" : "Estado del registro";
  const pasos = modoAccion ? detalle?.pasos ?? [] : [];
  const tituloContexto =
    solicitud.accion ??
    detalle?.explicacionClara ??
    "Tienes una gestión pendiente";
  const etapa = etapaCiudadanaFromSolicitud(solicitud);
  const subetapa = subetapaCiudadana(solicitud.etapaLabel);
  const descripcionContexto = subetapa
    ? `${solicitud.nombre} está en ${etapa}. ${subetapa}.`
    : `${solicitud.nombre} está en ${etapa}. Completa esta gestión en los canales oficiales de INAPI para que el trámite continúe.`;

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
        {tituloSeccion}
      </p>

      <div className="space-y-3">
        {modoAccion && (
          <div className="flex items-start gap-3 rounded-md bg-accent px-3.5 py-3.5 text-white">
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white/20">
              <AlertTriangle size={22} strokeWidth={2.4} aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-[16px] font-bold leading-snug text-white">
                {tituloContexto}
              </p>
              <p className="mt-1 text-[13px] font-medium leading-relaxed text-white/90">
                {descripcionContexto}
              </p>
            </div>
          </div>
        )}

        {pasos.length > 0 && (
          <div className="rounded-md border border-black/5 border-l-[4px] border-l-primary bg-white px-3.5 py-3.5 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary mb-1">
              Tu próximo paso
            </p>
            <p className="text-[17px] font-bold text-slate-900 mb-4">
              Qué debes hacer ahora
            </p>
            <AccionTimeline pasos={pasos} />
          </div>
        )}

        {modoAccion && detalle?.canalPresentacion && (
          <AvisoToast
            icon={MapPin}
            title="Dónde presentar"
            body={detalle.canalPresentacion}
            tone="info"
          />
        )}

        {modoAccion && detalle?.consecuencia && (
          <AvisoToast
            icon={AlertCircle}
            title="Si no actúas a tiempo"
            body={detalle.consecuencia}
            tone="danger"
          />
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
    </section>
  );
}
