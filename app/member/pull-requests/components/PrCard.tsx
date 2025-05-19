"use client";
import Button from "@/app/components/Button";
import PrCommitCard from "@/app/member/pull-requests/components/PrCommitCard";
import { MEMBER_URL } from "@/constants/url";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LabelBadgeProps {
    type: "open" | "merged";
}

const typeClassMap: Record<
    LabelBadgeProps["type"],
    { bg: string; text: string; label: string; icon: string }
> = {
    open: {
        label: "open",
        bg: "bg-[#d1fae5]",
        text: "text-[#065f46]",
        icon: "/pull-request-green.svg",
    },
    merged: {
        label: "merged",
        bg: "bg-[#e0f2fe]",
        text: "text-[#1e40af]",
        icon: "/pull-request-blue.svg",
    },
};

export default function PrCard({ type }: LabelBadgeProps) {
    const router = useRouter();

    const [listIsOpen, setListIsOpen] = useState(false);

    const moveToPrMemoir = () => {
        router.push(`${MEMBER_URL.prs}/1234/memoir`);
    };

    return (
        <li
            className="border-border-primary1 cursor-pointer border-b p-4 last:border-b-0"
            onClick={() => setListIsOpen(!listIsOpen)}
        >
            <article className="flex items-start gap-x-4">
                <div
                    className={`${typeClassMap[type].bg} flex h-10 w-10 items-center justify-center rounded-full`}
                >
                    <Image
                        src={typeClassMap[type].icon}
                        width={14}
                        height={16}
                        alt="커밋 아이콘"
                    />
                </div>
                <div className="flex flex-1 flex-col gap-y-1">
                    <div className="mb-3 flex items-center gap-x-3">
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
                    <p className="text-text-secondary2 text-sm">
                        Implements JWT-based authentication system with login
                        and registration flows.
                    </p>
                    <div className="flex items-center gap-x-3">
                        <div className="text-text-secondary2 flex items-center gap-x-1">
                            <Image
                                src="/branch.svg"
                                alt="브랜치 아이콘"
                                width={14}
                                height={12}
                            />
                            <p>frontend-app</p>
                        </div>
                        <div className="text-text-secondary2 flex items-center gap-x-1">
                            <Image
                                src="/code.svg"
                                alt="코드 아이콘"
                                width={18}
                                height={14}
                            />
                            bugfix/nav-issue
                        </div>
                        <div className="ml-auto">
                            <div onClick={(e) => e.stopPropagation()}>
                                <Button
                                    type="lined"
                                    htmlType="button"
                                    onClick={moveToPrMemoir}
                                >
                                    <Image
                                        src="/write.svg"
                                        alt="회고 등록 아이콘"
                                        width={12}
                                        height={12}
                                    />
                                    Write Memoir
                                </Button>
                            </div>
                        </div>
                    </div>

                    {listIsOpen && (
                        <div className="border-border-primary1 mt-4 rounded-md border">
                            <div className="bg-border-primary2 border-border-primary1 flex items-center justify-between border-b p-4">
                                <h3 className="text-sm font-semibold">
                                    Commit in this PR
                                </h3>
                            </div>
                            <ul>
                                <PrCommitCard />
                                <PrCommitCard />
                                <PrCommitCard />
                                <PrCommitCard />
                                <PrCommitCard />
                            </ul>
                        </div>
                    )}
                </div>
            </article>
        </li>
    );
}
