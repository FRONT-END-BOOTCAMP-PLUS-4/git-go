// app/member/commits/[sha]/CommitMemoir.tsx
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
import MobileTabLayout from "@/app/member/components/MobileTabLayout";
import { NAVIGATION_ITEMS } from "@/constants/mobileNavitagion";
import NotFound from "@/app/not-found";
import ResponsiveLayout from "@/app/member/components/ResponsiveLayout";
import { useParams } from "next/navigation";
import { useRepoStore } from "@/store/useRepoStore";
import { useSession } from "next-auth/react";
import { useSummaryStore } from "@/store/useSummaryStore";

export default function CommitMemoir() {
    const { sha }: { sha: string } = useParams();
    const repo = useRepoStore((s) => s.selectedRepo);
    const { data: session, status: sessionStatus } = useSession();
    const { clearSummarized, setSummary, setRetryCount } = useSummaryStore();

    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [commitData, setCommitData] = useState<CommitType | null>(null);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [activeIndex, setActiveIndex] = useState(2);

    useEffect(() => {
        clearSummarized();
        setSummary("");
        setRetryCount(2);
    }, [clearSummarized, setSummary, setRetryCount]);

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
                setLoadError(
                    (json && json.message) ||
                        "커밋 상세 정보를 불러오는 중 오류가 발생했습니다."
                );
                setIsLoading(false);
                return;
            }
            const result = (await res.json()) as CommitType;
            setCommitData(result);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setLoadError("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (sessionStatus !== "authenticated") return;
        if (!repo?.nameWithOwner || !session.accessToken || !sha) {
            setLoadError("잘못된 경로입니다.");
            setIsLoading(false);
            return;
        }
        fetchCommitDetail(repo.nameWithOwner, sha, session.accessToken);
    }, [repo?.nameWithOwner, sessionStatus, session?.accessToken, sha]);

    const files = useMemo(() => {
        if (!commitData) return [];
        return commitData.changeDetail.map((c) => c.filename);
    }, [commitData]);

    if (isLoading) return <Loading />;
    if (loadError) return <NotFound />;
    if (!commitData)
        return <Error errorMessage="커밋 데이터를 불러올 수 없습니다." />;

    // 모바일 레이아웃
    const mobileUI = (
        <MobileTabLayout
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            navItems={NAVIGATION_ITEMS}
            panels={[
                <PanelGroup
                    key="sidebar"
                    direction="horizontal"
                    className="h-full w-full"
                >
                    <AccordionSidebar
                        files={files}
                        selectedFile={selectedFile}
                        onSelect={setSelectedFile}
                    />
                </PanelGroup>,
                <ChangeListLayout key="changelist-layout">
                    <div className="shadow-primary mb-2 truncate px-3 py-2 font-semibold">
                        {commitData.message}
                    </div>
                    <ChangeList
                        changes={commitData.changeDetail}
                        selectedFile={selectedFile}
                    />
                </ChangeListLayout>,
                <div
                    key="editor"
                    className="bg-bg-member1 flex h-full flex-col justify-between gap-4 p-4"
                >
                    <CreateEditorForm source={sha} typeId={1} />
                </div>,
            ]}
        />
    );

    // 데스크톱 레이아웃
    const desktopUI = (
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
    );

    return (
        <CreateMemoirLayout>
            <button
                onClick={() => setShowModal(true)}
                className="bg-primary7 fixed bottom-14 left-4 z-50 animate-[bounce_1s_infinite] rounded-full p-3 text-white shadow-lg"
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

            <ResponsiveLayout mobile={mobileUI} desktop={desktopUI} />
            {/* {mobileUI} */}
        </CreateMemoirLayout>
    );
}
