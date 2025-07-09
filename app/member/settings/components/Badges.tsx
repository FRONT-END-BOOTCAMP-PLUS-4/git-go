"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SettingsSkeleton from "../../stats/components/SettingsSkeleton";

export default function Badges() {
    const [memoirCount, setMemoirCount] = useState<number | null>(null);

    useEffect(() => {
        const fetchMemoirCount = async () => {
            const res = await fetch("/api/memoirs/total-count");
            const data = await res.json();
            setMemoirCount(data.count);
        };
        fetchMemoirCount();
    }, []);

    if (memoirCount === null) {
        return <SettingsSkeleton />;
    }

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

    return (
        <div className="flex flex-col items-center gap-6 p-6">
            <p className="self-start text-[16px] font-normal">획득한 뱃지</p>
            <div className="grid grid-cols-4 gap-6">
                {badgeList.map((badge) => {
                    const isEarned = memoirCount >= badge.count;
                    return (
                        <div
                            key={badge.count}
                            className="flex flex-col items-center gap-2"
                        >
                            <Image
                                src={isEarned ? badge.image : badge.gray}
                                alt={`${badge.label} 뱃지`}
                                width={80}
                                height={80}
                            />
                            <span className="text-sm">{badge.label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
