"use client";

import { useState } from "react";
import { Mail, Phone, MessageCircle, Headphones, ExternalLink } from "lucide-react";
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

export default function SoportePage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("todos");
  const [expandedId, setExpandedId] = useState<string | null>("s1");

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

      <div className="flex-1 overflow-y-auto pb-6 screen-enter">
        {/* Header Block */}
        <div className="px-6 pt-6 pb-2">
          <h1 className="text-h1 text-[#111827]">Centro de Ayuda</h1>
          <p className="text-body-sm text-[#4B5563] mt-1">
            Revisa tus consultas anteriores o inicia una nueva
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
          {/* Immediate Help Card */}
          <SemaphoreCard urgency="warning">
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
          </SemaphoreCard>

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
                      <p className="text-body-sm text-[#4B5563] italic">"{item.consulta}"</p>
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
        </div>
      </div>

      {/* Floating Action Area */}
      <div className="p-6 pb-24 border-t border-[#E5E7EB] bg-white space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <CTAButton 
            label="Llámanos" 
            variant="outline" 
            fullWidth 
            size="md"
            icon={<Phone size={18} />} 
          />
          <CTAButton 
            label="Nuevo Chat" 
            variant="primary" 
            fullWidth 
            size="md"
            icon={<MessageCircle size={18} />} 
          />
        </div>
        
        <div className="flex items-center justify-center gap-6 py-2">
          <a 
            href="https://www.wipo.int/portal/es/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-semibold text-[#1A56DB] flex items-center gap-1.5 hover:underline"
          >
            Ir a OMPI <ExternalLink size={14} />
          </a>
          <div className="w-px h-4 bg-[#E5E7EB]" />
          <a 
            href="https://www.inapi.cl/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-semibold text-[#1A56DB] flex items-center gap-1.5 hover:underline"
          >
            Página INAPI <ExternalLink size={14} />
          </a>
        </div>
        
        <p className="text-center text-[11px] text-[#9CA3AF]">
          Mostrando historial de los últimos 6 meses · <span className="font-bold underline cursor-pointer">Ver historial completo</span>
        </p>
      </div>
    </div>
  );
}
