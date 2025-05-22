import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// 1. Zustand 스토어 타입 정의
type RepoStore = {
  selectedRepo: {
    dbid: number;
    id: string;
    nameWithOwner: string;
  } | null;
  setSelectedRepo: (repo: { dbid: number; id: string; nameWithOwner: string; } | null) => void;
  // selectedRepo: string | null;
  // setSelectedRepo: (nameWithOwner: string | null) => void;
  reloadRepoList: boolean;
  triggerReload: () => void;
  resetReload: () => void;
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
    }),
    { name: "repo-store", storage: createJSONStorage(() => sessionStorage), }
  )
);