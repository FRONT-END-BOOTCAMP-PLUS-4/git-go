// app/member/[sha]/[id]/DetailMemoir.tsx
"use client";

import ChangeList from "@/app/member/components/CreateMemoir/ChangeList";
import ChangeListLayout from "@/app/member/components/CreateMemoir/ChangeListLayout";
import EditorForm from "@/app/member/components/CreateMemoir/EditorForm";
import EditorFormReadOnly from "@/app/member/components/CreateMemoir/EditorFormReadOnly";
import FileTree from "@/app/member/components/CreateMemoir/FileTree";
import { GetMemoirResponseDto } from "@/application/usecase/memoir/dto/GetMemoirDto";
import { COMMITS } from "@/constants/mockCommits";
import { Value } from "@udecode/plate";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DetailMemoirLayout from "./DetailMemoirLayout";

export default function DetailMemoir() {
    const { sha, id }: { sha: string; id: string } = useParams();
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const parseId = Number(id);

    // 부모에서만 관리하는 초기값들
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [content, setContent] = useState<Value>([]);

    // 회고록 값 불러오기기
    const load = async () => {
        const res = await fetch(`/api/memoir/${id}`);
        const data = (await res.json()) as GetMemoirResponseDto;
        setTitle(data.title);
        setTags(data.tags ?? []);
        setContent(data.content as Value);
    };

    // 마운트 및 id 변경 시
    useEffect(() => {
        load();
    }, [id]);

    // 수정 모드 토글 핸들러
    const handleToggleEdit = async () => {
        if (isEditing) {
            await load();
        }
        setIsEditing((prev) => !prev);
    };

    return (
        <DetailMemoirLayout>
            <FileTree files={COMMITS.files} onSelect={setSelectedFile} />

            <div className="grid flex-1 grid-cols-2">
                <ChangeListLayout>
                    <div className="px-3 py-2 font-semibold">
                        {COMMITS.commit.message}
                    </div>
                    <ChangeList
                        changes={COMMITS.files}
                        selectedFile={selectedFile}
                    />
                </ChangeListLayout>

                <div className="col-span-1 flex flex-col justify-between gap-4 p-4">
                    {isEditing ? (
                        <EditorForm
                            initialTitle={title}
                            initialTags={tags}
                            initialContent={content}
                            sourceId={sha}
                            typeId={1}
                            isEditing={isEditing}
                            onToggleEdit={handleToggleEdit}
                            memoirId={parseId}
                        />
                    ) : (
                        <EditorFormReadOnly
                            title={title}
                            tags={tags}
                            content={content}
                            handleStatusChange={handleToggleEdit}
                            memoirId={parseId}
                        />
                    )}
                </div>
            </div>
        </DetailMemoirLayout>
    );
}
