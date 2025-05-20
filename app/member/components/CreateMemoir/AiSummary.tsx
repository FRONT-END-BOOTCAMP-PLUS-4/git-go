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
다음은 Git 변경 내역입니다. 이 변경 내역을 아래 출력 형식에 맞게 정리해주세요.

- 각 변경된 파일의 내용을 요약해주세요.
- 기술적인 설명은 간단하고 명확하게 적어주세요.
- 각 헤더(요약, 파일이름) 다음에는 한 줄 띄운 후 내용을 작성하세요.
- 너무 긴 문장은 **적절히 끊어서** 가독성을 높여주세요.
- 각 섹션(요약, 파일1, 파일2, …) 사이에도 빈 줄 1개를 추가하세요.
- 출력은 반드시 아래 형식을 따르세요.


형식 예시:

**요약**
변경된 전체 내용을 간단히 요약

**파일이름1**
해당 파일에서 변경된 주요 사항 설명

**파일이름2**
해당 파일에서 변경된 주요 사항 설명
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
