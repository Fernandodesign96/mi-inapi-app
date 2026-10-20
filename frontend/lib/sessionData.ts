import { useAppStore } from "@/lib/store";
import {
  getInapiUser,
  getTramitesByRut,
  notificacionesFromTramites,
} from "@/lib/datosReales";
import {
  mockNotificacionesNoUrgent,
  mockNotificacionesUrgent,
  mockSummaryNoUrgent,
  mockSummaryUrgent,
  mockTramitesNoUrgent,
  mockTramitesUrgent,
  mockUser,
  type Notification,
  type Solicitud,
  type User,
} from "@/lib/mockData";

export function useSessionSolicitudes(): Solicitud[] {
  const { loginMode, sessionRut, userState } = useAppStore();
  if (loginMode === "inapi" && sessionRut) {
    return getTramitesByRut(sessionRut);
  }
  if (userState === "new") return [];
  if (userState === "active-no-urgent") return mockTramitesNoUrgent;
  return mockTramitesUrgent;
}

export function useSessionNotificaciones(): Notification[] {
  const { loginMode, sessionRut, userState } = useAppStore();
  if (loginMode === "inapi" && sessionRut) {
    return notificacionesFromTramites(getTramitesByRut(sessionRut));
  }
  if (userState === "new") return [];
  if (userState === "active-no-urgent") return mockNotificacionesNoUrgent;
  return mockNotificacionesUrgent;
}

export function useSessionUser(): User {
  const { loginMode, sessionRut } = useAppStore();
  if (loginMode === "inapi" && sessionRut) {
    return getInapiUser(sessionRut) ?? mockUser;
  }
  return mockUser;
}

export function useSessionSummary() {
  const solicitudes = useSessionSolicitudes();
  const { loginMode, userState } = useAppStore();
  if (loginMode === "inapi") {
    return {
      enProceso: solicitudes.filter(
        (s) => s.urgency !== "success" && s.urgency !== "neutral"
      ).length,
      accionRequerida: solicitudes.filter(
        (s) => s.urgency === "danger" || s.urgency === "warning"
      ).length,
      finalizadas: solicitudes.filter((s) => s.urgency === "success").length,
    };
  }
  if (userState === "active-no-urgent") return mockSummaryNoUrgent;
  return mockSummaryUrgent;
}

export function useIsInapiSession(): boolean {
  const { loginMode, sessionRut } = useAppStore();
  return loginMode === "inapi" && Boolean(sessionRut);
}
