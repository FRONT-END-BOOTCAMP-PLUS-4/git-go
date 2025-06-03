"use client";

import Pagination from "@/app/components/Pagination";
import MemoirCard from "@/app/member/memoirs/components/MemoirCard";
import { MemoirListDto } from "@/application/usecase/memoir/dto/MemoirListDto";
import { useFilterStore } from "@/store/useFilterStore";
import { useRepoStore } from "@/store/useRepoStore";
import { useEffect, useRef, useState } from "react";
import EmptyResult from "../components/EmptyResult";
import MemoirSkeleton from "./components/MemoirSkeleton";
import RepoSelectModal from "@/app/member/components/RepoSelectModal";

export default function MemoirPage() {
    const now = new Date();
    const { selectedRepo } = useRepoStore();
    const [loading, setLoading] = useState(true);
    const [memoirs, setMemoirs] = useState<MemoirListDto[] | null>(null);
    const [open, setOpen] = useState(false);
    const checkedOnceRef = useRef(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const perPage = 10;
    const handlePageChange = (newPage: number) => {
        window.scrollTo({
            top: 0,
        });
        setCurrentPage(newPage);
    };
    const { timePeriod, filterType, tags, searchKeyword } = useFilterStore();
    const cacheRef = useRef<
        Map<
            string,
            {
                list: MemoirListDto[];
                totalCount: number;
                timestamp: number;
            }
        >
    >(new Map());

    const formattedDate = new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(now);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedRepo, timePeriod, filterType, tags, searchKeyword]);

    useEffect(() => {
        if (checkedOnceRef.current) return;

        const fetchUserRepos = async () => {
            try {
                const res = await fetch("/api/repos/user");
                const repos = await res.json();
                if (Array.isArray(repos) && repos.length === 0) {
                    setOpen(true);
                    setLoading(false);
                }
            } catch (err) {
                console.error("유저 저장소 확인 실패", err);
                setLoading(false);
            }
        };
        fetchUserRepos();
    }, []);

    useEffect(() => {
        if (!selectedRepo) return;

        const controller = new AbortController();
        const signal = controller.signal;

        const cacheKey = JSON.stringify({
            repoId: selectedRepo.id,
            page: currentPage,
            period: timePeriod,
            type: filterType,
            tags: [...tags].sort(),
            keyword: searchKeyword?.trim(),
        });

        const cached = cacheRef.current.get(cacheKey);
        const now = Date.now();
        const CACHE_TTL = 10 * 60 * 1000;

        if (cached && now - cached.timestamp < CACHE_TTL) {
            setMemoirs(cached.list);
            setTotalCount(cached.totalCount);
            setLoading(false);
            return;
        }

        const queryParams = [
            `repo=${selectedRepo.id}`,
            `page=${currentPage}`,
            `perPage=${perPage}`,
            `period=${timePeriod}`,
            `type=${filterType}`,
            ...(tags.length > 0
                ? tags.map((t) => `tags=${encodeURIComponent(t)}`)
                : []),
            ...(searchKeyword
                ? [`keyword=${encodeURIComponent(searchKeyword)}`]
                : []),
        ].join("&");

        const fetchMemoirs = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/memoirs?${queryParams}`, {
                    signal,
                });
                const { list, totalCount } = await res.json();
                const updatedData = list.map((memoir: any) => ({
                    ...memoir,
                    repoName: selectedRepo.nameWithOwner,
                }));
                setMemoirs(updatedData);
                setTotalCount(totalCount);
                cacheRef.current.set(cacheKey, {
                    list: updatedData,
                    totalCount,
                    timestamp: now,
                });
            } catch (e) {
                if (e instanceof DOMException && e.name === "AbortError") {
                } else {
                    console.error("회고 목록 로딩 실패", e);
                    setMemoirs([]);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchMemoirs();

        return () => {
            controller.abort();
        };
    }, [
        selectedRepo,
        currentPage,
        timePeriod,
        filterType,
        tags,
        searchKeyword,
    ]);

    return (
        <>
            <RepoSelectModal open={open} onClose={() => setOpen(false)} />
            <div className="border-border-primary1 bg-bg-member1 rounded-md border-1">
                <section className="border-border-primary1 flex items-center justify-between border-b p-4">
                    <div className="flex items-center gap-x-3">
                        <h2 className="font-bold">내 회고록</h2>
                        {(totalCount ?? 0) > 0 && (
                            <span className="text-text-secondary2 text-sm">
                                전체 {totalCount}개
                            </span>
                        )}
                    </div>
                    <p className="text-text-secondary2 text-sm">
                        {formattedDate}
                    </p>
                </section>

                <ul>
                    {loading || memoirs === null ? (
                        Array.from({ length: 5 }).map((_, i) => (
                            <MemoirSkeleton key={i} />
                        ))
                    ) : memoirs?.length !== 0 ? (
                        memoirs?.map((memoir) => (
                            <MemoirCard key={memoir.id} memoir={memoir} />
                        ))
                    ) : (
                        <EmptyResult message="연동된 저장소가 없거나 저장소에 회고록이 없습니다." />
                    )}
                </ul>
                {!loading && memoirs && memoirs.length > 0 && (
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
