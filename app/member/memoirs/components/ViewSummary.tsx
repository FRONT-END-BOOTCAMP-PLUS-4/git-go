"use client";

import { X } from "lucide-react";
import ReactMarkdown from "react-markdown";

type AiSummaryProps = {
    setShowModal: (value: boolean) => void;
    summary: string;
};

export default function ViewSummary({ setShowModal, summary }: AiSummaryProps) {
    return (
        <div
            className="flex h-full w-full justify-center overflow-y-auto rounded-xl bg-white shadow-xl"
            style={{
                background:
                    "linear-gradient(180deg, #EFF6FF 0%, #FFFFFF 50%, #EFF6FF 100%)",
            }}
            onClick={(e) => e.stopPropagation()}
        >
            <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 cursor-pointer text-xl text-gray-400 hover:text-gray-600"
                aria-label="Close"
            >
                <X size={24} />
            </button>
            {summary === "" ? (
                <div className="flex flex-1 items-center justify-center text-gray-400">
                    생성된 요약이 없습니다
                </div>
            ) : (
                <div className="flex flex-col gap-1 p-4 pt-8 leading-10 text-black">
                    <ReactMarkdown>{summary}</ReactMarkdown>
                </div>
            )}
        </div>
    );
}
