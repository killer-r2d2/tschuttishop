import { create } from "zustand";

type FavoritesStore = {
  items: number[];
  addFav: (id: number) => void;
  removeFav: (id: number) => void;
};

const localStorageKey: string = "favoritesStore";
let storedState: string | null;

export let favoritesStore = create<FavoritesStore>()((set) => {
  if (typeof window !== "undefined") {
    storedState = localStorage.getItem(localStorageKey);
  }
  const initialState: FavoritesStore = storedState
    ? JSON.parse(storedState)
    : { items: [] };

  return {
    ...initialState,
    addFav: (id: number) => {
      set((state) => ({
        items: [...state.items, id],
      }));
    },
    removeFav: (id: number) => {
      set((state) => ({
        items: state.items.filter((item) => item !== id),
      }));
    },
  };
});

favoritesStore.subscribe((state) => {
  localStorage.setItem(localStorageKey, JSON.stringify(state));
});
