"use client";

import CommitCard from "@/app/member/commits/components/CommitCard";
import { useEffect, useRef, useState } from "react";
import RepoSelectModal from "../components/RepoSelectModal";
import { useRepoStore } from "@/store/repoStore";
import { useSession } from "next-auth/react";

export default function CommitPage() {
    // TODO: 사이드바와 탭 부분은 공통 컴포넌트로 작성해서 각 페이지마다 넣기.

    // 현재 날짜를 한국어 형식으로 포맷팅
    const now = new Date();

    const formattedDate = new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(now);

    const { selectedRepo } = useRepoStore();
    console.log("커밋 페이지", selectedRepo);

    const ownerName = selectedRepo?.split("/")[0];
    const repoName = selectedRepo?.split("/")[1];

    useEffect(() => {
        if (checkedOnceRef.current) return;
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
    }, []);

    const [open, setOpen] = useState(false);
    const checkedOnceRef = useRef(false);

    const { data: session } = useSession();

    useEffect(() => {
        const fetchCommitsByRepo = async (
            ownerName: string,
            repoName: string
        ): Promise<void> => {
            if (!session) return;

            const accessToken = session.accessToken;
            const author = session.user?.name;

            try {
                const res: Response = await fetch("/api/github/commits", {
                    method: "POST",

                    body: JSON.stringify({
                        owner: ownerName,
                        repo: repoName,
                        author: author,
                        token: accessToken,
                    }),
                });

                if (res.ok) {
                    const result = await res.json();
                    console.log(result);
                }
            } catch (error: unknown) {
                console.error();
            }
        };

        fetchCommitsByRepo(ownerName, repoName);
    }, [selectedRepo]);

    return (
        <>
            <RepoSelectModal open={open} onClose={() => setOpen(false)} />
            <div className="border-border-primary1 rounded-lg border-1 bg-white">
                <section className="border-border-primary1 flex items-center justify-between border-b p-4">
                    <h2 className="font-bold">최근 활동</h2>
                    <p className="text-text-secondary2 text-sm">
                        {formattedDate}
                    </p>
                </section>

                <ul>
                    {/* CommitCard 의 props 로 커밋의 타입을 지정 - bugfix | feature | refactor */}
                    <CommitCard type="fix" />
                    <CommitCard type="fix" />
                    <CommitCard type="refactor" />
                    <CommitCard type="feat" />
                </ul>
            </div>
        </>
    );
}
