"use client";

import type { ElementType } from "react";
import {
  Building2,
  Clock,
  Headphones,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import {
  INAPI_CONTACT_CHANNELS,
  INAPI_INSTITUTION,
  type InapiContactChannel,
} from "@/lib/inapiContact";
import { clsx } from "clsx";

const channelIcons: Record<string, ElementType> = {
  ubicacion: MapPin,
  telefono: Phone,
  horario: Clock,
  correo: Mail,
};

const channelIconStyle: Record<string, string> = {
  ubicacion: "bg-info-bg text-info",
  telefono:  "bg-success-bg text-success",
  horario:   "bg-[#EEF2FF] text-[#4F46E5]",
  correo:    "bg-danger-bg text-danger",
};

function ContactChannelRow({ channel }: { channel: InapiContactChannel }) {
  const Icon = channelIcons[channel.id] ?? Mail;
  const iconStyle = channelIconStyle[channel.id] ?? "bg-surface-elevated text-muted-secondary";
  const isLink = Boolean(channel.href);

  return (
    <div
      className={clsx(
        "flex gap-3 rounded-xl border border-border bg-surface p-3.5 transition-colors",
        isLink && "hover:border-primary/30 hover:bg-surface"
      )}
    >
      <div
        className={clsx(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/50",
          iconStyle
        )}
        aria-hidden
      >
        <Icon size={18} strokeWidth={2.25} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-body-xs font-bold uppercase tracking-wide text-muted">
          {channel.label}
        </p>
        {isLink ? (
          <a
            href={channel.href}
            className="mt-0.5 block text-body-sm font-semibold text-primary leading-snug hover:underline break-words"
          >
            {channel.value}
          </a>
        ) : (
          <p className="mt-0.5 text-body-sm font-medium text-foreground leading-snug">
            {channel.value}
          </p>
        )}
      </div>
    </div>
  );
}

export default function InapiContactCard() {
  return (
    <div className="space-y-4">
      {/* Encabezado sin card de color */}
      <div className="flex gap-3 items-center pb-4 border-b border-border">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border/50 bg-surface-elevated text-foreground shadow-sm"
          aria-hidden
        >
          <Headphones size={24} strokeWidth={2} />
        </div>
        <div>
          <h2 className="text-h3 font-extrabold text-foreground leading-tight">
            Información de contacto
          </h2>
          <p className="text-body-xs text-muted-secondary mt-0.5">
            Canales oficiales de atención INAPI
          </p>
        </div>
      </div>

      {/* Bloque institución */}
      <div className="flex gap-3 items-start rounded-xl border border-border bg-surface p-3.5">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-warning-bg text-warning"
          aria-hidden
        >
          <Building2 size={18} />
        </div>
        <div className="min-w-0">
          <p className="text-body-sm font-bold text-foreground leading-snug">
            {INAPI_INSTITUTION.name}
          </p>
          <p className="mt-1 text-body-xs text-muted-secondary">
            RUT {INAPI_INSTITUTION.rut}
          </p>
        </div>
      </div>

      {/* Canales */}
      <div className="space-y-2">
        {INAPI_CONTACT_CHANNELS.map((channel) => (
          <ContactChannelRow key={channel.id} channel={channel} />
        ))}
      </div>
    </div>
  );
}
