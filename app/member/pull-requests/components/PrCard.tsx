"use client";
import Button from "@/app/components/Button";
import PrCommitCard from "@/app/member/pull-requests/components/PrCommitCard";
import PrCommitCardSkeleton from "@/app/member/pull-requests/components/PrCommitCardSkeleton";
import { MEMBER_URL } from "@/constants/url";
import { useRepoStore } from "@/store/useRepoStore";
import { useSourceTitleStore } from "@/store/useSourceTitleStore";
import { Archive, GitBranch, Pencil } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PrCardProps {
    title: string;
    repositoryName: string;
    branchName: string;
    prNumber: number;
    createdAt: string;
    state: "open" | "closed";
}

interface PrCommitCardProps {
    sha: string;
    message: string;
    additions: number;
    deletions: number;
    authorName: string;
    authoredDate: string;
}

// ✅ 커밋 캐시: 컴포넌트 바깥에 위치 (페이지 내 공유)
const commitCacheRef = new Map<
    string,
    { list: PrCommitCardProps[]; timestamp: number }
>();
const COMMIT_CACHE_TTL = 1000 * 60 * 10; // 10분

const typeClassMap: Record<
    PrCardProps["state"],
    { bg: string; text: string; label: string }
> = {
    open: {
        label: "open",
        bg: "bg-[#d1fae5]",
        text: "text-[#065f46]",
    },
    closed: {
        label: "closed",
        bg: "bg-[#e0f2fe]",
        text: "text-[#1e40af]",
    },
};

export default function PrCard({
    title,
    repositoryName,
    branchName,
    prNumber,
    createdAt,
    state,
}: PrCardProps) {
    const router = useRouter();
    const { selectedRepo } = useRepoStore();
    const { setSourceTitle } = useSourceTitleStore();
    const [listIsOpen, setListIsOpen] = useState(false);
    const [prCommits, setPrCommits] = useState<PrCommitCardProps[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { data: session } = useSession();

    const moveToPrMemoir = () => {
        setSourceTitle(title);
        router.push(`${MEMBER_URL.prs}/${prNumber}/memoir`);
    };

    const fetchPrCommitList = async (
        repoFullName: string | undefined,
        prNo: number
    ) => {
        if (!repoFullName || !session) return;

        const cacheKey = `${repoFullName}/pr:${prNo}`;
        const now = Date.now();

        // 닫기 동작
        if (listIsOpen) {
            setListIsOpen(false);
            return;
        }

        // 캐시 확인
        const cached = commitCacheRef.get(cacheKey);
        if (cached && now - cached.timestamp < COMMIT_CACHE_TTL) {
            setPrCommits(cached.list);
            setListIsOpen(true);
            return;
        }

        setIsLoading(true);
        setListIsOpen(true);

        try {
            const res = await fetch("/api/github/pull-requests/commits", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    accessToken: session.accessToken,
                    author: session.user.githubId,
                    repoFullName,
                    prNumber: prNo,
                }),
            });

            if (res.ok) {
                const result = await res.json();
                setPrCommits(result.commitList);

                // ✅ 캐시 저장
                commitCacheRef.set(cacheKey, {
                    list: result.commitList,
                    timestamp: now,
                });
            }
        } catch (error) {
            console.error(
                "Failed to fetch commit list from current PR: ",
                error
            );
        } finally {
            setIsLoading(false);
        }
    };

    const newCreatedAt = new Date(createdAt);
    const formattedDate = new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(newCreatedAt);

    const prCommitList = prCommits?.map((commit) => (
        <PrCommitCard
            sha={commit.sha}
            message={commit.message}
            additions={commit.additions}
            deletions={commit.deletions}
            authorName={commit.authorName}
            authoredDate={commit.authoredDate}
            key={commit.sha}
        />
    ));

    return (
        <li
            className="border-border-primary1 cursor-pointer border-b p-4"
            onClick={() =>
                fetchPrCommitList(selectedRepo?.nameWithOwner, prNumber)
            }
        >
            <article className="flex items-start gap-x-4">
                <div
                    className={`${typeClassMap[state].bg} flex h-10 w-10 items-center justify-center rounded-full`}
                >
                    <GitBranch size={18} className={typeClassMap[state].text} />
                </div>
                <div className="flex flex-1 flex-col gap-y-1">
                    <div className="relative mb-1 flex items-center gap-x-3">
                        <h3
                            className="line-clamp-1 max-w-140 font-semibold"
                            title={title}
                        >
                            {title}
                        </h3>
                        <div
                            className={`shadow-border-primary1 rounded-md px-3 py-1 font-semibold ${typeClassMap[state].bg} ${typeClassMap[state].text} text-xs shadow-sm`}
                        >
                            {typeClassMap[state].label}
                        </div>
                        <p className="text-text-secondary2 ml-auto shrink-0 text-xs">
                            {formattedDate}
                        </p>
                    </div>
                    <a
                        href={`https://github.com/${selectedRepo?.nameWithOwner}/pull/${prNumber}`}
                        className="text-text-secondary2 w-fit text-sm"
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                    >
                        🔗{" "}
                        <span className="underline">
                            {`https://github.com/${selectedRepo?.nameWithOwner}/pull/${prNumber}`}
                        </span>
                    </a>
                    <div className="flex items-center gap-x-3">
                        <div className="text-text-secondary2 flex items-center gap-x-1">
                            <Archive size={18} />
                            <p>{repositoryName}</p>
                        </div>
                        <div className="text-text-secondary2 flex items-center gap-x-1">
                            {/* <Image
                                src="/branch.svg"
                                alt="브랜치 아이콘"
                                width={14}
                                height={12}
                            /> */}
                            <GitBranch size={18} />
                            {branchName}
                        </div>
                        <div className="ml-auto">
                            <div onClick={(e) => e.stopPropagation()}>
                                <Button
                                    type="lined"
                                    htmlType="button"
                                    onClick={moveToPrMemoir}
                                >
                                    {/* <Image
                                        src="/write.svg"
                                        alt="회고 등록 아이콘"
                                        width={12}
                                        height={12}
                                    /> */}
                                    <Pencil size={18} />
                                    회고록 작성
                                </Button>
                            </div>
                        </div>
                    </div>

                    {listIsOpen && (
                        <div className="border-border-primary1 mt-4 rounded-md border">
                            <div className="bg-bg-primary1 border-border-primary1 flex items-center justify-between border-b p-4">
                                <h3 className="text-sm font-semibold">
                                    Commit in this PR
                                </h3>
                            </div>
                            <ul>
                                {isLoading ? (
                                    Array.from({ length: 2 }).map(
                                        (_, index) => (
                                            <PrCommitCardSkeleton key={index} />
                                        )
                                    )
                                ) : (
                                    <>{prCommitList}</>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </article>
        </li>
    );
}
