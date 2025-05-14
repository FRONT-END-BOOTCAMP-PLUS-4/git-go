// store/useFilterStore.ts
import { create } from "zustand";

type FilterType = "commits" | "pullRequests";
type TimePeriod = "7days" | "30days" | "90days" | string;

interface FilterState {
    filters: Record<FilterType, boolean>;
    toggleFilter: (type: FilterType) => void;

    timePeriod: TimePeriod;
    setTimePeriod: (period: TimePeriod) => void;
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
    timePeriod: "7days",
    setTimePeriod: (period) => set({ timePeriod: period }),
}));
