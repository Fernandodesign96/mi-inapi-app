import { STATUS_NAME_TO_ETAPA } from "@/lib/statusNameToEtapa";
import type { Solicitud } from "@/lib/mockData";

export type StepState = "completed" | "current" | "pending";

export type EtapaMiInapiId =
  | "solicitud-recibida"
  | "revision-requisitos"
  | "publicacion-do"
  | "oposicion"
  | "revision-fondo"
  | "aceptacion-registro"
  | "pago-registro";

export type EtapaTerminal =
  | "en-curso"
  | "finalizada-sin-registro"
  | "registro-no-vigente"
  | "proceso-renovacion"
  | "modificaciones-registro";

export const ETAPAS_MI_INAPI: {
  id: EtapaMiInapiId;
  index: number;
  label: string;
  labelShort: string;
  microcopy: string;
  descripcion: string;
  statusPrefix: string;
}[] = [
  {
    id: "solicitud-recibida",
    index: 0,
    label: "Solicitud recibida",
    labelShort: "Solicitud recibida",
    microcopy: "",
    descripcion: "INAPI recibió su solicitud y está revisando sus datos.",
    statusPrefix: "1. Solicitud recibida",
  },
  {
    id: "revision-requisitos",
    index: 1,
    label: "Revisión de requisitos (Examen de Forma)",
    labelShort: "Revisión de requisitos",
    microcopy: "(Examen de Forma)",
    descripcion:
      "INAPI verifica que la solicitud cumpla los requisitos legales y formales",
    statusPrefix: "2. Revisión de requisitos",
  },
  {
    id: "publicacion-do",
    index: 2,
    label: "Publicación en Diario Oficial y plazo de oposiciones",
    labelShort: "Publicación en Diario Oficial",
    microcopy: "",
    descripcion:
      "Su marca se publica en el Diario Oficial y terceros pueden oponerse dentro de un plazo.",
    statusPrefix: "3. Publicación en Diario Oficial",
  },
  {
    id: "oposicion",
    index: 3,
    label: "Oposición en Diario Oficial",
    labelShort: "Oposición",
    microcopy: "",
    descripcion:
      "Se ha presentado una oposición. Un examinador revisará el caso e INAPI se pondrá en contacto con usted o con su representante si se requiere respuesta o antecedentes",
    statusPrefix: "3.1 Oposición",
  },
  {
    id: "revision-fondo",
    index: 4,
    label: "Revisión legal y de fondo (Examen de Fondo)",
    labelShort: "Revisión legal y de fondo",
    microcopy: "(Examen de Fondo)",
    descripcion:
      "Se le ha asignado un especialista de INAPI, quien evalúa si su marca o patente cumple con la ley para ser registrada",
    statusPrefix: "4. Revisión legal y de fondo",
  },
  {
    id: "aceptacion-registro",
    index: 5,
    label: "En proceso de aceptación a registro",
    labelShort: "En proceso de aceptación a registro",
    microcopy: "",
    descripcion:
      "Su solicitud superó la evaluación de fondo y se encuentra en la etapa final previa a la aprobación formal para el pago de derechos.",
    statusPrefix: "5. En proceso de aceptación",
  },
  {
    id: "pago-registro",
    index: 6,
    label: "Pago y registro",
    labelShort: "Pago y registro",
    microcopy: "",
    descripcion:
      "Si la solicitud fue aceptada, debe realizar el pago de los derechos para obtener su título oficial de registro",
    statusPrefix: "6. Pago y registro",
  },
];

export const STEPPER_LABELS = ETAPAS_MI_INAPI.map((e) => e.labelShort);

function normalizeEtapaLabel(raw: string): string {
  return raw.replace(/\s+/g, " ").trim();
}

export function resolveEtapaFromStatusName(statusName: string): {
  index: number;
  terminal: EtapaTerminal;
  etapaLabel: string;
} {
  const mapped = normalizeEtapaLabel(STATUS_NAME_TO_ETAPA[statusName] ?? "");
  const lower = mapped.toLowerCase();

  if (lower.startsWith("finalizada sin registro")) {
    return {
      index: 1,
      terminal: "finalizada-sin-registro",
      etapaLabel: "Finalizada sin registro",
    };
  }
  if (lower.startsWith("registro no vigente")) {
    return {
      index: 6,
      terminal: "registro-no-vigente",
      etapaLabel: "Registro no vigente",
    };
  }
  if (lower.startsWith("proceso de renovación") || lower.startsWith("proceso de renovacion")) {
    return {
      index: 6,
      terminal: "proceso-renovacion",
      etapaLabel: "Proceso de renovación",
    };
  }
  if (lower.startsWith("modificaciones al registro")) {
    return {
      index: 6,
      terminal: "modificaciones-registro",
      etapaLabel: "Modificaciones al registro",
    };
  }

  const found = ETAPAS_MI_INAPI.find((e) =>
    mapped.startsWith(e.statusPrefix)
  );
  if (found) {
    return {
      index: found.index,
      terminal: "en-curso",
      etapaLabel: found.label,
    };
  }

  return {
    index: 0,
    terminal: "en-curso",
    etapaLabel: mapped || "Solicitud recibida",
  };
}

export function getStepStatesByIndex(
  index: number,
  options?: { allCompleted?: boolean; terminalFail?: boolean }
): StepState[] {
  const n = ETAPAS_MI_INAPI.length;
  if (options?.allCompleted) {
    return Array(n).fill("completed") as StepState[];
  }
  return ETAPAS_MI_INAPI.map((_, i) => {
    if (i < index) return "completed";
    if (i === index) return options?.terminalFail ? "current" : "current";
    return "pending";
  });
}

const LEGACY_ESTADO_TO_INDEX: Record<string, { index: number; allCompleted?: boolean }> = {
  INGRESO: { index: 0 },
  CORRECCION_FORMA: { index: 1 },
  ACCION_REQUERIDA: { index: 1 },
  PUBLICACION: { index: 2 },
  OPOSICION: { index: 3 },
  EXAMEN_FONDO: { index: 4 },
  EN_REVISION: { index: 4 },
  ACEPTACION: { index: 5 },
  FINALIZADA: { index: 6, allCompleted: true },
  REGISTRO: { index: 6, allCompleted: true },
};

export function getEtapaIndexFromSolicitud(solicitud: Solicitud): number {
  if (typeof solicitud.etapaIndex === "number") return solicitud.etapaIndex;
  return LEGACY_ESTADO_TO_INDEX[solicitud.estado]?.index ?? 0;
}

export function getStepStatesForSolicitud(solicitud: Solicitud): StepState[] {
  if (
    solicitud.etapaAllCompleted ||
    solicitud.statusIpas === "Registrada" ||
    solicitud.estadoUnificado === "Registrada"
  ) {
    return getStepStatesByIndex(6, { allCompleted: true });
  }
  const index = getEtapaIndexFromSolicitud(solicitud);
  return getStepStatesByIndex(index, {
    terminalFail: solicitud.etapaTerminal === "finalizada-sin-registro",
  });
}

export function estadoUnificadoFromTerminal(
  terminal: EtapaTerminal,
  statusName: string
): string {
  if (statusName === "Registrada") return "Registrada";
  if (terminal === "finalizada-sin-registro") return "Finalizada sin registro";
  if (terminal === "registro-no-vigente") return "Registro no vigente";
  return "En trámite";
}
