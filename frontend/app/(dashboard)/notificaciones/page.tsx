"use client";

import { useState } from "react";
import TopBar from "@/components/ui/TopBar";
import FilterPills from "@/components/ui/FilterPills";
import CollapsibleCard from "@/components/ui/CollapsibleCard";
import NotificationTable from "@/components/ui/NotificationTable";
import CTAButton from "@/components/ui/CTAButton";
import StatusBadge, { SemaphoreVariant } from "@/components/ui/StatusBadge";
import { Toast, useToast } from "@/components/ui/Toast";
import {
  notificacionesMock,
  Notificacion,
  getNotificacionesByCategoria,
  sortByUrgencia,
  sortByFecha,
} from "@/lib/mock/notificaciones";
import { AlertTriangle, AlertCircle, RefreshCw, CheckCircle } from "lucide-react";

type CatTab = "marca" | "patente";
type FilterType = "urgencia" | "fecha";

const semaphoreIcon: Record<SemaphoreVariant, React.ReactNode> = {
  danger: <AlertTriangle size={16} color="#DC2626" />,
  warning: <AlertCircle size={16} color="#D97706" />,
  info: <RefreshCw size={16} color="#2563EB" />,
  success: <CheckCircle size={16} color="#059669" />,
};

function NotifCardHeader({ notif }: { notif: Notificacion }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1.5">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
          style={{
            background:
              notif.tipo === "danger" ? "#FEE2E2" :
              notif.tipo === "warning" ? "#FEF3C7" :
              notif.tipo === "info" ? "#DBEAFE" : "#D1FAE5",
          }}
        >
          {semaphoreIcon[notif.tipo]}
        </div>
        <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
          <StatusBadge variant={notif.tipo} label={notif.tipoLabel} />
          <span className="text-[11px] text-[#9CA3AF] shrink-0">{notif.timestamp}</span>
        </div>
      </div>
      <h3 className="text-[16px] font-semibold text-[#111827] leading-snug">
        {notif.titulo}
      </h3>
    </div>
  );
}

export default function NotificacionesPage() {
  const [catTab, setCatTab] = useState<CatTab>("marca");
  const [filter, setFilter] = useState<FilterType>("urgencia");
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(["n1"]));
  const { toast, showToast, dismissToast } = useToast();

  const toggleCard = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const rawNotifs = getNotificacionesByCategoria(catTab);
  const notifs = filter === "urgencia" ? sortByUrgencia(rawNotifs) : sortByFecha(rawNotifs);

  const ctaVariantMap: Record<string, SemaphoreVariant> = {
    adjuntar: "danger",
    pago: "danger",
    confirmar: "warning",
    acuse: "info",
    informativo: "success",
  };

  return (
    <>
      <TopBar variant="home" title="Centro de Notificaciones" />

      <div className="px-4 pt-4 pb-6 space-y-4">
        {/* Page title */}
        <div>
          <h1 className="text-[24px] font-bold text-[#111827]">
            Centro de Notificaciones
          </h1>
          <p className="text-[14px] text-[#4B5563]">
            Alertas inteligentes de tus trámites
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#E5E7EB]">
          {(["marca", "patente"] as CatTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setCatTab(tab)}
              role="tab"
              aria-selected={catTab === tab}
              className={`flex-1 py-2.5 text-[15px] font-medium transition-colors duration-150 focus:outline-none capitalize ${
                catTab === tab
                  ? "text-[#1A56DB] font-semibold border-b-2 border-[#1A56DB] -mb-px"
                  : "text-[#9CA3AF]"
              }`}
            >
              {tab === "marca" ? "Marcas" : "Patentes"}
            </button>
          ))}
        </div>

        {/* Filter pills */}
        <FilterPills
          options={[
            { value: "urgencia", label: "Por urgencia" },
            { value: "fecha", label: "Por fecha reciente" },
          ]}
          activeValue={filter}
          onChange={(v) => setFilter(v as FilterType)}
        />

        {/* Notification cards */}
        <div className="space-y-3">
          {notifs.length === 0 ? (
            <p className="text-center text-[#9CA3AF] py-10 text-[15px]">
              No hay notificaciones para este filtro
            </p>
          ) : (
            notifs.map((notif) => (
              <CollapsibleCard
                key={notif.id}
                variant={notif.tipo}
                isOpen={openIds.has(notif.id)}
                onToggle={() => toggleCard(notif.id)}
                header={<NotifCardHeader notif={notif} />}
                preview={notif.preview}
                content={
                  <div className="space-y-3 mt-1">
                    <NotificationTable rows={notif.tabla} />
                    {notif.ctaLabel && notif.ctaType !== "informativo" && (
                      <CTAButton
                        variant={ctaVariantMap[notif.ctaType ?? "acuse"]}
                        label={notif.ctaLabel}
                        fullWidth
                        onClick={() =>
                          showToast("success", "Acción registrada correctamente")
                        }
                      />
                    )}
                  </div>
                }
              />
            ))
          )}
        </div>
      </div>

      {toast && (
        <Toast type={toast.type} message={toast.message} onDismiss={dismissToast} />
      )}
    </>
  );
}
