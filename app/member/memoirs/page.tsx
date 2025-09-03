"use client";

import Pagination from "@/app/components/Pagination";
import MemoirCard from "@/app/member/memoirs/components/MemoirCard";
import { MemoirListDto } from "@/application/usecase/memoir/dto/MemoirListDto";
import { useFilterStore } from "@/store/useFilterStore";
import { useRepoStore } from "@/store/useRepoStore";
import { useEffect, useMemo, useState } from "react";
import EmptyResult from "../components/EmptyResult";
import MemoirSkeleton from "./components/MemoirSkeleton";
import RepoSelectModal from "@/app/member/components/RepoSelectModal";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type MemoirListResponse = { list: MemoirListDto[]; totalCount: number };
type Repo = { id: number; name: string; nameWithOwner: string };

export default function MemoirPage() {
    const now = new Date();
    const formattedDate = new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(now);

    const { selectedRepo, hasHydrated } = useRepoStore() as {
        selectedRepo: { id: number; nameWithOwner: string } | null;
        hasHydrated: boolean;
    };

    const { timePeriod, filterType, tags, searchKeyword } = useFilterStore();

    // UI state
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 10;

    const queryClient = useQueryClient();
    const STALE_10M = 1000 * 60 * 5;
    const GC_30M = 1000 * 60 * 30;

    // 저장소 목록(연동 여부 확인 및 모달 제어)
    const {
        data: userReposData,
        isLoading: loadingRepos,
        isFetching: fetchingRepos,
    } = useQuery({
        queryKey: ["userRepos"],
        queryFn: async () => {
            const res = await fetch("/api/repos/user");
            if (!res.ok) throw new Error("유저 저장소 확인 실패");
            return (await res.json()) as Repo[];
        },
        staleTime: STALE_10M,
        gcTime: GC_30M,
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

    // 필터/검색/저장소 변경 시 1페이지로 리셋
    useEffect(() => {
        if (!hasHydrated) return;
        setCurrentPage(1);
    }, [
        selectedRepo,
        timePeriod,
        filterType,
        tags,
        searchKeyword,
        hasHydrated,
    ]);

    // 쿼리 활성화 조건
    const enabled = !!selectedRepo && hasHydrated;

    // 안정적인 queryKey 생성을 위해 정렬된 태그/정제된 키워드
    const sortedTags = useMemo(() => [...tags].sort(), [tags]);
    const keyword = useMemo(
        () => (searchKeyword ? searchKeyword.trim() : ""),
        [searchKeyword]
    );

    // 회고록 데이터 쿼리
    const {
        data: memoirResp,
        isLoading: loadingMemoirs,
        isFetching: fetchingMemoirs,
    } = useQuery<MemoirListResponse>({
        queryKey: [
            "memoirs",
            {
                repoId: selectedRepo?.id,
                page: currentPage,
                perPage,
                period: timePeriod,
                type: filterType,
                tags: sortedTags,
                keyword,
            },
        ],
        enabled,
        queryFn: async () => {
            const params = new URLSearchParams();
            params.set("repo", String(selectedRepo!.id));
            params.set("page", String(currentPage));
            params.set("perPage", String(perPage));
            params.set("period", String(timePeriod));
            params.set("type", String(filterType));
            sortedTags.forEach((t) => params.append("tags", t));
            if (keyword) params.set("keyword", keyword);

            const res = await fetch(`/api/memoirs?${params.toString()}`);
            if (!res.ok)
                return { list: [], totalCount: 0 } as MemoirListResponse;

            const { list, totalCount } =
                (await res.json()) as MemoirListResponse;

            // 카드에 repoName 표시를 원하던 기존 로직 유지
            const updated = list.map((m) => ({
                ...m,
                repoName: selectedRepo?.nameWithOwner,
            })) as MemoirListDto[];

            return { list: updated, totalCount };
        },
        staleTime: STALE_10M,
        gcTime: GC_30M,
    });

    const memoirs = memoirResp?.list ?? [];
    const totalCount = memoirResp?.totalCount ?? 0;

    const showInitialBlocking =
        !hasHydrated || !selectedRepo || loadingRepos || fetchingRepos;
    const hasNoLinkedRepos =
        !loadingRepos &&
        Array.isArray(userReposData) &&
        userReposData.length === 0;

    const showSkeleton =
        showInitialBlocking ||
        (enabled && loadingMemoirs && memoirs.length === 0);

    const showEmpty =
        !showSkeleton &&
        enabled &&
        !loadingMemoirs &&
        !fetchingMemoirs &&
        totalCount === 0;

    // 다음 페이지 프리페치
    useEffect(() => {
        if (!enabled) return;
        const hasNext = currentPage * perPage < totalCount;
        if (!hasNext) return;
        const nextPage = currentPage + 1;

        queryClient.prefetchQuery({
            queryKey: [
                "memoirs",
                {
                    repoId: selectedRepo?.id,
                    page: nextPage,
                    perPage,
                    period: timePeriod,
                    type: filterType,
                    tags: sortedTags,
                    keyword,
                },
            ],
            queryFn: async () => {
                const params = new URLSearchParams();
                params.set("repo", String(selectedRepo!.id));
                params.set("page", String(nextPage));
                params.set("perPage", String(perPage));
                params.set("period", String(timePeriod));
                params.set("type", String(filterType));
                sortedTags.forEach((t) => params.append("tags", t));
                if (keyword) params.set("keyword", keyword);

                const res = await fetch(`/api/memoirs?${params.toString()}`);
                if (!res.ok)
                    return { list: [], totalCount: 0 } as MemoirListResponse;

                const { list, totalCount } =
                    (await res.json()) as MemoirListResponse;
                const updated = list.map((m) => ({
                    ...m,
                    repoName: selectedRepo?.nameWithOwner,
                })) as MemoirListDto[];

                return { list: updated, totalCount };
            },
            staleTime: STALE_10M,
            gcTime: GC_30M,
        });
    }, [
        enabled,
        currentPage,
        perPage,
        totalCount,
        selectedRepo,
        timePeriod,
        filterType,
        sortedTags,
        keyword,
        queryClient,
        STALE_10M,
    ]);

    const handlePageChange = (newPage: number) => {
        window.scrollTo({ top: 0 });
        setCurrentPage(newPage);
    };

    return (
        <>
            <RepoSelectModal open={open} onClose={() => setOpen(false)} />
            <div className="border-border-primary1 bg-bg-member1 rounded-md border-1">
                <section className="border-border-primary1 flex items-center justify-between border-b p-4">
                    <div className="flex items-center gap-x-3">
                        <h2 className="font-bold">내 회고록</h2>
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
                            <MemoirSkeleton key={i} />
                        ))
                    ) : showEmpty || hasNoLinkedRepos ? (
                        <EmptyResult message="연동된 저장소가 없거나 저장소에 회고록이 없습니다." />
                    ) : (
                        memoirs.map((memoir) => (
                            <MemoirCard key={memoir.id} memoir={memoir} />
                        ))
                    )}
                </ul>

                {!showSkeleton && memoirs.length > 0 && (
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

// "use client";

// import Pagination from "@/app/components/Pagination";
// import MemoirCard from "@/app/member/memoirs/components/MemoirCard";
// import { MemoirListDto } from "@/application/usecase/memoir/dto/MemoirListDto";
// import { useFilterStore } from "@/store/useFilterStore";
// import { useRepoStore } from "@/store/useRepoStore";
// import { useEffect, useRef, useState } from "react";
// import EmptyResult from "../components/EmptyResult";
// import MemoirSkeleton from "./components/MemoirSkeleton";
// import RepoSelectModal from "@/app/member/components/RepoSelectModal";

// export default function MemoirPage() {
//     const now = new Date();
//     const { selectedRepo } = useRepoStore();
//     const [loading, setLoading] = useState(true);
//     const [memoirs, setMemoirs] = useState<MemoirListDto[] | null>(null);
//     const [open, setOpen] = useState(false);
//     const checkedOnceRef = useRef(false);

//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalCount, setTotalCount] = useState(0);
//     const [noRepo, setNoRepo] = useState(false);
//     const perPage = 10;
//     const handlePageChange = (newPage: number) => {
//         window.scrollTo({
//             top: 0,
//         });
//         setCurrentPage(newPage);
//     };
//     const { timePeriod, filterType, tags, searchKeyword } = useFilterStore();
//     const cacheRef = useRef<
//         Map<
//             string,
//             {
//                 list: MemoirListDto[];
//                 totalCount: number;
//                 timestamp: number;
//             }
//         >
//     >(new Map());

//     const formattedDate = new Intl.DateTimeFormat("ko-KR", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//     }).format(now);

//     useEffect(() => {
//         setCurrentPage(1);
//     }, [selectedRepo, timePeriod, filterType, tags, searchKeyword]);

//     useEffect(() => {
//         if (checkedOnceRef.current) return;

//         const fetchUserRepos = async () => {
//             try {
//                 const res = await fetch("/api/repos/user");
//                 const repos = await res.json();
//                 if (Array.isArray(repos) && repos.length === 0) {
//                     setOpen(true);
//                     setNoRepo(true);
//                     setLoading(false);
//                 }
//             } catch (err) {
//                 console.error("유저 저장소 확인 실패", err);
//                 setLoading(false);
//             }
//         };
//         fetchUserRepos();
//     }, []);

//     useEffect(() => {
//         if (!selectedRepo) return;

//         const controller = new AbortController();
//         const signal = controller.signal;

//         const cacheKey = JSON.stringify({
//             repoId: selectedRepo.id,
//             page: currentPage,
//             period: timePeriod,
//             type: filterType,
//             tags: [...tags].sort(),
//             keyword: searchKeyword?.trim(),
//         });

//         const cached = cacheRef.current.get(cacheKey);
//         const now = Date.now();
//         const CACHE_TTL = 10 * 60 * 1000;

//         if (cached && now - cached.timestamp < CACHE_TTL) {
//             setMemoirs(cached.list);
//             setTotalCount(cached.totalCount);
//             setLoading(false);
//             return;
//         }

//         const queryParams = [
//             `repo=${selectedRepo.id}`,
//             `page=${currentPage}`,
//             `perPage=${perPage}`,
//             `period=${timePeriod}`,
//             `type=${filterType}`,
//             ...(tags.length > 0
//                 ? tags.map((t) => `tags=${encodeURIComponent(t)}`)
//                 : []),
//             ...(searchKeyword
//                 ? [`keyword=${encodeURIComponent(searchKeyword)}`]
//                 : []),
//         ].join("&");

//         const fetchMemoirs = async () => {
//             setLoading(true);
//             try {
//                 const res = await fetch(`/api/memoirs?${queryParams}`, {
//                     signal,
//                 });
//                 const { list, totalCount } = await res.json();
//                 const updatedData = list.map((memoir: any) => ({
//                     ...memoir,
//                     repoName: selectedRepo.nameWithOwner,
//                 }));
//                 setMemoirs(updatedData);
//                 setTotalCount(totalCount);
//                 cacheRef.current.set(cacheKey, {
//                     list: updatedData,
//                     totalCount,
//                     timestamp: now,
//                 });
//             } catch (e) {
//                 if (e instanceof DOMException && e.name === "AbortError") {
//                 } else {
//                     console.error("회고 목록 로딩 실패", e);
//                     setMemoirs([]);
//                 }
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchMemoirs();

//         return () => {
//             controller.abort();
//         };
//     }, [
//         selectedRepo,
//         currentPage,
//         timePeriod,
//         filterType,
//         tags,
//         searchKeyword,
//     ]);

//     return (
//         <>
//             <RepoSelectModal open={open} onClose={() => setOpen(false)} />
//             <div className="border-border-primary1 bg-bg-member1 rounded-md border-1">
//                 <section className="border-border-primary1 flex items-center justify-between border-b p-4">
//                     <div className="flex items-center gap-x-3">
//                         <h2 className="font-bold">내 회고록</h2>
//                         {(totalCount ?? 0) > 0 && (
//                             <span className="text-text-secondary2 text-sm">
//                                 전체 {totalCount}개
//                             </span>
//                         )}
//                     </div>
//                     <p className="text-text-secondary2 text-sm">
//                         {formattedDate}
//                     </p>
//                 </section>

//                 <ul>
//                     {noRepo ? (
//                         <EmptyResult message="연동된 저장소가 없습니다." />
//                     ) : loading || memoirs === null ? (
//                         Array.from({ length: 5 }).map((_, i) => (
//                             <MemoirSkeleton key={i} />
//                         ))
//                     ) : memoirs.length === 0 ? (
//                         <EmptyResult message="연동된 저장소가 없거나 저장소에 회고록이 없습니다." />
//                     ) : (
//                         memoirs.map((memoir) => (
//                             <MemoirCard key={memoir.id} memoir={memoir} />
//                         ))
//                     )}
//                 </ul>
//                 {!loading && memoirs && memoirs.length > 0 && (
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
