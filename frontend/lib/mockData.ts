export interface User {
  name: string;
  rut: string;
  email: string;
  initials: string;
}

export interface Notification {
  id: string;
  tipo: "ACCION_REQUERIDA" | "CADUCIDAD" | "RENOVACION" | "CAMBIO_ESTADO" | "FINALIZADA";
  urgency: "danger" | "warning" | "info" | "success";
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
  urgency: "danger" | "warning" | "info" | "success";
  accion: string | null;
  estimacion: string;
  diasRestantes?: number; // Propiedad nueva de urgencia estricta para el Stepper
  // Campos para pantalla de detalle unificada (info de notificación oficial)
  nizaClass?: string;
  solicitante?: string;
  representante?: string;
  tasa?: string;
  etapaLabel?: string;
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
    id: "trm-001",
    nombre: "Eco-Tech Solutions",
    tipo: "marca",
    estado: "ACCION_REQUERIDA",
    etapa: "EXAMEN",
    urgency: "danger",
    accion: "Adjuntar documento de Poder notariado",
    estimacion: "Faltan documentos",
    diasRestantes: 5,
    nizaClass: "9",
    solicitante: "Juan Díaz",
    representante: "Juan Díaz",
    tasa: "2 UTM",
    etapaLabel: "Observación de Forma",
    notificacion: { 
      etapa: "Observación de Forma", 
      requerimiento: "Adjuntar Poder Notariado", 
      plazo: "18 de abril, 2026", 
      contacto: "forma@inapi.cl" 
    },
    accionRequeridaDetalle: {
      explicacionClara:
        "INAPI emitió una observación de forma: debes adjuntar un poder notariado que acredite la representación del solicitante antes de que el examinador pueda continuar con tu solicitud de marca Eco-Tech Solutions.",
      consecuencia:
        "Si no presentas el documento dentro del plazo, la solicitud podría quedar sin efecto o requerir una reposición con costos adicionales.",
      documentos: [
        "Poder notarial vigente (original o copia autorizada ante notario)",
        "Identificación del apoderado y del titular",
        "Formulario de respuesta a observación de forma (si aplica)",
      ],
      pasos: [
        "Revisa el correo oficial o la notificación en MiINAPI con el detalle de la observación.",
        "Prepara el poder notariado con las facultades necesarias para actuar ante INAPI.",
        "Envía el antecedente al correo forma@inapi.cl indicando el N° de solicitud trm-001 en el asunto.",
        "Conserva el comprobante de envío hasta recibir acuse de recepción.",
      ],
      canalPresentacion:
        "Correo electrónico forma@inapi.cl o ventanilla/documentos según instrucciones del oficio.",
      referencia: "Observación de forma — Examen de forma (Ley 19.039, reglamento INAPI).",
    },
  },
  {
    id: "trm-002",
    nombre: "FarmaTech Chile",
    tipo: "marca",
    estado: "ACCION_REQUERIDA", 
    etapa: "EXAMEN",
    urgency: "warning",
    accion: "Corregir descripción de clase de productos",
    estimacion: "2 semanas restantes",
    diasRestantes: 14,
    nizaClass: "5",
    solicitante: "Juan Díaz",
    representante: "Juan Díaz",
    tasa: "2 UTM",
    etapaLabel: "Corrección de Fondo",
    notificacion: {
      etapa: "Corrección de Fondo",
      requerimiento: "Corregir descripción de productos Clase 5",
      plazo: "2 de mayo, 2026",
      contacto: "examenes@inapi.cl",
    },
    accionRequeridaDetalle: {
      explicacionClara:
        "El examinador de fondo determinó que la descripción de productos de la Clase 5 de Niza es demasiado genérica. Debes precisar qué productos farmacéuticos o preparaciones médicas deseas proteger bajo la marca FarmaTech Chile.",
      consecuencia:
        "Sin la corrección, la solicitud no podrá avanzar a publicación y podrías perder prioridad de fecha de presentación.",
      documentos: [
        "Nueva redacción de la descripción de productos/servicios (Clase 5)",
        "Listado detallado y específico (evitar términos amplios como «productos químicos»)",
      ],
      pasos: [
        "Descarga el oficio de observación desde tu correo o solicita copia a examenes@inapi.cl.",
        "Redacta una descripción específica (ej.: «preparaciones farmacéuticas para uso veterinario en…»).",
        "Envía la corrección por el canal indicado en el oficio, citando solicitud trm-002.",
        "Espera confirmación de recepción antes del 2 de mayo de 2026.",
      ],
      canalPresentacion: "examenes@inapi.cl — asunto: Corrección fondo trm-002",
      referencia: "Observación de fondo — Examen de fondo, Clase 5 Niza.",
    },
  },
  {
    id: "trm-003",
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
    etapaLabel: "Examen de Fondo",
    notificacion: {
      etapa: "Examen de Fondo",
      requerimiento: "Sin gestión pendiente de tu parte",
      plazo: "Tiempo estimado de resolución: variable según complejidad",
      contacto: "examenes@inapi.cl",
    },
    accionRequeridaDetalle: {
      explicacionClara:
        "INAPI está analizando si tu marca Aura Cosmetics cumple los requisitos legales de fondo (distintividad, prohibiciones, similitudes con marcas previas). No debes realizar ninguna acción en este momento; te avisaremos si se requiere antecedente adicional.",
      pasos: [
        "El equipo de examen de fondo revisa antecedentes y bases de datos de marcas.",
        "Si no hay observaciones, el trámite avanza a resolución o etapas posteriores.",
        "Recibirás una notificación en MiINAPI ante cualquier cambio de estado.",
      ],
      referencia: "Examen de fondo — Ley 19.039 sobre Propiedad Industrial.",
    },
  },
  {
    id: "trm-004",
    nombre: "NeoGraphix Design",
    tipo: "marca",
    estado: "PUBLICACION",
    etapa: "EXAMEN",
    urgency: "danger",
    accion: "Pagar publicación",
    estimacion: "Pagar Diario Oficial",
    diasRestantes: 2,
    nizaClass: "35",
    solicitante: "Juan Díaz",
    representante: "Juan Díaz",
    tasa: "3 UTM",
    etapaLabel: "Publicación en Diario Oficial",
    notificacion: {
      etapa: "Publicación en Diario Oficial",
      requerimiento: "Efectuar pago de publicación",
      plazo: "5 días hábiles desde la notificación",
      contacto: "publicaciones@inapi.cl",
    },
    accionRequeridaDetalle: {
      explicacionClara:
        "Tu marca NeoGraphix Design fue aceptada para publicación. Debes pagar la tasa de publicación en el Diario Oficial dentro del plazo indicado para que INAPI pueda continuar el trámite (período de oposición).",
      consecuencia:
        "Si el pago no se realiza a tiempo, la solicitud puede suspenderse o caducar según normativa vigente.",
      documentos: [
        "Comprobante de pago de tasa de publicación",
        "Identificación del solicitante o representante",
      ],
      pasos: [
        "Revisa el monto y el código de pago en la notificación oficial.",
        "Realiza el pago por los medios habilitados por INAPI (portal o instrucciones del oficio).",
        "Guarda el comprobante y verifica que el estado cambie a «publicación pagada» en MiINAPI.",
        "Ante dudas, escribe a publicaciones@inapi.cl con el N° trm-004.",
      ],
      canalPresentacion:
        "Medios de pago indicados en el portal INAPI y oficio de aceptación a publicación.",
      referencia: "Publicación en Diario Oficial — artículo 20 Ley 19.039 (procedimiento de marcas).",
    },
  },
  {
    id: "trm-005",
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
    etapaLabel: "Resolución Final · Marca Registrada",
    notificacion: {
      etapa: "Registro concedido",
      requerimiento: "Trámite concluido — marca vigente",
      plazo: "Renovación según plazo legal del registro",
      contacto: "renovaciones@inapi.cl",
    },
    accionRequeridaDetalle: {
      explicacionClara:
        "Tu marca Terra Verde SPA obtuvo registro en Chile. El derecho se encuentra vigente. Desde MiINAPI puedes descargar el PDF del registro de la marca con el botón de esta sección.",
      pasos: [
        "Conserva tu certificado de registro y el número de inscripción.",
        "Monitorea la fecha de renovación para mantener la protección de la marca.",
        "Ante cambios de titular o representante, actualiza tus datos en INAPI.",
      ],
      referencia: "Registro de marca — vigencia y renovación según Ley 19.039.",
    },
  }
];

export const mockNotificacionesUrgent: Notification[] = [
  { 
    id: "n-eco", 
    tipo: "ACCION_REQUERIDA", 
    urgency: "danger", 
    titulo: "Tu registro requiere atención", 
    cuerpo: "La marca 'Eco-Tech Solutions' requiere adjuntar poder notariado dentro del plazo límite.", 
    tiempo: "Hace 2h", 
    solicitudId: "trm-001",
    cta: null,
    detalle: {
      etapa: "Observación de Forma",
      requerimiento: "Adjuntar Poder Notariado",
      plazo: "18 de abril, 2026",
      contacto: "forma@inapi.cl"
    } 
  },
  { 
    id: "n-farma", 
    tipo: "ACCION_REQUERIDA", 
    urgency: "warning", 
    titulo: "Corregir descripción antes del plazo", 
    cuerpo: "La marca 'FarmaTech Chile' tuvo observaciones y requiere corregir la clase.", 
    tiempo: "Hace 1d", 
    solicitudId: "trm-002",
    cta: null,
  },
  { 
    id: "n-neo", 
    tipo: "ACCION_REQUERIDA", 
    urgency: "danger", 
    titulo: "Últimos días para pagar publicación en D.O.", 
    cuerpo: "NeoGraphix Design ha sido aceptado para publicación. Debes efectuar el pago en el Diario Oficial dentro del plazo indicado.", 
    tiempo: "Hace 3h",
    solicitudId: "trm-004",
    cta: null,
    detalle: {
      etapa: "Publicación en Diario Oficial",
      requerimiento: "Efectuar pago de publicación",
      plazo: "5 días hábiles desde la notificación",
      contacto: "publicaciones@inapi.cl",
    },
  },
  { 
    id: "n-aura", 
    tipo: "CAMBIO_ESTADO", 
    urgency: "info", 
    titulo: "Aviso de paso a Examen de Fondo", 
    cuerpo: "Tu solicitud Aura Cosmetics ingresó al circuito de resolución. Sin acciones requeridas.", 
    tiempo: "Hace 2d", 
    solicitudId: "trm-003",
    cta: null 
  },
  { 
    id: "n-terra", 
    tipo: "FINALIZADA", 
    urgency: "success", 
    titulo: "¡Marca Registrada con éxito!", 
    cuerpo: "Felicitaciones, Terra Verde SPA obtuvo registro. Tu certificado está disponible.", 
    tiempo: "Hace 4d", 
    solicitudId: "trm-005",
    cta: null,
  }
];

export const mockSummaryUrgent = {
  enProceso: 4,
  accionRequerida: 2,
  finalizadas: 1,
};

const trm004NeoGraphix = mockTramitesUrgent.find((s) => s.id === "trm-004");

if (trm004NeoGraphix) {
  mockTramitesNoUrgent.push({ ...trm004NeoGraphix });
}

mockNotificacionesNoUrgent.push({
  id: "notif-neo",
  tipo: "ACCION_REQUERIDA",
  urgency: "danger",
  titulo: "Últimos días para pagar publicación en D.O.",
  cuerpo:
    "NeoGraphix Design ha sido aceptado para publicación. Debes efectuar el pago en el Diario Oficial dentro del plazo indicado.",
  tiempo: "Hace 1 día",
  solicitudId: "trm-004",
  cta: null,
  detalle: {
    etapa: "Publicación en Diario Oficial",
    requerimiento: "Efectuar pago de publicación",
    plazo: "5 días hábiles desde la notificación",
    contacto: "publicaciones@inapi.cl",
  },
});

/** Busca solicitud en todos los conjuntos mock (misma definición por id). */
export function getSolicitudById(id: string): Solicitud | undefined {
  return (
    mockTramitesUrgent.find((s) => s.id === id) ??
    mockTramitesNoUrgent.find((s) => s.id === id)
  );
}

export const mockSolicitudes = mockTramitesUrgent;
export const mockNotificaciones = mockNotificacionesUrgent;


