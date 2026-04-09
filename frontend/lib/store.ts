import { create } from 'zustand';

export type UserState = 'new' | 'active-urgent' | 'active-no-urgent';

interface AppStore {
  userState: UserState;
  setUserState: (state: UserState) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  userState: 'active-urgent',
  setUserState: (state) => set({ userState: state }),
}));
