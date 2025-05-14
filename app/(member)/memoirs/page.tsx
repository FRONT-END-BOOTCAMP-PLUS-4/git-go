"use client";

import CommitCard from "@/app/(member)/commits/components/CommitCard";

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
                <h2 className="font-bold">최근 활동</h2>
                <p className="text-text-secondary2 text-sm">{formattedDate}</p>
            </section>

            <ul>
                {/* CommitCard 의 props 로 커밋의 타입을 지정 - bugfix | feature | refactor */}
                <CommitCard type="bugfix" />
                <CommitCard type="feature" />
                <CommitCard type="refactor" />
                <CommitCard type="bugfix" />
            </ul>
        </div>
    );
}
