import { create } from "zustand";

type CartStore = {
  items: number[];
  count: number;
  addItem: (id: number) => void;
  deleteItem: (id: number) => void;
  clearCart: () => void;
};

const localStorageKey: string = "cartStore";
let storedState: string | null;

export let cartStore = create<CartStore>()((set) => {
  if (typeof window !== "undefined") {
    storedState = localStorage.getItem(localStorageKey);
  }
  const initialState: CartStore = storedState
    ? JSON.parse(storedState)
    : { items: [], count: 0 };

  return {
    ...initialState,
    addItem: (id: number) => {
      if (initialState.items.includes(id)) {
        alert("Das Produkt ist bereits im Warenkorb!");
      } else {
        set((state) => ({
          items: [...state.items, id],
          count: state.count + 1,
        }));
      }
    },
    deleteItem: (id: number) => {
      set((state) => ({
        items: state.items.filter((item) => item !== id),
        count: state.count - 1,
      }));
    },
    clearCart: () => {
      set({ items: [], count: 0 });
    },
  };
});

cartStore.subscribe((state) => {
  localStorage.setItem(localStorageKey, JSON.stringify(state));
});
