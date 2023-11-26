import { create } from "zustand";

interface CartState {
  items: number[] | [];
  count: number;
  addItem: (id: number) => void;
  deleteItem: (id: number) => void;
}

export let cartStore = create<CartState>()((set) => ({
  items: [0],
  count: 0,
  addItem: (id: number) => {
    set((state) => ({ items: [...state.items, id] }));
    set((state) => ({ count: state.count + 1 }));
  },
  deleteItem: (id: number) => {
    set((state) => ({ items: state.items.filter((item) => item !== id) }));
    set((state) => ({ count: state.count - 1 }));
  },
}));
