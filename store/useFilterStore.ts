// store/useFilterStore.ts
import { create } from "zustand";

type FilterType = "commits" | "pullRequests";

interface FilterState {
    filters: Record<FilterType, boolean>;
    toggleFilter: (type: FilterType) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
    filters: {
        commits: false,
        pullRequests: false,
    },
    toggleFilter: (type) =>
        set((state) => ({
            filters: {
                ...state.filters,
                [type]: !state.filters[type],
            },
        })),
}));
