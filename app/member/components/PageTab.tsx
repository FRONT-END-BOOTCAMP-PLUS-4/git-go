"use client";

import { MEMBER_URL } from "@/constants/url";
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
        <div className="border-border-primary1 bg-bg-member1 mb-6 flex cursor-pointer rounded-md border">
            <div
                className={`flex flex-row items-center rounded-md px-3 py-2 ${
                    status === "commits" ? "bg-primary1" : ""
                }`}
                onClick={commitClickHandler}
            >
                <Image
                    src={`/${status === "commits" ? "commit-blue" : "commit"}.svg`}
                    alt={`${status}`}
                    width={20}
                    height={20}
                    priority
                />
                <div
                    className={`ml-2 ${
                        status === "commits"
                            ? "text-primary7"
                            : "text-text-secondary2"
                    }`}
                >
                    Commits
                </div>
            </div>
            <div
                className={`flex flex-row items-center rounded-md px-3 py-2 ${
                    status === "pull-requests" ? "bg-primary1" : ""
                }`}
                onClick={pullRequestClickHandler}
            >
                <Image
                    src={`/${status === "pull-requests" ? "pull-request-blue" : "pull-request"}.svg`}
                    alt={`${status}`}
                    width={20}
                    height={20}
                    priority
                />
                <div
                    className={`ml-2 ${
                        status === "pull-requests"
                            ? "text-primary7"
                            : "text-text-secondary2"
                    }`}
                >
                    Pull Requests
                </div>
            </div>
            <div
                className={`flex flex-row items-center rounded-md px-3 py-2 ${
                    status === "memoirs" ? "bg-primary1" : ""
                }`}
                onClick={memoirClickHandler}
            >
                <Image
                    src={`/${status === "memoirs" ? "memoir-blue" : "memoir"}.svg`}
                    alt={`${status}`}
                    width={20}
                    height={20}
                    priority
                />
                <div
                    className={`ml-2 ${
                        status === "memoirs"
                            ? "text-primary7"
                            : "text-text-secondary2"
                    }`}
                >
                    내 회고록
                </div>
            </div>
            <div
                className={`flex flex-row items-center rounded-md px-3 py-2 ${
                    status === "stats" ? "bg-primary1" : ""
                }`}
                onClick={statClickHandler}
            >
                <Image
                    src={`/${status === "stats" ? "static-blue" : "static"}.svg`}
                    alt={`${status}`}
                    width={20}
                    height={20}
                    priority
                />
                <div
                    className={`ml-2 ${
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
