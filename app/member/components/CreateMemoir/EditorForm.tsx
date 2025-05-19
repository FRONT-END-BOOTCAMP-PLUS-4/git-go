"use client";

import { PlateEditor } from "@/plate-editor/ui/plate-editor";
import { X } from "lucide-react";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { EditorFormHandle } from "../../commits/[sha]/memoir/components/CommitMemoir";

interface Props {
    title: string;
    onTitleChange: (v: string) => void;
    tags: string[];
    onTagsChange: (v: string[]) => void;
}

const EditorFormInner = (
    { title, onTitleChange, tags, onTagsChange }: Props,
    ref: React.Ref<EditorFormHandle>
) => {
    const editorRef = useRef<EditorFormHandle>(null);

    // ① 부모에서 호출할 수 있도록 getContent 노출
    useImperativeHandle(ref, () => ({
        getContent: () => editorRef.current?.getContent() ?? [],
    }));

    const [tagInput, setTagInput] = useState("");

    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && tagInput.trim()) {
            e.preventDefault();
            const next = Array.from(new Set([...tags, tagInput.trim()]));
            onTagsChange(next);
            setTagInput("");
        }
    };

    const removeTag = (tag: string) => {
        onTagsChange(tags.filter((t) => t !== tag));
    };

    return (
        <div className="flex flex-col gap-4">
            {/* 제목 */}
            <div>
                <label htmlFor="title" className="block text-sm font-medium">
                    제목
                </label>
                <input
                    id="title"
                    type="text"
                    className="border-border-primary1 w-full rounded-md border px-3 py-2"
                    placeholder="회고록 제목을 입력하세요..."
                    value={title}
                    onChange={(e) => onTitleChange(e.target.value)}
                />
            </div>

            {/* 태그 */}
            <div>
                <label htmlFor="tags" className="block text-sm font-medium">
                    태그
                </label>
                <div className="border-border-primary1 flex flex-wrap items-center gap-1 rounded-md border px-3 py-2">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="bg-bg-primary2 flex items-center rounded-md px-3 py-2 text-sm"
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
                        placeholder="태그를 입력하고 Enter"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagKeyDown}
                    />
                </div>
            </div>

            {/* 에디터 */}
            <PlateEditor ref={editorRef} />
        </div>
    );
};

export default forwardRef<EditorFormHandle, Props>(EditorFormInner);
