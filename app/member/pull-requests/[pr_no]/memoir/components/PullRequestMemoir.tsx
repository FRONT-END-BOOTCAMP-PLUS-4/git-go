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
import { useRepoStore } from "@/store/repoStore";
import { useSession } from "next-auth/react";
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

    const { data: session } = useSession();
    const { selectedRepo } = useRepoStore();
    console.log(selectedRepo);

    // Pull Request 에 해당하는 커밋 목록 호출 함수
    const fetchPrCommitList = async (
        selectedRepo: string | undefined,
        prNo: number
    ) => {
        if (!selectedRepo || !prNo) return;

        const accessToken = session?.accessToken;
        const author = session?.user.githubId;
        try {
            const res = await fetch("/api/github/pull-requests/commits", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    accessToken,
                    author,
                    repoFullName: selectedRepo,
                    prNumber: prNo,
                }),
            });

            if (res.ok) {
                const result = await res.json();
                // 응답 데이터 콘솔 출력
                console.log(result.commitList);
            }
        } catch (error) {
            console.error(
                "Failed to fetch commit list from current PR: ",
                error
            );
        } finally {
        }
    };

    // 커밋 상세 내역 호출 함수
    const fetchCommitDetail = async (
        nameWithOwner: string | undefined,
        sha: string,
        accessToken: string | undefined
    ) => {
        if (!nameWithOwner || !sha) return;

        try {
            const res = await fetch("/api/github/commits/detail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nameWithOwner,
                    sha,
                    accessToken,
                }),
            });

            if (res.ok) {
                const result = await res.json();
                console.log(result);
            }
        } catch (error) {
            console.error("Failed to fetch commit detail", error);
        } finally {
        }
    };

    useEffect(() => {
        fetchPrCommitList(selectedRepo?.nameWithOwner, Number(pr_no));
    });

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
