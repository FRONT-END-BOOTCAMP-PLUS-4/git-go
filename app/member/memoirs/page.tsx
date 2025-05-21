"use client";

import MemoirCard from "@/app/member/memoirs/components/MemoirCard";
import { MemoirListDto } from "@/application/usecase/memoir/dto/MemoirListDto";
import { useRepoStore } from "@/store/repoStore";
import { useEffect, useState } from "react";
import EmptyResult from "../components/EmptyResult";

export default function MemoirPage() {
    // TODO: 사이드바와 탭 부분은 공통 컴포넌트로 작성해서 각 페이지마다 넣기.

    // 현재 날짜를 한국어 형식으로 포맷팅
    const now = new Date();
    const { selectedRepo } = useRepoStore();
    const [memoirs, setMemoirs] = useState<MemoirListDto[]>([]);

    const formattedDate = new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(now);

    useEffect(() => {
        if (!selectedRepo) return;

        const fetchMemoirs = async () => {
            const res = await fetch(`/api/memoirs?repo=${selectedRepo.id}`);
            const data = await res.json();
            const updatedData = data.map((memoir: any) => ({
                ...memoir,
                repoName: selectedRepo.nameWithOwner,
            }));
            setMemoirs(updatedData);
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
                {memoirs.length === 0 ? (
                    <EmptyResult message="선택한 저장소에 회고가 없습니다." />
                ) : (
                    memoirs.map((memoir) => (
                        <MemoirCard key={memoir.id} memoir={memoir} />
                    ))
                )}
            </ul>
        </div>
    );
}
