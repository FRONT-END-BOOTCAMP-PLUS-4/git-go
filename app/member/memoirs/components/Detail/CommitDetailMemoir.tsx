"use client";

import AccordionSidebar from "@/app/member/components/CreateMemoir/AccordionSideBar";
import ChangeList from "@/app/member/components/CreateMemoir/ChangeList";
import ChangeListLayout from "@/app/member/components/CreateMemoir/ChangeListLayout";
import EditEditorForm from "@/app/member/components/CreateMemoir/EditEditorForm";
import EditorFormReadOnly from "@/app/member/components/CreateMemoir/EditorFormReadOnly";
import Loading from "@/app/member/components/Loading";
import NotFound from "@/app/not-found";
import { GetMemoirResponseDto } from "@/application/usecase/memoir/dto/GetMemoirDto";
import { useRepoStore } from "@/store/useRepoStore";
import { CommitType } from "@/types/github/CommitType";
import { Value } from "@udecode/plate";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ViewSummary from "../ViewSummary";
import DetailMemoirLayout from "./DetailMemoirLayout";

export default function CommitDetailMemoir() {
    const router = useRouter();
    const { id }: { id: string } = useParams();
    const parseId = Number(id);

    const { data: session, status: sessionStatus } = useSession();
    const repo = useRepoStore((s) => s.selectedRepo);

    // 로딩/에러 상태
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);

    // 회고 세부 정보
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [content, setContent] = useState<Value>([]);
    const [sha, setSha] = useState("");
    const [summary, setSummary] = useState<string>("");

    // GitHub 커밋 상세
    const [commitData, setCommitData] = useState<CommitType | null>(null);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);

    // 편집 모드, 요약 모달 상태
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);

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
            // 작성자(userId)와 세션의 user.id 비교
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

            // 소유자 확인이 끝났으면 나머지 상태 세팅
            setTitle(data.title);
            setTags(data.tags ?? []);
            setContent(data.content as Value);
            setSha(data.source);
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

    // GitHub 커밋 상세를 가져오는 함수
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
                // GitHub API에서 SHA가 유효하지 않을 때
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

    // GitHub 커밋 상세 fetch useEffect
    useEffect(() => {
        // 세션이 인증된 상태여야만 로직 시작
        if (sessionStatus !== "authenticated") {
            return;
        }
        // repo가 아직 준비되지 않았으면 대기
        if (!repo?.nameWithOwner) {
            return;
        }
        // sha 값이 없으면 잘못된 경로
        if (!sha) {
            setLoadError("잘못된 경로입니다.");
            setIsLoading(false);
            return;
        }

        // 모든 준비가 될 때 fetch 호출
        fetchCommitDetail(repo.nameWithOwner, sha, session.accessToken!);
    }, [repo?.nameWithOwner, sessionStatus, session?.accessToken, sha]);

    // 변경된 파일 리스트 계산
    const files = useMemo(() => {
        if (!commitData) return [];
        return commitData.changeDetail.map((change) => change.filename);
    }, [commitData]);

    // 에디트 토글 핸들러
    const handleToggleEdit = async () => {
        if (isEditing) {
            await load();
        }
        setIsEditing((prev) => !prev);
    };

    // 세션이 로딩 중일 때 로딩 컴포넌트
    if (sessionStatus === "loading") {
        return <Loading />;
    }

    // 로딩 중
    if (isLoading) {
        return <Loading />;
    }

    // loadError가 있을 때 에러 화면
    if (loadError) {
        return <NotFound />;
    }

    // commitData가 비어 있으면(의도치 않게 넘어온 경우)
    if (!commitData) {
        return (
            <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
                <p className="mb-4 text-gray-600">
                    커밋 데이터를 불러올 수 없습니다.
                </p>
                <button
                    onClick={() => router.push("/member/memoirs")}
                    className="rounded-md bg-gray-200 px-4 py-2 hover:bg-gray-300"
                >
                    이전 화면으로 돌아가기
                </button>
            </div>
        );
    }

    // 모든 준비가 완료되었을 때 UI 렌더링
    return (
        <DetailMemoirLayout>
            <button
                onClick={() => setShowModal(true)}
                className="bg-primary7 fixed bottom-14 left-4 z-50 animate-[bounce_1s_infinite] cursor-pointer rounded-full p-3 text-white shadow-lg [animation-fill-mode:both]"
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
                {/* 오른쪽: 에디터 (EditEditorForm / EditorFormReadOnly) */}
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
        </DetailMemoirLayout>
    );
}
