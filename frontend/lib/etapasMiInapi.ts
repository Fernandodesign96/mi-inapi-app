import { IPAS_CLASIFICACION } from "@/lib/statusNameToEtapa";
import type { Solicitud } from "@/lib/mockData";

export type StepState = "completed" | "current" | "pending";

export type EtapaMiInapiId =
  | "solicitud-recibida"
  | "revision-requisitos"
  | "publicacion-do"
  | "revision-fondo"
  | "aceptacion-registro"
  | "pago-registro"
  | "solicitud-registrada"
  | "renovacion";

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
  prefixes: string[];
}[] = [
  {
    id: "solicitud-recibida",
    index: 0,
    label: "Solicitud recibida",
    labelShort: "Solicitud recibida",
    microcopy: "",
    descripcion: "INAPI recibió su solicitud y está revisando sus datos.",
    prefixes: ["1. Solicitud recibida"],
  },
  {
    id: "revision-requisitos",
    index: 1,
    label: "Revisión de requisitos (Examen de Forma)",
    labelShort: "Revisión de requisitos",
    microcopy: "(Examen de Forma)",
    descripcion:
      "INAPI verifica que la solicitud cumpla los requisitos legales y formales",
    prefixes: ["2. Revisión de requisitos", "2.1", "2.2"],
  },
  {
    id: "publicacion-do",
    index: 2,
    label: "Publicación en Diario Oficial y plazo de oposiciones",
    labelShort: "Publicación en Diario Oficial",
    microcopy: "",
    descripcion:
      "Su marca se publica en el Diario Oficial y terceros pueden oponerse dentro de un plazo.",
    prefixes: ["3. Publicación en Diario Oficial", "3.1"],
  },
  {
    id: "revision-fondo",
    index: 3,
    label: "Revisión legal y de fondo (Examen de Fondo)",
    labelShort: "Revisión legal y de fondo",
    microcopy: "(Examen de Fondo)",
    descripcion:
      "Se le ha asignado un especialista de INAPI, quien evalúa si su marca cumple con la ley para ser registrada",
    prefixes: ["4. Revisión legal y de fondo", "4.1", "4.2"],
  },
  {
    id: "aceptacion-registro",
    index: 4,
    label: "En proceso de aceptación a registro",
    labelShort: "Aceptación a registro",
    microcopy: "",
    descripcion:
      "Su solicitud superó la evaluación de fondo y se encuentra en la etapa final previa a la aprobación formal para el pago de derechos.",
    prefixes: ["5. En proceso de aceptación"],
  },
  {
    id: "pago-registro",
    index: 5,
    label: "Pago y registro",
    labelShort: "Pago y registro",
    microcopy: "",
    descripcion:
      "Si la solicitud fue aceptada, debe realizar el pago de los derechos para obtener su título oficial de registro",
    prefixes: ["6. Pago y registro", "6.1", "6.2"],
  },
  {
    id: "solicitud-registrada",
    index: 6,
    label: "Solicitud Registrada",
    labelShort: "Solicitud Registrada",
    microcopy: "",
    descripcion: "La marca quedó inscrita en el registro de INAPI.",
    prefixes: ["8.- Solicitud Registrada", "8. Solicitud Registrada"],
  },
  {
    id: "renovacion",
    index: 7,
    label: "Esperando por solicitud de renovación de marca",
    labelShort: "Renovación de marca",
    microcopy: "",
    descripcion:
      "El registro está vigente. Cuando corresponda, podrá solicitar la renovación de la marca.",
    prefixes: ["9.- Esperando por solicitud de renovación", "9. Esperando"],
  },
];

export const STEPPER_LABELS = ETAPAS_MI_INAPI.map((e) => e.labelShort);

function normalizeEtapaLabel(raw: string): string {
  return raw.replace(/\s+/g, " ").trim();
}

export function stepperIndexFromEtapaLabel(label: string): number {
  const mapped = normalizeEtapaLabel(label);
  const found = ETAPAS_MI_INAPI.find((e) =>
    e.prefixes.some((p) => mapped.startsWith(p) || mapped.startsWith(p.replace(".-", ".")))
  );
  if (found) return found.index;
  if (mapped.toLowerCase().startsWith("finalizada sin registro")) return 1;
  if (mapped.toLowerCase().startsWith("registro no vigente")) return 6;
  if (mapped.toLowerCase().startsWith("modificaciones al registro")) return 6;
  if (mapped.toLowerCase().startsWith("proceso de renovación") || mapped.toLowerCase().startsWith("proceso de renovacion")) {
    return 7;
  }
  return 0;
}

export function terminalFromEstadoMiInapi(estado: string): EtapaTerminal {
  const s = normalizeEtapaLabel(estado).toLowerCase();
  if (s === "finalizada sin registro") return "finalizada-sin-registro";
  if (s === "registro no vigente") return "registro-no-vigente";
  if (s === "proceso de renovación" || s === "proceso de renovacion") {
    return "proceso-renovacion";
  }
  if (s === "modificaciones al registro") return "modificaciones-registro";
  return "en-curso";
}

export function resolveEtapaFromStatusName(statusName: string): {
  index: number;
  terminal: EtapaTerminal;
  etapaLabel: string;
  estadoMiInapi: string;
  userAction: boolean;
  accionTexto: string | null;
} {
  const hit = IPAS_CLASIFICACION[statusName];
  if (hit) {
    const estadoMiInapi = hit.estadoMiInapi.trim();
    return {
      index: stepperIndexFromEtapaLabel(hit.etapaLabel),
      terminal: terminalFromEstadoMiInapi(estadoMiInapi),
      etapaLabel: hit.etapaLabel,
      estadoMiInapi,
      userAction: hit.userAction,
      accionTexto: hit.accionTexto,
    };
  }

  const mapped = normalizeEtapaLabel(statusName);
  return {
    index: 0,
    terminal: "en-curso",
    etapaLabel: mapped || "1. Solicitud recibida",
    estadoMiInapi: "En Trámite",
    userAction: false,
    accionTexto: null,
  };
}

export function getStepStatesByIndex(
  index: number,
  options?: { allCompleted?: boolean }
): StepState[] {
  const n = ETAPAS_MI_INAPI.length;
  if (options?.allCompleted) {
    return ETAPAS_MI_INAPI.map((_, i) =>
      i < n - 1 ? "completed" : "pending"
    ) as StepState[];
  }
  return ETAPAS_MI_INAPI.map((_, i) => {
    if (i < index) return "completed";
    if (i === index) return "current";
    return "pending";
  });
}

const LEGACY_ESTADO_TO_INDEX: Record<string, { index: number; allCompleted?: boolean }> = {
  INGRESO: { index: 0 },
  CORRECCION_FORMA: { index: 1 },
  ACCION_REQUERIDA: { index: 1 },
  PUBLICACION: { index: 2 },
  OPOSICION: { index: 3 },
  EXAMEN_FONDO: { index: 3 },
  EN_REVISION: { index: 3 },
  ACEPTACION: { index: 4 },
  FINALIZADA: { index: 6, allCompleted: true },
  REGISTRO: { index: 6, allCompleted: true },
};

export function getEtapaIndexFromSolicitud(solicitud: Solicitud): number {
  if (typeof solicitud.etapaIndex === "number") return solicitud.etapaIndex;
  return LEGACY_ESTADO_TO_INDEX[solicitud.estado]?.index ?? 0;
}

/** Prefijo de subetapa ciudadana: 2.1, 4.1.-, 6.2, etc. */
const SUBETAPA_PREFIX = /^\d+\.\d+\.?\-*\s*/;

export function isSubetapaLabel(label: string): boolean {
  return /^\d+\.\d+/.test(normalizeEtapaLabel(label));
}

/** Texto de subetapa sin números internos. Null si el label es una etapa principal. */
export function subetapaCiudadana(label?: string | null): string | null {
  if (!label) return null;
  const mapped = normalizeEtapaLabel(label);
  if (!isSubetapaLabel(mapped)) return null;
  const stripped = mapped.replace(SUBETAPA_PREFIX, "").replace(/^\.-\s*/, "").trim();
  return stripped || null;
}

export function etapaCiudadanaFromSolicitud(
  solicitud: Pick<Solicitud, "etapaLabel" | "etapaIndex">
): string {
  const index =
    typeof solicitud.etapaIndex === "number"
      ? solicitud.etapaIndex
      : stepperIndexFromEtapaLabel(solicitud.etapaLabel ?? "");
  const fromStepper = ETAPAS_MI_INAPI[index]?.label;
  if (fromStepper) return fromStepper;
  const raw = normalizeEtapaLabel(solicitud.etapaLabel ?? "");
  if (!raw) return "Solicitud recibida";
  return raw.replace(/^\d+\.?\-*\s*/, "").trim() || raw;
}

export function estadoCiudadano(estado?: string | null): string {
  const raw = (estado ?? "En trámite").trim();
  if (raw.toLowerCase() === "en trámite") return "En trámite";
  return raw;
}

export function numeroExpedienteParts(
  solicitud: Pick<Solicitud, "id" | "estadoUnificado"> & {
    numeroRegistro?: string;
  }
): { label: string; value: string } {
  if (solicitud.numeroRegistro) {
    return { label: "Número de registro", value: solicitud.numeroRegistro };
  }
  return { label: "Número de solicitud", value: solicitud.id };
}

export function etiquetaNumeroExpediente(
  solicitud: Pick<Solicitud, "id" | "estadoUnificado"> & {
    numeroRegistro?: string;
  }
): string {
  const { label, value } = numeroExpedienteParts(solicitud);
  return `${label}: ${value}`;
}

export function tipoDerechoLabel(tipo: Solicitud["tipo"]): string {
  if (tipo === "marca") return "Marca comercial";
  if (tipo === "patente") return "Patente";
  return "Diseño industrial";
}

export function getStepStatesForSolicitud(solicitud: Solicitud): StepState[] {
  const estado = (solicitud.estadoUnificado ?? "").trim();
  if (
    solicitud.etapaAllCompleted ||
    solicitud.statusIpas === "Registrada" ||
    estado === "Registrada"
  ) {
    return getStepStatesByIndex(6, { allCompleted: true });
  }
  if (estado === "Proceso de Renovación" || solicitud.etapaTerminal === "proceso-renovacion") {
    return getStepStatesByIndex(7);
  }
  const index = getEtapaIndexFromSolicitud(solicitud);
  return getStepStatesByIndex(index);
}
