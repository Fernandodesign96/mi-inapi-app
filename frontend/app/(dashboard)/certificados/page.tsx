"use client";

import { useState } from "react";
import { Search, Download, CheckSquare, Lightbulb, Palette } from "lucide-react";
import TopBar from "@/components/ui/TopBar";
import FilterPills from "@/components/ui/FilterPills";
import StatusBadge from "@/components/ui/StatusBadge";
import CTAButton from "@/components/ui/CTAButton";
import { Toast, useToast } from "@/components/ui/Toast";
import EmptyState from "@/components/ui/EmptyState";
import {
  certificadosMock,
  Certificado,
  getCertificadosByTipo,
  searchCertificados,
  CertificadoTipo,
} from "@/lib/mock/certificados";

type FilterTipo = "todos" | CertificadoTipo;

const tipoIcon: Record<CertificadoTipo, React.ComponentType<{ size?: number; color?: string }>> = {
  marca: CheckSquare,
  patente: Lightbulb,
  diseno: Palette,
};

function CertificadoCard({
  cert,
  onDownload,
}: {
  cert: Certificado;
  onDownload: (id: string) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const Icon = tipoIcon[cert.tipo];

  const handle = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setDone(true);
    onDownload(cert.id);
    setTimeout(() => setDone(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-card p-4 space-y-3">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: cert.iconBg }}
        >
          <Icon size={24} color={cert.iconColor} />
        </div>
        <div className="flex-1 min-w-0">
          <StatusBadge
            variant={
              cert.tipo === "marca" ? "info" : cert.tipo === "patente" ? "info" : "success"
            }
            label={cert.tipoLabel}
          />
          <h3 className="text-[16px] font-bold text-[#111827] mt-1 leading-tight uppercase tracking-wide">
            {cert.nombre}
          </h3>
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-[13px] text-[#9CA3AF]">
          Registro: {cert.registro}
        </span>
        {cert.emision && (
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#9CA3AF]">
            Emisión: {cert.emision}
          </span>
        )}
      </div>

      {/* CTA */}
      <button
        onClick={handle}
        disabled={loading}
        className="w-full h-11 rounded-full bg-[#1E3A8A] text-white font-semibold text-[14px] flex items-center justify-center gap-2 transition-all hover:bg-[#173280] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#1A56DB] disabled:opacity-60"
      >
        {loading ? (
          <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
        ) : done ? (
          <>✓ Descargando...</>
        ) : (
          <>
            <Download size={16} />
            Descargar PDF
          </>
        )}
      </button>
    </div>
  );
}

export default function CertificadosPage() {
  const [filterTipo, setFilterTipo] = useState<FilterTipo>("todos");
  const [query, setQuery] = useState("");
  const { toast, showToast, dismissToast } = useToast();

  const filtered = query
    ? searchCertificados(query)
    : getCertificadosByTipo(filterTipo === "todos" ? "todos" : filterTipo);

  return (
    <>
      <TopBar variant="home" title="Certificados Digitales" />

      <div className="px-4 pt-4 pb-6 space-y-4">
        <div>
          <h1 className="text-[24px] font-bold text-[#111827]">
            Certificados Digitales
          </h1>
          <p className="text-[14px] text-[#4B5563]">
            Descarga tus registros y títulos vigentes con firma electrónica.
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search
            size={18}
            color="#9CA3AF"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
          />
          <input
            type="search"
            placeholder="Buscar marca o registro..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-11 rounded-[10px] bg-[#F3F4F6] pl-10 pr-4 text-[14px] text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#1A56DB]"
          />
        </div>

        {/* Filter pills */}
        <FilterPills
          options={[
            { value: "todos", label: "Todos" },
            { value: "marca", label: "Marcas" },
            { value: "patente", label: "Patentes" },
            { value: "diseno", label: "Diseños" },
          ]}
          activeValue={filterTipo}
          onChange={(v) => {
            setFilterTipo(v as FilterTipo);
            setQuery("");
          }}
        />

        {/* Cards */}
        {filtered.length === 0 ? (
          <EmptyState
            icon={<Search size={32} />}
            title="Sin resultados"
            description="No encontramos certificados con ese criterio. Intenta con otro nombre o número de registro."
            action={{ label: "Ver todos", onClick: () => { setQuery(""); setFilterTipo("todos"); } }}
          />
        ) : (
          <div className="space-y-3">
            {filtered.map((cert) => (
              <CertificadoCard
                key={cert.id}
                cert={cert}
                onDownload={() => showToast("info", "Descargando certificado...")}
              />
            ))}
          </div>
        )}
      </div>

      {toast && (
        <Toast type={toast.type} message={toast.message} onDismiss={dismissToast} />
      )}
    </>
  );
}
