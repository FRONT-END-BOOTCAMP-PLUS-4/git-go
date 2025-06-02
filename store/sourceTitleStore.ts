import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";

interface SourceTitleProps {
    sourceTitle: string;
    setSourceTitle: (title: string) => void;
}

export const useSourceTitleStore = create<SourceTitleProps>()(
    persist<SourceTitleProps>(
        (set) => ({
            sourceTitle: "",
            setSourceTitle: (sourceTitle: string) => set({ sourceTitle }),
        }),
        { name: "source-title-store", storage: createJSONStorage(() => sessionStorage) }
    )
);
