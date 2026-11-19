import {
  ETAPAS_MI_INAPI,
  etapaCiudadanaFromSolicitud,
  resolveEtapaFromStatusName,
  subetapaCiudadana,
  type EtapaTerminal,
} from "@/lib/etapasMiInapi";
import { IPAS_CLASIFICACION } from "@/lib/statusNameToEtapa";
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
  | "no-presentada"
  | "recurso-apelacion";

export function resolveUserActionKind(
  statusName: string
): UserActionKind | null {
  const clasificado = IPAS_CLASIFICACION[statusName];
  if (clasificado && !clasificado.userAction) return null;

  const s = statusName.toLowerCase();

  if (s.includes("recurso de apelación") || s.includes("recurso de apelacion") || s.includes("rechazo")) {
    if (clasificado?.userAction) return "recurso-apelacion";
  }
  if (
    s.includes("pago de concesión") ||
    s.includes("pago de concesion") ||
    s.includes("pago de tasa de registro") ||
    s.includes("pago de tasa de registo")
  ) {
    return "pago-concesion";
  }
  if (
    s.includes("pago de publicación") ||
    s.includes("pago de publicacion")
  ) {
    return "pago-publicacion";
  }
  if (s.includes("docs de prioridad")) return "docs-prioridad";
  if (s.includes("respuesta a oposiciones")) return "respuesta-oposiciones";
  if (s.includes("presentación de copias") || s.includes("presentacion de copias")) {
    return "presentacion-copias";
  }
  if (s.includes("observaciones de fondo") || s.includes("observaciones de forma en fondo")) {
    return "observaciones-fondo";
  }
  if (s.includes("observaciones de forma")) return "observaciones-forma";
  if (clasificado?.userAction && (s.includes("aceptación parcial") || s.includes("aceptacion parcial"))) {
    return "recurso-apelacion";
  }

  return clasificado?.userAction ? "abandonar" : null;
}

export function isUserActionStatus(statusName: string): boolean {
  return IPAS_CLASIFICACION[statusName]?.userAction === true;
}

export function accionCiudadana(statusName: string): string | null {
  const texto = IPAS_CLASIFICACION[statusName]?.accionTexto;
  if (texto) return texto;
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
    case "recurso-apelacion":
      return "Revisar la resolución de INAPI. Puedes presentar un recurso de apelación dentro del plazo.";
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
  const estadoMiInapi = etapa.estadoMiInapi;
  const actionKind = etapa.userAction ? resolveUserActionKind(statusName) : null;

  if (estadoMiInapi === "Registrada") {
    return {
      urgency: "success",
      estado: "FINALIZADA",
      userAction: false,
      estadoUnificado: "Registrada",
      badgeLabel: "Notificación de éxito",
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
      estadoUnificado: "Registro no vigente",
      badgeLabel: "Notificación informativa",
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
      estadoUnificado: "Finalizada sin registro",
      badgeLabel: "Notificación informativa",
      terminal: etapa.terminal,
      etapaLabel: etapa.etapaLabel,
      etapaIndex: etapa.index,
    };
  }

  if (etapa.terminal === "modificaciones-registro") {
    return {
      urgency: "info",
      estado: "EN_REVISION",
      userAction: false,
      estadoUnificado: "Modificaciones al registro",
      badgeLabel: "Notificación informativa",
      terminal: etapa.terminal,
      etapaLabel: etapa.etapaLabel,
      etapaIndex: etapa.index,
    };
  }

  if (etapa.terminal === "proceso-renovacion") {
    return {
      urgency: "info",
      estado: "EN_REVISION",
      userAction: false,
      estadoUnificado: "Proceso de Renovación",
      badgeLabel: "Notificación informativa",
      terminal: etapa.terminal,
      etapaLabel: etapa.etapaLabel,
      etapaIndex: etapa.index,
    };
  }

  if (etapa.userAction && actionKind) {
    return {
      urgency: urgencyForUserAction(actionKind),
      estado: "ACCION_REQUERIDA",
      userAction: true,
      estadoUnificado: "En Trámite",
      badgeLabel: "Acción urgente",
      terminal: etapa.terminal,
      etapaLabel: etapa.etapaLabel,
      etapaIndex: etapa.index,
    };
  }

  return {
    urgency: "info",
    estado: "EN_REVISION",
    userAction: false,
    estadoUnificado: "En Trámite",
    badgeLabel: "Notificación informativa",
    terminal: etapa.terminal,
    etapaLabel: etapa.etapaLabel,
    etapaIndex: etapa.index,
  };
}

export function badgeLabelForSolicitud(
  solicitud: Pick<
    Solicitud,
    "estadoUnificado" | "urgency" | "estado" | "statusIpas"
  >,
  surface: "list" | "detail" = "list"
): string {
  if (
    solicitud.estado === "ACCION_REQUERIDA" ||
    solicitud.urgency === "danger" ||
    solicitud.urgency === "warning"
  ) {
    return "Acción urgente";
  }
  if (solicitud.urgency === "success") {
    return surface === "detail"
      ? "Información de éxito"
      : "Notificación de éxito";
  }
  return "Notificación informativa";
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
  const tarea =
    args.tarea ??
    "Completar la gestión pendiente en los canales oficiales de INAPI";

  const canalPago =
    "Medios de pago y canales oficiales indicados en el oficio o en el portal de INAPI.";
  const canalEscritos =
    "Canales oficiales de INAPI según el oficio o la notificación del expediente (portal INAPI, correo o ventanilla).";

  switch (args.kind) {
    case "pago-concesion":
      return {
        explicacionClara: tarea,
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
        explicacionClara: tarea,
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
        explicacionClara: tarea,
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
        explicacionClara: tarea,
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
        explicacionClara: tarea,
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
        explicacionClara: tarea,
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
        explicacionClara: tarea,
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
        explicacionClara: tarea,
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
        explicacionClara: tarea,
        consecuencia:
          "Si no se completa la publicación, la solicitud puede tenerse por no presentada y no seguirá en trámite.",
        pasos: [
          "Revisa el oficio relativo a la falta de publicación en el Diario Oficial.",
          "Si aún corresponde, efectúa el pago de publicación por los medios oficiales de INAPI.",
          "Consulta el expediente en los canales oficiales para confirmar si la gestión sigue habilitada.",
        ],
        canalPresentacion: canalPago,
      };
    case "recurso-apelacion":
      return {
        explicacionClara: tarea,
        consecuencia:
          "Si no presentas el recurso dentro del plazo, la resolución de INAPI quedará firme.",
        pasos: [
          "Lee la resolución notificada por INAPI y el plazo de apelación.",
          "Si decides recurrir, presenta el recurso en los canales oficiales dentro del plazo.",
          "MiINAPI no tramita el recurso: la gestión se hace ante INAPI.",
        ],
        canalPresentacion: canalEscritos,
      };
    default:
      return {
        explicacionClara: tarea,
        consecuencia:
          "Si no completas la gestión a tiempo, el expediente puede no continuar.",
        pasos: [
          "Revisa la notificación oficial de INAPI.",
          "Completa la gestión en los canales oficiales dentro del plazo.",
        ],
        canalPresentacion: canalEscritos,
      };
  }
}

function referenciaCiudadana(etapaLabel: string): string {
  const etapa = etapaCiudadanaFromSolicitud({ etapaLabel });
  const sub = subetapaCiudadana(etapaLabel);
  return sub ? `${etapa}. ${sub}` : etapa;
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
  const etapa = ETAPAS_MI_INAPI.find((e) =>
    e.prefixes.some((p) => args.etapaLabel.startsWith(p))
  );
  const descEtapa = etapa?.descripcion
    ? `${etapa.descripcion}.`
    : `${args.etapaLabel}.`;
  const referencia = referenciaCiudadana(args.etapaLabel);

  if (args.statusName.toLowerCase() === "registrada") {
    return {
      explicacionClara: `La marca ${args.nombre} obtuvo registro.`,
      pasos: [
        "El trámite concluyó con el registro de la marca.",
        "Puedes consultar el PDF del registro desde MiINAPI.",
        "Otras gestiones (renovación, cambios de titular) se realizan en los canales oficiales de INAPI.",
      ],
      referencia,
    };
  }

  if (
    args.terminal === "finalizada-sin-registro" ||
    args.terminal === "registro-no-vigente"
  ) {
    return {
      explicacionClara: `La solicitud ${args.nombre} no se encuentra vigente como registro.`,
      pasos: [
        "El expediente concluyó sin un registro vigente.",
        "MiINAPI permite consultar el detalle; no se reabre ni se completa el trámite desde esta aplicación.",
      ],
      referencia,
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
      referencia,
    };
  }

  return {
    explicacionClara: `${descEtapa} INAPI continúa el expediente; no hay una gestión pendiente de tu parte.`,
    pasos: [
      "INAPI continúa revisando el expediente.",
      "Te avisaremos en MiINAPI si el estado cambia o si se requiere una gestión posterior.",
    ],
    referencia,
  };
}
