// components/QuotaBar.tsx
"use client";

import { Crown } from "lucide-react";

export default function Restrict() {
    const usedRequests = 32;
    const totalRequests = 50;
    const percentageUsed = (usedRequests / totalRequests) * 100;

    return (
        <div className="border-border-primary1 space-y-2 rounded border p-4">
            <div className="mb-3 flex justify-between text-[16px] font-normal">
                <div className="text-text-gray2 flex items-center gap-2 text-sm">
                    <span>👑</span>
                    <span>오늘 남은 AI 요청</span>
                </div>
                <span className="rounded border px-2 py-0.5 text-xs text-gray-600">
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
                    {usedRequests}/{totalRequests} requests
                </span>
                <span>{percentageUsed.toFixed(0)}% used</span>
            </div>

            <div className="text-text-gray1 text-xs">
                다음 리셋: 2025년 6월 28일 00:00
            </div>

            {/* <button className="mt-2 flex w-full cursor-pointer items-center justify-center gap-1 rounded border border-yellow-400 py-1.5 text-sm font-medium text-yellow-600 hover:bg-yellow-50">
                <Crown size={16} className="text-yellow-500" />
                Pro 플랜으로 업그레이드
            </button> */}
        </div>
    );
}
