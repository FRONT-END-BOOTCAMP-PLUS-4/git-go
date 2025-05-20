"use client";
import PrCard from "@/app/member/pull-requests/components/PrCard";
import { useRepoStore } from "@/store/repoStore";
import { useSession } from "next-auth/react";

export default function PullRequestPage() {
    // 현재 날짜 를 한국어 형식으로 포맷팅
    const now = new Date();

    const formattedDate = new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(now);

    const { selectedRepo } = useRepoStore();

    console.log(selectedRepo);

    const session = useSession();
    console.log(session);
    return (
        <div className="border-border-primary1 rounded-lg border-1 bg-white">
            <section className="border-border-primary1 flex items-center justify-between border-b p-4">
                <h2 className="font-bold">Pull Requests</h2>
                <p className="text-text-secondary2 text-sm">{formattedDate}</p>
            </section>

            <ul>
                <PrCard type="open" />
                <PrCard type="merged" />
            </ul>
        </div>
    );
}
