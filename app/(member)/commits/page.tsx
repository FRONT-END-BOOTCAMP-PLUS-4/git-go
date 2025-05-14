"use client";

import CommitCard from "@/app/(member)/commits/components/CommitCard";
import { useEffect, useState } from "react";
import RepoSelectModal from "../components/RepoSelectModal";

export default function CommitPage() {
    // TODO: 사이드바와 탭 부분은 공통 컴포넌트로 작성해서 각 페이지마다 넣기.

    // 현재 날짜를 한국어 형식으로 포맷팅
    const now = new Date();

    const formattedDate = new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(now);

    useEffect(() => {
        const fetchUserRepos = async () => {
            try {
                const res = await fetch("/api/repos/user");
                const repos = await res.json();
                if (Array.isArray(repos) && repos.length === 0) {
                    setOpen(true);
                }
            } catch (err) {
                console.error("유저 저장소 확인 실패", err);
            }
        };

        fetchUserRepos();
    });

    const [open, setOpen] = useState(false);

    const branches = [
        { name: "frontend-app", icon: "branch-blue.svg" },
        { name: "backend-app", icon: "branch.svg" },
        { name: "api", icon: "branch.svg" },
    ];

    return (
        <>
            <RepoSelectModal open={open} onClose={() => setOpen(false)} />
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
        </>
    );
}
