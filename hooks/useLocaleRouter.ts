"use client";

import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "next/navigation";

/**
 * 언어 라우터 훅
 * - 현재 locale 추출
 * - locale 교체 함수 제공
 * - locale을 유지한 채 페이지 이동 함수 제공
 */
export function useLocaleRouter() {
    const pathname = usePathname();
    const router = useRouter();

    // 현재 locale 확인 (/ko/about → ko)
    const segments = pathname.split("/");
    const currentLocale = routing.locales.includes(
        segments[1] as (typeof routing.locales)[number]
    )
        ? (segments[1] as (typeof routing.locales)[number])
        : routing.defaultLocale;

    // locale 교체
    const changeLocale = (newLocale: (typeof routing.locales)[number]) => {
        const newSegments = [...segments];
        newSegments[1] = newLocale;
        const newPath = newSegments.join("/") || "/";
        router.push(newPath);
    };

    // locale 유지하며 이동
    const pushWithLocale = (path: string) => {
        const normalizedPath = path.startsWith("/") ? path : `/${path}`;
        router.push(`/${currentLocale}${normalizedPath}`);
    };

    return { currentLocale, changeLocale, pushWithLocale };
}
