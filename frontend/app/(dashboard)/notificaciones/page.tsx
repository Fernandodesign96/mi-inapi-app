"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TopBar from "@/components/ui/TopBar";
import CollapsibleCard from "@/components/ui/CollapsibleCard";
import StatusBadge from "@/components/ui/StatusBadge";
import FilterPills from "@/components/ui/FilterPills";
import NotificationTable, { NotificationRow } from "@/components/ui/NotificationTable";
import CTAButton from "@/components/ui/CTAButton";
import SkeletonCard from "@/components/ui/SkeletonCard";
import { useAppStore } from "@/lib/store";
import { getSolicitudById } from "@/lib/mockData";
import { useSessionNotificaciones } from "@/lib/sessionData";
import {
  LABEL_VER_DETALLE_SOLICITUD,
  ctaVariantForSemaphore,
} from "@/lib/featureFlags";
import { badgeLabelForSolicitud } from "@/lib/tramitePresentacion";

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
  if (urgency === "danger" || urgency === "warning") return "Acción requerida";
  if (urgency === "success") return "Registrada";
  if (urgency === "neutral") return "Finalizada sin registro";
  return "En trámite";
};

export default function NotificacionesPage() {
  const router = useRouter();
  const { userState, loginMode } = useAppStore();
  const sessionNotifs = useSessionNotificaciones();
  const [activeFilter, setActiveFilter] = useState<FilterType>("todas");
  const [expandedId, setExpandedId] = useState<string | null>(
    loginMode === "inapi" ? null : userState === "active-no-urgent" ? "notif-neo" : "n-eco"
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const baseNotifs = sessionNotifs;

  const filteredNotifs = baseNotifs.filter((n) => {
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
        {/* Header Block */}
        <div className="px-6 pt-6 pb-2">
          <h1 className="text-h1 text-foreground">Notificaciones de tus trámites</h1>
          <p className="text-body-sm text-muted-secondary mt-1">
            Consulta avisos y el detalle de tus trámites. Las gestiones pendientes se realizan en los canales oficiales de INAPI.
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

        {/* List or Skeletons */}
        <div className="px-6 space-y-4">
          {isLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            <>
              {filteredNotifs.map((notif) => {
                const isOpen = expandedId === notif.id;
                const solicitudVinculada = notif.solicitudId
                  ? getSolicitudById(notif.solicitudId)
                  : undefined;
                const cardUrgency = (solicitudVinculada?.urgency ??
                  notif.urgency) as UrgencyType;

                const detalleFuente =
                  notif.detalle ?? solicitudVinculada?.notificacion;

                const tableRows: NotificationRow[] = detalleFuente
                  ? [
                      { label: "Etapa actual", value: detalleFuente.etapa },
                      {
                        label: "N° Solicitud",
                        value: notif.solicitudId || "N/A",
                        isMono: true,
                      },
                      {
                        label: "Requerimiento",
                        value: detalleFuente.requerimiento,
                      },
                      { label: "Plazo límite", value: detalleFuente.plazo },
                      { label: "Contacto", value: detalleFuente.contacto },
                    ]
                  : [];

                return (
                  <div key={notif.id}>
                    <CollapsibleCard
                      variant={cardUrgency}
                      isOpen={isOpen}
                      onToggle={() => setExpandedId(isOpen ? null : notif.id)}
                      header={
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <StatusBadge
                              variant={cardUrgency}
                              label={getBadgeLabel(
                                cardUrgency,
                                solicitudVinculada
                              )}
                              showIcon={
                                cardUrgency === "danger" ||
                                cardUrgency === "warning"
                              }
                            />
                            <span className="text-timestamp">{notif.tiempo}</span>
                          </div>
                          <h3 className="text-h3 text-foreground leading-tight">
                            {notif.titulo}
                          </h3>
                        </div>
                      }
                      preview={notif.cuerpo}
                      content={
                        <div className="space-y-4">
                          <p className="text-body-sm text-muted-secondary leading-relaxed">
                            {notif.cuerpo}
                          </p>

                          {tableRows.length > 0 && (
                            <NotificationTable rows={tableRows} />
                          )}

                          {notif.solicitudId && (
                            <CTAButton
                              label={LABEL_VER_DETALLE_SOLICITUD}
                              variant={ctaVariantForSemaphore(cardUrgency)}
                              fullWidth
                              size="md"
                              onClick={() =>
                                router.push(`/solicitudes/${notif.solicitudId}`)
                              }
                            />
                          )}
                        </div>
                      }
                    />
                  </div>
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
    </div>
  );
}
