"use client";

import MemoirCard from "@/app/member/memoirs/components/MemoirCard";
import { MemoirListDto } from "@/application/usecase/memoir/dto/MemoirListDto";
import { useRepoStore } from "@/store/repoStore";
import { useEffect, useRef, useState } from "react";
import EmptyResult from "../components/EmptyResult";
import MemoirSkeleton from "./components/MemoirSkeleton";
import Pagination from "@/app/components/Pagination";
import { useFilterStore } from "@/store/useFilterStore";

export default function MemoirPage() {
    const now = new Date();
    const { selectedRepo } = useRepoStore();
    const [memoirs, setMemoirs] = useState<MemoirListDto[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const perPage = 10;
    const handlePageChange = (newPage: number) => setCurrentPage(newPage);
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
                    console.log("요청 취소됨");
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
        <div className="border-border-primary1 rounded-lg border-1 bg-white">
            <section className="border-border-primary1 flex items-center justify-between border-b p-4">
                <div className="flex items-center gap-x-3">
                    <h2 className="font-bold">내 회고록</h2>
                    {(totalCount ?? 0) > 0 && (
                        <span className="text-text-secondary2 text-sm">
                            전체 {totalCount}개
                        </span>
                    )}
                </div>
                <p className="text-text-secondary2 text-sm">{formattedDate}</p>
            </section>

            <ul>
                {loading || memoirs === null ? (
                    Array.from({ length: 5 }).map((_, i) => (
                        <MemoirSkeleton key={i} />
                    ))
                ) : memoirs.length === 0 ? (
                    <EmptyResult message="선택한 저장소에 회고록이 없습니다." />
                ) : (
                    memoirs.map((memoir) => (
                        <MemoirCard key={memoir.id} memoir={memoir} />
                    ))
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
    );
}
