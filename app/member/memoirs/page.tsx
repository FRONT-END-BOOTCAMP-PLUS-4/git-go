"use client";

import MemoirCard from "@/app/member/memoirs/components/MemoirCard";
import { MemoirListDto } from "@/application/usecase/memoir/dto/MemoirListDto";
import { useRepoStore } from "@/store/repoStore";
import { useEffect, useState } from "react";
import EmptyResult from "../components/EmptyResult";
import MemoirSkeleton from "./components/MemoirSkeleton";
import Pagination from "@/app/components/Pagination";

export default function MemoirPage() {
    const now = new Date();
    const { selectedRepo } = useRepoStore();
    const [memoirs, setMemoirs] = useState<MemoirListDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const perPage = 10;
    const handlePageChange = (newPage: number) => setCurrentPage(newPage);

    const formattedDate = new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(now);

    useEffect(() => {
        if (!selectedRepo) return;

        const fetchMemoirs = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/memoirs?repo=${selectedRepo.id}&page=${currentPage}&perPage=${perPage}`);
                const { list, totalCount } = await res.json();
                const updatedData = list.map((memoir: any) => ({
                    ...memoir,
                    repoName: selectedRepo.nameWithOwner,
                }));
                setMemoirs(updatedData);
                setTotalCount(totalCount);
            } catch (e) {
                console.error("회고 목록 로딩 실패", e);
                setMemoirs([]);
            } finally {
                setLoading(false);
            }
        };

        fetchMemoirs();
    }, [selectedRepo, currentPage]);

    return (
        <div className="border-border-primary1 rounded-lg border-1 bg-white">
            <section className="border-border-primary1 flex items-center justify-between border-b p-4">
                <div className="flex items-center gap-x-3">
                    <h2 className="font-bold">My Memoirs</h2>
                    {(totalCount ?? 0) > 0 && (
                        <span className="text-text-secondary2 text-sm">
                            전체 {totalCount}개
                        </span>
                    )}
                </div>
                <p className="text-text-secondary2 text-sm">{formattedDate}</p>
            </section>

            <ul>
                {loading ? (
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
            {!loading && memoirs.length > 0 && (
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
