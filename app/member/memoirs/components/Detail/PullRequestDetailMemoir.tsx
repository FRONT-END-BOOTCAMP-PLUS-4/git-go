"use client";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useEffect, useMemo, useRef, useState } from "react";

import AccordionSidebar from "@/app/member/components/CreateMemoir/AccordionSideBar";
import ChangeList from "@/app/member/components/CreateMemoir/ChangeList";
import ChangeListLayout from "@/app/member/components/CreateMemoir/ChangeListLayout";
import { CommitType } from "@/types/github/CommitType";
import DetailMemoirLayout from "./DetailMemoirLayout";
import EditEditorForm from "@/app/member/components/CreateMemoir/EditEditorForm";
import EditorFormReadOnly from "@/app/member/components/CreateMemoir/EditorFormReadOnly";
import { GetMemoirResponseDto } from "@/application/usecase/memoir/dto/GetMemoirDto";
import Loading from "@/app/member/components/Loading";
import MobileTabLayout from "@/app/member/components/MobileTabLayout";
import { NAVIGATION_ITEMS } from "@/constants/mobileNavitagion";
import NotFound from "@/app/not-found";
import { PullRequestType } from "@/types/github/PullRequestType";
import ResponsiveLayout from "@/app/member/components/ResponsiveLayout";
import Select from "@/app/member/components/Select";
import { Value } from "@udecode/plate";
import ViewSummary from "../ViewSummary";
import { useParams } from "next/navigation";
import { useRepoStore } from "@/store/useRepoStore";
import { useSession } from "next-auth/react";

export default function PullRequestDetailMemoir() {
    const { id }: { id: string } = useParams();
    const parseId = Number(id);

    const { data: session, status: sessionStatus } = useSession();

    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);

    const [selectedSha, setSelectedSha] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [title, setTitle] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [content, setContent] = useState<Value>([]);
    const [prNo, setPrNo] = useState<string>("");
    const [summary, setSummary] = useState<string>("");

    const [prData, setPrData] = useState<PullRequestType[]>([]);
    const [commitData, setCommitData] = useState<CommitType | null>(null);

    const repo = useRepoStore((s) => s.selectedRepo);
    const containerRef = useRef<HTMLDivElement | null>(null);

    // 모바일 버전의 탭
    const [activeIndex, setActiveIndex] = useState(2);

    // 회고록 데이터(fetch) + 작성자(userId) 검사
    const load = async () => {
        setIsLoading(true);
        setLoadError(null);

        try {
            const res = await fetch(`/api/memoirs/${id}`);
            if (res.status === 404) {
                setLoadError("존재하지 않는 회고록입니다.");
                setIsLoading(false);
                return;
            }
            if (!res.ok) {
                const json = await res.json().catch(() => null);
                setLoadError(
                    (json && json.message) ||
                        "회고록을 불러오던 중 오류가 발생했습니다."
                );
                setIsLoading(false);
                return;
            }

            const data = (await res.json()) as GetMemoirResponseDto;
            if (sessionStatus === "authenticated") {
                const sessionUserId = session?.user.id;
                if (!sessionUserId || sessionUserId !== data.userId) {
                    setLoadError("잘못된 접근입니다.");
                    setIsLoading(false);
                    return;
                }
            } else {
                // 세션이 아직 준비되지 않았다면 대기
                setIsLoading(true);
                return;
            }

            setTitle(data.title);
            setTags(data.tags ?? []);
            setContent(data.content as Value);
            setPrNo(data.source);
            setSummary(data.aiSum ?? "");
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setLoadError("네트워크 오류가 발생했습니다.");
            setIsLoading(false);
        }
    };

    // 마운트 및 id, 세션 상태 변경 시 load 호출
    useEffect(() => {
        if (sessionStatus !== "authenticated") return;
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, sessionStatus]);

    // PR 커밋 목록(fetch)
    useEffect(() => {
        // 세션이 인증되지 않은 경우 대기
        if (sessionStatus !== "authenticated") return;
        if (!repo?.nameWithOwner || !session?.accessToken || !prNo) return;

        const fetchPrCommits = async () => {
            setIsLoading(true);
            setLoadError(null);

            try {
                const res = await fetch("/api/github/pull-requests/commits", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        accessToken: session.accessToken,
                        author: session.user.githubId,
                        repoFullName: repo.nameWithOwner,
                        prNumber: Number(prNo),
                    }),
                });
                if (res.status === 404) {
                    setLoadError("해당 PR 번호를 찾을 수 없습니다.");
                    setIsLoading(false);
                    return;
                }
                if (!res.ok) {
                    const json = await res.json().catch(() => null);
                    setLoadError(
                        (json && json.message) ||
                            "PR 커밋 목록을 불러오는 중 오류가 발생했습니다."
                    );
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
                setSelectedSha(list[0].sha);
                setIsLoading(false);
            } catch (err) {
                console.error(err);
                setLoadError("네트워크 오류가 발생했습니다.");
                setIsLoading(false);
            }
        };

        fetchPrCommits();
    }, [repo?.nameWithOwner, sessionStatus, session?.accessToken, prNo]);

    // 선택된 SHA가 바뀔 때 커밋 상세(fetch)
    useEffect(() => {
        // 세션이 인증되지 않은 경우 대기
        if (sessionStatus !== "authenticated") return;
        if (!repo?.nameWithOwner || !session?.accessToken || !selectedSha)
            return;

        const fetchDetail = async () => {
            setIsLoading(true);
            setLoadError(null);

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
                if (res.status === 404) {
                    setLoadError("유효하지 않은 커밋 SHA입니다.");
                    setIsLoading(false);
                    return;
                }
                if (!res.ok) {
                    const json = await res.json().catch(() => null);
                    setLoadError(
                        (json && json.message) ||
                            "커밋 상세를 불러오는 중 오류가 발생했습니다."
                    );
                    setIsLoading(false);
                    return;
                }

                const data = (await res.json()) as CommitType;
                setCommitData(data);
                setSelectedFile(null);
                setIsLoading(false);
            } catch (err) {
                console.error(err);
                setLoadError("네트워크 오류가 발생했습니다.");
                setIsLoading(false);
            }
        };

        fetchDetail();
    }, [repo?.nameWithOwner, sessionStatus, session?.accessToken, selectedSha]);

    // 선택된 SHA가 바뀔 때 스크롤 최상단으로
    useEffect(() => {
        containerRef.current?.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, [selectedSha]);

    // 수정 모드 토글
    const handleToggleEdit = async () => {
        if (isEditing) {
            await load();
        }
        setIsEditing((prev) => !prev);
    };

    // PR 드롭다운 옵션 계산
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

    // 세션이 로딩 중일 때 로딩 컴포넌트
    if (sessionStatus === "loading") return <Loading />;

    // 세션 인증 후에도 로딩 중일 때
    if (isLoading) return <Loading />;

    // loadError가 있을 때 에러 화면
    if (loadError) return <NotFound />;

    // commitData가 아직 없으면 로딩
    if (!commitData) return <Loading />;

    const editPanel = isEditing ? (
        <EditEditorForm
            title={title}
            setTitle={setTitle}
            tags={tags}
            setTags={setTags}
            content={content}
            setContent={setContent}
            memoirId={parseId}
            session={session}
            repo={repo}
            setIsEditing={setIsEditing}
            onCancel={handleToggleEdit}
        />
    ) : (
        <EditorFormReadOnly
            title={title}
            tags={tags}
            content={content}
            handleStatusChange={handleToggleEdit}
            memoirId={parseId}
        />
    );

    const mobileUI = (
        <MobileTabLayout
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            navItems={NAVIGATION_ITEMS}
            panels={[
                <AccordionSidebar
                    key="sidebar"
                    files={files}
                    selectedFile={selectedFile}
                    onSelect={setSelectedFile}
                />,
                <ChangeListLayout key="changelist-layout">
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
                </ChangeListLayout>,
                <div
                    key="editor"
                    className="bg-bg-member1 col-span-1 flex h-full min-h-0 flex-col justify-between gap-4 p-4"
                >
                    {editPanel}
                </div>,
            ]}
        />
    );

    const desktopUI = (
        <PanelGroup direction="horizontal" className="h-full w-full">
            <AccordionSidebar
                files={files}
                selectedFile={selectedFile}
                onSelect={setSelectedFile}
            />

            <Panel defaultSize={40} minSize={20}>
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
            <Panel defaultSize={40} minSize={20}>
                <div
                    ref={containerRef}
                    className="bg-bg-member1 col-span-1 flex h-full min-h-0 flex-col justify-between gap-4 p-4"
                >
                    {isEditing ? (
                        <EditEditorForm
                            title={title}
                            setTitle={setTitle}
                            tags={tags}
                            setTags={setTags}
                            content={content}
                            setContent={setContent}
                            memoirId={parseId}
                            session={session}
                            repo={repo}
                            setIsEditing={setIsEditing}
                            onCancel={handleToggleEdit}
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
            </Panel>
        </PanelGroup>
    );

    return (
        <DetailMemoirLayout>
            <button
                onClick={() => setShowModal(true)}
                className="bg-primary7 fixed bottom-30 left-4 z-50 animate-[bounce_1s_infinite] cursor-pointer rounded-full p-3 text-white shadow-lg [animation-fill-mode:both] lg:bottom-14"
            >
                ✨ 생성된 요약 보기
            </button>

            {showModal && (
                <div className="fixed bottom-10 left-4 z-51 flex h-[60vh] w-[60vw] max-w-[770px]">
                    <ViewSummary
                        setShowModal={setShowModal}
                        summary={summary}
                    />
                </div>
            )}

            <ResponsiveLayout mobile={mobileUI} desktop={desktopUI} />
        </DetailMemoirLayout>
    );
}
