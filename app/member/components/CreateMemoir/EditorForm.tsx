"use client";

import Button from "@/app/components/Button";
import { PlateEditor } from "@/app/member/components/CreateMemoir/plate-editor/ui/plate-editor";
import { useMemoirForm } from "@/hooks/useMemoirForm";
import { EditorFormHandle } from "@/types/github/ShareType";
import { Value } from "@udecode/plate";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import {
    forwardRef,
    ForwardRefRenderFunction,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";

type EditorFormProps = {
    initialTitle: string;
    onChangeTitle?: (e: string) => void;
    initialTags: string[];
    onChangeTag?: (e: string[]) => void;
    initialContent: Value;
    sourceId: string;
    typeId: number;
    isEditing?: boolean;
    onToggleEdit?: () => void;
    memoirId?: number;
};

const EditorFormInner: ForwardRefRenderFunction<
    EditorFormHandle,
    EditorFormProps
> = (
    {
        initialTitle,
        initialTags,
        initialContent,
        sourceId,
        typeId,
        isEditing,
        onToggleEdit,
        memoirId,
    },
    ref
) => {
    const {
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
    } = useMemoirForm(sourceId, typeId, memoirId);
    const router = useRouter();

    // 부모에서 호출할 수 있도록 getContent 노출
    useImperativeHandle(ref, () => ({
        getContent: () => editorRef.current?.getContent() ?? [],
    }));

    // 부모에서 전달된 초기값 세팅
    useEffect(() => {
        setTitle(initialTitle);
        setTags(initialTags);
    }, [initialTitle, initialTags, setTitle, setTags]);

    const [tagInput, setTagInput] = useState("");

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

    const removeTag = (tag: string) => {
        setTags(tags.filter((t) => t !== tag));
    };

    const onSave = async () => {
        if (isEditing) {
            await handleEdit();
            onToggleEdit?.();
        } else {
            await handleSave();
        }
    };

    const onCancel = () => {
        if (isEditing && onToggleEdit) {
            onToggleEdit();
        } else {
            router.back();
        }
    };

    // 버튼 텍스트 결정
    const buttonText = loading
        ? "저장 중…"
        : isEditing
          ? "회고록 수정 완료"
          : "회고록 작성 완료";

    return (
        <div className="flex flex-1 flex-col gap-4">
            {/* 제목 */}
            <div>
                <label
                    htmlFor="title"
                    className="mb-1 block text-sm font-medium"
                >
                    제목
                </label>

                <input
                    id="title"
                    type="text"
                    className="border-border-primary1 w-full rounded-md border px-3 py-2.5"
                    placeholder="회고록 제목을 입력하세요..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            {/* 태그 */}
            <div>
                <label
                    htmlFor="tags"
                    className="mb-1 block text-sm font-medium"
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
            <PlateEditor ref={editorRef} initialContent={initialContent} />

            <div className="flex justify-end gap-2">
                <Button type="lined" onClick={onCancel}>
                    취소
                </Button>
                <Button
                    onClick={onSave}
                    type={disabled ? "disabled" : "default"}
                    isLoading={loading}
                >
                    {buttonText}
                </Button>
            </div>
        </div>
    );
};

export default forwardRef<EditorFormHandle, EditorFormProps>(EditorFormInner);
