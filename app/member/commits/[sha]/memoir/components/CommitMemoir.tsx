"use client";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useEffect, useMemo, useState } from "react";

import AccordionSidebar from "@/app/member/components/CreateMemoir/AccordionSideBar";
import AiSummary from "@/app/member/components/CreateMemoir/AiSummary";
import ChangeList from "@/app/member/components/CreateMemoir/ChangeList";
import ChangeListLayout from "@/app/member/components/CreateMemoir/ChangeListLayout";
import { CommitType } from "@/types/github/CommitType";
import CreateEditorForm from "@/app/member/components/CreateMemoir/CreateEditorForm";
import CreateMemoirLayout from "@/app/member/components/CreateMemoir/CreateMemoirLayout";
import Error from "@/app/components/Error";
import Loading from "@/app/member/components/Loading";
import { NAVIGATION_ITEMS } from "@/constants/mobileNavitagion";
import NotFound from "@/app/not-found";
import { useParams } from "next/navigation";
import { useRepoStore } from "@/store/useRepoStore";
import { useSession } from "next-auth/react";
import { useSummaryStore } from "@/store/useSummaryStore";

export default function CommitMemoir() {
    const { sha }: { sha: string } = useParams();
    const repo = useRepoStore((s) => s.selectedRepo);
    const { data: session, status: sessionStatus } = useSession();
    const { clearSummarized, setSummary, setRetryCount } = useSummaryStore();

    // 로딩/에러 상태
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);

    // 커밋 상세 정보
    const [commitData, setCommitData] = useState<CommitType | null>(null);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);

    // AI 요약 모달 상태
    const [showModal, setShowModal] = useState(false);

    // 모바일 버전의 탭
    const [activeIndex, setActiveIndex] = useState(2);

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
                setLoadError(
                    "유효하지 않은 커밋 SHA입니다. 커밋을 찾을 수 없습니다."
                );
                setIsLoading(false);
                return;
            }
            if (!res.ok) {
                const json = await res.json().catch(() => null);
                const msg =
                    (json && json.message) ||
                    "커밋 상세 정보를 불러오는 중 오류가 발생했습니다.";
                setLoadError(msg);
                setIsLoading(false);
                return;
            }

            const result = (await res.json()) as CommitType;
            setCommitData(result);
            setIsLoading(false);
        } catch (err) {
            console.error("Failed to fetch commit detail", err);
            setLoadError("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
            setIsLoading(false);
        }
    };

    // 커밋 상세 fetch useEffect
    useEffect(() => {
        if (sessionStatus !== "authenticated") {
            return;
        }
        if (!repo?.nameWithOwner || !session?.accessToken || !sha) {
            setLoadError("잘못된 경로입니다.");
            setIsLoading(false);
            return;
        }
        fetchCommitDetail(repo.nameWithOwner, sha, session.accessToken);
    }, [repo?.nameWithOwner, sessionStatus, session?.accessToken, sha]);

    const files = useMemo(() => {
        if (!commitData) return [];
        return commitData.changeDetail.map((change) => change.filename);
    }, [commitData]);

    if (isLoading) {
        return <Loading />;
    }

    if (loadError) {
        return <NotFound />;
    }

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
                    <AiSummary
                        setShowModal={setShowModal}
                        commit={commitData}
                    />
                </div>
            )}

            <div className="flex h-[calc(100vh-65px)] w-full flex-col lg:hidden">
                {/* 컨텐츠 영역: 선택된 탭에 따라 다른 내용 표시 */}
                <div className="w-full flex-1 overflow-auto p-4 lg:p-0">
                    {activeIndex === 0 && (
                        <AccordionSidebar
                            files={files}
                            selectedFile={selectedFile}
                            onSelect={setSelectedFile}
                        />
                    )}

                    {activeIndex === 1 && (
                        <ChangeListLayout>
                            <div className="shadow-primary mb-2 truncate px-3 py-2 font-semibold">
                                {commitData.message}
                            </div>
                            <ChangeList
                                changes={commitData.changeDetail}
                                selectedFile={selectedFile}
                            />
                        </ChangeListLayout>
                    )}

                    {activeIndex === 2 && (
                        <div className="bg-bg-member1 flex h-full flex-col justify-between gap-4 p-4">
                            <CreateEditorForm source={sha} typeId={1} />
                        </div>
                    )}
                </div>

                {/* 모바일 탭 영역: 인디케이터 없이 깔끔하게 */}
                <div className="flex h-[70px] w-full max-w-[1024px] items-center justify-center rounded-[10px] bg-white shadow-lg">
                    <ul className="flex h-full w-full justify-around">
                        {NAVIGATION_ITEMS.map((item, index) => (
                            <li
                                key={index}
                                className="flex h-full flex-1 cursor-pointer list-none items-center justify-center"
                            >
                                <button
                                    onClick={() => setActiveIndex(index)}
                                    className={`hover:text-primary5 active:text-primary8 relative flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 text-center font-medium transition-colors duration-300 focus:outline-none ${activeIndex === index ? "text-primary7 bg-primary1" : "text-[#222327]"}`}
                                    aria-label={item.text}
                                >
                                    <span className="block text-center text-2xl">
                                        {item.icon}
                                    </span>
                                    <span className="text-sm font-normal tracking-wider">
                                        {item.text}
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* PC 버전 */}
            <div className="hidden lg:block lg:w-full">
                <PanelGroup direction="horizontal" className="h-full w-full">
                    <AccordionSidebar
                        files={files}
                        selectedFile={selectedFile}
                        onSelect={setSelectedFile}
                    />

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
                    <Panel defaultSize={40} minSize={20}>
                        <div className="bg-bg-member1 flex h-full flex-col justify-between gap-4 p-4">
                            <CreateEditorForm source={sha} typeId={1} />
                        </div>
                    </Panel>
                </PanelGroup>
            </div>
        </CreateMemoirLayout>
    );
}
