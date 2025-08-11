"use client";

import { useEffect, useMemo, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import AccordionSidebar from "@/app/member/components/CreateMemoir/AccordionSideBar";
import ChangeList from "@/app/member/components/CreateMemoir/ChangeList";
import ChangeListLayout from "@/app/member/components/CreateMemoir/ChangeListLayout";
import EditEditorForm from "@/app/member/components/CreateMemoir/EditEditorForm";
import EditorFormReadOnly from "@/app/member/components/CreateMemoir/EditorFormReadOnly";
import Loading from "@/app/member/components/Loading";
import MobileTabLayout from "@/app/member/components/MobileTabLayout";
import ResponsiveLayout from "@/app/member/components/ResponsiveLayout";
import NotFound from "@/app/not-found";
import { GetMemoirResponseDto } from "@/application/usecase/memoir/dto/GetMemoirDto";
import { NAVIGATION_ITEMS } from "@/constants/mobileNavitagion";
import { useRepoStore } from "@/store/useRepoStore";
import { CommitType } from "@/types/github/CommitType";
import { Value } from "@udecode/plate";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import ViewSummary from "../ViewSummary";
import DetailMemoirLayout from "./DetailMemoirLayout";

export default function CommitDetailMemoir() {
    const { id }: { id: string } = useParams();
    const { data: session, status: sessionStatus } = useSession();

    // 사용자가 선택한 파일명을 기억
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    // 수정 모드 토글
    const [isEditing, setIsEditing] = useState(false);
    // 요약 모달 토글
    const [showModal, setShowModal] = useState(false);

    // 최종적으로 렌더할 커밋 상세 정보
    const [commitData, setCommitData] = useState<CommitType>();
    // 전역 스토어에서 선택된 Repo (owner/repo)
    const repo = useRepoStore((s) => s.selectedRepo);

    // URL params → 문자열로 들어온 id를 숫자로 변환
    const parseId = Number(id);

    // “회고 데이터” (제목, 태그, 내용, sha, AI 요약) 상태
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [content, setContent] = useState<Value>([]);
    const [sha, setSha] = useState("");
    const [summary, setSummary] = useState<string>("");

    // 로딩/에러 상태
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);

    // 모바일 버전의 탭
    const [activeIndex, setActiveIndex] = useState(2);

    // 서버에서 “회고 데이터”를 가져오는 함수
    const load = async () => {
        setIsLoading(true);
        setLoadError(null);

        try {
            const res = await fetch(`/api/memoirs/${id}`);
            if (res.status === 404) {
                // 존재하지 않는 회고 ID
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
            // 작성자 검사: 세션 정보의 user.id와 응답의 data.userId 비교
            if (sessionStatus === "authenticated") {
                const sessionUserId = session?.user.id;
                if (!sessionUserId || sessionUserId !== data.userId) {
                    setLoadError("잘못된 접근입니다.");
                    setIsLoading(false);
                    return;
                }
            } else {
                // 아직 세션이 준비되지 않았다면 로딩 유지
                setIsLoading(true);
                return;
            }

            // 정상이면 상태 세팅
            setTitle(data.title);
            setTags(data.tags ?? []);
            setContent(data.content as Value);
            setSha(data.source); // “source” 필드에 커밋 SHA를 저장했다고 가정
            setSummary(data.aiSum ?? "");
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setLoadError("네트워크 오류가 발생했습니다.");
            setIsLoading(false);
        }
    };

    // 마운트 또는 id, 세션 상태가 바뀔 때 load() 호출
    useEffect(() => {
        // 반드시 먼저 세션이 “authenticated” 상태가 되어야 회고를 가져감
        if (sessionStatus !== "authenticated") return;
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, sessionStatus]);

    // 커밋 상세를 가져오는 함수
    const fetchCommitDetail = async (
        nameWithOwner: string | undefined,
        sha: string,
        accessToken: string | undefined
    ) => {
        try {
            const res = await fetch("/api/github/commits/detail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nameWithOwner, sha, accessToken }),
            });

            if (res.ok) {
                const result = (await res.json()) as CommitType;
                setCommitData(result);
            } else {
                // 여기서도 404나 기타 오류가 발생하면 그냥 콘솔에만 찍어두고
                // commitData는 undefined로 남겨서 아래 로딩 처리를 유도할 수 있음
                console.error("커밋 상세를 불러오는 중 오류:", res.status);
            }
        } catch (error) {
            console.error("Failed to fetch commit detail", error);
        }
    };

    // repo.nameWithOwner, sha, session.accessToken이 준비되면 커밋 상세 fetch
    useEffect(() => {
        if (!repo?.nameWithOwner || !session?.accessToken || !sha) return;
        fetchCommitDetail(repo.nameWithOwner, sha, session.accessToken);
    }, [repo?.nameWithOwner, sha, session?.accessToken]);

    // 수정 모드 토글. 취소할 때는 화면 초기화용 load() 재호출
    const handleToggleEdit = async () => {
        if (isEditing) {
            await load();
        }
        setIsEditing((prev) => !prev);
    };

    // commitData가 내려줄 파일 목록 계산 (파일명 배열만 추출)
    const files = useMemo(() => {
        if (!commitData) return [];
        return commitData.changeDetail.map((change) => change.filename);
    }, [commitData]);

    // 세션 로딩 중 → <Loading/>
    if (sessionStatus === "loading") return <Loading />;

    // 아직 회고 데이터 로딩 중 → <Loading/>
    if (isLoading) return <Loading />;

    // loadError가 있으면(404 / 작성자 불일치 / 네트워크 오류 등) → <NotFound/>
    if (loadError) return <NotFound />;

    // 커밋 상세(commitData)가 아직 없으면 → <Loading/>
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
                    {editPanel}
                </div>,
                ,
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
                <div className="bg-bg-member1 relative col-span-1 flex h-full min-h-0 flex-col justify-between gap-4 p-4">
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
