"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, User, Send, MoreVertical } from "lucide-react";
import { clsx } from "clsx";

interface ChatEjecutivoSesion {
  id: string;
  titulo: string;
  ejecutivo: string;
  fecha: string;
  saludo: string;
  pregunta: string;
  respuesta: string;
}

const mockChatsEjecutivo: ChatEjecutivoSesion[] = [
  {
    id: "ce1",
    titulo: "¿Cómo presento un poder notarial fuera de plazo?",
    ejecutivo: "María González",
    fecha: "12 Oct 2023",
    saludo:
      "Buenos días, Juan. Soy María del equipo de Marcas de INAPI. Estoy revisando su consulta y en unos momentos le entrego la información.",
    pregunta:
      "¿Cómo presento un poder notarial fuera de plazo? Mi solicitud indica que tenía hasta el 10 de octubre.",
    respuesta:
      "Estimado Juan, si el plazo ya venció, debe ingresar un escrito de reposición adjuntando el poder notarial y una justificación de la demora. Esto puede hacerlo directamente en nuestra plataforma en la sección 'Documentos pendientes'. Le recomendamos actuar a la brevedad para no afectar su solicitud.",
  },
  {
    id: "ce2",
    titulo: "Observación de forma en solicitud de marca",
    ejecutivo: "Sebastián Rojas",
    fecha: "8 Oct 2023",
    saludo:
      "Hola Juan, habla Sebastián, ejecutivo de trámites de INAPI. Vi que tiene una observación de forma pendiente. ¿En qué le puedo ayudar hoy?",
    pregunta:
      "Me llegó un aviso de observación de forma pero no entiendo qué debo corregir exactamente.",
    respuesta:
      "La observación se refiere a que la descripción de la clase de Niza no es suficientemente específica. Debe ingresar una nueva descripción de los productos o servicios dentro de la Clase 3, indicando de forma detallada los productos que desea registrar (ej: 'cosméticos para el cuidado facial, cremas hidratantes'). Puede enviar la corrección a forma@inapi.cl con el número de solicitud en el asunto.",
  },
  {
    id: "ce3",
    titulo: "Proceso de publicación en Diario Oficial",
    ejecutivo: "Andrea Pérez",
    fecha: "5 Oct 2023",
    saludo:
      "¡Buenos días! Soy Andrea, parte del equipo de Publicaciones de INAPI. Quedo a disposición para orientarle sobre el proceso de publicación.",
    pregunta:
      "¿Cuánto tiempo tarda el proceso de publicación en el Diario Oficial y cómo sé que fue publicado?",
    respuesta:
      "Una vez aprobado el examen de forma, el proceso de publicación en el Diario Oficial tarda aproximadamente 10 a 15 días hábiles. Le llegará una notificación a su correo registrado confirmando la publicación, y podrá verla en MiINAPI bajo la sección Solicitudes. A partir de esa publicación se inician los 30 días de período de oposición.",
  },
];

const nuevoChatDefault: ChatEjecutivoSesion = {
  id: "nuevo",
  titulo: "Nueva conversación",
  ejecutivo: "Equipo INAPI",
  fecha: "Hoy",
  saludo:
    "Hola, bienvenido al chat de atención de INAPI. Soy parte del equipo de soporte y estoy aquí para ayudarte. ¿En qué puedo orientarte hoy?",
  pregunta: "",
  respuesta: "",
};

export default function ChatEjecutivoClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const esNuevo = searchParams.get("nuevo") === "true";

  const sesion = esNuevo
    ? nuevoChatDefault
    : mockChatsEjecutivo.find((c) => c.id === id) || mockChatsEjecutivo[0];

  const iniciales = sesion.ejecutivo
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="flex flex-col h-screen bg-surface">
      <header className="h-topbar border-b border-border flex items-center justify-between px-4 sticky top-0 bg-surface z-40">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="p-2 -ml-2 text-foreground">
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-body-xs font-bold shrink-0">
              {esNuevo ? <User size={16} /> : iniciales}
            </div>
            <div className="flex flex-col">
              <span className="text-h4 font-bold text-foreground leading-tight">
                {esNuevo ? "Ejecutivo INAPI" : sesion.ejecutivo}
              </span>
              <span className="text-body-xs font-bold text-success flex items-center gap-1 uppercase">
                <div className="w-1.5 h-1.5 rounded-full bg-success" /> En línea
              </span>
            </div>
          </div>
        </div>
        <button className="p-2 text-muted-secondary">
          <MoreVertical size={20} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-background">
        <div className="flex justify-center">
          <span className="text-body-xs font-bold text-muted bg-surface px-3 py-1 rounded-full shadow-sm border border-border">
            {esNuevo
              ? "CONVERSACIÓN INICIADA · HOY"
              : `CONVERSACIÓN · ${sesion.fecha.toUpperCase()}`}
          </span>
        </div>

        <MessageBubble
          role="assistant"
          text={sesion.saludo}
          time={esNuevo ? "Ahora" : "09:02"}
          name={esNuevo ? "Ejecutivo INAPI" : sesion.ejecutivo}
          iniciales={esNuevo ? "" : iniciales}
        />

        {!esNuevo && sesion.pregunta && (
          <MessageBubble role="user" text={sesion.pregunta} time="09:05" />
        )}

        {!esNuevo && sesion.respuesta && (
          <MessageBubble
            role="assistant"
            text={sesion.respuesta}
            time="09:08"
            name={sesion.ejecutivo}
            iniciales={iniciales}
          />
        )}

        {esNuevo && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
              <User size={14} />
            </div>
            <div className="bg-surface border border-border rounded-[18px] rounded-tl-[4px] p-4 shadow-sm">
              <div className="flex gap-1.5 items-center">
                <div
                  className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <div
                  className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <div
                  className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-border bg-surface">
        {esNuevo ? (
          <div className="relative shadow-lg rounded-full">
            <input
              type="text"
              placeholder="Escribe tu consulta al ejecutivo..."
              className="w-full bg-surface-elevated h-[52px] rounded-full pl-6 pr-14 text-body-sm font-sans outline-none input-gob border border-transparent transition-all"
            />
            <button className="absolute right-1 top-1 w-[44px] h-[44px] bg-primary text-white rounded-full flex items-center justify-center active:scale-90 transition-transform shadow-md">
              <Send size={18} />
            </button>
          </div>
        ) : (
          <div className="bg-surface-elevated rounded-lg px-4 py-3 flex items-center justify-between">
            <p className="text-body-sm text-muted font-medium">
              Esta conversación está cerrada
            </p>
            <span className="text-body-xs font-bold text-success uppercase">Resuelta</span>
          </div>
        )}
      </div>
    </div>
  );
}

interface MessageBubbleProps {
  role: "assistant" | "user";
  text: string;
  time: string;
  name?: string;
  iniciales?: string;
}

function MessageBubble({ role, text, time, name, iniciales }: MessageBubbleProps) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-1.5",
        role === "user" ? "items-end" : "items-start"
      )}
    >
      {role === "assistant" && name && (
        <div className="flex items-center gap-2 pl-11">
          <span className="text-body-xs font-bold text-muted-secondary">{name}</span>
        </div>
      )}
      <div
        className={clsx(
          "flex items-end gap-2",
          role === "user" ? "flex-row-reverse" : "flex-row"
        )}
      >
        {role === "assistant" && (
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-body-xs font-bold shrink-0 mb-1">
            {iniciales ? iniciales : <User size={14} />}
          </div>
        )}
        <div
          className={clsx(
            "max-w-[80%] p-4 text-body-sm leading-relaxed shadow-sm",
            role === "user"
              ? "bg-primary text-white rounded-[18px] rounded-tr-[4px]"
              : "bg-surface text-foreground border border-border rounded-[18px] rounded-tl-[4px]"
          )}
        >
          {text}
        </div>
      </div>
      <span
        className={clsx(
          "text-body-xs font-bold text-muted uppercase px-1",
          role === "user" ? "pr-2" : "pl-10"
        )}
      >
        {time}
      </span>
    </div>
  );
}
