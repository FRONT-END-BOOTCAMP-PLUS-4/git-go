"use client";

import Button from "@/app/components/Button";
import { EditorFormHandle } from "@/types/memoir/Memoir";
import { Value } from "@udecode/plate";
import { X } from "lucide-react";
import { Session } from "next-auth";
import { useCallback, useRef, useState } from "react";
import { PlateEditor } from "./plate-editor/ui/plate-editor";

type EditEditorFormProps = {
    title: string;
    setTitle: (e: string) => void;
    tags: string[];
    setTags: (e: string[]) => void;
    content: Value;
    setContent: (e: Value) => void;
    memoirId: number;
    session: Session | null;
    repo: { dbId: number; id: string; nameWithOwner: string } | null;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditEditorForm({
    title,
    setTitle,
    tags,
    setTags,
    content,
    setContent,
    memoirId,
    session,
    repo,
    setIsEditing,
}: EditEditorFormProps) {
    const [tagInput, setTagInput] = useState<string>("");

    const editorRef = useRef<EditorFormHandle>(null);

    const [initialContent] = useState(() => content);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const buildPayload = () => ({
        title,
        tags,
        content: editorRef.current?.getContent() ?? [],
        // aiSum: summary, // 주석 처리된 부분 유지
        memoirId,
    });

    // 에디터가 바뀔 때마다 호출할 onChange 핸들러
    const handleEditorChange = useCallback(() => {
        const newContent = editorRef.current?.getContent() ?? [];
        setContent(newContent as Value);
    }, []);

    // content에 글씨가 있는지 확인하는 함수
    const hasText = content.some((node) =>
        node.children.some((ch: any) => ch.text?.trim() !== "")
    );

    // 폼 입력 유효성 검사 (제목, 내용)
    const formDisabled = !title.trim() || !hasText;

    // tag에서 Enter 입력 시 tag 등록
    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (tags.length >= 10) {
            return;
        }

        if (e.key === "Enter" && tagInput.trim()) {
            e.preventDefault();
            const lowerCase = tagInput.trim().toLocaleLowerCase();
            const next = Array.from(new Set([...tags, lowerCase]));
            setTags(next);
            setTagInput("");
        }
    };

    // tag 삭제
    const removeTag = (tag: string) => {
        setTags(tags.filter((t) => t !== tag));
    };

    const handleEdit = async () => {
        // 이미 로딩 중이거나 필수 데이터가 없으면 함수 실행 중지
        if (loading || !session || !repo) {
            setError("로그인이 필요하거나 수정 중입니다.");
            return;
        }
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
            setIsEditing(false); // 수정 모드 종료
        } catch (err: any) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // 취소 버튼
    const handleCancel = () => {
        setIsEditing(false);
    };

    return (
        <div className="flex h-full min-h-0 flex-col gap-4 overflow-y-hidden">
            {/* 제목 */}
            <div>
                <label
                    className="mb-1 block text-sm font-medium"
                    htmlFor="title"
                >
                    제목
                </label>
                <input
                    className="border-border-primary1 w-full rounded-md border px-3 py-2.5"
                    id="title"
                    type="text"
                    placeholder="회고록 제목을 입력하세요..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            {/* 태그 */}
            <div>
                <label
                    className="black mb-1 text-sm font-medium"
                    htmlFor="tags"
                >
                    태그
                </label>
                <div className="border-border-primary1 flex flex-wrap items-center gap-1 rounded-md border px-3 py-2">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="bg-bg-primary2 flex items-center rounded-md px-2 py-1 text-sm"
                        >
                            {tag}
                            <X
                                onClick={() => removeTag(tag)}
                                className="ml-1 cursor-pointer"
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
                    />
                </div>
            </div>
            {/* 에디터 */}
            <div className="min-h-0 flex-1">
                <PlateEditor
                    ref={editorRef}
                    initialContent={initialContent}
                    handleEditorChange={handleEditorChange}
                />
            </div>
            {/* 버튼 */}
            <div className="flex justify-end gap-2">
                <Button type="lined" onClick={handleCancel}>
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
                    onClick={handleEdit}
                    isLoading={loading}
                >
                    {loading ? "수정 중" : "수정하기"}
                </Button>
            </div>
        </div>
    );
}
