"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Phone, MessageCircle, Headphones, ChevronRight, User } from "lucide-react";
import TopBar from "@/components/ui/TopBar";
import CollapsibleCard from "@/components/ui/CollapsibleCard";
import StatusBadge from "@/components/ui/StatusBadge";
import FilterPills from "@/components/ui/FilterPills";
import CTAButton from "@/components/ui/CTAButton";
import SemaphoreCard from "@/components/ui/SemaphoreCard";

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
    atendidoPor: "M. González"
  },
  {
    id: "s2",
    canal: "llamada",
    titulo: "Consulta estado de pago",
    estado: "resuelto",
    fecha: "10 Oct 2023",
    consulta: "No veo reflejado el pago de la tasa de publicación.",
    respuesta: "Se verificó el pago en nuestro sistema. Ya debería aparecer como completado en su dashboard.",
    atendidoPor: "S. Rojas"
  },
  {
    id: "s3",
    canal: "chat",
    titulo: "Ayuda con formulario F-01",
    estado: "pendiente",
    fecha: "Hoy",
    consulta: "Tengo problemas para cargar el PDF del diseño industrial.",
    respuesta: "Estamos revisando su caso con soporte técnico.",
    atendidoPor: "Bot MiINAPI"
  }
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
    respuesta: "Estimado Juan, si el plazo ya venció, debe ingresar un escrito de reposición adjuntando el poder notarial y una justificación de la demora. Esto puede hacerlo directamente en nuestra plataforma en la sección 'Documentos pendientes'. Le recomendamos actuar a la brevedad para no afectar su solicitud."
  },
  {
    id: "ce2",
    titulo: "Observación de forma en solicitud de marca",
    ejecutivo: "Sebastián Rojas",
    fecha: "8 Oct 2023",
    estado: "resuelto",
    saludo: "Hola Juan, habla Sebastián, ejecutivo de trámites de INAPI. Vi que tiene una observación de forma pendiente. ¿En qué le puedo ayudar hoy?",
    pregunta: "Me llegó un aviso de observación de forma pero no entiendo qué debo corregir exactamente.",
    respuesta: "La observación se refiere a que la descripción de la clase de Niza no es suficientemente específica. Debe ingresar una nueva descripción de los productos o servicios dentro de la Clase 3, indicando de forma detallada los productos que desea registrar (ej: 'cosméticos para el cuidado facial, cremas hidratantes'). Puede enviar la corrección a forma@inapi.cl con el número de solicitud en el asunto."
  },
  {
    id: "ce3",
    titulo: "Proceso de publicación en Diario Oficial",
    ejecutivo: "Andrea Pérez",
    fecha: "5 Oct 2023",
    estado: "resuelto",
    saludo: "¡Buenos días! Soy Andrea, parte del equipo de Publicaciones de INAPI. Quedo a disposición para orientarle sobre el proceso de publicación.",
    pregunta: "¿Cuánto tiempo tarda el proceso de publicación en el Diario Oficial y cómo sé que fue publicado?",
    respuesta: "Una vez aprobado el examen de forma, el proceso de publicación en el Diario Oficial tarda aproximadamente 10 a 15 días hábiles. Le llegará una notificación a su correo registrado confirmando la publicación, y podrá verla en MiINAPI bajo la sección Solicitudes. A partir de esa publicación se inician los 30 días de período de oposición."
  }
];

export default function SoportePage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<FilterType>("todos");
  const [expandedId, setExpandedId] = useState<string | null>("s1");
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  const filtered = mockInteracciones.filter(i => activeFilter === 'todos' || i.canal === activeFilter);

  const filterOptions = [
    { value: "todos", label: "Todos" },
    { value: "email", label: "Email" },
    { value: "chat", label: "Chat" },
    { value: "llamada", label: "Llamadas" },
  ];

  const getIcon = (canal: CanalType) => {
    switch (canal) {
      case 'email': return <Mail size={18} />;
      case 'llamada': return <Phone size={18} />;
      case 'chat': return <MessageCircle size={18} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
      <TopBar variant="section" title="Soporte e Historial" />

      <div className="flex-1 overflow-y-auto pb-24 screen-enter">
        {/* Header Block */}
        <div className="px-6 pt-6 pb-2">
          <h1 className="text-h1 text-[#111827]">Centro de Ayuda</h1>
          <p className="text-body-sm text-[#4B5563] mt-1">
            Revisa tus consultas anteriores o contáctate con un ejecutivo
          </p>
        </div>

        {/* Filters Sticky Overlay */}
        <div className="sticky top-[56px] z-30 bg-[#F9FAFB]/80 backdrop-blur-md px-6 py-4">
          <FilterPills
            options={filterOptions}
            activeValue={activeFilter}
            onChange={(v) => setActiveFilter(v as FilterType)}
          />
        </div>

        <div className="px-6 space-y-6">
          {/* Immediate Help Card — con CTAs dentro */}
          <SemaphoreCard urgency="warning">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#FFFBEB] flex items-center justify-center text-[#D97706] shrink-0">
                  <Headphones size={20} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-[14px] font-bold text-[#111827]">¿Necesitas ayuda inmediata?</h4>
                  <p className="text-body-xs text-[#4B5563]">
                    Estamos disponibles de Lun a Vie, 09:00 – 18:00 hrs.
                  </p>
                </div>
              </div>

              {/* CTAs dentro del card */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <CTAButton
                  label="Llámanos"
                  variant="outline"
                  fullWidth
                  size="md"
                  icon={<Phone size={18} />}
                />
                <CTAButton
                  label="Chatea con un ejecutivo"
                  variant="primary"
                  fullWidth
                  size="md"
                  icon={<MessageCircle size={18} />}
                  onClick={() => router.push('/soporte/chat-ejecutivo?nuevo=true')}
                />
              </div>
            </div>
          </SemaphoreCard>

          {/* INTERACCIONES RECIENTES */}
          <div className="space-y-4">
            <p className="text-label text-[#9CA3AF]">INTERACCIONES RECIENTES</p>
            {filtered.map((item) => (
              <CollapsibleCard
                key={item.id}
                variant={item.estado === 'resuelto' ? 'success' : 'warning'}
                isOpen={expandedId === item.id}
                onToggle={() => setExpandedId(expandedId === item.id ? null : item.id)}
                header={
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#F3F4F6] flex items-center justify-center text-[#4B5563] shrink-0">
                      {getIcon(item.canal)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <StatusBadge
                          variant={item.estado === 'resuelto' ? 'success' : 'warning'}
                          label={item.estado}
                        />
                        <span className="text-timestamp">{item.fecha}</span>
                      </div>
                      <h4 className="text-[14px] font-bold text-[#111827] mt-1 pr-4">{item.titulo}</h4>
                    </div>
                  </div>
                }
                preview={item.consulta}
                content={
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-[#9CA3AF] uppercase">TU CONSULTA</span>
                      <p className="text-body-sm text-[#4B5563] italic">&quot;{item.consulta}&quot;</p>
                    </div>
                    <div className="space-y-2 pt-3 border-t border-[#E5E7EB]">
                      <span className="text-[10px] font-bold text-[#9CA3AF] uppercase">RESPUESTA INAPI</span>
                      <p className="text-body-sm text-[#111827] leading-relaxed">{item.respuesta}</p>
                    </div>
                    <div className="pt-3 flex items-center justify-between">
                      <p className="text-body-xs text-[#9CA3AF]">
                        Atendido por: <span className="font-semibold text-[#4B5563]">{item.atendidoPor}</span>
                      </p>
                      {item.estado === 'resuelto' && (
                        <button className="text-[11px] font-bold text-[#1A56DB] uppercase tracking-wider">
                          Reabrir Ticket
                        </button>
                      )}
                    </div>
                  </div>
                }
              />
            ))}
          </div>

          {/* PREGUNTAS FRECUENTES — chats con ejecutivos */}
          <div className="space-y-4 pb-4">
            <p className="text-label text-[#9CA3AF]">PREGUNTAS FRECUENTES</p>
            <p className="text-body-xs text-[#6B7280] -mt-2">Chats recientes con ejecutivos de INAPI</p>
            {mockChatsEjecutivo.map((chat) => (
              <CollapsibleCard
                key={chat.id}
                variant={chat.estado === 'resuelto' ? 'success' : 'warning'}
                isOpen={expandedFaqId === chat.id}
                onToggle={() => setExpandedFaqId(expandedFaqId === chat.id ? null : chat.id)}
                header={
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] flex items-center justify-center text-[#1A56DB] shrink-0">
                      <User size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <StatusBadge
                          variant={chat.estado === 'resuelto' ? 'success' : 'warning'}
                          label={chat.estado}
                        />
                        <span className="text-timestamp">{chat.fecha}</span>
                      </div>
                      <h4 className="text-[14px] font-bold text-[#111827] mt-1 pr-4">{chat.titulo}</h4>
                    </div>
                  </div>
                }
                preview={chat.pregunta}
                content={
                  <div className="space-y-3">
                    <p className="text-body-xs text-[#9CA3AF]">
                      Atendido por: <span className="font-semibold text-[#4B5563]">{chat.ejecutivo}</span>
                    </p>
                    <button
                      onClick={() => router.push(`/soporte/chat-ejecutivo?id=${chat.id}`)}
                      className="w-full flex items-center justify-between bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl px-4 py-3 text-[13px] font-bold text-[#1A56DB] active:scale-[0.98] transition-all"
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
      </div>
    </div>
  );
}
