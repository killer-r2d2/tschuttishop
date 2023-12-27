import { create } from "zustand";

export const userState = create((set) => ({
  user: null,
  setUser: (user) => set((state) => ({ user })),
}));
