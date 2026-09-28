import type { ButtonVariant } from "@/components/ui/CTAButton";

/**
 * Fase 2 — UI deshabilitada en el MVP (código conservado; reactivar con `true`).
 */
export const PHASE_2_UI_ENABLED = false;

export function phase2HiddenClass(): string {
  return PHASE_2_UI_ENABLED ? "" : "hidden";
}

/** Etiqueta unificada para CTAs informativos (sin acción ejecutable en Fase 1). */
export const LABEL_VER_DETALLE_SOLICITUD =
  "Ver detalle completo del estado de la solicitud";

export type SemaphoreUrgency = "danger" | "warning" | "info" | "success";

/** Variante de botón alineada al color del semáforo del trámite. */
export function ctaVariantForSemaphore(
  urgency: SemaphoreUrgency
): ButtonVariant {
  switch (urgency) {
    case "danger":
      return "danger";
    case "warning":
      return "warning";
    case "success":
      return "success";
    default:
      return "info";
  }
}
