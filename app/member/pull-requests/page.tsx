"use client";

import Pagination from "@/app/components/Pagination";
import EmptyResult from "@/app/member/components/EmptyResult";
import RepoSelectModal from "@/app/member/components/RepoSelectModal";
import PrCard from "@/app/member/pull-requests/components/PrCard";
import PrCardSkeleton from "@/app/member/pull-requests/components/PrCardSkeleton";
import { useRepoStore } from "@/store/useRepoStore";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface PrCardProps {
    title: string;
    content: string;
    repositoryName: string;
    branchName: string;
    prNumber: number;
    createdAt: string;
    state: "open" | "closed";
}

interface Repo {
    id: number;
    name: string;
    nameWithOwner: string;
}

type PrListResponse = { list: PrCardProps[]; totalCount: number };

export default function PullRequestPage() {
    const now = new Date();
    const formattedDate = new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(now);

    const [currentPage, setCurrentPage] = useState(1);
    const [open, setOpen] = useState(false);

    const { selectedRepo, hasHydrated } = useRepoStore();
    const { data: session } = useSession();
    const queryClient = useQueryClient();

    const ownerName = useMemo(
        () => selectedRepo?.nameWithOwner.split("/")?.[0],
        [selectedRepo]
    );
    const repoName = useMemo(
        () => selectedRepo?.nameWithOwner.split("/")?.[1],
        [selectedRepo]
    );
    const repoFullName = selectedRepo?.nameWithOwner;
    const PER_PAGE = 10;
    const STALE_10M = 1000 * 60 * 5;

    // 유저가 연동한 저장소 존재 여부 체크 (모달 오픈/빈 상태 판단용)
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

    // 선택 저장소/세션 바뀌면 1페이지로 리셋
    useEffect(() => {
        if (!hasHydrated || !selectedRepo || !session) return;
        setCurrentPage(1);
    }, [selectedRepo, hasHydrated, session]);

    const enabled =
        !!session && !!ownerName && !!repoName && !!selectedRepo && hasHydrated;

    // PR 목록 쿼리
    const { data: prResp, isLoading } = useQuery<PrListResponse>({
        queryKey: [
            "pullRequests",
            {
                repo: repoFullName,
                author: session?.user?.githubId,
                page: currentPage,
                perPage: PER_PAGE,
            },
        ],
        queryFn: async () => {
            const res = await fetch("/api/github/pull-requests", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token: session?.accessToken,
                    author: session?.user?.githubId,
                    repoFullName,
                    page: currentPage,
                    perPage: PER_PAGE,
                }),
            });
            if (!res.ok) return { list: [], totalCount: 0 };
            return (await res.json()) as PrListResponse;
        },
        enabled,
        staleTime: STALE_10M,
        gcTime: 1000 * 60 * 30, // 30분
    });

    const prList = prResp?.list ?? [];
    const totalCount = prResp?.totalCount ?? 0;

    const showInitialBlocking =
        !hasHydrated || !selectedRepo || !session || loadingRepos;
    const hasNoLinkedRepos =
        !loadingRepos &&
        Array.isArray(userReposData) &&
        userReposData.length === 0;

    const showSkeleton =
        (enabled && isLoading && prList.length === 0) || showInitialBlocking;

    const showEmpty =
        (enabled && !isLoading && totalCount === 0) || hasNoLinkedRepos;

    // 다음 페이지 프리패치 (스크롤/페이지 이동 전에 데이터 준비)
    useEffect(() => {
        if (!enabled) return;
        const hasNext = currentPage * PER_PAGE < totalCount;
        if (!hasNext) return;
        const nextPage = currentPage + 1;

        queryClient.prefetchQuery({
            queryKey: [
                "pullRequests",
                {
                    repo: repoFullName,
                    author: session?.user?.githubId,
                    page: nextPage,
                    perPage: PER_PAGE,
                },
            ],
            queryFn: async () => {
                const res = await fetch("/api/github/pull-requests", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        token: session?.accessToken,
                        author: session?.user?.githubId,
                        repoFullName,
                        page: nextPage,
                        perPage: PER_PAGE,
                    }),
                });
                if (!res.ok)
                    return { list: [], totalCount: 0 } as PrListResponse;
                return (await res.json()) as PrListResponse;
            },
            staleTime: STALE_10M,
            gcTime: 1000 * 60 * 30,
        });
    }, [
        enabled,
        currentPage,
        totalCount,
        queryClient,
        repoFullName,
        session,
        STALE_10M,
    ]);

    const handlePageChange = (newPage: number) => {
        window.scrollTo({ top: 0 });
        setCurrentPage(newPage);
    };

    const prCardList = prList.map((pr) => (
        <PrCard
            title={pr.title}
            repositoryName={pr.repositoryName}
            branchName={pr.branchName}
            prNumber={pr.prNumber}
            createdAt={pr.createdAt}
            state={pr.state}
            key={pr.prNumber}
        />
    ));

    return (
        <>
            <RepoSelectModal open={open} onClose={() => setOpen(false)} />
            <div className="border-border-primary1 bg-bg-member1 rounded-md border-1">
                <section className="border-border-primary1 flex items-center justify-between border-b p-4">
                    <div className="flex items-center gap-x-3">
                        <h2 className="font-bold">Pull Requests</h2>
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
                        Array.from({ length: 5 }).map((_, i) => (
                            <PrCardSkeleton key={i} />
                        ))
                    ) : !showEmpty ? (
                        prCardList.length > 0 ? (
                            <>{prCardList}</>
                        ) : null
                    ) : (
                        <EmptyResult message="연동된 저장소가 없거나 저장소에 표시할 Pull Request 가 없습니다." />
                    )}
                </ul>

                {!showSkeleton && prList.length > 0 && (
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

// "use client";

// import Pagination from "@/app/components/Pagination";
// import EmptyResult from "@/app/member/components/EmptyResult";
// import RepoSelectModal from "@/app/member/components/RepoSelectModal";
// import PrCard from "@/app/member/pull-requests/components/PrCard";
// import PrCardSkeleton from "@/app/member/pull-requests/components/PrCardSkeleton";
// import { useRepoStore } from "@/store/useRepoStore";
// import { useSession } from "next-auth/react";
// import { useEffect, useRef, useState } from "react";

// interface PrCardProps {
//     title: string;
//     content: string;
//     repositoryName: string;
//     branchName: string;
//     prNumber: number;
//     createdAt: string;
//     state: "open" | "closed";
// }

// export default function PullRequestPage() {
//     const now = new Date();
//     const formattedDate = new Intl.DateTimeFormat("ko-KR", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//     }).format(now);

//     const [currentPage, setCurrentPage] = useState(1);
//     const [open, setOpen] = useState(false);
//     const checkedOnceRef = useRef(false);
//     const [prList, setPrList] = useState<PrCardProps[]>([]);
//     const [totalCount, setTotalCount] = useState(0);
//     const [isLoading, setIsLoading] = useState(true);
//     const perPage = 10;

//     const { selectedRepo, hasHydrated } = useRepoStore();
//     const { data: session } = useSession();

//     const cacheRef = useRef<
//         Map<
//             string,
//             { list: PrCardProps[]; totalCount: number; timestamp: number }
//         >
//     >(new Map());

//     const CACHE_TTL = 1000 * 60 * 10; // 10분

//     const fetchPrList = async (
//         repoFullName: string | undefined,
//         currentPage: number
//     ): Promise<void> => {
//         if (!selectedRepo || !session) return;

//         const key = `${repoFullName}/page:${currentPage}`;
//         const now = Date.now();

//         const cached = cacheRef.current.get(key);
//         if (cached && now - cached.timestamp < CACHE_TTL) {
//             setPrList(cached.list);
//             setTotalCount(cached.totalCount);
//             setIsLoading(false);
//             return;
//         }

//         setIsLoading(true);
//         const author = session.user.githubId;
//         const token = session.accessToken;

//         try {
//             const res = await fetch("/api/github/pull-requests", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     token,
//                     author,
//                     repoFullName,
//                     page: currentPage,
//                 }),
//             });

//             if (res.ok) {
//                 const result = await res.json();
//                 setPrList(result.list);
//                 setTotalCount(result.totalCount);

//                 cacheRef.current.set(key, {
//                     list: result.list,
//                     totalCount: result.totalCount,
//                     timestamp: now,
//                 });
//             }
//         } catch (error: unknown) {
//             console.error("Failed to fetch pull request list: ", error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (!hasHydrated || !selectedRepo || !session) return;

//         setCurrentPage(1);
//         fetchPrList(selectedRepo.nameWithOwner, 1);
//     }, [selectedRepo, session, hasHydrated]);

//     useEffect(() => {
//         if (selectedRepo) {
//             fetchPrList(selectedRepo.nameWithOwner, currentPage);
//         }
//     }, [currentPage]);

//     const handlePageChange = (newPage: number) => {
//         window.scrollTo({
//             top: 0,
//         });
//         setCurrentPage(newPage);
//     };

//     useEffect(() => {
//         if (checkedOnceRef.current) return;

//         const fetchUserRepos = async () => {
//             try {
//                 const res = await fetch("/api/repos/user");
//                 const repos = await res.json();
//                 if (Array.isArray(repos) && repos.length === 0) {
//                     setOpen(true);
//                     setIsLoading(false);
//                 }
//             } catch (err) {
//                 console.error("유저 저장소 확인 실패", err);
//                 setIsLoading(false);
//             }
//         };

//         fetchUserRepos();
//     }, []);

//     const prCardList = prList.map((pr) => (
//         <PrCard
//             title={pr.title}
//             repositoryName={pr.repositoryName}
//             branchName={pr.branchName}
//             prNumber={pr.prNumber}
//             createdAt={pr.createdAt}
//             state={pr.state}
//             key={pr.prNumber}
//         />
//     ));

//     return (
//         <>
//             <RepoSelectModal open={open} onClose={() => setOpen(false)} />
//             <div className="border-border-primary1 bg-bg-member1 rounded-md border-1">
//                 <section className="border-border-primary1 flex items-center justify-between border-b p-4">
//                     <div className="flex items-center gap-x-3">
//                         <h2 className="font-bold">Pull Requests</h2>
//                         {totalCount > 0 && (
//                             <span className="text-text-secondary2 text-sm">
//                                 {isLoading
//                                     ? "불러오는 중..."
//                                     : `전체 ${totalCount}개`}
//                             </span>
//                         )}
//                     </div>
//                     <p className="text-text-secondary2 text-sm">
//                         {formattedDate}
//                     </p>
//                 </section>

//                 <ul>
//                     {isLoading ? (
//                         Array.from({ length: 5 }).map((_, i) => (
//                             <PrCardSkeleton key={i} />
//                         ))
//                     ) : prList.length > 0 ? (
//                         <>{prCardList}</>
//                     ) : (
//                         <EmptyResult message="연동된 저장소가 없거나 저장소에 표시할 Pull Request 가 없습니다." />
//                     )}
//                 </ul>

//                 {!isLoading && prList.length > 0 && (
//                     <Pagination
//                         currentPage={currentPage}
//                         totalCount={totalCount}
//                         perPage={perPage}
//                         setCurrentPage={handlePageChange}
//                     />
//                 )}
//             </div>
//         </>
//     );
// }
