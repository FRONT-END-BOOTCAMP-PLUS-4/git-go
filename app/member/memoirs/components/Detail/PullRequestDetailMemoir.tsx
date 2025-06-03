"use client";

import AccordionSidebar from "@/app/member/components/CreateMemoir/AccordionSideBar";
import ChangeList from "@/app/member/components/CreateMemoir/ChangeList";
import ChangeListLayout from "@/app/member/components/CreateMemoir/ChangeListLayout";
import EditEditorForm from "@/app/member/components/CreateMemoir/EditEditorForm";
import EditorFormReadOnly from "@/app/member/components/CreateMemoir/EditorFormReadOnly";
import Loading from "@/app/member/components/Loading";
import Select from "@/app/member/components/Select";
import { GetMemoirResponseDto } from "@/application/usecase/memoir/dto/GetMemoirDto";
import { useRepoStore } from "@/store/useRepoStore";
import { CommitType } from "@/types/github/CommitType";
import { PullRequestType } from "@/types/github/PullRequestType";
import { Value } from "@udecode/plate";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ViewSummary from "../ViewSummary";
import DetailMemoirLayout from "./DetailMemoirLayout";

export default function PullRequestDetailMemoir() {
    const router = useRouter();
    const { id }: { id: string } = useParams();
    const parseId = Number(id);

    // 에러/로딩 상태
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);

    // PR 관련 상태
    const [selectedSha, setSelectedSha] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // 회고 데이터
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [content, setContent] = useState<Value>([]);
    const [prNo, setPrNo] = useState<string>("");
    const [summary, setSummary] = useState<string>("");

    // GitHub API 관련 상태
    const [prData, setPrData] = useState<PullRequestType[]>([]);
    const [commitData, setCommitData] = useState<CommitType | null>(null);

    const repo = useRepoStore((s) => s.selectedRepo);
    const { data: session } = useSession();
    const containerRef = useRef<HTMLDivElement | null>(null);

    // ─── 1) load() 함수: “/api/memoirs/${id}” 호출 + 에러 처리 ───
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
                const json = await res.json();
                setLoadError(
                    json.message || "회고록을 불러오던 중 오류가 발생했습니다."
                );
                setIsLoading(false);
                return;
            }

            const data = (await res.json()) as GetMemoirResponseDto;
            setTitle(data.title);
            setTags(data.tags ?? []);
            setContent(data.content as Value);
            setPrNo(data.source); // PR 번호는 source에 담아온다고 가정
            setSummary(data.aiSum ?? "");
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setLoadError("네트워크 오류가 발생했습니다.");
            setIsLoading(false);
        }
    };

    // ─── 마운트 및 id 변경 시 load() 호출 ───
    useEffect(() => {
        load();
    }, [id]);

    // ─── 2) PR 커밋 목록(fetchPrCommits) ───
    useEffect(() => {
        const fetchPrCommits = async () => {
            if (!repo?.nameWithOwner || !session?.accessToken || !prNo) return;

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
    }, [repo?.nameWithOwner, session?.accessToken, prNo]);

    // ─── 3) selectedSha가 바뀔 때 해당 커밋 상세(fetchDetail) ───
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

    // ─── 4) selectedSha 바뀔 때 스크롤 상단으로 이동 ───
    useEffect(() => {
        containerRef.current?.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [selectedSha]);

    // ─── 5) 수정 모드 토글 ───
    const handleToggleEdit = async () => {
        if (isEditing) {
            await load();
        }
        setIsEditing((prev) => !prev);
    };

    // ─── PR select 옵션 (드롭다운) ───
    const prOptions = useMemo(
        () =>
            prData.map((pr) => ({
                value: pr.sha,
                label: pr.message,
            })),
        [prData]
    );

    // ─── 파일 리스트 계산 ───
    const files = useMemo(() => {
        if (!commitData) return [];
        return commitData.changeDetail.map((change) => change.filename);
    }, [commitData]);

    // ─── 렌더링 분기 ───
    // 1) 로딩 중
    if (isLoading) {
        return <Loading />;
    }

    // 2) 에러가 있을 때
    if (loadError) {
        return (
            <div className="p-8 text-center">
                <p className="mb-4 text-red-600">{loadError}</p>
                <button
                    className="rounded-md bg-gray-200 px-4 py-2 hover:cursor-pointer hover:bg-gray-300"
                    onClick={() => router.push("/member/memoirs")}
                >
                    목록으로 돌아가기
                </button>
            </div>
        );
    }

    // 3) commitData가 아직 없으면 (네트워크 지연 등) Loading
    if (!commitData) {
        return <Loading />;
    }

    // 4) 모든 준비가 완료되었을 때 실제 PR 상세 UI 렌더링
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
                {/* 왼쪽 사이드바: 파일 리스트 */}
                <AccordionSidebar
                    files={files}
                    selectedFile={selectedFile}
                    onSelect={setSelectedFile}
                />

                {/* 중간 패널: PR 목록 + 변경 내역 */}
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

                {/* 오른쪽 패널: 회고록 폼 */}
                <Panel defaultSize={40} minSize={20}>
                    <div
                        ref={containerRef}
                        className="col-span-1 flex h-full min-h-0 flex-col justify-between gap-4 p-4"
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
        </DetailMemoirLayout>
    );
}
