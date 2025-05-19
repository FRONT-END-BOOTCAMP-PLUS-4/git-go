"use client";

import Image from "next/image";
import { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { flushSync } from "react-dom";
import { useSimplifyCommitData } from "@/hooks/useSimplifyCommitData"; // 정제 함수 사용
import { COMMITS } from "@/constants/mockCommits"; // 커밋 예시 데이터
import ReactMarkdown from "react-markdown";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

export default function AiSummary() {
    const [isSummarized, setIsSummarized] = useState(false);
    const [markdown, setMarkdown] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSummarize = async () => {
        setIsSummarized(true);
        setLoading(true);

        const simplified = useSimplifyCommitData(COMMITS);

        const prompt = `
다음은 커밋 메시지와 수정된 파일 목록입니다. 이 내용을 기반으로 어떤 변경 사항이 있었는지 요약해 주세요.

\`\`\`json
${JSON.stringify(simplified, null, 2)}
\`\`\`
`;

        const response = await ai.models.generateContentStream({
            model: "gemini-2.5-flash-preview-04-17",
            contents: prompt,
        });

        for await (const chunk of response) {
            const chunkText = chunk.text;
            flushSync(() => {
                setMarkdown((prev) => prev + chunkText);
            });
        }

        setLoading(false);
    };

    return (
        <div className="bg-bg-secondary1 flex h-60 w-full flex-col gap-3 overflow-y-auto rounded-md px-5 py-2">
            {!isSummarized ? (
                <div className="flex flex-1 items-center justify-center">
                    <button
                        className="bg-primary7 hover:bg-primary8 rounded-md px-4 py-2 text-white hover:cursor-pointer"
                        onClick={handleSummarize}
                    >
                        AI 요약하기
                    </button>
                </div>
            ) : loading && markdown === "" ? (
                <div className="flex flex-1 animate-pulse items-center justify-center text-gray-400">
                    요약 생성 중입니다...
                </div>
            ) : (
                <>
                    <div className="flex items-center gap-2">
                        <Image
                            className="h-6 w-6"
                            src="/ai-summaries.svg"
                            alt="ai_image"
                            width={24}
                            height={24}
                        />
                        <div className="text-primary7">AI 요약</div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <ReactMarkdown>{markdown}</ReactMarkdown>
                    </div>
                </>
            )}
        </div>
    );
}
