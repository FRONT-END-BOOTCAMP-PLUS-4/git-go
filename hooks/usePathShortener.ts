// hooks/usePathShortener.ts
"use client";

import { useCallback } from "react";

/**
 * 경로 문자열에서 뒤에서 depth개만 남기고 앞부분은 "…/" 로 축약합니다.
 * 예: "a/b/c/d/e" (depth=3) -> "…/c/d/e"
 */
export function usePathShortener(depth = 3) {
    const shortenPath = useCallback(
        (path: string) => {
            const parts = path.split("/").filter(Boolean);
            if (parts.length <= depth) return path;
            return "…/" + parts.slice(-depth).join("/");
        },
        [depth]
    );

    return shortenPath;
}
