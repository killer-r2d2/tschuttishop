import { create } from "zustand";

type UserState = {
  isLoggedIn: boolean;
  setIsLoggedIn: () => void;
};

export const userState = create<UserState>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: () => set({ isLoggedIn: true }),
}));
