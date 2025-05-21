"use client";

import Pagination from "@/app/components/Pagination";
import EmptyResult from "@/app/member/components/EmptyResult";
import PrCard from "@/app/member/pull-requests/components/PrCard";
import PrCardSkeleton from "@/app/member/pull-requests/components/PrCardSkeleton";
import { useRepoStore } from "@/store/repoStore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface PrCardProps {
    title: string;
    content: string;
    repositoryName: string;
    branchName: string;
    prNumber: number;
    createdAt: string;
    state: "open" | "closed";
}

export default function PullRequestPage() {
    // 현재 날짜 를 한국어 형식으로 포맷팅
    const now = new Date();

    const formattedDate = new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(now);

    const [currentPage, setCurrentPage] = useState(1);
    const [prList, setPrList] = useState<PrCardProps[]>([]);
    const [totalCount, setTotalCount] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const perPage = 10;

    const { selectedRepo } = useRepoStore();
    const { data: session } = useSession();

    // pr 목록 조회 함수
    const fetchPrList = async (
        repoFullName: string | undefined,
        currentPage: number
    ): Promise<void> => {
        if (!selectedRepo || !session) return;
        setIsLoading(true);
        const author = session?.user.githubId;
        const token = session?.accessToken;

        try {
            const res = await fetch("/api/github/pull-requests", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token,
                    author,
                    repoFullName: repoFullName,
                    page: currentPage,
                }),
            });

            if (res.ok) {
                const result = await res.json();
                setPrList(result.list);
                setTotalCount(result.totalCount);
            }
        } catch (error: unknown) {
            console.error("Failed to fetch pull request list: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPrList(selectedRepo?.nameWithOwner, currentPage);
    }, [selectedRepo]);

    // 페이지 변경 시 새로운 데이터 fetch
    useEffect(() => {
        if (selectedRepo) {
            fetchPrList(selectedRepo.nameWithOwner, currentPage);
        }
    }, [currentPage]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const prCardList = prList?.map((pr) => (
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
        <div className="border-border-primary1 rounded-lg border-1 bg-white">
            <section className="border-border-primary1 flex items-center justify-between border-b p-4">
                <div className="flex items-center gap-x-3">
                    <h2 className="font-bold">Pull Requests</h2>
                    {(totalCount ?? 0) > 0 && (
                        <span className="text-text-secondary2 text-sm">
                            전체 {totalCount}개
                        </span>
                    )}
                </div>
                <p className="text-text-secondary2 text-sm">{formattedDate}</p>
            </section>

            <ul>
                {isLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                        <PrCardSkeleton key={i} />
                    ))
                ) : prList.length !== 0 ? (
                    <>{prCardList}</>
                ) : (
                    <EmptyResult message="선택한 저장소에 표시할 Pull Request 가 없습니다." />
                )}
            </ul>
            {!isLoading && prList.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalCount={totalCount || 0}
                    perPage={perPage}
                    setCurrentPage={handlePageChange}
                />
            )}
        </div>
    );
}
