"use client";

import { useState, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";
import { flushSync } from "react-dom";
import { useSimplifyCommitData } from "@/hooks/useSimplifyCommitData";
import { COMMITS } from "@/constants/mockCommits";
import { PROMPT } from "@/constants/aiPrompt";
import ReactMarkdown from "react-markdown";
import { useSummaryStore } from "@/store/AiSummaryStore";
import { CommitType } from "@/types/github/CommitType";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

type AiSummaryProps = {
    setShowModal: (value: boolean) => void;
    commit: CommitType;
};

export default function AiSummary({ setShowModal, commit }: AiSummaryProps) {
    const { aiSummary, setSummary, setSummarized, isSummarized } =
        useSummaryStore();
    const alreadySummarized = isSummarized(COMMITS.sha);
    const [loading, setLoading] = useState(false);

    const handleSummarize = async () => {
        setLoading(true);
        setSummarized(COMMITS.sha, true);

        const simplified = useSimplifyCommitData(commit);
        const prompt = `
                        ${PROMPT}
                        \`\`\`json
                        ${JSON.stringify(simplified, null, 2)}
                        \`\`\`
                        `;

        const response = await ai.models.generateContentStream({
            model: "gemini-2.5-flash-preview-04-17",
            contents: prompt,
        });

        let fullText = "";

        for await (const chunk of response) {
            fullText += chunk.text;
            flushSync(() => {
                setSummary(fullText);
            });
        }
        setSummary(fullText);
        setSummarized(COMMITS.sha, true);
        setLoading(false);
    };

    return (
        <div
            className="flex h-full w-full justify-center overflow-y-scroll rounded-xl bg-white shadow-xl"
            style={{
                background:
                    "linear-gradient(180deg, #EFF6FF 0%, #FFFFFF 50%, #EFF6FF 100%)",
            }}
            onClick={(e) => e.stopPropagation()}
        >
            <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-4 cursor-pointer text-xl text-gray-400 hover:text-gray-600"
                aria-label="Close"
            >
                ✖
            </button>
            {!alreadySummarized ? (
                <div
                    className="flex flex-1 flex-col items-center justify-center overflow-y-auto break-words"
                    style={{ maxHeight: "100%" }}
                >
                    <p className="mb-4 items-center text-center text-sm text-nowrap text-gray-700">
                        AI가 코드를 분석하여 핵심 내용을 요약해드립니다.
                        <br />
                        아래 버튼을 클릭하여 AI 요약을 시작해보세요.
                    </p>
                    <button
                        className="bg-primary7 hover:bg-primary6 cursor-pointer rounded-md px-4 py-2 text-sm font-semibold text-white transition"
                        onClick={handleSummarize}
                    >
                        AI 요약
                    </button>
                </div>
            ) : loading && aiSummary === "" ? (
                <div className="flex flex-1 animate-pulse items-center justify-center text-gray-400">
                    요약 생성 중입니다...
                </div>
            ) : (
                <>
                    <div className="flex flex-col gap-1 p-4 pt-8 leading-10">
                        <ReactMarkdown>{aiSummary}</ReactMarkdown>
                    </div>
                </>
            )}
        </div>
    );
}
