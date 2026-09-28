"use client";

import { useMemo, useState } from "react";
import {
  ExternalLink,
  Lightbulb,
  Search,
  Layers,
  FileSearch,
  FilePlus2,
  ListOrdered,
} from "lucide-react";
import TopBar from "@/components/ui/TopBar";
import FilterPills from "@/components/ui/FilterPills";
import CTAButton from "@/components/ui/CTAButton";
import ScrollToTopFab from "@/components/ui/ScrollToTopFab";
import {
  INAPI_HERRAMIENTAS,
  INAPI_HERRAMIENTAS_INTRO,
  INAPI_HERRAMIENTAS_PASOS,
  type InapiHerramienta,
  type InapiHerramientaAccent,
  type InapiHerramientaCategoria,
} from "@/lib/inapiHerramientas";
import { clsx } from "clsx";

type FilterId = "todas" | InapiHerramientaCategoria;

const accentStyles: Record<
  InapiHerramientaAccent,
  {
    icon: string;
    chip: string;
    bar: string;
    number: string;
  }
> = {
  info: {
    icon: "bg-info-bg text-info border-info/20",
    chip: "bg-info-bg text-info",
    bar: "bg-info",
    number: "bg-info text-white",
  },
  success: {
    icon: "bg-success-bg text-success border-success/20",
    chip: "bg-success-bg text-success",
    bar: "bg-success",
    number: "bg-success text-white",
  },
  warning: {
    icon: "bg-warning-bg text-warning border-warning/20",
    chip: "bg-warning-bg text-warning",
    bar: "bg-warning",
    number: "bg-warning text-white",
  },
  accent: {
    icon: "bg-accent-light text-accent border-accent/20",
    chip: "bg-accent-light text-accent",
    bar: "bg-accent",
    number: "bg-accent text-white",
  },
};

function ToolIcon({ herramienta }: { herramienta: InapiHerramienta }) {
  const className = "shrink-0";
  switch (herramienta.id) {
    case "buscador-marcas":
      return <Search size={22} strokeWidth={2.25} className={className} />;
    case "clasificador-niza":
      return <Layers size={22} strokeWidth={2.25} className={className} />;
    case "buscador-patentes":
      return <FileSearch size={22} strokeWidth={2.25} className={className} />;
    default:
      return <FilePlus2 size={22} strokeWidth={2.25} className={className} />;
  }
}

function HerramientaCard({ herramienta }: { herramienta: InapiHerramienta }) {
  const styles = accentStyles[herramienta.accent];

  return (
    <article className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
      <div className={clsx("h-1.5 w-full", styles.bar)} aria-hidden />
      <div className="space-y-4 p-5">
        <div className="flex items-start gap-3">
          <div
            className={clsx(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border",
              styles.icon
            )}
            aria-hidden
          >
            <ToolIcon herramienta={herramienta} />
          </div>
          <div className="min-w-0 flex-1 space-y-1.5">
            <span
              className={clsx(
                "inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider",
                styles.chip
              )}
            >
              {herramienta.shortLabel}
            </span>
            <h2 className="text-h3 font-bold text-foreground leading-snug">
              {herramienta.title}
            </h2>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-label text-muted">Para qué sirve</p>
          <p className="text-body-sm text-foreground leading-relaxed">
            {herramienta.paraQue}
          </p>
        </div>

        <div className="rounded-lg border border-border bg-background p-3.5">
          <p className="text-label text-muted mb-2">Cuándo usarla</p>
          <p className="text-body-sm text-foreground leading-relaxed">
            {herramienta.cuandoUsarla}
          </p>
        </div>

        <div>
          <p className="text-label text-muted mb-2">Cómo aprovecharla</p>
          <ul className="space-y-2" role="list">
            {herramienta.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-2.5 text-body-sm leading-relaxed">
                <span
                  className={clsx(
                    "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                    styles.bar
                  )}
                  aria-hidden
                />
                <span className="text-foreground">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        <CTAButton
          label={herramienta.ctaLabel}
          variant={herramienta.accent === "accent" ? "primary" : "outline"}
          fullWidth
          icon={<ExternalLink size={18} />}
          onClick={() =>
            window.open(herramienta.href, "_blank", "noopener,noreferrer")
          }
        />
      </div>
    </article>
  );
}

export default function HerramientasPage() {
  const [filter, setFilter] = useState<FilterId>("todas");

  const filtered = useMemo(
    () =>
      INAPI_HERRAMIENTAS.filter(
        (h) => filter === "todas" || h.categoria === filter
      ),
    [filter]
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar variant="section" title="Herramientas INAPI" />

      <div className="flex-1 screen-enter">
        <div className="px-6 pt-6 pb-8 space-y-8">
          <header className="space-y-2">
            <h1 className="text-h1 text-foreground">{INAPI_HERRAMIENTAS_INTRO.title}</h1>
            <p className="text-body-sm font-semibold text-primary leading-snug">
              {INAPI_HERRAMIENTAS_INTRO.subtitle}
            </p>
            <p className="text-body-sm text-muted-secondary leading-relaxed">
              {INAPI_HERRAMIENTAS_INTRO.lead}
            </p>
          </header>

          <section className="space-y-3" aria-labelledby="pasos-herramientas">
            <div className="flex items-center gap-2">
              <ListOrdered size={16} className="text-primary" aria-hidden />
              <h2 id="pasos-herramientas" className="text-label text-muted">
                Cómo usarlas, en orden
              </h2>
            </div>
            <ol className="space-y-3">
              {INAPI_HERRAMIENTAS_PASOS.map((paso) => (
                <li
                  key={paso.n}
                  className="flex gap-3 rounded-xl border border-border bg-surface p-4 shadow-sm"
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground text-h4 font-extrabold"
                    aria-hidden
                  >
                    {paso.n}
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-body-sm font-extrabold text-foreground">
                      {paso.title}
                    </p>
                    <p className="text-body-sm text-muted-secondary leading-relaxed mt-1">
                      {paso.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <div className="flex items-start gap-3 rounded-xl border border-border bg-info-bg p-4">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface text-info border border-border/60"
              aria-hidden
            >
              <Lightbulb size={20} strokeWidth={2.25} />
            </div>
            <p className="text-body-sm text-foreground leading-relaxed">
              <span className="font-extrabold">Consejo:</span> las búsquedas no
              reemplazan un examen de INAPI, pero te ahorran tiempo y observaciones.
              Si no estás seguro del resultado, revisa Biblioteca o escribe a Contacto.
            </p>
          </div>

          <section className="space-y-4" aria-labelledby="lista-herramientas">
            <div className="space-y-3">
              <h2 id="lista-herramientas" className="text-label text-muted">
                Catálogo de herramientas
              </h2>
              <FilterPills
                options={[
                  { value: "todas", label: "Todas" },
                  { value: "marcas", label: "Marcas" },
                  { value: "patentes", label: "Patentes" },
                  { value: "clasificacion", label: "Clasificación" },
                ]}
                activeValue={filter}
                onChange={(v) => setFilter(v as FilterId)}
              />
            </div>

            <div className="space-y-4">
              {filtered.map((herramienta) => (
                <HerramientaCard key={herramienta.id} herramienta={herramienta} />
              ))}
            </div>
          </section>
        </div>
      </div>

      <ScrollToTopFab />
    </div>
  );
}
