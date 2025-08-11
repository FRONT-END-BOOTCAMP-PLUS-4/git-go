/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useRef, useState, useCallback, useEffect } from "react";
import Button from "@/app/components/Button";
import { EditorFormHandle } from "@/types/memoir/Memoir";
import { MEMBER_URL } from "@/constants/url";
import { PlateEditor } from "./plate-editor/ui/plate-editor";
import { Value } from "@udecode/plate";
import { X } from "lucide-react";
import debounce from "lodash.debounce";
import { useMemoirStore } from "@/store/useMemoirStore";
import { useRepoStore } from "@/store/useRepoStore";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useSourceTitleStore } from "@/store/useSourceTitleStore";
import { useSummaryStore } from "@/store/useSummaryStore";

type CreateEditorFormProps = {
    source: string;
    typeId: number;
};

export default function CreateEditorForm({
    source,
    typeId,
}: CreateEditorFormProps) {
    const router = useRouter();
    const { data: session } = useSession();
    const repo = useRepoStore((s) => s.selectedRepo);
    const summary = useSummaryStore((s) => s.aiSummary);
    const sourceTitle = useSourceTitleStore((s) => s.sourceTitle);

    const title = useMemoirStore((s) => s.title);
    const tags = useMemoirStore((s) => s.tags);
    const tagInput = useMemoirStore((s) => s.tagInput);
    const content = useMemoirStore((s) => s.content);

    const setTitle = useMemoirStore((s) => s.setTitle);
    const setTagInput = useMemoirStore((s) => s.setTagInput);
    const addTag = useMemoirStore((s) => s.addTag);
    const removeTag = useMemoirStore((s) => s.removeTag);
    const setContent = useMemoirStore((s) => s.setContent);
    const resetStore = useMemoirStore((s) => s.reset);

    const editorRef = useRef<EditorFormHandle>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isComposing, setIsComposing] = useState(false);

    const debouncedPersist = useMemo(
        () =>
            debounce((val: Value) => {
                setContent(val);
            }, 1000),
        [setContent]
    );

    const handleEditorChange = useCallback(() => {
        const newContent = (editorRef.current?.getContent() ?? []) as Value;
        debouncedPersist(newContent);
    }, [debouncedPersist]);

    useEffect(() => {
        return () => debouncedPersist.cancel();
    }, [debouncedPersist]);

    const hasText =
        Array.isArray(content) &&
        content.some(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (node: any) =>
                Array.isArray(node.children) &&
                node.children.some((ch: any) => (ch.text ?? "").trim() !== "")
        );

    const formDisabled = !title.trim() || !hasText;

    const buildPayload = () => ({
        title,
        tags,
        content,
        source,
        aiSum: summary,
        userId: session!.user.id,
        typeId,
        repoId: repo!.dbId,
        sourceTitle,
    });

    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (isComposing) return;
        if (tags.length >= 10) return;
        if (e.key === "Enter" && tagInput.trim()) {
            e.preventDefault();
            addTag(tagInput.trim().toLowerCase());
            setTagInput("");
        }
    };

    const handleSave = async () => {
        if (loading || !session || !repo) {
            setError("로그인이 필요하거나 저장 중입니다.");
            return;
        }
        debouncedPersist.flush();

        setLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/memoirs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(buildPayload()),
            });
            if (!res.ok) {
                const body = await res.json().catch(() => null);
                throw new Error(body?.message || `저장 실패: ${res.status}`);
            }
            resetStore();
            router.push(MEMBER_URL.memoirs);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        debouncedPersist.cancel();
        resetStore();
        router.back();
    };

    return (
        <div className="flex h-full min-h-0 flex-col gap-2 overflow-y-hidden">
            {/* 제목 */}
            <input
                className="w-full px-3 py-2.5 text-3xl font-semibold outline-none"
                type="text"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
            />

            {/* 태그 */}
            <div className="flex flex-wrap items-center gap-1 px-3 py-2">
                {tags.map((tag) => (
                    <span
                        key={tag}
                        className="bg-bg-tag1 flex items-center rounded-md px-2 py-1 text-base"
                    >
                        {tag}
                        <X
                            onClick={() => removeTag(tag)}
                            className="ml-1 shrink-0 cursor-pointer"
                            size={14}
                        />
                    </span>
                ))}
                <input
                    id="tags"
                    className="flex-1 border-none focus:outline-none"
                    placeholder="태그를 입력하고 Enter를 눌러주세요. 최대 10개"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    onCompositionStart={() => setIsComposing(true)}
                    onCompositionEnd={() => setIsComposing(false)}
                />
            </div>

            {/* 에디터 */}
            <div className="min-h-0 flex-1">
                <PlateEditor
                    ref={editorRef}
                    handleEditorChange={handleEditorChange}
                />
            </div>

            {/* 버튼 */}
            <div className="flex justify-end gap-2">
                <Button type="lined" onClick={handleCancel}>
                    취소
                </Button>
                <Button
                    type={loading || formDisabled ? "disabled" : "default"}
                    onClick={handleSave}
                    isLoading={loading}
                >
                    {loading ? "저장 중" : "저장하기"}
                </Button>
            </div>

            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
    );
}
