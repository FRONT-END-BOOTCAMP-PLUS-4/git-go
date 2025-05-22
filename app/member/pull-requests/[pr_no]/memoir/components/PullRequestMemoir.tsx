"use client";

import AccordionSidebar from "@/app/member/components/CreateMemoir/AccordionSideBar";
import ChangeList from "@/app/member/components/CreateMemoir/ChangeList";
import ChangeListLayout from "@/app/member/components/CreateMemoir/ChangeListLayout";
import CreateMemoirLayout from "@/app/member/components/CreateMemoir/CreateMemoirLayout";
import EditorForm from "@/app/member/components/CreateMemoir/EditorForm";
import Select from "@/app/member/components/Select";
import { COMMITS } from "@/constants/mockCommits";
import { MOCK_COMMITS, MOCK_PR, options } from "@/constants/mockPullRequests";
import useExtractFilenames from "@/hooks/useExtractFileNames";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PullRequestMemoir() {
    // 임시 코드
    const [selectedSha, setSelectedSha] = useState<string>(MOCK_PR[0].sha);
    const currentCommit = MOCK_COMMITS[selectedSha];

    const [selectedFile, setSelectedFile] = useState<string | null>(null);

    const { pr_no }: { pr_no: string } = useParams();

    function handleChange(sha: string) {
        setSelectedSha(sha); // 선택 상태 업데이트
    }

    useEffect(() => {
        setSelectedFile(null);
    }, [selectedSha]);

    return (
        <CreateMemoirLayout>
            <AccordionSidebar
                files={useExtractFilenames(COMMITS.files)}
                selectedFile={selectedFile}
                onSelect={setSelectedFile}
            />
            <div className="grid grid-cols-2">
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
                    <EditorForm
                        initialTitle=""
                        initialTags={[]}
                        initialContent={[]}
                        sourceId={pr_no}
                        typeId={2}
                    />
                </div>
            </div>
        </CreateMemoirLayout>
    );
}
