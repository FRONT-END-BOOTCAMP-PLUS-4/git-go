"use client";

import Pagination from "@/app/components/Pagination";
import CommitCard from "@/app/member/commits/components/CommitCard";
import { CommitCardSkeleton } from "@/app/member/commits/components/CommitCardSkeleton";
import EmptyResult from "@/app/member/components/EmptyResult";
import { useRepoStore } from "@/store/repoStore";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import RepoSelectModal from "../components/RepoSelectModal";

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
    const [isLoading, setIsLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);
    const perPage = 10;

    const { data: session } = useSession();

    // 캐시 저장용 Map (key: "owner/repo/page")
    const cacheRef = useRef<
        Map<
            string,
            {
                commits: Commit[];
                totalCount: number;
                timestamp: number;
            }
        >
    >(new Map());

    // 캐시 만료 시간 (5분)
    const CACHE_TTL = 1000 * 60 * 10;

    useEffect(() => {
        if (checkedOnceRef.current) return;

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

        const key = `${ownerName}/${repoName}/page:${page}`;
        const now = Date.now();

        // 캐시 확인
        const cached = cacheRef.current.get(key);
        if (cached && now - cached.timestamp < CACHE_TTL) {
            setCommits(cached.commits);
            setTotalCount(cached.totalCount);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch("/api/github/commits", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    owner: ownerName,
                    repo: repoName,
                    author: session.user?.githubId,
                    token: session.accessToken,
                    page,
                    perPage,
                    userId: session.user?.id,
                }),
            });

            if (res.ok) {
                const result = await res.json();
                setCommits(result.commits);
                setTotalCount(result.totalCount);

                // 캐시에 저장
                cacheRef.current.set(key, {
                    commits: result.commits,
                    totalCount: result.totalCount,
                    timestamp: now,
                });
            } else {
                setCommits([]);
                setTotalCount(0);
            }
        } catch (error) {
            console.error("Failed to fetch commits:", error);
            setCommits([]);
            setTotalCount(0);
        } finally {
            setIsLoading(false);
        }
    };

    // 저장소 변경 시 페이지 1부터 fetch
    useEffect(() => {
        if (selectedRepo) {
            setCurrentPage(1);
            fetchCommitsByRepo(ownerName, repoName, 1);
        }
    }, [selectedRepo]);

    // 페이지 변경 시 fetch
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
            <div className="border-border-primary1 bg-bg-member1 rounded-md border-1">
                <section className="border-border-primary1 flex items-center justify-between border-b p-4">
                    <div className="flex items-center gap-x-3">
                        <h2 className="font-bold">최근 활동</h2>
                        {totalCount > 0 && (
                            <span className="text-text-secondary2 text-sm">
                                {isLoading
                                    ? "불러오는 중..."
                                    : `전체 ${totalCount}개`}
                            </span>
                        )}
                    </div>
                    <p className="text-text-secondary2 text-sm">
                        {formattedDate}
                    </p>
                </section>

                <ul>
                    {isLoading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                            <CommitCardSkeleton key={index} />
                        ))
                    ) : totalCount !== 0 ? (
                        <>{commitList}</>
                    ) : (
                        <EmptyResult message="선택한 저장소에 표시할 커밋이 없습니다." />
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
