import { create } from 'zustand';
import { Tramite } from './mock/tramites';

export type UserState = 'new' | 'active-urgent' | 'active-no-urgent';

export function getUserState(tramites: Tramite[]): UserState {
  if (!tramites || tramites.length === 0) return 'new';
  const hasUrgent = tramites.some(t => t.status === 'danger');
  return hasUrgent ? 'active-urgent' : 'active-no-urgent';
}

interface AppStore {
  userState: UserState;
  setUserState: (state: UserState) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  userState: 'active-urgent', // Default for demo
  setUserState: (state) => set({ userState: state }),
}));
