"use client";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import AccordionSidebar from "@/app/member/components/CreateMemoir/AccordionSideBar";
import ChangeList from "@/app/member/components/CreateMemoir/ChangeList";
import ChangeListLayout from "@/app/member/components/CreateMemoir/ChangeListLayout";
import CreateMemoirLayout from "@/app/member/components/CreateMemoir/CreateMemoirLayout";
import Select from "@/app/member/components/Select";

import { useSummaryStore } from "@/store/AiSummaryStore";
import { useRepoStore } from "@/store/repoStore";

import CreateEditorForm from "@/app/member/components/CreateMemoir/CreateEditorForm";
import PullRequestAiSummary from "@/app/member/components/CreateMemoir/PullRequestAiSummary";
import Loading from "@/app/member/components/Loading";
import { CommitType } from "@/types/github/CommitType";
import { PullRequestType } from "@/types/github/PullRequestType";
import { useSourceTitleStore } from "@/store/sourceTitleStore";

export default function PullRequestMemoir() {
    const { pr_no }: { pr_no: string } = useParams();
    const { data: session } = useSession();
    const repo = useRepoStore((s) => s.selectedRepo);
    const { clearSummarized, setSummary, setRetryCount } = useSummaryStore();

    const [showModal, setShowModal] = useState(false);

    const [prData, setPrData] = useState<PullRequestType[]>([]);
    const [selectedSha, setSelectedSha] = useState<string>("");
    const [commitData, setCommitData] = useState<CommitType | null>(null);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);

    // 🔥 sourceTitleStore에서 sourceTitle 가져오기(추후 삭제 필요)
    const { sourceTitle } = useSourceTitleStore();
    console.log("sourceTitle", sourceTitle);

    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        clearSummarized();
        setSummary("");
        setRetryCount(2);
    }, []);
    // 1) PR 커밋 목록 fetch
    useEffect(() => {
        const fetchPrCommits = async () => {
            if (!repo?.nameWithOwner || !session?.accessToken || !pr_no) return;

            try {
                const res = await fetch("/api/github/pull-requests/commits", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        accessToken: session.accessToken,
                        author: session.user.githubId,
                        repoFullName: repo.nameWithOwner,
                        prNumber: Number(pr_no),
                    }),
                });
                if (!res.ok) throw new Error("PR commits fetch failed");

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
    }, [repo?.nameWithOwner, session?.accessToken, pr_no]);

    // 2) selectedSha 가 바뀔 때마다 커밋 상세 fetch
    useEffect(() => {
        const fetchDetail = async () => {
            if (!repo?.nameWithOwner || !session?.accessToken || !selectedSha)
                return;

            try {
                const res = await fetch("/api/github/commits/detail", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        nameWithOwner: repo.nameWithOwner,
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
    }, [repo?.nameWithOwner, session?.accessToken, selectedSha]);

    // selectedSha가 바뀔 때마다 스크롤을 최상단으로 이동
    useEffect(() => {
        containerRef.current?.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [selectedSha]);

    const prOptions = useMemo(
        () =>
            prData.map((pr) => ({
                value: pr.sha,
                label: pr.message,
            })),
        [prData]
    );

    const files = useMemo(() => {
        if (!commitData) return [];
        return commitData.changeDetail.map((change) => change.filename);
    }, [commitData]);

    // 로딩 처리
    if (!commitData) return <Loading />;

    return (
        <CreateMemoirLayout>
            <button
                onClick={() => setShowModal(true)}
                className="bg-primary7 fixed bottom-14 left-4 z-50 animate-[bounce_1s_infinite] cursor-pointer rounded-full p-3 text-white shadow-lg [animation-fill-mode:both]"
            >
                ✨ AI 요약 시작하기
            </button>
            {showModal && (
                <div className="fixed bottom-10 left-4 z-51 flex h-[60vh] w-[60vw] max-w-[770px]">
                    <PullRequestAiSummary
                        setShowModal={setShowModal}
                        pullRequest={prData}
                        prNo={pr_no}
                    />
                </div>
            )}
            <PanelGroup direction="horizontal" className="h-full w-full">
                {/* 사이드바 */}
                <AccordionSidebar
                    files={files}
                    selectedFile={selectedFile}
                    onSelect={setSelectedFile}
                />
                <Panel defaultSize={40} minSize={20}>
                    {/* 변경 목록 + 커밋 선택 */}
                    <ChangeListLayout>
                        <Select
                            options={prOptions}
                            value={selectedSha}
                            onChange={setSelectedSha}
                        />
                        <ChangeList
                            changes={commitData.changeDetail}
                            selectedFile={selectedFile}
                            selectedCommitId={selectedSha}
                        />
                    </ChangeListLayout>
                </Panel>
                <PanelResizeHandle className="bg-bg-primary2 hover:bg-text-gray1 w-1 cursor-col-resize" />

                {/* 회고 작성 폼 */}
                <Panel defaultSize={40} minSize={20}>
                    <div className="bg-bg-member1 col-span-1 flex h-full min-h-0 flex-col justify-between gap-4 p-4">
                        <CreateEditorForm source={pr_no} typeId={2} />
                    </div>
                </Panel>
            </PanelGroup>
        </CreateMemoirLayout>
    );
}
