"use client";

import { useState } from "react";
import { Search, Download, FileText } from "lucide-react";
import TopBar from "@/components/ui/TopBar";
import Toast from "@/components/ui/Toast";
import CTAButton from "@/components/ui/CTAButton";
import StatusBadge from "@/components/ui/StatusBadge";
import SemaphoreCard from "@/components/ui/SemaphoreCard";
import FilterPills from "@/components/ui/FilterPills";
import EmptyState from "@/components/ui/EmptyState";

type FilterType = "todos" | "marcas" | "patentes" | "diseños";

interface Certificate {
  id: string;
  name: string;
  type: string;
  typeLabel: FilterType;
  registration: string;
  emission: string;
}

const mockCertificados: Certificate[] = [
  { id: "1", name: "Aura Cosmetics", type: "Marca Comercial", typeLabel: "marcas", registration: "1234567", emission: "12 MAR 2024" },
  { id: "2", name: "Eco-Tech Solutions", type: "Marca Comercial", typeLabel: "marcas", registration: "7654321", emission: "05 ENE 2024" },
  { id: "3", name: "Turbina Eólica v2", type: "Patente de Inv.", typeLabel: "patentes", registration: "9988776", emission: "20 OCT 2023" },
  { id: "4", name: "Envase Sustentable", type: "Diseño Industrial", typeLabel: "diseños", registration: "5544332", emission: "15 SEP 2023" },
];

export default function CertificadosPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const filtered = mockCertificados.filter(c => {
    const matchesFilter = activeFilter === 'todos' || c.typeLabel === activeFilter;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         c.registration.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  const handleDownload = (id: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      setToast({ message: "Certificado descargado con éxito", type: "success" });
    }, 1500);
  };

  const filterOptions = [
    { value: "todos", label: "Todos" },
    { value: "marcas", label: "Marcas" },
    { value: "patentes", label: "Patentes" },
    { value: "diseños", label: "Diseños" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
      <TopBar variant="section" title="Certificados" />

      <div className="flex-1 overflow-y-auto pb-24 screen-enter">
        {/* Header Block */}
        <div className="px-6 pt-6 pb-2">
          <h1 className="text-h1 text-[#111827]">Títulos y Registros</h1>
          <p className="text-body-sm text-[#4B5563] mt-1">
            Descarga tus certificados con firma electrónica avanzada.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="sticky top-[56px] z-30 bg-[#F9FAFB]/80 backdrop-blur-md px-6 py-4 space-y-4">
          <div className="relative">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
            <input 
              type="text" 
              placeholder="Buscar por nombre o registro..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[48px] bg-white border border-[#E5E7EB] rounded-[10px] pl-10 pr-4 text-[14px] font-sans focus:border-[#1A56DB] transition-all outline-none shadow-sm"
            />
          </div>
          <FilterPills
            options={filterOptions}
            activeValue={activeFilter}
            onChange={(v) => setActiveFilter(v as FilterType)}
          />
        </div>

        {/* List */}
        <div className="px-6 space-y-4">
          {filtered.length > 0 ? (
            filtered.map((cert) => (
              <SemaphoreCard key={cert.id} urgency="neutral">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#F3F4F6] flex items-center justify-center shrink-0">
                      <FileText size={24} className="text-[#9CA3AF]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-label text-[#9CA3AF]">{cert.type}</span>
                        <StatusBadge variant="success" label="VIGENTE" />
                      </div>
                      <h3 className="text-[16px] font-bold text-[#111827] mt-[2px] truncate uppercase">
                        {cert.name}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-[#9CA3AF] uppercase">N° REGISTRO</span>
                      <span className="text-mono text-[#111827]">{cert.registration}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-[#9CA3AF] uppercase">EMISIÓN</span>
                      <p className="text-timestamp font-bold text-[#4B5563]">{cert.emission}</p>
                    </div>
                  </div>

                  <CTAButton 
                    label="Descargar Certificado"
                    variant="primary-dark"
                    fullWidth
                    size="md"
                    isLoading={downloadingId === cert.id}
                    onClick={() => handleDownload(cert.id)}
                    icon={<Download size={18} />}
                  />
                </div>
              </SemaphoreCard>
            ))
          ) : (
            <EmptyState
              icon={FileText}
              title="No hay certificados"
              description="No encontramos certificados vigentes que coincidan con tu búsqueda."
            />
          )}
        </div>
      </div>

      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type}
          onDismiss={() => setToast(null)} 
        />
      )}
    </div>
  );
}
