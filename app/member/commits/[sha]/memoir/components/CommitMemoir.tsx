"use client";

import AiSummary from "@/app/member/components/CreateMemoir/AiSummary";
import ChangeList from "@/app/member/components/CreateMemoir/ChangeList";
import ChangeListLayout from "@/app/member/components/CreateMemoir/ChangeListLayout";
import CreateMemoirLayout from "@/app/member/components/CreateMemoir/CreateMemoirLayout";
import Editor from "@/app/member/components/CreateMemoir/Editor";
import FileTree from "@/app/member/components/CreateMemoir/FileTree";
import { COMMITS } from "@/constants/mockCommits";
import { useState } from "react";

export default function CommitMemoir() {
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    // console.log("selectedFile: ", selectedFile);

    return (
        <CreateMemoirLayout>
            <button
                onClick={() => setShowModal(true)}
                className="fixed bottom-14 left-4 z-50 animate-[bounce_1s_infinite] cursor-pointer rounded-full p-3 shadow-lg [animation-fill-mode:both]"
                style={{
                    background:
                        "linear-gradient(180deg, #EFF6FF 0%, #FFFFFF 50%,#EFF6FF 100%)",
                }}
            >
                ✨ AI 요약 시작하기
            </button>
            {showModal && (
                <div className="fixed bottom-10 left-4 z-51 flex h-[60vh] w-[60vw]">
                    <AiSummary setShowModal={setShowModal} />
                </div>
            )}
            <FileTree files={COMMITS.files} onSelect={setSelectedFile} />
            <ChangeListLayout>
                <div className="px-3 py-2 font-semibold">
                    {COMMITS.commit.message}
                </div>
                <ChangeList
                    changes={COMMITS.files}
                    selectedFile={selectedFile}
                />
            </ChangeListLayout>
            <div className="border-border-primary1 flex flex-3 flex-col justify-between gap-4 p-4">
                <Editor />
                <div className="flex justify-end gap-2">
                    <button className="border-border-primary1 rounded-md border px-4 py-2">
                        취소
                    </button>
                    <button className="bg-primary7 text-text-primary1 rounded-md px-4 py-2">
                        회고록 작성 완료
                    </button>
                </div>
            </div>
        </CreateMemoirLayout>
    );
}
