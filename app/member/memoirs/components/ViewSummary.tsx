"use client";

import { Copy, X } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

type AiSummaryProps = {
    setShowModal: (value: boolean) => void;
    summary: string;
};

export default function ViewSummary({ setShowModal, summary }: AiSummaryProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(summary);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("복사 실패:", err);
        }
    };
    return (
        <div
            className="relative flex h-full w-full justify-center overflow-y-auto rounded-xl shadow-[0_4px_6px_-1px_var(--shadow-color)]"
            style={{
                background: `linear-gradient(180deg, var(--color-bg-gradient1) 0%, var(--color-bg-gradient2) 50%, var(--color-bg-gradient1) 100%)`,
            }}
            onClick={(e) => e.stopPropagation()}
        >
            <button
                onClick={() => setShowModal(false)}
                className="text-text-gray2 absolute top-2 right-2 z-10 cursor-pointer rounded-md p-1 text-xl"
                aria-label="Close"
            >
                <X size={24} />
            </button>
            {summary === "" ? (
                <div className="text-text-gray2 flex flex-1 items-center justify-center">
                    생성된 요약이 없습니다
                </div>
            ) : (
                <div className="flex flex-col gap-1 overflow-x-hidden p-4 pt-8 leading-10 text-black">
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
                            {summary}
                        </ReactMarkdown>
                    </div>

                    <div className="mt-4 flex justify-end gap-2">
                        <button
                            onClick={handleCopy}
                            disabled={!summary}
                            className="border-border-primary1 text-text-primary1 flex cursor-pointer items-center gap-1 rounded-md border px-3 py-1 text-sm transition hover:bg-[var(--color-hover-gray1)] disabled:opacity-50"
                        >
                            <Copy width={14} height={14} />
                            <span>{copied ? "복사됨!" : "복사"}</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
