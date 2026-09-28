"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Clock, ChevronRight } from "lucide-react";
import TopBar from "@/components/ui/TopBar";
import SemaphoreCard from "@/components/ui/SemaphoreCard";
import StepperProgress, { getStepStates } from "@/components/ui/StepperProgress";
import StatusBadge from "@/components/ui/StatusBadge";
import FilterPills from "@/components/ui/FilterPills";
import EmptyState from "@/components/ui/EmptyState";
import { useAppStore } from "@/lib/store";
import { mockTramitesUrgent, mockTramitesNoUrgent } from "@/lib/mockData";

const PORTAL_SOLICITUD_MARCA =
  "https://tramites.inapi.cl/Trademark/TrademarkApplication/IndexTrademark";

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
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar variant="section" title="Solicitudes" />

      <div className="flex-1 overflow-y-auto pb-safe-bottomnav screen-enter">
        {/* Header Block */}
        <div className="px-6 pt-6 pb-2">
          <h1 className="text-h1 text-foreground">Seguimiento de tus solicitudes</h1>
          <p className="text-body-sm text-muted-secondary mt-1">
            Revisa el estado de tus trámites
          </p>
        </div>

        {/* Filters Sticky Overlay */}
        <div className="sticky top-topbar z-30 bg-background/80 backdrop-blur-md px-6 py-4">
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
                      <h3 className="text-h3 text-foreground">
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
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex flex-col">
                      <span className="text-body-xs font-bold text-muted uppercase">N° SOLICITUD</span>
                      <span className="text-mono text-foreground">#{solicitud.id}</span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-muted-secondary">
                        <Clock size={14} className="text-muted" />
                        <span className="text-body-xs font-medium">{solicitud.estimacion}</span>
                      </div>
                      <ChevronRight size={18} className="text-muted" />
                    </div>
                  </div>
                </div>
              </SemaphoreCard>
            ))
          ) : (
            <EmptyState
              icon={Search}
              title="Por el momento no tienes registrada ninguna solicitud en INAPI"
              description={
                <>
                  No hemos encontrado ninguna solicitud asociada a tu usuario.
                  Puedes comenzar una nueva solicitud haciendo{" "}
                  <a
                    href={PORTAL_SOLICITUD_MARCA}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-primary underline underline-offset-2"
                  >
                    click aquí
                  </a>
                  .
                </>
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
