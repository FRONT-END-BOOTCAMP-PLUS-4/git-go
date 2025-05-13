"use client";
import React from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";
type Status = "commit" | "pullRequest" | "memoir" | "stat";

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
        <div className="border-border-primary1 flex h-9 w-[440px] cursor-pointer flex-row rounded-md border bg-white px-1 py-1 text-[16px] font-semibold">
            <div
                className={`flex h-7 flex-row items-center rounded-md px-3 py-1 ${
                    status === "commit" ? "bg-primary1" : ""
                }`}
                onClick={commitClickHandler}
            >
                <Image
                    src={`/${status === "commit" ? "commit-blue" : "commit"}.svg`}
                    alt={`${status}`}
                    width={20}
                    height={20}
                />
                <div
                    className={`ml-2 ${
                        status === "commit"
                            ? "text-primary7"
                            : "text-text-gray1"
                    }`}
                >
                    커밋
                </div>
            </div>
            <div
                className={`flex h-7 flex-row items-center rounded-md px-3 py-1 ${
                    status === "pullRequest" ? "bg-primary1" : ""
                }`}
                onClick={pullRequestClickHandler}
            >
                <Image
                    src={`/${status === "pullRequest" ? "pull-request-blue" : "pull-request"}.svg`}
                    alt={`${status}`}
                    width={20}
                    height={20}
                />
                <div
                    className={`ml-2 ${
                        status === "pullRequest"
                            ? "text-primary7"
                            : "text-text-gray1"
                    }`}
                >
                    Pull Requests
                </div>
            </div>
            <div
                className={`flex h-7 flex-row items-center rounded-md px-3 py-1 ${
                    status === "memoir" ? "bg-primary1" : ""
                }`}
                onClick={memoirClickHandler}
            >
                <Image
                    src={`/${status === "memoir" ? "memoir-blue" : "memoir"}.svg`}
                    alt={`${status}`}
                    width={20}
                    height={20}
                />
                <div
                    className={`ml-2 ${
                        status === "memoir"
                            ? "text-primary7"
                            : "text-text-gray1"
                    }`}
                >
                    내 회고록
                </div>
            </div>
            <div
                className={`flex h-7 flex-row items-center rounded-md px-3 py-1 ${
                    status === "stat" ? "bg-primary1" : ""
                }`}
                onClick={statClickHandler}
            >
                <Image
                    src={`/${status === "stat" ? "static-blue" : "static"}.svg`}
                    alt={`${status}`}
                    width={20}
                    height={20}
                />
                <div
                    className={`ml-2 ${
                        status === "stat" ? "text-primary7" : "text-text-gray1"
                    }`}
                >
                    통계
                </div>
            </div>
        </div>
    );
}
