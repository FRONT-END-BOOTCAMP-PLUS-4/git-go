"use client";

import CommitCard from "@/app/member/commits/components/CommitCard";
import { useEffect, useRef, useState } from "react";
import RepoSelectModal from "../components/RepoSelectModal";
import { useRepoStore } from "@/store/repoStore";
import { useSession } from "next-auth/react";
import Loading from "../components/Loading";

export default function CommitPage() {
    const now = new Date();
    const formattedDate = new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(now);

    const { selectedRepo } = useRepoStore();
    console.log(selectedRepo);
    const ownerName = selectedRepo?.nameWithOwner.split("/")[0];
    const repoName = selectedRepo?.nameWithOwner.split("/")[1];

    const [open, setOpen] = useState(false);
    const checkedOnceRef = useRef(false);
    const [commitList, setCommitList] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const perPage = 10;

    const { data: session } = useSession();

    useEffect(() => {
        if (checkedOnceRef.current) return;
        const fetchUserRepos = async () => {
            try {
                const res = await fetch("/api/repos/user");
                const repos = await res.json();
                if (Array.isArray(repos) && repos.length === 0) {
                    setOpen(true);
                }
            } catch (err) {
                console.error("유저 저장소 확인 실패", err);
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
        setIsLoading(true);

        const accessToken = session.accessToken;
        const author = session.user?.id;

        try {
            const res = await fetch("/api/github/commits", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    owner: ownerName,
                    repo: repoName,
                    author: author,
                    token: accessToken,
                    page,
                    perPage,
                }),
            });

            if (res.ok) {
                const result = await res.json();
                setCommitList((prev) =>
                    page === 1 ? result.commits : [...prev, ...result.commits]
                );
                setHasNextPage(result.hasNextPage);
            }
        } catch (error: unknown) {
            console.error("Failed to fetch commits:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setCurrentPage(1);
        setCommitList([]);
        fetchCommitsByRepo(ownerName, repoName, 1);
    }, [selectedRepo]);

    const loadMore = () => {
        if (!isLoading && hasNextPage) {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            fetchCommitsByRepo(ownerName, repoName, nextPage);
        }
    };

    return (
        <>
            <RepoSelectModal open={open} onClose={() => setOpen(false)} />
            <div className="border-border-primary1 rounded-lg border-1 bg-white">
                <section className="border-border-primary1 flex items-center justify-between border-b p-4">
                    <h2 className="font-bold">최근 활동</h2>
                    <p className="text-text-secondary2 text-sm">
                        {formattedDate}
                    </p>
                </section>

                <ul className="divide-y">
                    {commitList?.map((commit) => (
                        <CommitCard
                            key={commit.sha}
                            sha={commit.sha}
                            commitType={commit.type}
                            message={commit.message}
                            repo={commit.repo}
                            branch={commit.branch}
                            createdAt={commit.createdAt}
                        />
                    ))}
                </ul>

                {isLoading && <Loading />}

                {!isLoading && hasNextPage && (
                    <div className="flex justify-center p-4">
                        <button
                            onClick={loadMore}
                            className="text-text-secondary1 hover:text-text-primary1 text-sm font-medium"
                        >
                            더 보기
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
