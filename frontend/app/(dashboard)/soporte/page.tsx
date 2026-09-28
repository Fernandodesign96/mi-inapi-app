"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { useRouter } from "next/navigation";
import { Mail, Phone, MessageCircle, ChevronRight, User, ExternalLink } from "lucide-react";
import InapiContactCard from "@/components/ui/InapiContactCard";
import TopBar from "@/components/ui/TopBar";
import CollapsibleCard from "@/components/ui/CollapsibleCard";
import StatusBadge from "@/components/ui/StatusBadge";
import FilterPills from "@/components/ui/FilterPills";
import CTAButton from "@/components/ui/CTAButton";
import { phase2HiddenClass } from "@/lib/featureFlags";

type CanalType = "email" | "llamada" | "chat";
type FilterType = "todos" | CanalType;

interface Interaccion {
  id: string;
  canal: CanalType;
  titulo: string;
  estado: "resuelto" | "pendiente";
  fecha: string;
  consulta: string;
  respuesta: string;
  atendidoPor: string;
}

interface ChatEjecutivoSesion {
  id: string;
  titulo: string;
  ejecutivo: string;
  fecha: string;
  estado: "resuelto" | "pendiente";
  saludo: string;
  pregunta: string;
  respuesta: string;
}

const mockInteracciones: Interaccion[] = [
  {
    id: "s1",
    canal: "email",
    titulo: "Duda plazo examen de fondo",
    estado: "resuelto",
    fecha: "15 Oct 2023",
    consulta: "¿Puedo pedir prórroga de 30 días para presentar el poder notarial?",
    respuesta: "Estimado Juan, efectivamente puede solicitar una prórroga antes del vencimiento del plazo original a través del portal.",
    atendidoPor: "M. González",
  },
  {
    id: "s2",
    canal: "llamada",
    titulo: "Consulta estado de pago",
    estado: "resuelto",
    fecha: "10 Oct 2023",
    consulta: "No veo reflejado el pago de la tasa de publicación.",
    respuesta: "Se verificó el pago en nuestro sistema. Ya debería aparecer como completado en su dashboard.",
    atendidoPor: "S. Rojas",
  },
  {
    id: "s3",
    canal: "chat",
    titulo: "Ayuda con formulario F-01",
    estado: "pendiente",
    fecha: "Hoy",
    consulta: "Tengo problemas para cargar el PDF del diseño industrial.",
    respuesta: "Estamos revisando su caso con soporte técnico.",
    atendidoPor: "Bot MiINAPI",
  },
];

const mockChatsEjecutivo: ChatEjecutivoSesion[] = [
  {
    id: "ce1",
    titulo: "¿Cómo presento un poder notarial fuera de plazo?",
    ejecutivo: "María González",
    fecha: "12 Oct 2023",
    estado: "resuelto",
    saludo: "Buenos días, Juan. Soy María del equipo de Marcas de INAPI. Estoy revisando su consulta y en unos momentos le entrego la información.",
    pregunta: "¿Cómo presento un poder notarial fuera de plazo? Mi solicitud indica que tenía hasta el 10 de octubre.",
    respuesta: "Estimado Juan, si el plazo ya venció, debe ingresar un escrito de reposición adjuntando el poder notarial y una justificación de la demora. Esto puede hacerlo directamente en nuestra plataforma en la sección 'Documentos pendientes'. Le recomendamos actuar a la brevedad para no afectar su solicitud.",
  },
  {
    id: "ce2",
    titulo: "Observación de forma en solicitud de marca",
    ejecutivo: "Sebastián Rojas",
    fecha: "8 Oct 2023",
    estado: "resuelto",
    saludo: "Hola Juan, habla Sebastián, ejecutivo de trámites de INAPI. Vi que tiene una observación de forma pendiente. ¿En qué le puedo ayudar hoy?",
    pregunta: "Me llegó un aviso de observación de forma pero no entiendo qué debo corregir exactamente.",
    respuesta: "La observación se refiere a que la descripción de la clase de Niza no es suficientemente específica. Debe ingresar una nueva descripción de los productos o servicios dentro de la Clase 3, indicando de forma detallada los productos que desea registrar (ej: 'cosméticos para el cuidado facial, cremas hidratantes'). Puede enviar la corrección a forma@inapi.cl con el número de solicitud en el asunto.",
  },
  {
    id: "ce3",
    titulo: "Proceso de publicación en Diario Oficial",
    ejecutivo: "Andrea Pérez",
    fecha: "5 Oct 2023",
    estado: "resuelto",
    saludo: "¡Buenos días! Soy Andrea, parte del equipo de Publicaciones de INAPI. Quedo a disposición para orientarle sobre el proceso de publicación.",
    pregunta: "¿Cuánto tiempo tarda el proceso de publicación en el Diario Oficial y cómo sé que fue publicado?",
    respuesta: "Una vez aprobado el examen de forma, el proceso de publicación en el Diario Oficial tarda aproximadamente 10 a 15 días hábiles. Le llegará una notificación a su correo registrado confirmando la publicación, y podrá verla en MiINAPI bajo la sección Solicitudes. A partir de esa publicación se inician los 30 días de período de oposición.",
  },
];

export default function SoportePage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<FilterType>("todos");
  const [expandedId, setExpandedId] = useState<string | null>("s1");
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  const filtered = mockInteracciones.filter(
    (i) => activeFilter === "todos" || i.canal === activeFilter
  );

  const filterOptions = [
    { value: "todos", label: "Todos" },
    { value: "email", label: "Email" },
    { value: "chat", label: "Chat" },
    { value: "llamada", label: "Llamadas" },
  ];

  const getIcon = (canal: CanalType) => {
    switch (canal) {
      case "email":
        return <Mail size={18} />;
      case "llamada":
        return <Phone size={18} />;
      case "chat":
        return <MessageCircle size={18} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar variant="section" title="Contacto" />

      <div className="flex-1 overflow-y-auto pb-safe-bottomnav screen-enter">
        <div className="px-6 pt-6 pb-2">
          <h1 className="text-h1 text-foreground">Contáctate con INAPI</h1>
          <p className="text-body-sm text-muted-secondary mt-1">
            Revisa los métodos de contacto
          </p>
        </div>

        <div
          className={clsx(
            "sticky top-topbar z-30 bg-background/80 backdrop-blur-md px-6 py-4",
            phase2HiddenClass()
          )}
        >
          <FilterPills
            options={filterOptions}
            activeValue={activeFilter}
            onChange={(v) => setActiveFilter(v as FilterType)}
          />
        </div>

        <div className="px-6 space-y-6">
          <InapiContactCard />

          <div className={clsx("flex flex-col gap-3", phase2HiddenClass())}>
                <CTAButton
                  label="Chatea con un ejecutivo"
                  variant="primary"
                  fullWidth
                  size="md"
                  icon={<MessageCircle size={18} />}
                  onClick={() => router.push("/soporte/chat-ejecutivo?nuevo=true")}
                />
                <CTAButton
                  label="Llámanos"
                  variant="outline"
                  fullWidth
                  size="md"
                  icon={<Phone size={18} />}
                />
          </div>

          <div className={clsx("space-y-4", phase2HiddenClass())}>
            <p className="text-label text-muted">INTERACCIONES RECIENTES</p>
            {filtered.map((item) => (
              <CollapsibleCard
                key={item.id}
                variant={item.estado === "resuelto" ? "success" : "warning"}
                isOpen={expandedId === item.id}
                onToggle={() => setExpandedId(expandedId === item.id ? null : item.id)}
                header={
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-elevated flex items-center justify-center text-muted-secondary shrink-0">
                      {getIcon(item.canal)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <StatusBadge
                          variant={item.estado === "resuelto" ? "success" : "warning"}
                          label={item.estado}
                        />
                        <span className="text-timestamp">{item.fecha}</span>
                      </div>
                      <h4 className="text-body-sm font-bold text-foreground mt-1 pr-4">
                        {item.titulo}
                      </h4>
                    </div>
                  </div>
                }
                preview={item.consulta}
                content={
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <span className="text-body-xs font-bold text-muted uppercase">
                        TU CONSULTA
                      </span>
                      <p className="text-body-sm text-muted-secondary italic">
                        &quot;{item.consulta}&quot;
                      </p>
                    </div>
                    <div className="space-y-2 pt-3 border-t border-border">
                      <span className="text-body-xs font-bold text-muted uppercase">
                        RESPUESTA INAPI
                      </span>
                      <p className="text-body-sm text-foreground leading-relaxed">
                        {item.respuesta}
                      </p>
                    </div>
                    <div className="pt-3 flex items-center justify-between">
                      <p className="text-body-xs text-muted">
                        Atendido por:{" "}
                        <span className="font-semibold text-muted-secondary">
                          {item.atendidoPor}
                        </span>
                      </p>
                      {item.estado === "resuelto" && (
                        <button className="text-body-xs font-bold text-primary uppercase tracking-wider">
                          Reabrir Ticket
                        </button>
                      )}
                    </div>
                  </div>
                }
              />
            ))}
          </div>

          <div className={clsx("space-y-4 pb-4", phase2HiddenClass())}>
            <p className="text-label text-muted">PREGUNTAS FRECUENTES</p>
            <p className="text-body-xs text-muted-secondary -mt-2">
              Chats recientes con ejecutivos de INAPI
            </p>
            {mockChatsEjecutivo.map((chat) => (
              <CollapsibleCard
                key={chat.id}
                variant={chat.estado === "resuelto" ? "success" : "warning"}
                isOpen={expandedFaqId === chat.id}
                onToggle={() =>
                  setExpandedFaqId(expandedFaqId === chat.id ? null : chat.id)
                }
                header={
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-info-bg flex items-center justify-center text-primary shrink-0">
                      <User size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <StatusBadge
                          variant={chat.estado === "resuelto" ? "success" : "warning"}
                          label={chat.estado}
                        />
                        <span className="text-timestamp">{chat.fecha}</span>
                      </div>
                      <h4 className="text-body-sm font-bold text-foreground mt-1 pr-4">
                        {chat.titulo}
                      </h4>
                    </div>
                  </div>
                }
                preview={chat.pregunta}
                content={
                  <div className="space-y-3">
                    <p className="text-body-xs text-muted">
                      Atendido por:{" "}
                      <span className="font-semibold text-muted-secondary">
                        {chat.ejecutivo}
                      </span>
                    </p>
                    <button
                      onClick={() =>
                        router.push(`/soporte/chat-ejecutivo?id=${chat.id}`)
                      }
                      className="w-full flex items-center justify-between bg-info-bg border border-primary-light rounded-lg px-4 py-3 text-body-sm font-bold text-primary active:scale-[0.98] transition-all"
                    >
                      <span>Ver conversación completa</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                }
              />
            ))}
          </div>
        </div>

        <div className="p-6 pb-28 border-t border-border bg-surface space-y-6">
          <div className="flex items-center justify-center gap-6">
            <a
              href="https://www.inapi.cl/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-body-sm font-semibold text-primary flex items-center gap-1.5 hover:underline"
            >
              Página INAPI <ExternalLink size={14} />
            </a>
            <div className="w-px h-4 bg-border" />
            <a
              href="https://www.wipo.int/portal/es/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-body-sm font-semibold text-primary flex items-center gap-1.5 hover:underline"
            >
              Ir a OMPI <ExternalLink size={14} />
            </a>
          </div>

          <p
            className={clsx(
              "text-center text-body-xs text-muted leading-relaxed",
              phase2HiddenClass()
            )}
          >
            Mostrando historial de los últimos 6 meses · <br />
            <span className="font-bold underline cursor-pointer">
              Ver historial completo
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
