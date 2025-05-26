"use client";
import React from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MEMBER_URL } from "@/constants/url";
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
        <div className="border-border-primary1 mb-6 flex h-9 min-w-fit cursor-pointer flex-row rounded-md border bg-white px-1 py-1 text-[16px] font-normal">
            <div
                className={`flex h-7 flex-row items-center rounded-md px-3 py-1 ${
                    status === "commits" ? "bg-primary1" : ""
                }`}
                onClick={commitClickHandler}
            >
                <Image
                    src={`/${status === "commits" ? "commit-blue" : "commit"}.svg`}
                    alt={`${status}`}
                    width={20}
                    height={20}
                />
                <div
                    className={`ml-2 ${
                        status === "commits"
                            ? "text-primary7"
                            : "text-text-gray1"
                    }`}
                >
                    Commits
                </div>
            </div>
            <div
                className={`flex h-7 flex-row items-center rounded-md px-3 py-1 ${
                    status === "pull-requests" ? "bg-primary1" : ""
                }`}
                onClick={pullRequestClickHandler}
            >
                <Image
                    src={`/${status === "pull-requests" ? "pull-request-blue" : "pull-request"}.svg`}
                    alt={`${status}`}
                    width={20}
                    height={20}
                />
                <div
                    className={`ml-2 ${
                        status === "pull-requests"
                            ? "text-primary7"
                            : "text-text-gray1"
                    }`}
                >
                    Pull Requests
                </div>
            </div>
            <div
                className={`flex h-7 flex-row items-center rounded-md px-3 py-1 ${
                    status === "memoirs" ? "bg-primary1" : ""
                }`}
                onClick={memoirClickHandler}
            >
                <Image
                    src={`/${status === "memoirs" ? "memoir-blue" : "memoir"}.svg`}
                    alt={`${status}`}
                    width={20}
                    height={20}
                />
                <div
                    className={`ml-2 ${
                        status === "memoirs"
                            ? "text-primary7"
                            : "text-text-gray1"
                    }`}
                >
                    내 회고록
                </div>
            </div>
            <div
                className={`flex h-7 flex-row items-center rounded-md px-3 py-1 ${
                    status === "stats" ? "bg-primary1" : ""
                }`}
                onClick={statClickHandler}
            >
                <Image
                    src={`/${status === "stats" ? "static-blue" : "static"}.svg`}
                    alt={`${status}`}
                    width={20}
                    height={20}
                />
                <div
                    className={`ml-2 ${
                        status === "stats" ? "text-primary7" : "text-text-gray1"
                    }`}
                >
                    통계
                </div>
            </div>
        </div>
    );
}
