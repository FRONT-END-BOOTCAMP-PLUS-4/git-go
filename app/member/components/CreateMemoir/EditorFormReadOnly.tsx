"use client";

import Button from "@/app/components/Button";
import { PlateEditor } from "@/app/member/components/CreateMemoir/plate-editor/ui/plate-editor";
import { Value } from "@udecode/plate";

interface Props {
    title: string;
    tags: string[];
    content: Value;
    handleStatusChange: () => void;
}

export default function EditorFormReadOnly({
    title,
    tags,
    content,
    handleStatusChange,
}: Props) {
    return (
        <div className="flex flex-1 flex-col gap-4">
            {/* 수정 삭제 버튼 */}
            <div className="flex items-center justify-end gap-2">
                <Button type="danger">삭제</Button>
                <Button onClick={handleStatusChange}>수정</Button>
            </div>
            {/* 제목 */}
            <div>
                <label className="mb-1 block text-base font-medium">제목</label>
                <div className="text-lg font-semibold">{title}</div>
            </div>

            {/* 태그 */}
            <div>
                <label className="mb-1 block text-base font-medium">태그</label>
                <div className="flex flex-wrap gap-1">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="bg-bg-primary2 rounded-md px-3 py-2 text-base"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* 읽기 전용 에디터 */}
            <PlateEditor readOnly initialContent={content} />
        </div>
    );
}
