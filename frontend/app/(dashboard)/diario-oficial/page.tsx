"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Search, ChevronRight, FileText } from "lucide-react";
import FilterPills from "@/components/ui/FilterPills";
import SemaphoreCard from "@/components/ui/SemaphoreCard";
import StatusBadge from "@/components/ui/StatusBadge";
import { useAppStore } from "@/lib/store";

export default function DiarioOficialPage() {
  const router = useRouter();
  const { userState } = useAppStore();
  const [activeTab, setActiveTab] = useState("marcas");
  const [activeDate, setActiveDate] = useState("hoy");

  const misPublicaciones =
    userState === "active-urgent"
      ? [
          {
            id: "trm-005",
            nombre: "Terra Verde SPA",
            fecha: "15 de marzo 2026",
            vence: "15 de marzo 2036",
            estado: "PUBLICADA",
          },
        ]
      : [];

  const recientes = [
    { title: "TERRA VERDE SPA", date: "15 mar", type: "Marca" },
    { title: "LUMA TECNOLOGÍAS LTDA", date: "14 mar", type: "Marca" },
    { title: "SISTEMA FILTR. H2O", date: "14 mar", type: "Patente" },
    { title: "BÓRAX CLEAN PRODUCTS", date: "13 mar", type: "Marca" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="h-topbar border-b border-border flex items-center justify-between px-4 sticky top-0 bg-surface z-40">
        <div className="flex items-center gap-2">
          <button onClick={() => router.back()} className="p-2 -ml-2 text-foreground">
            <ArrowLeft size={24} />
          </button>
          <span className="text-h4 font-bold text-foreground">Diario Oficial</span>
        </div>
        <button className="p-2 text-primary">
          <Search size={20} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto pb-safe-bottomnav screen-enter">
        <div className="px-6 py-6 space-y-8">
          <section className="space-y-4">
            <p className="text-label text-muted">BUSCAR PUBLICACIÓN</p>
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                type="text"
                placeholder="Nombre de marca, N° solicitud..."
                className="w-full h-[52px] bg-surface border border-border rounded-lg pl-11 pr-4 text-body-sm font-sans shadow-sm input-gob transition-all outline-none"
              />
            </div>
          </section>

          <section className="space-y-4">
            <p className="text-label text-muted">FILTROS</p>
            <div className="space-y-3">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                <FilterPills
                  options={[
                    { value: "marcas", label: "Marcas" },
                    { value: "patentes", label: "Patentes" },
                    { value: "disenos", label: "Diseños" },
                    { value: "todos", label: "Todos" },
                  ]}
                  activeValue={activeTab}
                  onChange={setActiveTab}
                />
              </div>
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                <FilterPills
                  options={[
                    { value: "hoy", label: "Hoy" },
                    { value: "semana", label: "Esta semana" },
                    { value: "mes", label: "Este mes" },
                    { value: "personalizado", label: "Personalizado" },
                  ]}
                  activeValue={activeDate}
                  onChange={setActiveDate}
                />
              </div>
            </div>
          </section>

          {userState === "active-urgent" && misPublicaciones.length > 0 && (
            <section className="space-y-4">
              <p className="text-label text-primary">MIS PUBLICACIONES</p>
              {misPublicaciones.map((pub) => (
                <SemaphoreCard key={pub.id} urgency="info">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <StatusBadge variant="info" label={pub.estado} />
                        <h3 className="text-h3 font-bold text-foreground">{pub.nombre}</h3>
                        <p className="text-mono text-muted-secondary">Solicitud #{pub.id}</p>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-info-bg text-primary flex items-center justify-center">
                        <FileText size={20} />
                      </div>
                    </div>
                    <div className="space-y-1 pt-2 border-t border-border">
                      <div className="flex justify-between text-body-xs">
                        <span className="text-muted-secondary">Publicado:</span>
                        <span className="font-semibold text-foreground">{pub.fecha}</span>
                      </div>
                      <div className="flex justify-between text-body-xs">
                        <span className="text-muted-secondary">Período oposición:</span>
                        <span className="font-bold text-danger">vence {pub.vence}</span>
                      </div>
                    </div>
                    <button className="w-full py-2.5 mt-2 bg-background border border-border rounded-md text-body-sm font-bold text-foreground flex items-center justify-center gap-2 active:bg-surface-elevated transition-colors">
                      Ver publicación completa <ChevronRight size={16} />
                    </button>
                  </div>
                </SemaphoreCard>
              ))}
            </section>
          )}

          <section className="space-y-4">
            <p className="text-label text-muted">PUBLICACIONES RECIENTES INAPI</p>
            <div className="bg-surface rounded-lg border border-border overflow-hidden shadow-sm divide-y divide-border">
              {recientes.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 hover:bg-background active:bg-surface-elevated transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-body-xs font-bold text-muted w-12 shrink-0">
                      {item.type}:
                    </span>
                    <span className="text-body-sm font-bold text-foreground truncate">
                      {item.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-body-xs text-muted-secondary">{item.date}</span>
                    <ChevronRight size={16} className="text-muted" />
                  </div>
                </div>
              ))}
              <button className="w-full p-4 text-body-sm font-bold text-primary text-center hover:bg-info-bg transition-colors">
                Ver más publicaciones →
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
