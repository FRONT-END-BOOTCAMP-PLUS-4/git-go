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

interface Repo {
    id: number;
    name: string;
    nameWithOwner: string;
}

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
    const STALE_10M = 1000 * 60 * 10;
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

// "use client";

// import Pagination from "@/app/components/Pagination";
// import CommitCard from "@/app/member/commits/components/CommitCard";
// import { CommitCardSkeleton } from "@/app/member/commits/components/CommitCardSkeleton";
// import EmptyResult from "@/app/member/components/EmptyResult";
// import { useRepoStore } from "@/store/useRepoStore";
// import { useSession } from "next-auth/react";
// import { useEffect, useRef, useState } from "react";
// import RepoSelectModal from "../components/RepoSelectModal";

// interface Commit {
//     sha: string;
//     type:
//         | "feat"
//         | "fix"
//         | "chore"
//         | "merge"
//         | "refactor"
//         | "test"
//         | "docs"
//         | "style"
//         | "etc";
//     message: string;
//     repo: string;
//     branch: string;
//     createdAt: string;
// }

// export default function CommitPage() {
//     const now = new Date();
//     const formattedDate = new Intl.DateTimeFormat("ko-KR", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//     }).format(now);

//     const { selectedRepo, hasHydrated } = useRepoStore();
//     const ownerName = selectedRepo?.nameWithOwner.split("/")[0];
//     const repoName = selectedRepo?.nameWithOwner.split("/")[1];

//     const [open, setOpen] = useState(false);
//     const checkedOnceRef = useRef(false);
//     const [commits, setCommits] = useState<Commit[]>([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [isLoading, setIsLoading] = useState(true);
//     const [totalCount, setTotalCount] = useState(0);
//     const perPage = 10;

//     const { data: session } = useSession();

//     // 캐시 저장용 Map (key: "owner/repo/page")
//     const cacheRef = useRef<
//         Map<
//             string,
//             {
//                 commits: Commit[];
//                 totalCount: number;
//                 timestamp: number;
//             }
//         >
//     >(new Map());

//     // 캐시 만료 시간 (5분)
//     const CACHE_TTL = 1000 * 60 * 10;

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

//     const fetchCommitsByRepo = async (
//         ownerName: string | undefined,
//         repoName: string | undefined,
//         page: number
//     ): Promise<void> => {
//         if (!session || !ownerName || !repoName) return;

//         const key = `${ownerName}/${repoName}/page:${page}`;
//         const now = Date.now();

//         // 캐시 확인
//         const cached = cacheRef.current.get(key);
//         if (cached && now - cached.timestamp < CACHE_TTL) {
//             setCommits(cached.commits);
//             setTotalCount(cached.totalCount);
//             setIsLoading(false);
//             return;
//         }

//         setIsLoading(true);

//         try {
//             const res = await fetch("/api/github/commits", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     owner: ownerName,
//                     repo: repoName,
//                     author: session.user?.githubId,
//                     token: session.accessToken,
//                     page,
//                     perPage,
//                     userId: session.user?.id,
//                 }),
//             });

//             if (res.ok) {
//                 const result = await res.json();
//                 setCommits(result.commits);
//                 setTotalCount(result.totalCount);

//                 // 캐시에 저장
//                 cacheRef.current.set(key, {
//                     commits: result.commits,
//                     totalCount: result.totalCount,
//                     timestamp: now,
//                 });
//             } else {
//                 setCommits([]);
//                 setTotalCount(0);
//             }
//         } catch (error) {
//             console.error("Failed to fetch commits:", error);
//             setCommits([]);
//             setTotalCount(0);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // 저장소 변경 시 페이지 1부터 fetch
//     useEffect(() => {
//         if (!hasHydrated || !selectedRepo || !session) return;

//         setCurrentPage(1);
//         fetchCommitsByRepo(ownerName, repoName, 1);
//     }, [selectedRepo, hasHydrated, session]);

//     // 페이지 변경 시 fetch
//     useEffect(() => {
//         if (selectedRepo) {
//             fetchCommitsByRepo(ownerName, repoName, currentPage);
//         }
//     }, [currentPage]);

//     const handlePageChange = (newPage: number) => {
//         window.scrollTo({
//             top: 0,
//         });
//         setCurrentPage(newPage);
//     };

//     // const commitList = commits?.map((commit) => (
//     //     <CommitCard
//     //         key={commit.sha}
//     //         sha={commit.sha}
//     //         commitType={commit.type}
//     //         message={commit.message}
//     //         repo={commit.repo}
//     //         branch={commit.branch}
//     //         createdAt={commit.createdAt}
//     //     />
//     // ));
//     const commitList = commits?.map((commit) => (
//         <li key={commit.sha} className="border-border-primary1 border-b p-4">
//             <CommitCard
//                 sha={commit.sha}
//                 commitType={commit.type}
//                 message={commit.message}
//                 repo={commit.repo}
//                 branch={commit.branch}
//                 createdAt={commit.createdAt}
//             />
//         </li>
//     ));

//     return (
//         <>
//             <RepoSelectModal open={open} onClose={() => setOpen(false)} />
//             <div className="border-border-primary1 bg-bg-member1 rounded-md border-1">
//                 <section className="border-border-primary1 flex items-center justify-between border-b p-4">
//                     <div className="flex items-center gap-x-3">
//                         <h2 className="font-bold">최근 활동</h2>
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
//                         Array.from({ length: 5 }).map((_, index) => (
//                             <CommitCardSkeleton key={index} />
//                         ))
//                     ) : totalCount !== 0 ? (
//                         commitList.length > 0 ? (
//                             <>{commitList}</>
//                         ) : null
//                     ) : (
//                         <EmptyResult message="연동된 저장소가 없거나 저장소에 표시할 커밋이 없습니다." />
//                     )}
//                 </ul>

//                 {!isLoading && commits.length > 0 && (
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
