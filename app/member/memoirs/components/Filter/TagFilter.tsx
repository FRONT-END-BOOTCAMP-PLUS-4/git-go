import React from "react";
import { useFilterStore } from "@/store/useFilterStore";

type TagFilterProps = {
    tags: string[];
};

export default function TagFilter({ tags }: TagFilterProps) {
    const { tags: selectedTags, addTag, removeTag } = useFilterStore();

    const handleTagClick = (tag: string) => {
        if (selectedTags.includes(tag)) {
            removeTag(tag); // 이미 선택된 태그는 제거
        } else {
            addTag(tag); // 선택되지 않은 태그는 추가
        }
    };

    return (
        <div className="mt-4">
            <h2 className="text-text-secondary1 mb-2 text-base font-normal">
                태그
            </h2>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <div
                        className={`border-border-primary1 cursor-pointer rounded-lg border px-3 py-1 text-xs font-semibold ${
                            selectedTags.includes(tag)
                                ? "bg-primary2 text-primary7"
                                : "bg-white"
                        }`}
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                    >
                        {tag}
                    </div>
                ))}
            </div>
        </div>
    );
}
