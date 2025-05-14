"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface LabelBadgeProps {
    type: "commit" | "pr";
}

const typeClassMap: Record<
    LabelBadgeProps["type"],
    { bg: string; text: string; label: string }
> = {
    commit: {
        label: "commit",
        bg: "bg-[#d1fae5]",
        text: "text-[#065f46]",
    },
    pr: {
        label: "PR",
        bg: "bg-[#FEF9C3]",
        text: "text-[#854D0E]",
    },
};

const tagList = ["React", "Next.js", "NextAuth"];

export default function MemoirCard({ type }: LabelBadgeProps) {
    const route = useRouter();

    const moveToMemoir = () => {
        route.push("/memoirs/12");
    };

    return (
        <li
            className="border-border-primary1 cursor-pointer border-b p-4 last:border-b-0"
            onClick={moveToMemoir}
        >
            <article className="flex items-start gap-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3E8FF]">
                    <Image
                        src="memoir-purple.svg"
                        width={14}
                        height={16}
                        alt="커밋 아이콘"
                    />
                </div>
                <div className="flex flex-1 flex-col gap-y-2">
                    <div className="flex items-center gap-x-3">
                        <h3 className="font-semibold">
                            Fix navigation bug in dashboard component
                        </h3>
                        <div
                            className={`shadow-border-primary1 rounded-lg px-3 py-1 font-semibold ${typeClassMap[type].bg} ${typeClassMap[type].text} text-xs shadow-sm`}
                        >
                            {typeClassMap[type].label}
                        </div>
                        <p className="text-text-secondary2 ml-auto text-xs">
                            2 hours ago
                        </p>
                    </div>
                    <ul className="flex gap-x-2">
                        {tagList.map((item) => (
                            <li className="border-border-primary1 w-fit rounded-md border px-2.5 py-1 text-xs font-semibold">
                                {item}
                            </li>
                        ))}
                    </ul>
                    <p className="text-text-secondary2 line-clamp-1 text-sm">
                        Detailed documentation of the new JWT-based
                        authentication system implementation, including security
                        considerations and future improvement plans.
                    </p>
                    <div className="flex items-center gap-x-3">
                        <div className="text-text-secondary2 flex items-center gap-x-1">
                            <Image
                                src="branch.svg"
                                alt="브랜치 아이콘"
                                width={14}
                                height={12}
                            />
                            <p>frontend-app</p>
                        </div>
                        <div className="text-text-secondary2 flex items-center gap-x-1">
                            <Image
                                src="code.svg"
                                alt="코드 아이콘"
                                width={18}
                                height={14}
                            />
                            bugfix/nav-issue
                        </div>
                    </div>
                </div>
            </article>
        </li>
    );
}
