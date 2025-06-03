"use client";

import AccordionSidebar from "@/app/member/components/CreateMemoir/AccordionSideBar";
import ChangeList from "@/app/member/components/CreateMemoir/ChangeList";
import ChangeListLayout from "@/app/member/components/CreateMemoir/ChangeListLayout";
import EditEditorForm from "@/app/member/components/CreateMemoir/EditEditorForm";
import EditorFormReadOnly from "@/app/member/components/CreateMemoir/EditorFormReadOnly";
import Loading from "@/app/member/components/Loading";
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
    const { data: session, status: sessionStatus } = useSession();

    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [commitData, setCommitData] = useState<CommitType>();
    const repo = useRepoStore((s) => s.selectedRepo);

    const parseId = Number(id);

    // 부모에서만 관리하는 초기값들
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [content, setContent] = useState<Value>([]);
    const [sha, setSha] = useState("");
    const [summary, setSummary] = useState<string>("");

    // 로딩/에러 상태
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);

    // 회고록 값 불러오는 함수
    const load = async () => {
        setIsLoading(true);
        setLoadError(null);

        try {
            // 회고록 데이터 fetch
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

            // 정상적으로 데이터를 받아왔다면
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

    // 마운트 및 id 변경 시 load 호출
    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, session, sessionStatus]);

    // 커밋 상세(detail) 가져오는 함수
    const fetchCommitDetail = async (
        nameWithOwner: string | undefined,
        sha: string,
        accessToken: string | undefined
    ) => {
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
                setCommitData(result);
            }
        } catch (error) {
            console.error("Failed to fetch commit detail", error);
        } finally {
        }
    };

    useEffect(() => {
        if (!repo?.nameWithOwner || !session?.accessToken || !sha) return;
        fetchCommitDetail(repo.nameWithOwner, sha, session.accessToken);
    }, [repo?.nameWithOwner, sha, session?.accessToken]);

    // 수정 모드 토글 핸들러
    const handleToggleEdit = async () => {
        if (isEditing) {
            await load();
        }
        setIsEditing((prev) => !prev);
    };

    // 변경된 파일 리스트 계산
    const files = useMemo(() => {
        if (!commitData) return [];
        return commitData.changeDetail.map((change) => change.filename);
    }, [commitData]);

    // 세션이 인증되지 않았을 때
    if (sessionStatus === "loading") {
        // 세션이 로딩 중이면 잠시 기다리기
        return <Loading />;
    }

    // 데이터 로딩 중
    if (isLoading) {
        return <Loading />;
    }

    // loadError가 있을 때 (404, 작성자 불일치, 네트워크 오류 등)
    if (loadError) {
        return (
            <div className="p-8 text-center">
                <p className="mb-4 text-red-600">{loadError}</p>
                {/* 회고 목록 페이지로 돌아가기 */}
                <button
                    onClick={() => router.push("/member/memoirs")}
                    className="rounded-md bg-gray-200 px-4 py-2 hover:bg-gray-300"
                >
                    목록으로 돌아가기
                </button>
            </div>
        );
    }

    // commitData가 아직 없으면(커밋 상세 불러오는 중이라면) 로딩
    if (!commitData) {
        return <Loading />;
    }

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
        </DetailMemoirLayout>
    );
}
