"use client";

import Button from "@/app/components/Button";
import { MEMBER_URL } from "@/constants/url";
import { useSummaryStore } from "@/store/AiSummaryStore";
import { useRepoStore } from "@/store/repoStore";
import { EditorFormHandle } from "@/types/memoir/Memoir";
import { Value } from "@udecode/plate";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import { PlateEditor } from "./plate-editor/ui/plate-editor";

type CreateEditorFormProps = {
    source: string;
    typeId: number;
};

export default function CreateEditorForm({
    source,
    typeId,
}: CreateEditorFormProps) {
    const [title, setTitle] = useState<string>("");

    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState<string>("");
    const [content, setContent] = useState<Value>([]);
    const editorRef = useRef<EditorFormHandle>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const { data: session } = useSession();
    const repo = useRepoStore((s) => s.selectedRepo);
    const summary = useSummaryStore((s) => s.aiSummary);
    const [isComposing, setIsComposing] = useState(false);

    const buildPayload = () => ({
        title,
        tags,
        content: editorRef.current?.getContent() ?? [],
        source,
        aiSum: summary,
        userId: session!.user.id,
        typeId,
        repoId: repo!.dbId,
    });

    // 에디터가 바뀔 때마다 호출할 onChange 핸들러
    const handleEditorChange = useCallback(() => {
        const newContent = editorRef.current?.getContent() ?? [];
        setContent(newContent as Value);
    }, []);

    // content에 글씨가 있는지 확인하는 함수
    const hasText = useMemo(() => {
        return content.some((node) =>
            node.children.some((ch: any) => ch.text?.trim() !== "")
        );
    }, [content]);

    // 폼 입력 유효성 검사 (제목, 내용)
    const formDisabled = !title.trim() || !hasText;

    // tag에서 Enter 입력 시 tag 등록
    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (isComposing) return; // 한글 조합 중에는 무시

        if (tags.length >= 10) return;

        if (e.key === "Enter" && tagInput.trim()) {
            e.preventDefault();
            const lowerCase = tagInput.trim().toLowerCase();
            const next = Array.from(new Set([...tags, lowerCase]));
            setTags(next);
            setTagInput("");
        }
    };

    // tag 삭제
    const removeTag = (tag: string) => {
        setTags(tags.filter((t) => t !== tag));
    };

    const handleTest = () => {
        console.log("handleTest 동작");
        console.log("content: ", content);
    };

    // 회고록 저장
    const handleSave = async () => {
        // 이미 로딩 중이거나 필수 데이터가 없으면 함수 실행 중지
        if (loading || !session || !repo) {
            setError("로그인이 필요하거나 저장 중입니다.");
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

    // 취소 버튼
    const handleModalCancel = () => {
        router.back();
    };

    return (
        <div className="flex h-full min-h-0 flex-col gap-2 overflow-y-hidden">
            {/* 제목 */}
            <div>
                <input
                    className="w-full px-3 py-2.5 text-3xl font-semibold outline-none"
                    type="text"
                    placeholder="제목을 입력하세요"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus
                />
            </div>
            {/* 태그 */}
            <div>
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
                        placeholder="태그를 입력하고 Enter를 눌러주세요. 최대 10개 까지 가능합니다."
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagKeyDown}
                        onCompositionStart={() => setIsComposing(true)}
                        onCompositionEnd={() => setIsComposing(false)}
                    />
                </div>
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
                <Button type="lined" onClick={handleModalCancel}>
                    취소
                </Button>
                <Button
                    type={
                        loading
                            ? "disabled"
                            : formDisabled
                              ? "disabled"
                              : "default"
                    }
                    onClick={handleSave}
                    isLoading={loading}
                >
                    {loading ? "저장 중" : "저장하기"}
                </Button>
            </div>
        </div>
    );
}
