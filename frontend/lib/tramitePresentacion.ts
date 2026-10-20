import {
  ETAPAS_MI_INAPI,
  resolveEtapaFromStatusName,
  type EtapaTerminal,
} from "@/lib/etapasMiInapi";
import type { Solicitud } from "@/lib/mockData";

export type CardUrgency = "danger" | "warning" | "info" | "success" | "neutral";

export type UserActionKind =
  | "pago-concesion"
  | "pago-publicacion"
  | "observaciones-forma"
  | "observaciones-fondo"
  | "docs-prioridad"
  | "respuesta-oposiciones"
  | "presentacion-copias"
  | "abandonar"
  | "no-presentada";

export function resolveUserActionKind(
  statusName: string
): UserActionKind | null {
  const s = statusName.toLowerCase();

  if (
    s.includes("pago de concesión") ||
    s.includes("pago de concesion") ||
    s.includes("falta de pago de concesión") ||
    s.includes("falta de pago de concesion")
  ) {
    return "pago-concesion";
  }
  if (
    s.includes("pago de publicación") ||
    s.includes("pago de publicacion") ||
    s.includes("falta de publicación") ||
    s.includes("falta de publicacion")
  ) {
    return "pago-publicacion";
  }
  if (s.includes("para tener por no presentada")) return "no-presentada";
  if (s.includes("docs de prioridad")) return "docs-prioridad";
  if (s.includes("respuesta a oposiciones")) return "respuesta-oposiciones";
  if (s.includes("presentación de copias") || s.includes("presentacion de copias")) {
    return "presentacion-copias";
  }
  if (s.includes("observaciones de fondo")) return "observaciones-fondo";
  if (s.includes("observaciones de forma")) return "observaciones-forma";
  if (s.includes("para abandonar")) return "abandonar";

  return null;
}

export function isUserActionStatus(statusName: string): boolean {
  return resolveUserActionKind(statusName) !== null;
}

export function accionCiudadana(statusName: string): string | null {
  switch (resolveUserActionKind(statusName)) {
    case "pago-concesion":
      return "Pagar derechos de concesión y registro";
    case "pago-publicacion":
      return "Pagar publicación en el Diario Oficial";
    case "observaciones-forma":
      return "Responder observaciones de forma y adjuntar antecedentes";
    case "observaciones-fondo":
      return "Responder observaciones de fondo y adjuntar antecedentes";
    case "docs-prioridad":
      return "Adjuntar documentos de prioridad";
    case "respuesta-oposiciones":
      return "Responder a la oposición presentada";
    case "presentacion-copias":
      return "Presentar copias del expediente";
    case "abandonar":
      return "Regularizar el expediente antes de que se declare abandonado";
    case "no-presentada":
      return "Completar la publicación para que la solicitud no se tenga por no presentada";
    default:
      return null;
  }
}

function urgencyForUserAction(kind: UserActionKind): CardUrgency {
  if (
    kind === "pago-concesion" ||
    kind === "pago-publicacion" ||
    kind === "abandonar" ||
    kind === "no-presentada"
  ) {
    return "danger";
  }
  return "warning";
}

export function classifyTramite(statusName: string): {
  urgency: CardUrgency;
  estado: Solicitud["estado"];
  userAction: boolean;
  estadoUnificado: string;
  badgeLabel: string;
  terminal: EtapaTerminal;
  etapaLabel: string;
  etapaIndex: number;
} {
  const etapa = resolveEtapaFromStatusName(statusName);
  const s = statusName.trim();
  const lower = s.toLowerCase();
  const actionKind = resolveUserActionKind(s);

  if (lower === "registrada") {
    return {
      urgency: "success",
      estado: "FINALIZADA",
      userAction: false,
      estadoUnificado: "Registrada",
      badgeLabel: "Registrada",
      terminal: etapa.terminal,
      etapaLabel: etapa.etapaLabel,
      etapaIndex: etapa.index,
    };
  }

  if (etapa.terminal === "registro-no-vigente") {
    return {
      urgency: "neutral",
      estado: "FINALIZADA",
      userAction: false,
      estadoUnificado: s,
      badgeLabel: s,
      terminal: etapa.terminal,
      etapaLabel: etapa.etapaLabel,
      etapaIndex: etapa.index,
    };
  }

  if (etapa.terminal === "finalizada-sin-registro") {
    return {
      urgency: "neutral",
      estado: "EN_REVISION",
      userAction: false,
      estadoUnificado: s,
      badgeLabel: s,
      terminal: etapa.terminal,
      etapaLabel: etapa.etapaLabel,
      etapaIndex: etapa.index,
    };
  }

  if (actionKind) {
    return {
      urgency: urgencyForUserAction(actionKind),
      estado: "ACCION_REQUERIDA",
      userAction: true,
      estadoUnificado: "En trámite",
      badgeLabel: "Acción requerida",
      terminal: etapa.terminal,
      etapaLabel: etapa.etapaLabel,
      etapaIndex: etapa.index,
    };
  }

  return {
    urgency: "info",
    estado: "EN_REVISION",
    userAction: false,
    estadoUnificado: "En trámite",
    badgeLabel: "En trámite",
    terminal: etapa.terminal,
    etapaLabel: etapa.etapaLabel,
    etapaIndex: etapa.index,
  };
}

export function badgeLabelForSolicitud(
  solicitud: Pick<
    Solicitud,
    "estadoUnificado" | "urgency" | "estado" | "statusIpas"
  >
): string {
  if (
    solicitud.estadoUnificado &&
    solicitud.estadoUnificado !== "En trámite"
  ) {
    return solicitud.estadoUnificado;
  }
  if (
    solicitud.estado === "ACCION_REQUERIDA" ||
    solicitud.urgency === "danger" ||
    solicitud.urgency === "warning"
  ) {
    return "Acción requerida";
  }
  if (solicitud.urgency === "success") return "Registrada";
  return solicitud.estadoUnificado ?? "En trámite";
}

export function semaphoreUrgency(
  solicitud: Pick<Solicitud, "urgency">
): CardUrgency {
  return solicitud.urgency;
}

function copiaAccionCiudadana(args: {
  nombre: string;
  id: string;
  statusName: string;
  actionTypeName: string;
  descEtapa: string;
  kind: UserActionKind;
  tarea: string | null;
}): Pick<
  NonNullable<Solicitud["accionRequeridaDetalle"]>,
  "explicacionClara" | "consecuencia" | "pasos" | "canalPresentacion" | "documentos"
> {
  const tarea = args.tarea ?? "Completar la gestión pendiente en los canales oficiales de INAPI";
  const intro = `Estado IPAS: ${args.statusName}. ${args.descEtapa} Debes ${tarea.charAt(0).toLowerCase()}${tarea.slice(1)} dentro del plazo del expediente. Última acción registrada: «${args.actionTypeName}». Esta gestión no se realiza dentro de MiINAPI.`;

  const canalPago =
    "Medios de pago y canales oficiales indicados en el oficio o en el portal de INAPI.";
  const canalEscritos =
    "Canales oficiales de INAPI según el oficio o la notificación del expediente (portal INAPI, correo o ventanilla).";

  switch (args.kind) {
    case "pago-concesion":
      return {
        explicacionClara: intro,
        consecuencia:
          "Si el plazo de pago de concesión vence sin acreditar el pago, la solicitud puede abandonarse y no obtener el título de registro.",
        pasos: [
          "Revisa el oficio de aceptación a registro y el monto de los derechos de concesión.",
          "Efectúa el pago de concesión por los medios habilitados por INAPI, no desde esta aplicación.",
          "Conserva el comprobante; INAPI verifica el pago antes de emitir el título.",
        ],
        canalPresentacion: canalPago,
      };
    case "pago-publicacion":
      return {
        explicacionClara: intro,
        consecuencia:
          "Si el plazo vence sin el pago de publicación, la solicitud puede tenerse por no presentada por falta de publicación.",
        pasos: [
          "Revisa el oficio de aceptación a trámite y las instrucciones de pago de publicación en el Diario Oficial.",
          "Efectúa el pago por los medios habilitados por INAPI, no desde esta aplicación.",
          "Conserva el comprobante para el seguimiento del expediente.",
        ],
        canalPresentacion: canalPago,
      };
    case "observaciones-forma":
      return {
        explicacionClara: intro,
        consecuencia:
          "Si el plazo de observaciones de forma vence sin respuesta, el expediente puede abandonarse o no avanzar a publicación.",
        documentos: [
          "Oficio de observaciones de forma",
          "Escrito de respuesta y correcciones solicitadas",
          "Antecedentes o documentos que INAPI haya requerido",
        ],
        pasos: [
          "Lee el oficio de observaciones de forma y anota cada punto a subsanar.",
          "Prepara el escrito de respuesta y los documentos pedidos.",
          "Preséntalos en los canales oficiales de INAPI dentro del plazo.",
        ],
        canalPresentacion: canalEscritos,
      };
    case "observaciones-fondo":
      return {
        explicacionClara: intro,
        consecuencia:
          "Si el plazo de observaciones de fondo vence sin respuesta, el expediente puede no continuar hacia el registro.",
        documentos: [
          "Oficio de observaciones de fondo",
          "Escrito de respuesta a las observaciones",
          "Antecedentes que respalden la registrabilidad de la marca",
        ],
        pasos: [
          "Lee el oficio de observaciones de fondo.",
          "Prepara la respuesta y los antecedentes de respaldo.",
          "Preséntalos en los canales oficiales de INAPI dentro del plazo.",
        ],
        canalPresentacion: canalEscritos,
      };
    case "docs-prioridad":
      return {
        explicacionClara: intro,
        consecuencia:
          "Si el plazo vence sin los documentos de prioridad, la reivindicación de prioridad puede no considerarse.",
        documentos: [
          "Documentos de prioridad requeridos en el oficio",
          "Traducciones o copias certificadas, si fueron solicitadas",
        ],
        pasos: [
          "Revisa qué documentos de prioridad pidió INAPI.",
          "Reúne los antecedentes y, si corresponde, sus traducciones.",
          "Preséntalos en los canales oficiales de INAPI dentro del plazo.",
        ],
        canalPresentacion: canalEscritos,
      };
    case "respuesta-oposiciones":
      return {
        explicacionClara: intro,
        consecuencia:
          "Si el plazo de respuesta a la oposición vence sin escrito, el expediente puede seguir sin tu contestación.",
        documentos: [
          "Escrito de contestación a la oposición",
          "Antecedentes y pruebas que respalden tu marca",
        ],
        pasos: [
          "Revisa la oposición notificada y el plazo de traslado.",
          "Prepara el escrito de respuesta y los antecedentes de respaldo.",
          "Preséntalos en los canales oficiales de INAPI dentro del plazo.",
        ],
        canalPresentacion: canalEscritos,
      };
    case "presentacion-copias":
      return {
        explicacionClara: intro,
        consecuencia:
          "Si el plazo vence sin las copias, el expediente puede no continuar según la resolución aplicable.",
        documentos: ["Copias del expediente o de los documentos requeridos en el oficio"],
        pasos: [
          "Revisa qué copias pidió INAPI.",
          "Preséntalas en los canales oficiales dentro del plazo.",
        ],
        canalPresentacion: canalEscritos,
      };
    case "abandonar":
      return {
        explicacionClara: intro,
        consecuencia:
          "Si no regularizas el expediente a tiempo, INAPI puede declararlo abandonado y el trámite no continúa.",
        pasos: [
          "Revisa el estado «Para abandonar» y el oficio que indica la omisión pendiente.",
          "Completa el pago, el escrito o los documentos que faltan, según el oficio.",
          "Preséntalos en los canales oficiales de INAPI de inmediato.",
        ],
        canalPresentacion: canalEscritos,
      };
    case "no-presentada":
      return {
        explicacionClara: intro,
        consecuencia:
          "Si no se completa la publicación, la solicitud puede tenerse por no presentada y no seguirá en trámite.",
        pasos: [
          "Revisa el oficio relativo a la falta de publicación en el Diario Oficial.",
          "Si aún corresponde, efectúa el pago de publicación por los medios oficiales de INAPI.",
          "Consulta el expediente en los canales oficiales para confirmar si la gestión sigue habilitada.",
        ],
        canalPresentacion: canalPago,
      };
  }
}

export function buildIpasCopy(args: {
  nombre: string;
  id: string;
  statusName: string;
  actionTypeName: string;
  etapaLabel: string;
  userAction: boolean;
  terminal: EtapaTerminal;
}): NonNullable<Solicitud["accionRequeridaDetalle"]> {
  const etapa = ETAPAS_MI_INAPI.find((e) => e.label === args.etapaLabel);
  const descEtapa = etapa?.descripcion
    ? `${etapa.descripcion}.`
    : `${args.etapaLabel}.`;

  if (args.statusName.toLowerCase() === "registrada") {
    return {
      explicacionClara: `Estado IPAS: Registrada. La marca ${args.nombre} (solicitud ${args.id}) obtuvo registro. Última acción registrada: «${args.actionTypeName}».`,
      pasos: [
        "El trámite concluyó con el registro de la marca.",
        "Puedes consultar el PDF del registro desde MiINAPI.",
        "Otras gestiones (renovación, cambios de titular) se realizan en los canales oficiales de INAPI.",
      ],
      referencia: `Etapa MiINAPI: ${args.etapaLabel} · Estado IPAS: Registrada`,
    };
  }

  if (
    args.terminal === "finalizada-sin-registro" ||
    args.terminal === "registro-no-vigente"
  ) {
    return {
      explicacionClara: `Estado IPAS: ${args.statusName}. La solicitud ${args.nombre} (${args.id}) no se encuentra vigente como registro. Última acción registrada: «${args.actionTypeName}».`,
      pasos: [
        `El expediente quedó en el estado «${args.statusName}».`,
        "MiINAPI permite consultar el detalle; no se reabre ni se completa el trámite desde esta aplicación.",
      ],
      referencia: `Etapa MiINAPI: ${args.etapaLabel} · Estado IPAS: ${args.statusName}`,
    };
  }

  const kind = resolveUserActionKind(args.statusName);
  if (args.userAction || kind) {
    const tarea = accionCiudadana(args.statusName);
    const copia = copiaAccionCiudadana({
      nombre: args.nombre,
      id: args.id,
      statusName: args.statusName,
      actionTypeName: args.actionTypeName,
      descEtapa,
      kind: kind ?? "abandonar",
      tarea,
    });
    return {
      ...copia,
      referencia: `Etapa MiINAPI: ${args.etapaLabel} · Estado IPAS: ${args.statusName}`,
    };
  }

  return {
    explicacionClara: `Estado IPAS: ${args.statusName}. ${descEtapa} Última acción registrada: «${args.actionTypeName}». INAPI continúa el expediente; no hay una gestión ciudadana pendiente en MiINAPI.`,
    pasos: [
      `La solicitud permanece en «${args.statusName}».`,
      "Te avisaremos en MiINAPI si el estado cambia o si INAPI requiere una gestión posterior.",
    ],
    referencia: `Etapa MiINAPI: ${args.etapaLabel} · Estado IPAS: ${args.statusName}`,
  };
}

export function resumenInicio(solicitud: Solicitud): string {
  if (solicitud.accionRequeridaDetalle?.explicacionClara) {
    return solicitud.accionRequeridaDetalle.explicacionClara;
  }
  if (solicitud.statusIpas) {
    return `Estado IPAS: ${solicitud.statusIpas}.`;
  }
  return solicitud.etapaLabel ?? "Consulta el detalle de la solicitud.";
}
