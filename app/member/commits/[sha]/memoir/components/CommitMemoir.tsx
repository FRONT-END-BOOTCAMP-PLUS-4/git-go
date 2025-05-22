"use client";

import AiSummary from "@/app/member/components/CreateMemoir/AiSummary";
import ChangeList from "@/app/member/components/CreateMemoir/ChangeList";
import ChangeListLayout from "@/app/member/components/CreateMemoir/ChangeListLayout";
import CreateMemoirLayout from "@/app/member/components/CreateMemoir/CreateMemoirLayout";
import EditorForm from "@/app/member/components/CreateMemoir/EditorForm";
import FileTree from "@/app/member/components/CreateMemoir/FileTree";

import { COMMITS } from "@/constants/mockCommits";
import { useMemoirForm } from "@/hooks/useMemoirForm";
import { useParams } from "next/navigation";

import { useState } from "react";

export default function CommitMemoir() {
    const [selectedFile, setSelectedFile] = useState<string | null>(null);

    const [showModal, setShowModal] = useState(false);

    const { sha }: { sha: string } = useParams();
    const {
        title,
        setTitle,
        tags,
        setTags,
        disabled,
        loading,
        error,
        handleSave,
    } = useMemoirForm(sha, 1);

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
            <FileTree files={COMMITS.files} onSelect={setSelectedFile} />

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
                        initialTitle={title}
                        onChangeTitle={setTitle}
                        initialTags={tags}
                        onChangeTag={setTags}
                        initialContent={[]}
                        sourceId={sha}
                        typeId={1}
                    />
                </div>
            </div>
        </CreateMemoirLayout>
    );
}
