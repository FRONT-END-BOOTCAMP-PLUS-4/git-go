"use client";

import AccordionSidebar from "@/app/member/components/CreateMemoir/AccordionSideBar";
import AiSummary from "@/app/member/components/CreateMemoir/AiSummary";
import ChangeList from "@/app/member/components/CreateMemoir/ChangeList";
import ChangeListLayout from "@/app/member/components/CreateMemoir/ChangeListLayout";
import CreateEditorForm from "@/app/member/components/CreateMemoir/CreateEditorForm";
import CreateMemoirLayout from "@/app/member/components/CreateMemoir/CreateMemoirLayout";
import Loading from "@/app/member/components/Loading";
import { useRepoStore } from "@/store/useRepoStore";
import { useSummaryStore } from "@/store/useSummaryStore";
import { CommitType } from "@/types/github/CommitType";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

export default function CommitMemoir() {
    const router = useRouter();
    const { sha }: { sha: string } = useParams();
    const repo = useRepoStore((s) => s.selectedRepo);
    const { data: session } = useSession();
    const { clearSummarized, setSummary, setRetryCount } = useSummaryStore();

    // 로딩/에러 상태
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);

    // 커밋 상세 정보
    const [commitData, setCommitData] = useState<CommitType | null>(null);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);

    // AI 요약 모달 상태
    const [showModal, setShowModal] = useState(false);

    // 마운트 시 AI 요약 스토어 초기화
    useEffect(() => {
        clearSummarized();
        setSummary("");
        setRetryCount(2);
    }, [clearSummarized, setSummary, setRetryCount]);

    // 커밋 상세를 가져오는 함수
    const fetchCommitDetail = async (
        nameWithOwner: string,
        sha: string,
        accessToken: string
    ) => {
        setIsLoading(true);
        setLoadError(null);

        try {
            const res = await fetch("/api/github/commits/detail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nameWithOwner, sha, accessToken }),
            });

            if (res.status === 404) {
                // GitHub API에서 404를 내려주는 경우(sha가 아예 없는 경우)
                setLoadError(
                    "유효하지 않은 커밋 SHA입니다. 커밋을 찾을 수 없습니다."
                );
                setIsLoading(false);
                return;
            }
            if (!res.ok) {
                // 400, 500 등의 기타 에러
                const json = await res.json().catch(() => null);
                const msg =
                    (json && json.message) ||
                    "커밋 상세 정보를 불러오는 중 오류가 발생했습니다.";
                setLoadError(msg);
                setIsLoading(false);
                return;
            }

            // 정상 응답
            const result = (await res.json()) as CommitType;
            setCommitData(result);
            setIsLoading(false);
        } catch (err) {
            console.error("Failed to fetch commit detail", err);
            setLoadError("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!repo?.nameWithOwner || !session?.accessToken || !sha) {
            return;
        }
        fetchCommitDetail(repo.nameWithOwner, sha, session.accessToken);
    }, [repo?.nameWithOwner, session?.accessToken, sha]);

    const files = useMemo(() => {
        if (!commitData) return [];
        return commitData.changeDetail.map((change) => change.filename);
    }, [commitData]);

    // 로딩 중
    if (isLoading) {
        return <Loading />;
    }

    // 에러가 있을 때
    if (loadError) {
        return (
            <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
                <p className="mb-4 text-red-600">{loadError}</p>
                <button
                    onClick={() => router.push("/member/commits")}
                    className="rounded-md bg-gray-200 px-4 py-2 hover:bg-gray-300"
                >
                    이전 화면으로 돌아가기
                </button>
            </div>
        );
    }

    // commitData가 비어 있으면(의도치 않게 넘어온 경우)
    if (!commitData) {
        return (
            <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
                <p className="mb-4 text-gray-600">
                    커밋 데이터를 불러올 수 없습니다.
                </p>
                <button
                    onClick={() => router.push("/member/commits")}
                    className="rounded-md bg-gray-200 px-4 py-2 hover:bg-gray-300"
                >
                    이전 화면으로 돌아가기
                </button>
            </div>
        );
    }

    // 모든 준비가 완료되었을 때 UI 렌더링
    return (
        <CreateMemoirLayout>
            {/* AI 요약 시작 모달 버튼 */}
            <button
                onClick={() => setShowModal(true)}
                className="bg-primary7 fixed bottom-14 left-4 z-50 animate-[bounce_1s_infinite] cursor-pointer rounded-full p-3 text-white shadow-lg [animation-fill-mode:both]"
            >
                ✨ AI 요약 시작하기
            </button>
            {showModal && (
                <div className="fixed bottom-10 left-4 z-51 flex h-[60vh] w-[60vw] max-w-[770px]">
                    <AiSummary
                        setShowModal={setShowModal}
                        commit={commitData}
                    />
                </div>
            )}

            {/* Resizable Panel 레이아웃 */}
            <PanelGroup direction="horizontal" className="h-full w-full">
                {/* 왼쪽: 파일 리스트 (AccordionSidebar) */}
                <AccordionSidebar
                    files={files}
                    selectedFile={selectedFile}
                    onSelect={setSelectedFile}
                />

                {/* 가운데: 변경 목록 (ChangeList) */}
                <Panel defaultSize={40} minSize={20}>
                    <ChangeListLayout>
                        <div className="shadow-primary mb-2 truncate px-3 py-2 font-semibold">
                            {commitData.message}
                        </div>
                        <ChangeList
                            changes={commitData.changeDetail}
                            selectedFile={selectedFile}
                        />
                    </ChangeListLayout>
                </Panel>
                <PanelResizeHandle className="bg-bg-primary2 hover:bg-text-gray1 w-1 cursor-col-resize" />

                {/* 오른쪽: 에디터 폼 (CreateEditorForm) */}
                <Panel defaultSize={40} minSize={20}>
                    <div className="bg-bg-member1 flex h-full flex-col justify-between gap-4 p-4">
                        {/* source에 sha를 넘겨주고, typeId=1은 commit임을 표시 */}
                        <CreateEditorForm source={sha} typeId={1} />
                    </div>
                </Panel>
            </PanelGroup>
        </CreateMemoirLayout>
    );
}
