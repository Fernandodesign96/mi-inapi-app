"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Clock, ChevronRight, Tag, Lightbulb, Palette } from "lucide-react";
import { motion } from "framer-motion";
import TopBar from "@/components/ui/TopBar";
import SemaphoreCard from "@/components/ui/SemaphoreCard";
import StepperProgress from "@/components/ui/StepperProgress";
import StatusBadge from "@/components/ui/StatusBadge";
import FilterPills from "@/components/ui/FilterPills";
import EmptyState from "@/components/ui/EmptyState";
import { useAppStore } from "@/lib/store";
import { useSessionSolicitudes } from "@/lib/sessionData";
import { getStepStatesForSolicitud, tipoDerechoLabel } from "@/lib/etapasMiInapi";
import { badgeLabelForSolicitud } from "@/lib/tramitePresentacion";
import TramiteCopyStack from "@/components/ui/TramiteCopyStack";
import type { Solicitud } from "@/lib/mockData";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const PORTAL_SOLICITUD_MARCA =
  "https://tramites.inapi.cl/Trademark/TrademarkApplication/IndexTrademark";

type FilterType = "todas" | "marca" | "patente" | "diseño";
type UrgencyType = "danger" | "warning" | "info" | "success" | "neutral";

const filterOptions = [
  { value: "todas", label: "Todas" },
  { value: "marca", label: "Marcas" },
  { value: "patente", label: "Patentes" },
  { value: "diseño", label: "Diseños" },
];

export default function SolicitudesPage() {
  const router = useRouter();
  const { userState, loginMode } = useAppStore();
  const [activeFilter, setActiveFilter] = useState<FilterType>("todas");
  const baseSolicitudes = useSessionSolicitudes();
  const reduced = usePrefersReducedMotion();

  const filteredSolicitudes = baseSolicitudes
    .filter((s) => {
      if (loginMode !== "inapi" && userState === "new") return false;
      if (activeFilter === "todas") return true;
      return s.tipo === activeFilter;
    })
    .sort((a, b) => {
      const order: Record<UrgencyType, number> = {
        danger: 0,
        warning: 1,
        info: 2,
        success: 3,
        neutral: 4,
      };
      return order[a.urgency as UrgencyType] - order[b.urgency as UrgencyType];
    });

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar variant="section" title="Solicitudes" />

      <div className="flex-1 overflow-y-auto pb-safe-bottomnav screen-enter">
        <div className="px-6 pt-6 pb-2">
          <h1 className="text-h1 text-foreground">Seguimiento de tus solicitudes</h1>
          <p className="text-body-sm text-muted-secondary mt-1">
            Revisa el estado de tus registros en tiempo real
          </p>
        </div>

        <div className="sticky top-topbar z-30 bg-background/80 backdrop-blur-md px-6 py-4">
          <FilterPills
            options={filterOptions}
            activeValue={activeFilter}
            onChange={(v) => setActiveFilter(v as FilterType)}
          />
        </div>

        <div className="px-6 space-y-4">
          {filteredSolicitudes.length > 0 ? (
            filteredSolicitudes.map((solicitud, index) => (
              <motion.div
                key={solicitud.id}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduced ? 0 : index * 0.04, duration: 0.2 }}
              >
                <SemaphoreCard
                  urgency={solicitud.urgency as UrgencyType}
                  onClick={() => router.push(`/solicitudes/${solicitud.id}`)}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex flex-wrap items-center gap-2 min-w-0">
                        <StatusBadge
                          variant={solicitud.urgency as UrgencyType}
                          label={badgeLabelForSolicitud(solicitud)}
                        />
                        <DerechoChip tipo={solicitud.tipo} />
                      </div>
                      <span className="text-timestamp shrink-0 mt-1">
                        Actualizado ayer
                      </span>
                    </div>
                    <h3 className="text-h3 text-foreground">
                      {solicitud.nombre}
                    </h3>
                    <TramiteCopyStack
                      solicitud={solicitud}
                      order="solicitudes"
                      showNumero
                      className="w-full"
                    />

                    <StepperProgress
                      stepStates={getStepStatesForSolicitud(solicitud)}
                      urgency={solicitud.urgency}
                    />

                    <div className="flex items-center justify-end gap-2 pt-1 text-muted-secondary">
                      <Clock size={14} className="text-muted" />
                      <span className="text-[12px] font-medium">
                        {solicitud.fechaPresentacion
                          ? `Presentada el ${solicitud.fechaPresentacion}`
                          : solicitud.estimacion}
                      </span>
                      <ChevronRight size={16} className="text-muted" />
                    </div>
                  </div>
                </SemaphoreCard>
              </motion.div>
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

function DerechoChip({ tipo }: { tipo: Solicitud["tipo"] }) {
  const Icon =
    tipo === "marca" ? Tag : tipo === "patente" ? Lightbulb : Palette;
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-surface-elevated px-2 py-0.5 text-[11px] font-medium text-muted-secondary">
      <Icon size={12} strokeWidth={2.25} aria-hidden />
      {tipoDerechoLabel(tipo)}
    </span>
  );
}
