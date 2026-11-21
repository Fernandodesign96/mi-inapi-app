"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import CTAButton from "@/components/ui/CTAButton";
import Toast from "@/components/ui/Toast";
import { Solicitud } from "@/lib/mockData";
import {
  LABEL_DESCARGAR_REGISTRO_MARCA,
  puedeDescargarRegistroMarca,
  simularDescargaRegistroMarca,
} from "@/lib/solicitudActions";

interface AccionRequeridaDetalleProps {
  solicitud: Solicitud;
}

export default function AccionRequeridaDetalle({
  solicitud,
}: AccionRequeridaDetalleProps) {
  const [descargando, setDescargando] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const mostrarDescarga = puedeDescargarRegistroMarca(solicitud);

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

  if (!mostrarDescarga) {
    return null;
  }

  return (
    <section className="space-y-3" aria-labelledby="estado-registro-heading">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDismiss={() => setToast(null)}
        />
      )}
      <p id="estado-registro-heading" className="text-label text-muted">
        Estado del registro
      </p>
      <CTAButton
        label={LABEL_DESCARGAR_REGISTRO_MARCA}
        variant="success"
        fullWidth
        size="md"
        isLoading={descargando}
        icon={<Download size={18} />}
        onClick={handleDescarga}
      />
    </section>
  );
}
