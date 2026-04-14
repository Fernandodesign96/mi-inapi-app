"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Clock, ChevronRight } from "lucide-react";
import SemaphoreCard from "@/components/ui/SemaphoreCard";
import StepperProgress, { getStepStates } from "@/components/ui/StepperProgress";
import StatusBadge from "@/components/ui/StatusBadge";
import FilterPills from "@/components/ui/FilterPills";
import EmptyState from "@/components/ui/EmptyState";
import { useAppStore } from "@/lib/store";
import { mockTramitesUrgent, mockTramitesNoUrgent } from "@/lib/mockData";

type FilterType = "todas" | "marca" | "patente" | "diseño";
type UrgencyType = "danger" | "warning" | "info" | "success";

const filterOptions = [
  { value: "todas", label: "Todas" },
  { value: "marca", label: "Marcas" },
  { value: "patente", label: "Patentes" },
  { value: "diseño", label: "Diseños" },
];

const getBadgeLabel = (urgency: string, etapa: string, notificacionEtapa?: string) => {
  if (urgency === 'danger') return 'Acción urgente';
  if (urgency === 'warning') {
    const et = notificacionEtapa || etapa || '';
    return et.toLowerCase().includes('fondo') || et === 'RESOLUCION' ? 'Corrección de Fondo' : 'Corrección de Forma';
  }
  if (urgency === 'info') return 'En revisión';
  if (urgency === 'success') return 'Finalizada';
  return 'En revisión';
};

export default function SolicitudesPage() {
  const router = useRouter();
  const { userState } = useAppStore();
  const [activeFilter, setActiveFilter] = useState<FilterType>("todas");

  const baseSolicitudes = userState === 'active-no-urgent' ? mockTramitesNoUrgent : mockTramitesUrgent;

  const filteredSolicitudes = baseSolicitudes
    .filter((s) => {
      // 1. State-based filtering
      if (userState === 'new') return false;

      // 2. Category filtering
      if (activeFilter === "todas") return true;
      return s.tipo === activeFilter;
    })
    .sort((a, b) => {
      const order: Record<UrgencyType, number> = { danger: 0, warning: 1, info: 2, success: 3 };
      return order[a.urgency as UrgencyType] - order[b.urgency as UrgencyType];
    });

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
      <div className="flex-1 overflow-y-auto pb-24 screen-enter">
        {/* Header Block */}
        <div className="px-6 pt-6 pb-2">
          <h1 className="text-h1 text-[#111827]">Seguimiento</h1>
          <p className="text-body-sm text-[#4B5563] mt-1">
            Revisa el estado de tus registros en tiempo real
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

        {/* List */}
        <div className="px-6 space-y-4">
          {filteredSolicitudes.length > 0 ? (
            filteredSolicitudes.map((solicitud) => (
              <SemaphoreCard 
                key={solicitud.id} 
                urgency={solicitud.urgency as UrgencyType}
                onClick={() => router.push(`/solicitudes/${solicitud.id}`)}
              >
                <div className="space-y-4">
                  {/* Header Row */}
                  <div className="flex justify-between items-start gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <StatusBadge 
                          variant={solicitud.urgency as UrgencyType} 
                          label={getBadgeLabel(solicitud.urgency, solicitud.etapa, solicitud.notificacion?.etapa)} 
                        />
                      </div>
                      <h3 className="text-h3 text-[#111827]">
                        {solicitud.nombre}
                      </h3>
                    </div>
                    <span className="text-timestamp shrink-0 mt-1">Actualizado ayer</span>
                  </div>

                  {/* Stepper */}
                  <StepperProgress 
                    stepStates={getStepStates(solicitud.estado)}
                    urgency={solicitud.urgency as "danger" | "warning" | "info" | "success"}
                  />

                  {/* Footer Info Row */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB]">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-[#9CA3AF] uppercase">N° SOLICITUD</span>
                      <span className="text-mono text-[#111827]">#{solicitud.id}</span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-[#4B5563]">
                        <Clock size={14} className="text-[#9CA3AF]" />
                        <span className="text-body-xs font-medium">{solicitud.estimacion}</span>
                      </div>
                      <ChevronRight size={18} className="text-[#9CA3AF]" />
                    </div>
                  </div>
                </div>
              </SemaphoreCard>
            ))
          ) : (
            <EmptyState
              icon={Search}
              title={`Sin solicitudes de ${activeFilter}`}
              description="No encontramos registros activos en esta categoría. Puedes ingresar uno nuevo en el portal."
              action={{
                label: "Ir al portal INAPI",
                onClick: () => window.open('https://www.inapi.cl', '_blank')
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
