"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
// import SettingsSkeleton from "../../stats/components/SettingsSkeleton";

export default function Badges() {
    const [memoirCount, setMemoirCount] = useState<number | null>(null);
    const [streak, setStreak] = useState<number | null>(null);

    useEffect(() => {
        const fetchMemoirCount = async () => {
            const res = await fetch("/api/memoirs/total-count");
            const data = await res.json();
            setMemoirCount(data.count);
        };
        fetchMemoirCount();
    }, []);

    useEffect(() => {
        const fetchStreak = async () => {
            const res = await fetch("/api/login-record/streak");
            const data = await res.json();
            setStreak(data.streak);
        };
        fetchStreak();
    }, []);

    // if (memoirCount === null) {
    //     return <SettingsSkeleton />;
    // }

    const badgeList = [
        {
            count: 1,
            label: "회고 1개",
            image: "/badge-memoir-1.png",
            gray: "/badge-memoir-1-gray.png",
        },
        {
            count: 5,
            label: "회고 5개",
            image: "/badge-memoir-5.png",
            gray: "/badge-memoir-5-gray.png",
        },
        {
            count: 10,
            label: "회고 10개",
            image: "/badge-memoir-10.png",
            gray: "/badge-memoir-10-gray.png",
        },
        {
            count: 50,
            label: "회고 50개",
            image: "/badge-memoir-50.png",
            gray: "/badge-memoir-50-gray.png",
        },
    ];
    const streakBadgeList = [
        {
            count: 1,
            label: "1일 출석",
            image: "/badge-streak-1.png",
            gray: "/badge-streak-1-gray.png",
        },
        {
            count: 3,
            label: "3일 연속 출석",
            image: "/badge-streak-3.png",
            gray: "/badge-streak-3-gray.png",
        },
        {
            count: 7,
            label: "7일 연속 출석",
            image: "/badge-streak-7.png",
            gray: "/badge-streak-7-gray.png",
        },
        {
            count: 30,
            label: "30일 연속 출석",
            image: "/badge-streak-30.png",
            gray: "/badge-streak-30-gray.png",
        },
    ];

    return (
        <div className="flex justify-center">
            <div className="border-border-primary1 bg-bg-member1 m-4 w-full max-w-[880px] rounded-md border">
                <div className="border-border-primary1 border-b p-4 text-xl font-semibold">
                    획득한 뱃지
                </div>
                <div className="p-6">
                    <div className="border-border-primary1 border-b pb-4">
                        <p className="mb-3 text-[16px] font-normal">
                            회고록 작성
                        </p>
                        <div className="grid grid-cols-4 gap-6">
                            {badgeList.map((badge) => {
                                const isEarned = memoirCount >= badge.count;
                                return (
                                    <div
                                        key={badge.count}
                                        className="flex flex-col items-center gap-2"
                                    >
                                        <Image
                                            src={
                                                isEarned
                                                    ? badge.image
                                                    : badge.gray
                                            }
                                            alt={`${badge.label} 뱃지`}
                                            width={80}
                                            height={80}
                                        />
                                        <span className="text-sm">
                                            {badge.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="border-border-primary1 mt-10 border-b pb-4">
                        <p className="mb-3 text-[16px] font-normal">
                            연속 출석일
                        </p>
                        <div className="grid grid-cols-4 gap-6">
                            {streakBadgeList.map((badge) => {
                                const isEarned =
                                    streak !== null && streak >= badge.count;
                                return (
                                    <div
                                        key={badge.count}
                                        className="flex flex-col items-center gap-2"
                                    >
                                        <Image
                                            src={
                                                isEarned
                                                    ? badge.image
                                                    : badge.gray
                                            }
                                            alt={`${badge.label} 뱃지`}
                                            width={80}
                                            height={80}
                                        />
                                        <span className="text-sm">
                                            {badge.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
