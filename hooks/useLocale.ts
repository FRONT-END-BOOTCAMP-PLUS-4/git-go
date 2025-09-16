import { useLocaleStore } from "@/store/useLocaleStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export function useLocale() {
    const { currentLocale, setLocale } = useLocaleStore();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const urlLocale = pathname.startsWith("/ko")
            ? "ko"
            : pathname.startsWith("/en")
              ? "en"
              : "ko";

        if (urlLocale !== currentLocale) {
            setLocale(urlLocale);
        }
    }, [pathname, currentLocale, setLocale]);

    const changeLocale = (locale: typeof currentLocale) => {
        if (locale === currentLocale) return;

        // 상태 업데이트
        setLocale(locale);

        // 기존 pathname에서 현재 locale 제거 후 새 locale 추가
        const segments = pathname.split("/").filter(Boolean);
        if (segments[0] === "ko" || segments[0] === "en") segments.shift();
        const newPathname = `/${locale}/${segments.join("/")}`;
        router.push(newPathname);
    };

    return { currentLocale, changeLocale };
}
