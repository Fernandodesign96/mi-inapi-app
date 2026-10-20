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
  accionRequerida: 1,
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
    estadoUnificado: "En trámite",
    statusIpas: "Aguardando fin de plazo de observaciones de forma",
    etapaIndex: 1,
    etapaLabel: "Revisión de requisitos (Examen de Forma)",
    notificacion: { 
      etapa: "Revisión de requisitos (Examen de Forma)", 
      requerimiento: "Resolución de observaciones de forma", 
      plazo: "Según expediente IPAS", 
      contacto: "forma@inapi.cl" 
    },
    accionRequeridaDetalle: {
      explicacionClara:
        "Estado IPAS: Aguardando fin de plazo de observaciones de forma. INAPI verifica que la solicitud cumpla los requisitos legales y formales. Última acción registrada: «Resolución de observaciones de forma». Esta gestión se realiza en los canales oficiales de INAPI, no dentro de MiINAPI.",
      consecuencia:
        "Si el plazo del estado IPAS vence sin la gestión correspondiente, el expediente puede no avanzar o abandonarse, según la normativa aplicable a este estado.",
      pasos: [
        "Revisa el estado «Aguardando fin de plazo de observaciones de forma» y la acción «Resolución de observaciones de forma» en el expediente.",
        "Sigue las instrucciones del oficio o de la notificación oficial de INAPI.",
        "Presenta la gestión en los canales oficiales (portal INAPI, correo o ventanilla indicados en el oficio).",
      ],
      canalPresentacion:
        "Canales oficiales de INAPI según el oficio o la notificación del expediente.",
      referencia:
        "Etapa MiINAPI: Revisión de requisitos (Examen de Forma) · Estado IPAS: Aguardando fin de plazo de observaciones de forma",
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
    estadoUnificado: "En trámite",
    statusIpas: "Aguardando fin de plazo de observaciones de fondo",
    etapaIndex: 4,
    etapaLabel: "Revisión legal y de fondo (Examen de Fondo)",
    notificacion: {
      etapa: "Revisión legal y de fondo (Examen de Fondo)",
      requerimiento: "Resolución de observaciones de fondo",
      plazo: "Según expediente IPAS",
      contacto: "examenes@inapi.cl",
    },
    accionRequeridaDetalle: {
      explicacionClara:
        "Estado IPAS: Aguardando fin de plazo de observaciones de fondo. Se le ha asignado un especialista de INAPI, quien evalúa si su marca cumple con la ley para ser registrada. Última acción registrada: «Resolución de observaciones de fondo». Esta gestión se realiza en los canales oficiales de INAPI, no dentro de MiINAPI.",
      consecuencia:
        "Si el plazo del estado IPAS vence sin la gestión correspondiente, el expediente puede no avanzar, según la normativa aplicable a este estado.",
      pasos: [
        "Revisa el estado «Aguardando fin de plazo de observaciones de fondo» y la acción «Resolución de observaciones de fondo» en el expediente.",
        "Sigue las instrucciones del oficio o de la notificación oficial de INAPI.",
        "Presenta la gestión en los canales oficiales de INAPI.",
      ],
      canalPresentacion:
        "Canales oficiales de INAPI según el oficio o la notificación del expediente.",
      referencia:
        "Etapa MiINAPI: Revisión legal y de fondo (Examen de Fondo) · Estado IPAS: Aguardando fin de plazo de observaciones de fondo",
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
    estadoUnificado: "En trámite",
    statusIpas: "En examen de fondo",
    etapaIndex: 4,
    etapaLabel: "Revisión legal y de fondo (Examen de Fondo)",
    notificacion: {
      etapa: "Revisión legal y de fondo (Examen de Fondo)",
      requerimiento: "Sin gestión pendiente de tu parte",
      plazo: "Según expediente IPAS",
      contacto: "examenes@inapi.cl",
    },
    accionRequeridaDetalle: {
      explicacionClara:
        "Estado IPAS: En examen de fondo. Se le ha asignado un especialista de INAPI, quien evalúa si su marca cumple con la ley para ser registrada. Última acción registrada: «Asignación de responsable para examen de fondo». INAPI continúa el expediente; no hay una gestión ciudadana pendiente en MiINAPI.",
      pasos: [
        "La solicitud permanece en «En examen de fondo».",
        "Te avisaremos en MiINAPI si el estado cambia o si INAPI requiere una gestión posterior.",
      ],
      referencia:
        "Etapa MiINAPI: Revisión legal y de fondo (Examen de Fondo) · Estado IPAS: En examen de fondo",
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
    estadoUnificado: "En trámite",
    statusIpas: "Aguardando fin de plazo de pago de publicación al Diario Oficial",
    etapaIndex: 2,
    etapaLabel: "Publicación en Diario Oficial y plazo de oposiciones",
    notificacion: {
      etapa: "Publicación en Diario Oficial y plazo de oposiciones",
      requerimiento: "Resolución de aceptación a trámite de marca",
      plazo: "Según expediente IPAS",
      contacto: "publicaciones@inapi.cl",
    },
    accionRequeridaDetalle: {
      explicacionClara:
        "Estado IPAS: Aguardando fin de plazo de pago de publicación al Diario Oficial. Su marca se publica en el Diario Oficial y terceros pueden oponerse dentro de un plazo. Última acción registrada: «Resolución de aceptación a trámite de marca». Esta gestión se realiza en los canales oficiales de INAPI, no dentro de MiINAPI.",
      consecuencia:
        "Si el plazo del estado IPAS vence sin el pago de publicación, la solicitud puede tenerse por no presentada por falta de publicación.",
      pasos: [
        "Revisa el estado «Aguardando fin de plazo de pago de publicación al Diario Oficial».",
        "Sigue las instrucciones del oficio de aceptación a trámite de marca.",
        "Efectúa el pago por los medios habilitados por INAPI, no desde esta aplicación.",
      ],
      canalPresentacion:
        "Medios de pago y canales oficiales indicados en el oficio de INAPI.",
      referencia:
        "Etapa MiINAPI: Publicación en Diario Oficial y plazo de oposiciones · Estado IPAS: Aguardando fin de plazo de pago de publicación al Diario Oficial",
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
    etapaLabel: "Pago y registro",
    notificacion: {
      etapa: "Pago y registro",
      requerimiento: "Trámite concluido — marca vigente",
      plazo: "Renovación según plazo legal del registro",
      contacto: "renovaciones@inapi.cl",
    },
    accionRequeridaDetalle: {
      explicacionClara:
        "Estado IPAS: Registrada. La marca Terra Verde SPA (solicitud 1659012) obtuvo registro. Última acción registrada: «Para emitir título».",
      pasos: [
        "El trámite concluyó con el registro de la marca.",
        "Puedes consultar el PDF del registro desde MiINAPI.",
        "Otras gestiones se realizan en los canales oficiales de INAPI.",
      ],
      referencia: "Etapa MiINAPI: Pago y registro · Estado IPAS: Registrada",
    },
  }
];

export const mockNotificacionesUrgent: Notification[] = [
  { 
    id: "n-eco", 
    tipo: "ACCION_REQUERIDA", 
    urgency: "danger", 
    titulo: "Estado IPAS: observaciones de forma para Eco-Tech Solutions", 
    cuerpo: "Estado IPAS: Aguardando fin de plazo de observaciones de forma. Última acción: «Resolución de observaciones de forma». Esta gestión se realiza en los canales oficiales de INAPI, no dentro de MiINAPI.", 
    tiempo: "Hace 2h", 
    solicitudId: "1612458",
    cta: null,
    detalle: {
      etapa: "Revisión de requisitos (Examen de Forma)",
      requerimiento: "Resolución de observaciones de forma",
      plazo: "Según expediente IPAS",
      contacto: "forma@inapi.cl"
    } 
  },
  { 
    id: "n-farma", 
    tipo: "ACCION_REQUERIDA", 
    urgency: "warning", 
    titulo: "Estado IPAS: observaciones de fondo para FarmaTech Chile", 
    cuerpo: "Estado IPAS: Aguardando fin de plazo de observaciones de fondo. Última acción: «Resolución de observaciones de fondo». Esta gestión se realiza en los canales oficiales de INAPI, no dentro de MiINAPI.", 
    tiempo: "Hace 1d", 
    solicitudId: "1623891",
    cta: null,
  },
  { 
    id: "n-neo", 
    tipo: "ACCION_REQUERIDA", 
    urgency: "danger", 
    titulo: "Estado IPAS: pago de publicación para NeoGraphix Design", 
    cuerpo: "Estado IPAS: Aguardando fin de plazo de pago de publicación al Diario Oficial. Última acción: «Resolución de aceptación a trámite de marca». El pago se realiza en los canales oficiales de INAPI, no dentro de MiINAPI.", 
    tiempo: "Hace 3h",
    solicitudId: "1647823",
    cta: null,
    detalle: {
      etapa: "Publicación en Diario Oficial y plazo de oposiciones",
      requerimiento: "Resolución de aceptación a trámite de marca",
      plazo: "Según expediente IPAS",
      contacto: "publicaciones@inapi.cl",
    },
  },
  { 
    id: "n-aura", 
    tipo: "CAMBIO_ESTADO", 
    urgency: "info", 
    titulo: "Estado IPAS: En examen de fondo", 
    cuerpo: "La solicitud Aura Cosmetics permanece en «En examen de fondo». INAPI continúa el expediente; no hay una gestión ciudadana pendiente en MiINAPI.", 
    tiempo: "Hace 2d", 
    solicitudId: "1634567",
    cta: null 
  },
  { 
    id: "n-terra", 
    tipo: "FINALIZADA", 
    urgency: "success", 
    titulo: "Estado IPAS: Registrada — Terra Verde SPA", 
    cuerpo: "Estado IPAS: Registrada. La marca Terra Verde SPA (solicitud 1659012) obtuvo registro.", 
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

const trm004NeoGraphix = mockTramitesUrgent.find((s) => s.id === "1647823");

if (trm004NeoGraphix) {
  mockTramitesNoUrgent.push({ ...trm004NeoGraphix });
}

mockNotificacionesNoUrgent.push({
  id: "notif-neo",
  tipo: "ACCION_REQUERIDA",
  urgency: "danger",
  titulo: "Estado IPAS: pago de publicación para NeoGraphix Design",
  cuerpo:
    "Estado IPAS: Aguardando fin de plazo de pago de publicación al Diario Oficial. Última acción: «Resolución de aceptación a trámite de marca». El pago se realiza en los canales oficiales de INAPI, no dentro de MiINAPI.",
  tiempo: "Hace 1 día",
  solicitudId: "1647823",
  cta: null,
  detalle: {
    etapa: "Publicación en Diario Oficial y plazo de oposiciones",
    requerimiento: "Resolución de aceptación a trámite de marca",
    plazo: "Según expediente IPAS",
    contacto: "publicaciones@inapi.cl",
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


