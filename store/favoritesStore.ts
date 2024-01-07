import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavoritesStore = {
  items: number[];
  addFav: (id: number) => void;
  removeFav: (id: number) => void;
};

export let favoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      items: [],
      addFav: (id: number) => {
        set((state) => ({ items: [...state.items, id] }));
      },
      removeFav: (id: number) => {
        set((state) => ({
          items: state.items.filter((item) => item !== id),
        }));
      },
    }),
    {
      name: "favorites-storage",
    },
  ),
);
