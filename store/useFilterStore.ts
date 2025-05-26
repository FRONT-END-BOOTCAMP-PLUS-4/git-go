// store/useFilterStore.ts
import { create } from "zustand";

type FilterType = "commits" | "pullRequests" | "all";
type TimePeriod = "7days" | "30days" | "all" | string;

interface FilterState {
    filterType: FilterType;
    setFilterType: (type: FilterType) => void;

    timePeriod: TimePeriod;
    setTimePeriod: (period: TimePeriod) => void;

    tags: string[]; // 태그 배열 상태
    addTag: (tag: string) => void; // 태그 추가 메서드
    removeTag: (tag: string) => void; // 태그 제거 메서드
    resetTags: () => void;

    searchKeyword: string;
    setSearchKeyword: (keyword: string) => void;
    resetSearch: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
    filterType: "all",
    setFilterType: (type) => set({ filterType: type }),
    timePeriod: "all",
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
    resetTags: () => set({ tags: [] }),

    searchKeyword: "",
    setSearchKeyword: (keyword) => set({ searchKeyword: keyword }),
    resetSearch: () => set({ searchKeyword: "" }),
}));
