"use client";

import { MEMBER_URL } from "@/constants/url";
import {
    BookText,
    ChartBar,
    GitBranch,
    GitCommitHorizontal,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
type Status = "commits" | "pull-requests" | "memoirs" | "stats" | string;

interface Props {
    status: Status;
}

export default function PageTap({ status }: Props) {
    const router = useRouter();
    const commitClickHandler = () => {
        router.push(MEMBER_URL.commits);
    };
    const pullRequestClickHandler = () => {
        router.push(MEMBER_URL.prs);
    };
    const memoirClickHandler = () => {
        router.push(MEMBER_URL.memoirs);
    };
    const statClickHandler = () => {
        router.push(MEMBER_URL.stats);
    };

    return (
        <div className="border-border-primary1 bg-bg-member1 mb-6 flex min-w-fit cursor-pointer gap-x-1 rounded-md border p-1">
            <div
                className={`hover:${status === "commits" ? "" : "bg-bg-primary2"} flex flex-row items-center rounded-md px-2 py-1 ${
                    status === "commits" ? "bg-primary1" : ""
                }`}
                onClick={commitClickHandler}
            >
                <GitCommitHorizontal
                    size={20}
                    className={`shrink-0 ${
                        status === "commits"
                            ? "text-primary7"
                            : "text-text-secondary2"
                    }`}
                />
                <div
                    className={`ml-2 min-w-fit whitespace-nowrap ${
                        status === "commits"
                            ? "text-primary7"
                            : "text-text-secondary2"
                    }`}
                >
                    Commits
                </div>
            </div>
            <div
                className={`hover:${status === "pull-requests" ? "" : "bg-bg-primary2"} flex flex-row items-center rounded-md px-2 py-1 ${
                    status === "pull-requests" ? "bg-primary1" : ""
                }`}
                onClick={pullRequestClickHandler}
            >
                <GitBranch
                    size={20}
                    className={`shrink-0 ${
                        status === "pull-requests"
                            ? "text-primary7"
                            : "text-text-secondary2"
                    }`}
                />
                <div
                    className={`ml-2 min-w-fit whitespace-nowrap ${
                        status === "pull-requests"
                            ? "text-primary7"
                            : "text-text-secondary2"
                    }`}
                >
                    Pull Requests
                </div>
            </div>
            <div
                className={`hover:${status === "memoirs" ? "" : "bg-bg-primary2"} flex flex-row items-center rounded-md px-2 py-1 ${
                    status === "memoirs" ? "bg-primary1" : ""
                }`}
                onClick={memoirClickHandler}
            >
                <BookText
                    size={20}
                    className={`shrink-0 ${
                        status === "memoirs"
                            ? "text-primary7"
                            : "text-text-secondary2"
                    }`}
                />
                <div
                    className={`ml-2 min-w-fit whitespace-nowrap ${
                        status === "memoirs"
                            ? "text-primary7"
                            : "text-text-secondary2"
                    }`}
                >
                    내 회고록
                </div>
            </div>
            <div
                className={`hover:${status === "stats" ? "" : "bg-bg-primary2"} flex flex-row items-center rounded-md px-2 py-1 ${
                    status === "stats" ? "bg-primary1" : ""
                }`}
                onClick={statClickHandler}
            >
                <ChartBar
                    size={20}
                    className={`shrink-0 ${
                        status === "stats"
                            ? "text-primary7"
                            : "text-text-secondary2"
                    }`}
                />
                <div
                    className={`ml-2 min-w-fit whitespace-nowrap ${
                        status === "stats"
                            ? "text-primary7"
                            : "text-text-secondary2"
                    }`}
                >
                    통계
                </div>
            </div>
        </div>
    );
}
