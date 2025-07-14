"use client";

import { useEffect, useState } from "react";
import { Crown } from "lucide-react";

export default function QuotaBar() {
    const [usageInfo, setUsageInfo] = useState<{
        usage: number;
        restrict: number;
    } | null>(null);

    useEffect(() => {
        const fetchUsage = async () => {
            try {
                const res = await fetch("/api/settings/tokenUsages");
                const data = await res.json();
                setUsageInfo({
                    usage: data.daily_ai_use_count,
                    restrict: data.daily_ai_restrict_count,
                });
            } catch (error) {
                console.error("사용량 정보 불러오기 실패", error);
            }
        };

        fetchUsage();
    }, []);

    if (!usageInfo) {
        return (
            <div className="border-border-primary1 space-y-2 rounded border p-4 text-sm text-gray-500">
                로딩 중...
            </div>
        );
    }

    const { usage, restrict } = usageInfo;
    const percentageUsed = Math.min((usage / restrict) * 100, 100);

    // ✅ 오늘 기준으로 내일 00:00 계산
    const now = new Date();
    const resetDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1, // 내일
        0,
        0,
        0
    );
    const resetDateString = resetDate.toLocaleString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div className="border-border-primary1 space-y-2 rounded border p-4">
            <div className="mb-3 flex justify-between text-[16px] font-normal">
                <div className="text-text-primary1 flex items-center gap-2 text-sm">
                    <Crown color="#FFDC00" />
                    <span>오늘 남은 AI 요청</span>
                </div>
                <span className="text-text-primary1 rounded border px-2 py-0.5 text-xs">
                    Free Plan
                </span>
            </div>

            <div className="relative h-2 w-full rounded bg-gray-200">
                <div
                    className="absolute top-0 left-0 h-2 rounded bg-blue-500"
                    style={{ width: `${percentageUsed}%` }}
                />
            </div>

            <div className="text-text-gray1 flex justify-between text-xs">
                <span>
                    {usage.toLocaleString()} / {restrict.toLocaleString()}{" "}
                    tokens
                </span>
                <span>{percentageUsed.toFixed(0)}% used</span>
            </div>

            <div className="text-text-gray1 text-xs">
                다음 리셋: {resetDateString}
            </div>
        </div>
    );
}
