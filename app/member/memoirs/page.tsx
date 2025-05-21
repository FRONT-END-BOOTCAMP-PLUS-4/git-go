"use client";

import MemoirCard from "@/app/member/memoirs/components/MemoirCard";
import { MemoirListDto } from "@/application/usecase/memoir/dto/MemoirListDto";
import { useEffect, useState } from "react";

export default function MemoirPage() {
    // TODO: 사이드바와 탭 부분은 공통 컴포넌트로 작성해서 각 페이지마다 넣기.

    // 현재 날짜를 한국어 형식으로 포맷팅
    const now = new Date();
    const [memoirs, setMemoirs] = useState<MemoirListDto[]>([]);

    const formattedDate = new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(now);

    useEffect(() => {
        const fetchMemoirs = async () => {
            const res = await fetch("/api/memoirs");
            const data = await res.json();
            console.log(data);
            setMemoirs(data);
        };

        fetchMemoirs();
    }, []);

    return (
        <div className="border-border-primary1 rounded-lg border-1 bg-white">
            <section className="border-border-primary1 flex items-center justify-between border-b p-4">
                <h2 className="font-bold">My Memoirs</h2>
                <p className="text-text-secondary2 text-sm">{formattedDate}</p>
            </section>

            <ul>
                <MemoirCard type="commit" />
                <MemoirCard type="pr" />
            </ul>
        </div>
    );
}
