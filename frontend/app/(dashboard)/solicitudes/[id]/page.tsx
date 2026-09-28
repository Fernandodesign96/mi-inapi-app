import { getSolicitudById, mockSolicitudes } from "@/lib/mockData";
import SolicitudDetalleClient from "./SolicitudDetalleClient";

export async function generateStaticParams() {
  return mockSolicitudes.map((s) => ({
    id: s.id,
  }));
}

export default async function SolicitudDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const solicitud = getSolicitudById(id) ?? mockSolicitudes[0];

  return <SolicitudDetalleClient solicitud={solicitud} />;
}
