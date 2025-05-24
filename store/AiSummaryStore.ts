// store/useSummaryStore.ts
import { create } from "zustand";

interface SummaryState {
    aiSummary: string;
    retryCount: number;
    setRetryCount: (count: number) => void;
    setSummary: (summary: string) => void;

    summarizedMap: Record<string, boolean>;
    setSummarized: (sha: string, value: boolean) => void;
    isSummarized: (sha: string) => boolean;
    clearSummarized: () => void;
}

export const useSummaryStore = create<SummaryState>((set, get) => ({
    aiSummary: "",
    retryCount: 2,
    setRetryCount: (count) => set({ retryCount: count }),
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
