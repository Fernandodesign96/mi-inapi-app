"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ExternalLink,
  Book,
  HelpCircle,
  FileText,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Bell,
  PlayCircle,
  Inbox,
  Wrench,
} from "lucide-react";

const INAPI_PORTAL_SOLICITUD_MARCA =
  "https://tramites.inapi.cl/Trademark/TrademarkApplication/IndexTrademark";
const INAPI_YOUTUBE = "https://www.youtube.com/@INAPICHILE";

const INAPI_HERRAMIENTAS_LINKS = [
  {
    label: "Buscador de marcas",
    href: "https://buscadormarcas.inapi.cl/Marca/BuscarMarca.aspx",
  },
  {
    label: "Clasificador de productos y servicios",
    href: "https://tramites.inapi.cl/Trademark/TrademarkNizaClassifier",
  },
  {
    label: "Buscador de patentes",
    href: "https://buscadorpatentes.inapi.cl/UI/MainSearch.aspx",
  },
] as const;
import TopBar from "@/components/ui/TopBar";
import SemaphoreCard from "@/components/ui/SemaphoreCard";
import StepperProgress, { getStepStates } from "@/components/ui/StepperProgress";
import StatusBadge from "@/components/ui/StatusBadge";
import CTAButton from "@/components/ui/CTAButton";
import SkeletonCard from "@/components/ui/SkeletonCard";
import { useAppStore } from "@/lib/store";
import { mockUser, mockTramitesUrgent, mockTramitesNoUrgent, mockSummaryUrgent, mockSummaryNoUrgent } from "@/lib/mockData";
import { LABEL_VER_DETALLE_SOLICITUD } from "@/lib/featureFlags";
import { clsx } from "clsx";
import React from "react";

export default function InicioPage() {
  const router = useRouter();
  const { userState } = useAppStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const currentTramites = userState === 'active-no-urgent' ? mockTramitesNoUrgent : mockTramitesUrgent;
  const currentSummary = userState === 'active-no-urgent' ? mockSummaryNoUrgent : mockSummaryUrgent;

  const urgentSolicitud = currentTramites.find(
    (s) =>
      s.estado === "ACCION_REQUERIDA" ||
      (s.accion &&
        (s.urgency === "danger" || s.urgency === "warning"))
  );
  const recentSolicitud =
    userState === "active-no-urgent"
      ? currentTramites[0]
      : currentTramites.find(
          (s) => s.estado === "EN_REVISION" || s.estado === "PUBLICACION"
        );
  const heroUrgency = urgentSolicitud?.urgency === "warning" ? "warning" : "danger";

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar variant="home" />

      <div className="px-6 pt-6 pb-safe-bottomnav flex flex-col space-y-6 screen-enter">
        {/* GREETING */}
        <div className="space-y-1">
          <h1 className="text-display text-foreground">
            Hola, {mockUser.name.split(' ')[0]} 👋
          </h1>
          <p className="text-body-sm text-muted-secondary">
            {userState === 'new' ? 'Bienvenido a MiINAPI' : 'Tienes novedades en tus trámites'}
          </p>
        </div>

        {/* LOADING STATE - SKELETONS */}
        {isLoading ? (
          <div className="space-y-6">
            <SkeletonCard />
            <div className="flex gap-2">
              <div className="flex-1 h-16 bg-surface rounded-lg border border-border skeleton" />
              <div className="flex-1 h-16 bg-surface rounded-lg border border-border skeleton" />
              <div className="flex-1 h-16 bg-surface rounded-lg border border-border skeleton" />
            </div>
          </div>
        ) : (
          <>
            {/* STATE A: NEW USER */}
            {userState === "new" && (
              <div className="space-y-5">
                <section className="space-y-3" aria-labelledby="new-user-app-purpose">
                  <div>
                    <h2 id="new-user-app-purpose" className="text-label text-muted">
                      PARA QUÉ SIRVE ESTA APP
                    </h2>
                    <p className="text-body-xs text-muted-secondary mt-1 leading-relaxed">
                      En esta aplicación podrás ver el estado de tus solicitudes y hacer
                      un seguimiento de todas las acciones pendientes y estados en general
                      de tus trámites.
                    </p>
                  </div>

                  <ul className="space-y-3 pt-1" role="list">
                    <WelcomePoint
                      icon={FileText}
                      accent="tramites"
                      title="Solicitudes"
                      text="Consulta la etapa, el estado y si es que tienes una acción requerida de tus trámites."
                    />
                    <WelcomePoint
                      icon={Bell}
                      accent="alertas"
                      title="Notificaciones"
                      text="Revisa el detalle de todas tus solicitudes y visualiza cuáles son las que requieren atención prioritaria."
                    />
                    <WelcomePoint
                      icon={Inbox}
                      accent="inicio"
                      title="Sin solicitudes"
                      text="Si no posees solicitudes, revisa el contenido de INAPI como videos, manuales, documentos y herramientas para que comiences a realizar tus primeras solicitudes."
                    />
                  </ul>
                </section>

                <section className="space-y-3">
                  <div>
                    <h2 className="text-label text-muted">APRENDE CON INAPI</h2>
                    <p className="text-body-xs text-muted-secondary mt-1 leading-relaxed">
                      Material didáctico para conocer la Propiedad Industrial antes de
                      solicitar. Todo está en{" "}
                      <span className="font-semibold text-foreground">Biblioteca</span>.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <ResourceTeaser
                      icon={PlayCircle}
                      iconClass="text-danger bg-danger-bg"
                      title="Tutoriales en video"
                      description="YouTube INAPI: cómo solicitar marcas y usar trámites en línea."
                      onClick={() =>
                        window.open(INAPI_YOUTUBE, "_blank", "noopener,noreferrer")
                      }
                    />
                    <ResourceTeaser
                      icon={Book}
                      iconClass="text-primary bg-info-bg"
                      title="Manuales y guías"
                      description="PDF oficiales con requisitos, plazos y buenas prácticas."
                      onClick={() => router.push("/biblioteca")}
                    />
                    <InapiHerramientasCard links={INAPI_HERRAMIENTAS_LINKS} />
                  </div>
                </section>

                <div className="rounded-lg border border-border bg-surface p-4 shadow-sm space-y-3">
                  <p className="text-label text-muted">PRIMER PASO</p>
                  <p className="text-body-sm text-foreground leading-relaxed">
                    Si aún no tienes una solicitud vigente, inicia tu trámite en el portal
                    oficial. Luego volverás aquí para seguirlo paso a paso.
                  </p>
                  <CTAButton
                    label="Ir al portal de solicitudes INAPI"
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={() =>
                      window.open(
                        INAPI_PORTAL_SOLICITUD_MARCA,
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                    icon={<ExternalLink size={18} />}
                  />
                </div>

                <section className="space-y-3 pt-1">
                  <div>
                    <h2 className="text-label text-muted">ACCESOS ÚTILES</h2>
                    <p className="text-body-xs text-muted-secondary mt-1">
                      Atajos para seguir aprendiendo o hablar con INAPI.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <QuickAccessCard
                      icon={Book}
                      label="Biblioteca"
                      description="Videos, manuales y guías"
                      onClick={() => router.push("/biblioteca")}
                    />
                    <QuickAccessCard
                      icon={HelpCircle}
                      label="Contacto"
                      description="Teléfono, correo y horarios"
                      onClick={() => router.push("/soporte")}
                    />
                  </div>
                </section>
              </div>
            )}

            {/* STATE B & C: ACTIVE USERS */}
            {(userState === 'active-urgent' || userState === 'active-no-urgent') && (
              <div className="space-y-6">
                {/* HERO CARD */}
                {urgentSolicitud ? (
                  <SemaphoreCard urgency={heroUrgency}>
                    <div className="flex justify-between items-center mb-3">
                      <StatusBadge
                        variant={heroUrgency}
                        label="ACCIÓN REQUERIDA"
                        showIcon
                      />
                      <span className="text-timestamp">Hace 10 min</span>
                    </div>
                    <h2 className="text-h2 text-foreground mb-1">
                      {urgentSolicitud.accion || "Cargar documento"}
                    </h2>
                    <p className="text-mono text-muted-secondary mb-4">
                      #{urgentSolicitud.id} ·{" "}
                      {urgentSolicitud.tipo === "marca"
                        ? "Marca Comercial"
                        : "Patente"}
                    </p>
                    <CTAButton
                      label={LABEL_VER_DETALLE_SOLICITUD}
                      variant={heroUrgency}
                      fullWidth
                      onClick={() =>
                        router.push(`/solicitudes/${urgentSolicitud.id}`)
                      }
                      icon={<ChevronRight size={18} />}
                    />
                  </SemaphoreCard>
                ) : (
                  <SemaphoreCard urgency="info">
                    <div className="flex justify-between items-center mb-3">
                      <StatusBadge variant="info" label="EN REVISIÓN" />
                      <span className="text-timestamp">Actualizado hoy</span>
                    </div>
                    <h2 className="text-h2 text-foreground mb-1">
                      {recentSolicitud?.nombre}
                    </h2>
                    <p className="text-mono text-muted-secondary mb-4">
                      #{recentSolicitud?.id} · Marca Comercial
                    </p>
                    <StepperProgress 
                      stepStates={getStepStates(recentSolicitud?.estado || 'EN_REVISION')} 
                      urgency="info"
                    />
                    <div className="mt-4 p-3 bg-info-bg rounded-md border border-primary-light">
                      <p className="text-body-xs text-primary-dark">
                        Esperando fin del período de oposición (30 días).
                      </p>
                    </div>
                  </SemaphoreCard>
                )}

                {/* SUMMARY ROW */}
                <div className="flex gap-2">
                  <SummaryCard 
                    count={currentSummary.enProceso} 
                    label="EN PROCESO" 
                    variant="info" 
                  />
                  <SummaryCard 
                    count={currentSummary.accionRequerida} 
                    label="ACCIÓN REQ." 
                    variant={currentSummary.accionRequerida > 0 ? "danger" : "neutral"} 
                    icon={currentSummary.accionRequerida > 0 ? AlertCircle : undefined}
                  />
                  <SummaryCard 
                    count={currentSummary.finalizadas} 
                    label="FINALIZADAS" 
                    variant={currentSummary.finalizadas > 0 ? "success" : "neutral"} 
                    icon={currentSummary.finalizadas > 0 ? CheckCircle2 : undefined}
                  />
                </div>

                <button 
                  onClick={() => router.push('/solicitudes')}
                  className="w-full text-center py-1 text-body-sm font-semibold text-primary flex items-center justify-center gap-1 hover:underline"
                >
                  Ver todas mis solicitudes <ChevronRight size={16} />
                </button>

                {/* QUICK ACCESS ROW */}
                <div className="pt-4 border-t border-border">
                  <div className="flex gap-2 text-center">
                    <QuickAccessGhost 
                      icon={Book} 
                      label="Biblioteca" 
                      onClick={() => router.push('/biblioteca')} 
                    />
                    {userState !== 'active-no-urgent' && (
                      <QuickAccessGhost 
                        icon={FileText} 
                        label="Certificados" 
                        onClick={() => router.push('/certificados')} 
                      />
                    )}
                    <QuickAccessGhost 
                      icon={HelpCircle} 
                      label="Contacto" 
                      onClick={() => router.push('/soporte')} 
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function SummaryCard({ 
  count, 
  label, 
  variant, 
  icon: Icon 
}: { 
  count: number; 
  label: string; 
  variant: "info" | "danger" | "success" | "neutral"; 
  icon?: React.ElementType;
}) {
  const styles = {
    info: "text-foreground bg-surface",
    danger: "text-danger bg-danger-bg border-danger",
    success: "text-success bg-success-bg border-success",
    neutral: "text-muted bg-background border-border",
  };

  return (
    <div className={clsx(
      "flex-1 flex flex-col items-center justify-center p-3 rounded-lg border border-border shadow-card",
      styles[variant]
    )}>
      <div className="flex items-center gap-1 mb-1">
        <span className="text-[28px] font-sans font-extrabold leading-none">{count}</span>
        {Icon && <Icon size={14} strokeWidth={3} />}
      </div>
      <span className="text-[9px] font-bold uppercase tracking-wider text-center">{label}</span>
    </div>
  );
}

const welcomeAccentStyles = {
  tramites: {
    card: "border-border",
    icon: "border-info/30 bg-info-bg text-info",
    body: "text-foreground/85",
  },
  alertas: {
    card: "border-border",
    icon: "border-warning/35 bg-warning-bg text-warning",
    body: "text-foreground/85",
  },
  inicio: {
    card: "border-border",
    icon: "border-success/30 bg-success-bg text-success",
    body: "text-muted-secondary",
  },
} as const;

function WelcomePoint({
  icon: Icon,
  accent,
  title,
  text,
}: {
  icon: React.ElementType;
  accent: keyof typeof welcomeAccentStyles;
  title: string;
  text: string;
}) {
  const styles = welcomeAccentStyles[accent];
  return (
    <li
      className={clsx(
        "flex gap-4 rounded-lg border bg-surface px-4 py-3.5 shadow-sm",
        styles.card
      )}
    >
      <div
        className={clsx(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border",
          styles.icon
        )}
        aria-hidden
      >
        <Icon size={22} strokeWidth={2.25} />
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
        <h3 className="text-body-sm font-extrabold text-foreground leading-snug">
          {title}
        </h3>
        <p className={clsx("text-body-sm leading-relaxed mt-1.5", styles.body)}>
          {text}
        </p>
      </div>
    </li>
  );
}

function InapiHerramientasCard({
  links,
}: {
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div className="rounded-lg border border-border bg-surface p-3 shadow-sm space-y-3">
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-success bg-success-bg"
          aria-hidden
        >
          <Wrench size={20} />
        </div>
        <p className="text-body-sm font-bold text-foreground">
          Herramientas de INAPI
        </p>
      </div>
      <ul className="space-y-1.5 border-t border-border pt-3">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-2 rounded-md px-2 py-2.5 min-h-[44px] text-body-sm font-semibold text-primary hover:bg-info-bg/50 transition-colors"
            >
              <span className="leading-snug">{link.label}</span>
              <ExternalLink size={16} className="shrink-0 text-muted" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ResourceTeaser({
  icon: Icon,
  iconClass,
  title,
  description,
  onClick,
}: {
  icon: React.ElementType;
  iconClass: string;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-lg border border-border bg-surface p-3 text-left shadow-sm transition-all hover:border-primary/25 hover:shadow-md active:bg-surface-elevated min-h-[44px]"
    >
      <div
        className={clsx(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
          iconClass
        )}
        aria-hidden
      >
        <Icon size={20} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-body-sm font-bold text-foreground">{title}</p>
        <p className="text-body-xs text-muted-secondary leading-snug mt-0.5 line-clamp-2">
          {description}
        </p>
      </div>
      <ChevronRight size={18} className="shrink-0 text-muted" aria-hidden />
    </button>
  );
}

function QuickAccessCard({
  icon: Icon,
  label,
  description,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  description?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2 p-4 bg-surface border border-border rounded-lg shadow-sm hover:shadow-md active:bg-background transition-all min-h-[44px]"
    >
      <div className="w-10 h-10 rounded-full bg-info-bg flex items-center justify-center text-primary">
        <Icon size={24} />
      </div>
      <span className="text-body-sm font-semibold text-foreground leading-tight">
        {label}
      </span>
      {description && (
        <span className="text-body-xs text-muted-secondary text-center leading-snug">
          {description}
        </span>
      )}
    </button>
  );
}

function QuickAccessGhost({ 
  icon: Icon, 
  label, 
  onClick 
}: { 
  icon: React.ElementType; 
  label: string; 
  onClick: () => void;
}) {
  return (
    <button 
      onClick={onClick}
      className="flex-1 flex flex-col items-center justify-center p-3 bg-surface border border-border rounded-md hover:bg-background active:bg-surface-elevated transition-colors"
    >
      <Icon size={20} className="text-primary mb-1.5" />
      <span className="text-body-xs font-medium text-muted-secondary">{label}</span>
    </button>
  );
}
