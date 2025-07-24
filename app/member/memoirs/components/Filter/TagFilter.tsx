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
        <div className="mt-2 flex items-center gap-x-2 md:mt-4 md:block">
            <h2 className="shrink-0 text-sm font-normal sm:text-base md:mb-2">
                태그
            </h2>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <div
                        className={`border-border-primary1 bg-bg-tag1 cursor-pointer rounded-md border px-2 py-1 text-xs font-semibold sm:px-3 sm:py-1 ${
                            selectedTags.includes(tag)
                                ? "bg-primary2 text-primary7"
                                : "bg-bg-member1"
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
