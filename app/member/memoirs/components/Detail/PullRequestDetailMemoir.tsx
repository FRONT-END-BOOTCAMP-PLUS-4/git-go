"use client";

import AccordionSidebar from "@/app/member/components/CreateMemoir/AccordionSideBar";
import ChangeList from "@/app/member/components/CreateMemoir/ChangeList";
import ChangeListLayout from "@/app/member/components/CreateMemoir/ChangeListLayout";
import EditEditorForm from "@/app/member/components/CreateMemoir/EditEditorForm";
import EditorFormReadOnly from "@/app/member/components/CreateMemoir/EditorFormReadOnly";
import Select from "@/app/member/components/Select";
import { GetMemoirResponseDto } from "@/application/usecase/memoir/dto/GetMemoirDto";
import { COMMITS } from "@/constants/mockCommits";
import useExtractFilenames from "@/hooks/useExtractFileNames";
import { useRepoStore } from "@/store/repoStore";
import { CommitType } from "@/types/github/CommitType";
import { PullRequestType } from "@/types/github/PullRequestType";
import { Value } from "@udecode/plate";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import DetailMemoirLayout from "./DetailMemoirLayout";
import ViewSummary from "../ViewSummary";

export default function PullRequestDetailMemoir() {
    const [selectedSha, setSelectedSha] = useState<string>("");

    const [selectedFile, setSelectedFile] = useState<string | null>(null);

    const { id }: { id: string } = useParams();

    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const parseId = Number(id);

    // 부모에서만 관리하는 초기값들
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [content, setContent] = useState<Value>([]);
    const [prNo, setPrNo] = useState<string>("");
    const [summary, setSummary] = useState<string>("");

    const [prData, setPrData] = useState<PullRequestType[]>([]);

    const [commitData, setCommitData] = useState<CommitType | null>(null);

    const repo = useRepoStore((s) => s.selectedRepo);
    const { data: session } = useSession();

    const containerRef = useRef<HTMLDivElement | null>(null);

    // 1) PR 커밋 목록 fetch
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

                // **여기가 핵심**: API가 { commitList: [...] } 를 반환하니까 꺼내주세요.
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

    // 2) selectedSha 가 바뀔 때마다 커밋 상세 fetch
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

    // 마운트 및 id 변경 시
    useEffect(() => {
        load();
    }, [id]);

    useEffect(() => {
        setSelectedFile(null);
    }, [selectedSha]);

    // selectedSha가 바뀔 때마다 스크롤을 최상단으로 이동
    useEffect(() => {
        containerRef.current?.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [selectedSha]);
    // 드롭다운 옵션
    const prOptions = prData.map((pr) => ({
        value: pr.sha,
        label: pr.message,
    }));

    function handleChange(sha: string) {
        setSelectedSha(sha); // 선택 상태 업데이트
    }
    // 회고록 값 불러오기기
    const load = async () => {
        const res = await fetch(`/api/memoirs/${id}`);
        const data = (await res.json()) as GetMemoirResponseDto;
        console.log(data);
        setTitle(data.title);
        setTags(data.tags ?? []);
        setContent(data.content as Value);
        setPrNo(data.source);
        setSummary(data.aiSum ?? "");
    };

    // 수정 모드 토글 핸들러
    const handleToggleEdit = async () => {
        if (isEditing) {
            await load();
        }
        setIsEditing((prev) => !prev);
    };

    if (!commitData)
        return <div className="p-8 text-center">Loading commit details…</div>;

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
            <AccordionSidebar
                files={useExtractFilenames(COMMITS.files)}
                selectedFile={selectedFile}
                onSelect={setSelectedFile}
            />

            <div className="grid flex-1 grid-cols-2">
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

                <div className="col-span-1 flex flex-col justify-between gap-4 p-4">
                    {isEditing ? (
                        <EditEditorForm
                            title={title}
                            setTitle={setTitle}
                            tags={tags}
                            setTags={setTags}
                            content={content}
                            setContent={setContent}
                            memoirId={parseId}
                            typeId={2}
                            session={session}
                            repo={repo}
                            setIsEditing={setIsEditing}
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
            </div>
        </DetailMemoirLayout>
    );
}
