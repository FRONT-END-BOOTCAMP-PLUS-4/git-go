"use client";

import AccordionSidebar from "@/app/member/components/CreateMemoir/AccordionSideBar";
import AiSummary from "@/app/member/components/CreateMemoir/AiSummary";
import ChangeList from "@/app/member/components/CreateMemoir/ChangeList";
import ChangeListLayout from "@/app/member/components/CreateMemoir/ChangeListLayout";
import CreateMemoirLayout from "@/app/member/components/CreateMemoir/CreateMemoirLayout";
import EditorForm from "@/app/member/components/CreateMemoir/EditorForm";
import useExtractFilenames from "@/hooks/useExtractFileNames";

import { useRepoStore } from "@/store/repoStore";
import { useParams } from "next/navigation";
import { useSummaryStore } from "@/store/AiSummaryStore";

import { CommitType } from "@/types/github/CommitType";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function CommitMemoir() {
    const [selectedFile, setSelectedFile] = useState<string | null>(null);

    const [showModal, setShowModal] = useState(false);
    const [commitData, setCommitData] = useState<CommitType>();

    const { selectedRepo } = useRepoStore();
    const { sha }: { sha: string } = useParams();
    const { clearSummarized, setSummary } = useSummaryStore();

    const { data: session } = useSession();

    useEffect(() => {
        console.log("effect");
        clearSummarized();
        setSummary("");
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
        if (!selectedRepo?.nameWithOwner || !session?.accessToken) return;
        fetchCommitDetail(selectedRepo.nameWithOwner, sha, session.accessToken);
    }, [selectedRepo?.nameWithOwner, sha, session?.accessToken]);

    if (!commitData) return <div>Loading...</div>;

    return (
        <CreateMemoirLayout>
            <button
                onClick={() => setShowModal(true)}
                className="bg-primary7 fixed bottom-14 left-4 z-50 animate-[bounce_1s_infinite] cursor-pointer rounded-full p-3 text-white shadow-lg [animation-fill-mode:both]"
                // style={{
                //     background:
                //         "linear-gradient(180deg, #3730a3 0%, #4f46e5 100%)",
                // }}
            >
                ✨ AI 요약 시작하기
            </button>
            {showModal && (
                <div className="fixed bottom-10 left-4 z-51 flex h-[60vh] w-[60vw] max-w-[770px]">
                    <AiSummary setShowModal={setShowModal} />
                </div>
            )}

            <AccordionSidebar
                files={useExtractFilenames(commitData.changeDetail)}
                selectedFile={selectedFile}
                onSelect={setSelectedFile}
            />

            <div className="grid grid-cols-2">
                <ChangeListLayout>
                    <div className="shadow- mb-2 truncate px-3 py-2 font-semibold shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
                        {commitData.message}
                    </div>
                    <ChangeList
                        changes={commitData.changeDetail}
                        selectedFile={selectedFile}
                    />
                </ChangeListLayout>

                <div className="col-span-1 flex flex-col justify-between gap-4 p-4">
                    <EditorForm
                        initialTitle=""
                        initialTags={[]}
                        initialContent={[]}
                        sourceId={sha}
                        typeId={1}
                    />
                </div>
            </div>
        </CreateMemoirLayout>
    );
}
