"use client";

import { useState } from "react";
import { Search, BookOpen, Lightbulb, PlayCircle, UserCheck, Download, Eye, SlidersHorizontal } from "lucide-react";
import TopBar from "@/components/ui/TopBar";
import { useRouter } from "next/navigation";
import { Toast, useToast } from "@/components/ui/Toast";
import {
  bibliotecaMock,
  RecursoBiblioteca,
  getBibliotecaByCategoria,
  searchBiblioteca,
  categoriasBiblioteca,
  RecursoCat,
} from "@/lib/mock/biblioteca";
import { clsx } from "clsx";

const catIcons: Record<RecursoCat, React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>> = {
  manuales: BookOpen,
  guias: Lightbulb,
  videos: PlayCircle,
  oficiales: UserCheck,
};

function RecursoItem({
  recurso,
  onDownload,
  onPlay,
}: {
  recurso: RecursoBiblioteca;
  onDownload: () => void;
  onPlay: () => void;
}) {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = async () => {
    setDownloaded(true);
    onDownload();
    setTimeout(() => setDownloaded(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-card p-3 flex items-center gap-3">
      {/* Type icon */}
      <div
        className="w-11 h-11 rounded-[8px] flex items-center justify-center shrink-0"
        style={{ background: recurso.iconBg }}
      >
        {recurso.tipo === "video" ? (
          <PlayCircle size={24} color={recurso.iconColor} />
        ) : recurso.tipo === "presentacion" ? (
          <SlidersHorizontal size={22} color={recurso.iconColor} />
        ) : (
          <BookOpen size={22} color={recurso.iconColor} />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="text-[11px] font-semibold bg-[#F3F4F6] text-[#4B5563] rounded px-1.5 py-0.5 uppercase">
            {recurso.tipoLabel}
          </span>
          <span className="text-[11px] text-[#9CA3AF]">
            {recurso.duracion ?? recurso.tamano}
          </span>
        </div>
        <p className="text-[13px] font-medium text-[#111827] leading-snug line-clamp-2">
          {recurso.titulo}
        </p>
      </div>

      {/* Action */}
      {recurso.tipo === "video" ? (
        <button
          onClick={onPlay}
          aria-label="Ver video"
          className="w-9 h-9 rounded-full bg-[#1E3A8A] text-white flex items-center justify-center shrink-0 hover:bg-[#1A56DB] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1A56DB]"
        >
          <Eye size={16} />
        </button>
      ) : (
        <button
          onClick={handleDownload}
          aria-label={downloaded ? "Descargado" : "Descargar"}
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-[#4B5563] hover:bg-[#F3F4F6] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1A56DB]"
        >
          {downloaded ? (
            <span className="text-[#059669] text-[16px]">✓</span>
          ) : (
            <Download size={18} />
          )}
        </button>
      )}
    </div>
  );
}

export default function BibliotecaPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<RecursoCat | null>(null);
  const { toast, showToast, dismissToast } = useToast();

  const recursos = query
    ? searchBiblioteca(query)
    : getBibliotecaByCategoria(activeCategory);

  const handleCategoryClick = (cat: RecursoCat) => {
    setActiveCategory((prev) => (prev === cat ? null : cat));
    setQuery("");
  };

  return (
    <>
      <TopBar
        variant="section"
        title="Biblioteca"
        subtitle="MiINAPI / Biblioteca"
        onBack={() => router.push("/inicio")}
      />

      <div className="px-4 pt-4 pb-6 space-y-5">
        {/* Search */}
        <div className="relative">
          <Search
            size={18}
            color="#9CA3AF"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
          />
          <input
            type="search"
            placeholder="Buscar manuales, guías, videos..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value) setActiveCategory(null);
            }}
            className="w-full h-11 rounded-[10px] bg-[#F3F4F6] pl-10 pr-4 text-[14px] text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#1A56DB]"
          />
        </div>

        {/* Categorías grid */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9CA3AF] mb-3">
            Categorías
          </p>
          <div className="grid grid-cols-2 gap-3">
            {categoriasBiblioteca.map((cat) => {
              const Icon = catIcons[cat.id];
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={clsx(
                    "rounded-[14px] p-4 flex flex-col items-center gap-2 transition-all duration-150 focus:outline-none",
                    isActive
                      ? "ring-2 ring-[#1A56DB] ring-offset-2 scale-[0.98]"
                      : "hover:scale-[0.98]"
                  )}
                  style={{ background: cat.iconBg }}
                >
                  <Icon size={32} color={cat.iconColor} strokeWidth={1.5} />
                  <span
                    className="text-[12px] font-semibold"
                    style={{ color: cat.iconColor }}
                  >
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recursos */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9CA3AF]">
              {activeCategory
                ? categoriasBiblioteca.find((c) => c.id === activeCategory)?.label
                : "Recursos Recientes"}
            </p>
            <button className="text-[13px] text-[#1A56DB] font-medium focus:outline-none focus:underline">
              Ver todo
            </button>
          </div>

          {recursos.length === 0 ? (
            <p className="text-center text-[#9CA3AF] py-8 text-[14px]">
              No hay recursos que coincidan con tu búsqueda
            </p>
          ) : (
            <div className="space-y-3">
              {recursos.map((recurso) => (
                <RecursoItem
                  key={recurso.id}
                  recurso={recurso}
                  onDownload={() => showToast("success", "Descarga iniciada")}
                  onPlay={() => showToast("info", "Reproduciendo video...")}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {toast && (
        <Toast type={toast.type} message={toast.message} onDismiss={dismissToast} />
      )}
    </>
  );
}
