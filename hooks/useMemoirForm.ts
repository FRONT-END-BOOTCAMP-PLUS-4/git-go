"use client";
import { MEMBER_URL } from "@/constants/url";
import { useRepoStore } from "@/store/repoStore";
import type { EditorFormHandle } from "@/types/github/ShareType";
import { Value } from "@udecode/plate";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";

export function useMemoirForm(
    sourceName: string,
    typeId: number,
    memoirId?: number
) {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [content, setContent] = useState<Value>([]);
    const editorRef = useRef<EditorFormHandle>(null);

    // 에디터가 바뀔 때마다 호출할 onChange 핸들러
    const handleEditorChange = useCallback(() => {
        const newContent = editorRef.current?.getContent() ?? [];
        setContent(newContent as Value);
    }, []);

    // 텍스트 유무 검사
    const hasText = content.some((node) =>
        node.children.some((ch: any) => ch.text?.trim() !== "")
    );

    const disabled = !title.trim() || !hasText;

    const { data: session } = useSession();
    const repo = useRepoStore((s) => s.selectedRepo);

    // const disabled = true;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const buildPayload = () => ({
        title,
        tags,
        content: editorRef.current?.getContent() ?? [],
        source: sourceName,
        aiSum: "AI 요약 텍스트",
        userId: session!.user.id,
        typeId,
        repoId: repo!.dbId,
    });

    const handleSave = async () => {
        if (!session || !repo) {
            setError("로그인이 필요합니다.");
            return;
        }
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/memoirs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(buildPayload()),
            });
            if (!res.ok) {
                // 서버가 200번대가 아니면 에러로 처리
                const body = await res.json().catch(() => null);
                throw new Error(body?.message || `저장 실패: ${res.status}`);
            }
            // 성공 후 후속 처리
            router.push(MEMBER_URL.memoirs);
        } catch (err: any) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = async () => {
        if (!session || !repo) {
            setError("로그인이 필요합니다.");
            return;
        }
        console.log("handleEdit 진행");
        setLoading(true);
        setError(null);

        try {
            if (!memoirId) throw new Error("memoirId is required");
            const res = await fetch(`/api/memoirs/${memoirId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(buildPayload()),
            });
            if (!res.ok) {
                // 서버가 200번대가 아니면 에러로 처리
                const body = await res.json().catch(() => null);
                throw new Error(body?.message || `수정 실패: ${res.status}`);
            }
            // 성공 후 후속 처리
            let source = typeId === 1 ? "commit" : "pull-request";
            router.push(`${MEMBER_URL.memoirs_detail(source, memoirId)}`);
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
        handleEdit,
        handleEditorChange,
    };
}
