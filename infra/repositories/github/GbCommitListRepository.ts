import { GithubCommit } from "@/domain/entities/GithubCommitList";
import { GithubCommitListRepository } from "@/domain/repositories/GithubCommitListRepository";
import { PrismaClient } from "@/prisma/generated/prisma";

const prisma = new PrismaClient();

async function fetchAllCommitsFromDefaultBranch({
    owner,
    repo,
    author,
    branch,
    headers,
    maxCommits = 1000,
}: {
    owner: string;
    repo: string;
    author: string;
    branch: string;
    headers: Record<string, string>;
    maxCommits?: number;
}) {
    const commits: any[] = [];
    let page = 1;
    const perPage = 100;
    let hasMore = true;

    while (hasMore) {
        const res = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/commits?author=${author}&sha=${branch}&per_page=${perPage}&page=${page}`,
            { headers }
        );

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`Failed to fetch commits: ${res.status} - ${errorData.message || "Unknown error"}`);
        }

        const data = await res.json();
        commits.push(...data);

        hasMore = data.length === perPage && commits.length < maxCommits;
        page++;
    }

    return commits;
}

export class GbCommitListRepository implements GithubCommitListRepository {
    async fetchCommitList({
        owner,
        repo,
        author,
        token,
        page = 1,
        perPage = 10,
        userId,
    }: {
        owner: string;
        repo: string;
        author: string;
        token?: string;
        page?: number;
        perPage?: number;
        userId?: string;
    }): Promise<{ commits: GithubCommit[]; hasNextPage: boolean; totalCount: number; }> {
        const headers: Record<string, string> = {
            Accept: "application/vnd.github+json",
        };


        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        console.log("▶ [AccessToken 확인]", token);
        console.log("▶ [요청 Headers]", headers);

        const userDefaultSetting = await prisma.user.findUnique({
            where: { id: userId },
            // select: { isDefaultOnly: true }, // 사용자 설정 컬럼
        });

        // 👉 디폴트 브랜치 가져오기
        const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });

        console.log("남은 요청 횟수:", repoRes.headers.get("x-ratelimit-remaining"));  // 여기에 추가

        if (!repoRes.ok) {
            const errorData = await repoRes.json();
            throw new Error(`Failed to fetch repo info: ${repoRes.status} - ${errorData.message || "Unknown error"}`);
        }
        const repoInfo = await repoRes.json();
        const defaultBranch = repoInfo.default_branch;


        // 👉 default 브랜치만 조회
        // if (userDefaultSetting?.isDefaultOnly) {

        //     const commitsRes = await fetch(
        //         `https://api.github.com/repos/${owner}/${repo}/commits?author=${author}&sha=${defaultBranch}&per_page=${perPage}Page&page=${page}`,
        //         { headers }
        //     );

        //     console.log("남은 요청 횟수:", commitsRes.headers.get("x-ratelimit-remaining"));  // 여기에 추가


        //     if (!commitsRes.ok) {
        //         const errorData = await commitsRes.json();
        //         throw new Error(`Failed to fetch commits: ${commitsRes.status} - ${errorData.message || "Unknown error"}`);
        //     }

        //     const commits = await commitsRes.json();
        //     const mappedCommits = commits.map((c: any) =>
        //         GithubCommit.fromJson({ ...c, branch: defaultBranch })
        //     );

        //     const sortedCommits = (mappedCommits as GithubCommit[]).sort(
        //         (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        //     );

        //     const startIndex = (page - 1) * perPage;
        //     const endIndex = startIndex + perPage;

        //     return {
        //         commits: sortedCommits.slice(startIndex, endIndex),
        //         hasNextPage: endIndex < sortedCommits.length,
        //         totalCount: sortedCommits.length,
        //     };
        // }

        if (userDefaultSetting?.isDefaultOnly) {
            const allCommitsRaw = await fetchAllCommitsFromDefaultBranch({
                owner,
                repo,
                author,
                branch: defaultBranch,
                headers,
            });
            const mappedCommits = allCommitsRaw.map((c: any) =>
                GithubCommit.fromJson({ ...c, branch: defaultBranch })
            );

            const sortedCommits = mappedCommits.sort(
                (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
            );

            const startIndex = (page - 1) * perPage;
            const endIndex = startIndex + perPage;

            return {
                commits: sortedCommits.slice(startIndex, endIndex),
                hasNextPage: endIndex < sortedCommits.length,
                totalCount: sortedCommits.length,
            };
        }

        // 👉 모든 브랜치 조회
        const branchesRes = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/branches`,
            { headers }
        );

        console.log("남은 요청 횟수:", branchesRes.headers.get("x-ratelimit-remaining"));  // 여기에 추가

        if (!branchesRes.ok) {
            const errorData = await branchesRes.json();
            throw new Error(`Failed to fetch branches: ${branchesRes.status} - ${errorData.message || "Unknown error"}`);
        }
        const branches = await branchesRes.json();

        const commitMap = new Map<string, GithubCommit>();

        for (const branch of branches) {
            const branchName = branch.name;

            const commitsRes = await fetch(
                `https://api.github.com/repos/${owner}/${repo}/commits?author=${author}&sha=${branchName}`,
                { headers }
            );
            if (!commitsRes.ok) {
                const errorData = await commitsRes.json();
                throw new Error(`Failed to fetch commits for branch ${branchName}: ${commitsRes.status} - ${errorData.message || "Unknown error"}`);
            }

            const commits = await commitsRes.json();

            for (const c of commits) {
                const sha = c.sha;
                const commit = GithubCommit.fromJson({ ...c, branch: branchName });

                // 디폴트 브랜치 우선 등록
                if (branchName === defaultBranch || !commitMap.has(sha)) {
                    commitMap.set(sha, commit);
                }
            }
        }

        const uniqueCommits = Array.from(commitMap.values()).sort(
            (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        );

        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;

        return {
            commits: uniqueCommits.slice(startIndex, endIndex),
            hasNextPage: endIndex < uniqueCommits.length,
            totalCount: uniqueCommits.length,
        };
    }
}
