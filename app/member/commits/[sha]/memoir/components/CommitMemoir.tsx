"use client";

import AccordionSidebar from "@/app/member/components/CreateMemoir/AccordionSideBar";
import AiSummary from "@/app/member/components/CreateMemoir/AiSummary";
import ChangeList from "@/app/member/components/CreateMemoir/ChangeList";
import ChangeListLayout from "@/app/member/components/CreateMemoir/ChangeListLayout";
import CreateMemoirLayout from "@/app/member/components/CreateMemoir/CreateMemoirLayout";
import EditorForm from "@/app/member/components/CreateMemoir/EditorForm";
import useExtractFilenames from "@/hooks/useExtractFileNames";

import { COMMITS } from "@/constants/mockCommits";
import { useRepoStore } from "@/store/repoStore";
import { useParams } from "next/navigation";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function CommitMemoir() {
    const [selectedFile, setSelectedFile] = useState<string | null>(null);

    const [showModal, setShowModal] = useState(false);
    const [filesChanged, setFilesChanged] = useState([]);

    const { selectedRepo } = useRepoStore();
    const { sha }: { sha: string } = useParams();
    console.log("repo: ", selectedRepo?.nameWithOwner);

    console.log(sha, selectedRepo?.nameWithOwner);

    const { data: session } = useSession();

    const fetchCommitDetail = async (
        nameWithOwner: string | undefined,
        sha: string,
        accessToken: string | undefined
    ) => {
        if (!nameWithOwner || !sha) return;

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
                setFilesChanged(result.changeDetail);
                console.log(result);
            }
        } catch (error) {
            console.error("Failed to fetch commit detail", error);
        } finally {
        }
    };

    useEffect(() => {
        fetchCommitDetail(
            selectedRepo?.nameWithOwner,
            sha,
            session?.accessToken
        );
    }, []);

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
                files={useExtractFilenames(filesChanged)}
                selectedFile={selectedFile}
                onSelect={setSelectedFile}
            />

            <div className="grid grid-cols-2">
                <ChangeListLayout>
                    <div className="px-3 py-2 font-semibold">
                        {COMMITS.commit.message}
                    </div>
                    <ChangeList
                        changes={COMMITS.files}
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
