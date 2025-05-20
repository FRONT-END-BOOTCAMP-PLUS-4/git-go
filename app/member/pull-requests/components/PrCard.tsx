"use client";
import Button from "@/app/components/Button";
import PrCommitCard from "@/app/member/pull-requests/components/PrCommitCard";
import { MEMBER_URL } from "@/constants/url";
import { useRepoStore } from "@/store/repoStore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PrCardProps {
    title: string;
    content: string | null;
    repositoryName: string;
    branchName: string;
    prNumber: number;
    createdAt: string;
    state: "open" | "closed";
}

const typeClassMap: Record<
    PrCardProps["state"],
    { bg: string; text: string; label: string; icon: string }
> = {
    open: {
        label: "open",
        bg: "bg-[#d1fae5]",
        text: "text-[#065f46]",
        icon: "/pull-request-green.svg",
    },
    closed: {
        label: "closed",
        bg: "bg-[#e0f2fe]",
        text: "text-[#1e40af]",
        icon: "/pull-request-blue.svg",
    },
};

export default function PrCard({
    title,
    content,
    repositoryName,
    branchName,
    prNumber,
    createdAt,
    state,
}: PrCardProps) {
    const router = useRouter();

    const { selectedRepo } = useRepoStore();

    const [listIsOpen, setListIsOpen] = useState(false);
    const { data: session } = useSession();

    const moveToPrMemoir = () => {
        router.push(`${MEMBER_URL.prs}/${prNumber}/memoir`);
    };

    const fetchPrCommitList = async (
        selectedRepo: string | undefined,
        prNo: number
    ) => {
        setListIsOpen(!listIsOpen);

        const accessToken = session?.accessToken;
        const author = session?.user.githubId;
        try {
            const res = await fetch("/api/github/pull-requests/commits", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    accessToken,
                    author,
                    repoFullName: selectedRepo,
                    prNumber: prNo,
                }),
            });

            if (res.ok) {
                const result = await res.json();
                console.log(result);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const newCreatedAt = new Date(createdAt);
    const formattedDate = new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(newCreatedAt);

    return (
        <li
            className="border-border-primary1 cursor-pointer border-b p-4 last:border-b-0"
            onClick={() =>
                fetchPrCommitList(selectedRepo?.nameWithOwner, prNumber)
            }
        >
            <article className="flex items-start gap-x-4">
                <div
                    className={`${typeClassMap[state].bg} flex h-10 w-10 items-center justify-center rounded-full`}
                >
                    <Image
                        src={typeClassMap[state].icon}
                        width={14}
                        height={16}
                        alt="커밋 아이콘"
                    />
                </div>
                <div className="flex flex-1 flex-col gap-y-1">
                    <div className="mb-3 flex items-center gap-x-3">
                        <h3 className="font-semibold">{title}</h3>
                        <div
                            className={`shadow-border-primary1 rounded-lg px-3 py-1 font-semibold ${typeClassMap[state].bg} ${typeClassMap[state].text} text-xs shadow-sm`}
                        >
                            {typeClassMap[state].label}
                        </div>
                        <p className="text-text-secondary2 ml-auto text-xs">
                            {formattedDate}
                        </p>
                    </div>
                    <p className="text-text-secondary2 text-sm">
                        {content ? content : "커밋 내용을 불러올 수 없읍니다."}
                    </p>
                    <div className="flex items-center gap-x-3">
                        <div className="text-text-secondary2 flex items-center gap-x-1">
                            <Image
                                src="/branch.svg"
                                alt="브랜치 아이콘"
                                width={14}
                                height={12}
                            />
                            <p>{repositoryName}</p>
                        </div>
                        <div className="text-text-secondary2 flex items-center gap-x-1">
                            <Image
                                src="/code.svg"
                                alt="코드 아이콘"
                                width={18}
                                height={14}
                            />
                            {branchName}
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
