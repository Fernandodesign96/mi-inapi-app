"use client";

import { useState } from "react";
import { Search, Book, PlayCircle, FileText, ExternalLink, Download } from "lucide-react";
import TopBar from "@/components/ui/TopBar";
import StatusBadge from "@/components/ui/StatusBadge";
import FilterPills from "@/components/ui/FilterPills";
import SemaphoreCard from "@/components/ui/SemaphoreCard";
import EmptyState from "@/components/ui/EmptyState";
import { bibliotecaMock, RecursoBiblioteca, RecursoCat } from "@/lib/mock/biblioteca";
import { clsx } from "clsx";

type CategoryId = "todas" | RecursoCat;

const guideCategories = [
  { id: "marcas", label: "Marcas", icon: <Book size={24} />, bg: "bg-info-bg", color: "text-primary" },
  { id: "patentes", label: "Patentes", icon: <FileText size={24} />, bg: "bg-success-bg", color: "text-success" },
];

export default function BibliotecaPage() {
  const [activeFilter, setActiveFilter] = useState<CategoryId>("todas");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = bibliotecaMock.filter((r) => {
    const matchesFilter = activeFilter === "todas" || r.categoria === activeFilter;
    const matchesSearch = r.nombre.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleRecursoClick = (recurso: RecursoBiblioteca) => {
    window.open(recurso.url, "_blank", "noopener,noreferrer");
  };

  const filterOptions = [
    { value: "todas", label: "Todas" },
    { value: "manuales", label: "Manuales" },
    { value: "guias", label: "Guías" },
    { value: "videos", label: "Videos" },
    { value: "oficiales", label: "Oficiales" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar variant="section" title="Biblioteca" />

      <div className="flex-1 overflow-y-auto pb-safe-bottomnav screen-enter">
        <div className="px-6 pt-6 pb-2">
          <h1 className="text-h1 text-foreground">Centro de Recursos</h1>
          <p className="text-body-sm text-muted-secondary mt-1">
            Guías, manuales y material educativo sobre Propiedad Industrial
          </p>
        </div>

        <div className="sticky top-topbar z-30 bg-background/80 backdrop-blur-md px-6 py-4 space-y-4">
          <div className="relative">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="¿Qué estás buscando aprender?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[48px] bg-surface border border-border rounded-md pl-10 pr-4 text-body-sm font-sans focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all outline-none shadow-sm"
            />
          </div>
          <FilterPills
            options={filterOptions}
            activeValue={activeFilter}
            onChange={(v) => setActiveFilter(v as CategoryId)}
          />
        </div>

        <div className="px-6 space-y-8">
          {activeFilter === "todas" && !searchQuery && (
            <div className="space-y-4">
              <p className="text-label text-muted">POR TIPO DE TRÁMITE</p>
              <div className="grid grid-cols-2 gap-3">
                {guideCategories.map((cat) => (
                  <button
                    key={cat.id}
                    className={clsx(
                      "p-4 rounded-lg border border-border bg-surface flex flex-col items-center justify-center gap-3 shadow-sm active:scale-95 transition-all text-center"
                    )}
                  >
                    <div className={clsx("w-12 h-12 rounded-full flex items-center justify-center", cat.bg, cat.color)}>
                      {cat.icon}
                    </div>
                    <span className="text-body-sm font-bold text-foreground">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4">
            <p className="text-label text-muted">RECURSOS DISPONIBLES</p>
            {filtered.length > 0 ? (
              filtered.map((res) => (
                <SemaphoreCard key={res.id} urgency="info">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-3">
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <StatusBadge
                            variant={res.tipo === "video" ? "info" : "success"}
                            label={res.tipo.toUpperCase()}
                          />
                          {res.tamaño && <span className="text-timestamp">{res.tamaño}</span>}
                          {res.duracion && <span className="text-timestamp">{res.duracion}</span>}
                        </div>
                        <h3 className="text-h3 font-bold text-foreground">{res.nombre}</h3>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-surface-elevated flex items-center justify-center text-muted shrink-0">
                        {res.tipo === "video" ? <PlayCircle size={20} /> : <FileText size={20} />}
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => handleRecursoClick(res)}
                        aria-label={`${res.ctaLabel || "Descargar"} ${res.nombre}`}
                        className="text-body-xs font-bold text-primary flex items-center gap-1.5 uppercase tracking-wider"
                      >
                        {res.accion === "descargar" ? (
                          <>
                            <Download size={18} /> Descargar
                          </>
                        ) : (
                          <>
                            <ExternalLink size={18} /> {res.ctaLabel || "Ver ahora"}
                          </>
                        )}
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
