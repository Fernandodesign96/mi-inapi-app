export interface User {
  name: string;
  rut: string;
  email: string;
  initials: string;
}

export interface Notification {
  id: string;
  tipo: "ACCION_REQUERIDA" | "CADUCIDAD" | "RENOVACION" | "CAMBIO_ESTADO";
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
  estado: string;
  etapa: "INGRESO" | "EXAMEN" | "RESOLUCION";
  urgency: "danger" | "warning" | "info" | "success";
  accion: string | null;
  estimacion: string;
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

export const mockSolicitudes: Solicitud[] = [
  {
    id: "2024-00123",
    nombre: "Eco-Tech Solutions",
    tipo: "marca",
    estado: "ACCION_REQUERIDA",
    etapa: "EXAMEN",
    urgency: "danger",
    accion: "Documento de Poder notariado pendiente",
    estimacion: "4 meses restantes",
    notificacion: { 
      etapa: "Examen de Fondo", 
      requerimiento: "Adjuntar Poder Notariado", 
      plazo: "20 de abril, 2026", 
      contacto: "examenes@inapi.cl" 
    }
  },
  {
    id: "2023-00589",
    nombre: "Aura Cosmetics",
    tipo: "marca",
    estado: "EN_REVISION",
    etapa: "RESOLUCION",
    urgency: "info",
    accion: null,
    estimacion: "8 meses restantes"
  },
  {
    id: "2024-00102",
    nombre: "NeoGraphix Design",
    tipo: "marca",
    estado: "INGRESO_EXITOSO",
    etapa: "INGRESO",
    urgency: "success",
    accion: null,
    estimacion: "12 meses restantes"
  }
];

export const mockNotificaciones: Notification[] = [
  { 
    id: "n1", 
    tipo: "ACCION_REQUERIDA", 
    urgency: "danger", 
    titulo: "Documento de Poder notariado pendiente", 
    cuerpo: "El trámite 2024-00123 requiere adjuntar un documento notariado antes del plazo límite.", 
    tiempo: "Hace 10m", 
    solicitudId: "2024-00123", 
    cta: "Adjuntar documento",
    detalle: {
      etapa: "Examen de Fondo",
      requerimiento: "Adjuntar Poder Notariado",
      plazo: "20 de abril, 2026",
      contacto: "examenes@inapi.cl"
    }
  },
  { 
    id: "n2", 
    tipo: "CADUCIDAD", 
    urgency: "warning", 
    titulo: "Tu registro vence en 30 días", 
    cuerpo: "La marca 'FarmaTech Chile' está próxima a expirar. Renueva antes de la fecha límite.", 
    tiempo: "Hace 2h", 
    cta: "Iniciar Renovación →" 
  },
  { 
    id: "n3", 
    tipo: "RENOVACION", 
    urgency: "info", 
    titulo: "Aviso de Renovación Anticipada", 
    cuerpo: "Tu solicitud Aura Cosmetics ingresó al período de publicación. Sin acciones requeridas.", 
    tiempo: "Hace 1d", 
    cta: "Ver estado" 
  },
  { 
    id: "n4", 
    tipo: "CAMBIO_ESTADO", 
    urgency: "success", 
    titulo: "Tu marca pasó a Publicación", 
    cuerpo: "NeoGraphix Design completó exitosamente la etapa de ingreso.", 
    tiempo: "Hace 3h", 
    cta: null 
  }
];
