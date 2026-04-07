"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Clock, ChevronRight, AlertTriangle } from "lucide-react";
import TopBar from "@/components/ui/TopBar";
import StatusBadge, { SemaphoreVariant } from "@/components/ui/StatusBadge";
import SemaphoreCard from "@/components/ui/SemaphoreCard";
import StepperProgress from "@/components/ui/StepperProgress";
import CTAButton from "@/components/ui/CTAButton";
import SkeletonCard from "@/components/ui/SkeletonCard";
import {
  tramitesMock,
  Tramite,
  getTramitesByCategoria,
  getSummary,
  TramiteCategoria,
} from "@/lib/mock/tramites";

type TabType = "marca" | "patente";

function TramiteCard({ tramite, onCTA }: { tramite: Tramite; onCTA: () => void }) {
  return (
    <SemaphoreCard variant={tramite.status}>
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-1">
        <h3 className="text-[17px] font-semibold text-[#111827] leading-tight">
          {tramite.nombre}
        </h3>
        <StatusBadge variant={tramite.status} label={tramite.statusLabel} />
      </div>

      {/* Número solicitud */}
      <p className="font-mono text-[13px] text-[#9CA3AF] mb-1">
        Solicitud #{tramite.numero}
      </p>

      {/* Stepper */}
      <StepperProgress
        currentStep={tramite.etapaActual}
        stepStates={tramite.stepStates}
        currentVariant={tramite.status}
      />

      {/* Action box — solo para danger/warning */}
      {tramite.accionRequerida && tramite.status !== "success" && (
        <div
          className="rounded-[10px] p-3 mb-3"
          style={{
            background: tramite.status === "danger" ? "#FFF7ED" : "#F9FAFB",
            border: `1px solid ${tramite.status === "danger" ? "#FED7AA" : "#E5E7EB"}`,
          }}
        >
          <div className="flex items-start gap-2 mb-2">
            {tramite.status === "danger" && (
              <AlertTriangle size={16} color="#D97706" className="shrink-0 mt-0.5" />
            )}
            <p className="text-[13px] text-[#4B5563] leading-snug">
              {tramite.accionRequerida}
            </p>
          </div>
          {tramite.ctaLabel && (
            <CTAButton
              variant={tramite.status === "danger" ? "danger" : "warning"}
              label={tramite.ctaLabel}
              fullWidth
              size="sm"
              onClick={onCTA}
            />
          )}
        </div>
      )}

      {/* Info para info status */}
      {tramite.status === "info" && tramite.accionRequerida && (
        <p className="text-[14px] text-[#4B5563] mb-3 leading-snug">
          {tramite.accionRequerida}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-[#F3F4F6]">
        <div className="flex items-center gap-1 text-[12px] text-[#9CA3AF]">
          <Clock size={12} />
          <span>Est: {tramite.estimacion}</span>
        </div>
        <button className="flex items-center gap-0.5 text-[12px] text-[#1A56DB] font-medium focus:outline-none">
          VER DETALLES
          <ChevronRight size={14} />
        </button>
      </div>
    </SemaphoreCard>
  );
}

export default function InicioPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("marca");
  const [isLoading] = useState(false);

  const cat: TramiteCategoria = activeTab;
  const tramites = getTramitesByCategoria(cat);
  const summary = getSummary(cat);

  const tabs: { value: TabType; label: string }[] = [
    { value: "marca", label: "Marcas" },
    { value: "patente", label: "Patentes" },
  ];

  return (
    <>
      {/* TopBar */}
      <TopBar
        variant="home"
        showBell
        showSettings
        notificationCount={2}
        onBell={() => router.push("/notificaciones")}
      />

      <div className="px-4 pt-4 pb-6 space-y-5">
        {/* Tabs Marca / Patente */}
        <div className="flex border-b border-[#E5E7EB]">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              aria-selected={activeTab === tab.value}
              role="tab"
              className={`flex-1 py-2.5 text-[15px] font-medium transition-colors duration-150 focus:outline-none ${
                activeTab === tab.value
                  ? "text-[#1A56DB] font-semibold border-b-2 border-[#1A56DB] -mb-px"
                  : "text-[#9CA3AF]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Summary Row */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: summary.enProceso, label: "EN PROCESO", color: "#111827" },
            { value: summary.accionRequerida, label: "ACCIÓN REQ.", color: "#D97706", symbol: "⚠" },
            { value: summary.finalizadas, label: "FINALIZADAS", color: "#059669" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-lg p-3 shadow-card text-center"
            >
              <p className="text-[28px] font-[800] leading-none" style={{ color: item.color }}>
                {item.value}
                {item.symbol && (
                  <span className="text-[18px] ml-0.5">{item.symbol}</span>
                )}
              </p>
              <p
                className="text-[10px] font-semibold uppercase tracking-wide mt-1"
                style={{ color: item.color === "#111827" ? "#9CA3AF" : item.color }}
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Section label */}
        <div className="flex items-center justify-between">
          <h2 className="text-[17px] font-semibold text-[#111827]">
            Solicitudes en Curso
          </h2>
          <span className="text-[12px] text-[#9CA3AF]">Actualizado hace 5 min</span>
        </div>

        {/* Cards */}
        {isLoading ? (
          <div className="space-y-3">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : tramites.length === 0 ? (
          <div className="text-center py-12 text-[#9CA3AF]">
            <p className="text-[15px]">No tienes solicitudes activas</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tramites.map((t) => (
              <TramiteCard
                key={t.id}
                tramite={t}
                onCTA={() => router.push("/notificaciones")}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
