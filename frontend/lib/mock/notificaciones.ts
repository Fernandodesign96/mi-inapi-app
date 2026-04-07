// Mock data — Notificaciones
export type NotificacionTipo = "danger" | "warning" | "info" | "success";
export type NotificacionCategoria = "marca" | "patente";

export interface NotificacionTableRow {
  label: string;
  value: string;
  isMono?: boolean;
}

export interface Notificacion {
  id: string;
  tipo: NotificacionTipo;
  categoria: NotificacionCategoria;
  tipoLabel: string;
  titulo: string;
  preview: string;
  timestamp: string;
  tabla: NotificacionTableRow[];
  ctaLabel?: string;
  ctaType?: "adjuntar" | "pago" | "confirmar" | "informativo" | "acuse";
  tramiteId?: string;
}

export const notificacionesMock: Notificacion[] = [
  {
    id: "n1",
    tipo: "danger",
    categoria: "marca",
    tipoLabel: "ACCIÓN REQUERIDA",
    titulo: "Documento de Poder notariado pendiente",
    preview: "El trámite 2024-00123 requiere adjuntar un documento notariado antes del plazo límite.",
    timestamp: "Hace 10m",
    tabla: [
      { label: "Etapa actual", value: "Examen de Fondo" },
      { label: "Solicitud", value: "#2024-00123", isMono: true },
      { label: "Requerimiento", value: "Adjuntar Poder Notariado" },
      { label: "Plazo límite", value: "20 de abril, 2026" },
      { label: "Contacto", value: "examenes@inapi.cl" },
    ],
    ctaLabel: "Adjuntar documento",
    ctaType: "adjuntar",
    tramiteId: "t1",
  },
  {
    id: "n2",
    tipo: "warning",
    categoria: "marca",
    tipoLabel: "CADUCIDAD",
    titulo: "Tu registro vence en 30 días",
    preview: "La marca 'FarmaTech Chile' está próxima a expirar. Renueva antes de la fecha límite.",
    timestamp: "Hace 2h",
    tabla: [
      { label: "Etapa actual", value: "Registro Vigente" },
      { label: "Solicitud", value: "#2023-00712", isMono: true },
      { label: "Requerimiento", value: "Renovación de Registro" },
      { label: "Plazo límite", value: "7 de mayo, 2026" },
      { label: "Contacto", value: "renovaciones@inapi.cl" },
    ],
    ctaLabel: "Iniciar Renovación →",
    ctaType: "confirmar",
    tramiteId: "t2",
  },
  {
    id: "n3",
    tipo: "info",
    categoria: "marca",
    tipoLabel: "RENOVACIÓN",
    titulo: "Aviso de Renovación Anticipada",
    preview: "Tu solicitud Aura Cosmetics ingresó al período de publicación. Sin acciones requeridas.",
    timestamp: "Hace 1d",
    tabla: [
      { label: "Etapa actual", value: "Publicación" },
      { label: "Solicitud", value: "#2023-00589", isMono: true },
      { label: "Período", value: "30 días de oposición" },
      { label: "Desde", value: "6 de abril, 2026" },
      { label: "Contacto", value: "publicaciones@inapi.cl" },
    ],
    ctaLabel: "Ver estado",
    ctaType: "acuse",
    tramiteId: "t3",
  },
  {
    id: "n4",
    tipo: "success",
    categoria: "marca",
    tipoLabel: "CAMBIO DE ESTADO",
    titulo: "Tu marca pasó a Publicación",
    preview: "NeoGraphix Design completó exitosamente la etapa de ingreso. Felicitaciones.",
    timestamp: "Hace 3h",
    tabla: [
      { label: "Etapa actual", value: "Ingreso Exitoso" },
      { label: "Solicitud", value: "#2024-00102", isMono: true },
      { label: "Estado", value: "Completado" },
      { label: "Fecha", value: "6 de abril, 2026" },
      { label: "Contacto", value: "info@inapi.cl" },
    ],
    ctaType: "informativo",
    tramiteId: "t4",
  },
  // Patentes
  {
    id: "n5",
    tipo: "danger",
    categoria: "patente",
    tipoLabel: "ACCIÓN REQUERIDA",
    titulo: "Respuesta a Examen de Fondo pendiente",
    preview: "Sistema Filtrado EcoPure requiere respuesta formal al Examen de Fondo antes del plazo.",
    timestamp: "Hace 1h",
    tabla: [
      { label: "Etapa actual", value: "Examen de Fondo" },
      { label: "Solicitud", value: "#2022-00567", isMono: true },
      { label: "Requerimiento", value: "Respuesta técnica escrita" },
      { label: "Plazo límite", value: "20 de abril, 2026" },
      { label: "Contacto", value: "patentes@inapi.cl" },
    ],
    ctaLabel: "Adjuntar respuesta →",
    ctaType: "adjuntar",
    tramiteId: "t5",
  },
];

export const getNotificacionesByCategoria = (categoria: NotificacionCategoria) =>
  notificacionesMock.filter((n) => n.categoria === categoria);

export const sortByUrgencia = (notifs: Notificacion[]) => {
  const order: Record<NotificacionTipo, number> = {
    danger: 0, warning: 1, info: 2, success: 3,
  };
  return [...notifs].sort((a, b) => order[a.tipo] - order[b.tipo]);
};

export const sortByFecha = (notifs: Notificacion[]) =>
  [...notifs].reverse();
