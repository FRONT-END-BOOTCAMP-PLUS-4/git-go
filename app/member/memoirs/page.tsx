"use client";

import MemoirCard from "@/app/member/memoirs/components/MemoirCard";

export default function MemoirPage() {
    // TODO: 사이드바와 탭 부분은 공통 컴포넌트로 작성해서 각 페이지마다 넣기.

    // 현재 날짜를 한국어 형식으로 포맷팅
    const now = new Date();

    const formattedDate = new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(now);

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
