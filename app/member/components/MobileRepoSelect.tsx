"use client";

import Button from "@/app/components/Button";
import { useRepoStore } from "@/store/useRepoStore";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

interface MobileRepoSelectProps {
    repoSelectOpen: boolean;
    setRepoSelectOpen: (repoSelectOpen: boolean) => void;
    setOpen: (open: boolean) => void;
}

export default function MobileRepoSelect({
    repoSelectOpen,
    setRepoSelectOpen,
    setOpen,
}: MobileRepoSelectProps) {
    const { selectedRepo, setSelectedRepo, reloadRepoList, resetReload } =
        useRepoStore();

    const [userRepos, setUserRepos] = useState<
        { dbId: number; id: string; nameWithOwner: string }[]
    >([]);
    const [loadingRepos, setLoadingRepos] = useState(true);

    const fetchRepos = async () => {
        setLoadingRepos(true);
        try {
            const [userRes, githubRes] = await Promise.all([
                fetch("/api/repos/user"),
                fetch("/api/github/repos"),
            ]);

            const userRepoIds: { id: number; name: string }[] =
                await userRes.json();
            const githubRepos = await githubRes.json();

            const matched = githubRepos
                .map((repo: any) => {
                    const match = userRepoIds.find((r) => r.name === repo.id);
                    if (!match) return null;
                    return {
                        dbId: Number(match.id),
                        id: repo.id,
                        nameWithOwner: repo.nameWithOwner,
                    };
                })
                .filter(
                    (
                        r
                    ): r is {
                        dbId: number;
                        id: string;
                        nameWithOwner: string;
                    } => r !== null
                )
                .sort((a, b) => a.dbId - b.dbId);

            setUserRepos(matched);

            const stillExists = matched.some(
                (r) => r.nameWithOwner === selectedRepo?.nameWithOwner
            );
            if (!stillExists && matched.length > 0) {
                setSelectedRepo(matched[0]);
            } else if (matched.length === 0) {
                setSelectedRepo(null);
            }
        } catch (error) {
            console.error("레포 불러오기 실패:", error);
        } finally {
            setLoadingRepos(false);
        }
    };

    useEffect(() => {
        fetchRepos();
    }, []);

    useEffect(() => {
        if (reloadRepoList) {
            fetchRepos().finally(() => resetReload());
        }
    }, [reloadRepoList]);

    return (
        <div className="relative w-full max-w-50 min-w-25 md:hidden">
            <button
                className="border-border-primary1 bg-bg-member1 mb-2 flex w-full cursor-pointer items-center gap-x-6 rounded-md border px-3 py-2.5 text-sm md:mb-6"
                onClick={() => setRepoSelectOpen(!repoSelectOpen)}
            >
                <span className="truncate">
                    {selectedRepo?.nameWithOwner ?? "저장소"}
                </span>
                <img
                    className="ml-auto h-4 w-4"
                    src="/down-arrow.svg"
                    alt="Down arrow"
                />
            </button>

            {repoSelectOpen && (
                <div className="border-border-primary1 bg-bg-member1 absolute top-11 left-0 z-10 w-full overflow-auto rounded-md border shadow-lg">
                    <ul>
                        {loadingRepos ? (
                            <li className="text-text-secondary2 p-3 text-center text-sm">
                                불러오는 중...
                            </li>
                        ) : userRepos.length === 0 ? (
                            <li className="text-text-secondary2 p-3 text-center text-sm">
                                연동한 저장소가 없습니다.
                            </li>
                        ) : (
                            userRepos.map((repo) => {
                                const isSelected =
                                    selectedRepo?.nameWithOwner ===
                                    repo.nameWithOwner;
                                return (
                                    <li
                                        key={repo.id}
                                        className={`hover:${isSelected ? "" : "bg-bg-primary1"} cursor-pointer truncate p-3 text-sm ${
                                            selectedRepo?.nameWithOwner ===
                                            repo.nameWithOwner
                                                ? "bg-primary2 text-primary7 font-semibold"
                                                : ""
                                        }`}
                                        onClick={() => {
                                            setSelectedRepo(repo);
                                            setRepoSelectOpen(false);
                                        }}
                                    >
                                        {repo.nameWithOwner}
                                    </li>
                                );
                            })
                        )}
                    </ul>
                    <section className="border-border-primary1 border-t p-2">
                        <Button
                            type="lined"
                            size="full"
                            onClick={() => {
                                setOpen(true);
                                setRepoSelectOpen(false);
                            }}
                        >
                            <Plus size={18} />
                            저장소 추가
                        </Button>
                    </section>
                </div>
            )}
        </div>
    );
}
