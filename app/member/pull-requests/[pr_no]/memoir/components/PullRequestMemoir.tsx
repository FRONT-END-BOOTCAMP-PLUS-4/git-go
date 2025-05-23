"use client";

import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import AccordionSidebar from "@/app/member/components/CreateMemoir/AccordionSideBar";
import ChangeList from "@/app/member/components/CreateMemoir/ChangeList";
import ChangeListLayout from "@/app/member/components/CreateMemoir/ChangeListLayout";
import CreateMemoirLayout from "@/app/member/components/CreateMemoir/CreateMemoirLayout";
import EditorForm from "@/app/member/components/CreateMemoir/EditorForm";
import Select from "@/app/member/components/Select";

import useExtractFilenames from "@/hooks/useExtractFileNames";
import { useRepoStore } from "@/store/repoStore";

import { CommitType } from "@/types/github/CommitType";
import { PullRequestType } from "@/types/github/PullRequestType";

export default function PullRequestMemoir() {
    const { pr_no }: { pr_no: string } = useParams();
    const { data: session } = useSession();
    const { selectedRepo } = useRepoStore();

    // PR 커밋 리스트 (API는 { commitList: PullRequestType[] } 반환)
    const [prData, setPrData] = useState<PullRequestType[]>([]);
    const [selectedSha, setSelectedSha] = useState<string>("");
    const [commitData, setCommitData] = useState<CommitType | null>(null);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);

    const containerRef = useRef<HTMLDivElement | null>(null);

    // 1) PR 커밋 목록 fetch
    useEffect(() => {
        const fetchPrCommits = async () => {
            if (!selectedRepo?.nameWithOwner || !session?.accessToken || !pr_no)
                return;

            try {
                const res = await fetch("/api/github/pull-requests/commits", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        accessToken: session.accessToken,
                        author: session.user.githubId,
                        repoFullName: selectedRepo.nameWithOwner,
                        prNumber: Number(pr_no),
                    }),
                });
                if (!res.ok) throw new Error("PR commits fetch failed");

                // **여기가 핵심**: API가 { commitList: [...] } 를 반환하니까 꺼내주세요.
                const json = (await res.json()) as {
                    commitList: PullRequestType[];
                };
                const list = Array.isArray(json.commitList)
                    ? json.commitList
                    : [];
                setPrData(list);

                // 첫 번째 SHA 기본 선택
                if (list.length > 0) {
                    setSelectedSha(list[0].sha);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchPrCommits();
    }, [selectedRepo?.nameWithOwner, session?.accessToken, pr_no]);

    // 2) selectedSha 가 바뀔 때마다 커밋 상세 fetch
    useEffect(() => {
        const fetchDetail = async () => {
            if (
                !selectedRepo?.nameWithOwner ||
                !session?.accessToken ||
                !selectedSha
            )
                return;

            try {
                const res = await fetch("/api/github/commits/detail", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        nameWithOwner: selectedRepo.nameWithOwner,
                        sha: selectedSha,
                        accessToken: session.accessToken,
                    }),
                });
                if (!res.ok) throw new Error("Commit detail fetch failed");

                const data = (await res.json()) as CommitType;
                setCommitData(data);
                setSelectedFile(null); // 파일 선택 초기화
            } catch (err) {
                console.error(err);
            }
        };

        fetchDetail();
    }, [selectedRepo?.nameWithOwner, session?.accessToken, selectedSha]);

    // selectedSha가 바뀔 때마다 스크롤을 최상단으로 이동
    useEffect(() => {
        containerRef.current?.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [selectedSha]);
    // 드롭다운 옵션
    const prOptions = prData.map((pr) => ({
        value: pr.sha,
        label: pr.message,
    }));

    // 로딩 처리
    if (!commitData) {
        return (
            <CreateMemoirLayout>
                <div className="p-8 text-center">Loading commit details…</div>
            </CreateMemoirLayout>
        );
    }

    return (
        <CreateMemoirLayout>
            {/* 사이드바 */}
            <AccordionSidebar
                files={useExtractFilenames(commitData.changeDetail)}
                selectedFile={selectedFile}
                onSelect={setSelectedFile}
            />

            <div className="grid grid-cols-2">
                {/* 변경 목록 + 커밋 선택 */}
                <ChangeListLayout>
                    <Select
                        options={prOptions}
                        value={selectedSha}
                        onChange={setSelectedSha}
                        placeholder="커밋을 선택하세요"
                    />
                    <ChangeList
                        changes={commitData.changeDetail}
                        selectedFile={selectedFile}
                        selectedCommitId={selectedSha}
                    />
                </ChangeListLayout>

                {/* 회고 작성 폼 */}
                <div className="col-span-1 flex flex-col justify-between gap-4 p-4">
                    <EditorForm
                        initialTitle=""
                        initialTags={[]}
                        initialContent={[]}
                        sourceId={selectedSha}
                        typeId={2}
                    />
                </div>
            </div>
        </CreateMemoirLayout>
    );
}
