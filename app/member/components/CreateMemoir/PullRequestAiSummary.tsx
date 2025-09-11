"use client";

import { PROMPT } from "@/constants/aiPullRequestPrompt";
import { useSimplifyPullRequestData } from "@/hooks/useSimplifyPullRequestData";
import { useSummaryStore } from "@/store/useSummaryStore";
import { PullRequestType } from "@/types/github/PullRequestType";
import { GoogleGenAI } from "@google/genai";

import { Copy, RotateCcw, X } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { flushSync } from "react-dom";
import ReactMarkdown from "react-markdown";
import { useSession } from "next-auth/react";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

type AiSummaryProps = {
    setShowModal: (value: boolean) => void;
    pullRequest: PullRequestType[];
    prNo?: string;
};

export default function PullRequestAiSummary({
    setShowModal,
    pullRequest,
    prNo,
}: AiSummaryProps) {
    const {
        aiSummary,
        setSummary,
        setSummarized,
        isSummarized,
        retryCount,
        setRetryCount,
    } = useSummaryStore();

    const alreadySummarized = isSummarized(prNo || "");
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const { data: session, status: sessionStatus } = useSession();
    const [limitExceeded, setLimitExceeded] = useState<boolean | null>(null);
    const simplified = useSimplifyPullRequestData(pullRequest);

    useEffect(() => {
        const fetchUsage = async () => {
            const res = await fetch("/api/settings/tokenUsages");
            const data = await res.json();
            const usage = data.daily_ai_use_count;
            const restrict = data.daily_ai_restrict_count;
            const exceeded = usage >= restrict;
            setLimitExceeded(exceeded);
        };
        fetchUsage();
    }, []);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(aiSummary);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("복사 실패:", err);
        }
    };

    const handleSummarize = async () => {
        if (limitExceeded) {
            setSummary(
                "❌ 오늘의 사용량이 초과되어 AI 요약을 사용할 수 없습니다."
            );
            return;
        }

        setSummary("");
        setLoading(true);
        setSummarized(prNo || "", true);

        try {
            const prompt = `
        ${PROMPT}
        \`\`\`json
        ${JSON.stringify(simplified, null, 2)}
        \`\`\`
      `;

            const response = await ai.models.generateContentStream({
                model: "gemini-2.5-flash-preview-05-20",
                contents: prompt,
            });

            let fullText = "";
            let tokenUsage: number = 0;

            for await (const chunk of response) {
                if (!chunk || !chunk.text) continue;
                fullText += chunk.text;
                tokenUsage = chunk.usageMetadata?.totalTokenCount ?? 0;
                flushSync(() => {
                    setSummary(fullText);
                });
            }
            setSummary(fullText);
            setSummarized(prNo || "", true);

            if (tokenUsage && sessionStatus === "authenticated") {
                const res = await fetch("/api/settings/tokenUsages", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        userId: session.user.id,
                        tokenUsage,
                    }),
                });
                const data = await res.json();
                if (data.usage >= data.restrictUsage) {
                    setLimitExceeded(true);
                }
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("AI 요약 실패:", error.message);
            } else {
                console.error("AI 요약 실패: 알 수 없는 오류", error);
            }
            setSummary(
                "❌ 요약을 생성하는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
            );
            setSummarized(prNo || "", false);
        } finally {
            setLoading(false);
        }
    };

    const handleRetry = async () => {
        if (retryCount <= 2) {
            setRetryCount(retryCount - 1);
            await handleSummarize();
        }
    };

    return (
        <div
            className="text-text-primary1 flex h-full w-full justify-center overflow-x-hidden overflow-y-auto rounded-xl shadow-[0_4px_6px_-1px_var(--shadow-color)]"
            style={{
                background: `linear-gradient(180deg, var(--color-bg-gradient1) 0%, var(--color-bg-gradient2) 50%, var(--color-bg-gradient1) 100%)`,
            }}
        >
            <button
                onClick={(e) => {
                    setShowModal(false);
                    e.stopPropagation();
                }}
                className="text-text-gray2 absolute top-2 right-2 z-10 cursor-pointer rounded-md p-1 text-xl"
                aria-label="Close"
            >
                <X size={24} />
            </button>

            {limitExceeded === null ? (
                <div />
            ) : !alreadySummarized ? (
                <div
                    className="flex flex-1 flex-col items-center justify-center overflow-y-auto break-words"
                    style={{ maxHeight: "100%" }}
                >
                    {limitExceeded === true ? (
                        <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto break-words">
                            <p className="text-danger1 mb-2 text-sm">
                                오늘의 AI 사용량을 초과하여 요약 기능을 사용할
                                수 없습니다.
                            </p>
                            <button
                                className="bg-primary7 text-text-secondary1 cursor-not-allowed rounded-md px-4 py-2 text-sm font-semibold opacity-50 transition"
                                onClick={handleSummarize}
                                disabled
                            >
                                AI 요약
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto break-words">
                            <p className="text-text-gray1 mb-4 items-center text-center text-sm">
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
                    )}
                </div>
            ) : loading && aiSummary === "" ? (
                <div className="flex flex-col items-center justify-center">
                    <div className="text-text-gray1 mb-6 flex animate-pulse items-center justify-center">
                        요약 생성 중입니다...
                    </div>
                    <Image
                        src={"/cat-run.gif"}
                        alt="로딩 중"
                        width={250}
                        height={100}
                        unoptimized
                    />
                </div>
            ) : (
                <>
                    <div className="relative flex min-h-[300px] min-w-[70%] flex-col gap-1 p-4 pt-8 leading-10">
                        <div className="max-w-full px-3">
                            <ReactMarkdown
                                components={{
                                    strong: ({ ...props }) => (
                                        <strong
                                            {...props}
                                            className="mt-4 block max-w-full align-middle"
                                        />
                                    ),
                                }}
                            >
                                {aiSummary}
                            </ReactMarkdown>
                        </div>

                        <div className="mt-4 flex flex-col items-end gap-2 pb-4">
                            <div className="flex gap-2">
                                <button
                                    onClick={handleCopy}
                                    disabled={!aiSummary}
                                    className="bg-bg-primary1 border-border-primary1 text-text-primary1 flex cursor-pointer items-center gap-1 rounded-md border px-3 py-1 text-sm transition hover:bg-[var(--color-hover-gray1)] disabled:opacity-50"
                                >
                                    <Copy width={14} height={14} />
                                    <span>{copied ? "복사됨!" : "복사"}</span>
                                </button>

                                <button
                                    onClick={handleRetry}
                                    disabled={
                                        retryCount === 0 ||
                                        loading ||
                                        !!limitExceeded
                                    }
                                    className={`bg-bg-primary1 border-border-primary1 text-text-primary1 flex cursor-pointer items-center gap-1 rounded-md border px-3 py-1 text-sm transition hover:bg-[var(--color-hover-gray1)] ${
                                        retryCount === 0 ||
                                        loading ||
                                        limitExceeded
                                            ? "opacity-50"
                                            : ""
                                    } `}
                                >
                                    <RotateCcw width={14} height={14} />
                                    <span>재시도 ({retryCount}회 남음)</span>
                                </button>
                            </div>

                            {/* 제한 초과 안내 */}
                            {limitExceeded && (
                                <p className="text-danger1 mt-1 mb-2 text-sm">
                                    오늘의 AI 사용량을 초과하여 더 이상 요약을
                                    재시도할 수 없습니다.
                                </p>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
