"use client";

import { useState } from "react";
import { Search, Book, PlayCircle, Download, FileText, ExternalLink } from "lucide-react";
import TopBar from "@/components/ui/TopBar";
import StatusBadge from "@/components/ui/StatusBadge";
import FilterPills from "@/components/ui/FilterPills";
import SemaphoreCard from "@/components/ui/SemaphoreCard";
import CTAButton from "@/components/ui/CTAButton";
import EmptyState from "@/components/ui/EmptyState";
import { clsx } from "clsx";

type CategoryId = "todas" | "manuales" | "guias" | "videos" | "legales";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: "PDF" | "Video" | "Link";
  category: CategoryId;
  size?: string;
  image?: string;
}

const mockResources: Resource[] = [
  { id: "r1", title: "Manual de Marcas 2024", description: "Todo lo que necesitas saber para registrar tu marca en Chile.", type: "PDF", category: "manuales", size: "2.4 MB" },
  { id: "r2", title: "Cómo proteger tu invento", description: "Video guía sobre el proceso de patentamiento nacional.", type: "Video", category: "videos" },
  { id: "r3", title: "Guía de Diseño Industrial", description: "Aspectos clave para proteger la apariencia de tus productos.", type: "PDF", category: "guias", size: "1.8 MB" },
  { id: "r4", title: "Ley de Propiedad Ind.", description: "Texto oficial de la Ley 19.039 y sus modificaciones.", type: "PDF", category: "legales", size: "1.2 MB" },
];

const guideCategories = [
  { id: "marcas", label: "Marcas", icon: <Book size={24} />, bg: "bg-[#DBEAFE]", color: "text-[#1A56DB]" },
  { id: "patentes", label: "Patentes", icon: <FileText size={24} />, bg: "bg-[#D1FAE5]", color: "text-[#059669]" },
];

export default function BibliotecaPage() {
  const [activeFilter, setActiveFilter] = useState<CategoryId>("todas");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = mockResources.filter(r => {
    const matchesFilter = activeFilter === 'todas' || r.category === activeFilter;
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filterOptions = [
    { value: "todas", label: "Todas" },
    { value: "manuales", label: "Manuales" },
    { value: "guias", label: "Guías" },
    { value: "videos", label: "Videos" },
    { value: "legales", label: "Legales" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
      <TopBar variant="section" title="Biblioteca" />

      <div className="flex-1 overflow-y-auto pb-24 screen-enter">
        {/* Header Block */}
        <div className="px-6 pt-6 pb-2">
          <h1 className="text-h1 text-[#111827]">Centro de Recursos</h1>
          <p className="text-body-sm text-[#4B5563] mt-1">
            Guías, manuales y material educativo sobre Propiedad Industrial
          </p>
        </div>

        {/* Search and Filters */}
        <div className="sticky top-[56px] z-30 bg-[#F9FAFB]/80 backdrop-blur-md px-6 py-4 space-y-4">
          <div className="relative">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
            <input 
              type="text" 
              placeholder="¿Qué estás buscando aprender?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[48px] bg-white border border-[#E5E7EB] rounded-[10px] pl-10 pr-4 text-[14px] font-sans focus:border-[#1A56DB] transition-all outline-none shadow-sm"
            />
          </div>
          <FilterPills
            options={filterOptions}
            activeValue={activeFilter}
            onChange={(v) => setActiveFilter(v as CategoryId)}
          />
        </div>

        <div className="px-6 space-y-8">
          {/* Quick Access Categories */}
          {activeFilter === "todas" && !searchQuery && (
            <div className="space-y-4">
              <p className="text-label text-[#9CA3AF]">POR TIPO DE TRÁMITE</p>
              <div className="grid grid-cols-2 gap-3">
                {guideCategories.map(cat => (
                  <button
                    key={cat.id}
                    className={clsx(
                      "p-4 rounded-[14px] border border-[#E5E7EB] bg-white flex flex-col items-center justify-center gap-3 shadow-sm active:scale-95 transition-all text-center"
                    )}
                  >
                    <div className={clsx("w-12 h-12 rounded-full flex items-center justify-center", cat.bg, cat.color)}>
                      {cat.icon}
                    </div>
                    <span className="text-[14px] font-bold text-[#111827]">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Resource List */}
          <div className="space-y-4">
            <p className="text-label text-[#9CA3AF]">RECURSOS DISPONIBLES</p>
            {filtered.length > 0 ? (
              filtered.map((res) => (
                <SemaphoreCard key={res.id} urgency="info">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-3">
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <StatusBadge 
                            variant={res.type === 'Video' ? 'info' : 'success'} 
                            label={res.type} 
                          />
                          {res.size && <span className="text-timestamp">{res.size}</span>}
                        </div>
                        <h3 className="text-[16px] font-bold text-[#111827] truncate">
                          {res.title}
                        </h3>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-[#F3F4F6] flex items-center justify-center text-[#9CA3AF] shrink-0">
                        {res.type === 'Video' ? <PlayCircle size={20} /> : <FileText size={20} />}
                      </div>
                    </div>
                    
                    <p className="text-body-xs text-[#4B5563] leading-relaxed">
                      {res.description}
                    </p>

                    <div className="pt-2 flex justify-end">
                      <button className="text-[12px] font-bold text-[#1A56DB] flex items-center gap-1.5 uppercase tracking-wider">
                        {res.type === 'Video' ? 'Ver ahora' : 'Leer más'}
                        <ExternalLink size={14} />
                      </button>
                    </div>
                  </div>
                </SemaphoreCard>
              ))
            ) : (
              <EmptyState
                icon={Book}
                title="Sin resultados"
                description="No encontramos recursos que coincidan con tu búsqueda."
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
