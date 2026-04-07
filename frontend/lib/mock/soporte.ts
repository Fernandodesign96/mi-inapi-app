// Mock data — Soporte e Historial
export type CanalTipo = "email" | "chat" | "llamada";
export type TicketEstado = "resuelto" | "pendiente" | "reabierto";

export interface InteraccionSoporte {
  id: string;
  canal: CanalTipo;
  titulo: string;
  fecha: string;
  duracion?: string;
  estado: TicketEstado;
  consulta: string;
  respuesta: string;
  atendidoPor: string;
}

export const soporteMock: InteraccionSoporte[] = [
  {
    id: "s1",
    canal: "email",
    titulo: "Consulta de estado de solicitud de marca",
    fecha: "24 Oct · Correo Electrónico",
    estado: "resuelto",
    consulta: "¿Cuál es el estado actual de mi solicitud de marca para 'MiINAPI-App'?",
    respuesta: "Su solicitud se encuentra en fase de 'Publicación'. No requiere acciones adicionales por el momento.",
    atendidoPor: "Rodrigo M.",
  },
  {
    id: "s2",
    canal: "llamada",
    titulo: "Soporte Registro Patente EcoPure",
    fecha: "20 Oct · Llamada",
    duracion: "12 min",
    estado: "resuelto",
    consulta: "Necesito orientación sobre los documentos requeridos para el Examen de Fondo.",
    respuesta: "Se informó al usuario sobre los documentos técnicos necesarios y los plazos vigentes.",
    atendidoPor: "Sofía L.",
  },
  {
    id: "s3",
    canal: "chat",
    titulo: "Consulta sobre renovación de marca FarmaTech",
    fecha: "15 Oct · Chat en línea",
    estado: "pendiente",
    consulta: "¿Cómo inicio el proceso de renovación de mi marca registrada?",
    respuesta: "En proceso de respuesta por el equipo de Registro.",
    atendidoPor: "Equipo INAPI",
  },
];

export const getSoporteByCanal = (canal: CanalTipo | "todos") =>
  canal === "todos"
    ? soporteMock
    : soporteMock.filter((s) => s.canal === canal);
