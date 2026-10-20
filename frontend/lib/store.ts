import { create } from "zustand";
import { Tramite } from "./mock/tramites";
import type { LoginMode } from "./session";
import { readSessionFromCookies } from "./session";

export type UserState = "new" | "active-urgent" | "active-no-urgent";

export function getUserState(tramites: Tramite[]): UserState {
  if (!tramites || tramites.length === 0) return "new";
  const hasUrgent = tramites.some((t) => t.status === "danger");
  return hasUrgent ? "active-urgent" : "active-no-urgent";
}

interface AppStore {
  userState: UserState;
  loginMode: LoginMode;
  sessionRut: string | null;
  sessionHydrated: boolean;
  setUserState: (state: UserState) => void;
  hydrateSession: () => void;
  setClaveUnicaSession: () => void;
  setInapiSession: (rutNum: string) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  userState: "active-urgent",
  loginMode: "claveunica",
  sessionRut: null,
  sessionHydrated: false,
  setUserState: (state) => set({ userState: state }),
  hydrateSession: () => {
    const { loginMode, sessionRut } = readSessionFromCookies();
    set({ loginMode, sessionRut, sessionHydrated: true });
  },
  setClaveUnicaSession: () =>
    set({
      loginMode: "claveunica",
      sessionRut: null,
      sessionHydrated: true,
      userState: "active-urgent",
    }),
  setInapiSession: (rutNum) =>
    set({
      loginMode: "inapi",
      sessionRut: rutNum,
      sessionHydrated: true,
    }),
}));
