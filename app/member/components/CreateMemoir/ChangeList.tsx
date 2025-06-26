"use client";

import { useEffect, useRef } from "react";

import { ChangeDetail } from "@/types/github/CommitType";
import clsx from "clsx";

const statusClassMap: Record<string, string> = {
    added: "bg-[var(--color-code-status-add-bg)] text-[var(--color-code-status-add-text)]",
    modified:
        "bg-[var(--color-code-status-modified-bg)] text-[var(--color-code-status-modified-text)]",
    removed:
        "bg-[var(--color-code-status-removed-bg)] text-[var(--color-code-status-removed-text)]",
    renamed:
        "bg-[var(--color-code-status-renamed-bg)] text-[var(--color-code-status-renamed-text)]",
};

type ChangeListProps = {
    changes: ChangeDetail[];
    selectedFile: string | null;
    selectedCommitId?: string | null;
};

export default function ChangeList({
    changes,
    selectedFile,
    selectedCommitId,
}: ChangeListProps) {
    // 1) 스크롤 컨테이너 ref
    const containerRef = useRef<HTMLDivElement>(null);
    const refs = useRef<Record<string, HTMLDivElement | null>>({});

    // 파일 선택 시 해당 요소로 스크롤
    useEffect(() => {
        if (selectedFile && refs.current[selectedFile]) {
            refs.current[selectedFile]!.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [selectedFile]);

    // 커밋 변경 시 컨테이너 맨 위로 스크롤
    useEffect(() => {
        if (selectedCommitId && containerRef.current) {
            containerRef.current.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    }, [selectedCommitId]);

    return (
        <div
            className="h-[calc(100%-48px)] overflow-y-auto overscroll-contain pr-2"
            ref={containerRef}
        >
            {changes.map((change) => (
                <div
                    className="border-border-primary1 mb-5 min-w-[400px] rounded-md border"
                    key={change.filename}
                >
                    <div
                        className="bg-bg-primary2 border-b-border-primary1 flex items-center justify-between rounded-tl-md rounded-tr-md border-b px-5 py-4"
                        ref={(el) => {
                            refs.current[change.filename] = el;
                        }}
                    >
                        <div className="flex items-center gap-5 truncate">
                            <div>{change.filename}</div>
                            <div className="flex items-center gap-2 text-[12px]">
                                <div className="text-code-add-symbol">{`+${change.additions}`}</div>
                                <div className="text-code-delete-symbol">{`-${change.deletions}`}</div>
                            </div>
                        </div>
                        <div
                            className={clsx(
                                "rounded-md px-2 py-1 text-sm font-semibold",
                                statusClassMap[change.status]
                            )}
                        >
                            {change.status}
                        </div>
                    </div>

                    <code className="text-sm break-words whitespace-pre-wrap">
                        {(change.patch?.split("\n") ?? []).map((line, idx) => {
                            let lineClass = "py-1 ";
                            if (line.startsWith("+")) {
                                lineClass +=
                                    "text-code-add-text bg-code-add-bg";
                            } else if (line.startsWith("-")) {
                                lineClass +=
                                    "text-code-delete-text bg-code-delete-bg";
                            } else if (line.startsWith("@")) {
                                lineClass += "text-code-gray";
                            }
                            return (
                                <div key={idx} className={lineClass}>
                                    {line}
                                </div>
                            );
                        })}
                    </code>
                </div>
            ))}
        </div>
    );
}
