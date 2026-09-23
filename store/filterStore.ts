import { create } from "zustand";

export type PropertyType = "apartment" | "house" | "villa" | "duplex" | "penthouse" | "studio" | null;

interface FilterState {
    search: string;
    type: PropertyType;
    betrooms: number | null;
    minPrice: number | null;
    maxPrice: number | null;

    setSearch: (search: string) => void;
    setType: (type: PropertyType) => void;
    setBetrooms: (betrooms: number | null) => void;
    setMinPrice: (minPrice: number | null) => void;
    setMaxPrice: (maxPrice: number | null) => void;

    resetFilter: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
    search: "",
    type: null,
    betrooms: null,
    minPrice: null,
    maxPrice: null,

    setSearch: (search: string) => set({ search }),
    setType: (type: PropertyType) => set({ type }),
    setBetrooms: (betrooms: number | null) => set({ betrooms }),
    setMinPrice: (minPrice: number | null) => set({ minPrice }),
    setMaxPrice: (maxPrice: number | null) => set({ maxPrice }),

    resetFilter: () => set({ search: "", type: null, betrooms: null, minPrice: null, maxPrice: null }),

}));