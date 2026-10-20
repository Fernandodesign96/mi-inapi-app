import { getSolicitudById, mockSolicitudes } from "@/lib/mockData";
import { INAPI_TRAMITES } from "@/lib/datosReales";
import SolicitudDetalleClient from "./SolicitudDetalleClient";

export async function generateStaticParams() {
  const ids = new Set([
    ...mockSolicitudes.map((s) => s.id),
    ...INAPI_TRAMITES.map((s) => s.id),
  ]);
  return Array.from(ids).map((id) => ({ id }));
}

export default async function SolicitudDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const solicitud = getSolicitudById(id) ?? mockSolicitudes[0];

  return <SolicitudDetalleClient solicitud={solicitud} />;
}
