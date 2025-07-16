"use client";

import Button from "@/app/components/Button";
import { useRepoStore } from "@/store/useRepoStore";
import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface MobileRepoSelectProps {
    repoSelectOpen: boolean;
    setRepoSelectOpen: (repoSelectOpen: boolean) => void;
    setOpen: (open: boolean) => void;
}

type RepoItem = {
    dbId: number;
    id: string;
    nameWithOwner: string;
};

export default function MobileRepoSelect({
    repoSelectOpen,
    setRepoSelectOpen,
    setOpen,
}: MobileRepoSelectProps) {
    const { selectedRepo, setSelectedRepo, reloadRepoList, resetReload } =
        useRepoStore();

    const [userRepos, setUserRepos] = useState<RepoItem[]>([]);
    const [loadingRepos, setLoadingRepos] = useState(true);

    const repoSelectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                repoSelectOpen &&
                repoSelectRef.current &&
                !repoSelectRef.current.contains(event.target as Node)
            ) {
                setRepoSelectOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [repoSelectOpen, setRepoSelectOpen]);

    // 텍스트가 넘치는 항목 추적용
    const textRefs = useRef<Record<string, HTMLSpanElement | null>>({});
    const containerRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const [shouldSlide, setShouldSlide] = useState<Record<string, boolean>>({});

    const checkOverflow = () => {
        const newShouldSlide: Record<string, boolean> = {};
        userRepos.forEach((repo) => {
            const textEl = textRefs.current[repo.id];
            const containerEl = containerRefs.current[repo.id];
            if (textEl && containerEl) {
                const isOverflowing =
                    textEl.scrollWidth > containerEl.offsetWidth;
                newShouldSlide[repo.id] = isOverflowing;
            }
        });
        setShouldSlide(newShouldSlide);
    };

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
                .filter((r): r is RepoItem => r !== null)
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

    useEffect(() => {
        // 렌더링 이후에 overflow 여부 체크
        setTimeout(() => {
            checkOverflow();
        }, 0);
    }, [userRepos]);

    return (
        <div
            className="relative w-full max-w-50 min-w-25 md:hidden"
            ref={repoSelectRef}
        >
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
                                const slideClass = shouldSlide[repo.id]
                                    ? "animate-[slide_10s_linear_infinite]"
                                    : "";

                                return (
                                    <li
                                        key={repo.id}
                                        className={`group cursor-pointer truncate p-3 text-sm ${
                                            isSelected
                                                ? "bg-primary2 text-primary7 font-semibold"
                                                : "hover:bg-bg-primary1"
                                        }`}
                                        onClick={() => {
                                            setSelectedRepo(repo);
                                            setRepoSelectOpen(false);
                                        }}
                                    >
                                        <div
                                            className="overflow-x-auto whitespace-nowrap"
                                            ref={(el) =>
                                                (containerRefs.current[
                                                    repo.id
                                                ] = el)
                                            }
                                        >
                                            <span
                                                ref={(el) =>
                                                    (textRefs.current[repo.id] =
                                                        el)
                                                }
                                                className={`inline-block min-w-full ${slideClass}`}
                                            >
                                                {repo.nameWithOwner}
                                            </span>
                                        </div>
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
