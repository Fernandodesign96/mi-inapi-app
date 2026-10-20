import type { Notification, Solicitud, User } from "@/lib/mockData";
import {
  accionCiudadana,
  buildIpasCopy,
  classifyTramite,
} from "@/lib/tramitePresentacion";

export type InapiCuenta = {
  rutNum: string;
  password: string;
  name: string;
  email: string;
  initials: string;
};

type RawTramite = {
  rutNum: string;
  name: string;
  ns: string;
  marca: string;
  tipoMarca: "D" | "M" | "F";
  statusName: string;
  actionTypeName: string;
  filingDate: string;
  tieneAgente: boolean;
};

const RAW: RawTramite[] = [
  {
    rutNum: "7046527",
    name: "Carlos Andrés De Costa-nora Monti",
    ns: "1693630_42",
    marca: "VITAID",
    tipoMarca: "M",
    statusName: "Para asignar responsable de examen formal",
    actionTypeName: "Fin de captura diaria de expedientes",
    filingDate: "03/10/2026",
    tieneAgente: false,
  },
  {
    rutNum: "5316975",
    name: "Luis Atiliano Vásquez Díaz",
    ns: "1694791_35",
    marca: "AUDILEX",
    tipoMarca: "D",
    statusName: "En examen de forma",
    actionTypeName: "Fin de captura diaria de expedientes",
    filingDate: "12/10/2026",
    tieneAgente: false,
  },
  {
    rutNum: "3800446",
    name: "Ana María Baez Sáez",
    ns: "1688619_41",
    marca: "Siemprevivas",
    tipoMarca: "D",
    statusName: "Aguardando fin de plazo de presentación de oposiciones",
    actionTypeName: "Pago de publicación efectuado (Diario Oficial)",
    filingDate: "31/08/2026",
    tieneAgente: false,
  },
  {
    rutNum: "5473021",
    name: "Raúl Gustavo Aguilera Parada",
    ns: "1661501_5",
    marca: "LabCann , LabCann-Skin",
    tipoMarca: "D",
    statusName:
      "En examen de admisibilidad de todos los escritos de oposiciones",
    actionTypeName: "Asignación de responsable para examen de oposiciones",
    filingDate: "05/03/2026",
    tieneAgente: false,
  },
  {
    rutNum: "4436593",
    name: "Juan Enrique Carrera Salinas",
    ns: "1680039_29",
    marca: "caleta de lobos",
    tipoMarca: "D",
    statusName:
      "Para asignar responsable de examen de fondo (luego de plazo de oposiciones)",
    actionTypeName: "Asignación de responsable para examen de forma",
    filingDate: "08/07/2026",
    tieneAgente: false,
  },
  {
    rutNum: "4064679",
    name: "YOLANDA YAMNA NANDWANI NANDWANI",
    ns: "1675635_3",
    marca: "My Emperor Elixir",
    tipoMarca: "D",
    statusName:
      "Aguardando que resolución de aceptación a registro sea publicada",
    actionTypeName: "Publicación de marca en Diario Oficial",
    filingDate: "09/06/2026",
    tieneAgente: false,
  },
  {
    rutNum: "5598039",
    name: "Tomás Galván González",
    ns: "1670276_5",
    marca: "TerAler",
    tipoMarca: "D",
    statusName: "Aguardando fin de plazo de pago de concesión (marca nueva)",
    actionTypeName: "Asignación de responsable para examen de fondo",
    filingDate: "06/05/2026",
    tieneAgente: false,
  },
  {
    rutNum: "6873895",
    name: "ALEJANDRO ALVAREZ RAPAPORT",
    ns: "1670979_25",
    marca: "HOCKOK",
    tipoMarca: "M",
    statusName: "Aguardando fin de plazo de pago de concesión (marca nueva)",
    actionTypeName: "Resolución de aceptación a registro",
    filingDate: "12/05/2026",
    tieneAgente: false,
  },
  {
    rutNum: "4323087",
    name: "Jorge Elso Sanhueza",
    ns: "1572714_45",
    marca: "Aguamarina FM",
    tipoMarca: "D",
    statusName: "Registrada",
    actionTypeName: "Publicación de marca en Diario Oficial",
    filingDate: "25/01/2024",
    tieneAgente: false,
  },
  {
    rutNum: "2699024",
    name: "José Manuel Rodríguez Placin",
    ns: "1591072_30",
    marca: "Panadería Santa María",
    tipoMarca: "D",
    statusName: "Rechazada",
    actionTypeName: "(automático) Fin de plazo",
    filingDate: "14/07/2024",
    tieneAgente: false,
  },
  {
    rutNum: "4940352",
    name: "Hernán Víctor Duarte Ravello",
    ns: "1690979_41",
    marca: "Club deportivo Social y Cultural Ferrobadminton",
    tipoMarca: "M",
    statusName: "Aguardando fin de plazo de observaciones de forma",
    actionTypeName: "Resolución de observaciones de forma",
    filingDate: "15/09/2026",
    tieneAgente: true,
  },
  {
    rutNum: "5566057",
    name: "Juan Tomás Eguzki De Rementeria Durand",
    ns: "1689845_43",
    marca: "CAP DUCAL",
    tipoMarca: "D",
    statusName: "Aguardando fin de plazo de pago de publicación al Diario Oficial",
    actionTypeName: "Resolución de aceptación a trámite de marca",
    filingDate: "08/09/2026",
    tieneAgente: false,
  },
  {
    rutNum: "4962833",
    name: "Héctor Miguel Gutiérrez Lazo",
    ns: "1675682_41",
    marca: "CONJUNTO GRANEROS",
    tipoMarca: "M",
    statusName: "En examen de fondo",
    actionTypeName: "Resolución de observaciones de forma",
    filingDate: "10/06/2026",
    tieneAgente: false,
  },
  {
    rutNum: "5139418",
    name: "Pilar De Las Nieves Rodríguez Aros",
    ns: "1687456_43",
    marca: "Capitán Emilio",
    tipoMarca: "D",
    statusName: "Aguardando por publicación en Diario Oficial",
    actionTypeName: "Pago de publicación efectuado (Diario Oficial)",
    filingDate: "24/08/2026",
    tieneAgente: false,
  },
  {
    rutNum: "5340920",
    name: "Emma Agustina De Lourdes Valenzuela Rivera",
    ns: "1632417_39",
    marca: "VISA USA",
    tipoMarca: "D",
    statusName: "Abandonada",
    actionTypeName: "Resolución de abandono",
    filingDate: "21/07/2025",
    tieneAgente: false,
  },
  {
    rutNum: "5522560",
    name: "Guillermo Diaz De Valdes Gumucio",
    ns: "1618803_30",
    marca: "Cafe Amazonas",
    tipoMarca: "D",
    statusName: "Desistida",
    actionTypeName: "(automático) Fin de plazo",
    filingDate: "02/04/2025",
    tieneAgente: false,
  },
  {
    rutNum: "7108856",
    name: "José Andrés Moya Miranda",
    ns: "1670196_36",
    marca: "SEAPROP",
    tipoMarca: "M",
    statusName: "Para emitir título",
    actionTypeName: "Asignación de responsable para examen de fondo",
    filingDate: "06/05/2026",
    tieneAgente: false,
  },
  {
    rutNum: "5634513",
    name: "Luis Fernando Hidalgo Álvarez",
    ns: "1675051_16",
    marca:
      "REVISTA DEL CARABINERO R PROSPERIDAD MISIÓN CUMPLIDA FED. NAC. DE CARABINEROS DE NOMBRAMIENTO INSTITUCIONAL (R) PERSONERÍA JURÍDICA N°93 AÑO 1996",
    tipoMarca: "M",
    statusName: "Aguardando fin de plazo de observaciones de fondo",
    actionTypeName: "Asignación de responsable para examen de fondo",
    filingDate: "05/06/2026",
    tieneAgente: false,
  },
  {
    rutNum: "6437843",
    name: "AHUMADA ALVAREZ, ANIBAL",
    ns: "1664996_41",
    marca: "ENAD Encuentro Nacional de Administradores de Condominios",
    tipoMarca: "D",
    statusName: "Aguardando fin de plazo de respuesta a oposiciones",
    actionTypeName: "Asignación de expediente contencioso (oposiciones)",
    filingDate: "29/03/2026",
    tieneAgente: false,
  },
  {
    rutNum: "13367990",
    name: "Francisco Javier Gómez Ruiz",
    ns: "1690365_16",
    marca: "THE CHILDREN IN EMMA'S CARE",
    tipoMarca: "D",
    statusName: "Aguardando fin de plazo de docs de prioridad",
    actionTypeName: "Resolución de observaciones de prioridad",
    filingDate: "10/09/2026",
    tieneAgente: false,
  },
  {
    rutNum: "7034345",
    name: "JUAN ESTEBAN SEPÚLVEDA ADRIASOLA",
    ns: "1681391_33",
    marca: "QUIÑANTU",
    tipoMarca: "M",
    statusName: "Para abandonar",
    actionTypeName: "Resolución de observaciones de forma",
    filingDate: "17/07/2026",
    tieneAgente: false,
  },
  {
    rutNum: "6329316",
    name: "Erico Dioscoro Primitivo Rojas Campos",
    ns: "1689484_41",
    marca: "Campeonato mundial del pebre",
    tipoMarca: "D",
    statusName: "Para tener por no presentada por falta de publicación",
    actionTypeName: "(automático) Fin de plazo",
    filingDate: "04/09/2026",
    tieneAgente: false,
  },
  {
    rutNum: "6141533",
    name: "Erwin Hugo Arellano Carvajal",
    ns: "1660105_38",
    marca: "Radio Alpina",
    tipoMarca: "D",
    statusName: "Para abandonar por falta de pago de concesión (marca nueva)",
    actionTypeName: "(automático) Notificación en Estado Diario",
    filingDate: "23/02/2026",
    tieneAgente: false,
  },
];

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const a = parts[0]?.[0] ?? "U";
  const b = parts[1]?.[0] ?? parts[0]?.[1] ?? "U";
  return (a + b).toUpperCase();
}

function emailFromName(name: string, rut: string): string {
  const slug = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z\s]/g, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .join(".");
  return `${slug || "usuario"}.${rut.slice(-4)}@email.cl`;
}

function parseNs(ns: string): { id: string; nizaClass: string } {
  const [id, niza] = ns.split("_");
  return { id, nizaClass: niza || "—" };
}

function marcaLabel(raw: RawTramite): string {
  const name = raw.marca.trim();
  if (name) return name;
  if (raw.tipoMarca === "F") return "Marca figurativa";
  return "Marca";
}

function categoriaLabel(tipoMarca: RawTramite["tipoMarca"]): string {
  if (tipoMarca === "F") return "Marca figurativa";
  if (tipoMarca === "M") return "Marca mixta";
  return "Marca";
}

function toSolicitud(raw: RawTramite): Solicitud {
  const { id, nizaClass } = parseNs(raw.ns);
  const classified = classifyTramite(raw.statusName);
  const nombre = marcaLabel(raw);
  const detalle = buildIpasCopy({
    nombre,
    id,
    statusName: raw.statusName,
    actionTypeName: raw.actionTypeName,
    etapaLabel: classified.etapaLabel,
    userAction: classified.userAction,
    terminal: classified.terminal,
  });

  return {
    id,
    nombre,
    tipo: "marca",
    estado: classified.estado,
    etapa: classified.estado === "FINALIZADA" ? "RESOLUCION" : "EXAMEN",
    urgency: classified.urgency,
    accion: classified.userAction
      ? accionCiudadana(raw.statusName) ?? raw.actionTypeName
      : null,
    estimacion: `Presentada el ${raw.filingDate}`,
    nizaClass,
    categoria: categoriaLabel(raw.tipoMarca),
    solicitante: raw.name,
    representante: raw.tieneAgente ? "Con agente" : "Sin agente",
    tasa: "—",
    etapaLabel: classified.etapaLabel,
    etapaIndex: classified.etapaIndex,
    etapaTerminal: classified.terminal,
    etapaAllCompleted: raw.statusName === "Registrada",
    statusIpas: raw.statusName,
    estadoUnificado: classified.estadoUnificado,
    fechaPresentacion: raw.filingDate,
    notificacion: {
      etapa: classified.etapaLabel,
      requerimiento: classified.userAction
        ? accionCiudadana(raw.statusName) ?? raw.actionTypeName
        : raw.actionTypeName,
      plazo: classified.userAction
        ? "Plazo IPAS vigente: debes resolver esta gestión para que el trámite continúe"
        : "Según expediente IPAS",
      contacto: "inapi@inapi.cl",
    },
    accionRequeridaDetalle: detalle,
  };
}

function toUser(raw: RawTramite): InapiCuenta {
  return {
    rutNum: raw.rutNum,
    password: raw.rutNum.slice(-4),
    name: raw.name,
    email: emailFromName(raw.name, raw.rutNum),
    initials: initialsFromName(raw.name),
  };
}

export const INAPI_CUENTAS: InapiCuenta[] = RAW.map(toUser);

const URGENCY_LOGIN_ORDER: Record<string, number> = {
  danger: 0,
  warning: 1,
  info: 2,
  success: 3,
  neutral: 4,
};

export const INAPI_LOGIN_EJEMPLOS = RAW.map((raw) => {
  const classified = classifyTramite(raw.statusName);
  return {
    rutNum: raw.rutNum,
    password: raw.rutNum.slice(-4),
    marca: marcaLabel(raw),
    statusName: raw.statusName,
    name: raw.name,
    userAction: classified.userAction,
    urgency: classified.urgency,
    accion: classified.userAction ? accionCiudadana(raw.statusName) : null,
  };
}).sort((a, b) => {
  const au = URGENCY_LOGIN_ORDER[a.urgency] ?? 9;
  const bu = URGENCY_LOGIN_ORDER[b.urgency] ?? 9;
  if (au !== bu) return au - bu;
  return a.marca.localeCompare(b.marca, "es");
});

export const INAPI_TRAMITES_BY_RUT: Record<string, Solicitud[]> = RAW.reduce(
  (acc, raw) => {
    const list = acc[raw.rutNum] ?? [];
    list.push(toSolicitud(raw));
    acc[raw.rutNum] = list;
    return acc;
  },
  {} as Record<string, Solicitud[]>
);

export const INAPI_TRAMITES: Solicitud[] = Object.values(
  INAPI_TRAMITES_BY_RUT
).flat();

export function findInapiCuenta(rutClean: string): InapiCuenta | undefined {
  const digits = rutClean.replace(/[^\d]/g, "");
  return INAPI_CUENTAS.find((c) => c.rutNum === digits);
}

export function isInapiRutNum(rutClean: string): boolean {
  return Boolean(findInapiCuenta(rutClean));
}

export function getTramitesByRut(rutNum: string): Solicitud[] {
  return INAPI_TRAMITES_BY_RUT[rutNum] ?? [];
}

export function getInapiUser(rutNum: string): User | undefined {
  const cuenta = findInapiCuenta(rutNum);
  if (!cuenta) return undefined;
  return {
    name: cuenta.name,
    rut: cuenta.rutNum,
    email: cuenta.email,
    initials: cuenta.initials,
  };
}

export function notificacionesFromTramites(tramites: Solicitud[]): Notification[] {
  return tramites.map((s, i) => ({
    id: `n-${s.id}`,
    tipo:
      s.urgency === "success"
        ? "FINALIZADA"
        : s.urgency === "warning" || s.urgency === "danger"
          ? "ACCION_REQUERIDA"
          : s.urgency === "neutral"
            ? "FINALIZADA"
            : "CAMBIO_ESTADO",
    urgency: s.urgency,
    titulo:
      s.estadoUnificado === "Registrada"
        ? `Estado IPAS: Registrada — ${s.nombre}`
        : s.statusIpas
          ? `Estado IPAS: ${s.statusIpas}`
          : s.etapaLabel ?? s.nombre,
    cuerpo:
      s.accionRequeridaDetalle?.explicacionClara ??
      (s.statusIpas
        ? `Estado IPAS: ${s.statusIpas}. Última acción: «${s.accion ?? "—"}».`
        : s.nombre),
    tiempo: i === 0 ? "Hace 1d" : "Hace 2d",
    solicitudId: s.id,
    cta: null,
    detalle: s.notificacion,
  }));
}
