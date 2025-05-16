import { create } from "zustand";

type RepoStore = {
    reloadRepoList: boolean;
    triggerReload: () => void;
    resetReload: () => void;
};

export const useRepoStore = create<RepoStore>((set) => ({
    reloadRepoList: false,
    triggerReload: () => set({ reloadRepoList: true }),
    resetReload: () => set({ reloadRepoList: false }),
}));