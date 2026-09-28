import type { Solicitud } from "@/lib/mockData";

/** Única acción ejecutable en Fase 1: pantalla de detalle de solicitud. */
export const LABEL_DESCARGAR_REGISTRO_MARCA =
  "Descargar PDF del registro de la marca";

export function puedeDescargarRegistroMarca(solicitud: Solicitud): boolean {
  return solicitud.urgency === "success" && solicitud.estado === "FINALIZADA";
}

/** Simula descarga del certificado de registro (MVP). */
export function simularDescargaRegistroMarca(solicitudId: string): Promise<void> {
  if (!solicitudId.trim()) {
    return Promise.reject(new Error("Identificador de solicitud inválido"));
  }
  return new Promise((resolve) => {
    setTimeout(resolve, 1200);
  });
}
