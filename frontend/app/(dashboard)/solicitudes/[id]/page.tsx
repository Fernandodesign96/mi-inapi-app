"use client";

import { useRouter, useParams } from "next/navigation";
import { 
  ArrowLeft, 
  Clock, 
  FileText, 
  Calendar, 
  User, 
  MapPin,
  ChevronRight,
  Download,
  AlertCircle,
  ExternalLink
} from "lucide-react";
import TopBar from "@/components/ui/TopBar";
import SemaphoreCard from "@/components/ui/SemaphoreCard";
import StepperProgress from "@/components/ui/StepperProgress";
import StatusBadge from "@/components/ui/StatusBadge";
import CTAButton from "@/components/ui/CTAButton";
import { mockSolicitudes } from "@/lib/mockData";
import { clsx } from "clsx";

export async function generateStaticParams() {
  return mockSolicitudes.map((s) => ({
    id: s.id,
  }));
}

export default function SolicitudDetallePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const solicitud = mockSolicitudes.find(s => s.id === id) || mockSolicitudes[0];

  const timeline = [
    { date: "15 ENE 2024", title: "Ingreso de Solicitud", desc: "Se ha recibido la solicitud exitosamente.", status: "completed" },
    { date: "02 FEB 2024", title: "Examen de Forma", desc: "La solicitud cumple con los requisitos formales.", status: "completed" },
    { date: "10 MAR 2024", title: "Publicación Diario Oficial", desc: "Publicado en el cuerpo de Marcas.", status: "completed" },
    { date: "Presente", title: "Examen de Fondo", desc: "Revisión técnica de la solicitud.", status: "current" },
    { date: "Pendiente", title: "Resolución Final", desc: "Emisión de título o rechazo.", status: "pending" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
      <header className="h-[56px] border-b border-[#E5E7EB] flex items-center px-4 sticky top-0 bg-white z-40">
        <button onClick={() => router.back()} className="p-2 -ml-2 text-[#111827]">
          <ArrowLeft size={24} />
        </button>
        <span className="text-[17px] font-bold text-[#111827] ml-2 truncate">Detalle de Solicitud</span>
      </header>

      <div className="flex-1 overflow-y-auto pb-24 screen-enter">
        <div className="px-6 py-6 space-y-6">
          {/* Header Info */}
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <StatusBadge 
                  variant={solicitud.urgency as any} 
                  label={solicitud.estado.replace('_', ' ')} 
                />
                <h1 className="text-[24px] font-extrabold text-[#111827] leading-tight">
                  {solicitud.nombre}
                </h1>
              </div>
              <div className="w-12 h-12 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center text-[#1A56DB] shadow-sm">
                <FileText size={24} />
              </div>
            </div>

            <StepperProgress 
              stepStates={
                solicitud.etapa === 'INGRESO' ? ['current', 'pending', 'pending'] :
                solicitud.etapa === 'EXAMEN' ? ['completed', 'current', 'pending'] :
                ['completed', 'completed', 'current']
              }
              urgency={solicitud.urgency as any}
            />
          </div>

          {/* Contextual Link to Diario Oficial */}
          {timeline.find(t => t.title === "Publicación Diario Oficial" && t.status === "completed") && (
            <div 
              onClick={() => router.push('/diario-oficial')}
              className="bg-[#FFF7ED] p-4 rounded-xl border border-[#FED7AA] flex items-center justify-between cursor-pointer active:scale-[0.98] transition-all shadow-sm group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#EA580C] text-white flex items-center justify-center shrink-0">
                  <ExternalLink size={20} />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[14px] font-bold text-[#9A3412]">Publicación Oficial</p>
                  <p className="text-[12px] text-[#C2410C]">Ver publicación en el Diario Oficial</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-[#EA580C] group-hover:translate-x-1 transition-transform" />
            </div>
          )}

          {/* Urgent Action Card */}
          {solicitud.estado === "ACCION_REQUERIDA" && (
            <SemaphoreCard urgency="danger">
              <div className="flex gap-3">
                <AlertCircle size={20} className="text-[#DC2626] shrink-0" />
                <div className="space-y-3 flex-1">
                  <div className="space-y-1">
                    <h4 className="text-[14px] font-bold text-[#111827]">Acción Requerida</h4>
                    <p className="text-body-xs text-[#4B5563]">
                      {solicitud.accion || "Se requiere cargar documentación pendiente para continuar."}
                    </p>
                  </div>
                  <CTAButton 
                    label="Gestionar en Notificaciones" 
                    variant="danger" 
                    fullWidth 
                    size="sm"
                    onClick={() => router.push('/notificaciones')}
                  />
                </div>
              </div>
            </SemaphoreCard>
          )}

          {/* Main Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <DetailItem icon={Clock} label="N° SOLICITUD" value={solicitud.id} isMono />
            <DetailItem icon={Calendar} label="FECHA INGRESO" value="15 ENE 2024" />
            <DetailItem icon={User} label="REPRESENTANTE" value="Juan Díaz" />
            <DetailItem icon={MapPin} label="TIPO REGISTRO" value={solicitud.tipo === 'marca' ? 'Marca Comercial' : 'Patente Inv.'} />
          </div>

          {/* Timeline */}
          <section className="space-y-4 pt-4">
            <p className="text-label text-[#9CA3AF]">HISTORIAL DEL TRÁMITE</p>
            <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[#E5E7EB]">
              {timeline.map((item, idx) => (
                <div key={idx} className="relative">
                  <div className={clsx(
                    "absolute -left-[21px] top-1.5 w-4 h-4 rounded-full border-2 border-white ring-4",
                    item.status === 'completed' ? "bg-[#059669] ring-[#D1FAE5]" :
                    item.status === 'current' ? "bg-[#2563EB] ring-[#DBEAFE] animate-pulse" : "bg-[#D1D5DB] ring-[#F3F4F6]"
                  )} />
                  <div className="space-y-0.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-[#9CA3AF]">{item.date}</span>
                      {item.status === 'completed' && <span className="text-[10px] font-bold text-[#059669]">OK</span>}
                    </div>
                    <h4 className={clsx(
                      "text-[14px] font-bold",
                      item.status === 'pending' ? "text-[#9CA3AF]" : "text-[#111827]"
                    )}>{item.title}</h4>
                    <p className="text-body-xs text-[#6B7280]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Documents Section */}
          <section className="space-y-3 pt-4">
            <p className="text-label text-[#9CA3AF]">DOCUMENTOS GENERADOS</p>
            <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden shadow-sm">
              <DocRow title="Formulario Solicitud F-01" date="15 ENE 2024" />
              <DocRow title="Resolución de Aceptación" date="02 FEB 2024" />
              <DocRow title="Publicación Diario Oficial" date="10 MAR 2024" isLast />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ icon: Icon, label, value, isMono }: { icon: any, label: string, value: string, isMono?: boolean }) {
  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] p-3 shadow-sm">
      <div className="flex items-center gap-1.5 mb-1">
        <Icon size={12} className="text-[#9CA3AF]" />
        <span className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wider">{label}</span>
      </div>
      <p className={clsx(
        "text-[#111827] font-semibold truncate",
        isMono ? "text-mono text-[13px]" : "text-[14px]"
      )}>{value}</p>
    </div>
  );
}

function DocRow({ title, date, isLast }: { title: string, date: string, isLast?: boolean }) {
  return (
    <div className={clsx(
      "flex items-center justify-between p-4 hover:bg-[#F9FAFB] active:bg-[#F3F4F6] transition-colors",
      !isLast && "border-b border-[#E5E7EB]"
    )}>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center shrink-0">
          <FileText size={18} />
        </div>
        <div className="min-w-0">
          <p className="text-[13px] font-bold text-[#111827] truncate">{title}</p>
          <p className="text-[11px] text-[#6B7280]">{date} · PDF</p>
        </div>
      </div>
      <Download size={18} className="text-[#D1D5DB]" />
    </div>
  );
}
