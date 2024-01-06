import { create } from "zustand";

interface CartState {
  items: number[];
  count: number;
  addItem: (id: number) => void;
  deleteItem: (id: number) => void;
  clearCart: () => void;
}

const localStorageKey: string = "cartState";

export let cartStore = create<CartState>()((set) => {
  // Load state from localStorage when the store is initialized
  const storedState = localStorage.getItem(localStorageKey);
  const initialState: CartState = storedState
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
