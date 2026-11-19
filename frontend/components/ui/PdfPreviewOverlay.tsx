"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import CTAButton from "@/components/ui/CTAButton";
import { getSolicitudById } from "@/lib/mockData";
import { buildResolucionLegalPdf } from "@/lib/resolucionLegalPdf";
import { basePath } from "@/next.config";

export default function PdfPreviewOverlay({
  solicitudId,
  onClose,
}: {
  solicitudId: string;
  onClose: () => void;
}) {
  const [src, setSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const filename = `notificacion-${solicitudId}.pdf`;

  useEffect(() => {
    let objectUrl: string | null = null;
    let cancelled = false;

    (async () => {
      const solicitud = getSolicitudById(solicitudId);
      if (!solicitud) {
        setError("No se encontró la solicitud.");
        return;
      }
      try {
        let logoBytes: ArrayBuffer | undefined;
        try {
          const logoRes = await fetch(
            `${basePath}/inapi-logo-notificacion.jpg`
          );
          if (logoRes.ok) logoBytes = await logoRes.arrayBuffer();
        } catch {
          logoBytes = undefined;
        }
        const bytes = await buildResolucionLegalPdf(solicitud, logoBytes);
        const blob = new Blob([new Uint8Array(bytes)], {
          type: "application/pdf",
        });
        objectUrl = URL.createObjectURL(blob);
        if (!cancelled) setSrc(objectUrl);
      } catch {
        if (!cancelled) setError("No fue posible generar el PDF.");
      }
    })();

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [solicitudId]);

  return (
    <div
      className="fixed inset-0 z-[110] flex flex-col bg-background"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdf-preview-title"
    >
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-surface min-h-[56px]">
        <button
          type="button"
          onClick={onClose}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-foreground hover:bg-surface-elevated focus-visible:ring-2 focus-visible:ring-focus"
          aria-label="Cerrar visor"
        >
          <X size={22} strokeWidth={2} />
        </button>
        <h2
          id="pdf-preview-title"
          className="flex-1 min-w-0 text-[15px] font-semibold text-foreground truncate"
        >
          Resolución legal
        </h2>
        <CTAButton
          label="Descargar"
          variant="primary"
          size="sm"
          isDisabled={!src}
          icon={<Download size={16} />}
          onClick={() => {
            if (!src) return;
            const link = document.createElement("a");
            link.href = src;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            link.remove();
          }}
        />
      </div>
      {error ? (
        <p className="p-6 text-body-sm text-danger">{error}</p>
      ) : src ? (
        <iframe title="Resolución legal" src={src} className="flex-1 w-full bg-white" />
      ) : (
        <p className="p-6 text-body-sm text-muted">Preparando el documento…</p>
      )}
    </div>
  );
}
