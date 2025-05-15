"use client";

import { useEffect, useState } from "react";
import Button from "@/app/components/Button";
import Image from "next/image";
import CommitPrFilter from "../memoirs/components/Filter/CommitPrFilter";
import TimeFilter from "./TimeFilter";
import { usePathname } from "next/navigation";
import { GitHubRepoDto } from "@/application/usecase/github/dto/GitHubRepoDto";

export default function SideBar({
    setOpen,
}: {
    setOpen: (open: boolean) => void;
}) {
    const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
    const [userRepos, setUserRepos] = useState<
        { id: string; nameWithOwner: string }[]
    >([]);
    const pathname = usePathname();

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const [userRes, githubRes] = await Promise.all([
                    fetch("/api/repos/user"),
                    fetch("/api/github/repos"),
                ]);

                const userRepoIds: { name: string }[] = await userRes.json();
                const githubRepos: GitHubRepoDto[] = await githubRes.json();

                const matched = githubRepos
                    .filter((repo) =>
                        userRepoIds.some((r) => r.name === repo.id)
                    )
                    .map((repo) => ({
                        id: repo.id,
                        nameWithOwner: repo.nameWithOwner,
                    }));

                setUserRepos(matched);
                if (matched.length > 0)
                    setSelectedRepo(matched[0].nameWithOwner);
            } catch (error) {
                console.error("레포 불러오기 실패:", error);
            }
        };

        fetchRepos();
    }, []);

    return (
        <aside className="flex flex-col gap-y-4">
            <div className="border-border-primary1 h-fit w-50 rounded-lg border-1 bg-white">
                <h2 className="border-border-primary1 border-b p-4 font-semibold">
                    Repositories
                </h2>
                <ul className="flex w-full flex-col gap-y-1 p-2">
                    {userRepos.map((repo) => {
                        const isSelected = repo.nameWithOwner === selectedRepo;
                        return (
                            <li
                                key={repo.id}
                                className="border-border-primary1"
                            >
                                <button
                                    className={`flex w-full cursor-pointer items-center gap-x-2 rounded-md px-2 py-2 text-left font-semibold ${
                                        isSelected
                                            ? "bg-primary2 text-primary7"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        setSelectedRepo(repo.nameWithOwner)
                                    }
                                >
                                    <Image
                                        src={
                                            isSelected
                                                ? "/branch-blue.svg"
                                                : "/branch.svg"
                                        }
                                        width={14}
                                        height={14}
                                        alt="브랜치 아이콘"
                                    />
                                    <span
                                        className={`text-sm hover:line-clamp-none ${selectedRepo === repo.nameWithOwner ? "line-clamp-none" : "line-clamp-2"}`}
                                    >
                                        {repo.nameWithOwner}
                                    </span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
                <section className="border-border-primary1 border-t p-3">
                    <Button
                        type="lined"
                        size="full"
                        onClick={() => setOpen(true)}
                    >
                        <Image
                            src="/plus-gray.svg"
                            width={10.5}
                            height={16}
                            alt="저장소 추가 아이콘"
                        />
                        저장소 추가
                    </Button>
                </section>
            </div>

            {(pathname.includes("memoirs") || pathname.includes("stats")) && (
                <TimeFilter
                    options={[
                        { value: "7days", label: "Last 7 days" },
                        { value: "30days", label: "Last 30 days" },
                        { value: "90days", label: "Last 90 days" },
                    ]}
                />
            )}

            {pathname.includes("memoirs") && <CommitPrFilter />}
        </aside>
    );
}
