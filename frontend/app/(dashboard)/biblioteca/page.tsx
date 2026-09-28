"use client";

import { useState } from "react";
import {
  Search,
  Book,
  PlayCircle,
  FileText,
  ExternalLink,
  Download,
  Globe,
  Layers,
  ChevronRight,
} from "lucide-react";
import TopBar from "@/components/ui/TopBar";
import FilterPills from "@/components/ui/FilterPills";
import EmptyState from "@/components/ui/EmptyState";
import { bibliotecaMock, RecursoBiblioteca, RecursoCat } from "@/lib/mock/biblioteca";
import { clsx } from "clsx";

type CategoryId = "todas" | RecursoCat;

/* ─── Estilos por tipo de recurso ─────────────────────────────────── */
type TipoStyle = {
  iconBg: string;
  iconColor: string;
  icon: React.ReactNode;
  chipBg: string;
  chipText: string;
  chipLabel: string;
};

function getTipoStyle(tipo: string, categoria: string): TipoStyle {
  if (tipo === "video") {
    return {
      iconBg: "bg-danger-bg",
      iconColor: "text-danger",
      icon: <PlayCircle size={22} strokeWidth={2} />,
      chipBg: "bg-danger-bg",
      chipText: "text-danger",
      chipLabel: "VIDEO",
    };
  }
  if (tipo === "web") {
    return {
      iconBg: "bg-warning-bg",
      iconColor: "text-warning",
      icon: <Globe size={22} strokeWidth={2} />,
      chipBg: "bg-warning-bg",
      chipText: "text-warning",
      chipLabel: "WEB",
    };
  }
  if (tipo === "presentacion") {
    return {
      iconBg: "bg-success-bg",
      iconColor: "text-success",
      icon: <Layers size={22} strokeWidth={2} />,
      chipBg: "bg-success-bg",
      chipText: "text-success",
      chipLabel: "HERRAMIENTA",
    };
  }
  // pdf
  if (categoria === "guias") {
    return {
      iconBg: "bg-info-bg",
      iconColor: "text-info",
      icon: <FileText size={22} strokeWidth={2} />,
      chipBg: "bg-info-bg",
      chipText: "text-info",
      chipLabel: "GUÍA · PDF",
    };
  }
  return {
    iconBg: "bg-[#EEF2FF]",
    iconColor: "text-[#4F46E5]",
    icon: <FileText size={22} strokeWidth={2} />,
    chipBg: "bg-[#EEF2FF]",
    chipText: "text-[#4F46E5]",
    chipLabel: "PDF",
  };
}

/* ─── Tarjeta de recurso ───────────────────────────────────────────── */
function RecursoCard({
  recurso,
  onClick,
}: {
  recurso: RecursoBiblioteca;
  onClick: () => void;
}) {
  const style = getTipoStyle(recurso.tipo, recurso.categoria);
  const meta = recurso.tamaño ?? recurso.duracion ?? null;

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-start gap-4 rounded-xl border border-border bg-surface p-4 text-left shadow-sm hover:shadow-md active:bg-surface-elevated transition-all"
    >
      {/* Icono */}
      <div
        className={clsx(
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border",
          style.iconBg,
          style.iconColor,
          "border-border/60"
        )}
        aria-hidden
      >
        {style.icon}
      </div>

      {/* Contenido */}
      <div className="min-w-0 flex-1 space-y-2">
        {/* Chips */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={clsx(
              "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider",
              style.chipBg,
              style.chipText
            )}
          >
            {style.chipLabel}
          </span>
          {meta && (
            <span className="text-[11px] font-medium text-muted-secondary">
              {meta}
            </span>
          )}
        </div>

        {/* Nombre */}
        <p className="text-body-sm font-bold text-foreground leading-snug">
          {recurso.nombre}
        </p>

        {/* CTA texto */}
        <div className="flex items-center gap-1.5 pt-0.5">
          {recurso.accion === "descargar" ? (
            <Download size={14} className="text-primary shrink-0" aria-hidden />
          ) : (
            <ExternalLink size={14} className="text-primary shrink-0" aria-hidden />
          )}
          <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
            {recurso.accion === "descargar"
              ? "Descargar"
              : recurso.ctaLabel ?? "Ver ahora"}
          </span>
        </div>
      </div>

      <ChevronRight size={18} className="text-muted shrink-0 mt-0.5" aria-hidden />
    </button>
  );
}

/* ─── Página ───────────────────────────────────────────────────────── */
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

  const categoryShortcuts = [
    {
      id: "videos",
      label: "Videos",
      icon: <PlayCircle size={22} />,
      iconBg: "bg-danger-bg",
      iconColor: "text-danger",
    },
    {
      id: "guias",
      label: "Guías",
      icon: <Book size={22} />,
      iconBg: "bg-info-bg",
      iconColor: "text-info",
    },
    {
      id: "manuales",
      label: "Manuales",
      icon: <FileText size={22} />,
      iconBg: "bg-[#EEF2FF]",
      iconColor: "text-[#4F46E5]",
    },
    {
      id: "oficiales",
      label: "Oficiales",
      icon: <Globe size={22} />,
      iconBg: "bg-warning-bg",
      iconColor: "text-warning",
    },
  ] as const;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar variant="section" title="Biblioteca" />

      <div className="flex-1 overflow-y-auto pb-safe-bottomnav screen-enter">
        {/* Header */}
        <div className="px-6 pt-6 pb-2">
          <h1 className="text-h1 text-foreground">Centro de Recursos</h1>
          <p className="text-body-sm text-muted-secondary mt-1">
            Guías, manuales y material educativo sobre Propiedad Industrial
          </p>
        </div>

        {/* Search + Filters sticky */}
        <div className="sticky top-topbar z-30 bg-background/80 backdrop-blur-md px-6 py-4 space-y-4">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
              aria-hidden
            />
            <input
              type="text"
              placeholder="¿Qué estás buscando aprender?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[48px] bg-surface border border-border rounded-md pl-10 pr-4 text-body-sm font-sans input-gob transition-all outline-none shadow-sm"
            />
          </div>
          <FilterPills
            options={filterOptions}
            activeValue={activeFilter}
            onChange={(v) => setActiveFilter(v as CategoryId)}
          />
        </div>

        <div className="px-6 space-y-8 pb-6">
          {/* Shortcuts de categoría */}
          {activeFilter === "todas" && !searchQuery && (
            <div className="space-y-3">
              <p className="text-label text-muted">POR CATEGORÍA</p>
              <div className="grid grid-cols-4 gap-2">
                {categoryShortcuts.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveFilter(cat.id as CategoryId)}
                    className="flex flex-col items-center gap-2 rounded-xl border border-border bg-surface p-3 shadow-sm hover:shadow-md active:scale-95 transition-all"
                  >
                    <div
                      className={clsx(
                        "flex h-11 w-11 items-center justify-center rounded-xl border border-border/50",
                        cat.iconBg,
                        cat.iconColor
                      )}
                      aria-hidden
                    >
                      {cat.icon}
                    </div>
                    <span className="text-[11px] font-bold text-foreground leading-tight text-center">
                      {cat.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Lista de recursos */}
          <div className="space-y-3">
            <p className="text-label text-muted">RECURSOS DISPONIBLES</p>
            {filtered.length > 0 ? (
              filtered.map((res) => (
                <RecursoCard
                  key={res.id}
                  recurso={res}
                  onClick={() => handleRecursoClick(res)}
                />
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
