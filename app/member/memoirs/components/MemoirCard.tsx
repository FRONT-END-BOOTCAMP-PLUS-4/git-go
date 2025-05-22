"use client";

import { MemoirListDto } from "@/application/usecase/memoir/dto/MemoirListDto";
import { MEMBER_URL } from "@/constants/url";
import Image from "next/image";
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
            <article className="flex items-start gap-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3E8FF]">
                    <Image
                        src="/memoir-purple.svg"
                        width={14}
                        height={16}
                        alt="커밋 아이콘"
                    />
                </div>
                <div className="flex flex-1 flex-col gap-y-2">
                    <div className="flex items-center gap-x-3">
                        <h3 className="font-semibold">{memoir.title}</h3>
                        <div
                            className={`shadow-border-primary1 rounded-lg px-3 py-1 font-semibold ${typeInfo.bg} ${typeInfo.text} text-xs shadow-sm`}
                        >
                            {typeInfo.label}
                        </div>
                        <p className="text-text-secondary2 ml-auto text-xs">
                            {new Intl.DateTimeFormat("ko-KR", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            }).format(
                                new Date(memoir.updatedAt || memoir.createdAt)
                            )}
                        </p>
                    </div>
                    <ul className="flex flex-wrap gap-x-2">
                        {memoir.tags.map((tag, index) => (
                            <li
                                key={index}
                                className="border-border-primary1 w-fit rounded-md border px-2.5 py-1 text-xs font-semibold"
                            >
                                {tag}
                            </li>
                        ))}
                    </ul>
                    <p className="text-text-secondary2 line-clamp-1 text-sm">
                        {getFirstMeaningfulText(memoir.content)}
                    </p>
                    <div className="flex items-center gap-x-3">
                        <div className="text-text-secondary2 flex items-center gap-x-1">
                            <Image
                                src="/branch.svg"
                                alt="브랜치 아이콘"
                                width={14}
                                height={12}
                            />
                            <p>{memoir.repoName}</p>
                        </div>
                    </div>
                </div>
            </article>
        </li>
    );
}
