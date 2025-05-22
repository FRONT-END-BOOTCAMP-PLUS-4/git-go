"use client";

import Button from "@/app/components/Button";
import { PlateEditor } from "@/app/member/components/CreateMemoir/plate-editor/ui/plate-editor";
import { MEMBER_URL } from "@/constants/url";
import { useConfirm } from "@/hooks/useConfirm";
import { Value } from "@udecode/plate";
import { useRouter } from "next/navigation";
import ConfirmDialog from "../ConfirmDialog";

interface Props {
    title: string;
    tags: string[];
    content: Value;
    handleStatusChange: () => void;
    memoirId: number;
}

export default function EditorFormReadOnly({
    title,
    tags,
    content,
    handleStatusChange,
    memoirId,
}: Props) {
    const router = useRouter();
    const deleteMemoir = async () => {
        const res = await fetch(`/api/memoir/${memoirId}`, {
            method: "DELETE",
        });
        const data = await res.json();
        // 성공 시 필요 로직(리다이렉트, 상태 갱신 등)
        if (!res.ok) {
            // 에러 던져서 useConfirm 훅의 catch로 보냄
            throw new Error(`삭제 실패: ${res.statusText}`);
        }
        // 삭제 성공 시 메인 페이지(또는 목록)로 이동
        router.push(MEMBER_URL.memoirs);
    };

    const { openConfirm, handleCancel, handleConfirm, handleDeleteClick } =
        useConfirm(deleteMemoir);

    return (
        <>
            <ConfirmDialog
                open={openConfirm}
                title="정말 삭제하시겠습니까?"
                description="삭제된 회고록은 복구할 수 없습니다."
                onCancel={handleCancel}
                onConfirm={handleConfirm}
                imageSrc={"/trash.png"} // 필요하면 아이콘 경로 넣으세요
            />
            <div className="flex flex-1 flex-col gap-4">
                {/* 수정 삭제 버튼 */}
                <div className="flex items-center justify-end gap-2">
                    <Button onClick={handleDeleteClick} type="danger">
                        삭제
                    </Button>
                    <Button onClick={handleStatusChange}>수정</Button>
                </div>
                {/* 제목 */}
                <div>
                    <label className="mb-1 block text-base font-medium">
                        제목
                    </label>
                    <div className="text-lg font-semibold">{title}</div>
                </div>

                {/* 태그 */}
                <div>
                    <label className="mb-1 block text-base font-medium">
                        태그
                    </label>
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
        </>
    );
}
