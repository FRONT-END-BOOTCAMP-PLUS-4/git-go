import { Value } from "@udecode/plate";

/**
 * Plate-Editor(JSON) 구조를 재귀 탐색하여,
 * { type: 'img', url: '...' } 노드의 url도 수집하도록 변경
 */
export function extractImageUrlsFromContent(value: Value): string[] {
    const urls: string[] = [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function traverse(node: any) {
        if (Array.isArray(node)) {
            node.forEach(traverse);
        } else if (node && typeof node === "object") {
            // Plate-Editor에서 실제로 사용 중인 타입이 'img'이므로, 여기서도 함께 검사
            if (
                (node.type === "image" || node.type === "img") &&
                typeof node.url === "string"
            ) {
                urls.push(node.url);
            }
            if (Array.isArray(node.children)) {
                traverse(node.children);
            }
        }
    }

    traverse(value);
    return urls;
}

/**
 * S3 URL → S3 Key (버킷 내부 경로) 변환 로직은 그대로 유지
 */
export function urlToS3Key(fullUrl: string): string {
    try {
        const parsed = new URL(fullUrl);
        // 예: parsed.pathname === "/uploads/1749004457323-thjjn0.webp"
        return parsed.pathname.replace(/^\//, "");
    } catch {
        return "";
    }
}
