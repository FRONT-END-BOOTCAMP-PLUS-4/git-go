"use client";

import { MemoirListDto } from "@/application/usecase/memoir/dto/MemoirListDto";
import { MEMBER_URL } from "@/constants/url";
import {
    Archive,
    BookText,
    GitBranch,
    GitCommitHorizontal,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
    memoir: MemoirListDto;
}

const typeClassMap: Record<
    string,
    { bg: string; text: string; label: string }
> = {
    commit: {
        label: "Commit",
        bg: "bg-[#d1fae5]",
        text: "text-[#065f46]",
    },

    "pull-request": {
        label: "Pull Request",
        bg: "bg-[#FEF9C3]",
        text: "text-[#854D0E]",
    },
    default: {
        label: "기타",
        bg: "bg-gray-200",
        text: "text-gray-800",
    },
};

function getFirstMeaningfulText(content: any): string {
    if (!Array.isArray(content)) return "";

    for (const block of content) {
        if (!block.children) continue;

        for (const child of block.children) {
            if (child.text && child.text.trim()) {
                return child.text.trim();
            }

            // table 안의 td 안의 p 안의 children 처리
            if (Array.isArray(child.children)) {
                for (const subChild of child.children) {
                    if (subChild.text && subChild.text.trim()) {
                        return subChild.text.trim();
                    }
                }
            }
        }
    }

    return "";
}

function getIconByType(type: string) {
    if (type === "commit") {
        return <GitCommitHorizontal size={18} />;
    } else {
        return <GitBranch size={18} />;
    }
}

export default function MemoirCard({ memoir }: Props) {
    const router = useRouter();
    const typeInfo = typeClassMap[memoir.type] || typeClassMap.default;

    const moveToMemoir = (source: string, memoirId: number) => {
        router.push(`${MEMBER_URL.memoirs_detail(source, memoirId)}`);
    };

    return (
        <li
            className="border-border-primary1 cursor-pointer border-b p-4"
            onClick={() => moveToMemoir(memoir.type, memoir.id)}
        >
            <article className="flex min-w-0 items-start gap-x-4 overflow-hidden">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F3E8FF]">
                    <BookText size={18} className="text-[#9333EA]" />
                </div>

                {/* 본문 */}
                <div className="flex min-w-0 flex-1 flex-col gap-y-2">
                    <div className="flex min-w-0 flex-col md:flex-row md:items-center md:gap-x-3">
                        {/* 타이틀 + 라벨 */}
                        <div className="flex min-w-0 items-center gap-x-3">
                            <h3 className="max-w-[60%] truncate font-semibold md:max-w-none">
                                {memoir.title}
                            </h3>
                            <div
                                className={`shadow-border-primary1 ml-auto rounded-md px-3 py-1 font-semibold ${typeInfo.bg} ${typeInfo.text} max-w-[120px] text-xs shadow-sm md:max-w-[160px]`}
                            >
                                {typeInfo.label}
                            </div>
                        </div>

                        {/* 날짜 */}
                        <p className="text-text-secondary2 mt-1 text-xs md:mt-0 md:ml-auto md:text-right md:whitespace-nowrap">
                            {new Intl.DateTimeFormat("ko-KR", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            }).format(
                                new Date(memoir.updatedAt || memoir.createdAt)
                            )}
                        </p>
                    </div>

                    <div className="w-full overflow-hidden">
                        <ul className="flex max-w-[100%] gap-x-2 overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] md:max-w-none [&::-webkit-scrollbar]:hidden">
                            {memoir.tags.map((tag, i) => (
                                <li
                                    key={i}
                                    className="border-border-primary1 bg-bg-tag1 w-fit shrink-0 rounded-md border px-2.5 py-1 text-xs font-semibold"
                                >
                                    {tag}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <p className="text-text-secondary2 line-clamp-1 text-sm">
                        {getFirstMeaningfulText(memoir.content)}
                    </p>

                    <div className="text-text-secondary2 flex min-w-0 items-center gap-x-1">
                        {getIconByType(memoir.type)}
                        <p className="max-w-full truncate md:max-w-none">
                            {memoir.sourceTitle}
                        </p>
                    </div>
                </div>
            </article>
        </li>
    );
}
