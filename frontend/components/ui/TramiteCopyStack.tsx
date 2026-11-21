import {
  estadoCiudadano,
  etapaCiudadanaFromSolicitud,
  numeroExpedienteParts,
  subetapaCiudadana,
  tipoDerechoLabel,
} from "@/lib/etapasMiInapi";
import type { Solicitud } from "@/lib/mockData";
import { clsx } from "clsx";
import { Lightbulb, Palette, Tag } from "lucide-react";

type CopyOrder = "inicio" | "solicitudes";

const estadoChipClass: Record<string, string> = {
  "En trámite": "bg-info text-white",
  Registrada: "bg-success text-white",
  "Finalizada sin registro": "bg-foreground/80 text-background",
  "Registro no vigente": "bg-foreground/80 text-background",
  "Proceso de Renovación": "bg-info text-white",
  "Modificaciones al registro": "bg-info text-white",
};

export default function TramiteCopyStack({
  solicitud,
  order,
  showNumero = true,
  showTipo = false,
  className,
}: {
  solicitud: Pick<
    Solicitud,
    "id" | "etapaLabel" | "etapaIndex" | "estadoUnificado" | "tipo"
  >;
  order: CopyOrder;
  showNumero?: boolean;
  showTipo?: boolean;
  className?: string;
}) {
  const estado = estadoCiudadano(solicitud.estadoUnificado);
  const etapa = etapaCiudadanaFromSolicitud(solicitud);
  const subetapa = subetapaCiudadana(solicitud.etapaLabel);
  const numero = numeroExpedienteParts(solicitud);
  const chipClass = estadoChipClass[estado] ?? "bg-foreground/80 text-background";
  const TipoIcon =
    solicitud.tipo === "marca"
      ? Tag
      : solicitud.tipo === "patente"
        ? Lightbulb
        : Palette;

  const numeroBlock = showNumero ? (
    <div className="flex flex-col gap-0.5 min-w-0 font-sans">
      <span className="text-label text-muted">{numero.label}</span>
      <span className="text-mono-lg text-foreground">{numero.value}</span>
    </div>
  ) : null;

  const estadoChip = (
    <div className="flex flex-col gap-0.5 min-w-0 font-sans">
      <span className="text-label text-muted">Estado</span>
      <span
        className={clsx(
          "inline-flex w-fit items-center rounded-md px-2 py-0.5 text-body-xs font-bold",
          chipClass
        )}
      >
        {estado}
      </span>
    </div>
  );

  const metaItems =
    order === "inicio"
      ? [numeroBlock, estadoChip]
      : [estadoChip, numeroBlock];

  return (
    <div
      className={clsx(
        "flex w-full min-w-0 flex-col gap-3 md:flex-row md:items-start md:justify-between",
        className
      )}
    >
      <div className="flex min-w-0 shrink-0 flex-col gap-2.5 order-2 md:order-1 md:max-w-[38%]">
        {showTipo ? (
          <span className="inline-flex w-fit items-center gap-1.5 rounded-md border border-border px-2 py-0.5 text-body-xs font-bold font-sans text-foreground">
            <TipoIcon size={12} strokeWidth={2.25} aria-hidden />
            {tipoDerechoLabel(solicitud.tipo)}
          </span>
        ) : null}
        {metaItems}
      </div>

      <section
        aria-label="Etapa y subetapa del trámite"
        className={clsx(
          "ui-panel-soft order-1 md:order-2",
          "min-w-0 flex-1",
          "rounded-lg px-1 py-1 md:pl-4 md:pr-0"
        )}
      >
        <span className="text-label font-sans text-muted">Etapa</span>
        <p className="mt-1 font-slab text-h2 font-medium text-foreground break-words tracking-tight">
          {etapa}
        </p>
        {subetapa ? (
          <p className="mt-1.5 font-sans text-body font-medium text-foreground break-words">
            {subetapa}
          </p>
        ) : null}
      </section>
    </div>
  );
}
