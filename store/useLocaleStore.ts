import { create } from "zustand";

type Locale = "ko" | "en";

interface LocaleState {
    currentLocale: Locale;
    setLocale: (locale: Locale) => void;
}

export const useLocaleStore = create<LocaleState>((set) => ({
    currentLocale: "ko", // 기본값
    setLocale: (locale) => set({ currentLocale: locale }),
}));
