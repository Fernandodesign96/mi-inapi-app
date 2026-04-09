import { mockSolicitudes } from "@/lib/mockData";
import SolicitudDetalleClient from "./SolicitudDetalleClient";

export async function generateStaticParams() {
  return mockSolicitudes.map((s) => ({
    id: s.id,
  }));
}

export default async function SolicitudDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const solicitud = mockSolicitudes.find(s => s.id === id) || mockSolicitudes[0];

  return <SolicitudDetalleClient solicitud={solicitud} />;
}
