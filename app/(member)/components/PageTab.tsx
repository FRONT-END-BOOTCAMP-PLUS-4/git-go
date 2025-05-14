"use client";
import React from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";
type Status = "commits" | "pull-requests" | "memoirs" | "stats";

interface Props {
    status: Status;
}

export default function PageTap({ status }: Props) {
    const router = useRouter();
    const commitClickHandler = () => {
        router.push("/commits");
    };
    const pullRequestClickHandler = () => {
        router.push("/pull-requests");
    };
    const memoirClickHandler = () => {
        router.push("/memoirs");
    };
    const statClickHandler = () => {
        router.push("/stats");
    };

    return (
        <div className="border-border-primary1 mb-6 flex h-9 w-[440px] cursor-pointer flex-row rounded-md border bg-white px-1 py-1 text-[16px] font-semibold">
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
                    커밋
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
