"use client";

import AccordionSidebar from "@/app/member/components/CreateMemoir/AccordionSideBar";
import AiSummary from "@/app/member/components/CreateMemoir/AiSummary";
import ChangeList from "@/app/member/components/CreateMemoir/ChangeList";
import ChangeListLayout from "@/app/member/components/CreateMemoir/ChangeListLayout";
import CreateMemoirLayout from "@/app/member/components/CreateMemoir/CreateMemoirLayout";

import { useSummaryStore } from "@/store/AiSummaryStore";
import { useRepoStore } from "@/store/repoStore";
import { useParams } from "next/navigation";

import CreateEditorForm from "@/app/member/components/CreateMemoir/CreateEditorForm";
import Loading from "@/app/member/components/Loading";
import { CommitType } from "@/types/github/CommitType";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";

export default function CommitMemoir() {
    const [selectedFile, setSelectedFile] = useState<string | null>(null);

    const [showModal, setShowModal] = useState(false);
    const [commitData, setCommitData] = useState<CommitType>();

    const repo = useRepoStore((s) => s.selectedRepo);
    const { data: session } = useSession();
    const { sha }: { sha: string } = useParams();
    const { clearSummarized, setSummary, setRetryCount } = useSummaryStore();

    useEffect(() => {
        clearSummarized();
        setSummary("");
        setRetryCount(2);
    }, []);

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
        if (!repo?.nameWithOwner || !session?.accessToken) return;
        fetchCommitDetail(repo.nameWithOwner, sha, session.accessToken);
    }, [repo?.nameWithOwner, sha, session?.accessToken]);

    const files = useMemo(() => {
        if (!commitData) return [];
        return commitData.changeDetail.map((change) => change.filename);
    }, [commitData]);

    if (!commitData) return <Loading />;

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

            <AccordionSidebar
                files={files}
                selectedFile={selectedFile}
                onSelect={setSelectedFile}
            />

            <div className="grid h-full grid-cols-2">
                <ChangeListLayout>
                    <div className="shadow-primary mb-2 truncate px-3 py-2 font-semibold">
                        {commitData.message}
                    </div>
                    <ChangeList
                        changes={commitData.changeDetail}
                        selectedFile={selectedFile}
                    />
                </ChangeListLayout>

                <div className="bg-bg-member1 col-span-1 flex h-full min-h-0 flex-col justify-between gap-4 p-4">
                    <CreateEditorForm source={sha} typeId={1} />
                </div>
            </div>
        </CreateMemoirLayout>
    );
}
