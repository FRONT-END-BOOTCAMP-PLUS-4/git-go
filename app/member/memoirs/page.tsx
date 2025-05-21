"use client";

import MemoirCard from "@/app/member/memoirs/components/MemoirCard";
import { MemoirListDto } from "@/application/usecase/memoir/dto/MemoirListDto";
import { useRepoStore } from "@/store/repoStore";
import { useEffect, useState } from "react";
import EmptyResult from "../components/EmptyResult";
import MemoirSkeleton from "./components/MemoirSkeleton";

export default function MemoirPage() {
    const now = new Date();
    const { selectedRepo } = useRepoStore();
    const [memoirs, setMemoirs] = useState<MemoirListDto[]>([]);
    const [loading, setLoading] = useState(true);

    const formattedDate = new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(now);

    useEffect(() => {
        if (!selectedRepo) return;

        const fetchMemoirs = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/memoirs?repo=${selectedRepo.id}`);
                const data = await res.json();
                const updatedData = data.map((memoir: any) => ({
                    ...memoir,
                    repoName: selectedRepo.nameWithOwner,
                }));
                setMemoirs(updatedData);
            } catch (e) {
                console.error("회고 목록 로딩 실패", e);
                setMemoirs([]);
            } finally {
                setLoading(false);
            }
        };

        fetchMemoirs();
    }, [selectedRepo]);

    return (
        <div className="border-border-primary1 rounded-lg border-1 bg-white">
            <section className="border-border-primary1 flex items-center justify-between border-b p-4">
                <h2 className="font-bold">My Memoirs</h2>
                <p className="text-text-secondary2 text-sm">{formattedDate}</p>
            </section>

            <ul>
                {loading ? (
                    Array.from({ length: 3 }).map((_, i) => <MemoirSkeleton key={i} />)
                ) : memoirs.length === 0 ? (
                    <EmptyResult message="선택한 저장소에 회고록이 없습니다." />
                ) : (
                    memoirs.map((memoir) => (
                        <MemoirCard key={memoir.id} memoir={memoir} />
                    ))
                )}
            </ul>
        </div>
    );
}
