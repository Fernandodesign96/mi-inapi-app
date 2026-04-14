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
import { mockNotificacionesUrgent, mockNotificacionesNoUrgent } from "@/lib/mockData";

type FilterType = "todas" | "urgente" | "info" | "exito";
type UrgencyType = "danger" | "warning" | "info" | "success";

const filterOptions = [
  { value: "todas", label: "Todas" },
  { value: "urgente", label: "Urgentes" },
  { value: "info", label: "Informativas" },
  { value: "exito", label: "Éxito" },
];

const getBadgeLabel = (urgency: string, detalleEtapa?: string) => {
  if (urgency === 'danger') return 'Acción urgente';
  if (urgency === 'warning') return detalleEtapa?.toLowerCase().includes('fondo') ? 'Corrección de Fondo' : 'Corrección de Forma';
  if (urgency === 'info') return 'En revisión';
  if (urgency === 'success') return 'Finalizada';
  return 'En revisión';
};

export default function NotificacionesPage() {
  const router = useRouter();
  const { userState } = useAppStore();
  const [activeFilter, setActiveFilter] = useState<FilterType>("todas");
  const [expandedId, setExpandedId] = useState<string | null>(userState === 'active-no-urgent' ? 'notif-neo' : 'n-eco');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const baseNotifs = userState === 'active-no-urgent' ? mockNotificacionesNoUrgent : mockNotificacionesUrgent;

  const filteredNotifs = baseNotifs.filter((n) => {
    if (userState === 'new') return false;
    if (activeFilter === "todas") return true;
    if (activeFilter === "urgente") return n.urgency === "danger" || n.urgency === "warning";
    if (activeFilter === "info") return n.urgency === "info";
    if (activeFilter === "exito") return n.urgency === "success";
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
      <TopBar variant="section" title="Notificaciones" />

      <div className="flex-1 overflow-y-auto pb-24 screen-enter">
        {/* Header Block */}
        <div className="px-6 pt-6 pb-2">
          <h1 className="text-h1 text-[#111827]">Centro de Alertas</h1>
          <p className="text-body-sm text-[#4B5563] mt-1">
            Gestiona los requerimientos de tus trámites
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

                const tableRows: NotificationRow[] = notif.detalle ? [
                  { label: "Etapa actual", value: notif.detalle.etapa },
                  { label: "N° Solicitud", value: notif.solicitudId || "N/A", isMono: true },
                  { label: "Requerimiento", value: notif.detalle.requerimiento },
                  { label: "Plazo límite", value: notif.detalle.plazo },
                  { label: "Contacto", value: notif.detalle.contacto },
                ] : [];

                return (
                  <div key={notif.id}>
                    <CollapsibleCard
                      variant={notif.urgency as UrgencyType}
                      isOpen={isOpen}
                      onToggle={() => setExpandedId(isOpen ? null : notif.id)}
                      header={
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <StatusBadge
                              variant={notif.urgency as UrgencyType}
                              label={getBadgeLabel(notif.urgency, notif.detalle?.etapa)}
                              showIcon={notif.urgency === "danger" || notif.urgency === "warning"}
                            />
                            <span className="text-timestamp">{notif.tiempo}</span>
                          </div>
                          <h3 className="text-h3 text-[#111827] leading-tight">
                            {notif.titulo}
                          </h3>
                        </div>
                      }
                      preview={notif.cuerpo}
                      content={
                        <div className="space-y-4">
                          <p className="text-body-sm text-[#4B5563] leading-relaxed">
                            {notif.cuerpo}
                          </p>

                          {tableRows.length > 0 && (
                            <NotificationTable rows={tableRows} />
                          )}

                          {notif.cta && (
                            <CTAButton
                              label={notif.cta}
                              variant={notif.urgency === "danger" ? "danger" :
                                       notif.urgency === "warning" ? "warning" : "primary"}
                              fullWidth
                              size="md"
                            />
                          )}

                          {notif.solicitudId && (
                            <button
                              onClick={() => router.push(`/solicitudes/${notif.solicitudId}`)}
                              className="w-full text-center text-[12px] font-bold text-[#1A56DB] py-2 border-t border-[#E5E7EB] mt-1 hover:bg-[#EFF6FF] rounded-b-xl transition-colors"
                            >
                              Ver detalle completo de la solicitud →
                            </button>
                          )}
                        </div>
                      }
                    />
                  </div>
                );
              })}

              {filteredNotifs.length === 0 && (
                <div className="py-20 text-center">
                  <p className="text-body-sm text-[#9CA3AF]">
                    No hay notificaciones en esta categoría.
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
