"use client";

import AccordionSidebar from "@/app/member/components/CreateMemoir/AccordionSideBar";
import ChangeList from "@/app/member/components/CreateMemoir/ChangeList";
import ChangeListLayout from "@/app/member/components/CreateMemoir/ChangeListLayout";
import EditEditorForm from "@/app/member/components/CreateMemoir/EditEditorForm";
import EditorFormReadOnly from "@/app/member/components/CreateMemoir/EditorFormReadOnly";
import Loading from "@/app/member/components/Loading";
import { GetMemoirResponseDto } from "@/application/usecase/memoir/dto/GetMemoirDto";
import { useRepoStore } from "@/store/repoStore";
import { CommitType } from "@/types/github/CommitType";
import { Value } from "@udecode/plate";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ViewSummary from "../ViewSummary";
import DetailMemoirLayout from "./DetailMemoirLayout";

export default function CommitDetailMemoir() {
    const { id }: { id: string } = useParams();
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [commitData, setCommitData] = useState<CommitType>();
    const repo = useRepoStore((s) => s.selectedRepo);
    const { data: session } = useSession();

    const parseId = Number(id);

    // 부모에서만 관리하는 초기값들
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [content, setContent] = useState<Value>([]);
    const [sha, setSha] = useState("");
    const [summary, setSummary] = useState<string>("");

    // 회고록 값 불러오기기
    const load = async () => {
        const res = await fetch(`/api/memoirs/${id}`);
        const data = (await res.json()) as GetMemoirResponseDto;
        setTitle(data.title);
        setTags(data.tags ?? []);
        setContent(data.content as Value);
        setSha(data.source);
        setSummary(data.aiSum ?? "");
    };

    // 마운트 및 id 변경 시
    useEffect(() => {
        load();
    }, [id]);

    // 커밋 상세 내역 호출 함수
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

    const files = useMemo(() => {
        if (!commitData) return [];
        return commitData.changeDetail.map((change) => change.filename);
    }, [commitData]);

    if (!commitData) return <Loading />;

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
