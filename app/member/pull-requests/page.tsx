"use client";
import Loading from "@/app/member/components/Loading";
import PrCard from "@/app/member/pull-requests/components/PrCard";
import { useRepoStore } from "@/store/repoStore";
import { useSession } from "next-auth/react";
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
    const [isLoading, setIsLoading] = useState(false);

    const { selectedRepo } = useRepoStore();
    console.log(selectedRepo);
    const { data: session } = useSession();
    console.log(session);

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
                console.log(result);
                setPrList(result);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Failed to fetch pull request list: ", error);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPrList(selectedRepo?.nameWithOwner, currentPage);
    }, [selectedRepo]);

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
                <h2 className="font-bold">Pull Requests</h2>
                <p className="text-text-secondary2 text-sm">{formattedDate}</p>
            </section>

            <ul className="min-h-[100px]">
                {isLoading ? <Loading /> : <>{prCardList}</>}
            </ul>
        </div>
    );
}
