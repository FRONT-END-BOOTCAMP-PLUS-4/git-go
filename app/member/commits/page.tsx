"use client";

import CommitCard from "@/app/member/commits/components/CommitCard";
import { useEffect, useRef, useState } from "react";
import RepoSelectModal from "../components/RepoSelectModal";
import { useRepoStore } from "@/store/repoStore";
import { useSession } from "next-auth/react";
import Loading from "../components/Loading";
import Pagination from "@/app/components/Pagination";
import { CommitCardSkeleton } from "@/app/member/commits/components/CommitCardSkeleton";

interface Commit {
    sha: string;
    type:
        | "feat"
        | "fix"
        | "chore"
        | "merge"
        | "refactor"
        | "test"
        | "docs"
        | "style"
        | "etc";
    message: string;
    repo: string;
    branch: string;
    createdAt: string;
}

export default function CommitPage() {
    const now = new Date();
    const formattedDate = new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(now);

    const { selectedRepo } = useRepoStore();
    const ownerName = selectedRepo?.nameWithOwner.split("/")[0];
    const repoName = selectedRepo?.nameWithOwner.split("/")[1];

    const [open, setOpen] = useState(false);
    const checkedOnceRef = useRef(false);
    const [commits, setCommits] = useState<Commit[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const perPage = 10;

    const { data: session } = useSession();

    useEffect(() => {
        if (checkedOnceRef.current) return;
        setIsLoading(true);
        const fetchUserRepos = async () => {
            try {
                const res = await fetch("/api/repos/user");
                const repos = await res.json();
                if (Array.isArray(repos) && repos.length === 0) {
                    setOpen(true);
                    setIsLoading(false);
                }
            } catch (err) {
                console.error("유저 저장소 확인 실패", err);
                setIsLoading(false);
            }
        };

        fetchUserRepos();
    }, []);

    const fetchCommitsByRepo = async (
        ownerName: string | undefined,
        repoName: string | undefined,
        page: number
    ): Promise<void> => {
        if (!session || !ownerName || !repoName) return;
        setIsLoading(true);

        const accessToken = session.accessToken;
        const author = session.user?.githubId;

        try {
            const res = await fetch("/api/github/commits", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    owner: ownerName,
                    repo: repoName,
                    author: author,
                    token: accessToken,
                    page,
                    perPage,
                }),
            });

            if (res.ok) {
                const result = await res.json();
                setCommits(result.commits);
                setTotalCount(result.totalCount);
            }
        } catch (error: unknown) {
            console.error("Failed to fetch commits:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // 저장소 변경 시 새로운 데이터 fetch
    useEffect(() => {
        if (selectedRepo) {
            setCurrentPage(1);
            fetchCommitsByRepo(ownerName, repoName, 1);
        }
    }, [selectedRepo]);

    // 페이지 변경 시 새로운 데이터 fetch
    useEffect(() => {
        if (selectedRepo) {
            fetchCommitsByRepo(ownerName, repoName, currentPage);
        }
    }, [currentPage]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const commitList = commits?.map((commit) => (
        <CommitCard
            key={commit.sha}
            sha={commit.sha}
            commitType={commit.type}
            message={commit.message}
            repo={commit.repo}
            branch={commit.branch}
            createdAt={commit.createdAt}
        />
    ));

    return (
        <>
            <RepoSelectModal open={open} onClose={() => setOpen(false)} />
            <div className="border-border-primary1 rounded-lg border-1 bg-white">
                <section className="border-border-primary1 flex items-center justify-between border-b p-4">
                    <div className="flex items-center gap-x-3">
                        <h2 className="font-bold">최근 활동</h2>
                        {totalCount > 0 &&
                            (isLoading ? (
                                <span className="text-text-secondary2 text-sm">
                                    불러오는 중...
                                </span>
                            ) : (
                                <span className="text-text-secondary2 text-sm">
                                    전체 {totalCount}개
                                </span>
                            ))}
                    </div>
                    <p className="text-text-secondary2 text-sm">
                        {formattedDate}
                    </p>
                </section>

                <ul className="min-h-[100px]">
                    {isLoading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                            <CommitCardSkeleton key={index} />
                        ))
                    ) : (
                        <>{commitList}</>
                    )}
                </ul>

                {!isLoading && commits.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalCount={totalCount}
                        perPage={perPage}
                        setCurrentPage={handlePageChange}
                    />
                )}
            </div>
        </>
    );
}
