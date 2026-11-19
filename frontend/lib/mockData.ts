import { INAPI_TRAMITES } from "./datosReales";

export interface User {
  name: string;
  rut: string;
  email: string;
  initials: string;
}

export interface Notification {
  id: string;
  tipo: "ACCION_REQUERIDA" | "CADUCIDAD" | "RENOVACION" | "CAMBIO_ESTADO" | "FINALIZADA";
  urgency: "danger" | "warning" | "info" | "success" | "neutral";
  titulo: string;
  cuerpo: string;
  tiempo: string;
  solicitudId?: string;
  cta: string | null;
  detalle?: {
    etapa: string;
    requerimiento: string;
    plazo: string;
    contacto: string;
  };
}

export interface Solicitud {
  id: string;
  nombre: string;
  tipo: "marca" | "patente" | "diseño";
  estado: "INGRESO" | "CORRECCION_FORMA" | "PUBLICACION" | "OPOSICION" | "EXAMEN_FONDO" | "ACEPTACION" | "FINALIZADA" | "ACCION_REQUERIDA" | "EN_REVISION";
  etapa: "INGRESO" | "EXAMEN" | "RESOLUCION";
  urgency: "danger" | "warning" | "info" | "success" | "neutral";
  accion: string | null;
  estimacion: string;
  diasRestantes?: number; // Propiedad nueva de urgencia estricta para el Stepper
  // Campos para pantalla de detalle unificada (info de notificación oficial)
  nizaClass?: string;
  categoria?: string;
  solicitante?: string;
  representante?: string;
  tasa?: string;
  etapaLabel?: string;
  etapaIndex?: number;
  etapaTerminal?: string;
  etapaAllCompleted?: boolean;
  statusIpas?: string;
  estadoUnificado?: string;
  fechaPresentacion?: string;
  notificacion?: {
    etapa: string;
    requerimiento: string;
    plazo: string;
    contacto: string;
  };
  /** Detalle ampliado para la sección ACCIÓN REQUERIDA en pantalla de solicitud (Fase 1). */
  accionRequeridaDetalle?: {
    explicacionClara: string;
    consecuencia?: string;
    documentos?: string[];
    pasos?: string[];
    canalPresentacion?: string;
    referencia?: string;
  };
}

export const mockUser: User = {
  name: "Juan Díaz",
  rut: "12.345.678-9",
  email: "juan.diaz@email.cl",
  initials: "JD"
};

// ============================================
// DATOS ESTADO "NO-URGENT" (SOLO 1 SOLICITUD)
// ============================================

/** Perfil con una sola solicitud: mismo trámite y urgencia que en el set «urgent». */
export const mockTramitesNoUrgent: Solicitud[] = [];

export const mockNotificacionesNoUrgent: Notification[] = [];

export const mockSummaryNoUrgent = {
  enProceso: 1,
  accionRequerida: 0,
  finalizadas: 0,
};


// ============================================
// DATOS ESTADO "URGENT" (5 SOLICITUDES, 2 REQUERIDAS)
// ============================================

export const mockTramitesUrgent: Solicitud[] = [
  {
    id: "1612458",
    nombre: "Eco-Tech Solutions",
    tipo: "marca",
    estado: "ACCION_REQUERIDA",
    etapa: "EXAMEN",
    urgency: "danger",
    accion: "Resolución de observaciones de forma",
    estimacion: "Faltan documentos",
    diasRestantes: 5,
    nizaClass: "9",
    solicitante: "Juan Díaz",
    representante: "Juan Díaz",
    tasa: "2 UTM",
    fechaPresentacion: "10/03/2026",
    estadoUnificado: "En Trámite",
    statusIpas: "Aguardando fin de plazo de observaciones de forma",
    etapaIndex: 1,
    etapaLabel: "2.1 Esperando respuesta a observaciones de forma",
    notificacion: { 
      etapa: "2.1 Esperando respuesta a observaciones de forma", 
      requerimiento: "Resolución de observaciones de forma", 
      plazo: "Según el plazo del expediente", 
      contacto: "forma@inapi.cl" 
    },
    accionRequeridaDetalle: {
      explicacionClara:
        "Responder observaciones de forma y adjuntar antecedentes",
      consecuencia:
        "Si el plazo de observaciones de forma vence sin respuesta, el expediente puede abandonarse o no avanzar a publicación.",
      pasos: [
        "Lee el oficio de observaciones de forma y anota cada punto a subsanar.",
        "Prepara el escrito de respuesta y los documentos pedidos.",
        "Preséntalos en los canales oficiales de INAPI dentro del plazo.",
      ],
      canalPresentacion:
        "Canales oficiales de INAPI según el oficio o la notificación del expediente.",
      referencia:
        "Revisión de requisitos (Examen de Forma). Esperando respuesta a observaciones de forma",
    },
  },
  {
    id: "1623891",
    nombre: "FarmaTech Chile",
    tipo: "marca",
    estado: "ACCION_REQUERIDA", 
    etapa: "EXAMEN",
    urgency: "warning",
    accion: "Resolución de observaciones de fondo",
    estimacion: "2 semanas restantes",
    diasRestantes: 14,
    nizaClass: "5",
    solicitante: "Juan Díaz",
    representante: "Juan Díaz",
    tasa: "2 UTM",
    fechaPresentacion: "22/01/2026",
    estadoUnificado: "En Trámite",
    statusIpas: "Aguardando fin de plazo de observaciones de fondo",
    etapaIndex: 3,
    etapaLabel: "4.1 Esperando respuesta a observaciones de fondo",
    notificacion: {
      etapa: "4.1 Esperando respuesta a observaciones de fondo",
      requerimiento: "Resolución de observaciones de fondo",
      plazo: "Según el plazo del expediente",
      contacto: "examenes@inapi.cl",
    },
    accionRequeridaDetalle: {
      explicacionClara:
        "Responder observaciones de fondo y adjuntar antecedentes",
      consecuencia:
        "Si el plazo de observaciones de fondo vence sin respuesta, el expediente puede no continuar hacia el registro.",
      pasos: [
        "Lee el oficio de observaciones de fondo.",
        "Prepara la respuesta y los antecedentes de respaldo.",
        "Preséntalos en los canales oficiales de INAPI dentro del plazo.",
      ],
      canalPresentacion:
        "Canales oficiales de INAPI según el oficio o la notificación del expediente.",
      referencia:
        "Revisión legal y de fondo (Examen de Fondo). Esperando respuesta a observaciones de fondo",
    },
  },
  {
    id: "1634567",
    nombre: "Aura Cosmetics",
    tipo: "marca",
    estado: "EN_REVISION",
    etapa: "RESOLUCION",
    urgency: "info",
    accion: null,
    estimacion: "8 meses restantes",
    nizaClass: "3",
    solicitante: "Juan Díaz",
    representante: "Juan Díaz",
    tasa: "3 UTM",
    fechaPresentacion: "04/11/2025",
    estadoUnificado: "En Trámite",
    statusIpas: "En examen de fondo",
    etapaIndex: 3,
    etapaLabel: "4. Revisión legal y de fondo (Examen de Fondo)",
    notificacion: {
      etapa: "4. Revisión legal y de fondo (Examen de Fondo)",
      requerimiento: "Sin gestión pendiente de tu parte",
      plazo: "Según el plazo del expediente",
      contacto: "examenes@inapi.cl",
    },
    accionRequeridaDetalle: {
      explicacionClara:
        "INAPI continúa el examen de fondo; no hay una gestión pendiente de tu parte.",
      pasos: [
        "INAPI continúa revisando el expediente.",
        "Te avisaremos en MiINAPI si el estado cambia o si se requiere una gestión posterior.",
      ],
      referencia: "Revisión legal y de fondo (Examen de Fondo)",
    },
  },
  {
    id: "1647823",
    nombre: "NeoGraphix Design",
    tipo: "marca",
    estado: "PUBLICACION",
    etapa: "EXAMEN",
    urgency: "danger",
    accion: "Resolución de aceptación a trámite de marca",
    estimacion: "Pagar Diario Oficial",
    diasRestantes: 2,
    nizaClass: "35",
    solicitante: "Juan Díaz",
    representante: "Juan Díaz",
    tasa: "3 UTM",
    fechaPresentacion: "18/02/2026",
    estadoUnificado: "En Trámite",
    statusIpas: "Aguardando fin de plazo de pago de publicación al Diario Oficial",
    etapaIndex: 2,
    etapaLabel: "3.1 A la espera del pago en el Diario Oficial",
    notificacion: {
      etapa: "3.1 A la espera del pago en el Diario Oficial",
      requerimiento: "Resolución de aceptación a trámite de marca",
      plazo: "Según el plazo del expediente",
      contacto: "publicaciones@inapi.cl",
    },
    accionRequeridaDetalle: {
      explicacionClara: "Pagar publicación en el Diario Oficial",
      consecuencia:
        "Si el plazo vence sin el pago de publicación, la solicitud puede tenerse por no presentada por falta de publicación.",
      pasos: [
        "Revisa el oficio de aceptación a trámite y las instrucciones de pago de publicación en el Diario Oficial.",
        "Efectúa el pago por los medios habilitados por INAPI, no desde esta aplicación.",
        "Conserva el comprobante para el seguimiento del expediente.",
      ],
      canalPresentacion:
        "Medios de pago y canales oficiales indicados en el oficio de INAPI.",
      referencia:
        "Publicación en Diario Oficial y plazo de oposiciones. A la espera del pago en el Diario Oficial",
    },
  },
  {
    id: "1659012",
    nombre: "Terra Verde SPA",
    tipo: "marca",
    estado: "FINALIZADA",
    etapa: "RESOLUCION",
    urgency: "success",
    accion: null,
    estimacion: "Registrada",
    nizaClass: "43",
    solicitante: "Juan Díaz",
    representante: "Juan Díaz",
    tasa: "3 UTM",
    fechaPresentacion: "15/03/2025",
    estadoUnificado: "Registrada",
    statusIpas: "Registrada",
    etapaIndex: 6,
    etapaAllCompleted: true,
    etapaLabel: "8.- Solicitud Registrada",
    notificacion: {
      etapa: "8.- Solicitud Registrada",
      requerimiento: "Trámite concluido — marca vigente",
      plazo: "Renovación según plazo legal del registro",
      contacto: "renovaciones@inapi.cl",
    },
    accionRequeridaDetalle: {
      explicacionClara: "La marca Terra Verde SPA obtuvo registro.",
      pasos: [
        "El trámite concluyó con el registro de la marca.",
        "Puedes consultar el PDF del registro desde MiINAPI.",
        "Otras gestiones se realizan en los canales oficiales de INAPI.",
      ],
      referencia: "Solicitud Registrada",
    },
  }
];

export const mockNotificacionesUrgent: Notification[] = [
  { 
    id: "n-eco", 
    tipo: "ACCION_REQUERIDA", 
    urgency: "danger", 
    titulo: "Eco-Tech Solutions", 
    cuerpo: "Esperando respuesta a observaciones de forma", 
    tiempo: "Hace 2h", 
    solicitudId: "1612458",
    cta: null,
    detalle: {
      etapa: "2.1 Esperando respuesta a observaciones de forma",
      requerimiento: "Resolución de observaciones de forma",
      plazo: "Según el plazo del expediente",
      contacto: "forma@inapi.cl"
    } 
  },
  { 
    id: "n-farma", 
    tipo: "ACCION_REQUERIDA", 
    urgency: "warning", 
    titulo: "FarmaTech Chile", 
    cuerpo: "Esperando respuesta a observaciones de fondo", 
    tiempo: "Hace 1d", 
    solicitudId: "1623891",
    cta: null,
  },
  { 
    id: "n-neo", 
    tipo: "ACCION_REQUERIDA", 
    urgency: "danger", 
    titulo: "NeoGraphix Design", 
    cuerpo: "A la espera del pago en el Diario Oficial", 
    tiempo: "Hace 3h",
    solicitudId: "1647823",
    cta: null,
    detalle: {
      etapa: "3.1 A la espera del pago en el Diario Oficial",
      requerimiento: "Resolución de aceptación a trámite de marca",
      plazo: "Según el plazo del expediente",
      contacto: "publicaciones@inapi.cl",
    },
  },
  { 
    id: "n-aura", 
    tipo: "CAMBIO_ESTADO", 
    urgency: "info", 
    titulo: "Aura Cosmetics", 
    cuerpo: "Revisión legal y de fondo (Examen de Fondo)", 
    tiempo: "Hace 2d", 
    solicitudId: "1634567",
    cta: null 
  },
  { 
    id: "n-terra", 
    tipo: "FINALIZADA", 
    urgency: "success", 
    titulo: "Terra Verde SPA", 
    cuerpo: "Solicitud Registrada", 
    tiempo: "Hace 4d", 
    solicitudId: "1659012",
    cta: null,
  }
];

export const mockSummaryUrgent = {
  enProceso: 4,
  accionRequerida: 2,
  finalizadas: 1,
};

mockTramitesNoUrgent.push({
  id: "1701101",
  nombre: "NeoGraphix Design",
  tipo: "marca",
  estado: "EN_REVISION",
  etapa: "EXAMEN",
  urgency: "info",
  accion: null,
  estimacion: "En revisión de requisitos",
  nizaClass: "35",
  solicitante: "Juan Díaz",
  representante: "Juan Díaz",
  tasa: "3 UTM",
  fechaPresentacion: "18/02/2026",
  estadoUnificado: "En Trámite",
  statusIpas: "En examen de forma",
  etapaIndex: 1,
  etapaLabel: "2. Revisión de requisitos (Examen de Forma)",
  notificacion: {
    etapa: "2. Revisión de requisitos (Examen de Forma)",
    requerimiento: "Sin gestión pendiente de tu parte",
    plazo: "Según expediente IPAS",
    contacto: "forma@inapi.cl",
  },
  accionRequeridaDetalle: {
    explicacionClara:
      "INAPI verifica los requisitos formales; no hay una gestión pendiente de tu parte.",
    pasos: [
      "La solicitud permanece en examen de forma.",
      "Te avisaremos en MiINAPI si el estado cambia o si se requiere una gestión posterior.",
    ],
    referencia: "Revisión de requisitos (Examen de Forma)",
  },
});

mockNotificacionesNoUrgent.push({
  id: "notif-neo",
  tipo: "CAMBIO_ESTADO",
  urgency: "info",
  titulo: "NeoGraphix Design",
  cuerpo: "Revisión de requisitos (Examen de Forma)",
  tiempo: "Hace 1 día",
  solicitudId: "1701101",
  cta: null,
  detalle: {
    etapa: "2. Revisión de requisitos (Examen de Forma)",
    requerimiento: "Sin gestión pendiente de tu parte",
    plazo: "Según expediente IPAS",
    contacto: "forma@inapi.cl",
  },
});

/** Busca solicitud en todos los conjuntos mock (misma definición por id). */
export function getSolicitudById(id: string): Solicitud | undefined {
  return (
    mockTramitesUrgent.find((s) => s.id === id) ??
    mockTramitesNoUrgent.find((s) => s.id === id) ??
    INAPI_TRAMITES.find((s) => s.id === id)
  );
}

export const mockSolicitudes = mockTramitesUrgent;
export const mockNotificaciones = mockNotificacionesUrgent;


