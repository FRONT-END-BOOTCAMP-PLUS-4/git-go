"use client";

import Button from "@/app/components/Button";
import { PlateEditor } from "@/app/member/components/CreateMemoir/plate-editor/ui/plate-editor";
import { MEMBER_URL } from "@/constants/url";
import { useConfirm } from "@/hooks/useConfirm";
import { Value } from "@udecode/plate";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import ConfirmDialog from "../ConfirmDialog";
import { ExportToolbarButton } from "./plate-editor/ui/export-toolbar-button";
import { FixedToolbar } from "./plate-editor/ui/fixed-toolbar";
import { ToolbarGroup } from "./plate-editor/ui/toolbar";

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
        const res = await fetch(`/api/memoirs/${memoirId}`, {
            method: "DELETE",
        });
        if (!res.ok) {
            // 에러 던져서 useConfirm 훅의 catch로 보냄
            throw new Error(`삭제 실패: ${res.statusText}`);
        }
        // 삭제 성공 시 메인 페이지(또는 목록)로 이동
        router.push(MEMBER_URL.memoirs);
    };

    const { openConfirm, handleModalCancel, handleConfirm, handleDeleteClick } =
        useConfirm(deleteMemoir);

    const handleCancel = () => {
        router.back();
    };

    return (
        <>
            <ConfirmDialog
                open={openConfirm}
                title="정말 삭제하시겠습니까?"
                description="삭제된 회고록은 복구할 수 없습니다."
                onCancel={handleModalCancel}
                onConfirm={handleConfirm}
                imageSrc={"/trash.png"} // 필요하면 아이콘 경로 넣으세요
            />
            <div className="flex h-full min-h-0 flex-col gap-2 overflow-y-hidden">
                {/* 제목 */}
                <div>
                    <div className="flex items-center justify-between">
                        <div className="px-3 py-2.5 text-3xl font-semibold">
                            {title}
                        </div>
                        <div
                            className="hover:text-danger1 hover:cursor-pointer"
                            onClick={handleDeleteClick}
                        >
                            <Trash2 />
                        </div>
                    </div>
                </div>

                {/* 태그 */}
                <div>
                    <div className="border-border-primary1 flex flex-wrap items-center gap-1 border-b px-3 pt-2 pb-5">
                        {tags.length > 0 ? (
                            tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="bg-bg-tag1 flex items-center rounded-md px-2 py-1 text-base"
                                >
                                    {tag}
                                </span>
                            ))
                        ) : (
                            <span className="text-text-gray1 py-2 text-sm">
                                등록된 태그가 없습니다.
                            </span>
                        )}
                    </div>
                </div>

                {/* 읽기 전용 에디터 */}
                <div className="min-h-0 flex-1">
                    <PlateEditor
                        readOnly
                        initialContent={content}
                        toolbar={
                            <div>
                                <FixedToolbar>
                                    <ToolbarGroup>
                                        <ExportToolbarButton title={title} />
                                    </ToolbarGroup>
                                </FixedToolbar>
                            </div>
                        }
                        className="border-none"
                    />
                </div>

                {/* 수정, 삭제 버튼 */}
                <div className="flex items-center justify-end gap-2">
                    <Button onClick={handleCancel} type="lined">
                        취소
                    </Button>
                    <Button onClick={handleStatusChange}>수정</Button>
                </div>
            </div>
        </>
    );
}
