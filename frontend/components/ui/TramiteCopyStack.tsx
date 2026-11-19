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
    <div className="flex flex-col gap-0.5 min-w-0">
      <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted">
        {numero.label}
      </span>
      <span className="font-mono text-[15px] font-semibold tabular-nums text-foreground">
        {numero.value}
      </span>
    </div>
  ) : null;

  const estadoChip = (
    <div className="flex flex-col gap-0.5 min-w-0">
      <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted">
        Estado
      </span>
      <span
        className={clsx(
          "inline-flex w-fit items-center rounded-md px-2 py-0.5 text-[13px] font-semibold",
          chipClass
        )}
      >
        {estado}
      </span>
    </div>
  );

  const etapaBlock = (
    <div className="flex flex-col gap-0.5 min-w-0">
      <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted">
        Etapa
      </span>
      <span className="text-[15px] font-semibold leading-snug text-foreground">
        {etapa}
      </span>
      {subetapa ? (
        <span className="text-[13px] font-medium leading-snug text-foreground/80">
          {subetapa}
        </span>
      ) : null}
    </div>
  );

  return (
    <div className={clsx("rounded-md px-0 py-1 space-y-2.5 w-full", className)}>
      {showTipo ? (
        <span className="inline-flex items-center gap-1.5 rounded-md border border-border px-2 py-0.5 text-[11px] font-semibold text-foreground">
          <TipoIcon size={12} strokeWidth={2.25} aria-hidden />
          {tipoDerechoLabel(solicitud.tipo)}
        </span>
      ) : null}
      {order === "inicio" ? (
        <>
          {numeroBlock}
          {estadoChip}
          {etapaBlock}
        </>
      ) : (
        <>
          {etapaBlock}
          {estadoChip}
          {numeroBlock}
        </>
      )}
    </div>
  );
}
