"use client";

import AccordionSidebar from "@/app/member/components/CreateMemoir/AccordionSideBar";
import ChangeList from "@/app/member/components/CreateMemoir/ChangeList";
import ChangeListLayout from "@/app/member/components/CreateMemoir/ChangeListLayout";
import EditorForm from "@/app/member/components/CreateMemoir/EditorForm";
import EditorFormReadOnly from "@/app/member/components/CreateMemoir/EditorFormReadOnly";
import Select from "@/app/member/components/Select";
import { GetMemoirResponseDto } from "@/application/usecase/memoir/dto/GetMemoirDto";
import { COMMITS } from "@/constants/mockCommits";
import { MOCK_COMMITS, MOCK_PR, options } from "@/constants/mockPullRequests";
import useExtractFilenames from "@/hooks/useExtractFileNames";
import { Value } from "@udecode/plate";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DetailMemoirLayout from "./DetailMemoirLayout";

export default function PullRequestDetailMemoir() {
    // 임시 코드
    const [selectedSha, setSelectedSha] = useState<string>(MOCK_PR[0].sha);
    const currentCommit = MOCK_COMMITS[selectedSha];

    const [selectedFile, setSelectedFile] = useState<string | null>(null);

    const { pr_no, id }: { pr_no: string; id: string } = useParams();

    const [isEditing, setIsEditing] = useState(false);
    const parseId = Number(id);

    // 부모에서만 관리하는 초기값들
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [content, setContent] = useState<Value>([]);

    // 마운트 및 id 변경 시
    useEffect(() => {
        load();
    }, [id]);

    useEffect(() => {
        setSelectedFile(null);
    }, [selectedSha]);

    function handleChange(sha: string) {
        setSelectedSha(sha); // 선택 상태 업데이트
    }
    // 회고록 값 불러오기기
    const load = async () => {
        const res = await fetch(`/api/memoirs/${id}`);
        const data = (await res.json()) as GetMemoirResponseDto;
        setTitle(data.title);
        setTags(data.tags ?? []);
        setContent(data.content as Value);
    };

    // 수정 모드 토글 핸들러
    const handleToggleEdit = async () => {
        if (isEditing) {
            await load();
        }
        setIsEditing((prev) => !prev);
    };

    return (
        <DetailMemoirLayout>
            <AccordionSidebar
                files={useExtractFilenames(COMMITS.files)}
                selectedFile={selectedFile}
                onSelect={setSelectedFile}
            />

            <div className="grid flex-1 grid-cols-2">
                <ChangeListLayout>
                    <Select
                        options={options}
                        value={selectedSha}
                        onChange={handleChange}
                    />
                    <ChangeList
                        changes={currentCommit.files}
                        selectedFile={selectedFile}
                    />
                </ChangeListLayout>

                <div className="col-span-1 flex flex-col justify-between gap-4 p-4">
                    {isEditing ? (
                        <EditorForm
                            initialTitle={title}
                            initialTags={tags}
                            initialContent={content}
                            sourceId={pr_no}
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
