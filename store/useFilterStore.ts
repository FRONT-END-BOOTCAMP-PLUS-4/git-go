// store/useFilterStore.ts
import { create } from "zustand";

type FilterType = "commits" | "pullRequests";
type TimePeriod = "7days" | "30days" | "90days" | string;

interface FilterState {
    filters: Record<FilterType, boolean>;
    toggleFilter: (type: FilterType) => void;

    timePeriod: TimePeriod;
    setTimePeriod: (period: TimePeriod) => void;

    tags: string[]; // 태그 배열 상태
    addTag: (tag: string) => void; // 태그 추가 메서드
    removeTag: (tag: string) => void; // 태그 제거 메서드
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

    tags: [], // 초기 태그 배열
    addTag: (tag) =>
        set((state) => ({
            tags: [...state.tags, tag], // 태그 추가
        })),
    removeTag: (tag) =>
        set((state) => ({
            tags: state.tags.filter((t) => t !== tag), // 태그 제거
        })),
}));
