"use client";
import { useRepoStore } from "@/store/repoStore";
import type { EditorFormHandle } from "@/types/github/ShareType";
import { useSession } from "next-auth/react";
import { useMemo, useRef, useState } from "react";

export function useMemoirForm(sourceName: string, typeId: number) {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const editorRef = useRef<EditorFormHandle>(null);

    const content = useMemo(
        () => editorRef.current?.getContent() ?? [],
        [editorRef.current]
    );

    const { data: session } = useSession();
    const repo = useRepoStore((s) => s.selectedRepo);

    const disabled = !title.trim() || content.length === 0;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSave = async () => {
        if (!session || !repo) {
            setError("로그인이 필요합니다.");
            return;
        }
        setLoading(true);
        setError(null);

        const payload = {
            title,
            tags,
            content,
            source: sourceName,
            aiSum: "AI 요약 텍스트",
            userId: session.user.id,
            typeId,
            repoId: 3,
        };

        try {
            const res = await fetch("/api/memoir", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!res.ok) {
                // 서버가 200번대가 아니면 에러로 처리
                const body = await res.json().catch(() => null);
                throw new Error(body?.message || `저장 실패: ${res.status}`);
            }
            // 성공 후 후속 처리
        } catch (err: any) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        title,
        setTitle,
        tags,
        setTags,
        editorRef,
        disabled,
        loading,
        error,
        handleSave,
    };
}
