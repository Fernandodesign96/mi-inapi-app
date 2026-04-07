// Redirige /solicitudes al dashboard (tab activo se maneja en el layout)
import { redirect } from "next/navigation";

export default function SolicitudesPage() {
  redirect("/inicio");
}
