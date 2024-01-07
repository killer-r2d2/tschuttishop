import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartStore = {
  items: number[];
  count: number;
  addItem: (id: number) => void;
  deleteItem: (id: number) => void;
  clearCart: () => void;
};

export let cartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      count: 0,
      addItem: (id: number) => {
        if (cartStore.getState().items.includes(id)) {
          alert("Das Produkt ist bereits im Warenkorb!");
        } else {
          set((state) => ({ items: [...state.items, id] }));
          set((state) => ({ count: state.count + 1 }));
        }
      },
      deleteItem: (id: number) => {
        set((state) => ({
          items: state.items.filter((item) => item !== id),
          count: state.count - 1,
        }));
      },
      clearCart: () => {
        set((state) => ({
          items: [],
          count: 0,
        }));
      },
    }),
    {
      name: "cart-storage",
    },
  ),
);
