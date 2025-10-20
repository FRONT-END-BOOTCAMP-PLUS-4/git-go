// 리팩토링 상황 : 완료
// 확인 날짜 : 2025.10.20
// 수정 내역 : 주석 제거, 타입 분리
// 기능 : 커밋 목록 페이지 보여주기 / 페이지네이션
// 파일 및 폴더 명 : 확인
// 변수명, 함수명 : 확인
// 함수 선언 방식 : 확인

"use client";

import Pagination from "@/app/components/Pagination";
import CommitCard from "@/app/member/commits/components/CommitCard";
import { CommitCardSkeleton } from "@/app/member/commits/components/CommitCardSkeleton";
import EmptyResult from "@/app/member/components/EmptyResult";
import { useRepoStore } from "@/store/useRepoStore";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import RepoSelectModal from "../components/RepoSelectModal";
import { Commit, Repo } from "@/types/commitList";

export default function CommitPage() {
    const now = new Date();
    const formattedDate = new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(now);
    const { selectedRepo, hasHydrated } = useRepoStore();
    const ownerName = useMemo(
        () => selectedRepo?.nameWithOwner.split("/")?.[0],
        [selectedRepo]
    );
    const repoName = useMemo(
        () => selectedRepo?.nameWithOwner.split("/")?.[1],
        [selectedRepo]
    );
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const queryClient = useQueryClient();
    const PER_PAGE = 10;
    const STALE_10M = 1000 * 60 * 5;
    const { data: session } = useSession();
    const { data: userReposData, isLoading: loadingRepos } = useQuery({
        queryKey: ["userRepos"],
        queryFn: async () => {
            const res = await fetch("/api/repos/user");
            if (!res.ok) throw new Error("유저 저장소 확인 실패");
            return (await res.json()) as Repo[];
        },
        staleTime: STALE_10M,
    });

    useEffect(() => {
        if (
            !loadingRepos &&
            Array.isArray(userReposData) &&
            userReposData.length === 0
        ) {
            setOpen(true);
        }
    }, [loadingRepos, userReposData]);

    useEffect(() => {
        if (!hasHydrated || !selectedRepo || !session) return;
        setCurrentPage(1);
    }, [selectedRepo, hasHydrated, session]);

    type CommitsResponse = { commits: Commit[]; totalCount: number };
    const enabled =
        !!session && !!ownerName && !!repoName && !!selectedRepo && hasHydrated;

    const { data: commitsResp, isLoading } = useQuery<CommitsResponse>({
        queryKey: [
            "commits",
            {
                repo: selectedRepo?.nameWithOwner,
                author: session?.user?.githubId,
                page: currentPage,
                perPage: PER_PAGE,
            },
        ],
        queryFn: async () => {
            const res = await fetch("/api/github/commits", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    owner: ownerName,
                    repo: repoName,
                    author: session?.user?.githubId,
                    token: session?.accessToken,
                    page: currentPage,
                    perPage: PER_PAGE,
                    userId: session?.user?.id,
                }),
            });
            if (!res.ok) return { commits: [], totalCount: 0 };
            return (await res.json()) as CommitsResponse;
        },
        enabled,
        staleTime: STALE_10M,
        gcTime: 1000 * 60 * 30,
    });

    const commits = commitsResp?.commits ?? [];
    const totalCount = commitsResp?.totalCount ?? 0;
    const showInitialBlocking =
        !hasHydrated || !selectedRepo || !session || loadingRepos;
    const hasNoLinkedRepos =
        !loadingRepos &&
        Array.isArray(userReposData) &&
        userReposData.length === 0;
    const showSkeleton =
        (enabled && isLoading && !commits.length) || showInitialBlocking;
    const showEmpty =
        (enabled && !isLoading && totalCount === 0) || hasNoLinkedRepos;

    useEffect(() => {
        if (!enabled) return;
        const hasNext = currentPage * PER_PAGE < totalCount;
        if (!hasNext) return;
        const nextPage = currentPage + 1;
        queryClient.prefetchQuery({
            queryKey: [
                "commits",
                {
                    repo: selectedRepo?.nameWithOwner,
                    author: session?.user?.githubId,
                    page: nextPage,
                    perPage: PER_PAGE,
                },
            ],
            queryFn: async () => {
                const res = await fetch("/api/github/commits", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        owner: ownerName,
                        repo: repoName,
                        author: session?.user?.githubId,
                        token: session?.accessToken,
                        page: nextPage,
                        perPage: PER_PAGE,
                        userId: session?.user?.id,
                    }),
                });
                if (!res.ok)
                    return { commits: [], totalCount: 0 } as CommitsResponse;
                return (await res.json()) as CommitsResponse;
            },
            staleTime: STALE_10M,
            gcTime: 1000 * 60 * 30,
        });
    }, [
        enabled,
        currentPage,
        totalCount,
        ownerName,
        repoName,
        selectedRepo,
        session,
        queryClient,
        STALE_10M,
    ]);

    const handlePageChange = (newPage: number) => {
        window.scrollTo({ top: 0 });
        setCurrentPage(newPage);
    };

    const commitList = commits.map((commit) => (
        <li key={commit.sha} className="border-border-primary1 border-b p-4">
            <CommitCard
                sha={commit.sha}
                commitType={commit.type}
                message={commit.message}
                repo={commit.repo}
                branch={commit.branch}
                createdAt={commit.createdAt}
            />
        </li>
    ));

    return (
        <>
            <RepoSelectModal open={open} onClose={() => setOpen(false)} />
            <div className="border-border-primary1 bg-bg-member1 rounded-md border-1">
                <section className="border-border-primary1 flex items-center justify-between border-b p-4">
                    <div className="flex items-center gap-x-3">
                        <h2 className="font-bold">최근 활동</h2>
                        {enabled && totalCount > 0 && (
                            <span className="text-text-secondary2 text-sm">
                                {showSkeleton
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
                    {showSkeleton ? (
                        Array.from({ length: 5 }).map((_, index) => (
                            <CommitCardSkeleton key={index} />
                        ))
                    ) : !showEmpty ? (
                        commitList.length > 0 ? (
                            <>{commitList}</>
                        ) : null
                    ) : (
                        <EmptyResult message="연동된 저장소가 없거나 저장소에 표시할 커밋이 없습니다." />
                    )}
                </ul>

                {!showSkeleton && commits.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalCount={totalCount}
                        perPage={PER_PAGE}
                        setCurrentPage={handlePageChange}
                    />
                )}
            </div>
        </>
    );
}
