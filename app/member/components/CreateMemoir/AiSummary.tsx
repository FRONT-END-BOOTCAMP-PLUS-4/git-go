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
        <div
            className="flex h-60 w-full flex-col gap-3 overflow-y-auto rounded-md px-5 py-2 shadow-md"
            style={{
                background: "linear-gradient(180deg, #EFF6FF 0%, #FFFFFF 100%)",
            }}
        >
            {!isSummarized ? (
                <div className="flex flex-1 flex-col items-center justify-center">
                    <p className="mb-4 items-center text-center text-sm text-nowrap text-gray-700">
                        AI가 코드를 분석하여 핵심 내용을 요약해드립니다.
                        <br />
                        아래 버튼을 클릭하여 AI 요약을 시작해보세요.
                    </p>
                    <button
                        className="bg-primary7 hover:bg-primary6 cursor-pointer rounded-md px-4 py-2 text-sm font-semibold text-white transition"
                        onClick={handleSummarize}
                    >
                        AI 요약 시작하기
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
