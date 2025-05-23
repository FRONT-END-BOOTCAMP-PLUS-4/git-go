// store/useSummaryStore.ts
import { create } from "zustand";

interface SummaryState {
    aiSummary: string;
    setSummary: (summary: string) => void;

    summarizedMap: Record<string, boolean>;
    setSummarized: (sha: string, value: boolean) => void;
    isSummarized: (sha: string) => boolean;
    clearSummarized: () => void;
}

export const useSummaryStore = create<SummaryState>((set, get) => ({
    aiSummary: "",
    setSummary: (summary) => set({ aiSummary: summary }),

    summarizedMap: {},
    setSummarized: (sha, value) =>
        set((state) => ({
            summarizedMap: {
                ...state.summarizedMap,
                [sha]: value,
            },
        })),
    isSummarized: (sha) => !!get().summarizedMap[sha],

    clearSummarized: () => set({ summarizedMap: {} }),
}));
