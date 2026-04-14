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
  notificacion?: {
    etapa: string;
    requerimiento: string;
    plazo: string;
    contacto: string;
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

export const mockTramitesNoUrgent: Solicitud[] = [
  {
    id: "trm-004",
    nombre: "NeoGraphix Design",
    tipo: "marca",
    estado: "PUBLICACION",
    etapa: "EXAMEN",
    urgency: "info",
    accion: null,
    estimacion: "6 meses restantes",
    diasRestantes: 14
  }
];

export const mockNotificacionesNoUrgent: Notification[] = [
  {
    id: "notif-neo",
    tipo: "CAMBIO_ESTADO",
    urgency: "info",
    titulo: "Tu marca pasó a Publicación",
    cuerpo: "NeoGraphix Design se encuentra lista para publicación en el Diario Oficial.",
    tiempo: "Hace 1 día",
    cta: "Ver estado"
  }
];

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
    id: "trm-001",
    nombre: "Eco-Tech Solutions",
    tipo: "marca",
    estado: "ACCION_REQUERIDA",  // Presentación -> Documento faltante
    etapa: "EXAMEN",
    urgency: "danger",
    accion: "Adjuntar documento de Poder notariado",
    estimacion: "Faltan documentos",
    diasRestantes: 5, // <= 7 se tiñe rojo en el stepper
    notificacion: { 
      etapa: "Observación de Forma", 
      requerimiento: "Adjuntar Poder Notariado", 
      plazo: "18 de abril, 2026", 
      contacto: "forma@inapi.cl" 
    }
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
    diasRestantes: 14 // >= 8 se tiñe naranja/warning en el stepper
  },
  {
    id: "trm-003",
    nombre: "Aura Cosmetics",
    tipo: "marca",
    estado: "EN_REVISION",  // Resolución de fondo
    etapa: "RESOLUCION",
    urgency: "info",
    accion: null,
    estimacion: "8 meses restantes"
  },
  {
    id: "trm-004",
    nombre: "NeoGraphix Design",
    tipo: "marca",
    estado: "PUBLICACION", // Pago en DO requerido
    etapa: "EXAMEN",
    urgency: "danger",
    accion: "Pagar publicación",
    estimacion: "Pagar Diario Oficial",
    diasRestantes: 2 // <= 7 se tiñe rojo en el stepper
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
    cta: "Adjuntar poder",
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
    cta: "Modificar clase",
  },
  { 
    id: "n-neo", 
    tipo: "CAMBIO_ESTADO", 
    urgency: "danger", 
    titulo: "Últimos días para pagar publicación en D.O.", 
    cuerpo: "NeoGraphix Design ha sido aceptado para publicación. Debes efectuar el pago en el Diario Oficial.", 
    tiempo: "Hace 3h",
    solicitudId: "trm-004",
    cta: "Ir a pago de publicación" 
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
    cta: "Descargar certificado" 
  }
];

export const mockSummaryUrgent = {
  enProceso: 4,
  accionRequerida: 2,
  finalizadas: 1,
};

// Aliasing retrocompatibles para partes que aún lo necesitan crudo, 
// aunque la app consumirá los segregados según estado
export const mockSolicitudes = mockTramitesUrgent;
export const mockNotificaciones = mockNotificacionesUrgent;


