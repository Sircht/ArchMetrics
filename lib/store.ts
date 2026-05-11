import { create } from "zustand";

export interface CalculationHistoryItem {
  id: string;
  tool: string;
  summary: string;
  createdAt: string;
}

interface CalculationState {
  history: CalculationHistoryItem[];
  favorites: string[];
  addHistory: (item: CalculationHistoryItem) => void;
  toggleFavorite: (tool: string) => void;
}

export const useCalculationStore = create<CalculationState>((set) => ({
  history: [],
  favorites: ["Stair Calculator"],
  addHistory: (item) => set((state) => ({ history: [item, ...state.history].slice(0, 20) })),
  toggleFavorite: (tool) => set((state) => ({ favorites: state.favorites.includes(tool) ? state.favorites.filter((item) => item !== tool) : [...state.favorites, tool] }))
}));
