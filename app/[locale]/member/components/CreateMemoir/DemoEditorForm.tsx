"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { PlateEditor } from "./plate-editor/ui/plate-editor"; // 내부 경로 맞춰서 import!

export default function DemoEditorForm() {
    const [title, setTitle] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState<string>("");

    const [isComposing, setIsComposing] = useState(false);

    // 태그 추가 (엔터)
    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (isComposing) return;
        if (tags.length >= 10) return;
        if (e.key === "Enter" && tagInput.trim()) {
            e.preventDefault();
            const lowerCase = tagInput.trim().toLowerCase();
            const next = Array.from(new Set([...tags, lowerCase]));
            setTags(next);
            setTagInput("");
        }
    };

    // 태그 삭제
    const removeTag = (tag: string) => {
        setTags(tags.filter((t) => t !== tag));
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
                        placeholder="태그를 입력하고 Enter를 눌러주세요. 최대 10개까지 가능합니다."
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
                <PlateEditor />
            </div>
        </div>
    );
}
