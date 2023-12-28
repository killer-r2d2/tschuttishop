import { create } from "zustand";

interface CartState {
  items: number[] | [];
  count: number;
  addItem: (id: number) => void;
  deleteItem: (id: number) => void;
}

export let cartStore = create<CartState>()((set) => ({
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
    set((state) => ({ items: state.items.filter((item) => item !== id) }));
    set((state) => ({ count: state.count - 1 }));
  },
}));
