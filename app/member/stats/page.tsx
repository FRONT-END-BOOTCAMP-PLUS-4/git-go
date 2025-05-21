"use client";

import React, { useEffect, useState } from "react";
import BottomCard from "./components/BottomCard";
import StatsCard from "./components/StatsCard";
import { useRepoStore } from "@/store/repoStore";
import StatsCardSkeleton from "../components/StatsCardSkeleton";
import TopReposSkeleton from "./components/TopReposSkeleton";
import WeeklyCommitChart from "./components/WeeklyCommitChart";
import ChartSkeleton from "./components/ChartSkeleton";

export default function StatsPage() {
    const { selectedRepo, reloadRepoList, resetReload } = useRepoStore();
    const [totalCommits, setTotalCommits] = useState<number | null>(null);
    const [totalLines, setTotalLines] = useState<number | null>(null);
    const [totalMemoirs, setTotalMemoirs] = useState<number | null>(null);
    const [topRepos, setTopRepos] = useState<
        { name: string; commits: number }[]
    >([]);
    const [loadingTopRepos, setLoadingTopRepos] = useState(false);
    const [weeklyCommits, setWeeklyCommits] = useState<{ date: string; count: number }[]>([]);
    const [loadingWeekly, setLoadingWeekly] = useState(false);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [commitChange, setCommitChange] = useState<string | null>(null);
    const [lineChangePercent, setLineChangePercent] = useState<string | null>(null);

    useEffect(() => {
        const fetchTopRepos = async () => {
            setLoadingTopRepos(true);
            try {
                const res = await fetch("/api/stats/top-active-repos");
                const data = await res.json();
                setTopRepos(data);
            } catch (e) {
                console.error("Top active repos fetch 실패", e);
            } finally {
                setLoadingTopRepos(false);
                resetReload();
            }
        };

        fetchTopRepos();
    }, [reloadRepoList]);

    useEffect(() => {
        if (!selectedRepo) return;

        setTotalCommits(null);
        setTotalLines(null);
        setTotalMemoirs(null);
        setLoadingWeekly(true);
        setIsFirstLoad(true);
        setWeeklyCommits([]);

        const fetchStats = async () => {
            try {
                const [commitRes, lineRes, memoirRes, weeklyRes] = await Promise.all([
                    fetch(`/api/stats/commits?repo=${selectedRepo.nameWithOwner}`),
                    fetch(`/api/stats/lines?repo=${selectedRepo.nameWithOwner}`),
                    fetch(`/api/stats/memoirs?repo=${selectedRepo.id}`),
                    fetch(`/api/stats/weekly-commits?repo=${selectedRepo.nameWithOwner}`),
                ]);

                const commitData = await commitRes.json();
                const lineData = await lineRes.json();
                const memoirData = await memoirRes.json();
                const weeklyData = await weeklyRes.json();

                setTotalCommits(commitData.totalCommits);
                setTotalLines(lineData.totalLines);
                setTotalMemoirs(memoirData.totalMemoirs);
                setWeeklyCommits(weeklyData);

                // 전체 커밋과 7일전 커밋 비교해서 변화량 계산
                const commitDiff = weeklyData.reduce(
                    (sum: number, d: { date: string; count: number }) => sum + d.count,
                    0
                );

                // 전체 코드라인 수와 7일전 코드라인 수 비교해서 변화량 계산                
                const lineDiff = lineData.totalLines - lineData.prevLines;

                setCommitChange(`${commitDiff}`);
                setLineChangePercent(`${lineDiff}`);
            } catch (err) {
                console.error("Stats fetch 실패", err);
            } finally {
                setLoadingWeekly(false);
                setIsFirstLoad(false)
            }
        }

        fetchStats();
    }, [selectedRepo]);

    return (
        <div className="space-y-6 bg-gray-50">
            {/* Top stats */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {totalCommits === null ? (
                    <StatsCardSkeleton />
                ) : (
                    <StatsCard
                        title="전체 커밋"
                        value={totalCommits.toString()}
                        change={commitChange ?? "0%"}
                    />
                )}
                {totalLines === null ? (
                    <StatsCardSkeleton />
                ) : (
                    <StatsCard
                        title="코드 라인 수"
                        value={totalLines.toLocaleString()}
                        change={lineChangePercent ?? "0%"}
                    />
                )}
                {totalMemoirs === null ? (
                    <StatsCardSkeleton />
                ) : (
                    <StatsCard title="작성된 회고록" value={totalMemoirs.toLocaleString()} change="hide" />
                )}
            </div>

            {/* Bottom section */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Commit activity */}
                {loadingWeekly || isFirstLoad ? (
                    <div className="border-border-primary1 h-79 rounded-xl border bg-white p-4 shadow-sm">
                        <ChartSkeleton />
                    </div>
                ) : (
                    <BottomCard title="커밋 활동" subtitle="최근 7일">
                        {weeklyCommits.length > 0 ? (
                            <div className="w-full h-64">
                                <WeeklyCommitChart data={weeklyCommits} />
                            </div>
                        ) : (
                            <div className="flex h-32 items-center justify-center text-sm text-gray-400">
                                커밋 정보 없음
                            </div>
                        )}
                    </BottomCard>
                )}
                {/* <BottomCard title="커밋 활동" subtitle="최근 7일">
                    <div className="space-y-4">
                        {loadingWeekly || isFirstLoad ? (
                            <ChartSkeleton />
                        ) : weeklyCommits.length > 0 ? (
                            <div className="w-full h-64">
                                <WeeklyCommitChart data={weeklyCommits} />
                            </div>
                        ) : (
                            <div className="flex h-32 items-center justify-center text-sm text-gray-400">
                                커밋 정보 없음
                            </div>
                        )}
                    </div>
                </BottomCard> */}
                {/* Most active repos */}
                {loadingTopRepos ? (
                    <div className="border-border-primary1 h-79 rounded-xl border bg-white p-4 shadow-sm">
                        <TopReposSkeleton />
                    </div>
                ) : (
                    <BottomCard title="가장 활발한 저장소" subtitle="커밋 수 기준">
                        <div className="space-y-4">
                            {topRepos.length > 0 ? (
                                topRepos.map((repo) => (
                                    <div key={repo.name} className="h-10 space-y-1">
                                        <div className="text-text-secondary2 flex justify-between text-sm font-medium">
                                            <span>{repo.name}</span>
                                            <span>{repo.commits} commits</span>
                                        </div>
                                        <div className="bg-bg-primary2 relative h-2 w-full rounded-full">
                                            <div
                                                className="absolute top-0 left-0 h-full rounded-full bg-indigo-500"
                                                style={{
                                                    width: `${(repo.commits / Math.max(...topRepos.map(r => r.commits), 1)) * 100}%`,
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-400 text-center mt-4">
                                    연동된 저장소가 없거나 커밋 정보가 없습니다.
                                </p>
                            )}
                        </div>
                    </BottomCard>
                )}
            </div>
        </div>
    );
}
