"use client";

import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import AccordionSidebar from "@/app/member/components/CreateMemoir/AccordionSideBar";
import ChangeList from "@/app/member/components/CreateMemoir/ChangeList";
import ChangeListLayout from "@/app/member/components/CreateMemoir/ChangeListLayout";
import CreateEditorForm from "@/app/member/components/CreateMemoir/CreateEditorForm";
import CreateMemoirLayout from "@/app/member/components/CreateMemoir/CreateMemoirLayout";
import PullRequestAiSummary from "@/app/member/components/CreateMemoir/PullRequestAiSummary";
import Loading from "@/app/member/components/Loading";
import Select from "@/app/member/components/Select";

import { useRepoStore } from "@/store/useRepoStore";
import { useSummaryStore } from "@/store/useSummaryStore";

import Error from "@/app/components/Error";
import NotFound from "@/app/not-found";
import { CommitType } from "@/types/github/CommitType";
import { PullRequestType } from "@/types/github/PullRequestType";

export default function PullRequestMemoir() {
    const { pr_no }: { pr_no: string } = useParams();
    const { data: session, status: sessionStatus } = useSession();
    const repo = useRepoStore((s) => s.selectedRepo);
    const { clearSummarized, setSummary, setRetryCount } = useSummaryStore();

    // 로딩/에러 상태 선언
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);

    // PR 커밋 목록, 선택된 SHA, 커밋 상세, 파일 리스트
    const [prData, setPrData] = useState<PullRequestType[]>([]);
    const [selectedSha, setSelectedSha] = useState<string>("");
    const [commitData, setCommitData] = useState<CommitType | null>(null);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);

    // AI 요약 모달 상태
    const [showModal, setShowModal] = useState(false);

    const containerRef = useRef<HTMLDivElement | null>(null);

    // 마운트 시 AI 요약 스토어 초기화
    useEffect(() => {
        clearSummarized();
        setSummary("");
        setRetryCount(2);
    }, [clearSummarized, setSummary, setRetryCount]);

    // PR 커밋 목록(fetchPrCommits)
    useEffect(() => {
        // 1) 반드시 session이 "authenticated" 상태여야만 로직을 시작
        if (sessionStatus !== "authenticated") {
            return; // 아직 인증 정보가 준비되지 않았거나, 로그아웃 상태.
        }

        const fetchPrCommits = async () => {
            setIsLoading(true);
            setLoadError(null);

            // 2) repo나 session.accessToken, pr_no가 없으면 잘못된 경로로 간주
            if (!repo?.nameWithOwner || !session?.accessToken || !pr_no) {
                setLoadError("잘못된 경로입니다.");
                setIsLoading(false);
                return;
            }

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

                if (res.status === 404) {
                    setLoadError("해당 PR 번호를 찾을 수 없습니다.");
                    setIsLoading(false);
                    return;
                }
                if (!res.ok) {
                    const json = await res.json().catch(() => null);
                    const msg =
                        (json && json.message) ||
                        "PR 커밋 목록을 가져오는 중 오류가 발생했습니다.";
                    setLoadError(msg);
                    setIsLoading(false);
                    return;
                }

                const json = (await res.json()) as {
                    commitList: PullRequestType[];
                };
                const list = Array.isArray(json.commitList)
                    ? json.commitList
                    : [];

                if (list.length === 0) {
                    setLoadError(
                        "해당 PR 커밋 목록이 비어 있거나 존재하지 않습니다."
                    );
                    setIsLoading(false);
                    return;
                }

                setPrData(list);
                setSelectedSha(list[0].sha); // 첫 번째 SHA 기본 선택
            } catch (err) {
                console.error("PR commits fetch error:", err);
                setLoadError(
                    "네트워크 오류가 발생했습니다. 다시 시도해주세요."
                );
                setIsLoading(false);
            }
        };

        fetchPrCommits();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [repo?.nameWithOwner, sessionStatus, session?.accessToken, pr_no]);

    // selectedSha가 바뀔 때마다 커밋 상세(fetchDetail)
    useEffect(() => {
        // 역시 session이 인증되지 않은 상태라면 아직 로직을 실행하지 않음
        if (sessionStatus !== "authenticated") {
            return;
        }

        const fetchDetail = async () => {
            if (!repo?.nameWithOwner || !session?.accessToken || !selectedSha) {
                return;
            }

            try {
                const res = await fetch(
                    "/api/github/pull-requests/commits/detail",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            nameWithOwner: repo.nameWithOwner,
                            sha: selectedSha,
                            accessToken: session.accessToken,
                        }),
                    }
                );

                if (res.status === 404) {
                    setLoadError(
                        "유효하지 않은 커밋 SHA입니다. 해당 커밋을 찾을 수 없습니다."
                    );
                    setIsLoading(false);
                    return;
                }
                if (!res.ok) {
                    const json = await res.json().catch(() => null);
                    const msg =
                        (json && json.message) ||
                        "커밋 상세 정보를 가져오는 중 오류가 발생했습니다.";
                    setLoadError(msg);
                    setIsLoading(false);
                    return;
                }

                const data = (await res.json()) as CommitType;
                setCommitData(data);
                setSelectedFile(null);
                setIsLoading(false);
            } catch (err) {
                console.error("Commit detail fetch error:", err);
                setLoadError(
                    "네트워크 오류가 발생했습니다. 다시 시도해주세요."
                );
                setIsLoading(false);
            }
        };

        fetchDetail();
    }, [repo?.nameWithOwner, sessionStatus, session?.accessToken, selectedSha]);

    // selectedSha가 바뀔 때 스크롤 최상단으로 이동
    useEffect(() => {
        containerRef.current?.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [selectedSha]);

    // PR 드롭다운 옵션 생성
    const prOptions = useMemo(
        () =>
            prData.map((pr) => ({
                value: pr.sha,
                label: pr.message,
            })),
        [prData]
    );

    // 변경된 파일 리스트 계산
    const files = useMemo(() => {
        if (!commitData) return [];
        return commitData.changeDetail.map((change) => change.filename);
    }, [commitData]);

    // 로딩 중이라면 Loading 컴포넌트
    if (isLoading) {
        return <Loading />;
    }

    // 로드 에러가 발생하면 NotFound 컴포넌트 한 번만 렌더
    if (loadError) {
        return <NotFound />;
    }

    // 커밋 데이터가 아직 없으면(정상 로직에서는 loadError나 isLoading에서 처리되므로 잘 안 오지만...)
    if (!commitData) {
        return <Error errorMessage="커밋 데이터를 불러올 수 없습니다." />;
    }

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
                {/* 사이드바: 변경된 파일 목록 */}
                <AccordionSidebar
                    files={files}
                    selectedFile={selectedFile}
                    onSelect={setSelectedFile}
                />

                <Panel defaultSize={40} minSize={20}>
                    {/* 변경 목록 + 커밋 선택 드롭다운 */}
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
                    <div
                        ref={containerRef}
                        className="bg-bg-member1 col-span-1 flex h-full min-h-0 flex-col justify-between gap-4 p-4"
                    >
                        <CreateEditorForm source={pr_no} typeId={2} />
                    </div>
                </Panel>
            </PanelGroup>
        </CreateMemoirLayout>
    );
}
