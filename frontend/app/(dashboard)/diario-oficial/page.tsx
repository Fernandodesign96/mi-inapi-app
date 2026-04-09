"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Search, 
  ChevronRight, 
  ExternalLink,
  Filter,
  Calendar,
  FileText
} from "lucide-react";
import TopBar from "@/components/ui/TopBar";
import FilterPills from "@/components/ui/FilterPills";
import SemaphoreCard from "@/components/ui/SemaphoreCard";
import StatusBadge from "@/components/ui/StatusBadge";
import { useAppStore } from "@/lib/store";
import { mockSolicitudes } from "@/lib/mockData";

export default function DiarioOficialPage() {
  const router = useRouter();
  const { userState } = useAppStore();
  const [activeTab, setActiveTab] = useState("marcas");
  const [activeDate, setActiveDate] = useState("hoy");

  // Filter user publications that are "PUBLICADA" (mocking this for demo)
  const misPublicaciones = userState !== "new" ? [
    {
      id: "2024-00123",
      nombre: "Eco-Tech Solutions",
      fecha: "15 de marzo 2026",
      vence: "15 abr 2026",
      estado: "PUBLICADA"
    }
  ] : [];

  const recientes = [
    { title: "TERRA VERDE SPA", date: "15 mar", type: "Marca" },
    { title: "LUMA TECNOLOGÍAS LTDA", date: "14 mar", type: "Marca" },
    { title: "SISTEMA FILTR. H2O", date: "14 mar", type: "Patente" },
    { title: "BÓRAX CLEAN PRODUCTS", date: "13 mar", type: "Marca" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
      <header className="h-[56px] border-b border-[#E5E7EB] flex items-center justify-between px-4 sticky top-0 bg-white z-40">
        <div className="flex items-center gap-2">
          <button onClick={() => router.back()} className="p-2 -ml-2 text-[#111827]">
            <ArrowLeft size={24} />
          </button>
          <span className="text-[17px] font-bold text-[#111827]">Diario Oficial</span>
        </div>
        <button className="p-2 text-[#1A56DB]">
          <Search size={20} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto pb-24 screen-enter">
        <div className="px-6 py-6 space-y-8">
          {/* SEARCH BOX */}
          <section className="space-y-4">
            <p className="text-label text-[#9CA3AF]">BUSCAR PUBLICACIÓN</p>
            <div className="relative">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
              <input 
                type="text" 
                placeholder="Nombre de marca, N° solicitud..."
                className="w-full h-[52px] bg-white border border-[#E5E7EB] rounded-xl pl-11 pr-4 text-[14px] font-sans shadow-sm focus:ring-2 ring-[#1A56DB] transition-all outline-none"
              />
            </div>
          </section>

          {/* FILTERS */}
          <section className="space-y-4">
            <p className="text-label text-[#9CA3AF]">FILTROS</p>
            <div className="space-y-3">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                <FilterPills 
                  options={[
                    { value: "marcas", label: "Marcas" },
                    { value: "patentes", label: "Patentes" },
                    { value: "disenos", label: "Diseños" },
                    { value: "todos", label: "Todos" }
                  ]}
                  activeValue={activeTab}
                  onChange={setActiveTab}
                />
              </div>
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                <FilterPills 
                  options={[
                    { value: "hoy", label: "Hoy" },
                    { value: "semana", label: "Esta semana" },
                    { value: "mes", label: "Este mes" },
                    { value: "personalizado", label: "Personalizado" }
                  ]}
                  activeValue={activeDate}
                  onChange={setActiveDate}
                />
              </div>
            </div>
          </section>

          {/* MIS PUBLICACIONES (Conditional) */}
          {userState === "active-urgent" && misPublicaciones.length > 0 && (
            <section className="space-y-4">
              <p className="text-label text-[#1A56DB]">MIS PUBLICACIONES</p>
              {misPublicaciones.map(pub => (
                <SemaphoreCard key={pub.id} urgency="info">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <StatusBadge variant="info" label={pub.estado} />
                        <h3 className="text-[16px] font-bold text-[#111827]">{pub.nombre}</h3>
                        <p className="text-mono text-[#4B5563]">Solicitud #{pub.id}</p>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] text-[#1A56DB] flex items-center justify-center">
                        <FileText size={20} />
                      </div>
                    </div>
                    <div className="space-y-1 pt-2 border-t border-[#E5E7EB]">
                      <div className="flex justify-between text-[12px]">
                        <span className="text-[#6B7280]">Publicado:</span>
                        <span className="font-semibold text-[#111827]">{pub.fecha}</span>
                      </div>
                      <div className="flex justify-between text-[12px]">
                        <span className="text-[#6B7280]">Período oposición:</span>
                        <span className="font-bold text-[#DC2626]">vence {pub.vence}</span>
                      </div>
                    </div>
                    <button className="w-full py-2.5 mt-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[13px] font-bold text-[#111827] flex items-center justify-center gap-2 active:bg-[#F3F4F6] transition-colors">
                      Ver publicación completa <ChevronRight size={16} />
                    </button>
                  </div>
                </SemaphoreCard>
              ))}
            </section>
          )}

          {/* PUBLICACIONES RECIENTES */}
          <section className="space-y-4">
            <p className="text-label text-[#9CA3AF]">PUBLICACIONES RECIENTES INAPI</p>
            <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden shadow-sm divide-y divide-[#E5E7EB]">
              {recientes.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 hover:bg-[#F9FAFB] active:bg-[#F3F4F6] transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-[11px] font-bold text-[#9CA3AF] w-12 shrink-0">{item.type}:</span>
                    <span className="text-[14px] font-bold text-[#111827] truncate">{item.title}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[12px] text-[#6B7280]">{item.date}</span>
                    <ChevronRight size={16} className="text-[#D1D5DB]" />
                  </div>
                </div>
              ))}
              <button className="w-full p-4 text-[13px] font-bold text-[#1A56DB] text-center hover:bg-[#EFF6FF] transition-colors">
                Ver más publicaciones →
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
