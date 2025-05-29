"use client";

import Button from "@/app/components/Button";
import { GithubRepoDto } from "@/application/usecase/github/dto/GithubRepoDto";
import { useRepoStore } from "@/store/repoStore";
import { Archive, Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CommitPrFilter from "../memoirs/components/Filter/CommitPrFilter";
import TagFilter from "../memoirs/components/Filter/TagFilter";
import SideBarRepoSkeleton from "./SideBarRepoSkeleton";
import TimeFilter from "./TimeFilter";

export default function SideBar({
    setOpen,
}: {
    setOpen: (open: boolean) => void;
}) {
    const [userRepos, setUserRepos] = useState<
        { dbId: number; id: string; nameWithOwner: string }[]
    >([]);
    const pathname = usePathname();
    const { selectedRepo, setSelectedRepo, reloadRepoList, resetReload } =
        useRepoStore();
    const [loadingRepos, setLoadingRepos] = useState(true);
    const [repoTags, setRepoTags] = useState<string[]>([]);

    const fetchRepos = async (
        setUserRepos: (
            repos: { dbId: number; id: string; nameWithOwner: string }[]
        ) => void,
        setSelectedRepo: (
            repo: { dbId: number; id: string; nameWithOwner: string } | null
        ) => void
    ) => {
        setLoadingRepos(true);
        try {
            const [userRes, githubRes] = await Promise.all([
                fetch("/api/repos/user"),
                fetch("/api/github/repos"),
            ]);

            const userRepoIds: { id: number; name: string }[] =
                await userRes.json();
            const githubRepos: GithubRepoDto[] = await githubRes.json();

            const matched = githubRepos
                .map((repo) => {
                    const match = userRepoIds.find((r) => r.name === repo.id);
                    if (!match) return null;
                    return {
                        dbId: Number(match.id),
                        id: repo.id,
                        nameWithOwner: repo.nameWithOwner,
                    };
                })
                .filter(Boolean) as {
                dbId: number;
                id: string;
                nameWithOwner: string;
            }[];

            setUserRepos(matched);

            const stillExists = matched.some(
                (r) => r.nameWithOwner === selectedRepo?.nameWithOwner
            );
            if (!stillExists && matched.length > 0) {
                setSelectedRepo(matched[0]);
            } else if (matched.length === 0) {
                setSelectedRepo(null); // 아무 저장소도 없을 경우
            }
        } catch (error) {
            console.error("레포 불러오기 실패:", error);
        } finally {
            setLoadingRepos(false);
        }
    };

    useEffect(() => {
        fetchRepos(setUserRepos, setSelectedRepo);
    }, []);

    useEffect(() => {
        if (!reloadRepoList) return;

        fetchRepos(setUserRepos, setSelectedRepo).finally(() => {
            resetReload();
        });
    }, [reloadRepoList]);

    useEffect(() => {
        if (!selectedRepo) return;

        const fetchTags = async () => {
            try {
                const res = await fetch(
                    `/api/memoirs/tags?repo=${selectedRepo.dbId}`
                );
                const tags: string[] = await res.json();
                setRepoTags(tags);
            } catch (err) {
                console.error("태그 로딩 실패", err);
                setRepoTags([]);
            }
        };

        fetchTags();
    }, [selectedRepo]);

    return (
        <aside className="flex w-50 flex-col gap-y-4">
            <div className="bg-bg-member1 border-border-primary1 h-fit w-50 rounded-md border-1">
                <h2 className="border-border-primary1 border-b p-4 font-semibold">
                    등록된 저장소
                </h2>
                <ul className="flex w-full flex-col gap-y-1 p-2">
                    {loadingRepos ? (
                        <SideBarRepoSkeleton />
                    ) : (
                        userRepos.map((repo) => {
                            const isSelected =
                                selectedRepo?.nameWithOwner ===
                                repo.nameWithOwner;
                            return (
                                <li
                                    key={repo.id}
                                    className="border-border-primary1"
                                >
                                    <button
                                        className={`hover:${isSelected ? "" : "bg-bg-primary2"} flex w-full cursor-pointer items-center gap-x-3 rounded-md px-2 py-2 text-left font-semibold ${
                                            isSelected
                                                ? "bg-primary2 text-primary7"
                                                : ""
                                        }`}
                                        onClick={() => setSelectedRepo(repo)}
                                    >
                                        {/* <Image
                                            src={
                                                isSelected
                                                    ? "/box-archive-solid-blue.svg"
                                                    : "/box-archive-solid.svg"
                                            }
                                            width={14}
                                            height={14}
                                            alt="브랜치 아이콘"
                                        /> */}
                                        <Archive
                                            className="shrink-0"
                                            size={18}
                                        />
                                        <span
                                            className={`text-sm break-all hover:line-clamp-none ${
                                                isSelected
                                                    ? "line-clamp-none"
                                                    : "line-clamp-2"
                                            }`}
                                        >
                                            {repo.nameWithOwner}
                                        </span>
                                    </button>
                                </li>
                            );
                        })
                    )}
                </ul>
                <section className="border-border-primary1 border-t p-3">
                    <Button
                        type="lined"
                        size="full"
                        onClick={() => setOpen(true)}
                    >
                        {/* <Image
                            src="/plus-gray.svg"
                            width={10.5}
                            height={16}
                            alt="저장소 추가 아이콘"
                        /> */}
                        <Plus size={18} />
                        저장소 추가
                    </Button>
                </section>
            </div>

            {pathname.includes("memoirs") && (
                <TimeFilter
                    options={[
                        { value: "all", label: "전체 기간" },
                        { value: "7days", label: "지난 7일" },
                        { value: "30days", label: "지난 30일" },
                    ]}
                />
            )}

            {pathname.includes("memoirs") && (
                <div className="border-border-primary1 shadow-sms bg-bg-member1 rounded-md border-1 p-4">
                    <CommitPrFilter />
                    <TagFilter tags={repoTags} />
                </div>
            )}
        </aside>
    );
}
