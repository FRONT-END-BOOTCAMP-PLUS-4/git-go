"use client";

import { useCallback } from "react";
import { usePathShortener } from "./usePathShortener";

/**
 * 마크다운 텍스트에서 `📁 <경로>` 패턴만 찾아 경로를 축약합니다.
 * 줄 바꿈 전까지를 경로로 간주합니다.
 */
export function useMarkdownFolderCompressor(depth = 3) {
    const shortenPath = usePathShortener(depth);

    const compressFolderInMarkdown = useCallback(
        (md: string) => {
            // 📁 다음의 경로(개행/태그/별표 전까지)만 치환
            return md.replace(/📁\s*([^\n*<]+)/g, (_m, p1) => {
                const trimmed = String(p1).trim();
                return "📁 " + shortenPath(trimmed);
            });
        },
        [shortenPath]
    );

    return compressFolderInMarkdown;
}
