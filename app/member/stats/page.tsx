"use client";

import React, { useEffect, useState } from "react";
import BottomCard from "./components/BottomCard";
import StatsCard from "./components/StatsCard";
import Image from "next/image";
import { useRepoStore } from "@/store/repoStore";
import StatsCardSkeleton from "../components/StatsCardSkeleton";

export default function StatsPage() {
    const repoData = [
        { name: "frontend-app", commits: 85 },
        { name: "backend-api", commits: 65 },
        { name: "data-service", commits: 45 },
    ];
    const maxCommits = Math.max(...repoData.map((r) => r.commits));
    const { selectedRepo } = useRepoStore();
    const [totalCommits, setTotalCommits] = useState<number | null>(null);
    const [totalLines, setTotalLines] = useState<number | null>(null);

    useEffect(() => {
        if (!selectedRepo) return;

        setTotalCommits(null);
        setTotalLines(null);

        const fetchStats = async () => {
            const [commitRes, lineRes] = await Promise.all([
                fetch(`/api/stats/commits?repo=${selectedRepo}`),
                fetch(`/api/stats/lines?repo=${selectedRepo}`),
            ]);

            const commitData = await commitRes.json();
            const lineData = await lineRes.json();

            setTotalCommits(commitData.totalCommits);
            setTotalLines(lineData.totalLines);
        };

        fetchStats();
    }, [selectedRepo]);

    return (
        <div className="min-h-screen space-y-6 bg-gray-50">
            {/* Top stats */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {totalCommits === null ? (
                    <StatsCardSkeleton />
                ) : (
                    <StatsCard
                        title="전체 커밋"
                        value={totalCommits.toString()}
                        change="12%"
                    />
                )}
                {totalLines === null ? (
                    <StatsCardSkeleton />
                ) : (
                    <StatsCard title="코드 라인 수" value={totalLines.toLocaleString()} change="8%" />
                )}
                {/* <StatsCard title="코드 라인 수" value="15,234" change="8%" /> */}
                <StatsCard title="작성된 회고록" value="24" change="15%" />
            </div>

            {/* Bottom section */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Commit activity */}
                <BottomCard title="커밋 활동" subtitle="최근 7일">
                    <div className="text-text-secondary2 mt-12 flex h-32 items-center justify-center">
                        <Image
                            src="/activity.svg"
                            alt="커밋 활동"
                            width={36}
                            height={36}
                        />
                    </div>
                </BottomCard>
                {/* Most active repos */}
                <BottomCard title="가장 활발한 저장소" subtitle="커밋 수 기준">
                    <div className="space-y-4">
                        {repoData.map((repo) => (
                            <div key={repo.name} className="h-10 space-y-1">
                                <div className="text-text-secondary2 flex justify-between text-sm font-medium">
                                    <span>{repo.name}</span>
                                    <span>{repo.commits} commits</span>
                                </div>
                                <div className="bg-bg-primary2 relative h-2 w-full rounded-full">
                                    <div
                                        className="absolute top-0 left-0 h-full rounded-full bg-indigo-500"
                                        style={{
                                            width: `${(repo.commits / maxCommits) * 100}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </BottomCard>
            </div>
        </div>
    );
}
