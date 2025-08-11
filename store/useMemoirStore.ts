import { create } from "zustand";
import { Value } from "@udecode/plate";

type MemoirStore = {
    title: string;
    tags: string[];
    tagInput: string;
    content: Value;
    setTitle: (t: string) => void;
    setTagInput: (i: string) => void;
    addTag: (tag: string) => void;
    removeTag: (tag: string) => void;
    setContent: (c: Value) => void;
    reset: () => void;
};

export const useMemoirStore = create<MemoirStore>((set) => ({
    title: "",
    tags: [],
    tagInput: "",
    content: [],
    setTitle: (t) => set({ title: t }),
    setTagInput: (i) => set({ tagInput: i }),
    addTag: (tag) =>
        set((state) => ({
            tags: Array.from(new Set([...state.tags, tag])),
            tagInput: "",
        })),
    removeTag: (tag) =>
        set((state) => ({ tags: state.tags.filter((t) => t !== tag) })),
    setContent: (c) => set({ content: c }),
    reset: () =>
        set({
            title: "",
            tags: [],
            tagInput: "",
            content: [],
        }),
}));
