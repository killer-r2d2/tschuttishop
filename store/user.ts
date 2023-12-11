import { create } from "zustand";

export const userStore = create((set) => ({
  user: {
    name: "John Doe",
    email: "j@d.ch",
  },
  setUser: (user: any) => set({ user }),
}));
