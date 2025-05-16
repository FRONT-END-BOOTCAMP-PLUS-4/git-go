import { create } from "zustand";

// 1. Zustand 스토어 타입 정의
type RepoStore = {
    selectedRepo: string | null;
    setSelectedRepo: (nameWithOwner: string | null) => void;
    reloadRepoList: boolean;
    triggerReload: () => void;
    resetReload: () => void;
};

// 2. Zustand 스토어 생성
export const useRepoStore = create<RepoStore>((set) => ({
    selectedRepo: null,
    setSelectedRepo: (repo) => set({ selectedRepo: repo }),
    reloadRepoList: false,
    triggerReload: () => set({ reloadRepoList: true }),
    resetReload: () => set({ reloadRepoList: false }),
}));