"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FileText } from "lucide-react";
import { motion } from "framer-motion";
import TopBar from "@/components/ui/TopBar";
import CollapsibleCard from "@/components/ui/CollapsibleCard";
import StatusBadge from "@/components/ui/StatusBadge";
import FilterPills from "@/components/ui/FilterPills";
import CTAButton from "@/components/ui/CTAButton";
import SkeletonCard from "@/components/ui/SkeletonCard";
import { InfoGroups } from "@/components/ui/InfoGroups";
import { useAppStore } from "@/lib/store";
import { getSolicitudById } from "@/lib/mockData";
import { useSessionNotificaciones } from "@/lib/sessionData";
import {
  LABEL_VER_DETALLE_SOLICITUD,
  ctaVariantForSemaphore,
} from "@/lib/featureFlags";
import { badgeLabelForSolicitud } from "@/lib/tramitePresentacion";
import {
  estadoCiudadano,
  etapaCiudadanaFromSolicitud,
  subetapaCiudadana,
} from "@/lib/etapasMiInapi";
import TramiteCopyStack from "@/components/ui/TramiteCopyStack";
import PdfPreviewOverlay from "@/components/ui/PdfPreviewOverlay";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type FilterType = "todas" | "urgente" | "info" | "exito";
type UrgencyType = "danger" | "warning" | "info" | "success" | "neutral";

const filterOptions = [
  { value: "todas", label: "Todas" },
  { value: "urgente", label: "Urgentes" },
  { value: "info", label: "Informativas" },
  { value: "exito", label: "Éxito" },
];

const getBadgeLabel = (
  urgency: UrgencyType,
  solicitudVinculada?: ReturnType<typeof getSolicitudById>
) => {
  if (solicitudVinculada) return badgeLabelForSolicitud(solicitudVinculada);
  if (urgency === "danger" || urgency === "warning") return "Acción urgente";
  if (urgency === "success") return "Notificación de éxito";
  return "Notificación informativa";
};

export default function NotificacionesPage() {
  const router = useRouter();
  const { userState, loginMode } = useAppStore();
  const sessionNotifs = useSessionNotificaciones();
  const reduced = usePrefersReducedMotion();
  const [activeFilter, setActiveFilter] = useState<FilterType>("todas");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [resolucionId, setResolucionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredNotifs = sessionNotifs.filter((n) => {
    if (loginMode !== "inapi" && userState === "new") return false;
    if (activeFilter === "todas") return true;
    if (activeFilter === "urgente") return n.urgency === "danger" || n.urgency === "warning";
    if (activeFilter === "info") return n.urgency === "info" || n.urgency === "neutral";
    if (activeFilter === "exito") return n.urgency === "success";
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar variant="section" title="Notificaciones" />

      <div className="flex-1 overflow-y-auto pb-safe-bottomnav screen-enter">
        <div className="px-6 pt-6 pb-2">
          <h1 className="text-h1 text-foreground">Notificaciones de tus trámites</h1>
          <p className="text-body-sm text-muted-secondary mt-1">
            Consulta avisos y el detalle de tus trámites. Las gestiones pendientes se realizan en los canales oficiales de INAPI.
          </p>
        </div>

        <div className="sticky top-topbar z-30 bg-background/80 backdrop-blur-md px-6 py-4">
          <FilterPills
            options={filterOptions}
            activeValue={activeFilter}
            onChange={(v) => setActiveFilter(v as FilterType)}
          />
        </div>

        <div className="px-6 space-y-3">
          {isLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            <>
              {filteredNotifs.map((notif, index) => {
                const isOpen = expandedId === notif.id;
                const solicitudVinculada = notif.solicitudId
                  ? getSolicitudById(notif.solicitudId)
                  : undefined;
                const cardUrgency = (solicitudVinculada?.urgency ??
                  notif.urgency) as UrgencyType;
                const detalleFuente =
                  notif.detalle ?? solicitudVinculada?.notificacion;
                const estadoChip = estadoCiudadano(
                  solicitudVinculada?.estadoUnificado
                );

                return (
                  <motion.div
                    key={notif.id}
                    initial={reduced ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduced ? 0 : index * 0.04, duration: 0.2 }}
                  >
                    <CollapsibleCard
                      variant={cardUrgency}
                      isOpen={isOpen}
                      onToggle={() => setExpandedId(isOpen ? null : notif.id)}
                      header={
                        <div className="min-w-0 flex-1 space-y-1.5">
                            <div className="flex items-center justify-between gap-2">
                              <StatusBadge
                                variant={cardUrgency}
                                label={getBadgeLabel(
                                  cardUrgency,
                                  solicitudVinculada
                                )}
                                showIcon
                              />
                              <span className="text-timestamp shrink-0">
                                {notif.tiempo}
                              </span>
                            </div>
                            <h3 className="text-[16px] font-semibold text-foreground leading-tight">
                              {notif.titulo}
                            </h3>
                            {!isOpen && (
                              <p className="text-[12px] text-muted-secondary truncate">
                                {estadoChip}
                                {solicitudVinculada
                                  ? ` · ${etapaCiudadanaFromSolicitud(solicitudVinculada)}`
                                  : ""}
                              </p>
                            )}
                            {isOpen && solicitudVinculada && (
                              <TramiteCopyStack
                                solicitud={solicitudVinculada}
                                order="inicio"
                                showTipo
                              />
                            )}
                            {isOpen && !solicitudVinculada && (
                              <p className="text-[13px] text-muted-secondary">
                                {subetapaCiudadana(detalleFuente?.etapa) ??
                                  notif.cuerpo}
                              </p>
                            )}
                        </div>
                      }
                      content={
                        <div className="space-y-4">
                          {detalleFuente && (
                            <InfoGroups
                              groups={[
                                {
                                  title: "Expediente",
                                  rows: [
                                    {
                                      label: "Número de solicitud",
                                      value:
                                        solicitudVinculada?.id ??
                                        notif.solicitudId ??
                                        "—",
                                      mono: true,
                                    },
                                  ],
                                },
                                {
                                  title: "Situación",
                                  rows: [
                                    {
                                      label: "Etapa",
                                      value: solicitudVinculada
                                        ? etapaCiudadanaFromSolicitud(
                                            solicitudVinculada
                                          )
                                        : detalleFuente.etapa,
                                    },
                                    {
                                      label: "Estado",
                                      value: estadoChip,
                                    },
                                    {
                                      label: "Requerimiento",
                                      value: detalleFuente.requerimiento,
                                    },
                                  ],
                                },
                                {
                                  title: "Plazos y contacto",
                                  rows: [
                                    {
                                      label: "Plazo límite",
                                      value: detalleFuente.plazo,
                                    },
                                    {
                                      label: "Contacto",
                                      value: detalleFuente.contacto,
                                    },
                                  ],
                                },
                              ]}
                            />
                          )}

                          {notif.solicitudId && (
                            <div className="space-y-2">
                              <CTAButton
                                label={LABEL_VER_DETALLE_SOLICITUD}
                                variant={ctaVariantForSemaphore(cardUrgency)}
                                fullWidth
                                size="md"
                                onClick={() =>
                                  router.push(`/solicitudes/${notif.solicitudId}`)
                                }
                              />
                              <CTAButton
                                label="Ver resolución legal"
                                variant="outline"
                                fullWidth
                                size="md"
                                icon={<FileText size={18} />}
                                onClick={() =>
                                  setResolucionId(notif.solicitudId ?? null)
                                }
                              />
                            </div>
                          )}
                        </div>
                      }
                    />
                  </motion.div>
                );
              })}

              {filteredNotifs.length === 0 && (
                <div className="py-20 text-center">
                  <p className="text-body-sm text-muted">
                    No posees ninguna notificación de tus solicitudes.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {resolucionId && (
        <PdfPreviewOverlay
          solicitudId={resolucionId}
          onClose={() => setResolucionId(null)}
        />
      )}
    </div>
  );
}
