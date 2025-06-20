import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// 1. Zustand 스토어 타입 정의
type RepoStore = {
    selectedRepo: {
        dbId: number;
        id: string;
        nameWithOwner: string;
    } | null;
    setSelectedRepo: (
        repo: { dbId: number; id: string; nameWithOwner: string; } | null
    ) => void;
    reloadRepoList: boolean;
    triggerReload: () => void;
    resetReload: () => void;

    // 👇 hydration 확인용 플래그 추가
    hasHydrated: boolean;
    setHasHydrated: (value: boolean) => void;
};

// 2. Zustand 스토어 생성
export const useRepoStore = create<RepoStore>()(
    persist<RepoStore>(
        (set) => ({
            selectedRepo: null,
            setSelectedRepo: (repo) => set({ selectedRepo: repo }),
            reloadRepoList: false,
            triggerReload: () => set({ reloadRepoList: true }),
            resetReload: () => set({ reloadRepoList: false }),

            // 초기값
            hasHydrated: false,
            setHasHydrated: (value: boolean) => set({ hasHydrated: value }),
        }),
        {
            name: "repo-store",
            storage: createJSONStorage(() => sessionStorage),

            // 👇 hydration 완료 시 호출됨
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            },
        }
    )
);
