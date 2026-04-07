// Mock data — Trámites
// Ordenados por urgencia: danger → warning → info → success

export type TramiteStatus = "danger" | "warning" | "info" | "success";
export type TramiteCategoria = "marca" | "patente" | "diseno";
export type StepState = "completed" | "current" | "pending";

export interface Tramite {
  id: string;
  numero: string;
  nombre: string;
  categoria: TramiteCategoria;
  status: TramiteStatus;
  statusLabel: string;
  etapaActual: number; // 0: INGRESO, 1: EXAMEN, 2: RESOLUCIÓN
  stepStates: StepState[];
  accionRequerida?: string;
  ctaLabel?: string;
  ctaType?: "adjuntar" | "pago" | "confirmar" | "informativo";
  estimacion: string;
  notificacionId?: string;
}

export const tramitesMock: Tramite[] = [
  {
    id: "t1",
    numero: "2023-00451",
    nombre: "Eco-Tech Solutions",
    categoria: "marca",
    status: "danger",
    statusLabel: "ACCIÓN REQUERIDA",
    etapaActual: 1,
    stepStates: ["completed", "current", "pending"],
    accionRequerida: "Próximo paso requerido: adjunte documento de Poder notariado.",
    ctaLabel: "Ir a la notificación →",
    ctaType: "adjuntar",
    estimacion: "4 meses restantes",
    notificacionId: "n1",
  },
  {
    id: "t2",
    numero: "2023-00712",
    nombre: "FarmaTech Chile",
    categoria: "marca",
    status: "warning",
    statusLabel: "PRÓXIMO VENCIMIENTO",
    etapaActual: 1,
    stepStates: ["completed", "current", "pending"],
    accionRequerida: "Tu registro vence en 30 días. Inicia la renovación pronto.",
    ctaLabel: "Iniciar Renovación →",
    ctaType: "confirmar",
    estimacion: "30 días para vencer",
    notificacionId: "n2",
  },
  {
    id: "t3",
    numero: "2023-00589",
    nombre: "Aura Cosmetics",
    categoria: "marca",
    status: "info",
    statusLabel: "PUBLICADA",
    etapaActual: 2,
    stepStates: ["completed", "completed", "current"],
    accionRequerida: "Esperando fin del periodo de oposición (30 días).",
    ctaLabel: undefined,
    ctaType: "informativo",
    estimacion: "8 meses restantes",
  },
  {
    id: "t4",
    numero: "2024-00102",
    nombre: "NeoGraphix Design",
    categoria: "marca",
    status: "success",
    statusLabel: "INGRESO EXITOSO",
    etapaActual: 0,
    stepStates: ["completed", "pending", "pending"],
    estimacion: "Finalizado",
  },
  // Patentes
  {
    id: "t5",
    numero: "2022-00567",
    nombre: "Sistema Filtrado EcoPure",
    categoria: "patente",
    status: "danger",
    statusLabel: "ACCIÓN REQUERIDA",
    etapaActual: 1,
    stepStates: ["completed", "current", "pending"],
    accionRequerida: "Se requiere respuesta al Examen de Fondo antes del 20 de abril.",
    ctaLabel: "Adjuntar respuesta →",
    ctaType: "adjuntar",
    estimacion: "12 meses restantes",
    notificacionId: "n3",
  },
  {
    id: "t6",
    numero: "2023-00890",
    nombre: "Motor Híbrido V2",
    categoria: "patente",
    status: "info",
    statusLabel: "EN REVISIÓN",
    etapaActual: 1,
    stepStates: ["completed", "current", "pending"],
    estimacion: "18 meses restantes",
  },
];

export const getTramitesByCategoria = (categoria: TramiteCategoria) =>
  tramitesMock.filter((t) => t.categoria === categoria);

export const getSummary = (categoria: TramiteCategoria) => {
  const tramites = getTramitesByCategoria(categoria);
  return {
    enProceso: tramites.filter((t) => t.status === "info" || t.status === "warning").length,
    accionRequerida: tramites.filter((t) => t.status === "danger").length,
    finalizadas: tramites.filter((t) => t.status === "success").length,
  };
};
