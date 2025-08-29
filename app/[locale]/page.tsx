"use client";

import { useTranslations } from "next-intl";

export default function Page() {
    const t = useTranslations("landing");

    return (
        <div>
            <h1>임시 테스트 페이지</h1>
            <div>{t("title")}</div>
        </div>
    );
}
