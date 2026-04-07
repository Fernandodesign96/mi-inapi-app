"use client";

import { useState } from "react";
import { Mail, Phone, MessageCircle, ChevronDown, ExternalLink, Headphones } from "lucide-react";
import TopBar from "@/components/ui/TopBar";
import FilterPills from "@/components/ui/FilterPills";
import StatusBadge from "@/components/ui/StatusBadge";
import { useRouter } from "next/navigation";
import { soporteMock, InteraccionSoporte, getSoporteByCanal, CanalTipo } from "@/lib/mock/soporte";
import { clsx } from "clsx";

type FilterCanal = "todos" | CanalTipo;

const canalIcon: Record<CanalTipo, React.ComponentType<{ size?: number; color?: string }>> = {
  email: Mail,
  llamada: Phone,
  chat: MessageCircle,
};

const canalIconBg: Record<CanalTipo, { bg: string; color: string }> = {
  email: { bg: "#DBEAFE", color: "#1A56DB" },
  llamada: { bg: "#FEF3C7", color: "#D97706" },
  chat: { bg: "#D1FAE5", color: "#059669" },
};

function InteraccionCard({ item }: { item: InteraccionSoporte }) {
  const [open, setOpen] = useState(item.id === "s1");
  const Icon = canalIcon[item.canal];
  const { bg, color } = canalIconBg[item.canal];

  return (
    <div className="bg-white rounded-lg shadow-card overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full text-left p-4 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#1A56DB]"
      >
        <div className="flex items-start gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5"
            style={{ background: bg }}
          >
            <Icon size={18} color={color} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <p className="text-[15px] font-semibold text-[#111827] leading-snug line-clamp-1">
                {item.titulo}
              </p>
              <div className="flex items-center gap-1.5 shrink-0">
                <StatusBadge
                  variant={item.estado === "resuelto" ? "success" : item.estado === "pendiente" ? "warning" : "info"}
                  label={item.estado === "resuelto" ? "RESUELTO" : item.estado === "pendiente" ? "PENDIENTE" : "REABIERTO"}
                />
                <ChevronDown
                  size={16}
                  color="#9CA3AF"
                  className={clsx("transition-transform duration-250", open && "rotate-180")}
                />
              </div>
            </div>
            <p className="text-[12px] text-[#9CA3AF] mt-0.5">
              {item.fecha}
              {item.duracion && ` · ${item.duracion}`}
            </p>
          </div>
        </div>
      </button>

      {/* Expanded content */}
      <div
        className={clsx(
          "transition-all duration-250 ease-in-out overflow-hidden",
          open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 pb-4 space-y-3 border-t border-[#F3F4F6]">
          <div className="pt-3 space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9CA3AF]">
              Tu consulta
            </p>
            <p className="text-[14px] text-[#4B5563] italic leading-relaxed">
              &ldquo;{item.consulta}&rdquo;
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9CA3AF]">
              Respuesta INAPI
            </p>
            <p className="text-[14px] text-[#111827] leading-relaxed">
              {item.respuesta}
            </p>
          </div>
          <div className="flex items-center justify-between pt-1">
            <p className="text-[12px] text-[#9CA3AF]">
              Atendido por: <span className="text-[#4B5563] font-medium">{item.atendidoPor}</span>
            </p>
            {item.estado !== "pendiente" && (
              <button className="text-[12px] text-[#4B5563] border border-[#E5E7EB] rounded-full px-3 py-1 hover:bg-[#F3F4F6] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1A56DB]">
                Reabrir Ticket
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SoportePage() {
  const router = useRouter();
  const [canal, setCanal] = useState<FilterCanal>("todos");

  const items = getSoporteByCanal(canal === "todos" ? "todos" : canal);

  return (
    <>
      <TopBar
        variant="section"
        title="Soporte e Historial"
        onBack={() => router.push("/inicio")}
        showSearch
      />

      <div className="px-4 pt-4 pb-6 space-y-4">
        {/* Filter pills */}
        <FilterPills
          options={[
            { value: "todos", label: "Todos" },
            { value: "email", label: "Email" },
            { value: "chat", label: "Chat" },
            { value: "llamada", label: "Llamada" },
          ]}
          activeValue={canal}
          onChange={(v) => setCanal(v as FilterCanal)}
        />

        {/* Info banner */}
        <div className="flex items-start gap-3 bg-[#FEF3C7] border-l-4 border-[#D97706] rounded-[10px] p-3">
          <Headphones size={20} color="#D97706" className="shrink-0 mt-0.5" />
          <div>
            <p className="text-[14px] font-semibold text-[#92400E]">
              ¿Necesitas ayuda inmediata?
            </p>
            <p className="text-[12px] text-[#92400E] opacity-80">
              Lun–Vie 09:00 – 18:00 hrs
            </p>
          </div>
        </div>

        {/* Section label */}
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9CA3AF]">
          Interacciones Recientes — Octubre 2023
        </p>

        {/* Interaction cards */}
        <div className="space-y-3">
          {items.map((item) => (
            <InteraccionCard key={item.id} item={item} />
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-[#E5E7EB] my-2" />

        {/* Contact buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button className="h-11 rounded-full border border-[#E5E7EB] flex items-center justify-center gap-2 text-[14px] font-semibold text-[#4B5563] hover:bg-[#F3F4F6] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1A56DB]">
            <Phone size={16} />
            Llámanos
          </button>
          <button className="h-11 rounded-full bg-[#1A56DB] text-white flex items-center justify-center gap-2 text-[14px] font-semibold hover:bg-[#1E3A8A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1A56DB]">
            <MessageCircle size={16} />
            Nuevo Chat
          </button>
        </div>

        {/* External links */}
        <div className="flex items-center justify-center gap-6 pt-1">
          <a href="https://www.ompi.int" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[14px] text-[#1A56DB] font-medium focus:outline-none focus:underline">
            Ir a OMPI <ExternalLink size={13} />
          </a>
          <a href="https://www.inapi.cl" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[14px] text-[#1A56DB] font-medium focus:outline-none focus:underline">
            Página INAPI <ExternalLink size={13} />
          </a>
        </div>

        <p className="text-center text-[12px] text-[#9CA3AF]">
          Mostrando historial de los últimos 6 meses ·{" "}
          <button className="font-semibold text-[#4B5563] focus:outline-none focus:underline">
            Ver historial completo
          </button>
        </p>
      </div>
    </>
  );
}
